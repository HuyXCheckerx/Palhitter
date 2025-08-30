import { Code } from 'lucide-react';

export const generalToolsData = [
  {
    id: "palhitter",
    title: "Palhitter",
    category: "General Tools",
    tag: "palchecker",
    description: 'Palhitter is a high-performance PayPal account validation service designed to secure and streamline your payment operations. Choose from three distinct tiers, each tailored to meet specific demands—from individual freelance use to large-scale enterprise solutions. Enhance your efficiency, minimize risk, and scale with confidence.',
    fullDescription: "XanaxPal - The #1 PayPal Checker. Logs last 8h->1week, No security lock, Proxyless (PalhitterEX), Daily updates to all apis.",
    image: "/pal1.png",
    image2: "/pal2.png",
    image3: "/pal3.png",
    gradient: "from-green-600 to-teal-700",
    currency: "USD",
    tiers: [
      {
        id: "palhitter-lite",
        name: "Palhitter LITE",
        description: 'Essential Toolkit for Individuals: Perfect for freelancers and small-scale users, the LITE tier provides our core high-performance validation engine. Get started with essential features to ensure your payment processes are secure and efficient.',
        ui: "Legacy UI",
        features: [
          "Brute API#1: capture email:pass|[country] (5-8k CPM, *NEEDS SOLVER)",
          "Valid Mail: 20k CPM (Captchaless)",
          "Legacy cmd UI"
        ],
        options: [
          { name: "Monthly", price: 349, numericPrice: 349 },
          { name: "Lifetime", price: 799, numericPrice: 799 }
        ]
      },
      {
        id: "palhitter-mid",
        name: "Palhitter MID",
        description: 'Advanced Suite for Growing Businesses: Engineered for professionals and expanding teams who demand more power and flexibility. Benefit from significantly higher transaction limits, priority processing, and access to advanced analytics to optimize your operations.',
        ui: "Legacy UI",
        features: [
          "Brute API#1: capture email:pass|[country] (5-8k CPM, *NEEDS SOLVER)",
          "Brute API#2: capture email:pass|[country]|[CC]|[BANK]|[PHONE] (8-9k CPM, *NEEDS SOLVER)",
          "Valid Mail: 20k CPM (Captchaless)",
          "Legacy cmd UI"
        ],
        options: [
          { name: "Monthly", price: 449, numericPrice: 449 },
          { name: "Lifetime", price: 899, numericPrice: 899 }
        ]
      },
      {
        id: "palhitter-ex",
        name: "Palhitter EX",
        description: 'Ultimate Enterprise Solution: Our premier EX tier delivers unparalleled performance for large-scale enterprises. Experience the full potential of Palhitter with unlimited access, dedicated enterprise-grade support, and exclusive API access for seamless integration.',
        ui: "Webapp UI",
        features: [
          "Brute API#1 & API#2",
          "Brute API#3: capture email:pass|[country]|[CC]|[BANK]|[PHONE]:cookies (9-13k CPM, PROXYLESS + CAPTCHALESS)",
          "ValidMail",
          "Paypal gateway autohitter",
          "Modern WEBAPP UI"
        ],
        options: [
          { name: "Monthly", price: 1049, numericPrice: 1049 },
          { name: "Lifetime", price: 2799, numericPrice: 2799 }
        ]
      }
    ]
  }
];

export const specializedServicesData = [];
export const solanaTradingBotsData = [];
export const cryonerSolutionsData = [];
export const legacyServicesData = [];

export const allServicesFlat = [
  ...generalToolsData,
  ...specializedServicesData,
  ...solanaTradingBotsData,
  ...cryonerSolutionsData,
  ...legacyServicesData
];

export const serviceCategories = [
  { id: "general-tools", title: "Data & Checkers", data: generalToolsData, icon: Code, summary: "Professional data products & utility checkers from @pillowware"},
];