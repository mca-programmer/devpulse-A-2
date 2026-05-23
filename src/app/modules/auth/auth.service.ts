import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { pool } from "../../config/db";
import {
  ILoginResponse,
  ILoginUser,
  ISignupUser,
  IUserResponse,
} from "./auth.interface";

export const signupUser = async (
  payload: ISignupUser
): Promise<IUserResponse> => {
  const { name, email, password, role } = payload;

  // check existing user
  const existingUserQuery =
    "SELECT * FROM users WHERE email = $1";

  const existingUserResult = await pool.query(
    existingUserQuery,
    [email]
  );

  if (existingUserResult.rows.length > 0) {
    throw new Error("User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  const insertQuery = `
    INSERT INTO users
    (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING
      id,
      name,
      email,
      role,
      created_at,
      updated_at
  `;

  const values = [
    name,
    email,
    hashedPassword,
    role || "contributor",
  ];

  const result = await pool.query(
    insertQuery,
    values
  );

  return result.rows[0] as IUserResponse;
};

export const loginUser = async (
  payload: ILoginUser
): Promise<ILoginResponse> => {
  const { email, password } = payload;

  const query =
    "SELECT * FROM users WHERE email = $1";

  const result = await pool.query(query, [email]);

  const user = result.rows[0];

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatched =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!passwordMatched) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN || "7d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  };
};