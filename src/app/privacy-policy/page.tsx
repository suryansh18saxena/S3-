import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "How S3 Infrastructure collects, uses, stores and protects the personal information you share with us.",
  path: "/privacy-policy/",
});

/** Text carried over from S3's existing Privacy Policy page. */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy/"
      intro="At S3 Infrastructure, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, store, and safeguard the information you provide when you interact with our website, services, or team."
    >
      <section>
        <h2>1. Information we collect</h2>
        <p>We may collect personal information including, but not limited to:</p>
        <ul>
          <li>Name</li>
          <li>Phone number</li>
          <li>Email address</li>
          <li>Physical address</li>
          <li>Project-related details</li>
          <li>Any information voluntarily submitted through contact forms, emails, or consultations</li>
        </ul>
        <p>We may also collect non-personal information such as browser type, device information, and website usage data for analytical purposes.</p>
      </section>
      <section>
        <h2>2. How we use your information</h2>
        <ul>
          <li>Respond to inquiries and provide consultations</li>
          <li>Deliver architectural, interior, and construction services</li>
          <li>Communicate project updates and service-related information</li>
          <li>Improve our website, services, and customer experience</li>
          <li>Comply with legal and regulatory requirements</li>
        </ul>
      </section>
      <section>
        <h2>3. Information sharing &amp; disclosure</h2>
        <p>
          S3 Infrastructure does not sell, trade, or rent your personal information to third parties. Information may be shared
          only with trusted partners, consultants, or contractors when required to deliver services, and only to the extent
          necessary.
        </p>
      </section>
      <section>
        <h2>4. Data security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information from unauthorized
          access, misuse, alteration, or disclosure. While we strive to use commercially acceptable means to protect your data,
          no method of transmission over the internet is 100% secure.
        </p>
      </section>
      <section>
        <h2>5. Cookies &amp; tracking technologies</h2>
        <p>
          Our website may use cookies to enhance user experience, analyze website traffic, and improve functionality. You may
          choose to disable cookies through your browser settings; however, some features of the website may not function
          properly.
        </p>
      </section>
      <section>
        <h2>6. Third-party links</h2>
        <p>
          Our website may contain links to third-party websites. S3 Infrastructure is not responsible for the privacy practices
          or content of such external sites. We encourage users to review the privacy policies of those websites.
        </p>
        <p>
          Enquiries you choose to send through WhatsApp or your email application are handled by those services under their own
          privacy policies.
        </p>
      </section>
      <section>
        <h2>7. Client confidentiality</h2>
        <p>
          All client information, project details, and communications are treated with strict confidentiality and are used
          solely for project-related purposes unless disclosure is required by law.
        </p>
      </section>
      <section>
        <h2>8. Data retention</h2>
        <p>
          We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy or as
          required by applicable laws and regulations.
        </p>
      </section>
      <section>
        <h2>9. Your rights</h2>
        <p>
          You have the right to request access to, correction of, or deletion of your personal information. You may also
          withdraw consent for data processing by contacting us directly.
        </p>
      </section>
      <section>
        <h2>10. Policy updates</h2>
        <p>
          S3 Infrastructure reserves the right to update or modify this Privacy Policy at any time. Any changes will be reflected
          on this page.
        </p>
      </section>
      <section>
        <h2>11. Contact us</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy or how your information is handled, please contact
          us using the details on this page.
        </p>
      </section>
    </LegalPage>
  );
}
