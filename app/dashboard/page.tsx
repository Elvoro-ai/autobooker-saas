'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Users, TrendingUp, Clock, Plus, Bell, Sparkles } from 'lucide-react'

const stats = [
  { title: 'Réservations', value: '2,847', change: '+12.5%', icon: CalendarDays },
  { title: 'Conversion', value: '68.3%', change: '+5.2%', icon: TrendingUp },
  { title: 'Clients', value: '1,294', change: '+8.1%', icon: Users },
  { title: 'Temps Moyen', value: '2.4min', change: '-15.3%', icon: Clock }
]

const bookings = [
  { id: 1, client: 'Sophie Martin', service: 'Consultation Premium', date: '01/11/2025', status: 'confirmed' },
  { id: 2, client: 'Thomas Dubois', service: 'Formation IA', date: '02/11/2025', status: 'pending' },
  { id: 3, client: 'Marie Leclerc', service: 'Audit Processus', date: '03/11/2025', status: 'confirmed' }
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AutoBooker</span>
              <span className="text-xl font-semibold text-gray-900 ml-8">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-400 rounded-full"></span>
              </button>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                👨‍💼
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Bonjour ! 👋</h2>
          <p className="text-gray-600">Voici un aperçu de vos performances.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Recent Bookings */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-6">Réservations Récentes</h3>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{booking.client}</p>
                  <p className="text-sm text-gray-600">{booking.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{booking.date}</p>
                  <span className={`px-2 py-1 rounded text-xs ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}