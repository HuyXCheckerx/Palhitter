import { Code, Layers, Bot, Eye, Wrench } from 'lucide-react';

export const generalToolsData = [
  {
    id: "palhitter-lite",
    title: "Palhitter Lite",
    category: "General Tools",
    tag: "palchecker",
    description: "Fastest proxyless paypal checker",
    fullDescription: "Check paypal accounts with little to no proxy usage, fast and reliable",
    features: [
      "Rustbased paypal checker",
      "Access to bi-daily updates",
      "Most private apis",
      "Coded and optimized with Rust, one of the fastest coding language!"
    ],
    price: "$129.99 /Weekly",
    image: "/pal1.png",
    image2: "/pal2.png",
    image3: "/pal3.png",
    gradient: "from-green-600 to-teal-700",
    currency: "USD",
    numericPrice: 129.99
  },
  {
    id: "palhitter-lifetime",
    title: "Palhitter Pro",
    category: "General Tools",
    tag: "palchecker",
    description: "Fastest proxyless paypal checker",
    fullDescription: "Check paypal accounts with little to no proxy usage, fast and reliable",
    features: [
      "Access to exploited auto hitter",
      "Rustbased paypal checker",
      "Access to bi-daily updates",
      "Most private apis",
      "Coded and optimized with Rust, one of the fastest coding language!"
    ],
    price: "$329.99 /Lifetime",
    image: "/pal1.png",
    image2: "/pal2.png",
    image3: "/pal3.png",
    gradient: "from-green-600 to-teal-700",
    currency: "USD",
    numericPrice: 329.99
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