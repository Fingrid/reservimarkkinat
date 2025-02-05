"use client";

import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

const isProd = process.env.NODE_ENV === 'production';
const assetPrefix = isProd ? '/reservimarkkinat' : '';

const ScalarUI = () => {
    return <ApiReferenceReact
      configuration={{
        showSidebar: false,
        hideTestRequestButton: true,
        hideDownloadButton: true,
        spec: {
          url: assetPrefix + "/ecert.openapi.yml",
        },
      }}
    />;
};

export { ScalarUI };
