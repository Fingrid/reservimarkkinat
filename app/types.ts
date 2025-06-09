export type ExtractFCType<T> = T extends React.FC<infer U> ? U : never;

// Validator
export type ValidationResult = {
  isValid: boolean;
  schema?: {
    url: string;
    urn: string | null; // Allow null
  };
  details?: Array<{
    line: number;
    message: string;
  }>;
  // New fields for business rule validation
  businessValidation?: {
    isValid: boolean;
    details?: Array<{
      code?: string;
      message: string;
    }>;
  };
};

export interface SchemaInfo {
  urn: string | null;
  url: string | null;
}

export type SchemaList = { schemas: { urn: string | null; filename: string }[] };
