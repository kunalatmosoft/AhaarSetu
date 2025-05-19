"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Printer, Download, ArrowLeft, Share2 } from "lucide-react"

interface TransactionData {
  transactionId: string
  date: string
  amount: string
  donorName: string
  email: string
  donationPurpose: string
  donationFrequency: string
  paymentMethod: string
  fromAccount: string
  toAccount: string
}

export default function ReceiptPage() {
  const router = useRouter()
  const params = useParams()
  const { transactionId } = params

  const [transactionData, setTransactionData] = useState<TransactionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Retrieve transaction data from sessionStorage
    const storedData = sessionStorage.getItem("transactionData")

    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setTransactionData(parsedData)
    }

    setLoading(false)
  }, [])

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Helper function to get a readable donation purpose
  const getDonationPurposeText = (purpose: string) => {
    switch (purpose) {
      case "education":
        return "Education"
      case "food":
        return "Food Security"
      case "shelter":
        return "Shelter"
      case "general":
        return "General Fund"
      default:
        return purpose
    }
  }

  // Helper function to get a readable payment method
  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "card":
        return "Credit/Debit Card"
      case "upi":
        return "UPI"
      case "netbanking":
        return "Net Banking"
      case "other":
        return "Other"
      default:
        return method
    }
  }

  // Helper function to get a readable donation frequency
  const getDonationFrequencyText = (frequency: string) => {
    switch (frequency) {
      case "one-time":
        return "One-time Donation"
      case "monthly":
        return "Monthly Donation"
      case "quarterly":
        return "Quarterly Donation"
      default:
        return frequency
    }
  }

  const handlePrintReceipt = () => {
    window.print()
  }

  const handleDownloadReceipt = () => {
    if (!transactionData) return

    const receiptContent = `
      Donation Receipt
      Transaction ID: ${transactionData.transactionId}
      Date: ${formatDate(transactionData.date)}
      Amount: ₹${transactionData.amount}
      Donor: ${transactionData.donorName}
      Email: ${transactionData.email}
      Purpose: ${getDonationPurposeText(transactionData.donationPurpose)}
      Frequency: ${getDonationFrequencyText(transactionData.donationFrequency)}
      Payment Method: ${getPaymentMethodText(transactionData.paymentMethod)}
    `

    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `donation-receipt-${transactionData.transactionId}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShareReceipt = async () => {
    if (!transactionData) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Donation Receipt",
          text: `I just donated ₹${transactionData.amount} to AtmoBank Charity Foundation!`,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Receipt URL copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-50">
        <p>Loading receipt...</p>
      </div>
    )
  }

  if (!transactionData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-green-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Receipt Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">We couldn't find the receipt you're looking for.</p>
            <p className="text-sm text-gray-600">This could be because:</p>
            <ul className="text-sm text-gray-600 list-disc list-inside mt-2">
              <li>The receipt has expired</li>
              <li>The transaction ID is invalid</li>
              <li>You've cleared your browser data</li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex justify-between items-center">
          <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrintReceipt} className="flex items-center gap-1">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadReceipt} className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleShareReceipt} className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <Card className="border-2 border-green-100 print:border-none" id="receipt-content">
          <CardHeader className="text-center border-b pb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
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
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">Donation Receipt</CardTitle>
            <p className="text-gray-500">AtmoBank Charity Foundation</p>
            <p className="text-sm text-gray-400 mt-1">Tax ID: 123-456-7890</p>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Transaction ID</h3>
                  <p className="font-mono">{transactionData.transactionId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p>{formatDate(transactionData.date)}</p>
                </div>
              </div>

              <div className="border-t border-b py-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Donation Amount</h3>
                  <p className="text-2xl font-bold text-green-700">₹{transactionData.amount}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Donor</h3>
                  <p>{transactionData.donorName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p>{transactionData.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Purpose</h3>
                  <p>{getDonationPurposeText(transactionData.donationPurpose)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Frequency</h3>
                  <p>{getDonationFrequencyText(transactionData.donationFrequency)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                  <p>{getPaymentMethodText(transactionData.paymentMethod)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">From Account</h3>
                  <p>XXXX{transactionData.fromAccount.slice(-4)}</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="text-sm font-medium text-green-800 mb-2">Tax Information</h3>
                <p className="text-sm text-gray-600">
                  This receipt is an official record of your donation to AtmoBank Charity Foundation, a registered
                  non-profit organization. Your contribution may be tax-deductible to the extent allowed by law.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col border-t pt-6">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500">Thank you for your generous support!</p>
              <p className="text-xs text-gray-400 mt-1">
                AtmoBank Charity Foundation • 123 Charity Lane, Cityville • contact@atmobankcharity.org
              </p>
            </div>
            <div className="w-full border-t border-dashed pt-4">
              <p className="text-xs text-center text-gray-400">
                Receipt generated on {new Date().toLocaleDateString()}
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
