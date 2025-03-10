import BasePageFunctions from "../BasePageFunctions";
import SearchComponentFunctions from "../CommonUtils/SearchComponentFunctions";
import HomePageLocators from "./HomePageLocators";


class HomePageFunctions extends BasePageFunctions{
    constructor(page) {
        super(page);
        this.homePageLocators = new HomePageLocators(page);
        this.searchComponentFunctions = new SearchComponentFunctions(page);
    }

    async clickOnSearchButton() {
        await this.homePageLocators.searchButton.click();
    }

    async enterProfile() {
        await this.clickOnSearchButton();
        await this.searchComponentFunctions.enterProfile();
        await this.searchComponentFunctions.clickOnProfileLink();
    }

}
export default HomePageFunctions;

