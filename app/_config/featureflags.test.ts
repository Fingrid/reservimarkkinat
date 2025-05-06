import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Feature Flags', () => {
  const originalEnv = { ...process.env };
  
  // Clean up environment variables between tests
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });
  
  afterEach(() => {
    process.env = originalEnv;
  });
  
  describe('isFeatureEnabled function', () => {    
    it('should return true when feature is in ENABLED_FEATURES list', () => {
      process.env.ENABLED_FEATURES = 'backend_validation,analytics';
      
      // Need to re-import to get updated env vars
      const { isFeatureEnabled } = require('./featureflags');
      
      expect(isFeatureEnabled('backend_validation')).toBe(true);
      expect(isFeatureEnabled('analytics')).toBe(true);
      expect(isFeatureEnabled('advanced_filtering')).toBe(false);
    });
    
    it('should handle whitespace in ENABLED_FEATURES list', () => {
      process.env.ENABLED_FEATURES = 'backend_validation, analytics, ';
      
      // Need to re-import to get updated env vars
      const { isFeatureEnabled } = require('./featureflags');
      
      expect(isFeatureEnabled('backend_validation')).toBe(true);
      expect(isFeatureEnabled('analytics')).toBe(true);
    });
  });
});
