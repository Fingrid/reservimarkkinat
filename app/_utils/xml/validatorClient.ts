"use client";

import { ValidationResult } from "@/types";

/**
 * Simulates a business-level validation call to the backend
 * In the future, this will be replaced with actual API calls
 */
export const validatorClient = {
  /**
   * Validates XML content against business rules on the server
   * Currently just simulates a delay and returns success
   */
  validateBusinessRules: async (xmlContent: string): Promise<ValidationResult> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // For demo purposes, randomly return success or an error
    const isSuccessful = Math.random() > 0.5;
    
    if (isSuccessful) {
      return {
        isValid: true,
        businessValidation: {
          isValid: true,
          details: []
        }
      };
    } else {
      // Return a sample business validation error
      return {
        isValid: true, // XML is still valid
        businessValidation: {
          isValid: false,
          details: [
            {
              code: "B01",
              message: "Bid price exceeds allowed limits for the specified market period"
            },
            {
              code: "B04",
              message: "Invalid conditional link: Referenced bid does not exist"
            }
          ]
        }
      };
    }
  }
};
