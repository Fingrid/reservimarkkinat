"use client";

import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

const isProd = process.env.NODE_ENV === 'production';
const assetPrefix = isProd ? '/reservimarkkinat' : '';

type Props = {
    spec?: string;
};

const ScalarUI = ({spec}: Props) => {
    return <ApiReferenceReact
      configuration={{
        hideTestRequestButton: true,
        hideDownloadButton: true,
        showSidebar: false,
        //layout: "classic",
        spec: {
          url: `${assetPrefix}/${spec}`,
        },
      }}
    />;
};

export { ScalarUI };
