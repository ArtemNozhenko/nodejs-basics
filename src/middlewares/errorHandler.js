import { HttpError } from 'http-errors';

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
};

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      massage: err.name,
      data: err,
    });
    return;
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
};
