import { expect, type Locator, type Page } from '@playwright/test';

export class MainPage {
    readonly page: Page;
  
    constructor(page: Page) {
        this.page = page;
    }

    //locators

    loading() {
        return this.page.locator('.dcp-loader--hide');
    }

    agreeButton() {
        return this.page.getByRole('button', { name: 'Agree to all' });
    }

    //methods

    async goTo() {
        await this.page.goto('https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/demo');
        await expect(this.loading()).toHaveCSS('opacity', '0', {timeout: 40000});
        await this.agreeButton().click();
        await expect(this.agreeButton()).not.toBeVisible();
    }



}