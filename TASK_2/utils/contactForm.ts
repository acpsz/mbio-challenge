import { expect, type Page } from '@playwright/test';

export class ContactForm {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //locators

    fillTextFields(label: string, value: string) {
        return this.page.getByLabel(label).first().fill(value);
    }

    privacyCheckbox() {
        return this.page.locator('wb-checkbox-control.hydrated > label > wb-icon').first();
    }

    proceedButton() {
        return this.page.getByTestId('dcp-rfq-contact-button-container__button-next');
    }

    generalErrorMessage() {
        return this.page.locator('.dcp-error-message__error-hint');
    }

    emailErrorMessage() {
        return this.page.getByTestId('rfq-contact__email').locator('wb-control-error.hydrated');
    }

    //methods

    async fillFormAndProceed() {
        await this.fillTextFields('First Name', 'Andreia');
        await this.fillTextFields('Last Name', 'Sanz');
        await this.fillTextFields('E-Mail', 'andreiasanz.gmail.com');
        await this.fillTextFields('Phone', '0441234567');
        await this.fillTextFields('Postal Code', '2007');
        await this.privacyCheckbox().click();
        await this.proceedButton().click();
        await expect(this.emailErrorMessage()).toHaveText('Please enter a valid email address using a minimum of six characters.');
        await expect(this.generalErrorMessage()).toHaveText('An error has occurred.Please check the following sections:');
    }

}