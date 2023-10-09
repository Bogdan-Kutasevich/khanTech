import bcrypt from 'bcryptjs';

export const makeHashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
