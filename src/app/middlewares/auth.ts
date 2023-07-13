import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const auth = (...roles: string[]) =>
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      // get token from headers
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      // verify token
      const verifyToken = jwtHelpers.verifyToken(
        token,
        config.jwt.secret as Secret
      );

      if (!roles.includes(verifyToken.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden access');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
