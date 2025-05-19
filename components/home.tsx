"use client"

import type React from "react"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import HowItWorks from "@/components/how-it-works"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const Home = () => {
  const [mealsDonated, setMealsDonated] = useState(12450)
  const [form, setForm] = useState({ name: "", email: "", amount: "" })
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "#top" },
    { name: "About", href: "#about" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Login", href: "/login" },
    { name: "Donate", href: "/transaction" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.name && form.email && form.amount) {
      setMealsDonated(mealsDonated + Number.parseInt(form.amount))
      alert("Thank you for your donation! ❤️")
      setForm({ name: "", email: "", amount: "" })
    }
  }

  return (
    <>
      <main className="font-sans text-gray-800 bg-white" id="top">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <a href="#top" className="flex items-center gap-2">
              <Image src="/logo.jpg" alt="Logo" className="object-cover rounded-full" width={40} height={40} />
              <span className="text-2xl font-bold text-yellow-600">AhaarSetu</span>
            </a>
            <div className="hidden md:flex gap-6 text-gray-700 font-medium">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className="hover:text-yellow-600 transition">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={28} /> : <Menu size={28} />}</button>
            </div>
          </div>
          {menuOpen && (
            <div className="md:hidden bg-white border-t">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 border-b text-gray-700 hover:bg-yellow-100"
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-b from-ahaarsetu-cream to-white pt-32 pb-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ahaarsetu-brown">
                  Connect Surplus Food with Those in Need
                </h1>
                <p className="text-xl text-ahaarsetu-brown/80">
                  AhaarSetu bridges the gap between food providers and charities, ensuring that surplus food reaches
                  those who need it most.
                </p>
                <p className="text-lg font-semibold text-yellow-600">"Your Extra Can Be Someone's Enough"</p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link
                    href="/browse"
                    className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg font-medium px-8 py-4 rounded-lg shadow-md transition duration-300 text-center"
                  >
                    Browse Events
                  </Link>
                  <Link
                    href="/dashboard"
                    className="bg-green-600 hover:bg-green-700 text-white text-lg font-medium px-8 py-4 rounded-lg shadow-md transition duration-300 text-center"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-3xl w-full h-full"></div>
                  <Image
                    src="/logo.jpg"
                    alt="AhaarSetu Logo"
                    width={320}
                    height={320}
                    className="relative w-64 h-64 md:w-80 md:h-80 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Marquee with Links */}
        <div className="bg-yellow-300 text-yellow-900 py-2 overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block min-w-full">
            <a href="/browse" className="inline-block mx-4 hover:underline">
              🍛 Paneer Rice at Sector 45
            </a>
            <a href="/browse" className="inline-block mx-4 hover:underline">
              🍱 Veg Biryani near Connaught Place
            </a>
            <a href="/browse" className="inline-block mx-4 hover:underline">
              🍲 Dal-Chawal at AIIMS Metro
            </a>
            <a href="/browse" className="inline-block mx-4 hover:underline">
              🍔 Sandwiches at Rajiv Chowk Exit 3
            </a>
            <a href="/browse" className="inline-block mx-4 hover:underline">
              🍚 Free Thali at Lajpat Nagar Gurudwara
            </a>
          </div>
        </div>

        {/* About */}
        <section id="about" className="py-20 px-6 md:px-20 bg-white text-center">
          <h2 className="text-3xl font-bold mb-4">Why AhaarSetu?</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Millions go to bed hungry every day. Your small contribution can make a huge impact. We're on a mission to
            feed communities in need, one meal at a time.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            <div className="bg-yellow-50 p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍲</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Reduce Food Waste</h3>
              <p>Help restaurants, caterers, and individuals donate their surplus food instead of throwing it away.</p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Feed the Hungry</h3>
              <p>
                Connect with local shelters, community kitchens, and individuals in need to provide nutritious meals.
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Build Community</h3>
              <p>Create a network of caring individuals and organizations working together to solve hunger locally.</p>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works">
          <HowItWorks />
        </section>

        {/* Featured Food Events */}
        <section className="py-20 px-6 md:px-20 bg-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Available Food Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {foodEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-yellow-600">{event.title}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {event.servings} servings
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>📍 {event.location}</span>
                    <span>⏰ {event.time}</span>
                  </div>
                  <Button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600">Reserve Food</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/browse" className="inline-block text-yellow-600 font-medium hover:underline">
              View All Food Events →
            </Link>
          </div>
        </section>

        {/* Meal Counter */}
        <section className="bg-yellow-50 py-16 text-center">
          <h2 className="text-3xl font-bold mb-2">Meals Donated So Far</h2>
          <p className="text-5xl font-extrabold text-yellow-600">{mealsDonated.toLocaleString()}</p>
          <p className="mt-4 max-w-md mx-auto text-gray-600">
            Join our mission to reduce food waste and hunger. Every meal counts!
          </p>
        </section>

        {/* Donate Form */}
        <section id="donate" className="py-20 px-6 md:px-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Make a Donation</h2>
                <p className="text-lg mb-6">
                  Your donation helps us connect more food providers with people in need. Every ₹10 helps provide a
                  nutritious meal to someone facing hunger.
                </p>
                <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                  <h3 className="font-bold text-lg mb-2">Your Impact</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">✓</span>
                      ₹100 = 10 meals for hungry children
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">✓</span>
                      ₹500 = Feed a family for a week
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">✓</span>
                      ₹1000 = Support a community kitchen for a day
                    </li>
                  </ul>
                </div>
              </div>

              <form onSubmit={handleDonate} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium mb-2">
                      Donation Amount (₹)
                    </label>
                    <Input
                      id="amount"
                      type="number"
                      name="amount"
                      placeholder="Enter amount"
                      value={form.amount}
                      onChange={handleChange}
                      required
                      min="1"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 rounded-lg"
                    >
                      Donate Now
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Donors & Needy People */}
        <section className="py-20 px-6 md:px-20 bg-gray-50 text-center">
          <h2 className="text-3xl font-bold mb-8">Community Voices</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow text-left">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-yellow-600">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-gray-700">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 px-6 md:px-20 bg-white text-center">
          <h2 className="text-3xl font-bold mb-8">Our Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 max-w-4xl mx-auto">
            {partners.map((partner, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition-all">
                <Image
                  src={partner.logo || "/logo.jpg"}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}

// Hardcoded data
const foodEvents = [
  {
    id: 1,
    title: "Paneer Rice",
    description: "Freshly prepared paneer rice from Hotel Taj. Pickup available for the next 3 hours.",
    servings: 25,
    location: "Sector 45, Gurugram",
    time: "Available until 8 PM",
    image: "https://th.bing.com/th/id/OIP.PDEarGsxrhTJXsjK2-17uQHaHa?cb=iwc1&rs=1&pid=ImgDetMain",
  },
  {
    id: 2,
    title: "Veg Biryani",
    description: "Leftover biryani from a corporate event. Still hot and packed in containers.",
    servings: 40,
    location: "Connaught Place, Delhi",
    time: "Available until 7 PM",
    image: "https://tse3.mm.bing.net/th?id=OIP.09w0S6udb6sRvC1qeh3gdQHaE0&cb=iwc1&rs=1&pid=ImgDetMain",
  },
  {
    id: 3,
    title: "Dal-Chawal",
    description: "Simple yet nutritious dal and rice prepared by community kitchen.",
    servings: 100,
    location: "AIIMS Metro Station",
    time: "Available until 9 PM",
    image: "https://tse2.mm.bing.net/th?id=OIP.I_mMIPKCqPrVdpTFJyCQ5wHaHa&cb=iwc1&rs=1&pid=ImgDetMain",
  },
]

const testimonials = [
  {
    name: "Priya Singh",
    role: "Food Recipient",
    quote:
      "This initiative helped me feed my kids during tough times. The food is always fresh and nutritious. Forever grateful.",
    avatar: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg?w=2000",
  },
  {
    name: "Rahul Sharma",
    role: "Regular Donor",
    quote: "It feels good knowing my donation makes a real difference. The platform makes it so easy to contribute.",
    avatar: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg?w=2000",
  },
  {
    name: "Anita's Restaurant",
    role: "Food Provider",
    quote: "Instead of throwing away excess food, we now help feed those in need. It's a win-win for everyone.",
    avatar: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg?w=2000",
  },
]

const partners = [
  { name: "Delhi Food Bank", logo: "/logo.jpg" },
  { name: "Feeding India", logo: "/placeholder.svg" },
  { name: "Zomato Feeding", logo: "/placeholder.svg" },
  { name: "Robin Hood Army", logo: "/placeholder.svg" },
]

export default Home
