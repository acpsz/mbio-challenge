import { expect, type Page } from '@playwright/test';
import { Common } from './common';

export class MainPage {
    readonly page: Page;
    readonly common: Common;

    constructor(page: Page) {
        this.page = page;
        this.common = new Common(page);
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
        await this.common.waitForLoading();
    }

    async acceptCookies() {
        await this.agreeButton().click();
        await expect(this.agreeButton()).not.toBeVisible();
    }



}