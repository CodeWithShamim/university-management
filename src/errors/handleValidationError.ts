import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(el => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errors,
  };
};

export default handleValidationError;
