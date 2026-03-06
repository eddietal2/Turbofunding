"use client"

import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"

const faqCategories = [
  {
    title: "About TurboFunding",
    questions: [
      {
        q: "What is TurboFunding?",
        a: "TurboFunding is a small business financing company that connects entrepreneurs across the country with fast, flexible funding solutions designed for the speed and simplicity that small business owners need.",
      },
      {
        q: "Why should I choose TurboFunding?",
        a: "We believe business owners deserve a straightforward, transparent experience — a simple application, dedicated support, and a funding process built around your timeline. Many applicants receive funding within one business day of final approval, subject to bank processing times and satisfactory completion of all required documentation. Individual results vary.",
      },
      {
        q: "How much can I borrow?",
        a: "Funding amounts are determined based on your business's financial profile, time in business, revenue, and creditworthiness. All offers are subject to underwriting approval. A funding specialist will review your application and present available options — there is no obligation to accept any offer.",
      },
      {
        q: "Is approval guaranteed?",
        a: "Approval is not guaranteed. All applications are subject to underwriting review, credit evaluation, and verification of financial documentation. Submission of an application does not constitute a commitment to lend.",
      },
    ],
  },
  {
    title: "General",
    questions: [
      {
        q: "Do I need collateral?",
        a: "Most of our financing options do not require traditional collateral. However, certain products — including equipment financing and SBA loans — may require collateral or a personal guarantee. All requirements will be clearly disclosed in your loan agreement prior to signing.",
      },
      {
        q: "What are the repayment terms?",
        a: "Fixed-term products generally range from 6 months to 5 years. Revenue-based financing does not have a predetermined end date — repayment amounts fluctuate based on your business revenue as outlined in your agreement. Actual terms vary by product and applicant qualification.",
      },
      {
        q: "I already have a bank loan. Can I still apply?",
        a: "Existing financing does not automatically disqualify you. However, all applications are reviewed individually, and the presence of existing debt obligations will be considered as part of the underwriting process. Consult your current lender's agreements regarding any restrictions on additional financing.",
      },
      {
        q: "What can a line of credit be used for?",
        a: "A business line of credit gives you on-demand access to funds up to your approved limit. Draw what you need, when you need it — payroll, inventory, equipment, or whatever your business calls for.",
      },
      {
        q: "What is invoice financing?",
        a: "Invoice financing allows eligible businesses to access a portion of the value of outstanding invoices prior to customer payment. Availability and advance rates are subject to approval and the terms of your specific agreement. This product is not available to all applicants.",
      },
      {
        q: "How secure is my information?",
        a: "We take data privacy seriously and implement reasonable administrative, technical, and physical safeguards to protect your information. For full details on how your data is collected, stored, and used, please review our Privacy Policy.",
      },
    ],
  },
  {
    title: "Application",
    questions: [
      {
        q: "How do I get started?",
        a: "Click Apply Now at the top of any page. The online application takes under 5 minutes and requires basic business details along with your last 4 months of bank statements.",
      },
      {
        q: "Do I qualify?",
        a: "Each application is reviewed on its own merits, but typical approvals involve a FICO score above 500, at least 6 months in business, and a minimum of $10,000 or more in monthly revenue.",
      },
      {
        q: "How fast is the process?",
        a: "Submit your application and you'll typically hear back within 12 hours. If approved and all documentation is complete, funds may be available as soon as the same day, subject to your bank's processing times.",
      },
      {
        q: "How is my rate determined?",
        a: "Your rate and terms are determined based on multiple factors including your personal and business credit profiles, time in business, annual revenue, industry type, and the specific product you select. All rates and fees will be fully disclosed prior to signing any agreement, in accordance with applicable disclosure requirements.",
      },
      {
        q: "How do I monitor my account?",
        a: "You'll have full access to an online portal to view your balance, track payments, and check renewal eligibility at any time. Your funding specialist is also available if you prefer to speak with someone directly.",
      },
    ],
  },
  {
    title: "Credit",
    questions: [
      {
        q: "Will applying affect my credit score?",
        a: "The initial application involves a soft credit inquiry, which does not affect your credit score. If you proceed toward final approval, a hard credit inquiry may be required depending on the product and lender. You will be notified before any hard pull is conducted. Declining a hard pull may limit available financing options.",
      },
      {
        q: "What score do I need?",
        a: "A minimum FICO score of 500 is generally required. However, credit score is one of several factors reviewed during underwriting. Meeting the minimum score does not guarantee approval, and higher scores may qualify for better rates and terms.",
      },
      {
        q: "What if my credit isn't perfect?",
        a: "An imperfect score won't automatically close the door. It does play a role in shaping which products and terms are available to you, but we work with a wide range of credit profiles.",
      },
    ],
  },
  {
    title: "Capital Funding",
    questions: [
      {
        q: "How quickly will I know if I'm approved?",
        a: "Many applicants receive a decision the same day, though timing may vary based on application volume and verification requirements. Apply after hours and you will hear from us the following business morning.",
      },
      {
        q: "How do I receive funds once approved?",
        a: "Once finalized, funds are sent directly to your business bank account via ACH transfer. Need it faster? A same-day wire is also available — a small fee may apply.",
      },
      {
        q: "Can I get additional funding later?",
        a: "Absolutely. Once you've begun repayment, you may be eligible to renew or add to your financing. Reach out to your funding specialist to see what's available.",
      },
      {
        q: "Are there any businesses you don't work with?",
        a: "Businesses in adult entertainment or gambling are not eligible for funding through TurboFunding.",
      },
    ],
  },
  {
    title: "Payment",
    questions: [
      {
        q: "How do payments work?",
        a: "Repayments are automatically drafted from your designated business checking account per the schedule in your agreement. You are responsible for ensuring sufficient funds are available on each payment date. Returned or failed payments may result in fees as outlined in your agreement.",
      },
      {
        q: "Can I pay on a monthly basis?",
        a: "Yes — monthly repayment schedules are available for businesses that qualify based on their product and profile.",
      },
      {
        q: "Can I pay off my loan early?",
        a: "Early repayment is permitted on all products and could contain a prepayment discount. Depending on the specific terms of your agreement, early payoff may result in a reduction of remaining fees or interest. Not all products offer early payoff discounts. Review your loan agreement or contact your account manager for the exact terms applicable to your financing.",
      },
      {
        q: "Are there penalties for paying off early?",
        a: "Early payoff terms vary by product. Some financing options carry no prepayment penalties. Others may offer a discount on outstanding fees for early settlement. All prepayment terms are disclosed in your loan agreement prior to funding.",
      },
      {
        q: "What if I need help with my account?",
        a: "Your funding specialist is always available — whether it's a question about your balance, a payment concern, or anything in between. Reach out by phone, email, or through your online portal anytime.",
      },
    ],
  },
]

export function FaqSection() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="w-full" id="faqs">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 mb-6 px-4 sm:px-6"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-8">
          {faqCategories.map((category) => (
            <div key={category.title}>
              <h3
                className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 px-4 sm:px-6"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {category.title}
              </h3>

              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden divide-y divide-gray-100">
                {category.questions.map((item, i) => {
                  const key = `${category.title}-${i}`
                  const isOpen = openItems[key]

                  return (
                    <div key={key}>
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm font-semibold text-gray-900">
                          {item.q}
                        </span>
                        <ChevronDownIcon
                          className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 ${
                          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="px-5 sm:px-6 pb-4 text-sm text-gray-600 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
