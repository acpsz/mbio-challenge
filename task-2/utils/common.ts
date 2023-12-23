import { expect, type Locator, type Page } from '@playwright/test';

export class Common {
    readonly page: Page;
  
    constructor(page: Page) {
        this.page = page;
    }

    loading() {
        return this.page.locator('.dcp-loader--hide');
    }

    async waitForLoading() {
        await expect(this.loading()).toHaveCSS('opacity', '0', {timeout: 40000});
    }

}