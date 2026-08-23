import { test as base } from '@playwright/test';
import { HomePage } from '../../Pages/HomePage';
import { LoginPage } from '../../Pages/LoginPage';
import { BasicFormPage } from '../../Pages/BasicFormPage';
import { ButtonInteractionsPage } from '../../Pages/ButtonInteractionsPage';
import { CheckboxesRadiosPage } from '../../Pages/CheckboxesRadiosPage';
import { AlertsPage } from '../../Pages/AlertsPage';

// Define custom fixture types
type CustomFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    basicFormPage: BasicFormPage;
    buttonInteractionsPage: ButtonInteractionsPage;
    checkboxesRadiosPage: CheckboxesRadiosPage;
    alertsPage: AlertsPage;
};

export const test = base.extend<CustomFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    basicFormPage: async ({ page }, use) => {
        const basicFormPage = new BasicFormPage(page);
        await use(basicFormPage);
    },
    buttonInteractionsPage: async ({ page }, use) => {
        const buttonInteractionsPage = new ButtonInteractionsPage(page);
        await use(buttonInteractionsPage);
    },
    checkboxesRadiosPage: async ({ page }, use) => {
        const checkboxesRadiosPage = new CheckboxesRadiosPage(page);
        await use(checkboxesRadiosPage);
    },
    alertsPage: async ({ page }, use) => {
        const alertsPage = new AlertsPage(page);
        await use(alertsPage);
    },
});

export { expect } from '@playwright/test';
