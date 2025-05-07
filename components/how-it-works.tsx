import { ArrowRight, Utensils, Users, Clock, MapPin } from "lucide-react"

const HowItWorks = () => {
  const steps = [
    {
      icon: <Utensils className="w-8 h-8 text-yellow-600" />,
      title: "Register Food Donation",
      description:
        "Restaurants, caterers, and individuals can register their surplus food with details like quantity, type, and freshness.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-yellow-600" />,
      title: "Set Pickup Location",
      description:
        "Specify where and when the food can be collected. You can choose to deliver or have recipients pick up.",
    },
    {
      icon: <Clock className="w-8 h-8 text-yellow-600" />,
      title: "Real-time Notifications",
      description:
        "Nearby shelters, NGOs, and registered individuals receive alerts about available food in their area.",
    },
    {
      icon: <Users className="w-8 h-8 text-yellow-600" />,
      title: "Connect & Distribute",
      description:
        "Recipients claim the food and arrange pickup or delivery, ensuring it reaches those who need it most.",
    },
  ]

  return (
    <section className="py-20 px-6 md:px-20 bg-yellow-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How AhaarSetu Works</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            Our platform makes it easy to connect food donors with recipients in just a few simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col items-center text-center">
                <div className="bg-yellow-100 p-4 rounded-full mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-yellow-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/login"
            className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-3 rounded-lg transition"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
