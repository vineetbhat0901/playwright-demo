import BasePageFunctions from '../BasePageFunctions';
import ProfilePageLocators from './ProfilePageLocators';

class ProfilePageFunctions extends BasePageFunctions{
    constructor(page) {
        super(page);
        this.profilePageLocators = new ProfilePageLocators(page);
    }

    async clickOnMessageButton() {
        await this.profilePageLocators.messageButton.click();
    }

}
export default ProfilePageFunctions;