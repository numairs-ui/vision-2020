# Project Plan: Vision 2020 Catalog Website

## Phase 1: Data Structuring & Asset Prep
- [ ] **Task 1.1:** Manually extract all product images from the PDF and save them to `/public/images/products/`. Name them logically (e.g., `t-vip-001-1.jpg`, `pasgt-helmet.jpg`).
- [ ] **Task 1.2:** Parse the raw catalog text into a structured `src/data/products.json` file. 
      *(Prompt your IDE: "Read the provided catalog text and create a JSON array of objects. Each object should represent a product category (e.g., Vests, Helmets) containing individual items with their Model, Ballistic Material, Protection level, and Features.")*

## Phase 2: Project Setup & Global Layout
- [ ] **Task 2.1:** Initialize the web framework (e.g., Next.js, React, or plain HTML/Tailwind).
- [ ] **Task 2.2:** Set up global CSS variables matching the colors and typography in `designsystem.md`.
- [ ] **Task 2.3:** Build the `<Header />` component (Logo, Navigation: Vests, Helmets, Plates, Shields, EOD).
- [ ] [cite_start]**Task 2.4:** Build the `<Footer />` component utilizing the contact information and ISO certifications[cite: 14, 417, 418, 422].

## Phase 3: Component Development
- [ ] **Task 3.1:** Build the `<ProductCard />` component to display a summary of a single item.
- [ ] **Task 3.2:** Build the `<ProductGrid />` component to map over the JSON data and display multiple cards.
- [ ] **Task 3.3:** Build the `<ProductDetail />` view/modal. [cite_start]This must include the formatted bullet points for "Features" and a data table for items that have multiple specifications (like the Ceramic Ballistic Plates)[cite: 251, 263].

## Phase 4: Page Assembly
- [ ] [cite_start]**Task 4.1:** Build the Home Page (Hero section with company intro & 20 years experience snippet)[cite: 9].
- [ ] **Task 4.2:** Build the Category Pages routing to specific product types:
    - [cite_start]Bullet Proof & Modular Vests [cite: 16, 54]
    - [cite_start]Combat Helmets & Visors [cite: 161, 313]
    - [cite_start]Hard Armor Plates & Shields [cite: 249, 337]
    - [cite_start]Specialty (Briefcases, EOD Suits) [cite: 376, 400]
- [ ] **Task 4.3:** Responsive design QA (ensure tables and product grids wrap correctly on mobile).