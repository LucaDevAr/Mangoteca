import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import connectDB from '@/lib/connectDb'
import User from '@/models/User'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user.lists)
  } catch (error) {
    console.error('Error fetching lists:', error)
    return NextResponse.json({ message: 'An error occurred while fetching lists' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const { name, description } = await req.json()

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    user.lists.push({ name, description })
    await user.save()

    return NextResponse.json(user.lists[user.lists.length - 1], { status: 201 })
  } catch (error) {
    console.error('Error creating list:', error)
    return NextResponse.json({ message: 'An error occurred while creating the list' }, { status: 500 })
  }
}