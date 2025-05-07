import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-bold text-yellow-600">AhaarSetu</span>
          </Link>

          <div className="hidden md:flex gap-6 text-gray-700 font-medium">
            <Link href="/" className="hover:text-yellow-600 transition">
              Home
            </Link>
            <Link href="/about" className="text-yellow-600 font-semibold">
              About
            </Link>
            <Link href="/browse" className="hover:text-yellow-600 transition">
              Browse
            </Link>
            <Link href="/dashboard" className="hover:text-yellow-600 transition">
              Dashboard
            </Link>
          </div>

          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Our Mission to End Food Waste & Hunger
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                AhaarSetu is a platform that connects food providers with excess food to people and organizations in
                need, creating a bridge between abundance and scarcity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/browse">
                  <Button className="bg-yellow-500 hover:bg-yellow-600">Browse Food Events</Button>
                </Link>
                <Link href="/donate/new">
                  <Button variant="outline">Donate Food</Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/logo.jpg?height=400&width=600"
                alt="People sharing food"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg text-gray-600">
              AhaarSetu was born from a simple observation: while millions go hungry every day, tons of perfectly good
              food is wasted. We decided to create a solution.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-bold mb-2">The Beginning</h3>
                <p className="text-gray-600">
                  Started in 2022 by a group of college students who noticed the amount of food wasted in their campus
                  cafeteria.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Growth</h3>
                <p className="text-gray-600">
                  Expanded to multiple cities across India, connecting thousands of food providers with those in need.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔮</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Vision</h3>
                <p className="text-gray-600">
                  Working towards a future where no food is wasted and no one goes hungry, one meal at a time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">
              Every day, we're making a difference in communities across India. Here's what we've achieved so far.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <h3 className="text-4xl font-bold text-yellow-600 mb-2">50,000+</h3>
              <p className="text-lg font-medium">Meals Donated</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <h3 className="text-4xl font-bold text-yellow-600 mb-2">1,200+</h3>
              <p className="text-lg font-medium">Food Providers</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <h3 className="text-4xl font-bold text-yellow-600 mb-2">20+</h3>
              <p className="text-lg font-medium">Cities Covered</p>
            </div>
          </div>

          <div className="mt-12 bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-center">Environmental Impact</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <h4 className="text-3xl font-bold text-green-600 mb-2">15,000 kg</h4>
                <p className="text-gray-600">Food Waste Prevented</p>
              </div>

              <div className="text-center">
                <h4 className="text-3xl font-bold text-green-600 mb-2">28,500 kg</h4>
                <p className="text-gray-600">CO₂ Emissions Saved</p>
              </div>

              <div className="text-center">
                <h4 className="text-3xl font-bold text-green-600 mb-2">4.5 million</h4>
                <p className="text-gray-600">Liters of Water Conserved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              The passionate individuals behind AhaarSetu who are committed to making a difference.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-yellow-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
            <p className="text-lg text-gray-600">
              We collaborate with organizations that share our vision of reducing food waste and hunger.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="h-12 object-contain mb-4"
                />
                <h3 className="text-lg font-bold mb-2">{partner.name}</h3>
                <p className="text-gray-600 text-center text-sm">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Find answers to common questions about AhaarSetu.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 font-medium">{faq.question}</div>
                <div className="p-4 text-gray-600">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-yellow-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Whether you're a restaurant with surplus food, an NGO serving communities, or an individual who wants to
            make a difference, there's a place for you in the AhaarSetu community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login?register=true">
              <Button className="bg-yellow-500 hover:bg-yellow-600">Sign Up Now</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="AhaarSetu Logo" width={40} height={40} className="rounded-full" />
                <span className="text-xl font-bold text-yellow-500">AhaarSetu</span>
              </div>
              <p className="text-gray-300 mb-4">
                Bridging the gap between surplus food and hunger, one meal at a time.
              </p>
            </div>

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
                  <Link href="/donate/new" className="text-gray-300 hover:text-yellow-500">
                    Donate Food
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-500">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li>123 Food Street, Hunger Lane</li>
                <li>New Delhi, India 110001</li>
                <li>help@ahaarsetu.org</li>
                <li>+91 123 456 7890</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-500">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} AhaarSetu. All rights reserved.</p>
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
    </div>
  )
}

// Hardcoded data
const teamMembers = [
  {
    name: "Rahul Sharma",
    role: "Founder & CEO",
    bio: "Former restaurant manager who witnessed food waste firsthand and decided to make a change.",
    image: "/placeholder.svg?height=128&width=128",
  },
  {
    name: "Priya Singh",
    role: "COO",
    bio: "Social entrepreneur with 10+ years of experience in non-profit management.",
    image: "/placeholder.svg?height=128&width=128",
  },
  {
    name: "Amit Kumar",
    role: "CTO",
    bio: "Tech enthusiast who believes in using technology for social good.",
    image: "/placeholder.svg?height=128&width=128",
  },
  {
    name: "Neha Patel",
    role: "Community Manager",
    bio: "Passionate about building communities and creating meaningful connections.",
    image: "/placeholder.svg?height=128&width=128",
  },
]

const partners = [
  {
    name: "Delhi Food Bank",
    description:
      "A non-profit organization dedicated to collecting and distributing food to those in need across Delhi NCR.",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    name: "Feeding India",
    description: "Working to end hunger and malnutrition by providing meals to underprivileged communities.",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    name: "Zomato Feeding",
    description: "The CSR initiative of Zomato that aims to tackle food waste and hunger in India.",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    name: "Robin Hood Army",
    description:
      "A volunteer-based organization that works to get surplus food from restaurants to the less fortunate.",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    name: "Hotel Association of India",
    description: "Supporting our mission by encouraging hotels to donate their surplus food.",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    name: "Green Earth NGO",
    description: "Environmental organization focused on reducing food waste and its impact on climate change.",
    logo: "/placeholder.svg?height=60&width=120",
  },
]

const faqs = [
  {
    question: "How does AhaarSetu work?",
    answer:
      "AhaarSetu connects food providers (restaurants, caterers, individuals) who have surplus food with people and organizations in need. Providers can list their available food, and recipients can reserve it for pickup.",
  },
  {
    question: "Is the food safe to eat?",
    answer:
      "Yes, all food providers on our platform agree to follow food safety guidelines. We also have a rating and review system to ensure quality. However, we recommend consuming the food as soon as possible after pickup.",
  },
  {
    question: "How can I donate food?",
    answer:
      "Sign up as a food provider, then click on 'Donate Food' to list your available food items. Provide details like quantity, pickup location, and available time.",
  },
  {
    question: "Is there a cost to use AhaarSetu?",
    answer:
      "No, AhaarSetu is completely free for both food providers and recipients. Our mission is to reduce food waste and hunger, not to make a profit.",
  },
  {
    question: "Can I donate money instead of food?",
    answer:
      "Yes, we accept monetary donations that help us maintain the platform, expand to new cities, and run awareness campaigns. Visit our 'Donate' page to contribute.",
  },
  {
    question: "How can I volunteer with AhaarSetu?",
    answer:
      "We're always looking for volunteers to help with food pickup and delivery, community outreach, and more. Sign up on our 'Volunteer' page to join our team.",
  },
]
