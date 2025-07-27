import { findAdminByEmail, createAdmin ,getAllUsers} from "../dao/admin.dao.js";
import { hashPassword,comparePassword } from "../utils/bcrypt.js";
import { signToken } from "../utils/jsonWebToken.js";

export const registerAdminService = async ({ name, email, password }) => {
    const existingAdmin = await findAdminByEmail(email);
    if (existingAdmin) {
        throw new Error("Admin already exists");
    }
    const hassedPassword =await hashPassword(password);
    const admin = await createAdmin({ name, email, password: hassedPassword });
    const token = signToken(email);
    delete admin._doc.password;
    return { admin, token };
}

export const loginAdminService = async ({ email, password }) => {
    console.log("email pass romo jservidffkdjfjdk ",email,password);
    const admin = await findAdminByEmail(email);
    if (!admin) {
        throw new Error("Admin does not exist");
    }
    const isPasswordValid = await comparePassword(password, admin.password);
    console.log("isPasswordValid",isPasswordValid);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const token = await signToken(email);
    delete admin._doc.password;
    return { admin, token };
}

export const getAllUsersService = async () => {
    const users = await getAllUsers();
    return users;
}