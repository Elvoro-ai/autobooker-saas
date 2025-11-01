import { NextRequest, NextResponse } from 'next/server'

let bookings: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { service, date, time, customer } = await request.json()
    
    const booking = {
      id: bookings.length + 1,
      service,
      date,
      time,
      customer,
      status: 'confirmed',
      confirmationCode: `AB-${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    
    bookings.push(booking)
    
    return NextResponse.json({ message: 'Réservation créée', booking }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ bookings, total: bookings.length })
}