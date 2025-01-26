import User from "../database/models/users.model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Sign-up controller

// Sign-up function
export async function signup({ firstName, lastName, email, password, dob }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      data: null,
      error: "User already exists",
    };
  }

  const newUser = new User({ firstName, lastName, email, password, dob });
  const data = await newUser.save();
  delete data.password;

  // Generate a JWT token
  const token = jwt.sign({ userId: data._id }, JWT_SECRET, { expiresIn: "3d" });

  return {
    data: { ...data, token },
    error: null,
  };
}

export async function login(email, password) {
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return {
        data: null,
        error: "User not found",
      };
    }

    // Compare the provided password with the hashed password in the DB
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return {
        data: null,
        error: "Invalid credentials",
      };
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Include only necessary payload data
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return user data (without password) and the token
    return {
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dob: user.dob, // If required to send Date of Birth
        },
        token,
      },
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: "An error occurred during login. Please try again.",
    };
  }
}
