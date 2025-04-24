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
};

export interface SchemaInfo {
  urn: string | null;
  url: string | null;
}



