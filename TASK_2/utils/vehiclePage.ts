import { expect, type Page } from '@playwright/test';
import { Common } from './common';
import { VehiclesList } from './vehiclesList';

import fs from 'fs';

export class VehiclePage {
    readonly page: Page;
    readonly common: Common;
    readonly vehiclesList: VehiclesList;

    constructor(page: Page) {
        this.page = page;
        this.common = new Common(page);
        this.vehiclesList = new VehiclesList(page);
    }

    //locators

    vehiclePage() {
        return this.page.locator('.dcp-pdp');
    }

    enquireNowButton() {
        return this.page.getByTestId('dcp-buy-box__contact-seller');
    }

    vinNumber() {
        const parentDiv = this.page.locator('data-test-id=dcp-vehicle-details-list-item-11');
        return parentDiv.locator('.dcp-vehicle-details-list-item__value');
    }

    modelYear() {
        return this.page.getByTestId('dcp-vehicle-details-list-item-2');
    }

    //methods

    async enquireNow() {
        await expect(this.vehiclePage()).toBeAttached({ timeout: 40000 });
        await this.enquireNowButton().click();
        await this.common.waitForLoading();
    }

    async exportData() {
        const vinNumber = await this.page.getByTestId('dcp-vehicle-details-list-item-11').textContent();
        const modelYear = await this.page.getByTestId('dcp-vehicle-details-list-item-3').textContent();

        const concat = `${vinNumber}\n\n${modelYear}`;

        fs.writeFileSync('export.csv', concat);
    }

}