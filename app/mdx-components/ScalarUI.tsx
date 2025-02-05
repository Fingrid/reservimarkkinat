"use client";

import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

const ScalarUI = () => {
    return <ApiReferenceReact
      configuration={{
        showSidebar: false,
        hideTestRequestButton: true,
        hideDownloadButton: true,
        spec: {
          url: "/ecert.openapi.yml",
        },
      }}
    />;
};

export { ScalarUI };
