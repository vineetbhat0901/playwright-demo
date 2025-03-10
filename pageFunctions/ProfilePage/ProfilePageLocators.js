import { test } from '@playwright/test';
class ProfilePageLocators {
    constructor(page) {
        this.page = page;
    }

    get messageButton() {
        return this.page.getByRole('button', { name: 'Message' });
    }

}
export default ProfilePageLocators;