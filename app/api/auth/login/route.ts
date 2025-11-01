import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const users = [
  {
    id: 1,
    email: 'demo@autobooker.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4dg.bV4q2G',
    firstName: 'Demo',
    lastName: 'User'
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Identifiants invalides' }, { status: 401 })
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({ message: 'Connexion réussie', user: { id: user.id, email: user.email } })
    response.cookies.set('auth-token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
    
    return response
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}