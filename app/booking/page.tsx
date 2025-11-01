'use client'
import { useState } from 'react'
import Link from 'next/link'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedService.id,
          serviceName: selectedService.name,
          date: selectedDate,
          time: selectedTime,
          customer,
          totalPrice: selectedService.price
        })
      })

      if (response.ok) {
        toast.success('Réservation confirmée ! Vous recevrez un email de confirmation.')
        setStep(4)
      } else {
        throw new Error('Erreur lors de la réservation')
      }
    } catch (error) {
      toast.error('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choisissez votre service</h2>
              <p className="text-gray-600">Sélectionnez le service qui correspond à vos besoins</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedService(service)
                    setStep(2)
                  }}
                  className="p-6 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-all bg-white shadow-sm"
                >
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <Clock size={16} />
                    <span>{service.duration}</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{service.price}€</p>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <button
              onClick={() => setStep(1)}
              className="text-blue-600 hover:text-blue-700 mb-4"
            >
              ← Retour aux services
            </button>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choisissez une date</h2>
              <p className="text-gray-600">Service sélectionné: {selectedService?.name}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {generateDates().map((date) => (
                <motion.button
                  key={date}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedDate(date)
                    setStep(3)
                  }}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-all bg-white"
                >
                  <Calendar className="mx-auto mb-2" size={24} />
                  {new Date(date).toLocaleDateString('fr-FR', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short'
                  })}
                </motion.button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <button
              onClick={() => setStep(2)}
              className="text-blue-600 hover:text-blue-700 mb-4"
            >
              ← Changer la date
            </button>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choisissez un horaire</h2>
              <p className="text-gray-600">
                {new Date(selectedDate).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {timeSlots.map((time) => (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTime(time)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedTime === time
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <Clock className="mx-auto mb-2" size={24} />
                  {time}
                </motion.button>
              ))}
            </div>

            {selectedTime && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
              >
                <h3 className="text-2xl font-bold text-center mb-6">Vos informations</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <User size={16} className="inline mr-2" />
                      Prénom
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.firstName}
                      onChange={(e) => setCustomer({...customer, firstName: e.target.value})}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <User size={16} className="inline mr-2" />
                      Nom
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.lastName}
                      onChange={(e) => setCustomer({...customer, lastName: e.target.value})}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => setCustomer({...customer, email: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} />
                  Confirmer la réservation
                </motion.button>
              </motion.form>
            )}
          </div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={40} className="text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Réservation confirmée !</h2>
            <p className="text-gray-600 mb-8">Un email de confirmation vous a été envoyé</p>
            <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto mb-8">
              <div className="space-y-3 text-left">
                <p><strong>Service:</strong> {selectedService?.name}</p>
                <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('fr-FR')}</p>
                <p><strong>Heure:</strong> {selectedTime}</p>
                <p><strong>Prix:</strong> {selectedService?.price}€</p>
              </div>
            </div>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Retour à l'accueil
            </Link>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex justify-center items-center gap-4 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > s ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  )
}
