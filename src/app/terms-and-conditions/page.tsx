import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMeta({
  title: "Terms & Conditions",
  description: "The terms that apply when you use the S3 Infrastructure website or engage our architecture, interior design and construction services.",
  path: "/terms-and-conditions/",
});

/** Text carried over from S3's existing Terms and Conditions page. */
export default function TermsPage() {
  const sections: [string, string[]][] = [
    [
      "1. Scope of services",
      [
        "S3 Infrastructure provides architectural design, interior design, 3D visualization, renovation, and construction-related services. The scope of work for each project will be clearly defined and agreed upon through proposals, quotations, or written agreements prior to commencement.",
      ],
    ],
    [
      "2. Consultation & project engagement",
      [
        "Initial consultations may be free or paid, depending on the nature of the project. Any engagement of services shall be confirmed only after mutual agreement on scope, timelines, and commercial terms.",
      ],
    ],
    [
      "3. Design ownership & intellectual property",
      [
        "All architectural drawings, designs, 3D renderings, plans, concepts, and related materials created by S3 Infrastructure remain the intellectual property of the firm unless otherwise agreed in writing.",
        "Clients are not permitted to reproduce, share, modify, or use the designs for purposes beyond the agreed project without written consent.",
      ],
    ],
    [
      "4. Payments & fees",
      [
        "All service fees, payment schedules, and milestones will be communicated prior to project initiation. Payments must be made as per the agreed terms. Delays in payment may result in suspension of services or project timelines.",
      ],
    ],
    [
      "5. Project timelines",
      [
        "Estimated timelines are provided based on project scope and client inputs. S3 Infrastructure shall not be held responsible for delays caused by factors beyond our control, including client approvals, regulatory approvals, material availability, or force majeure events.",
      ],
    ],
    [
      "6. Client responsibilities",
      [
        "Clients are responsible for providing accurate project requirements, site details, approvals, and timely feedback. Any changes requested after design finalization may result in additional costs and time extensions.",
      ],
    ],
    [
      "7. Construction & execution",
      [
        "Where construction or execution services are provided, S3 Infrastructure ensures professional standards and quality workmanship. However, material selection, vendor performance, and site conditions may impact outcomes beyond design control.",
      ],
    ],
    [
      "8. Revisions & modifications",
      [
        "Design revisions are allowed as per the agreed package or contract. Additional revisions beyond the agreed scope may incur extra charges and affect delivery timelines.",
      ],
    ],
    [
      "9. Limitation of liability",
      [
        "S3 Infrastructure shall not be liable for indirect, incidental, or consequential damages arising from the use of our services, designs, or website content. All services are provided in good faith and based on industry best practices.",
      ],
    ],
    [
      "10. Confidentiality",
      [
        "All client information, project details, and communications are treated as confidential and will not be shared with third parties without prior consent, except where required by law.",
      ],
    ],
    [
      "11. Website content",
      [
        "The content on our website is for informational purposes only. S3 Infrastructure reserves the right to update, modify, or remove any content without prior notice.",
        "Estimates produced by the online cost calculator are indicative only and do not constitute a quotation or offer.",
      ],
    ],
    [
      "12. Termination of services",
      ["Either party may terminate the service agreement with written notice. In such cases, payments due for completed work must be settled before termination."],
    ],
    [
      "13. Governing law",
      ["These Terms and Conditions shall be governed by and interpreted in accordance with the laws of India, with jurisdiction subject to the courts of Chennai, Tamil Nadu."],
    ],
    ["14. Contact information", ["For any questions regarding these Terms and Conditions, please contact us using the details on this page."]],
  ];

  return (
    <LegalPage
      title="Terms & Conditions"
      path="/terms-and-conditions/"
      intro="Welcome to S3 Infrastructure. By accessing our website, contacting us, or engaging our architectural, interior design, or construction services, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before proceeding."
    >
      {sections.map(([h, ps]) => (
        <section key={h}>
          <h2>{h}</h2>
          {ps.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </section>
      ))}
    </LegalPage>
  );
}
