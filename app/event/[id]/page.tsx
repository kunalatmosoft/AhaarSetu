"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User, Utensils, Share2, Flag, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Hardcoded food events data (this would come from a database in a real app)
const foodEvents = [
  {
    id: 1,
    title: "Paneer Rice",
    description: "Freshly prepared paneer rice from Hotel Taj. Pickup available for the next 3 hours.",
    longDescription:
      "This is a special batch of paneer rice prepared by our expert chefs at Hotel Taj. The dish contains basmati rice, fresh paneer, mixed vegetables, and our special blend of spices. It's packed in eco-friendly containers and kept at the right temperature. Each serving is approximately 300g and provides a complete nutritious meal.",
    servings: 25,
    servingsReserved: 12,
    location: "Sector 45, Gurugram",
    fullAddress: "Hotel Taj, Plot 3, Sector 45, Gurugram, Haryana 122003",
    time: "Available until 8 PM",
    date: "Today",
    provider: "Hotel Taj",
    providerType: "Restaurant",
    providerRating: 4.8,
    providerImage: "/placeholder.svg?height=50&width=50",
    image: "https://tse1.mm.bing.net/th?id=OIP.jJI3bTJ-diLfKDHb9-vwmwHaE8&cb=iwc1&rs=1&pid=ImgDetMain",
    foodType: "Vegetarian",
    containsAllergens: ["Dairy"],
    distance: 2.5,
    postedAt: "2 hours ago",
    nutritionInfo: {
      calories: "450 kcal",
      protein: "15g",
      carbs: "60g",
      fat: "12g",
    },
    reviews: [
      {
        user: "Amit Kumar",
        rating: 5,
        comment: "The food was fresh and delicious. Thank you for the donation!",
        date: "Yesterday",
      },
      {
        user: "Priya Singh",
        rating: 4,
        comment: "Good quality food and easy pickup process.",
        date: "Last week",
      },
    ],
  },
  {
    id: 2,
    title: "Veg Biryani",
    description: "Leftover biryani from a corporate event. Still hot and packed in containers.",
    longDescription:
      "This vegetarian biryani was prepared for a corporate lunch event and we have about 40 servings left. The biryani contains basmati rice, mixed vegetables, and authentic spices. It's still hot and has been stored properly. Each serving is packed in a disposable container with a spoon.",
    servings: 40,
    servingsReserved: 15,
    location: "Connaught Place, Delhi",
    fullAddress: "Conference Hall, Block A, Connaught Place, New Delhi, Delhi 110001",
    time: "Available until 7 PM",
    date: "Today",
    provider: "Delhi Caterers",
    providerType: "Catering Service",
    providerRating: 4.5,
    providerImage: "/placeholder.svg?height=50&width=50",
    image: "https://tse1.mm.bing.net/th?id=OIP.jJI3bTJ-diLfKDHb9-vwmwHaE8&cb=iwc1&rs=1&pid=ImgDetMain",
    foodType: "Vegetarian",
    containsAllergens: ["Nuts"],
    distance: 1.8,
    postedAt: "3 hours ago",
    nutritionInfo: {
      calories: "380 kcal",
      protein: "10g",
      carbs: "65g",
      fat: "8g",
    },
    reviews: [
      {
        user: "Rahul Verma",
        rating: 5,
        comment: "The biryani was delicious and still warm when I picked it up.",
        date: "Today",
      },
    ],
  },
  {
    id: 3,
    title: "Dal-Chawal",
    description: "Simple yet nutritious dal and rice prepared by community kitchen.",
    longDescription:
      "Our community kitchen has prepared fresh dal (lentil curry) and rice for distribution. This is a simple yet nutritious meal that provides essential proteins and carbohydrates. The food is freshly cooked and packed in eco-friendly containers. Each serving contains 200g of rice and 150g of dal.",
    servings: 100,
    servingsReserved: 45,
    location: "AIIMS Metro Station",
    fullAddress: "Community Kitchen, Near Exit 2, AIIMS Metro Station, New Delhi, Delhi 110029",
    time: "Available until 9 PM",
    date: "Today",
    provider: "Community Kitchen Delhi",
    providerType: "NGO",
    providerRating: 4.9,
    providerImage: "/placeholder.svg?height=50&width=50",
    image: "https://tse1.mm.bing.net/th?id=OIP.jJI3bTJ-diLfKDHb9-vwmwHaE8&cb=iwc1&rs=1&pid=ImgDetMain",
    foodType: "Vegetarian",
    containsAllergens: [],
    distance: 3.2,
    postedAt: "1 hour ago",
    nutritionInfo: {
      calories: "320 kcal",
      protein: "12g",
      carbs: "55g",
      fat: "5g",
    },
    reviews: [
      {
        user: "Neha Sharma",
        rating: 5,
        comment: "Very nutritious meal. The dal was perfectly cooked.",
        date: "Yesterday",
      },
      {
        user: "Vikram Patel",
        rating: 5,
        comment: "Simple food but very satisfying. Thank you!",
        date: "Last week",
      },
      {
        user: "Sanjay Gupta",
        rating: 4,
        comment: "Good quality and quantity. Appreciate the service.",
        date: "Last week",
      },
    ],
  },
  {
    id: 4,
    title: "Dal-Chawal",
    description: "Simple yet nutritious dal and rice prepared by community kitchen.",
    longDescription:
      "Our community kitchen has prepared fresh dal (lentil curry) and rice for distribution. This is a simple yet nutritious meal that provides essential proteins and carbohydrates. The food is freshly cooked and packed in eco-friendly containers. Each serving contains 200g of rice and 150g of dal.",
    servings: 100,
    servingsReserved: 45,
    location: "AIIMS Metro Station",
    fullAddress: "Community Kitchen, Near Exit 2, AIIMS Metro Station, New Delhi, Delhi 110029",
    time: "Available until 9 PM",
    date: "Today",
    provider: "Community Kitchen Delhi",
    providerType: "NGO",
    providerRating: 4.9,
    providerImage: "/placeholder.svg?height=50&width=50",
    image: "https://tse1.mm.bing.net/th?id=OIP.jJI3bTJ-diLfKDHb9-vwmwHaE8&cb=iwc1&rs=1&pid=ImgDetMain",
    foodType: "Vegetarian",
    containsAllergens: [],
    distance: 3.2,
    postedAt: "1 hour ago",
    nutritionInfo: {
      calories: "320 kcal",
      protein: "12g",
      carbs: "55g",
      fat: "5g",
    },
    reviews: [
      {
        user: "Neha Sharma",
        rating: 5,
        comment: "Very nutritious meal. The dal was perfectly cooked.",
        date: "Yesterday",
      },
      {
        user: "Vikram Patel",
        rating: 5,
        comment: "Simple food but very satisfying. Thank you!",
        date: "Last week",
      },
      {
        user: "Sanjay Gupta",
        rating: 4,
        comment: "Good quality and quantity. Appreciate the service.",
        date: "Last week",
      },
    ],
  },
  {
    id: 5,
    title: "Dal-Chawal",
    description: "Simple yet nutritious dal and rice prepared by community kitchen.",
    longDescription:
      "Our community kitchen has prepared fresh dal (lentil curry) and rice for distribution. This is a simple yet nutritious meal that provides essential proteins and carbohydrates. The food is freshly cooked and packed in eco-friendly containers. Each serving contains 200g of rice and 150g of dal.",
    servings: 100,
    servingsReserved: 45,
    location: "AIIMS Metro Station",
    fullAddress: "Community Kitchen, Near Exit 2, AIIMS Metro Station, New Delhi, Delhi 110029",
    time: "Available until 9 PM",
    date: "Today",
    provider: "Community Kitchen Delhi",
    providerType: "NGO",
    providerRating: 4.9,
    providerImage: "/placeholder.svg?height=50&width=50",
    image: "https://tse1.mm.bing.net/th?id=OIP.jJI3bTJ-diLfKDHb9-vwmwHaE8&cb=iwc1&rs=1&pid=ImgDetMain",
    foodType: "Vegetarian",
    containsAllergens: [],
    distance: 3.2,
    postedAt: "1 hour ago",
    nutritionInfo: {
      calories: "320 kcal",
      protein: "12g",
      carbs: "55g",
      fat: "5g",
    },
    reviews: [
      {
        user: "Neha Sharma",
        rating: 5,
        comment: "Very nutritious meal. The dal was perfectly cooked.",
        date: "Yesterday",
      },
      {
        user: "Vikram Patel",
        rating: 5,
        comment: "Simple food but very satisfying. Thank you!",
        date: "Last week",
      },
      {
        user: "Sanjay Gupta",
        rating: 4,
        comment: "Good quality and quantity. Appreciate the service.",
        date: "Last week",
      },
    ],
  },
  {
    id: 6,
    title: "Dal-Chawal",
    description: "Simple yet nutritious dal and rice prepared by community kitchen.",
    longDescription:
      "Our community kitchen has prepared fresh dal (lentil curry) and rice for distribution. This is a simple yet nutritious meal that provides essential proteins and carbohydrates. The food is freshly cooked and packed in eco-friendly containers. Each serving contains 200g of rice and 150g of dal.",
    servings: 100,
    servingsReserved: 45,
    location: "AIIMS Metro Station",
    fullAddress: "Community Kitchen, Near Exit 2, AIIMS Metro Station, New Delhi, Delhi 110029",
    time: "Available until 9 PM",
    date: "Today",
    provider: "Community Kitchen Delhi",
    providerType: "NGO",
    providerRating: 4.9,
    providerImage: "/placeholder.svg?height=50&width=50",
    image: "https://tse1.mm.bing.net/th?id=OIP.jJI3bTJ-diLfKDHb9-vwmwHaE8&cb=iwc1&rs=1&pid=ImgDetMain",
    foodType: "Vegetarian",
    containsAllergens: [],
    distance: 3.2,
    postedAt: "1 hour ago",
    nutritionInfo: {
      calories: "320 kcal",
      protein: "12g",
      carbs: "55g",
      fat: "5g",
    },
    reviews: [
      {
        user: "Neha Sharma",
        rating: 5,
        comment: "Very nutritious meal. The dal was perfectly cooked.",
        date: "Yesterday",
      },
      {
        user: "Vikram Patel",
        rating: 5,
        comment: "Simple food but very satisfying. Thank you!",
        date: "Last week",
      },
      {
        user: "Sanjay Gupta",
        rating: 4,
        comment: "Good quality and quantity. Appreciate the service.",
        date: "Last week",
      },
    ],
  },
]

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const eventId = Number.parseInt(params.id)
  const [servingsToReserve, setServingsToReserve] = useState(1)
  const [isReserved, setIsReserved] = useState(false)
  const [showReservationSuccess, setShowReservationSuccess] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [reportReason, setReportReason] = useState("")

  // Find the event by ID
  const event = foodEvents.find((e) => e.id === eventId)

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">The food event you're looking for doesn't exist or has been removed.</p>
          <Link href="/browse">
            <Button className="bg-yellow-500 hover:bg-yellow-600">Browse Other Events</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleReserve = () => {
    // In a real app, this would make an API call to reserve the food
    setIsReserved(true)
    setShowReservationSuccess(true)
    // After 3 seconds, redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard")
    }, 3000)
  }

  const handleReport = () => {
    // In a real app, this would submit a report
    alert("Thank you for your report. We'll review it shortly.")
    setShowReportDialog(false)
    setReportReason("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-bold text-yellow-600">AhaarSetu</span>
          </Link>

          <div className="hidden md:flex gap-6 text-gray-700 font-medium">
            <Link href="/" className="hover:text-yellow-600 transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-yellow-600 transition">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/browse" className="text-yellow-600 hover:underline flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Browse
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-64 md:h-80">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button variant="outline" size="icon" className="bg-white rounded-full h-10 w-10">
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white rounded-full h-10 w-10"
                    onClick={() => setShowReportDialog(true)}
                  >
                    <Flag className="h-5 w-5 text-gray-700" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{event.foodType}</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      {event.servings - event.servingsReserved} servings left
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={event.providerImage || "/placeholder.svg"}
                      alt={event.provider}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{event.provider}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-yellow-500 mr-1"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        {event.providerRating}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{event.providerType}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{event.longDescription}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-yellow-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{event.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-yellow-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-yellow-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{event.fullAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Utensils className="w-5 h-5 text-yellow-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Servings</p>
                      <p className="font-medium">
                        {event.servings} total ({event.servings - event.servingsReserved} available)
                      </p>
                    </div>
                  </div>
                </div>

                {event.containsAllergens.length > 0 && (
                  <div className="bg-yellow-50 p-4 rounded-lg mb-6 flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Allergen Information</p>
                      <p className="text-sm text-gray-700">Contains: {event.containsAllergens.join(", ")}</p>
                    </div>
                  </div>
                )}

                <Tabs defaultValue="details">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews ({event.reviews.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">About this food donation</h3>
                        <p className="text-gray-700">{event.longDescription}</p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Pickup Instructions</h3>
                        <p className="text-gray-700">
                          Please bring your own bags if possible. Mention your reservation ID at the pickup point. Call
                          the provider 10 minutes before arrival.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Food Safety</h3>
                        <p className="text-gray-700">
                          This food has been stored according to food safety guidelines. Please consume within 4 hours
                          of pickup.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="nutrition">
                    <div className="space-y-4">
                      <h3 className="font-medium mb-2">Nutrition Information (per serving)</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-500">Calories</p>
                          <p className="font-bold text-lg">{event.nutritionInfo.calories}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-500">Protein</p>
                          <p className="font-bold text-lg">{event.nutritionInfo.protein}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-500">Carbs</p>
                          <p className="font-bold text-lg">{event.nutritionInfo.carbs}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-500">Fat</p>
                          <p className="font-bold text-lg">{event.nutritionInfo.fat}</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 mt-4">
                        Note: Nutrition information is approximate and may vary.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews">
                    <div className="space-y-6">
                      {event.reviews.map((review, index) => (
                        <div key={index} className="border-b pb-4 last:border-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                                <User className="w-4 h-4 text-yellow-600" />
                              </div>
                              <span className="font-medium">{review.user}</span>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill={i < review.rating ? "currentColor" : "none"}
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-yellow-500"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-1">{review.comment}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      ))}

                      {event.reviews.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No reviews yet</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Right Column - Reservation Card */}
          <div>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Reserve Food</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available servings</span>
                    <span className="font-medium">{event.servings - event.servingsReserved}</span>
                  </div>

                  <div>
                    <Label htmlFor="servings">How many servings do you need?</Label>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setServingsToReserve(Math.max(1, servingsToReserve - 1))}
                        disabled={servingsToReserve <= 1}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                        </svg>
                      </Button>
                      <Input
                        id="servings"
                        type="number"
                        className="mx-2 text-center"
                        value={servingsToReserve}
                        onChange={(e) => {
                          const value = Number.parseInt(e.target.value)
                          if (!isNaN(value) && value >= 1 && value <= event.servings - event.servingsReserved) {
                            setServingsToReserve(value)
                          }
                        }}
                        min={1}
                        max={event.servings - event.servingsReserved}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setServingsToReserve(Math.min(event.servings - event.servingsReserved, servingsToReserve + 1))
                        }
                        disabled={servingsToReserve >= event.servings - event.servingsReserved}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="pickup-time">Pickup Time</Label>
                    <select
                      id="pickup-time"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                    >
                      <option>As soon as possible</option>
                      <option>Within 1 hour</option>
                      <option>Within 2 hours</option>
                      <option>Within 3 hours</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Special Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any dietary restrictions or pickup instructions..."
                      className="mt-2"
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-yellow-500 hover:bg-yellow-600"
                  onClick={handleReserve}
                  disabled={isReserved}
                >
                  {isReserved ? "Reserved!" : "Reserve Food"}
                </Button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  By reserving, you agree to pick up the food at the specified time and location.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Food Events */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Food Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {foodEvents
              .filter((e) => e.id !== event.id)
              .map((similarEvent) => (
                <Link href={`/event/${similarEvent.id}`} key={similarEvent.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="h-48 relative">
                      <Image
                        src={similarEvent.image || "/placeholder.svg"}
                        alt={similarEvent.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{similarEvent.title}</h3>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {similarEvent.servings - similarEvent.servingsReserved} left
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{similarEvent.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        {similarEvent.location}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </main>

      {/* Reservation Success Dialog */}
      <Dialog open={showReservationSuccess} onOpenChange={setShowReservationSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Reservation Successful!</DialogTitle>
            <DialogDescription className="text-center">
              You have successfully reserved {servingsToReserve} servings of {event.title}.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Thank You!</h3>
            <p className="text-center text-gray-600 mb-4">
              Your reservation details have been sent to your email and phone. Please pick up your food at the specified
              time and location.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg w-full">
              <h4 className="font-medium mb-2">Pickup Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="font-medium w-24">Location:</span>
                  <span>{event.fullAddress}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-24">Time:</span>
                  <span>{event.time}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-24">Servings:</span>
                  <span>{servingsToReserve}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-24">Reservation ID:</span>
                  <span>
                    AHS-
                    {Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Report this food event</DialogTitle>
            <DialogDescription>
              If you believe this food event violates our guidelines or contains incorrect information, please let us
              know.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="report-reason">Reason for reporting</Label>
              <select
                id="report-reason"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              >
                <option value="">Select a reason</option>
                <option value="expired">Food is expired/no longer available</option>
                <option value="quality">Poor food quality</option>
                <option value="safety">Food safety concern</option>
                <option value="scam">Potential scam</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-details">Additional details</Label>
              <Textarea
                id="report-details"
                placeholder="Please provide more information about your concern..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReportDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-500 hover:bg-red-600" onClick={handleReport} disabled={!reportReason}>
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
