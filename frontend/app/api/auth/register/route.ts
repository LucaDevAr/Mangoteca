import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import User from '@/models/User'
import connectDB from '@/lib/connectDb'

export async function POST(req: Request) {
  try {
    await connectDB()

    const { username, email, password } = await req.json()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ message: 'An error occurred during registration' }, { status: 500 })
  }
}