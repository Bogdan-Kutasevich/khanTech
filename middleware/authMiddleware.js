import { decodeJwt } from '../utils/decodeJwt.js';

export const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(403).json({ message: 'unauthorized' });
    }
    req.admin = decodeJwt(token);
    next();
  } catch (error) {
    res.status(403).json({ message: 'unauthorized' });
  }
};
