import BasePageFunctions from "../BasePageFunctions";
import SearchComponentLocators from "./SearchComponentLocators";
import testData from '../../testData/testData.json'

class SearchComponentFunctions extends BasePageFunctions{
    constructor(page) {
        super(page);
        this.searchComponentLocators = new SearchComponentLocators(page);
    }

    async enterProfile() {
        await this.searchComponentLocators.searchField.fill(testData.recipientProfile);
    }

    async clickOnProfileLink() {
        await this.searchComponentLocators.profileLink.click();
    }

}
export default SearchComponentFunctions;