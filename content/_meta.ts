export default {
  // Top nav
  wiki: {
    type: "page",
    title: "Wiki",
    href: "/",
  },

  utilities: {
    type: "menu",
    title: "Utilities",
    items: {
      rmtt: {
        title: "Reservemarket Test Tool",
        href: "/validator",
      },
    },
  },

  validator: {
    type: "page",
    display: "hidden",
    title: "Reservemarket Test Tool",
  },

  // Side naw
  index: "Developer portal",
  "0###": { type: "separator", title: "General" },
  market_platforms: "Market platforms",
  information_exchange: "Information exchange",
  cim: "Common Information Model - CIM",
  about: { type: "page", title: "About", display: "hidden" },
  glossary: "Glossary",
  "1###": { type: "separator", title: "Market Platforms" },
  mFRR_C: {
    type: "page",
    title: "Balancing capacity markets (mFRR)",
    display: "hidden",
  },
  mFRR_E: "Balancing energy markets (mFRR)",
  aFRR_C: {
    type: "page",
    title: "Automatic frequency restoration reserve capacity markets (aFRR)",
    display: "hidden",
  },
  aFRR_E: "Automatic frequency restoration reserve energy markets (aFRR)",
  FCR: {
    type: "page",
    title: "Frequency containment reserves (FCR products)",
    display: "hidden",
  },
  FFR: {
    type: "page",
    title: "Fast Frequency Reserve (FFR)",
    display: "hidden",
  },
};
