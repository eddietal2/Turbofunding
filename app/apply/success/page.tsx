"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircleIcon, Clock, Users, Target, Zap, Mail, ArrowRight, ChevronDown, FileText, Phone, Lightbulb, Send } from "lucide-react"
import { ConversionTracking } from "@/components/conversion-tracking"
import { useState } from "react"

export default function ApplicationSuccessPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "How will I be contacted?",
      answer: "Our team will reach out via email and phone number provided in your application. Please ensure both are current and monitored regularly."
    },
    {
      question: "Can I check my application status?",
      answer: "Yes! You can check your status anytime by logging into your account or contacting our support team with your application reference number."
    },
    {
      question: "What if I forgot to include a document?",
      answer: "No problem! You can upload additional documents later or contact us directly. Our team will guide you through the process."
    },
    {
      question: "How long does the approval process take?",
      answer: "Most applications are reviewed within 1-2 business days. Funding can be available in as little as 24-48 hours after approval."
    },
    {
      question: "Will approval affect my credit score?",
      answer: "We perform a soft credit check that doesn't affect your score. A hard inquiry only happens if you proceed with a specific offer."
    }
  ]

  return (
    <>
      {/* Track page view */}
      <ConversionTracking eventName="ViewContent" eventData={{ content_type: "application_success_page" }} />

      <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#F5F7FA] to-white">
        <main className="flex-1">
          {/* Hero Success Section */}
          <section className="w-full py-12 md:py-20 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-10 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
              <div className="absolute top-40 right-10 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
            </div>

            <div className="container px-4 md:px-6 relative z-10">
              <div className="mx-auto max-w-3xl text-center">
                {/* Animated Success Badge */}
                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center mb-6 shadow-lg">
                  <div className="absolute w-24 h-24 rounded-full border-4 border-transparent border-t-green-400 border-r-green-400 animate-spin opacity-30"></div>
                  <CheckCircleIcon className="h-12 w-12 text-green-600 relative z-10" />
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Application <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Submitted!</span>
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-xl text-gray-600 mb-2">
                  Thank you for applying for funding with TurboFunding.com
                </p>
                <p className="text-gray-500 mb-8">
                  We're excited to help your business grow
                </p>

                {/* Confirmation Badge */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-flex items-center gap-3 mb-12">
                  <Mail className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                    Confirmation email sent • Check your inbox
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Key Information Section */}
          <section className="w-full py-12 md:py-16 bg-white">
            <div className="container px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                {/* Status Cards */}
                <div className="grid md:grid-cols-3 gap-4 mb-12">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-50 border border-blue-200 rounded-xl p-6">
                    <Clock className="h-8 w-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Review Timeline</h3>
                    <p className="text-sm text-gray-600">Usually 1-2 business days</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-50 border border-orange-200 rounded-xl p-6">
                    <Users className="h-8 w-8 text-orange-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Specialist Contact</h3>
                    <p className="text-sm text-gray-600">Personalized guidance</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-50 border border-green-200 rounded-xl p-6">
                    <Zap className="h-8 w-8 text-green-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Fast Funding</h3>
                    <p className="text-sm text-gray-600">As soon as 24-48 hours</p>
                  </div>
                </div>

                {/* Timeline Section */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-space-grotesk)' }}>What Happens Next?</h2>
                  
                  <div className="space-y-6">
                    {[
                      {
                        step: 1,
                        title: "Application Review",
                        description: "Our underwriting team carefully reviews your application, documents, and supporting materials",
                        timeline: "1-2 business days",
                        Icon: FileText
                      },
                      {
                        step: 2,
                        title: "Specialist Contact",
                        description: "A dedicated funding specialist reaches out to discuss your options and answer any questions",
                        timeline: "Within 1 day",
                        Icon: Phone
                      },
                      {
                        step: 3,
                        title: "Personalized Solutions",
                        description: "We present customized funding offers tailored specifically to your business needs",
                        timeline: "Varies by review",
                        Icon: Lightbulb
                      },
                      {
                        step: 4,
                        title: "Funding Delivered",
                        description: "Once you accept an offer, funds can be deposited into your account rapidly",
                        timeline: "24-48 hours",
                        Icon: Send
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-6 items-start">
                        {/* Step circle with icon - subtly animated */}
                        <div className="flex-shrink-0 pt-1">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <item.Icon className="h-6 w-6 text-white animate-pulse-subtle" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                              {item.timeline}
                            </span>
                          </div>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Action Section */}
          <section className="w-full py-12 md:py-16 bg-gradient-to-r from-orange-50 to-amber-50">
            <div className="container px-4 md:px-6">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Speed Up Your Approval</h2>
                
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <Link href="/apply">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold h-12 text-base shadow-lg shadow-orange-500/30">
                      <Target className="mr-2 h-5 w-5" />
                      Upload More Documents
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 font-semibold h-12 text-base">
                      <Users className="mr-2 h-5 w-5" />
                      Contact Specialist
                    </Button>
                  </Link>
                </div>

                <div className="bg-white rounded-lg p-6 border border-orange-200">
                  <p className="text-sm text-gray-600 text-center">
                    💡 <span className="font-semibold text-gray-900">Pro Tip:</span> Uploading additional documents like tax returns or business licenses can help us expedite your review and potentially improve your offer.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="w-full py-12 md:py-16 bg-white">
            <div className="container px-4 md:px-6">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Frequently Asked Questions</h2>
                
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-left font-semibold text-gray-900">{faq.question}</span>
                        <ChevronDown 
                          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${expandedFAQ === idx ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {expandedFAQ === idx && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                  <p className="text-gray-700 mb-4">
                    Didn't find your answer? Our team is here to help.
                  </p>
                  <Link href="/contact">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Footer CTA Section */}
          <section className="w-full py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container px-4 md:px-6">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Ready to Explore More?</h2>
                <p className="text-gray-600 mb-8">
                  While we review your application, discover more about our products and services.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold px-8 h-11">
                      Return to Home
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 h-11">
                      Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 0.9;
          }
          50% {
            opacity: 1;
          }
        }

        :global(.animate-bounce) {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        :global(.animate-pulse-subtle) {
          animation: pulse-subtle 2s ease-in-out infinite;
        }

        :global(.animation-delay-2000) {
          animation-delay: 2s;
        }
      `}</style>
    </>
  )
}
