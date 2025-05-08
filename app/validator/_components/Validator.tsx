"use client";
import { AuthWarning } from "./AuthWarning";
import { InputTabsSection } from "./InputTabsSection";
import { ButtonSection } from "./ButtonSection";
import { OutputSection } from "./OutputSection";
import { useSession } from "next-auth/react";
import { useXmlSchemaStore } from "@/_store/xmlSchemaStore";
import { useEffect } from "react";

const classes = {
  headerSection: "flex flex-col",
  title: "text-2xl font-bold mb-2",
  description: "text-base",
  bottomBorder: "border-t border-gray-300 mt-4 pt-4",
};

export const Validator = () => {
  const { status } = useSession();
  
  switch (status) {
    case "loading": {
      return (
        <div className="flex justify-between items-center">
          <p>Loading...</p>
        </div>
      );
    }
    case "authenticated": {
      const { initializeSchemas } = useXmlSchemaStore();

      useEffect(() => {
        const fetchSchemas = async () => {
          try {
            await initializeSchemas();
          } catch (error) {
            console.error("Error initializing schemas:", error);
          }
        };
        fetchSchemas();
      }, [initializeSchemas]);

      return (
        <>
          <div className={classes.headerSection}>
            <h1 className={classes.title}>Reservemarket Test Tool</h1>
            <p className={classes.description}>
              Validate messages and errors by adding code to XML-validator.
              Validator will show error messages as results.
            </p>
          </div>

          <InputTabsSection />
          <ButtonSection />
          <OutputSection />

          <div id="bottom-border" className={classes.bottomBorder}>
            &nbsp;
          </div>
        </>
      );
    }
    case "unauthenticated":
    default: {
      return (
        <div className="flex justify-between items-center">
          <AuthWarning />
        </div>
      );
    }
  }
};
