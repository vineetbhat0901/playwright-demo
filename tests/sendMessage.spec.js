import { test, expect } from '@playwright/test';
import SignInPageFunctions from '../pageFunctions/SignInPage/signInPageFunctions';
import HomePageFunctions from '../pageFunctions/HomePage/HomePageFunctions';
import ProfilePageFunctions from '../pageFunctions/ProfilePage/ProfilePageFunctions';
import ChatPageFunctions from '../pageFunctions/ChatPage/ChatPageFunctions';
import testData from "../testData/testData.json";

test.describe('e2e Send Message', () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('/');
    });

    test('Verify send message to searched profile', async ({ page }) => {
        const signInPageFunctions = new SignInPageFunctions(page);
        const homePageFunctions = new HomePageFunctions(page);
        const profilePageFunctions = new ProfilePageFunctions(page);
        const chatPageFunctions = new ChatPageFunctions(page);

        await signInPageFunctions.signIn();
        expect(await page.title()).toBe(testData.pageTitle);
        
        await homePageFunctions.enterProfile();
        await profilePageFunctions.clickOnMessageButton();
        await chatPageFunctions.sendMessage(testData.message);
        await chatPageFunctions.validateMessageSent();
    });
});
