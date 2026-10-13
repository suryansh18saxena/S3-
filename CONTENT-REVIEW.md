# S3 Infrastructure website — content review

This note explains where the new website's content came from, what was left out and why, and what we need from
S3 Infrastructure before launch. Everything below was checked against the current site (s3infrastructure.com) on
13 October 2026.

## 1. Please confirm before launch

| # | Item | What the new site says | Why we're asking |
| --- | --- | --- | --- |
| 1 | **Director's experience** | "T. Srinivasan, DCE — Director & CEO · 35+ years of experience" | Taken from the current homepage. The old site also says the company has "over 30 years" (homepage) and "over 35 years" (About page) of experience; because those disagree, the new site credits the experience to the Director only. |
| 2 | **Turnkey package rates** | Silver ₹1,899, Gold ₹1,999, Diamond ₹2,199, Platinum ₹2,399 per sq.ft, each with the "standard" rate (₹1,999 / ₹2,099 / ₹2,299 / ₹2,499) shown in small print | Copied exactly from the current Turnkey page, labelled "published rates as of October 2026" and "confirmed after a site assessment". Please confirm they are current. |
| 3 | **Package specifications and brands** | All materials, allowances and brands listed under each package, plus the exclusions list | Copied from the current Turnkey page. Please confirm nothing has changed. |
| 4 | **Warranty** | Silver: "5 years structure · 1 year waterproofing"; Gold: "same warranty as Silver"; Diamond/Platinum: no warranty line | The current site states a warranty only for Silver and Gold. If Diamond and Platinum carry the same warranty, tell us and we'll add it. |
| 5 | **Cost calculator — car parking** | Car parking is added at ₹1,800 per sq.ft | The current calculator *says* "₹1,800/sq.ft approximately" but is set up to add only ₹1 per sq.ft. We used the ₹1,800 stated in its own description. |
| 6 | **Cost calculator — area limit** | Built-up area from 300 to 20,000 sq.ft | The current calculator only accepts up to 1,000 sq.ft, which excludes most homes. |
| 7 | **Cost-plus contracts** | A table comparing cost-plus and fixed-price contracts, ending "ask us which suits your project" | From the current Turnkey page. Please confirm S3 offers cost-plus contracts. The old claim "clients can save up to 10%" was left out because we can't verify it. |
| 8 | **Approvals** | S3 "prepares the drawings and coordinates the approvals your project needs", while package exclusions still list "Government approvals" | Both come from the current site. Please confirm the wording (e.g. that approval *fees* are excluded but coordination is included). |
| 9 | **Phone numbers** | +91 70922 21713 (also WhatsApp) shown first, +91 80721 57134 second | Please confirm which number should be primary and that WhatsApp is on 70922 21713. |
| 10 | **Second email** | Only support@s3infrastructure.com is shown | The current Contact page also lists a personal Gmail address. We left it off; tell us if you want it shown. |
| 11 | **Service areas** | Chennai, Hosur and Bengaluru | From the current homepage copy. |
| 12 | **Legal pages** | Your Privacy Policy and Terms text, unchanged except for: one sentence noting that enquiries sent through WhatsApp or email are handled by those services; one sentence saying calculator estimates are indicative only; and the phrase "with an updated effective date" removed (the old page had no date) | Please have these small changes reviewed, and give us an effective date to display. |

## 2. Left out of the new site, and why

| Removed | Reason |
| --- | --- |
| Client testimonials (Hariharan, Geetha, Manikandan, Rizwana Shahid, Sujit Satpute, Kannan Achu, Majeed Manjerikkadan) | The same quotes appear under **different names** on the homepage and the About page, so they can't be published as genuine. The section reappears automatically once verified reviews are supplied. |
| "Team" profiles (Jean-Simon Venne, Zaha Ronald, Natalia Fard, Antoni Gaudí, Aarav Sharma, Priya Mehta, Neeraj) | Website-theme placeholders, not S3 staff. |
| Counters ("Happy Customers 900+", "Award Winning 0+", "Team Members 0+") and skill bars ("97%", "100%") | Placeholder or unverifiable figures. |
| "Best price guarantee", "320+ quality checks", "ISO quality standards", "No sub-contractors", "Homes Warranty", "24/7 Emergency Service" | Guarantees and certifications we can't verify. |
| Interior woodwork offers ("Eleganza", ₹6.37 L / ₹11.41 L / ₹16.81–16.82 L) | The figures conflict with each other across pages and may come from another company's offers. Send current interior pricing if you'd like it published. |
| "What We Deliver" text mentioning "CHENNEE Architects" | Copied from another firm. The building types were kept, rewritten in S3's voice. |
| Blog posts, portfolio items (Crown House, Rob Villa, Casa El Maqui…) and shop products (chairs, lamps) | Demo content from the WordPress theme. |
| Social media icons | They linked to the platform homepages (facebook.com, youtube.com…), not S3's own profiles. |
| Photographs from the current site | Mostly stock, AI-generated or taken from other websites and listings (e.g. a HousingMan property listing); none could be confirmed as S3 projects. Only the Director's portrait was kept. |

## 3. What we need from S3

1. **Project photographs** — the most valuable addition. For each completed project: 8–15 photos (at least 2,400 px wide),
   plus project name, building type, city, year, scope (design / construction / interiors) and, optionally, built-up area.
   The Projects page and homepage will feature them as case studies.
2. **Verified testimonials** — client name as they want it shown, project type and city, written consent, and ideally a link
   to the original review (e.g. Google).
3. **Official social media and Google Business Profile links**, if any.
4. **A vector version of the logo** (SVG, AI, EPS or PDF) for sharper display at large sizes.
5. Optional: office hours, team photographs and names, company registration/GST details you want shown.

## 4. About the photography on the new site

Until real project photos arrive, the site uses high-quality **representative photography licensed from Unsplash**
(free for commercial use). It illustrates building types and services only. Every such image is captioned
"Representative" and the footer explains this, so nothing presents stock imagery as S3's own work. The list of images is in
`scripts/media.config.mjs`, and each one can be swapped for a project photo without design changes.
