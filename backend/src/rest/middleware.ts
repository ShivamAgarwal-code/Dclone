import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { User } from '../data/models/user';

export const loggedIn = (req, res, next) => {
  const payload = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET_KEY,
  ) as Auth.Payload;  
  
  if (!payload.userId)
    throw next(createError(401, 'Unauthorized'));

  res.locals.userId = payload.userId;
  
  return next();
};

export const updateUser = async (req, res, next) => {
  const user = res.locals.user = await User.findById(res.locals.userId);
  if (!user)
    throw next(createError(404, 'Unauthorized'));

  return next();
};