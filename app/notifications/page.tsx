"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check, Clock, MapPin, User, Calendar, Package, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Hardcoded notifications data
  const notifications = [
    {
      id: 1,
      type: "reservation",
      title: "Your food has been reserved",
      message: "Priya Singh has reserved 5 servings of your Veg Biryani donation.",
      time: "10 minutes ago",
      isRead: false,
      actionUrl: "/dashboard",
      icon: <Package className="h-5 w-5 text-blue-600" />,
      iconBg: "bg-blue-100",
    },
    {
      id: 2,
      type: "reminder",
      title: "Pickup reminder",
      message: "Don't forget to pick up your reserved Dal-Chawal today at 6:00 PM from AIIMS Metro Station.",
      time: "1 hour ago",
      isRead: false,
      actionUrl: "/event/3",
      icon: <Clock className="h-5 w-5 text-yellow-600" />,
      iconBg: "bg-yellow-100",
    },
    {
      id: 3,
      type: "system",
      title: "Welcome to AhaarSetu!",
      message:
        "Thank you for joining our mission to reduce food waste and hunger. Start by browsing available food or donating your surplus.",
      time: "2 days ago",
      isRead: true,
      actionUrl: "/browse",
      icon: <Bell className="h-5 w-5 text-green-600" />,
      iconBg: "bg-green-100",
    },
    {
      id: 4,
      type: "donation",
      title: "Donation completed",
      message: "Your Rajma Chawal donation has been successfully picked up. Thank you for your contribution!",
      time: "3 days ago",
      isRead: true,
      actionUrl: "/dashboard",
      icon: <Check className="h-5 w-5 text-green-600" />,
      iconBg: "bg-green-100",
    },
    {
      id: 5,
      type: "alert",
      title: "Food safety alert",
      message: "High temperatures expected today. Please ensure proper storage of food items before pickup.",
      time: "4 days ago",
      isRead: true,
      actionUrl: "/guidelines",
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      iconBg: "bg-red-100",
    },
  ]

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.isRead
    return notification.type === activeTab
  })

  // Mark all as read
  const markAllAsRead = () => {
    // In a real app, this would make an API call
    alert("All notifications marked as read")
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

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <User className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="hidden md:inline font-medium">Rahul Sharma</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="reservation">Reservations</TabsTrigger>
            <TabsTrigger value="donation">Donations</TabsTrigger>
            <TabsTrigger value="reminder">Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
                  <p className="mt-1 text-gray-500">
                    You don't have any {activeTab !== "all" ? activeTab : ""} notifications at the moment.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Notification Card Component
const NotificationCard = ({ notification }) => {
  const [isRead, setIsRead] = useState(notification.isRead)

  const markAsRead = (e) => {
    e.preventDefault()
    // In a real app, this would make an API call
    setIsRead(true)
  }

  return (
    <Link href={notification.actionUrl}>
      <Card className={`hover:shadow-md transition-shadow ${!isRead ? "border-l-4 border-l-yellow-500" : ""}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className={`rounded-full p-2 ${notification.iconBg}`}>{notification.icon}</div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className={`font-medium ${!isRead ? "text-gray-900" : "text-gray-700"}`}>{notification.title}</h3>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
              <p className={`text-sm ${!isRead ? "text-gray-700" : "text-gray-500"}`}>{notification.message}</p>

              {notification.type === "reservation" && (
                <div className="mt-2 text-xs text-gray-500 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>Today</span>
                </div>
              )}

              {notification.type === "reminder" && (
                <div className="mt-2 text-xs text-gray-500 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>AIIMS Metro Station</span>
                </div>
              )}
            </div>

            {!isRead && (
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" onClick={markAsRead}>
                Mark as read
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
