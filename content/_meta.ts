export default {
  // Top nav
  test_tool: {
    type: "page",
    title: "Reservemarket Test Tool",
    href: "https://developers.fingrid.fi/validator",
  },
  
  // Side naw
  index: "Developer portal",
  "0###": { type: "separator", title: "General" },
  market_platforms: "Market platforms",
  information_exchange: "Information exchange",
  EDX_message_types: "EDX Message Types",
  cim: "Common Information Model - CIM",
  about: { type: "page", title: "About", display: "hidden" },
  updatelog: { type: "page", title: "Change Log", display: "hidden" },
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
  FCR: "Frequency containment reserves (FCR products)",
  FFR: "Fast Frequency Reserve (FFR)",
};
