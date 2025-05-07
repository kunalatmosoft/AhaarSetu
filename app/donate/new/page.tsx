"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, AlertTriangle, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewDonationPage() {
  const router = useRouter()
  const [donationStep, setDonationStep] = useState(1)
  const [donationType, setDonationType] = useState("immediate")
  const [foodDetails, setFoodDetails] = useState({
    title: "",
    description: "",
    servings: "",
    expiryTime: "",
    foodType: "vegetarian",
    containsAllergens: {
      dairy: false,
      nuts: false,
      gluten: false,
      soy: false,
      eggs: false,
    },
    pickupAddress: "",
    pickupInstructions: "",
    images: [],
  })
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFoodDetails({
      ...foodDetails,
      [name]: value,
    })
  }

  const handleAllergenChange = (allergen) => {
    setFoodDetails({
      ...foodDetails,
      containsAllergens: {
        ...foodDetails.containsAllergens,
        [allergen]: !foodDetails.containsAllergens[allergen],
      },
    })
  }

  const handleImageUpload = (e) => {
    // In a real app, this would upload the image to a server
    // For now, we'll just simulate adding image URLs
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setFoodDetails({
        ...foodDetails,
        images: [...foodDetails.images, ...newImages],
      })
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!foodDetails.title.trim()) newErrors.title = "Title is required"
      if (!foodDetails.description.trim()) newErrors.description = "Description is required"
      if (!foodDetails.servings || Number.parseInt(foodDetails.servings) <= 0) {
        newErrors.servings = "Valid number of servings is required"
      }
      if (!foodDetails.expiryTime) newErrors.expiryTime = "Expiry time is required"
    }

    if (step === 2) {
      if (!foodDetails.pickupAddress.trim()) newErrors.pickupAddress = "Pickup address is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(donationStep)) {
      setDonationStep(donationStep + 1)
    }
  }

  const prevStep = () => {
    setDonationStep(donationStep - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateStep(donationStep)) {
      // In a real app, this would submit the form data to a server
      console.log("Donation submitted:", foodDetails)
      setShowSuccessDialog(true)
    }
  }

  const goToDashboard = () => {
    router.push("/dashboard")
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-yellow-600"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="hidden md:inline font-medium">Rahul Sharma</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Food Donation</h1>
          <p className="text-gray-600 mt-2">
            Share your surplus food with those in need. Fill in the details below to create a new food donation.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${donationStep >= 1 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                1
              </div>
              <div className={`h-1 w-12 ${donationStep >= 2 ? "bg-yellow-500" : "bg-gray-200"}`}></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${donationStep >= 2 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                2
              </div>
              <div className={`h-1 w-12 ${donationStep >= 3 ? "bg-yellow-500" : "bg-gray-200"}`}></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${donationStep >= 3 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                3
              </div>
            </div>
            <div className="hidden md:block text-sm text-gray-500">Step {donationStep} of 3</div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={donationStep >= 1 ? "text-yellow-600 font-medium" : "text-gray-500"}>Food Details</span>
            <span className={donationStep >= 2 ? "text-yellow-600 font-medium" : "text-gray-500"}>
              Pickup Information
            </span>
            <span className={donationStep >= 3 ? "text-yellow-600 font-medium" : "text-gray-500"}>Review & Submit</span>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Food Details */}
              {donationStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-base">
                      Food Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="E.g., Vegetable Biryani, Sandwiches, etc."
                      value={foodDetails.title}
                      onChange={handleInputChange}
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-base">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the food, its condition, and any other relevant details."
                      value={foodDetails.description}
                      onChange={handleInputChange}
                      className={`min-h-[100px] ${errors.description ? "border-red-500" : ""}`}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="servings" className="text-base">
                        Number of Servings
                      </Label>
                      <Input
                        id="servings"
                        name="servings"
                        type="number"
                        placeholder="E.g., 10"
                        min="1"
                        value={foodDetails.servings}
                        onChange={handleInputChange}
                        className={errors.servings ? "border-red-500" : ""}
                      />
                      {errors.servings && <p className="text-red-500 text-sm mt-1">{errors.servings}</p>}
                    </div>

                    <div>
                      <Label htmlFor="expiryTime" className="text-base">
                        Available Until
                      </Label>
                      <Input
                        id="expiryTime"
                        name="expiryTime"
                        type="time"
                        value={foodDetails.expiryTime}
                        onChange={handleInputChange}
                        className={errors.expiryTime ? "border-red-500" : ""}
                      />
                      {errors.expiryTime && <p className="text-red-500 text-sm mt-1">{errors.expiryTime}</p>}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base">Food Type</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${foodDetails.foodType === "vegetarian" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                        onClick={() => setFoodDetails({ ...foodDetails, foodType: "vegetarian" })}
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                            <span className="text-green-600">🥗</span>
                          </div>
                          <span className="font-medium">Vegetarian</span>
                        </div>
                      </div>

                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${foodDetails.foodType === "non-vegetarian" ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                        onClick={() => setFoodDetails({ ...foodDetails, foodType: "non-vegetarian" })}
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
                            <span className="text-red-600">🍗</span>
                          </div>
                          <span className="font-medium">Non-Vegetarian</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base">Contains Allergens</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="dairy"
                          checked={foodDetails.containsAllergens.dairy}
                          onCheckedChange={() => handleAllergenChange("dairy")}
                        />
                        <label
                          htmlFor="dairy"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Dairy
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="nuts"
                          checked={foodDetails.containsAllergens.nuts}
                          onCheckedChange={() => handleAllergenChange("nuts")}
                        />
                        <label
                          htmlFor="nuts"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Nuts
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="gluten"
                          checked={foodDetails.containsAllergens.gluten}
                          onCheckedChange={() => handleAllergenChange("gluten")}
                        />
                        <label
                          htmlFor="gluten"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Gluten
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="soy"
                          checked={foodDetails.containsAllergens.soy}
                          onCheckedChange={() => handleAllergenChange("soy")}
                        />
                        <label
                          htmlFor="soy"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Soy
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="eggs"
                          checked={foodDetails.containsAllergens.eggs}
                          onCheckedChange={() => handleAllergenChange("eggs")}
                        />
                        <label
                          htmlFor="eggs"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Eggs
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" className="bg-yellow-500 hover:bg-yellow-600" onClick={nextStep}>
                      Next: Pickup Information
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Pickup Information */}
              {donationStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="donationType" className="text-base">
                      Donation Type
                    </Label>
                    <Tabs defaultValue={donationType} className="mt-2" onValueChange={setDonationType}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="immediate">Immediate (Today)</TabsTrigger>
                        <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                      </TabsList>
                      <TabsContent value="immediate" className="pt-4">
                        <div className="bg-yellow-50 p-4 rounded-lg flex items-start">
                          <Info className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                          <p className="text-sm text-gray-700">
                            Your food donation will be available for pickup immediately after submission until the
                            specified expiry time today.
                          </p>
                        </div>
                      </TabsContent>
                      <TabsContent value="scheduled" className="pt-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="scheduleDate">Date</Label>
                              <Input id="scheduleDate" type="date" min={new Date().toISOString().split("T")[0]} />
                            </div>
                            <div>
                              <Label htmlFor="scheduleTime">Time</Label>
                              <Input id="scheduleTime" type="time" />
                            </div>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                            <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                            <p className="text-sm text-gray-700">
                              Your food donation will be scheduled for the selected date and time. You can cancel or
                              modify it anytime before the scheduled time.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div>
                    <Label htmlFor="pickupAddress" className="text-base">
                      Pickup Address
                    </Label>
                    <Textarea
                      id="pickupAddress"
                      name="pickupAddress"
                      placeholder="Enter the complete address where the food can be picked up"
                      value={foodDetails.pickupAddress}
                      onChange={handleInputChange}
                      className={errors.pickupAddress ? "border-red-500" : ""}
                    />
                    {errors.pickupAddress && <p className="text-red-500 text-sm mt-1">{errors.pickupAddress}</p>}
                  </div>

                  <div>
                    <Label htmlFor="pickupInstructions" className="text-base">
                      Pickup Instructions (Optional)
                    </Label>
                    <Textarea
                      id="pickupInstructions"
                      name="pickupInstructions"
                      placeholder="Any specific instructions for pickup? E.g., 'Ask for Rahul at the reception', 'Park in the visitor area', etc."
                      value={foodDetails.pickupInstructions}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label className="text-base">Upload Images (Optional)</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="flex flex-col items-center">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          id="image-upload"
                          onChange={handleImageUpload}
                        />
                        <label htmlFor="image-upload">
                          <Button type="button" variant="outline" size="sm">
                            Browse Files
                          </Button>
                        </label>
                      </div>

                      {foodDetails.images.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {foodDetails.images.map((image, index) => (
                            <div key={index} className="relative h-20 rounded overflow-hidden">
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`Food image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                              <button
                                type="button"
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                onClick={() => {
                                  const newImages = [...foodDetails.images]
                                  newImages.splice(index, 1)
                                  setFoodDetails({ ...foodDetails, images: newImages })
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Adding clear images of the food helps recipients make informed decisions.
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="button" className="bg-yellow-500 hover:bg-yellow-600" onClick={nextStep}>
                      Next: Review
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit */}
              {donationStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-bold">Review Your Donation</h2>
                    <p className="text-gray-600">
                      Please review the information below before submitting your food donation.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-4">Food Details</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Title</p>
                            <p className="font-medium">{foodDetails.title || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Description</p>
                            <p>{foodDetails.description || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Servings</p>
                            <p className="font-medium">{foodDetails.servings || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Food Type</p>
                            <p className="font-medium capitalize">{foodDetails.foodType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Allergens</p>
                            <p>
                              {Object.entries(foodDetails.containsAllergens)
                                .filter(([_, value]) => value)
                                .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
                                .join(", ") || "None specified"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-4">Pickup Information</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Donation Type</p>
                            <p className="font-medium capitalize">
                              {donationType === "immediate" ? "Immediate (Today)" : "Scheduled"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Available Until</p>
                            <p className="font-medium">{foodDetails.expiryTime || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Pickup Address</p>
                            <p>{foodDetails.pickupAddress || "Not provided"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Pickup Instructions</p>
                            <p>{foodDetails.pickupInstructions || "None provided"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {foodDetails.images.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-medium text-gray-900 mb-4">Images</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                          {foodDetails.images.map((image, index) => (
                            <div key={index} className="relative h-20 rounded overflow-hidden">
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`Food image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Important</p>
                      <p className="text-sm text-gray-700">
                        By submitting this donation, you confirm that the food is safe for consumption and has been
                        handled properly. You agree to be available for pickup during the specified time.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600">
                      Submit Donation
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Donation Created Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              Your food donation has been posted and is now visible to potential recipients.
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
              Your contribution will help reduce food waste and feed those in need. You'll be notified when someone
              reserves your food donation.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg w-full">
              <h4 className="font-medium mb-2">Donation Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="font-medium w-24">Title:</span>
                  <span>{foodDetails.title}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-24">Servings:</span>
                  <span>{foodDetails.servings}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-24">Available:</span>
                  <span>{donationType === "immediate" ? "Today until " + foodDetails.expiryTime : "Scheduled"}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-24">Location:</span>
                  <span>{foodDetails.pickupAddress}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button variant="outline" onClick={() => router.push("/browse")}>
              Browse Other Donations
            </Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600" onClick={goToDashboard}>
              Go to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
