import otpHelper from '../../helpers/otp.helper';
import userHelper from '../../helpers/user.helper';
import { sendVerificationEmail } from '../../util/utilHelper';

export async function addNewOtpHandler(input) {
    return await otpHelper.addObject(input);
}

export async function sendEmailHandler(email) {
    if (!email) {
        throw 'email is required'
    }

    let user = await userHelper.getObjectByQuery({
        query: { email },
    })

    if (user) {
        throw "Email already exists"
    }
    console.time("sendMail");
    await sendVerificationEmail(email, "Email Verification");
    console.timeEnd("sendMail");
}

export async function verifyEmailOTP(email, otp) {
    const otpRecord = await otpHelper.getObjectByQuery({
        query: { email, otp },
    });

    if (!otpRecord) {
        throw "Invalid OTP";
    }

    if (new Date() > otpRecord.expiresAt) {
        await otpHelper.deleteObjectByQuery({ email, otp });
        throw "OTP has expired";
    }

    await otpHelper.deleteObjectByQuery({ email });

    return { success: true, message: "OTP verified successfully" };
}

export async function getOtpDetailsHandler(input) {
    return await otpHelper.getObjectById(input);
}

export async function updateOtpDetailsHandler(input) {
    return await otpHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getOtpListHandler(input) {
    const list = await otpHelper.getAllObjects(input);
    const count = await otpHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteOtpHandler(input) {
    return await otpHelper.deleteObjectById(input);
}

export async function getOtpByQueryHandler(input) {
    return await otpHelper.getObjectByQuery(input);
}  
