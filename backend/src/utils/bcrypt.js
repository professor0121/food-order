import bcrypt from 'bcrypt';

/**
 * Hash a plain text password
 * @param {string} password - The user's raw password
 * @returns {Promise<string>} - Hashed password
 */
export const hashPassword = async (password) => {
    console.log(password);
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Hashing failed');
  }
};

/**
 * Compare plain password with hashed password
 * @param {string} password - Plain password
 * @param {string} hashedPassword - Hashed password from DB
 * @returns {Promise<boolean>} - True if match, false otherwise
 */
export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Comparison failed');
  }
};
