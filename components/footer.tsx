import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react"
import Image from "next/image"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.jpg" alt="AhaarSetu Logo" width={40} height={40} className="rounded-full" />
              <span className="text-xl font-bold text-yellow-500">AhaarSetu</span>
            </div>
            <p className="text-gray-300 mb-4">Bridging the gap between surplus food and hunger, one meal at a time.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-yellow-500">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-yellow-500">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-yellow-500">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-yellow-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-yellow-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-gray-300 hover:text-yellow-500">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link href="/host" className="text-gray-300 hover:text-yellow-500">
                  Host an Event
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-yellow-500">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-yellow-500">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-yellow-500">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-gray-300 hover:text-yellow-500">
                  Food Safety Guidelines
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-gray-300 hover:text-yellow-500">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-300 hover:text-yellow-500">
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:help@ahaarsetu.org" className="text-gray-300 hover:text-yellow-500">
                  help@ahaarsetu.org
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+911234567890" className="text-gray-300 hover:text-yellow-500">
                  +91 123 456 7890
                </a>
              </li>
              <li className="mt-4">
                <p className="text-gray-300">
                  123 Food Street, Hunger Lane
                  <br />
                  New Delhi, India 110001
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; {currentYear} AhaarSetu. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-yellow-500 text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-yellow-500 text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
