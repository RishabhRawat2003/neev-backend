import adminHelper from '../../helpers/admin.helper';
import bcrypt from 'bcrypt';
import { generateToken } from '../../util/authUtil';
import { getAdminInfo } from '../../util/utilHelper';
import { ADMIN } from '../../constants/enum';


export async function addNewAdminHandler(input) {
    return await adminHelper.addObject(input);
}

export async function signupAdminHandler(input) {
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const data = {
        ...input,
        password: hashedPassword
    }

    const userData = await adminHelper.addObject(data);

    const token = generateToken(userData._id, ADMIN);

    return { user: getAdminInfo(userData), token }
}

export async function signinAdminHandler(input) {
    let user = await adminHelper.getObjectByQuery({
        query: { email: input.email },
    });

    if (!user) {
        throw "Admin with this mail not found"
    }

    const isMatch = await bcrypt.compare(input.password, user.password);

    if (!isMatch) {
        throw "Invalid credentials"
    }

    const token = generateToken(user._id, ADMIN);

    return { user: getAdminInfo(user), token };
}


export async function getAdminDetailsHandler(input) {
    return await adminHelper.getObjectById(input);
}

export async function updateAdminDetailsHandler(input) {
    return await adminHelper.directUpdateObject(input.objectId, input.updateObject);
}

export async function getAdminListHandler(input) {
    const list = await adminHelper.getAllObjects(input);
    const count = await adminHelper.getAllObjectCount(input);
    return { list, count };
}

export async function deleteAdminHandler(input) {
    return await adminHelper.deleteObjectById(input);
}

export async function getAdminByQueryHandler(input) {
    return await adminHelper.getObjectByQuery(input);
}  
