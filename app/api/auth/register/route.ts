import { NextRequest, NextResponse } from 'next/server';
import dbToConnect from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import registerSchema from '@/schemas/register';

export async function POST(req: NextRequest) {
  try {
    await dbToConnect();

    // ✅ Parse and validate input
    const body = await req.json();
    const parsedData = registerSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsedData.error.format() },
        { status: 400 },
      );
    }

    const { name, email, password } = parsedData.data;

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    await User.create({ name, email, password });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Something went wrong, please try again' }, { status: 500 });
  }
}
