import { test } from '@playwright/test';
class ChatPageLocators {
    constructor(page) {
        this.page = page;
    }

    get messageField() {
        return this.page.getByRole('textbox', { name: 'Message' });
    }

    get sendButton() {
        return this.page.getByRole('button', { name: 'Send' });
    }

    get notNowButton() {
        return this.page.getByRole('button', { name: 'Not Now' })
    }


}
export default ChatPageLocators;