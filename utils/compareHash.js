import bcrypt from 'bcryptjs';

export const compareHash = (
  userPassword,
  currentPassword,
) => bcrypt.compareSync(currentPassword, userPassword);
