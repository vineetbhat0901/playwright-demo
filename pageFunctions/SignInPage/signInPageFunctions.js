import BasePageFunctions from '../BasePageFunctions';
import SignInPageLocators from '../SignInPage/signInPageLocators';
import dotenv from 'dotenv';
dotenv.config();


class SignInPageFunctions extends BasePageFunctions {
    constructor(page) {
        super(page);
        this.signInPageLocators = new SignInPageLocators(page);
    }

    async enterUserName(username) {
        await this.signInPageLocators.userNameField.click();
        await this.signInPageLocators.userNameField.fill(username);
    }

    async enterPassword(password) {
        await this.signInPageLocators.passwordField.click();
        await this.signInPageLocators.passwordField.fill(password);
    }

    async clickSignInButton() {
        await this.signInPageLocators.passwordField.press('Enter');
    }

    async signIn() {
        await this.enterUserName(process.env.USERNAME);
        await this.enterPassword(process.env.PASSWORD);
        await this.clickSignInButton();
    }

}
export default SignInPageFunctions;