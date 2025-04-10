import localFont from "next/font/local";

export const labGrotesqueWeb = localFont({
  variable: "--font-lab-grotesque-web",
  src: [
    {
      path: "./fonts/LabGrotesqueWeb-Bold.woff",
      style: "normal",
      weight: "bold",
    },
    {
      path: "./fonts/LabGrotesqueWeb-Regular.woff",
      weight: "400 600",
    },
    {
      path: "./fonts/LabGrotesqueWeb-Light.woff",
      style: "normal",
      weight: "100 300",
    },
    {
      path: "./fonts/LabGrotesqueWeb-BoldItalic.woff",
      style: "italic",
      weight: "bold",
    },
    {
      path: "./fonts/LabGrotesqueWeb-Italic.woff",
      weight: "400 600",
      style: "italic",
    },
    {
      path: "./fonts/LabGrotesqueWeb-LightItalic.woff",
      style: "italic",
      weight: "100 300",
    },
  ],
});
