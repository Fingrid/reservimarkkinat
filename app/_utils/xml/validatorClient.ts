"use client";

import { ValidationResult } from "@/types";

/**
 * Client for interacting with the XML validation backend
 */
export const validatorClient = {
  /**
   * Validates XML content against business rules on the server
   */
  validateBusinessRules: async (
    xmlContent: string,
  ): Promise<ValidationResult> => {
    try {
      const response = await fetch('/api/validate-xml', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
        },
        body: xmlContent,
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Transform API response to ValidationResult format if needed
      return {
        isValid: true, // XML is already validated at this point
        businessValidation: {
          isValid: result.isValid !== false, // Use API's isValid or default to true
          details: result.details || result.errors || [], // Handle different error formats
        },
      };
    } catch (error) {
      console.error('Business validation request failed:', error);
      return {
        isValid: true, // XML is still valid
        businessValidation: {
          isValid: false,
          details: [
            {
              code: 'ERR',
              message: `Failed to validate with backend: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        },
      };
    }
  },
};
