module.exports = {
  ci: {
    collect: {
      // Use static dist directory instead of starting a server
      // This is more reliable in CI and avoids port conflicts
      staticDistDir: './build',
      // Collect 3 runs per URL to reduce variance (per RESEARCH.md)
      numberOfRuns: 3,
      // URLs to audit (relative to staticDistDir)
      url: ['http://localhost/'],
    },
    assert: {
      // Budget enforcement from budget.json
      budgetsFile: './budget.json',
      assertions: {
        // Performance score must be 90+ (per roadmap CI-02)
        'categories:performance': ['error', { minScore: 0.9 }],
        // Accessibility score must be 90+ (per roadmap CI-03)
        'categories:accessibility': ['error', { minScore: 0.9 }],
        // Best practices - warn but don't block
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        // SEO - warn but don't block
        'categories:seo': ['warn', { minScore: 0.8 }],
      },
    },
    upload: {
      // Free public storage for CI results
      // Results viewable via temporary URL in CI output
      target: 'temporary-public-storage',
    },
  },
};
