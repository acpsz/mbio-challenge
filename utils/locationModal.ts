import { expect, type Locator, type Page } from '@playwright/test';

export class LocationModal {
    readonly page: Page;
  
    constructor(page: Page) {
        this.page = page;
    }

    //locators

    state(option: string) {
        return this.page.getByText('* Your state').selectOption(option);
    }

    postalCode(postalcode: string) {
        return this.page.getByText('* Postal Code').fill(postalcode);
    }

    checkbox(checkbox: string) {
        return this.page.getByText(checkbox);
    }

    continueButton() {
        return this.page.getByRole('button', { name:'Continue'});
    }

    modal() {
        return this.page.getByRole('dialog');
    }

    //methods

    async fillLocationModal() {
        await this.state('New South Wales');
        await this.postalCode('2007');
        await this.checkbox('Private').first().check();
        await this.continueButton().click();
        await expect(this.modal()).not.toBeVisible();
    }

}