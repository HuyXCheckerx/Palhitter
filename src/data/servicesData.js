import { Code, Layers, Bot, Eye, Wrench } from 'lucide-react';

export const generalToolsData = [
  {
    id: "palhitter",
    title: "PalHitter",
    category: "General Tools",
    tag: "palchecker",
    description: "Fastest proxyless paypal checker",
    fullDescription: "Check paypal accounts with little to no proxy usage, fast and reliable. Choose from multiple tiers to fit your needs.",
    features: [
      "Rustbased paypal checker",
      "Access to bi-daily updates",
      "Most private apis",
      "Multiple pricing tiers available",
      "Coded and optimized with Rust, one of the fastest coding language!"
    ],
    price: "Starting at $29",
    image: "/pal1.png",
    image2: "/pal2.png",
    image3: "/pal3.png",
    gradient: "from-green-600 to-teal-700",
    currency: "USD",
    numericPrice: 29,
    hasCustomization: true
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