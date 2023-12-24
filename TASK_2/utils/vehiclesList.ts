import { type Page } from '@playwright/test';
import { Common } from './common';

export class VehiclesList {
    readonly page: Page;
    readonly common: Common;

    constructor(page: Page) {
        this.page = page;
        this.common = new Common(page);
    }

    //locators

    filterButton() {
        return this.page.locator('.filter-toggle');
    }

    sideBar() {
        return this.page.locator('.wrapper.show');
    }

    filtersTabs(tabName: string) {
        return this.page.getByRole('button', { name: tabName });
    }

    colourFilter(colourFilter: string) {
        return this.page.getByText(colourFilter);
    }

    colourDropdown(colourDropdown: string) {
        return this.page.getByText(colourDropdown);
    }

    colourName(colourName: string) {
        return this.page.getByText(colourName, { exact: true });
    }

    sortBy(sortoption: string) {
        return this.page.getByLabel('Sorting').selectOption(sortoption);
    }

    product() {
        return this.page.locator('.dcp-cars-product-tile__link');
    }

    //methods

    async openFilters(tabName: string) {
        let sidebarWrapperEle = this.sideBar();
        //wait for sidebar to hide
        await sidebarWrapperEle.waitFor({ state: "hidden", timeout: 10000 });

        //open sidebar
        await this.filterButton().click();

        sidebarWrapperEle = this.sideBar();
        //wait for sidebar to open again
        await sidebarWrapperEle.waitFor({ state: "visible", timeout: 10000 });

        await this.filtersTabs(tabName).click();
        await this.common.waitForLoading();
    }

    async filterByColor(colourName: string) {
        if (await this.sideBar().isVisible()) {
            await this.colourFilter('Colour').first().click();
        }
        else {
            await this.filterButton().click();
            await this.colourFilter('Colour').first().click();
        }
        await this.colourDropdown('Colour 0').click();
        await this.colourName(colourName).click();
        await this.common.waitForLoading();
    }

    async applySort(sortoption: string) {
        await this.sortBy(sortoption);
        await this.common.waitForLoading();
    }

    async selectVehicle() {
        await this.product().first().click();
        await this.common.waitForLoading();
    }

}