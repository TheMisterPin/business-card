import { Github, Linkedin, MessageCircle, Phone, Mail, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { BusinessCard } from '@prisma/client'

interface SharedBusinessCardProps {
  card: BusinessCard
}

export default function SharedBusinessCard({ card }: SharedBusinessCardProps) {
  return (
    <motion.div
      className="relative w-96 h-56 cursor-pointer group perspective-1000"
      initial={{ rotateY: 0 }}
      whileHover={{ rotateY: 180 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Front of card */}
      <div 
        className={`absolute w-full h-full backface-hidden rounded-xl ${card.gradient} text-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out group-hover:scale-105`}
        style={{ 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), 0 10px 20px rgba(0, 0, 0, 0.15)',
          transform: 'translateZ(20px)',
        }}
      >
        <div className="relative h-full flex flex-col justify-between">
          {/* Logo or Initials */}
          <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20 flex items-center justify-center shadow-md transform transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:translate-z-10">
            {card.logo ? (
              <img src={card.logo} alt="Business Logo" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold">{card.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
            )}
          </div>
          
          {/* Card holder name */}
          <div className="transform transition-transform duration-300 ease-in-out group-hover:translate-z-10">
            <h2 className="text-2xl font-bold text-white">{card.name}</h2>
            <p className="text-sm text-white/80">{card.role}</p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 transform transition-transform duration-300 ease-in-out group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2 transform transition-transform duration-300 ease-in-out group-hover:scale-110" />
        </div>
      </div>

      {/* Back of card */}
      <div 
        className="absolute w-full h-full backface-hidden rounded-xl bg-white p-6 shadow-lg flex flex-col justify-between transform transition-transform duration-300 ease-in-out group-hover:scale-105" 
        style={{ 
          transform: 'rotateY(180deg) translateZ(20px)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), 0 10px 20px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Name and Role */}
        <div className="text-center transform transition-transform duration-300 ease-in-out group-hover:translate-z-10">
          <h2 className={`text-xl font-bold ${card.gradient} bg-clip-text text-transparent`}>{card.name}</h2>
          <p className="text-sm text-gray-600">{card.role}</p>
        </div>

        {/* Contact Information */}
        <div className="space-y-2 transform transition-transform duration-300 ease-in-out group-hover:translate-z-10">
          <div className="flex items-center space-x-2">
            <Phone className={`w-4 h-4 ${card.gradient}`} />
            <span className={`text-sm ${card.gradient} bg-clip-text text-transparent`}>{card.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className={`w-4 h-4 ${card.gradient}`} />
            <span className={`text-sm ${card.gradient} bg-clip-text text-transparent`}>{card.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className={`w-4 h-4 ${card.gradient}`} />
            <span className={`text-sm ${card.gradient} bg-clip-text text-transparent`}>{card.website}</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 transform transition-transform duration-300 ease-in-out group-hover:translate-z-10">
          {card.whatsapp && (
            <a
              href={card.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`${card.gradient} hover:opacity-80 transition-opacity`}
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          )}
          {card.github && (
            <a
              href={card.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${card.gradient} hover:opacity-80 transition-opacity`}
            >
              <Github className="w-6 h-6" />
            </a>
          )}
          {card.linkedin && (
            <a
              href={card.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${card.gradient} hover:opacity-80 transition-opacity`}
            >
              <Linkedin className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

