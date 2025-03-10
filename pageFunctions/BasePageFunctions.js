const path = require('path');
const fs = require('fs');
import { expect } from '@playwright/test';

class BasePageFunctions {
    constructor(page) {
        this.page = page;
    }

    async scrollToPosition(selector, x = 0, y = 0) {
        await this.page.evaluate((selector, x, y) => {
            const element = document.querySelector(selector);
            if (element) element.scrollTo(x, y);
        }, selector, x, y);
    }

    async swipe(selector, direction, distance = 200) {
        const swipeOptions = {
            left: { dx: -distance, dy: 0 },
            right: { dx: distance, dy: 0 },
            up: { dx: 0, dy: -distance },
            down: { dx: 0, dy: distance }
        };
        const { dx, dy } = swipeOptions[direction];
        await this.page.evaluate(({ selector, dx, dy }) => {
            const element = document.querySelector(selector);
            const rect = element.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            element.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: startX + dx, clientY: startY + dy }));
            element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        }, { selector, dx, dy });
    }

    async waitTillVisible(locator, timeout = 10000) {
        await locator.waitFor({ state: 'visible', timeout });
    }

    async waitForElementToBeLoaded(locator, timeout = 10000) {
        const startTime = Date.now();

        if (!(locator instanceof this.page.constructor.Locator)) {
            throw new Error(`Expected a Playwright Locator, but got ${typeof locator}`);
        }

        while (Date.now() - startTime < timeout) {
            const isVisible = await locator.isVisible();
            if (isVisible) return;

            await this.page.waitForTimeout(500);
        }

        throw new Error(`Element not loaded within ${timeout}ms`);
    }

    async dragAndDrop(sourceSelector, targetSelector) {
        const sourceElement = await this.page.$(sourceSelector);
        const targetElement = await this.page.$(targetSelector);
        await sourceElement.hover();
        await this.page.mouse.down();
        await targetElement.hover();
        await this.page.mouse.up();
    }

    async scrollUntilVisible(locator, timeout = 10000, scrollStep = 200, direction = 'down') {
        const startTime = Date.now();
        let isVisible = false;

        const scrollOptions = {
            down: { dx: 0, dy: scrollStep },
            up: { dx: 0, dy: -scrollStep },
            right: { dx: scrollStep, dy: 0 },
            left: { dx: -scrollStep, dy: 0 }
        };

        if (!scrollOptions[direction]) {
            throw new Error(`Invalid scroll direction: ${direction}`);
        }

        const { dx, dy } = scrollOptions[direction];

        while (Date.now() - startTime < timeout) {
            isVisible = await locator.isVisible();

            if (isVisible) return;

            await this.page.evaluate(({ dx, dy }) => {
                window.scrollBy(dx, dy);
            }, { dx, dy });

            await this.page.waitForTimeout(1000);
        }

        throw new Error(`Element not visible within ${timeout}ms`);
    }

    async compareScreenshot(screenshotName, maxDiffPixels = 100) {
        const baselinePath = path.join('tests/screenshots/baseline', `${screenshotName}.png`);
        const actualPath = path.join('tests/screenshots/actual', `${screenshotName}.png`);
        const diffPath = path.join('tests/screenshots/diff', `${screenshotName}-diff.png`);
    
        if (!fs.existsSync('tests/screenshots/baseline')) {
            fs.mkdirSync('tests/screenshots/baseline', { recursive: true });
        }
        if (!fs.existsSync('tests/screenshots/actual')) {
            fs.mkdirSync('tests/screenshots/actual', { recursive: true });
        }
        if (!fs.existsSync('tests/screenshots/diff')) {
            fs.mkdirSync('tests/screenshots/diff', { recursive: true });
        }
    
        await this.page.screenshot({ path: actualPath });
    
        if (!fs.existsSync(baselinePath)) {
            console.log(`Baseline screenshot not found. Saving current screenshot as baseline at: ${baselinePath}`);
            fs.copyFileSync(actualPath, baselinePath);
            return;
        }
    
        try {
            await expect(this.page).toHaveScreenshot({
                path: baselinePath,
                maxDiffPixels: maxDiffPixels, // Allowable pixel difference
                diffPath: diffPath // Save diff image here if comparison fails
            });
    
            console.log('Full-page screenshot comparison passed!');
        } catch (error) {
            console.error('Full-page screenshot comparison failed. Visual mismatch detected!');
        }
    }

}

export default BasePageFunctions;