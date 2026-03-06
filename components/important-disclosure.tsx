export function ImportantDisclosure() {
  return (
    <div className="w-full mt-12 pt-8 border-t border-gray-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6 sm:p-8">
          <h3
            className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Important Disclosures
          </h3>
          
          <p className="text-[10px] sm:text-xs text-gray-700 leading-relaxed mb-6">
            TurboFunding acts as a financing marketplace and/or servicer and is not itself a direct lender on all products. All financing is subject to credit approval, satisfactory underwriting review, and verification of financial and business documentation. Approval of an application does not constitute a commitment to lend. Loan amounts, interest rates, fees, and repayment terms vary based on applicant qualifications, product type, state of domicile, and lender criteria. Not all products are available in all states. Same-day or next-day funding is not guaranteed and is contingent upon timely completion of all closing requirements and your financial institution's ACH or wire processing times. Early repayment options, discounts, and fee waivers are product-specific and are not available on all agreements — refer to your executed loan agreement for applicable terms. Soft credit inquiries do not affect your credit score; hard inquiries, if required, will be disclosed in advance. Automatic payment drafts require adequate funds in your designated account — insufficient funds may result in returned payment fees. This document is for informational purposes only and does not constitute a loan offer, financial advice, or legal advice. TurboFunding is not a licensed financial advisor or attorney. Consult a qualified financial or legal professional before making financing decisions. TurboFunding complies with all applicable federal and state lending and consumer protection laws, including the Equal Credit Opportunity Act (ECOA) and applicable state commercial lending disclosure requirements. We do not discriminate on the basis of race, color, religion, national origin, sex, marital status, age, or any other protected characteristic.
          </p>

          <div className="border-t border-gray-300 pt-4 text-center">
            <p className="text-[9px] sm:text-[10px] text-gray-600">
              <a href="tel:+19377516937" className="text-blue-600 hover:text-blue-700 font-semibold">
                (937)-751-6937
              </a>
              {" "}
              | Questions? We're always open. |{" "}
              <span className="font-semibold">© 2026 TurboFunding — All rights reserved.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
