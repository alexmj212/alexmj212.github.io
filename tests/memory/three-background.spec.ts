import { test, expect } from '@playwright/test';

/**
 * Memory leak prevention test for ThreeBackground component
 *
 * Verifies that after comprehensive disposal fixes:
 * - Heap growth is <1MB after 10 lifecycle events (5 refreshes + 5 dialog cycles)
 * - Previous manual test showed 46.6 MB growth before fixes
 *
 * This automated test replaces manual Chrome DevTools heap snapshot workflow
 * and enables regression prevention in CI/CD.
 */
test.describe('ThreeBackground Memory Leak Prevention', () => {
  test('heap growth <1MB after 10 lifecycle events', async ({ page, context }) => {
    console.log('\n=== Memory Leak Test Starting ===\n');

    // Navigate to page and wait for initial load
    await page.goto('/');
    console.log('Page loaded, waiting for Three.js initialization...');
    await page.waitForTimeout(3000); // Allow Three.js to fully initialize

    // Establish Chrome DevTools Protocol connection for heap profiling
    const client = await context.newCDPSession(page);
    await client.send('HeapProfiler.enable');

    // Force garbage collection to establish clean baseline
    console.log('Taking baseline measurement...');
    await client.send('HeapProfiler.collectGarbage');
    await page.waitForTimeout(1000);

    const baselineHeap = await client.send('Runtime.getHeapUsage');
    const baselineSize = baselineHeap.usedSize;
    console.log(`Baseline heap: ${(baselineSize / (1024 * 1024)).toFixed(2)} MB`);

    // === Lifecycle Event 1-5: Full page refresh cycles ===
    console.log('\nPerforming 5 page refresh cycles...');
    for (let i = 1; i <= 5; i++) {
      console.log(`  Refresh cycle ${i}/5`);
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForTimeout(1500); // Allow cleanup and re-initialization
    }

    // === Lifecycle Event 6-10: Portfolio dialog open/close cycles ===
    console.log('\nPerforming 5 portfolio dialog cycles...');
    for (let i = 1; i <= 5; i++) {
      console.log(`  Dialog cycle ${i}/5`);

      // Find and click first portfolio card
      const portfolioCard = page.locator('[class*="portfolio-card"]').first();
      const isVisible = await portfolioCard.isVisible().catch(() => false);

      if (isVisible) {
        await portfolioCard.click();
        await page.waitForTimeout(800); // Wait for dialog animation

        // Close dialog via ESC key
        await page.keyboard.press('Escape');
        await page.waitForTimeout(800); // Wait for dialog close animation
      } else {
        console.log(`    Warning: Portfolio card not found in cycle ${i}`);
      }
    }

    // Force garbage collection and measure final heap
    console.log('\nForcing garbage collection...');
    await client.send('HeapProfiler.collectGarbage');
    await page.waitForTimeout(2000); // Allow GC to complete

    const finalHeap = await client.send('Runtime.getHeapUsage');
    const finalSize = finalHeap.usedSize;
    const heapGrowth = (finalSize - baselineSize) / (1024 * 1024); // Convert to MB

    console.log(`\n=== Memory Test Results ===`);
    console.log(`Baseline heap: ${(baselineSize / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Final heap:    ${(finalSize / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Heap growth:   ${heapGrowth.toFixed(2)} MB`);
    console.log(`Threshold:     1.00 MB`);
    console.log(`Status:        ${heapGrowth < 1.0 ? 'PASS ✓' : 'FAIL ✗'}`);
    console.log('===========================\n');

    // Assert <1MB growth (success criteria from Plan 01-06)
    expect(heapGrowth).toBeLessThan(1.0);
  });
});
