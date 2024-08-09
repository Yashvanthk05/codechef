import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import bcrypt from 'bcryptjs';

export const POST = async (req) => {
  const { username, password, email } = await req.json();

  try {
    await connectToDB();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return new NextResponse(JSON.stringify({ error: "User already exists" }), { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      message:['']
    });

    await newUser.save();

    return new NextResponse(JSON.stringify(newUser), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to create user" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
