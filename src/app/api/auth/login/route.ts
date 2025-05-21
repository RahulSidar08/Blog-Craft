import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDb from '@/lib/ConnectDb';
import UserModel from '@/model/UserModel';

export async function POST(req: Request) {
  await connectDb();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.userName },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Set token in HttpOnly cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: { id: user._id, email: user.email, username: user.userName }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
