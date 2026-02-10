"use client"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0D1B2A]">
      <div className="container px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-8 font-space-grotesk">
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert prose-orange max-w-none">
            <p className="text-gray-300 text-lg mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="text-gray-400 leading-relaxed">
                TurboFunding.com ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We may collect information about you in a variety of ways. The information we may collect on the Site includes:
              </p>
              <h3 className="text-lg font-medium text-white mb-2">Personal Data</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.
              </p>
              <h3 className="text-lg font-medium text-white mb-2">Financial Data</h3>
              <p className="text-gray-400 leading-relaxed">
                Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">3. Use of Your Information</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Create and manage your account</li>
                <li>Process your transactions and send you related information</li>
                <li>Email you regarding your account or order</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions</li>
                <li>Generate a personal profile about you to make future visits more personalized</li>
                <li>Increase the efficiency and operation of the Site</li>
                <li>Monitor and analyze usage and trends to improve your experience</li>
                <li>Notify you of updates to the Site</li>
                <li>Resolve disputes and troubleshoot problems</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">4. Disclosure of Your Information</h2>
              <p className="text-gray-400 leading-relaxed">
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows: by law or to protect rights, third-party service providers, marketing communications, business transfers, and with your consent.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">5. Security of Your Information</h2>
              <p className="text-gray-400 leading-relaxed">
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-white mb-4">6. Contact Us</h2>
              <p className="text-gray-400 leading-relaxed">
                If you have questions or comments about this Privacy Policy, please contact us at:
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
