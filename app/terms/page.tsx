"use client"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0D1B2A]">
      <div className="container px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-8 font-space-grotesk">
            Terms of Service
          </h1>
          
          <div className="prose prose-invert prose-orange max-w-none">
            <p className="text-gray-300 text-lg mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and TurboFunding.com ("Company," "we," "us," or "our"), concerning your access to and use of the turbofunding.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">2. Intellectual Property Rights</h2>
              <p className="text-gray-400 leading-relaxed">
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">3. User Representations</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                By using the Site, you represent and warrant that:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>All registration information you submit will be true, accurate, current, and complete</li>
                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary</li>
                <li>You have the legal capacity and you agree to comply with these Terms of Service</li>
                <li>You are not a minor in the jurisdiction in which you reside</li>
                <li>You will not access the Site through automated or non-human means</li>
                <li>You will not use the Site for any illegal or unauthorized purpose</li>
                <li>Your use of the Site will not violate any applicable law or regulation</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">4. Prohibited Activities</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
              <p className="text-gray-400 leading-relaxed">
                As a user of the Site, you agree not to systematically retrieve data or other content from the Site, trick, defraud, or mislead us and other users, circumvent, disable, or otherwise interfere with security-related features of the Site, or engage in unauthorized framing of or linking to the Site.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">5. Financial Services Disclaimer</h2>
              <p className="text-gray-400 leading-relaxed">
                TurboFunding.com provides business funding services and related financial products. All financial products and services are subject to applicable terms, conditions, and eligibility requirements. Approval for funding is not guaranteed and is subject to our underwriting criteria. Past performance is not indicative of future results, and individual results may vary.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-400 leading-relaxed">
                In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Site, even if we have been advised of the possibility of such damages.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">7. Indemnification</h2>
              <p className="text-gray-400 leading-relaxed">
                You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">8. Governing Law</h2>
              <p className="text-gray-400 leading-relaxed">
                These Terms shall be governed by and defined following the laws of the United States. TurboFunding.com and yourself irrevocably consent that the courts shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">9. Contact Us</h2>
              <p className="text-gray-400 leading-relaxed">
                If you have questions or comments about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 text-gray-400">
                <p>TurboFunding.com</p>
                <p>Email: inquiries@turbofunding.com</p>
                <p>Phone: (877) 838-3919</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
