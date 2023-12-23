import { test, expect } from '@playwright/test';

test('task 2', async ({ page }) => {

  //OPEN WEBSITE
  await page.goto('https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/demo');
  await expect(page.locator('.dcp-loader--hide')).toHaveCSS('opacity', '0', {timeout: 40000});
  await page.getByRole('button', { name: 'Agree to all' }).click();
  await expect(page.getByRole('button', { name: 'Agree to all' })).not.toBeVisible();

  //FILL THE FORM
  await page.getByText('* Your state').selectOption('New South Wales');
  await page.getByText('* Postal Code').fill('2007');
  await page.getByText('Private').first().check();
  await page.getByRole('button', { name:'Continue'}).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();

  //VEHICLES LIST
  await page.locator('.filter-toggle').click();
  await expect(page.locator('span.close-button.show')).toHaveCSS('display', 'block', {timeout: 40000});
  await page.getByRole('button', {name: 'Pre-Owned'}).click();
  await expect(page.locator('.dcp-loader--hide')).toHaveCSS('opacity', '0', {timeout: 40000});

  if( await page.locator('span.close-button.show').isVisible()){
    await page.getByText('Colour').first().click();
  }
  else {
    await page.locator('.filter-toggle').click();
    await page.getByText('Colour').first().click();
  }

  await page.getByText('Colour 0').click();
  await page.getByText('polar silver metallic', {exact: true}).click();
  await expect(page.locator('.dcp-loader--hide')).toHaveCSS('opacity', '0', {timeout: 40000});

  //SELECT EXPENSIVE CAR
  await page.getByLabel('Sorting').selectOption('Price (descending)');
  await expect(page.locator('.dcp-loader--hide')).toHaveCSS('opacity', '0', {timeout: 40000});
  //await page.locator('.dcp-cars-product-tile__model').first().textContent();
  await page.locator('.dcp-cars-product-tile__link').first().click();
  
  //VEIHCLE DETAIL
  
  //ESCREVER NO FICHEIRO

  await expect(page.locator('.dcp-pdp')).toBeAttached( {timeout: 50000} );
  await page.getByTestId('dcp-buy-box__contact-seller').click();
  await expect(page.locator('.dcp-loader--hide')).toHaveCSS('opacity', '0', {timeout: 40000});

  //CONTACT FORM
  await page.getByLabel('First Name').fill('Andreia');
  await page.getByLabel('Last Name').fill('Sanz');
  await page.getByLabel('E-Mail').fill('andreiasanz.gmail.com');
  await page.getByLabel('Phone').first().fill('0441234567');
  await page.getByLabel('Postal Code').fill('2007');
  await page.locator('wb-checkbox-control.hydrated > label > wb-icon').first().click();
  await page.getByTestId('dcp-rfq-contact-button-container__button-next').click();
  await expect(page.locator('.dcp-error-message__error-hint')).toHaveText('An error has occurred.Please check the following sections:');
});
