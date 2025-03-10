import { test } from '@playwright/test';
class HomePageLocators {
    constructor(page) {
        this.page = page;
    }

    get searchButton() {
        return this.page.getByRole('link', { name: 'Search' });
    }

}
export default HomePageLocators;