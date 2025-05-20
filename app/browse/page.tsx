"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Filter, Search, Utensils, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import EventCard from "@/components/event-card"

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDistance, setFilterDistance] = useState([5]);
  const [filterServings, setFilterServings] = useState([1]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter events based on search term
  const filteredEvents = foodEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-bold text-yellow-600">AhaarSetu</span>
          </Link>

          <div className="hidden md:flex gap-6 text-gray-700 font-medium">
            <Link href="/" className="hover:text-yellow-600 transition">Home</Link>
            <Link href="/about" className="hover:text-yellow-600 transition">About</Link>
            <Link href="/browse" className="text-yellow-600 font-semibold">Browse</Link>
            <Link href="/dashboard" className="hover:text-yellow-600 transition">Dashboard</Link>
          </div>

          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Available Food Events</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse and reserve food donations near you. Help reduce food waste while feeding those in need.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by food type, location, etc."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>

            <Link href="https://atmomaps.netlify.app/Dashboard" target="_blank">
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                Locations
              </Button>
            </Link>

            <Button className="bg-yellow-500 hover:bg-yellow-600">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {showFilters && (
            <Card className="mt-4">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Distance</h3>
                    <div className="space-y-4">
                      <Slider
                        defaultValue={[5]}
                        max={20}
                        step={1}
                        value={filterDistance}
                        onValueChange={setFilterDistance}
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>0 km</span>
                        <span>{filterDistance[0]} km</span>
                        <span>20 km</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Minimum Servings</h3>
                    <div className="space-y-4">
                      <Slider
                        defaultValue={[1]}
                        max={50}
                        step={1}
                        value={filterServings}
                        onValueChange={setFilterServings}
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>1</span>
                        <span>{filterServings[0]} servings</span>
                        <span>50+</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Food Type</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["Vegetarian", "Non-Vegetarian", "Vegan", "Gluten-Free"].map((type) => (
                        <div key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            id={type}
                            className="mr-2"
                          />
                          <label htmlFor={type} className="text-sm">{type}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button variant="outline" className="mr-2">Reset</Button>
                  <Button className="bg-yellow-500 hover:bg-yellow-600">Apply Filters</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Food Events Tabs */}
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="vegetarian">Vegetarian</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    servings={event.servings}
                    location={event.location}
                    time={event.time}
                    image={event.image}
                    provider={event.provider}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-100 rounded-lg">
                <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No food events found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="nearby" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodEvents.filter(event => event.distance < 3)
                .map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    servings={event.servings}
                    location={event.location}
                    time={event.time}
                    image={event.image}
                    provider={event.provider}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="today" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodEvents.filter(event => event.time === 'Today')
                .map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    servings={event.servings}
                    location={event.location}
                    time={event.time}
                    image={event.image}
                    provider={event.provider}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="vegetarian" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodEvents.filter(event => event.foodType === 'Vegetarian')
                .map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    servings={event.servings}
                    location={event.location}
                    time={event.time}
                    image={event.image}
                    provider={event.provider}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-500 border-t">
        <p>&copy; 2023 AhaarSetu. All rights reserved.</p>
      </footer>
    </div>
  );
}

const foodEvents = [
  {
    id: "1",
    title: "Community Kitchen",
    description: "Free meals for anyone in need. Join us for a warm and nutritious meal.",
    servings: 50,
    location: "123 Main Street, Anytown",
    time: "Today",
    image: "https://th.bing.com/th/id/OIP.ISQxXoVw304PpK3lEpebxAHaFj?cb=iwc1&rs=1&pid=ImgDetMain",
    provider: "Local Church",
    distance: 1.5,
    foodType: "Vegetarian"
  },
  {
    id: "2",
    title: "Food Bank Distribution",
    description: "Pick up groceries and fresh produce. Open to all low-income families.",
    servings: 100,
    location: "456 Elm Avenue, Anytown",
    time: "Tomorrow",
    image: "https://th.bing.com/th/id/OIP.ISQxXoVw304PpK3lEpebxAHaFj?cb=iwc1&rs=1&pid=ImgDetMain",
    provider: "Food Bank of Anytown",
    distance: 5,
    foodType: "Non-Vegetarian"
  },
  {
    id: "3",
    title: "Soup Kitchen",
    description: "Hot soup and bread served daily. No questions asked.",
    servings: 30,
    location: "789 Oak Street, Anytown",
    time: "Today",
    image: "https://th.bing.com/th/id/OIP.ISQxXoVw304PpK3lEpebxAHaFj?cb=iwc1&rs=1&pid=ImgDetMain",
    provider: "Homeless Shelter",
    distance: 10,
    foodType: "Vegan"
  },
  {
    id: "4",
    title: "Grocery Giveaway",
    description: "Free groceries for families in need.",
    servings: 60,
    location: "321 Pine Street, Anytown",
    time: "Next Week",
    image: "https://th.bing.com/th/id/OIP.ISQxXoVw304PpK3lEpebxAHaFj?cb=iwc1&rs=1&pid=ImgDetMain",
    provider: "Community Center",
    distance: 2,
    foodType: "Vegetarian"
  },
  {
    id: "5",
    title: "Prepared Meal Service",
    description: "Prepared meals delivered to your door for seniors and disabled individuals.",
    servings: 25,
    location: "Citywide",
    time: "Ongoing",
    image: "https://th.bing.com/th/id/OIP.ISQxXoVw304PpK3lEpebxAHaFj?cb=iwc1&rs=1&pid=ImgDetMain",
    provider: "Meals on Wheels",
    distance: 7,
    foodType: "Non-Vegetarian"
  },
  {
    id: "6",
    title: "Leftover Rescue",
    description: "Rescuing leftover food from restaurants and catering companies to distribute to those in need.",
    servings: 40,
    location: "Various Locations",
    time: "Daily",
    image: "https://th.bing.com/th/id/OIP.ISQxXoVw304PpK3lEpebxAHaFj?cb=iwc1&rs=1&pid=ImgDetMain",
    provider: "Food Rescue Organization",
    distance: 3,
    foodType: "Gluten-Free"
  },
];
