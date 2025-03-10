import { test } from '@playwright/test';
class SignInPageLocators {
    constructor(page) {
        this.page = page;
    }

    get userNameField() {
        return this.page.locator(`//input[@name='username']`);
    }

    get passwordField() {
        return this.page.getByRole('textbox', { name: 'Password' });
    }

    get signInButton() {
        return this.page.getByRole('button', { name: 'Log In' });
    }
}
export default SignInPageLocators;