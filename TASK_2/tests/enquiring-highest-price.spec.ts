import { test } from '@playwright/test';
import { Common } from '../utils/common';
import { ContactForm } from '../utils/contactForm';
import { LocationModal } from '../utils/locationModal';
import { MainPage } from '../utils/mainPage';
import { VehiclePage } from '../utils/vehiclePage';
import { VehiclesList } from '../utils/vehiclesList';

let mainPage: MainPage;
let locationModal: LocationModal;
let vehiclesList: VehiclesList;
let vehiclePage: VehiclePage;
let contactForm: ContactForm;
let common: Common;

test('task 2', async ({ page }) => {
  mainPage = new MainPage(page);
  locationModal = new LocationModal(page);
  vehiclesList = new VehiclesList(page);
  vehiclePage = new VehiclePage(page);
  contactForm = new ContactForm(page);
  common = new Common(page);

  await mainPage.goTo();

  await mainPage.acceptCookies();

  await locationModal.fillLocationModal();

  await vehiclesList.openFilters('Pre-Owned');

  await vehiclesList.filterByColor('polar silver metallic');

  await vehiclesList.applySort('Price (descending)');

  await vehiclesList.selectVehicle();

  await vehiclePage.exportData();

  await vehiclePage.enquireNow();

  await contactForm.fillFormAndProceed();
});
