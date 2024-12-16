import { Phone, Mail, Globe } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CardPreviewProps {
	name: string
	role: string
	gradient: string
	logo: File | string | null
}

function getInitials(name: string) {
	return name
		.split(' ')
		.map(n => n[0])
		.join('')
		.toUpperCase()
}

export default function CardPreview({
	name,
	role,
	gradient,
	logo
}: CardPreviewProps) {
	const [logoUrl, setLogoUrl] = useState<string | null>(null)

	useEffect(() => {
		if (logo instanceof File) {
			setLogoUrl(URL.createObjectURL(logo))
		} else if (typeof logo === 'string') {
			setLogoUrl(logo)
		} else {
			setLogoUrl(null)
		}
	}, [logo])

	return (
		<div
			className={`w-64 h-40 rounded-xl ${gradient} text-white p-4 shadow-lg`}
		>
			<div className="relative h-full flex flex-col justify-between">
				{/* Logo or Initials */}
				<div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
					{logoUrl ? (
						<img
							src={logoUrl}
							alt="Business Logo"
							className="w-full h-full object-cover"
						/>
					) : (
						<span className="text-lg font-bold">
							{getInitials(name || 'Your Name')}
						</span>
					)}
				</div>

				{/* Card holder name */}
				<div>
					<h2 className={`text-lg font-bold text-white`}>
						{name || 'Your Name'}
					</h2>
					<p className="text-xs text-white/80">{role || 'Your Role'}</p>
				</div>

				{/* Contact icons */}
				<div className="flex space-x-2">
					<Phone className="w-4 h-4" />
					<Mail className="w-4 h-4" />
					<Globe className="w-4 h-4" />
				</div>

				{/* Decorative elements */}
				<div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
				<div className="absolute bottom-0 left-0 w-10 h-10 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2" />
			</div>
		</div>
	)
}
