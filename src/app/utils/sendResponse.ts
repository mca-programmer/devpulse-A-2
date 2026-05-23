import { Response } from "express";

interface IResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export const sendResponse = <T>(
  res: Response,
  data: IResponse<T>,
  statusCode: number
) => {
  res.status(statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};