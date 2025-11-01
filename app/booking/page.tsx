'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Mail, Phone, Check, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

const services = [
  { id: 1, name: 'Consultation Premium', duration: '60 min', price: 150 },
  { id: 2, name: 'Formation IA', duration: '2h', price: 300 },
  { id: 3, name: 'Audit Processus', duration: '90 min', price: 250 },
  { id: 4, name: 'Workshop Innovation', duration: '3h', price: 450 }
]

const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  const handleBooking = async () => {
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: selectedService,
          date: selectedDate,
          time: selectedTime,
          customer
        })
      })
      
      if (response.ok) {
        setStep(4)
        toast.success('Réservation confirmée !')
      } else {
        toast.error('Erreur de réservation')
      }
    } catch (error) {
      toast.error('Erreur de connexion')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AutoBooker</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Réservez Votre Rendez-vous</h1>
          <p className="text-xl text-gray-600">Étape {step} sur 4</p>
        </div>

        <div className="card p-8">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Choisissez votre service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedService?.id === service.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      setSelectedService(service)
                      setStep(2)
                    }}
                  >
                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.duration}</p>
                    <span className="text-2xl font-bold text-blue-600">{service.price}€</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Date et heure</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Date</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {generateDates().map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 text-left rounded-lg border ${
                          selectedDate === date ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        {new Date(date).toLocaleDateString('fr-FR')}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Heure</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 text-center rounded-lg border ${
                          selectedTime === time ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(1)} className="btn-secondary">Retour</button>
                <button 
                  onClick={() => selectedDate && selectedTime && setStep(3)} 
                  className="btn-primary"
                  disabled={!selectedDate || !selectedTime}
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Customer Info */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Vos informations</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={customer.firstName}
                    onChange={(e) => setCustomer({...customer, firstName: e.target.value})}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    value={customer.lastName}
                    onChange={(e) => setCustomer({...customer, lastName: e.target.value})}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={customer.email}
                  onChange={(e) => setCustomer({...customer, email: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={customer.phone}
                  onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(2)} className="btn-secondary">Retour</button>
                <button onClick={handleBooking} className="btn-primary">Confirmer</button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Réservation Confirmée ! 🎉</h2>
              <p className="text-xl text-gray-600 mb-8">Votre rendez-vous a été enregistré avec succès.</p>
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">Détails :</h3>
                <p><strong>Service:</strong> {selectedService?.name}</p>
                <p><strong>Date:</strong> {selectedDate}</p>
                <p><strong>Heure:</strong> {selectedTime}</p>
              </div>
              <Link href="/dashboard" className="btn-primary">Accéder au Dashboard</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}