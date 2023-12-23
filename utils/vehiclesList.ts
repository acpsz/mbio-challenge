import { expect, type Locator, type Page } from '@playwright/test';
import { Common } from '../utils/common';

export class VehiclesList {
    readonly page: Page;
    readonly common: Common;
  
    constructor(page: Page) {
        this.page = page;
    }

    //locators

    filterButton() {
        return this.page.locator('.filter-toggle');
    }

    closeButton() {
        return this.page.locator('span.close-button.show');
    }

    filtersTabs(tabName: string) {
        return this.page.getByRole('button', {name: tabName});
    }

    colourFilter(colourFilter: string) {
        return this.page.getByText(colourFilter);
    }

    colourDropdown(colourDropdown: string) {
        return this.page.getByText(colourDropdown);
    }

    colourName(colourName: string) {
        return this.page.getByText(colourName, {exact: true});
    }

    sortBy(sortoption: string) {
        return this.page.getByLabel('Sorting').selectOption(sortoption);
    }

    product() {
        return this.page.locator('.dcp-cars-product-tile__link');
    }

    //methods

    async openFilters(tabName: string) {
        await this.filterButton().click();
        await expect(this.closeButton()).toHaveCSS('display', 'block', {timeout: 40000});
        await this.filtersTabs(tabName).click();
        await expect(this.common.loading()).toHaveCSS('opacity', '0', {timeout: 40000});
    }

    async filterByColor(colourName: string) {
        if( await this.closeButton().isVisible()){
            await this.colourFilter('Colour').first().click();
        }
        else {
            await this.filterButton().click();
            await this.colourFilter('Colour').first().click();
        }
        await this.colourDropdown('Colour 0').click();
        await this.colourName(colourName).click();
        await expect(this.common.loading()).toHaveCSS('opacity', '0', {timeout: 40000});
    }

    async sortByAndSelectProduct(sortoption: string) {
        await this.sortBy(sortoption);
        await expect(this.common.loading()).toHaveCSS('opacity', '0', {timeout: 40000});
        //const model = await page.locator('.dcp-cars-product-tile__model').first().textContent();
        await this.product().first().click();
    }

}