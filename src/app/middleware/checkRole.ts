import { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthRequest } from "./auth";

export const checkRole = (...roles: string[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const userRole = req.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "Forbidden access",
        errors: "You do not have permission",
      });

      return;
    }

    next();
  };
};