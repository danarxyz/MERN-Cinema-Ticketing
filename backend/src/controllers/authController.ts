import { Request, Response } from "express";
import { authSchema } from "../utils/zodSchema";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Wallet from "../models/Wallet";

export const login = async (req: Request, res: Response) => {
  try {
    const parse = authSchema
      .omit({
        name: true,
      })
      .parse(req.body);

    const checkUser = await User.findOne({
      email: parse.email,
      role: parse.role,
    });

    if (!checkUser) {
      return res.status(400).json({
        message: "User not found",
        status: "failed",
        data: null,
      });
    }

    const comparePassword = bcrypt.compareSync(
      parse.password,
      checkUser.password
    );

    if (!comparePassword) {
      return res.status(401).json({
        message: "Email / password incorrect",
        status: "failed",
        data: null,
      });
    }

    const secretKey = process.env.SECRET_KEY ?? "";

    const token = jwt.sign(
      {
        data: {
          id: checkUser.id,
        },
      },
      secretKey,
      { expiresIn: "24h" }
    );

    // Debug log
    console.log("User photo:", checkUser.photo);
    console.log("User photosUrl:", checkUser.photosUrl);

    // Add debug logs
    console.log("User found:", {
      name: checkUser.name,
      email: checkUser.email,
      photo: checkUser.photo,
      photosUrl: checkUser.photosUrl, // This should trigger the virtual getter
    });

    return res.status(200).json({
      message: "Login success",
      status: "success",
      data: {
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.role,
        photoUrl: `${process.env.APP_URL}/uploads/photos/${checkUser.photo}`, // Full URL
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      data: null,
      message: "Error while login",
      status: "failed",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    // Debug logs
    console.log("Headers:", req.headers);
    console.log("Body type:", typeof req.body);
    console.log("Raw body:", req.body);
    console.log("File:", req.file);

    const { name, email, password } = req.body;

    // Log parsed data
    console.log("Parsed data:", { name, email, password });

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
        status: "failed",
        data: {
          receivedFields: {
            name: !!name,
            email: !!email,
            password: !!password,
          },
        },
      });
    }

    // Check existing email
    const emailExisted = await User.findOne({ email });
    if (emailExisted) {
      return res.status(400).json({
        message: "Email already registered",
        status: "failed",
        data: null,
      });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      // Create and save user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: "customer",
        photo: req.file?.filename,
      });

      const savedUser = await user.save();
      console.log("User saved:", savedUser);

      // Create and save wallet
      const wallet = new Wallet({
        user: savedUser._id,
        balance: 0,
      });

      const savedWallet = await wallet.save();
      console.log("Wallet saved:", savedWallet);

      return res.status(201).json({
        message: "Register success",
        status: "success",
        data: {
          name: savedUser.name,
          email: savedUser.email,
        },
      });
    } catch (dbError) {
      console.error("Database save error:", dbError);
      throw new Error("Failed to save user or wallet");
    }
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      data: null,
      message: error instanceof Error ? error.message : "Error while register",
      status: "failed",
    });
  }
};
