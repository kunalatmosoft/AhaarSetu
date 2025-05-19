"use client"
import { useState, type FormEvent, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Wallet, Landmark, Heart, Users, BookOpen, Home, Utensils, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PaymentDetails {
  cardNumber?: string
  cardExpiry?: string
  cardCvv?: string
  upiId?: string
  bankName?: string
  method?: string
}

export default function DonationPage() {
  const router = useRouter()
  const [fromAccount, setFromAccount] = useState<string>("")
  const [toAccount, setToAccount] = useState<string>("94261") // Default to the available account
  const [amount, setAmount] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [donorName, setDonorName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false)
  const [donationPurpose, setDonationPurpose] = useState<string>("education")
  const [donationFrequency, setDonationFrequency] = useState<string>("one-time")
  const [wantReceipt, setWantReceipt] = useState<boolean>(true)

  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [transactionId, setTransactionId] = useState<string>("")

  // Card details
  const [cardNumber, setCardNumber] = useState<string>("")
  const [cardExpiry, setCardExpiry] = useState<string>("")
  const [cardCvv, setCvv] = useState<string>("")

  // UPI details
  const [upiId, setUpiId] = useState<string>("")

  // NetBanking details
  const [bankName, setBankName] = useState<string>("sbi")

  // Progress data (simulated)
  const goalAmount = 100000
  const raisedAmount = 72500
  const progressPercentage = (raisedAmount / goalAmount) * 100

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      // Prepare payment details based on selected method
      let paymentDetails: PaymentDetails = {}

      switch (paymentMethod) {
        case "card":
          paymentDetails = { cardNumber, cardExpiry, cardCvv }
          break
        case "upi":
          paymentDetails = { upiId }
          break
        case "netbanking":
          paymentDetails = { bankName }
          break
        case "other":
          paymentDetails = { method: "other" }
          break
      }

      const response = await fetch("https://atmobank.onrender.com/api/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "kskp", // Replace with your actual API key
        },
        body: JSON.stringify({
          fromAccount,
          toAccount,
          amount,
          password,
          paymentMethod,
          paymentDetails,
          donorName: isAnonymous ? "Anonymous" : donorName,
          email,
          donationPurpose,
          donationFrequency,
          wantReceipt,
        }),
      })

      const result = await response.text()
      if (response.ok) {
        // Generate a transaction ID
        const txnId = "TXN" + Math.random().toString(36).substring(2, 10).toUpperCase()
        setTransactionId(txnId)

        // Store transaction data in sessionStorage to be accessed by the receipt page
        const transactionData = {
          transactionId: txnId,
          date: new Date().toISOString(),
          amount,
          donorName: isAnonymous ? "Anonymous" : donorName,
          email,
          donationPurpose,
          donationFrequency,
          paymentMethod,
          fromAccount,
          toAccount,
        }

        sessionStorage.setItem("transactionData", JSON.stringify(transactionData))

        // Show success modal
        setShowSuccessModal(true)
      } else {
        setMessage("Donation failed: " + result)
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleViewReceipt = () => {
    setShowSuccessModal(false)
    router.push(`/receipt/${transactionId}`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-green-50">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Make a Donation</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your generous contribution helps us provide essential services to those in need. Every donation makes a
            difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar with impact information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Your Impact</CardTitle>
                <CardDescription>See how your donation helps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Goal: ₹{goalAmount.toLocaleString()}</span>
                    <span>
                      Raised: ₹{raisedAmount.toLocaleString()} ({progressPercentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2 bg-gray-200" indicatorClassName="bg-green-600" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <BookOpen className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">Education</h3>
                      <p className="text-sm text-gray-600">Provides books and learning materials for 10 students</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Utensils className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">Food Security</h3>
                      <p className="text-sm text-gray-600">Provides meals for 20 people for a week</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Home className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">Shelter</h3>
                      <p className="text-sm text-gray-600">Helps provide housing support for families in need</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-100 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    "Your donation today will help us reach our goal of supporting 1,000 families this month."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donation form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Donation Details</CardTitle>
                <CardDescription>Please fill in your information to complete your donation</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="donorName">Your Name</Label>
                        <Input
                          id="donorName"
                          type="text"
                          value={donorName}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setDonorName(e.target.value)}
                          placeholder="Enter your full name"
                          disabled={isAnonymous}
                          required={!isAnonymous}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        checked={isAnonymous}
                        onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                      />
                      <Label htmlFor="anonymous" className="text-sm font-normal">
                        Make this donation anonymous
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Donation Purpose</Label>
                    <RadioGroup
                      value={donationPurpose}
                      onValueChange={setDonationPurpose}
                      className="grid grid-cols-1 md:grid-cols-2 gap-2"
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <RadioGroupItem value="education" id="education" />
                        <Label htmlFor="education" className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-green-600" />
                          Education
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <RadioGroupItem value="food" id="food" />
                        <Label htmlFor="food" className="flex items-center gap-2">
                          <Utensils className="h-4 w-4 text-green-600" />
                          Food Security
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <RadioGroupItem value="shelter" id="shelter" />
                        <Label htmlFor="shelter" className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-green-600" />
                          Shelter
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general" className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-green-600" />
                          General Fund
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Donation Frequency</Label>
                    <RadioGroup value={donationFrequency} onValueChange={setDonationFrequency}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="one-time" id="one-time" />
                        <Label htmlFor="one-time">One-time Donation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly">Monthly Donation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="quarterly" id="quarterly" />
                        <Label htmlFor="quarterly">Quarterly Donation</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Donation Amount</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["100", "500", "1000", "5000"].map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant={amount === value ? "default" : "outline"}
                          className={amount === value ? "bg-green-600 hover:bg-green-700" : ""}
                          onClick={() => setAmount(value)}
                        >
                          ₹{value}
                        </Button>
                      ))}
                    </div>
                    <Input
                      id="custom-amount"
                      type="number"
                      value={
                        amount !== "100" && amount !== "500" && amount !== "1000" && amount !== "5000" ? amount : ""
                      }
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                      placeholder="Custom amount"
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fromAccount">Your Account Number</Label>
                    <Input
                      id="fromAccount"
                      type="text"
                      value={fromAccount}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setFromAccount(e.target.value)}
                      placeholder="Enter your account number"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="toAccount">Donation Recipient</Label>
                    <select
                      id="toAccount"
                      value={toAccount}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => setToAccount(e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="94261">AtmoBank Charity Foundation</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Tabs defaultValue="card" onValueChange={setPaymentMethod} value={paymentMethod}>
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="card" className="flex flex-col items-center gap-1 py-2">
                          <CreditCard className="h-4 w-4" />
                          <span className="text-xs">Card</span>
                        </TabsTrigger>
                        <TabsTrigger value="upi" className="flex flex-col items-center gap-1 py-2">
                          <Wallet className="h-4 w-4" />
                          <span className="text-xs">UPI</span>
                        </TabsTrigger>
                        <TabsTrigger value="netbanking" className="flex flex-col items-center gap-1 py-2">
                          <Landmark className="h-4 w-4" />
                          <span className="text-xs">NetBanking</span>
                        </TabsTrigger>
                        <TabsTrigger value="other" className="flex flex-col items-center gap-1 py-2">
                          <Heart className="h-4 w-4" />
                          <span className="text-xs">Other</span>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="card" className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCardNumber(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => setCardExpiry(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cardCvv}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => setCvv(e.target.value)}
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="upi" className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="upi-id">UPI ID</Label>
                          <Input
                            id="upi-id"
                            placeholder="yourname@upi"
                            value={upiId}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUpiId(e.target.value)}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="netbanking" className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label>Select Bank</Label>
                          <RadioGroup defaultValue="sbi" value={bankName} onValueChange={setBankName}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="sbi" id="sbi" />
                              <Label htmlFor="sbi">State Bank of India</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="hdfc" id="hdfc" />
                              <Label htmlFor="hdfc">HDFC Bank</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="icici" id="icici" />
                              <Label htmlFor="icici">ICICI Bank</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="axis" id="axis" />
                              <Label htmlFor="axis">Axis Bank</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </TabsContent>

                      <TabsContent value="other" className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label>Other Payment Options</Label>
                          <RadioGroup defaultValue="paytm">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="paytm" id="paytm" />
                              <Label htmlFor="paytm">Paytm</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="gpay" id="gpay" />
                              <Label htmlFor="gpay">Google Pay</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="phonepe" id="phonepe" />
                              <Label htmlFor="phonepe">PhonePe</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Account Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      placeholder="Enter your account password"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="receipt"
                      checked={wantReceipt}
                      onCheckedChange={(checked) => setWantReceipt(checked as boolean)}
                    />
                    <Label htmlFor="receipt" className="text-sm font-normal">
                      Email me a receipt for tax purposes
                    </Label>
                  </div>

                  {message && <div className="p-3 bg-red-100 text-red-600 rounded-md">{message}</div>}

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isSubmitting || !fromAccount || !amount || !password}
                  >
                    {isSubmitting ? "Processing..." : `Donate ₹${amount || "0"}`}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Your donation is tax-deductible. You will receive a receipt for your records.
                  </p>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link href="https://atmobank.onrender.com" className="font-bold text-green-600 hover:underline">
                    Create account
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Donation Successful
            </DialogTitle>
            <DialogDescription>Thank you for your generous contribution!</DialogDescription>
          </DialogHeader>

          <div className="p-4 text-center">
            <p className="mb-4">
              Your donation of <span className="font-bold text-green-700">₹{amount}</span> has been processed
              successfully.
            </p>
            <p className="text-sm text-gray-600 mb-6">Transaction ID: {transactionId}</p>
          </div>

          <DialogFooter>
            <Button onClick={handleViewReceipt} className="w-full bg-green-600 hover:bg-green-700">
              View Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
