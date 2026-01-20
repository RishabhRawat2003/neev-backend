import userHelper from '../../helpers/user.helper';
import bcrypt from 'bcrypt';
import { generateToken } from '../../util/authUtil';
import { USER } from '../../constants/enum';
import { getUserInfo } from '../../util/utilHelper';

export async function addNewUserHandler(input) {
    return await userHelper.addObject(input);
}

export async function signupUserHandler(input) {
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const data = {
        ...input,
        email_verified: true,
        password: hashedPassword
    }

    const userData = await userHelper.addObject(data);

    const token = generateToken(userData._id, USER);

    return { user: getUserInfo(userData), token }
}

export async function signinUserHandler(input) {
    let user = await userHelper.getObjectByQuery({
        query: { email: input.email },
    });

    if (!user) {
        throw "User with this mail not found"
    }

    const isMatch = await bcrypt.compare(input.password, user.password);

    if (!isMatch) {
        throw "Invalid credentials"
    }

    const token = generateToken(user._id, USER);

    return { user: getUserInfo(user), token };
}


export async function getUserDetailsHandler(input) {
    const data = await userHelper.getObjectById(input);

    return {
        id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNum: data.phoneNum,
        companyName: data.companyName,
        createdAt: data.created_at
    }
}

export async function updateUserDetailsHandler(input) {
    return await userHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getUserListHandler(input) {
    const list = await userHelper.getAllObjects(input);
    const count = await userHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteUserHandler(input) {
    return await userHelper.deleteObjectById(input);
}

export async function getUserByQueryHandler(input) {
    return await userHelper.getObjectByQuery(input);
}  
