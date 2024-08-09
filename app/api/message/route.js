import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from 'next/server';

export const PATCH = async (req) => {
    const { username, message } = await req.json();

    try {
        await connectToDB();
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return NextResponse.json({ error: "Please Login In" }, { status: 404 });
        }

        existingUser.message = message;
        await existingUser.save();

        return new NextResponse("Successfully Messaged", { status: 200 });
    } catch (error) {
        return new NextResponse("Error in Sending the Message", { status: 500 });
    }
}
