'use client'

import { useState } from 'react'
import {
	Github,
	Linkedin,
	MessageCircle,
	Phone,
	Mail,
	Globe,
	Share,
	Edit,
	ArrowLeft
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import CardFormDialog from './CardFormDialog'
import { toast } from 'react-hot-toast'
import { BusinessCard as BusinessCardType } from '@prisma/client'

const inter = Inter({ subsets: ['latin'] })

function getInitials(name: string) {
	return name
		.split(' ')
		.map(n => n[0])
		.join('')
		.toUpperCase()
}

interface BusinessCardProps {
	card: BusinessCardType
	onBack: () => void
}

export default function BusinessCard({ card, onBack }: BusinessCardProps) {
	const [isFlipped, setIsFlipped] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [currentCard, setCurrentCard] = useState(card)

	const handleShare = async () => {
		try {
			const response = await fetch(
				`/api/business-cards/${currentCard.id}/share`,
				{
					method: 'POST'
				}
			)
			const data = await response.json()
			if (data.shareUrl) {
				await navigator.clipboard.writeText(data.shareUrl)
				toast.success('Share link copied to clipboard!')
			} else {
				throw new Error('Failed to generate share link')
			}
		} catch (error) {
			toast.error('Failed to generate share link')
		}
	}

	const handleEdit = (updatedCard: BusinessCardType) => {
		setCurrentCard(updatedCard)
		setIsEditDialogOpen(false)
	}

	return (
		<div
			className={`min-h-screen w-full bg-gradient-to-b from-[#f5f0e6] to-[#e6dfd3] flex flex-col items-center justify-center ${inter.className}`}
		>
			<motion.div
				className="relative w-96 h-56 cursor-pointer mb-8 group perspective-1000"
				initial={false}
				animate={{ rotateY: isFlipped ? 180 : 0 }}
				transition={{ duration: 0.6, ease: 'easeInOut' }}
				onClick={() => setIsFlipped(!isFlipped)}
				style={{ transformStyle: 'preserve-3d' }}
			>
				{/* Front of card */}
				<div
					className={`absolute w-full h-full backface-hidden rounded-xl ${currentCard.gradient} text-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out group-hover:scale-105`}
					style={{
						boxShadow:
							'0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), 0 10px 20px rgba(0, 0, 0, 0.15)',
						transform: 'translateZ(20px)'
					}}
				>
					<div className="relative h-full flex flex-col justify-between">
						{/* Logo or Initials */}
						<div className="w-16 h-16 rounded-full overflow-hidden bg-white/20 flex items-center justify-center shadow-md transform transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:translate-z-10">
							{currentCard.logo ? (
								<img
									src={currentCard.logo}
									alt="Business Logo"
									className="w-full h-full object-cover"
								/>
							) : (
								<span className="text-2xl font-bold">
									{getInitials(currentCard.name)}
								</span>
							)}
						</div>

						{/* Card holder name */}
						<div className="transform transition-transform duration-300 ease-in-out group-hover:translate-z-10">
							<h2 className="text-2xl font-bold text-white">
								{currentCard.name}
							</h2>
							<p className="text-sm text-white/80">{currentCard.role}</p>
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
						boxShadow:
							'0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), 0 10px 20px rgba(0, 0, 0, 0.15)'
					}}
				>
					{/* Name and Role */}
					<div className="text-center transform transition-transform duration-300 ease-in-out group-hover:translate-z-10">
						<h2
							className={`text-xl font-bold ${currentCard.gradient} bg-clip-text text-transparent`}
						>
							{currentCard.name}
						</h2>
						<p className="text-sm text-gray-600">{currentCard.role}</p>
					</div>

					{/* Contact Information */}
					<div className="space-y-2 transform transition-transform duration-300 ease-in-out group-hover:translate-z-10">
						<div className="flex items-center space-x-2">
							<Phone className={`w-4 h-4 ${currentCard.gradient}`} />
							<span
								className={`text-sm ${currentCard.gradient} bg-clip-text text-transparent`}
							>
								{currentCard.phone}
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<Mail className={`w-4 h-4 ${currentCard.gradient}`} />
							<span
								className={`text-sm ${currentCard.gradient} bg-clip-text text-transparent`}
							>
								{currentCard.email}
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<Globe className={`w-4 h-4 ${currentCard.gradient}`} />
							<span
								className={`text-sm ${currentCard.gradient} bg-clip-text text-transparent`}
							>
								{currentCard.website}
							</span>
						</div>
					</div>

					{/* Social Icons */}
					<div className="flex justify-center space-x-4 transform transition-transform duration-300 ease-in-out group-hover:translate-z-10">
						{currentCard.whatsapp && (
							<a
								href={currentCard.whatsapp}
								target="_blank"
								rel="noopener noreferrer"
								className={`${currentCard.gradient} hover:opacity-80 transition-opacity`}
								onClick={e => e.stopPropagation()}
							>
								<MessageCircle className="w-6 h-6" />
							</a>
						)}
						{currentCard.github && (
							<a
								href={currentCard.github}
								target="_blank"
								rel="noopener noreferrer"
								className={`${currentCard.gradient} hover:opacity-80 transition-opacity`}
								onClick={e => e.stopPropagation()}
							>
								<Github className="w-6 h-6" />
							</a>
						)}
						{currentCard.linkedin && (
							<a
								href={currentCard.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className={`${currentCard.gradient} hover:opacity-80 transition-opacity`}
								onClick={e => e.stopPropagation()}
							>
								<Linkedin className="w-6 h-6" />
							</a>
						)}
					</div>
				</div>
			</motion.div>
			<div className="fixed bottom-0 left-0 right-0 bg-white shadow-md">
				<div className="container mx-auto flex justify-between items-center w-96 h-14">
					<Button
						onClick={onBack}
						variant="ghost"
						className="text-gray-600 hover:text-gray-900"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back
					</Button>
					<div className="flex items-center space-x-4">
						<Button
							onClick={() => setIsEditDialogOpen(true)}
							className={`${currentCard.gradient} text-white hover:opacity-90`}
						>
							<Edit className="w-4 h-4 mr-2" />
							Edit
						</Button>
						<Button
							onClick={handleShare}
							className={`${currentCard.gradient} text-white hover:opacity-90`}
						>
							<Share className="w-4 h-4 mr-2" />
							Share
						</Button>
					</div>
				</div>
				<div className="text-center py-2 text-sm text-gray-600">
					Created by{' '}
					<Link
						href="https://github.com/TheMisterPin"
						className="text-[#2d4c3b] hover:underline"
					>
						TheMisterPin
					</Link>
				</div>
			</div>
			<CardFormDialog
				isOpen={isEditDialogOpen}
				onClose={() => setIsEditDialogOpen(false)}
				onSubmit={handleEdit}
				initialData={currentCard}
			/>
			<style jsx global>{`
				.perspective-1000 {
					perspective: 1000px;
				}
				.backface-hidden {
					backface-visibility: hidden;
				}
			`}</style>
		</div>
	)
}
