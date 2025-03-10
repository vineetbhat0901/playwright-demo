
class SearchComponentLocators {
    constructor(page) {
        this.page = page;
    }

    get searchField() {
        return this.page.getByRole('textbox', { name: 'Search input' })
    }

    get profileLink() {
        return this.page.getByRole('link', { name: 'vineetbhat__\'s profile picture vineetbhat__ 𝗩𝗜𝗡𝗘𝗘𝗧 𝗕𝗛𝗔𝗧' });
    }
}
export default SearchComponentLocators;