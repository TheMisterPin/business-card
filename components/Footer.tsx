import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-800">Business Card Generator</h3>
            <p className="text-sm text-gray-600">Create and share your digital business card</p>
          </div>
          <div className="text-sm text-gray-600">
            <p>Created by <Link href="https://github.com/TheMisterPin" className="text-blue-600 hover:underline">TheMisterPin</Link></p>
            <p>Contact: <a href="mailto:contact@themisterpin.com" className="text-blue-600 hover:underline">contact@themisterpin.com</a></p>
          </div>
        </div>
      </div>
    </footer>
  )
}

