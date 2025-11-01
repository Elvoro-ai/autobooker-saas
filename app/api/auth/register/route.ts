import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

let users = [
  { id: 1, email: 'demo@autobooker.com', firstName: 'Demo', lastName: 'User' }
]

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, company, password } = await request.json()
    
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: 'Champs requis manquants' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = {
      id: users.length + 1,
      email,
      firstName,
      lastName,
      company,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    
    const { password: _, ...userResponse } = newUser
    return NextResponse.json({ message: 'Compte créé', user: userResponse }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}