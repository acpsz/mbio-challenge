import { expect, type Locator, type Page } from '@playwright/test';
import { Common } from './common';

export class ContactForm {
    readonly page: Page;
    readonly common: Common;
  
    constructor(page: Page) {
        this.page = page;
    }

    //locators

    fillTextFields(label: string, value: string) {
        return this.page.getByLabel(label).fill(value);
    }

    privacyCheckbox() {
        return this.page.locator('wb-checkbox-control.hydrated > label > wb-icon').first();
    }

    proceedButton() {
        return this.page.getByTestId('dcp-rfq-contact-button-container__button-next');
    }

    generalMessageError() {
        return this.page.locator('.dcp-error-message__error-hint');
    }

    //methods

    async fillFormAndProceed() {
        await this.fillTextFields('First Name','Andreia');
        await this.fillTextFields('Last Name','Sanz');
        await this.fillTextFields('E-Mail','andreiasanz.gmail.com');
        await this.fillTextFields('Phone','0441234567');
        await this.fillTextFields('Postal Code','2007');
        await this.privacyCheckbox().click();
        await this.proceedButton().click();
        await expect(this.generalMessageError()).toHaveText('An error has occurred.Please check the following sections:');
    }

}