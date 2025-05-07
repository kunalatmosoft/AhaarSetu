"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { User, Camera, MapPin, Bell, Shield, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ProfileEditPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Hardcoded user data
  const [userData, setUserData] = useState({
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 9876543210",
    address: "123 Food Street, Sector 45, Gurugram, Haryana 122003",
    bio: "I'm passionate about reducing food waste and helping those in need. I work at a restaurant and often see how much good food goes to waste.",
    profileImage: "/placeholder.svg?height=200&width=200",
    role: "Food Provider",
    notificationPreferences: {
      email: true,
      push: true,
      sms: false,
      reservations: true,
      donations: true,
      reminders: true,
      marketing: false,
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleNotificationChange = (key) => {
    setUserData({
      ...userData,
      notificationPreferences: {
        ...userData.notificationPreferences,
        [key]: !userData.notificationPreferences[key],
      },
    })
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    // In a real app, this would make an API call
    alert("Profile updated successfully!")
    router.push("/dashboard")
  }

  const handleDeleteAccount = () => {
    // In a real app, this would make an API call
    alert("Account deleted successfully!")
    router.push("/")
  }

  const handleImageUpload = (e) => {
    // In a real app, this would upload the image to a server
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUserData({
          ...userData,
          profileImage: event.target.result,
        })
      }
      reader.readAsDataURL(e.target.files[0])
    }
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
            <span className="hidden md:inline font-medium">{userData.name}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/dashboard" className="text-yellow-600 hover:underline flex items-center">
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
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                    <Image
                      src={userData.profileImage || "/placeholder.svg"}
                      alt={userData.name}
                      fill
                      className="object-cover"
                    />
                    <label
                      htmlFor="profile-image"
                      className="absolute bottom-0 right-0 bg-yellow-500 text-white p-2 rounded-full cursor-pointer"
                    >
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        id="profile-image"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-gray-500">{userData.email}</p>
                </div>

                <div className="space-y-2">
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "profile" ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Profile Information
                  </Button>
                  <Button
                    variant={activeTab === "address" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "address" ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                    onClick={() => setActiveTab("address")}
                  >
                    <MapPin className="mr-2 h-5 w-5" />
                    Address
                  </Button>
                  <Button
                    variant={activeTab === "notifications" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "notifications" ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-5 w-5" />
                    Notifications
                  </Button>
                  <Button
                    variant={activeTab === "security" ? "default" : "ghost"}
                    className={`w-full justify-start ${activeTab === "security" ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                    onClick={() => setActiveTab("security")}
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    Security
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Button
                    variant="outline"
                    className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "profile" && "Profile Information"}
                  {activeTab === "address" && "Address Information"}
                  {activeTab === "notifications" && "Notification Preferences"}
                  {activeTab === "security" && "Security Settings"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "profile" && "Update your personal information"}
                  {activeTab === "address" && "Update your address for food pickup/delivery"}
                  {activeTab === "notifications" && "Manage how you receive notifications"}
                  {activeTab === "security" && "Manage your account security settings"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Profile Information */}
                {activeTab === "profile" && (
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={userData.name} onChange={handleInputChange} required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={userData.phone} onChange={handleInputChange} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <select
                          id="role"
                          name="role"
                          value={userData.role}
                          onChange={handleInputChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="Food Provider">Food Provider</option>
                          <option value="Food Recipient">Food Recipient</option>
                          <option value="Both">Both</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={userData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us a bit about yourself..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </form>
                )}

                {/* Address Information */}
                {activeTab === "address" && (
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="address">Full Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your complete address..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="City" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="State" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input id="pincode" placeholder="Pincode" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="landmark">Landmark (Optional)</Label>
                      <Input id="landmark" placeholder="Any nearby landmark for easy location" />
                    </div>
                  </form>
                )}

                {/* Notification Preferences */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Notification Channels</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive notifications via email</p>
                          </div>
                          <Switch
                            checked={userData.notificationPreferences.email}
                            onCheckedChange={() => handleNotificationChange("email")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-gray-500">Receive notifications on your device</p>
                          </div>
                          <Switch
                            checked={userData.notificationPreferences.push}
                            onCheckedChange={() => handleNotificationChange("push")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                          </div>
                          <Switch
                            checked={userData.notificationPreferences.sms}
                            onCheckedChange={() => handleNotificationChange("sms")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Notification Types</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Reservation Notifications</p>
                            <p className="text-sm text-gray-500">When someone reserves your food donation</p>
                          </div>
                          <Switch
                            checked={userData.notificationPreferences.reservations}
                            onCheckedChange={() => handleNotificationChange("reservations")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Donation Notifications</p>
                            <p className="text-sm text-gray-500">Updates about your food donations</p>
                          </div>
                          <Switch
                            checked={userData.notificationPreferences.donations}
                            onCheckedChange={() => handleNotificationChange("donations")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Reminder Notifications</p>
                            <p className="text-sm text-gray-500">Reminders for upcoming pickups and donations</p>
                          </div>
                          <Switch
                            checked={userData.notificationPreferences.reminders}
                            onCheckedChange={() => handleNotificationChange("reminders")}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Marketing Notifications</p>
                            <p className="text-sm text-gray-500">Updates about AhaarSetu features and news</p>
                          </div>
                          <Switch
                            checked={userData.notificationPreferences.marketing}
                            onCheckedChange={() => handleNotificationChange("marketing")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === "security" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>

                        <Button className="bg-yellow-500 hover:bg-yellow-600">Update Password</Button>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Enable Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Login Sessions</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Current Session</p>
                              <p className="text-sm text-gray-500">Delhi, India • Chrome on Windows</p>
                              <p className="text-xs text-gray-400 mt-1">Started 2 hours ago</p>
                            </div>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              Active
                            </span>
                          </div>
                        </div>

                        <Button variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          Log Out of All Devices
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  Cancel
                </Button>
                <Button className="bg-yellow-500 hover:bg-yellow-600" onClick={handleProfileUpdate}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot be undone and all your data will be
              permanently removed.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500">
              Please type <span className="font-medium">delete my account</span> to confirm.
            </p>
            <Input className="mt-2" placeholder="delete my account" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
