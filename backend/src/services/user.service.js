import { signToken } from "../utils/jsonWebToken.js"
import { hashPassword } from "../utils/bcrypt.js"
import { createUser } from "../dao/user.dao.js"

export const createNewUser = async ({name, email, password}) => {
    const hashedPassword = await hashPassword(password);
    const newUser = await createUser({name, email, password:hashedPassword});
    await newUser.save()
    const token = await signToken(email);
    delete newUser.password;
    return { newUser, token };
}