'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CalendarDays, Zap, Shield, Users, ArrowRight, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Réservation Instantanée',
    description: 'Réservez en un clic avec notre IA avancée'
  },
  {
    icon: Shield,
    title: 'Sécurité Maximale',
    description: 'Vos données sont protégées par un chiffrement de niveau bancaire'
  },
  {
    icon: Users,
    title: 'Gestion Multi-Utilisateurs',
    description: 'Collaborez efficacement avec votre équipe'
  },
  {
    icon: CalendarDays,
    title: 'Intégrations Natives',
    description: 'Synchronisation parfaite avec Google Calendar, Outlook'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AutoBooker</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Fonctionnalités</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Tarifs</a>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">Connexion</Link>
              <Link href="/register" className="btn-primary">Essai Gratuit</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Révolutionnez</span><br />
              <span className="text-gray-900">Vos Réservations</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              L'IA la plus avancée pour automatiser, optimiser et transformer votre processus de réservation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/register" className="btn-primary text-lg px-8 py-4 flex items-center">
                Démarrer Gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/booking" className="btn-secondary text-lg px-8 py-4">
                Faire une Réservation
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">2.4M+</div>
                <div className="text-gray-600">Réservations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">12K+</div>
                <div className="text-gray-600">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
                <div className="text-gray-600">Temps Économisé</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">94%</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Fonctionnalités <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Exceptionnelles</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-8 text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Prêt à Révolutionner Vos Réservations ?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Rejoignez plus de 12 000 entreprises qui font confiance à AutoBooker.
          </p>
          <Link href="/register" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg">
            Commencer Maintenant - Gratuit
          </Link>
        </div>
      </section>
    </div>
  )
}