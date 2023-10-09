import jsonwebtoken from 'jsonwebtoken';

export const generateJwt = (id, username) => {
  const payload = {
    id,
    username,
  };

  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
