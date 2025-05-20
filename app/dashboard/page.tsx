"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Plus, User, Utensils, Package, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Hardcoded user data
  const userData = {
    name: "Kunal Singh",
    email: "Kunal@example.com",
    role: "Food Provider",
    joinedDate: "January 2025",
    donationsCount: 24,
    mealsProvided: 560,
    impactPoints: 1250
  };
  
  // Hardcoded data
  const recentActivities = [
    {
      title: "Donated Veg Biryani",
      description: "You donated 20 servings of vegetarian biryani",
      date: "Today, 2:30 PM",
      location: "Connaught Place, Delhi",
      status: "Completed",
      icon: <Utensils className="w-4 h-4 text-green-600" />,
      iconBg: "bg-green-100"
    },
    {
      title: "Reserved Dal-Chawal",
      description: "You reserved 5 servings of dal-chawal",
      date: "Yesterday, 6:00 PM",
      location: "AIIMS Metro Station",
      status: "Completed",
      icon: <Package className="w-4 h-4 text-blue-600" />,
      iconBg: "bg-blue-100"
    },
    {
      title: "Scheduled Donation",
      description: "You scheduled a donation of 15 sandwiches",
      date: "Tomorrow, 12:00 PM",
      location: "Rajiv Chowk Metro Station",
      status: "Pending",
      icon: <Calendar className="w-4 h-4 text-yellow-600" />,
      iconBg: "bg-yellow-100"
    }
  ];

  const upcomingEvents = [
    {
      title: "Paneer Rice",
      servings: 25,
      time: "Available until 8 PM",
      location: "Sector 45, Gurugram",
      image: "https://www.whiskaffair.com/wp-content/uploads/2019/08/Paneer-Pulao-1-3.jpg"
    },
    {
      title: "Veg Biryani",
      servings: 40,
      time: "Available until 7 PM",
      location: "Connaught Place, Delhi",
      image: "https://www.dwarakaorganic.com/wp-content/uploads/2012/06/Veg-Biryani-Recipe.jpg"
    }
  ];

  const myDonations = [
    {
      title: "Veg Biryani",
      description: "Leftover biryani from a corporate event. Still hot and packed in containers.",
      date: "Today",
      time: "Available until 7 PM",
      location: "Connaught Place, Delhi",
      servings: 40,
      status: "Active",
      image: "https://www.dwarakaorganic.com/wp-content/uploads/2012/06/Veg-Biryani-Recipe.jpg"
    },
    {
      title: "Sandwiches",
      description: "Fresh vegetable sandwiches from our cafe.",
      date: "Tomorrow",
      time: "12:00 PM - 3:00 PM",
      location: "Rajiv Chowk Metro Station",
      servings: 15,
      status: "Scheduled",
      image: "https://tse3.mm.bing.net/th?id=OIP.33XiTji_o9X_vdy0kiy47QHaE8&cb=iwc1&rs=1&pid=ImgDetMain"
    },
    {
      title: "Rajma Chawal",
      description: "Homemade rajma chawal in disposable containers.",
      date: "Yesterday",
      time: "1:00 PM - 4:00 PM",
      location: "Lajpat Nagar Market",
      servings: 10,
      status: "Completed",
      image: "https://veganbell.com/wp-content/uploads/2021/09/Dal-Chawal-7-1024x1024.jpg"
    }
  ];

  const myReservations = [
    {
      title: "Dal-Chawal",
      description: "Simple yet nutritious dal and rice prepared by community kitchen.",
      provider: "Community Kitchen Delhi",
      date: "Tomorrow",
      time: "6:00 PM - 8:00 PM",
      location: "AIIMS Metro Station",
      servings: 5,
      status: "Upcoming",
      image: "https://veganbell.com/wp-content/uploads/2021/09/Dal-Chawal-7-1024x1024.jpg"
    },
    {
      title: "Chole Bhature",
      description: "Delicious chole bhature from our restaurant.",
      provider: "Punjabi Tadka Restaurant",
      date: "Last Week",
      time: "1:00 PM - 3:00 PM",
      location: "Karol Bagh",
      servings: 2,
      status: "Completed",
      image: "https://th.bing.com/th/id/OIP.YGqlNOtPrArJPfnkCF7kAAHaJQ?cb=iwc1&rs=1&pid=ImgDetMain"
    }
  ];

  const achievements = [
    {
      title: "First Donation",
      description: "Made your first food donation",
      icon: <Award className="w-6 h-6 text-yellow-600" />,
      bgColor: "bg-yellow-100"
    },
    {
      title: "Hunger Hero",
      description: "Provided 100+ meals",
      icon: <Award className="w-6 h-6 text-yellow-600" />,
    },
    {
      title: "Regular Donor",
      description: "Donated 5 weeks in a row",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      bgColor: "bg-blue-100"
    },
    {
      title: "Food Saver",
      description: "Saved 50kg of food waste",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
      bgColor: "bg-purple-100"
    }
  ];

  const impactTimeline = [
    {
      title: "Joined AhaarSetu",
      description: "Started your journey to fight hunger and food waste",
      date: "January 15, 2023",
      icon: <User className="w-4 h-4 text-blue-600" />,
      iconBg: "bg-blue-100"
    },
    {
      title: "First Donation",
      description: "Donated 20 servings of vegetarian biryani",
      date: "January 20, 2023",
      icon: <Utensils className="w-4 h-4 text-yellow-600" />,
      iconBg: "bg-yellow-100"
    },
    {
      title: "Reached 100 Meals",
      description: "Your donations have provided 100 meals to those in need",
      date: "March 5, 2023",
      icon: <Award className="w-4 h-4 text-green-600" />,
      iconBg: "bg-green-100"
    },
    {
      title: "Became Regular Donor",
      description: "Consistently donated for 5 weeks in a row",
      date: "April 10, 2023",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      iconBg: "bg-purple-100"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-bold text-yellow-600">AhaarSetu</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/notifications">
              <Button variant="outline" size="icon">
                <span className="relative">
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    3
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                </span>
              </Button>
            </Link>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <User className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{userData.name}</p>
                <p className="text-xs text-gray-500">{userData.role}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                    <User className="w-12 h-12 text-yellow-600" />
                  </div>
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-gray-500">{userData.email}</p>
                  <Badge className="mt-2 bg-yellow-500">{userData.role}</Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Member since</span>
                    <span className="font-medium">{userData.joinedDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Donations</span>
                    <span className="font-medium">{userData.donationsCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Meals provided</span>
                    <span className="font-medium">{userData.mealsProvided}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Impact points</span>
                    <span className="font-medium">{userData.impactPoints}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link href="/profile/edit">
                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 space-y-2">
              <Button 
                variant={activeTab === "overview" ? "default" : "ghost"} 
                className={`w-full justify-start ${activeTab === "overview" ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                Overview
              </Button>
              <Button 
                variant={activeTab === "my-donations" ? "default" : "ghost"} 
                className={`w-full justify-start ${activeTab === "my-donations" ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                onClick={() => setActiveTab("my-donations")}
              >
                <Utensils className="mr-2 h-5 w-5" />
                My Donations
              </Button>
              <Button 
                variant={activeTab === "reservations" ? "default" : "ghost"} 
                className={`w-full justify-start ${activeTab === "reservations" ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                onClick={() => setActiveTab("reservations")}
              >
                <Package className="mr-2 h-5 w-5" />
                My Reservations
              </Button>
              <Button 
                variant={activeTab === "impact" ? "default" : "ghost"} 
                className={`w-full justify-start ${activeTab === "impact" ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                onClick={() => setActiveTab("impact")}
              >
                <Award className="mr-2 h-5 w-5" />
                My Impact
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="rounded-full bg-green-100 p-3 mb-4">
                        <Utensils className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-3xl font-bold">{userData.donationsCount}</h3>
                      <p className="text-gray-500">Total Donations</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="rounded-full bg-blue-100 p-3 mb-4">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-3xl font-bold">{userData.mealsProvided}</h3>
                      <p className="text-gray-500">Meals Provided</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="rounded-full bg-yellow-100 p-3 mb-4">
                        <Award className="h-6 w-6 text-yellow-600" />
                      </div>
                      <h3 className="text-3xl font-bold">{userData.impactPoints}</h3>
                      <p className="text-gray-500">Impact Points</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest donations and reservations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50">
                          <div className={`rounded-full p-2 ${activity.iconBg}`}>
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-gray-500">{activity.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {activity.date}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {activity.location}
                              </div>
                            </div>
                          </div>
                          <Badge className={activity.status === "Completed" ? "bg-green-500" : "bg-yellow-500"}>
                            {activity.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Upcoming Food Events</CardTitle>
                      <CardDescription>Food donations available near you</CardDescription>
                    </div>
                    <Link href="/browse">
                      <Button variant="outline">View All</Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                          <div className="relative h-32">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{event.title}</h4>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                {event.servings} left
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </div>
                            <Button className="w-full mt-3 bg-yellow-500 hover:bg-yellow-600 text-xs h-8">
                              Reserve Now
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "my-donations" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Donations</h2>
                  <Link href="/donate/new">
                    <Button className="bg-yellow-500 hover:bg-yellow-600">
                      <Plus className="mr-2 h-4 w-4" />
                      New Donation
                    </Button>
                  </Link>
                </div>
                
                <Tabs defaultValue="active">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="active" className="space-y-4 mt-4">
                    {myDonations.filter(d => d.status === "Active").map((donation, index) => (
                      <DonationCard key={index} donation={donation} />
                    ))}
                    
                    {myDonations.filter(d => d.status === "Active").length === 0 && (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No active donations</h3>
                        <p className="mt-1 text-gray-500">You don't have any active food donations right now.</p>
                        <Link href="/donate/new">
                          <Button className="mt-4 bg-yellow-500 hover:bg-yellow-600">
                            Create New Donation
                          </Button>
                        </Link>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="scheduled" className="space-y-4 mt-4">
                    {myDonations.filter(d => d.status === "Scheduled").map((donation, index) => (
                      <DonationCard key={index} donation={donation} />  
                    ))}
                    
                    {myDonations.filter(d => d.status === "Scheduled").length === 0 && (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No scheduled donations</h3>
                        <p className="mt-1 text-gray-500">You don't have any scheduled food donations right now.</p>
                        <Link href="/donate/new">
                          <Button className="mt-4 bg-yellow-500 hover:bg-yellow-600">
                            Schedule a Donation
                          </Button>
                        </Link>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="completed" className="space-y-4 mt-4">
                    {myDonations.filter(d => d.status === "Completed").map((donation, index) => (
                      <DonationCard key={index} donation={donation} />
                    ))}
                    
                    {myDonations.filter(d => d.status === "Completed").length === 0 && (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No completed donations</h3>
                        <p className="mt-1 text-gray-500">You haven't completed any food donations yet.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {activeTab === "reservations" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Reservations</h2>
                  <Link href="/browse">
                    <Button className="bg-yellow-500 hover:bg-yellow-600">
                      <Plus className="mr-2 h-4 w-4" />
                      Find Food
                    </Button>
                  </Link>
                </div>
                
                <Tabs defaultValue="upcoming">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upcoming" className="space-y-4 mt-4">
                    {myReservations.filter(r => r.status === "Upcoming").map((reservation, index) => (
                      <ReservationCard key={index} reservation={reservation} />
                    ))}
                    
                    {myReservations.filter(r => r.status === "Upcoming").length === 0 && (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No upcoming reservations</h3>
                        <p className="mt-1 text-gray-500">You don't have any upcoming food reservations.</p>
                        <Link href="/browse">
                          <Button className="mt-4 bg-yellow-500 hover:bg-yellow-600">
                            Browse Available Food
                          </Button>
                        </Link>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="past" className="space-y-4 mt-4">
                    {myReservations.filter(r => r.status === "Completed").map((reservation, index) => (
                      <ReservationCard key={index} reservation={reservation} />
                    ))}
                    
                    {myReservations.filter(r => r.status === "Completed").length === 0 && (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No past reservations</h3>
                        <p className="mt-1 text-gray-500">You haven't completed any food reservations yet.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {activeTab === "impact" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">My Impact</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="rounded-full bg-green-100 p-3 mb-4">
                        <Utensils className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-3xl font-bold">{userData.mealsProvided}</h3>
                      <p className="text-gray-500">Meals Provided</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="rounded-full bg-blue-100 p-3 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                      </div>
                      <h3 className="text-3xl font-bold">120</h3>
                      <p className="text-gray-500">kg CO₂ Saved</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="rounded-full bg-yellow-100 p-3 mb-4">
                        <Award className="h-6 w-6 text-yellow-600" />
                      </div>
                      <h3 className="text-3xl font-bold">{userData.impactPoints}</h3>
                      <p className="text-gray-500">Impact Points</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Impact Achievements</CardTitle>
                    <CardDescription>Badges earned through your contributions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg">
                          <div className={`w-16 h-16 rounded-full ${achievement.bgColor} flex items-center justify-center mb-3`}>
                            {achievement.icon}
                          </div>
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Impact Timeline</CardTitle>
                    <CardDescription>Your journey of making a difference</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {impactTimeline.map((item, index) => (
                        <div key={index} className="flex">
                          <div className="mr-4 flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center`}>
                              {item.icon}
                            </div>
                            {index < impactTimeline.length - 1 && (
                              <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                            )}
                          </div>
                          <div className="pb-6">
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                            <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Component for donation card
const DonationCard = ({ donation }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-32 h-24 rounded-md overflow-hidden">
            <Image 
              src={donation.image || "/placeholder.svg"} 
              alt={donation.title} 
              width={128}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-bold">{donation.title}</h3>
              <Badge className={
                donation.status === "Active" ? "bg-green-500" : 
                donation.status === "Scheduled" ? "bg-blue-500" : "bg-gray-500"
              }>
                {donation.status}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mt-1">{donation.description}</p>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {donation.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {donation.time}
              </div>
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {donation.location}
              </div>
              <div className="flex items-center">
                <Utensils className="w-3 h-3 mr-1" />
                {donation.servings} servings
              </div>
            </div>
          </div>
          
          <div className="flex flex-row md:flex-col gap-2 justify-end">
            <Button variant="outline" size="sm">Edit</Button>
            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">Cancel</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for reservation card
const ReservationCard = ({ reservation }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-32 h-24 rounded-md overflow-hidden">
            <Image 
              src={reservation.image || "/placeholder.svg"} 
              alt={reservation.title} 
              width={128}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-bold">{reservation.title}</h3>
              <Badge className={
                reservation.status === "Upcoming" ? "bg-yellow-500" : "bg-gray-500"
              }>
                {reservation.status}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mt-1">Provider: {reservation.provider}</p>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {reservation.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {reservation.time}
              </div>
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {reservation.location}
              </div>
              <div className="flex items-center">
                <Utensils className="w-3 h-3 mr-1" />
                {reservation.servings} servings
              </div>
            </div>
          </div>
          
          <div className="flex flex-row md:flex-col gap-2 justify-end">
            {reservation.status === "Upcoming" ? (
              <>
                <Button variant="outline" size="sm">Get Directions</Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">Cancel</Button>
              </>
            ) : (
              <Button variant="outline" size="sm">View Details</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
