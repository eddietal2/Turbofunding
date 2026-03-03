import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | TurboFunding.com",
  description: "Read TurboFunding's privacy policy to understand how we handle your personal and business information.",
}

export default function PrivacyPage() {
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
                Privacy Policy
              </h2>
              <p className="text-lg font-semibold mb-2 text-gray-300">
                Last Updated: March 2nd, 2026.
              </p>
            </div>

            <p className="text-gray-400">
              This Privacy Policy is incorporated by reference into TurboFunding's Terms and Conditions, available at turbofunding.com/terms.
            </p>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                1. Scope and Applicability
              </h3>
              <div className="space-y-4">
                <p className="text-gray-400">
                  This Privacy Policy describes how TurboFunding, LLC ("TurboFunding," "we," "us," or "our") collects, uses, shares, and protects information obtained through turbofunding.com and related services (the "Platform"). This Policy applies to businesses and individuals who access or use the Platform in connection with commercial financing inquiries.
                </p>
                <p className="text-gray-400">
                  The Platform is intended solely for commercial and business purposes. By using the Platform, you represent that you are not a "consumer" as defined under applicable consumer privacy laws. To the extent any consumer protections apply to you under applicable law notwithstanding this representation, nothing in this Policy is intended to limit rights you may have under those laws.
                </p>
                <p className="text-gray-400">
                  This Privacy Policy does not govern the privacy practices of any third-party financing providers, identity verification vendors, or other independent parties to whom we may refer or transmit your information. We encourage you to review the privacy policies of any such third parties directly.
                </p>
              </div>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                2. Information We Collect
              </h3>
              
              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  2.1 Information You Provide
                </h4>
                <p className="mb-4 text-gray-400">
                  We collect personal and business information that you voluntarily submit through the Platform, which may include:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
                  <li><strong>Identifying information:</strong> name, date of birth, Social Security number or tax identification number, government-issued ID details;</li>
                  <li><strong>Contact information:</strong> mailing address, email address, telephone number(s);</li>
                  <li><strong>Business information:</strong> business legal name, DBA name, business address, entity type, state of formation, years in operation, industry, and business purpose;</li>
                  <li><strong>Financial information:</strong> annual revenue, monthly revenue, outstanding debts, bank account information, financial statements, tax returns, and other financial documentation submitted in connection with a financing inquiry; and</li>
                  <li><strong>Application materials:</strong> any other documents, representations, or information you submit through the Platform.</li>
                </ul>
              </div>

              <div>
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  2.2 Information We Collect Automatically
                </h4>
                <p className="mb-4 text-gray-400">
                  When you access the Platform, we and our service providers may automatically collect certain technical information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4 text-gray-400">
                  <li><strong>Device information:</strong> device type, operating system, browser type and version;</li>
                  <li><strong>Usage data:</strong> pages visited, time spent on the Platform, links clicked, and referral URL;</li>
                  <li><strong>Network information:</strong> IP address, approximate geographic location derived from IP address; and</li>
                  <li><strong>Cookies and similar tracking technologies:</strong> as described in Section 9 below.</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                3. How We Use Information
              </h3>
              <p className="mb-4 text-gray-400">
                TurboFunding uses the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-400">
                <li>To facilitate introductions between you and independent third-party financing providers;</li>
                <li>To process, transmit, and support your financing application;</li>
                <li>To verify your identity and the accuracy of information you provide;</li>
                <li>To detect, investigate, and prevent fraud, unauthorized activity, and other illegal conduct;</li>
                <li>To comply with applicable laws, regulations, court orders, and regulatory obligations, including state commercial finance disclosure requirements;</li>
                <li>To maintain and improve the security, functionality, and performance of the Platform;</li>
                <li>To communicate with you regarding your inquiry, application status, and related matters (subject to your communications consent as described in our Terms and Conditions); and</li>
                <li>To analyze usage trends and improve our services.</li>
              </ul>
              <p className="text-gray-400">
                TurboFunding does not use your personal information to make automated credit or financing decisions. All financing decisions are made by independent third-party financing providers.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                4. How We Share Information
              </h3>

              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  4.1 Financing Providers
                </h4>
                <p className="text-gray-400">
                  We share your information with independent third-party financing providers for the purpose of evaluating and potentially fulfilling your financing inquiry. These providers have their own privacy practices and are independently responsible for their use of your information. We encourage you to review their privacy policies before entering into any financing arrangement.
                </p>
              </div>

              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  4.2 Service Providers
                </h4>
                <p className="mb-4 text-gray-400">
                  We share information with third-party service providers that assist TurboFunding in operating the Platform and delivering our services. These categories of service providers include:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-400">
                  <li>Identity verification and Know Your Customer (KYC) vendors;</li>
                  <li>Fraud detection and prevention vendors;</li>
                  <li>Data hosting, cloud infrastructure, and IT security providers;</li>
                  <li>Communications and customer engagement platforms; and</li>
                  <li>Legal, compliance, and professional service providers.</li>
                </ul>
                <p className="text-gray-400">
                  These service providers are contractually obligated to use your information only for the purposes of performing services on our behalf and are prohibited from using it for their own independent purposes.
                </p>
              </div>

              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  4.3 Legal and Regulatory Disclosures
                </h4>
                <p className="text-gray-400">
                  We may disclose information to government authorities, regulators, law enforcement agencies, or courts when required by applicable law, subpoena, court order, or regulatory demand, or when we believe disclosure is necessary to: (a) comply with a legal obligation; (b) protect the rights, property, or safety of TurboFunding, our users, or the public; or (c) detect, prevent, or respond to fraud or security threats.
                </p>
              </div>

              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  4.4 Business Transfers
                </h4>
                <p className="text-gray-400">
                  In the event of a merger, acquisition, sale of all or substantially all of our assets, or other business combination, your information may be transferred to the successor entity. We will provide notice of any such transfer and any material changes to this Privacy Policy that result from such a transaction.
                </p>
              </div>

              <div>
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  4.5 No Sale of Personal Information
                </h4>
                <p className="text-gray-400">
                  TurboFunding does not sell personal information to third parties and does not share personal information for cross-context behavioral advertising, as those terms are defined under applicable state privacy laws including the California Consumer Privacy Act (CCPA) and similar statutes.
                </p>
              </div>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                5. State Privacy Rights
              </h3>

              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  5.1 California
                </h4>
                <p className="mb-3 text-gray-400">
                  California residents have rights under the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA). These rights include the right to: (a) know what categories and specific pieces of personal information we have collected about you; (b) know the categories of sources from which personal information was collected; (c) know the business or commercial purpose for collecting personal information; (d) know the categories of third parties with whom personal information is shared; (e) access a copy of personal information collected; (f) request deletion of personal information, subject to certain exceptions; (g) correct inaccurate personal information; (h) opt out of the sale or sharing of personal information (TurboFunding does not sell or share personal information for advertising purposes); and (i) not be discriminated against for exercising these rights.
                </p>
                <p className="text-gray-400">
                  California residents may submit requests to exercise these rights through the contact information on turbofunding.com. We will respond to verifiable requests within the timeframes required by applicable law.
                </p>
              </div>

              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  5.2 Virginia, Colorado, Connecticut, and Texas
                </h4>
                <p className="text-gray-400">
                  Residents of Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), and Texas (TDPSA) have rights to: access personal information we hold about them; correct inaccurate personal information; request deletion of personal information; obtain a copy of personal information in a portable format; and opt out of certain processing activities, including targeted advertising and profiling. TurboFunding does not engage in targeted advertising or sell personal data as defined under these laws. To submit a request, use the contact information on turbofunding.com.
                </p>
              </div>

              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  5.3 Utah
                </h4>
                <p className="text-gray-400">
                  Utah residents have rights under the Utah Consumer Privacy Act (UCPA) to access and delete personal information we hold about them and to opt out of the sale of personal information. TurboFunding does not sell personal information. To submit a request, use the contact information on turbofunding.com.
                </p>
              </div>

              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  5.4 Nevada
                </h4>
                <p className="text-gray-400">
                  Nevada residents may submit a request to be placed on our internal Do Not Sell list pursuant to Nevada Revised Statutes Chapter 603A. TurboFunding does not sell personal information as defined under Nevada law; however, we will honor any such request. To submit a request, use the contact information on turbofunding.com.
                </p>
              </div>

              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  5.5 North Dakota and Vermont
                </h4>
                <p className="text-gray-400">
                  Residents of North Dakota and Vermont receive additional protections under applicable state law, including restrictions on the disclosure of personal information for marketing purposes without consent. TurboFunding complies with applicable state-specific marketing disclosure requirements.
                </p>
              </div>

              <div className="mb-6">
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  5.6 Appeals
                </h4>
                <p className="text-gray-400">
                  If TurboFunding declines to fulfill a privacy rights request, you may appeal that decision by submitting a written appeal to TurboFunding through the contact information on turbofunding.com. We will respond to appeals within the timeframes required by applicable law. If your appeal is denied, you may have the right to contact your state attorney general or applicable regulatory authority.
                </p>
              </div>

              <div>
                <h4 
                  className="text-lg font-bold mb-3 text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  5.7 Authorized Agents
                </h4>
                <p className="text-gray-400">
                  In states where permitted by law, you may designate an authorized agent to submit privacy rights requests on your behalf. We may require verification of your identity and confirmation of the agent's authority before processing a request submitted by an agent.
                </p>
              </div>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                6. Cookies and Tracking Technologies
              </h3>
              <p className="mb-4 text-gray-400">
                The Platform may use cookies, web beacons, pixel tags, and similar tracking technologies to collect usage data and improve the user experience. Cookies are small text files stored on your device that help us recognize returning visitors, understand how the Platform is used, and maintain session integrity.
              </p>
              <p className="mb-4 text-gray-400">
                You may configure your browser settings to refuse cookies or to alert you when cookies are being sent. Please note that disabling cookies may affect the functionality of certain features of the Platform. We do not currently respond to browser-based "Do Not Track" signals, but we do honor opt-out requests submitted through the mechanisms described in this Policy.
              </p>
              <p className="text-gray-400">
                TurboFunding does not use tracking technologies for cross-context behavioral advertising.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                7. Data Security
              </h3>
              <p className="mb-4 text-gray-400">
                TurboFunding maintains administrative, technical, and physical safeguards designed to protect personal and business information against unauthorized access, disclosure, alteration, or destruction. These safeguards include, but are not limited to, encryption of data in transit, access controls, and security monitoring of our systems.
              </p>
              <p className="mb-4 text-gray-400">
                While we use commercially reasonable security measures, no data transmission over the internet or data storage system can be guaranteed to be 100% secure. In the event of a security incident that affects your personal information, TurboFunding will notify affected individuals and applicable regulators as required by applicable state and federal breach notification laws.
              </p>
              <p className="text-gray-400">
                You are responsible for maintaining the confidentiality of any credentials used to access the Platform and for promptly notifying us of any suspected unauthorized access or security incident involving your information.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                8. Data Retention
              </h3>
              <p className="mb-4 text-gray-400">
                TurboFunding retains personal and business information for as long as necessary to: (a) fulfill the purposes described in this Privacy Policy; (b) comply with applicable legal and regulatory retention obligations; (c) resolve disputes; and (d) enforce our agreements.
              </p>
              <p className="mb-4 text-gray-400">
                The specific retention period for a given category of information depends on the nature of the information and the purposes for which it was collected. For example, information submitted in connection with a financing application may be retained for a period consistent with applicable anti-money laundering, fraud prevention, and recordkeeping regulations. Information that is no longer needed for any legitimate business or legal purpose will be securely deleted or anonymized.
              </p>
              <p className="text-gray-400">
                You may request deletion of your personal information as described in Section 5 of this Policy, subject to our right to retain information as required or permitted by applicable law.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                9. Children's Privacy
              </h3>
              <p className="text-gray-400">
                The Platform is intended solely for commercial and business use by adults. TurboFunding does not knowingly collect personal information from individuals under the age of 18. If we become aware that we have inadvertently collected personal information from a minor, we will take prompt steps to delete that information. If you believe that a minor has submitted personal information through the Platform, please contact us immediately through the contact information on turbofunding.com.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                10. Third-Party Links and Services
              </h3>
              <p className="text-gray-400">
                The Platform may contain links to third-party websites or services, including the websites of financing providers, for your convenience. TurboFunding does not control and is not responsible for the content, privacy practices, or security of any third-party website or service. This Privacy Policy applies solely to information collected through the TurboFunding Platform. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                11. Updates to This Privacy Policy
              </h3>
              <p className="mb-4 text-gray-400">
                We may update this Privacy Policy from time to time to reflect changes in our data practices, applicable law, or business operations. Updated versions will be posted on the Platform with a revised "Last Updated" date. If we make material changes to this Policy, we will make reasonable efforts to provide notice, such as by posting a prominent notice on the Platform prior to the change becoming effective.
              </p>
              <p className="text-gray-400">
                Your continued use of the Platform following the posting of any revised Privacy Policy constitutes your acceptance of the revised Policy. If you do not agree to the revised Privacy Policy, you must discontinue use of the Platform.
              </p>
            </div>

            <div>
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                12. Contact Information
              </h3>
              <p className="text-gray-400">
                If you have questions about this Privacy Policy, wish to exercise your applicable privacy rights, or wish to submit an appeal, please contact us through the contact information provided on turbofunding.com. To help us respond efficiently, please identify the nature of your request and the state in which you reside.
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
