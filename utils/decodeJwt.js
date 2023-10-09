import jsonwebtoken from 'jsonwebtoken';

export const decodeJwt = (token) => jsonwebtoken.verify(token, process.env.JWT_SECRET);
