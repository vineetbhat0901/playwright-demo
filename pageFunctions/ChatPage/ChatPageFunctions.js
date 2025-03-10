import { expect } from "playwright/test";
import BasePageFunctions from "../BasePageFunctions";
import ChatPageLocators from "./ChatPageLocators";

class ChatPageFunctions extends BasePageFunctions {
    constructor(page) {
        super(page);
        this.chatPageLocators = new ChatPageLocators(page);
    }

    async clickOnNotNowButton() {
        await this.chatPageLocators.notNowButton.click();
    }

    async enterMessage(message) {
        await this.chatPageLocators.messageField.click();
        await this.chatPageLocators.messageField.fill(message);
    }

    async clickOnSendButton() {
        await this.chatPageLocators.sendButton.click();
        await this.page.waitForTimeout(3000);
    }

    async sendMessage(message) {
        await this.clickOnNotNowButton();
        await this.enterMessage(message);
        await this.clickOnSendButton();
    }

    async validateMessageSent(){
        const message = await this.chatPageLocators.messageField.textContent();
        expect(message).toBe('');
    }

}
export default ChatPageFunctions;

