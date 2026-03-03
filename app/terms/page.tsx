import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions | TurboFunding.com",
  description: "Read TurboFunding's Terms and Conditions governing the use of our platform and services.",
}

export default function TermsPage() {
  return (
    <main className="w-full">
      <section className="w-full min-h-screen bg-[#0D1B2A] pt-16 md:pt-24 pb-16">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <div className="space-y-8" style={{ lineHeight: "1.8" }}>
            <div>
              <h1 
                className="text-3xl md:text-4xl font-bold mb-2 text-orange-500"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                TURBOFUNDING, LLC
              </h1>
              <h2 
                className="text-2xl md:text-3xl font-bold mb-6 text-orange-500"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Terms and Conditions
              </h2>
              <p className="text-lg font-semibold mb-2 text-gray-300">
                Last Updated: March 2nd, 2026
              </p>
            </div>

            <p className="text-gray-400">
              Read this section carefully. It affects your legal rights, including your right to file a lawsuit in court and your right to a jury trial.
            </p>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                1. Agreement to These Terms
              </h3>
              <p className="text-gray-400">
                These Terms and Conditions ("Terms") govern your access to and use of turbofunding.com and related services (the "Platform"). By accessing or using the Platform, you agree to be legally bound by these Terms, including the binding arbitration clause and class action waiver in Section 12. If you do not agree, you must discontinue use of the Platform immediately.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                2. Business Purpose Only
              </h3>
              <p className="text-gray-400 mb-4">
                The Platform is intended solely for commercial and business purposes. By using the Platform, you expressly represent and warrant that: (a) you are seeking financing exclusively for business or commercial purposes and not for personal, family, or household use; (b) if you are acting on behalf of a business entity, you have full legal authority to bind that entity to these Terms; and (c) you are not a "consumer" as defined under the Consumer Financial Protection Act, applicable state consumer protection laws, or similar laws.
              </p>
              <p className="text-gray-400">
                TurboFunding reserves the right to decline, suspend, or terminate any application or account if it determines or reasonably suspects that the Platform is being used for consumer or personal purposes. Your affirmative representation of business purpose is a material condition of your use of the Platform.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                3. Independent Broker Status and No Lender Relationship
              </h3>
              <p className="text-gray-400 mb-4">
                TurboFunding, LLC ("TurboFunding," "we," "us," or "our") operates solely as an independent commercial finance broker. TurboFunding is not a lender, creditor, bank, financial institution, or fiduciary. We do not originate loans, extend credit, determine underwriting decisions, set rates, control approval outcomes, or service financing products. All financing decisions, approvals, pricing, disclosures, and repayment terms are determined solely by independent third-party financing providers.
              </p>
              <p className="text-gray-400">
                Nothing on the Platform constitutes an offer to lend, an offer to extend credit, a guarantee of approval, a commitment to finance, or financial, legal, or tax advice. TurboFunding is not responsible for the conduct, products, services, terms, or decisions of any financing provider. You are encouraged to independently review all terms, disclosures, and agreements provided directly by any financing provider before entering into any financing transaction.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                4. State Licensing and Regulatory Disclosures
              </h3>
              <p className="text-gray-400 mb-4">
                TurboFunding operates as a commercial finance broker and complies with applicable licensing and disclosure requirements in states where required. Certain states, including but not limited to California, New York, Utah, and Virginia, impose specific disclosure, registration, or licensing obligations on commercial finance brokers. Applicable state-specific disclosures are provided at or before the time of any financing offer or agreement, as required by law.
              </p>
              <p className="text-gray-400">
                If you are located in California, please note that TurboFunding complies with the requirements of SB 1235 (the California Commercial Financing Disclosures law) where applicable. If you are located in New York, please note that TurboFunding complies with New York's commercial financing disclosure regulations where applicable. Nothing in these Terms limits any disclosure rights you may have under applicable state law.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                5. No Guarantee of Approval
              </h3>
              <p className="text-gray-400">
                Submitting information through the Platform does not guarantee approval, qualification, or funding. Any examples, estimates, rates, terms, or illustrations displayed on the Platform are informational only and are not binding offers or commitments. Only a written agreement executed between you and a financing provider governs any financing transaction. TurboFunding makes no representation that any particular financing product, rate, or term will be made available to you.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                6. Accuracy of Information and Authorization
              </h3>
              <p className="text-gray-400 mb-4">
                You represent and warrant that all information you submit through the Platform is accurate, complete, truthful, and current. Submission of false, misleading, or materially incomplete information may constitute fraud and may result in termination of your access to the Platform and referral to appropriate authorities.
              </p>
              <p className="text-gray-400">
                You authorize TurboFunding to transmit your information to financing providers and to service providers assisting TurboFunding with application processing, identity verification, fraud prevention, and regulatory compliance. TurboFunding may rely on the information you provide without independent verification. Your submission of information constitutes your acknowledgment that TurboFunding acts as a conduit and not as a decision-maker with respect to any financing transaction.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                7. Privacy Policy and Data Handling
              </h3>
              <p className="text-gray-400 mb-4">
                The collection, use, and sharing of your personal and business information is governed by TurboFunding's Privacy Policy, which is incorporated into these Terms by reference and available at turbofunding.com/privacy-policy. By using the Platform, you acknowledge that you have reviewed and agree to the Privacy Policy.
              </p>
              <p className="text-gray-400">
                TurboFunding does not sell personal information and does not share personal information for cross-context behavioral advertising. Information may be shared with financing providers, identity verification vendors, fraud prevention vendors, and regulatory authorities as described in the Privacy Policy. Residents of California, Virginia, Colorado, Connecticut, Texas, Utah, Nevada, North Dakota, and Vermont may have specific rights with respect to their personal information as described in the Privacy Policy.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                8. Communications Consent (Including TCPA)
              </h3>
              <p className="text-gray-400 mb-4">
                By providing your telephone number and contact information, you expressly consent to receive communications from TurboFunding and its service providers, including:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400 mb-4">
                <li>Telephone calls, including calls placed using an automatic telephone dialing system or an artificial or prerecorded voice, to the number(s) you provide;</li>
                <li>Text messages (SMS/MMS), including messages sent using automated systems, to the mobile number(s) you provide; and</li>
                <li>Emails to the email address(es) you provide.</li>
              </ul>
              <p className="text-gray-400">
                These communications may include information regarding your application, available financing options, follow-up inquiries, and other matters related to your use of the Platform. Message and data rates may apply. Consent to receive automated calls or text messages is not a condition of obtaining financing or using the Platform. You may revoke your consent to receive automated calls or text messages at any time by replying STOP to any text message or by contacting us using the information on turbofunding.com. Electronic signatures and electronic acknowledgments are legally binding to the fullest extent permitted by applicable law.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                9. Platform Access and Termination
              </h3>
              <p className="text-gray-400">
                TurboFunding reserves the right, in its sole discretion, to suspend, restrict, or permanently terminate your access to the Platform at any time, with or without notice, for any reason, including but not limited to: (a) suspected or confirmed submission of false or fraudulent information; (b) use of the Platform for consumer or personal purposes in violation of Section 2; (c) violation of any provision of these Terms; (d) conduct that TurboFunding determines is harmful to other users, financing providers, or TurboFunding; or (e) as required by applicable law or regulation. Termination of your access does not affect any rights or obligations that have accrued prior to termination.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                10. Intellectual Property
              </h3>
              <p className="text-gray-400">
                All content on the Platform, including text, graphics, logos, branding, software, and data compilations, is owned by or licensed to TurboFunding and is protected by applicable intellectual property laws. Unauthorized copying, reproduction, distribution, modification, or use of Platform content for any purpose is prohibited without TurboFunding's prior written consent.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                11. Disclaimer of Warranties
              </h3>
              <p className="text-gray-400">
                THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, TURBOFUNDING EXPRESSLY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. TURBOFUNDING DOES NOT WARRANT UNINTERRUPTED, ERROR-FREE, OR SECURE OPERATION OF THE PLATFORM, THE ACCURACY OR COMPLETENESS OF ANY CONTENT, OR THAT THE PLATFORM WILL MEET YOUR REQUIREMENTS.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                12. Limitation of Liability
              </h3>
              <p className="text-gray-400 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, TURBOFUNDING AND ITS MEMBERS, MANAGERS, OFFICERS, EMPLOYEES, AGENTS, AND SERVICE PROVIDERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE PLATFORM, YOUR RELATIONSHIP WITH ANY FINANCING PROVIDER, OR ANY FINANCING TRANSACTION, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p className="text-gray-400">
                TURBOFUNDING'S TOTAL CUMULATIVE LIABILITY TO YOU FOR ANY AND ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR YOUR USE OF THE PLATFORM SHALL NOT EXCEED THE TOTAL COMPENSATION ACTUALLY RECEIVED BY TURBOFUNDING IN CONNECTION WITH THE SPECIFIC TRANSACTION GIVING RISE TO THE CLAIM. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU TO THE EXTENT PROHIBITED BY LAW.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                13. Indemnification
              </h3>
              <p className="text-gray-400">
                You agree to indemnify, defend, and hold harmless TurboFunding and its members, managers, officers, employees, agents, successors, and assigns from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or related to: (a) your breach of any provision of these Terms; (b) any misrepresentation or fraudulent submission made by you; (c) your violation of any applicable law or regulation; or (d) any claim by a third party arising from your use of the Platform.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                14. Dispute Resolution and Binding Arbitration
              </h3>
              <p className="text-gray-400 mb-4" style={{ fontStyle: "italic" }}>
                <strong>PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT AND YOUR RIGHT TO A JURY TRIAL.</strong>
              </p>

              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  14.1 Informal Resolution
                </h4>
                <p className="text-gray-400">
                  Before initiating any formal dispute proceeding, you agree to first contact TurboFunding through the contact information on turbofunding.com and provide written notice describing the nature of the dispute and the relief you are seeking. The parties will attempt to resolve the dispute informally for a period of thirty (30) days from receipt of the notice.
                </p>
              </div>

              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  14.2 Binding Arbitration
                </h4>
                <p className="text-gray-400">
                  If the dispute is not resolved informally, any dispute, claim, or controversy arising out of or relating to these Terms, the Platform, or any financing introduced through the Platform shall be resolved by binding arbitration administered by the American Arbitration Association ("AAA") under its Commercial Arbitration Rules (available at www.adr.org), except as modified herein. The arbitration shall be conducted by a single arbitrator and shall take place in New York, New York, or via videoconference at the election of either party. The arbitrator's award shall be final and binding and may be entered as a judgment in any court of competent jurisdiction.
                </p>
              </div>

              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  14.3 Class Action Waiver
                </h4>
                <p className="text-gray-400">
                  ALL DISPUTES SHALL BE RESOLVED ON AN INDIVIDUAL BASIS. NEITHER PARTY MAY BRING CLAIMS AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, CONSOLIDATED, OR REPRESENTATIVE ACTION OR PROCEEDING. The arbitrator may not consolidate more than one person's claims and may not preside over any form of class or representative proceeding. This waiver applies regardless of whether arbitration or any other form of dispute resolution is used.
                </p>
              </div>

              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  14.4 Costs of Arbitration
                </h4>
                <p className="text-gray-400">
                  The allocation of arbitration fees and costs shall be governed by the AAA's Commercial Arbitration Rules. TurboFunding will not seek its attorneys' fees or costs in arbitration unless the arbitrator finds that your claim was frivolous or brought in bad faith.
                </p>
              </div>

              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  14.5 Exceptions
                </h4>
                <p className="text-gray-400">
                  Notwithstanding the foregoing, either party may seek emergency injunctive or other equitable relief in any court of competent jurisdiction to prevent irreparable harm pending the resolution of a dispute. Claims that by law cannot be subject to arbitration are excluded from this Section.
                </p>
              </div>

              <div>
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  14.6 Unenforceability
                </h4>
                <p className="text-gray-400">
                  If the arbitration clause in this Section is found unenforceable, the class action waiver in Section 14.3 shall remain in effect to the fullest extent permitted by law. Any disputes not subject to arbitration shall be resolved exclusively in state or federal courts located in New York, New York, and you consent to the personal jurisdiction of those courts. You expressly waive your right to a trial by jury for any such disputes.
                </p>
              </div>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                15. Force Majeure
              </h3>
              <p className="text-gray-400">
                TurboFunding shall not be liable for any delay, failure, or interruption of the Platform or its services resulting from causes beyond TurboFunding's reasonable control, including but not limited to acts of God, natural disasters, pandemics, cyberattacks, government actions, regulatory changes, telecommunications failures, or power outages. TurboFunding will use commercially reasonable efforts to resume normal operations as promptly as practicable following any such event.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                16. Severability
              </h3>
              <p className="text-gray-400">
                If any provision of these Terms is found by a court or arbitrator of competent jurisdiction to be invalid, illegal, or unenforceable, that provision shall be modified to the minimum extent necessary to make it enforceable, or severed from these Terms if modification is not possible, and the remaining provisions of these Terms shall continue in full force and effect. The invalidity or unenforceability of any provision shall not affect the validity or enforceability of any other provision.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                17. Governing Law
              </h3>
              <p className="text-gray-400">
                These Terms are governed by the laws of the State of New York, without regard to its conflict-of-law principles. To the extent any dispute is not subject to arbitration under Section 14, you consent to the exclusive jurisdiction of state or federal courts located in New York, New York for resolution of such disputes.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                18. Entire Agreement
              </h3>
              <p className="text-gray-400">
                These Terms, together with the Privacy Policy incorporated herein by reference, constitute the entire agreement between you and TurboFunding with respect to your use of the Platform and supersede all prior and contemporaneous understandings, agreements, representations, and warranties. No waiver of any provision of these Terms shall be effective unless made in writing and signed by an authorized representative of TurboFunding.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                19. Updates to These Terms
              </h3>
              <p className="text-gray-400">
                We may update these Terms from time to time to reflect changes in our services, applicable law, or business practices. Updated versions will be posted on the Platform with a revised "Last Updated" date. If we make material changes, we will make reasonable efforts to notify you, such as by posting a notice on the Platform. Your continued use of the Platform after the posting of any revised Terms constitutes your acceptance of the revised Terms. If you do not agree to the revised Terms, you must discontinue use of the Platform.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                20. Contact Information
              </h3>
              <p className="text-gray-400">
                If you have questions about these Terms or wish to provide notice under these Terms, please contact us through the contact information provided on turbofunding.com.
              </p>
            </div>

            <div className="border-t border-gray-700 pt-8 mt-8">
              <p className="text-center font-semibold text-gray-400">
                © TurboFunding, LLC. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
