import { test, expect } from '@playwright/test';
import { MainPage } from '../utils/mainPage';
import { LocationModal } from '../utils/locationModal';
import { VehiclesList } from '../utils/vehiclesList';
import { VehiclePage } from '../utils/vehiclePage';
import { ContactForm } from '../utils/contactForm';

let mainPage: MainPage;
let locationModal: LocationModal;
let vehiclesList: VehiclesList;
let vehiclePage: VehiclePage;
let contactForm: ContactForm;

test('task 2', async ({ page }) => {
  mainPage = new MainPage(page);
  locationModal = new LocationModal(page);
  vehiclesList = new VehiclesList(page);
  vehiclePage = new VehiclePage(page);
  contactForm = new ContactForm(page);

  await mainPage.goTo();

  await locationModal.fillLocationModal();

  await vehiclesList.openFilters('Pre-Owned');
  await vehiclesList.filterByColor('polar silver metallic');

  await vehiclesList.sortByAndSelectProduct('Price (descending)');
  
  //ESCREVER NO FICHEIRO

  await vehiclePage.enquireNow();

  await contactForm.fillFormAndProceed();
});
