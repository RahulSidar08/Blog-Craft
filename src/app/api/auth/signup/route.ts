import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import connectDb from '@/lib/ConnectDb';
import UserModel from '@/model/UserModel';

export async function POST(req: Request) {
    await connectDb();

    const { userName, email, password } = await req.json();

    if (!userName || !email || !password) {
        return NextResponse.json(
            {
                success: false,
                message: 'All fields are required',
            },
            {
                status: 400,
            }
        );
    }

    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            userName,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({
            message: 'Signup successful',
            user: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (err) {
        console.error('Signup error:', err); // helpful for debugging
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}
