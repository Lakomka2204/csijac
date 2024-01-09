import { compare, genSalt, hash } from "bcrypt";
async function createHashed(password: string): Promise<string> {
  const salt = await genSalt(10);
  const hashed = await hash(password, salt);
  return hashed;
}
async function checkPassword(
  originalPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await compare(originalPassword, hashedPassword);
}
export { createHashed, checkPassword };
