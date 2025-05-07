import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface EventCardProps {
  id: number
  title: string
  description: string
  servings: number
  location: string
  time: string
  image: string
  provider?: string
}

const EventCard = ({ id, title, description, servings, location, time, image, provider }: EventCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden relative">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        {servings <= 5 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Only {servings} left!
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-yellow-600">{title}</h3>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {servings} servings
          </span>
        </div>

        {provider && <p className="text-sm text-gray-500 mb-2">Provided by: {provider}</p>}

        <p className="text-gray-600 mb-4">{description}</p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-yellow-500" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-yellow-500" />
            <span>{time}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 px-6 py-4">
        <Link href={`/event/${id}`} className="w-full">
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600">Reserve Food</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default EventCard
