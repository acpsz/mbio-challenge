import { expect, type Locator, type Page } from '@playwright/test';
import { Common } from './common';

export class VehiclePage {
    readonly page: Page;
    readonly common: Common;
  
    constructor(page: Page) {
        this.page = page;
    }

    //locators

    vehiclePage() {
        return this.page.locator('.dcp-pdp');
    }

    enquireNowButton() {
        return this.page.getByTestId('dcp-buy-box__contact-seller');
    }

    //methods

    async enquireNow() {
        await expect(this.vehiclePage()).toBeAttached( {timeout: 50000} );
        await this.enquireNowButton().click();
        await expect(this.common.loading()).toHaveCSS('opacity', '0', {timeout: 40000});
    }

}