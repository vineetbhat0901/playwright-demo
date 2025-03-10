import BasePageFunctions from "../BasePageFunctions";
import SearchComponentLocators from "./SearchComponentLocators";


class SearchComponentFunctions extends BasePageFunctions{
    constructor(page) {
        super(page);
        this.searchComponentLocators = new SearchComponentLocators(page);
    }

    async enterProfile() {
        await this.searchComponentLocators.searchField.fill('vineetbhat__');
    }

    async clickOnProfileLink() {
        await this.searchComponentLocators.profileLink.click();
    }

}
export default SearchComponentFunctions;