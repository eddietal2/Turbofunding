import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ShoppingBagIcon,
  TruckIcon,
  HeartPulseIcon,
  UtensilsIcon,
  ConstructionIcon,
  WrenchIcon,
} from "lucide-react"

export default function IndustriesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA] text-[#0D1B2A]">
      <main className="flex-1">
        {/* Industries Section */}
        <section className="w-full py-8 md:py-16 bg-[#F5F7FA]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Retail */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="pb-3">
                  <div className="p-2 rounded-lg bg-blue-900 w-fit">
                    <ShoppingBagIcon className="h-5 w-5 text-blue-300" />
                  </div>
                  <CardTitle className="mt-3 text-orange-500">Retail</CardTitle>
                  <CardDescription className="text-gray-300">Inventory & expansion financing</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      Specialized funding solutions for retailers to manage inventory, expand locations, and upgrade
                      technology.
                    </p>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Seasonal inventory financing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Store expansion funding</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>POS system upgrades</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>E-commerce integration</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Learn More</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Manufacturing */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="pb-3">
                  <div className="p-2 rounded-lg bg-blue-900 w-fit">
                    <WrenchIcon className="h-5 w-5 text-blue-300" />
                  </div>
                  <CardTitle className="mt-3 text-orange-500">Manufacturing</CardTitle>
                  <CardDescription className="text-gray-300">Equipment & production financing</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      Funding solutions for manufacturers to upgrade equipment, expand production, and optimize
                      operations.
                    </p>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Equipment financing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Facility expansion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Technology upgrades</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Working capital for materials</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Learn More</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Transportation & Logistics */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="pb-3">
                  <div className="p-2 rounded-lg bg-blue-900 w-fit">
                    <TruckIcon className="h-5 w-5 text-blue-300" />
                  </div>
                  <CardTitle className="mt-3 text-orange-500">Transportation & Logistics</CardTitle>
                  <CardDescription className="text-gray-300">Fleet & operations financing</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      Specialized funding for transportation companies to maintain and expand fleets, optimize logistics
                      operations.
                    </p>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Vehicle financing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Fleet expansion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Logistics technology</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Fuel & maintenance funding</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Learn More</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Healthcare */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="pb-3">
                  <div className="p-2 rounded-lg bg-blue-900 w-fit">
                    <HeartPulseIcon className="h-5 w-5 text-blue-300" />
                  </div>
                  <CardTitle className="mt-3 text-orange-500">Healthcare</CardTitle>
                  <CardDescription className="text-gray-300">Medical equipment & practice financing</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      Funding solutions for healthcare providers to upgrade equipment, expand facilities, and improve
                      patient care.
                    </p>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Medical equipment financing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Practice expansion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Electronic health records systems</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Working capital for staffing</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Learn More</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Hospitality & Food Service */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="pb-3">
                  <div className="p-2 rounded-lg bg-blue-900 w-fit">
                    <UtensilsIcon className="h-5 w-5 text-blue-300" />
                  </div>
                  <CardTitle className="mt-3 text-orange-500">Hospitality & Food Service</CardTitle>
                  <CardDescription className="text-gray-300">Restaurant & hotel financing</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      Specialized funding for restaurants, hotels, and hospitality businesses to renovate, expand, and
                      improve operations.
                    </p>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Kitchen equipment financing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Renovation funding</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Franchise expansion</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Seasonal working capital</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Learn More</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Construction */}
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader className="pb-3">
                  <div className="p-2 rounded-lg bg-blue-900 w-fit">
                    <ConstructionIcon className="h-5 w-5 text-blue-300" />
                  </div>
                  <CardTitle className="mt-3 text-orange-500">Construction</CardTitle>
                  <CardDescription className="text-gray-300">Project & equipment financing</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-gray-300">
                      Funding solutions for construction companies to finance projects, purchase equipment, and manage
                      cash flow.
                    </p>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Heavy equipment financing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Project bridge loans</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Materials financing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Contractor lines of credit</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* And more... section */}
            <div className="text-center mt-8">
              <p className="text-2xl font-bold text-orange-500">And more...</p>
              <p className="text-gray-700 mt-3 max-w-2xl mx-auto">
                Our funding solutions extend beyond these industries. Whether you're in agriculture, education,
                professional services, or any other field, TurboFunding.com has tailored financing options to meet your
                specific business needs.
              </p>
              <div className="mt-6">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/contact">Discuss Your Industry Needs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-8 md:py-16 bg-gray-900 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-3 text-center max-w-3xl mx-auto">
              <div className="space-y-2 w-full">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-orange-500">
                  Need Funding for Your Industry?
                </h2>
                <p className="md:text-xl mx-auto text-orange-400">
                  Our industry experts understand your unique challenges and opportunities.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href="/apply">Apply Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
