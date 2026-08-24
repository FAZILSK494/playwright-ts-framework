import { test as base } from '@playwright/test';
import { HomePage } from '../../Pages/HomePage';
import { LoginPage } from '../../Pages/LoginPage';
import { BasicFormPage } from '../../Pages/BasicFormPage';
import { ButtonInteractionsPage } from '../../Pages/ButtonInteractionsPage';
import { CheckboxesRadiosPage } from '../../Pages/CheckboxesRadiosPage';
import { AlertsPage } from '../../Pages/AlertsPage';
import { ModalsPage } from '../../Pages/ModalsPage';

// Batch 1
import { DropdownsPage } from '../../Pages/DropdownsPage';
import { LocatorPracticePage } from '../../Pages/LocatorPracticePage';
import { TablePage } from '../../Pages/TablePage';
import { KeyboardActionsPage } from '../../Pages/KeyboardActionsPage';
import { SliderPage } from '../../Pages/SliderPage';
import { DatePickerPage } from '../../Pages/DatePickerPage';

// Batch 2
import { IFramePage } from '../../Pages/IFramePage';
import { ShadowDomPage } from '../../Pages/ShadowDomPage';
import { DragDropPage } from '../../Pages/DragDropPage';
import { HoverMenuPage } from '../../Pages/HoverMenuPage';
import { TooltipPage } from '../../Pages/TooltipPage';
import { ResizablePage } from '../../Pages/ResizablePage';
import { ComplexDomPage } from '../../Pages/ComplexDomPage';

// Batch 3
import { DynamicContentPage } from '../../Pages/DynamicContentPage';
import { WaitsSyncPage } from '../../Pages/WaitsSyncPage';
import { HiddenElementsPage } from '../../Pages/HiddenElementsPage';
import { StaleElementPage } from '../../Pages/StaleElementPage';
import { DynamicListPage } from '../../Pages/DynamicListPage';
import { NetworkDelayPage } from '../../Pages/NetworkDelayPage';
import { FlakyElementsPage } from '../../Pages/FlakyElementsPage';

// Batch 4
import { FileUploadPage } from '../../Pages/FileUploadPage';
import { DownloadPage } from '../../Pages/DownloadPage';
import { ScrollTestingPage } from '../../Pages/ScrollTestingPage';
import { MultipleWindowsPage } from '../../Pages/MultipleWindowsPage';

// Define custom fixture types
type CustomFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    basicFormPage: BasicFormPage;
    buttonInteractionsPage: ButtonInteractionsPage;
    checkboxesRadiosPage: CheckboxesRadiosPage;
    alertsPage: AlertsPage;
    modalsPage: ModalsPage;
    dropdownsPage: DropdownsPage;
    locatorPracticePage: LocatorPracticePage;
    tablePage: TablePage;
    keyboardActionsPage: KeyboardActionsPage;
    sliderPage: SliderPage;
    datePickerPage: DatePickerPage;
    iframePage: IFramePage;
    shadowDomPage: ShadowDomPage;
    dragDropPage: DragDropPage;
    hoverMenuPage: HoverMenuPage;
    tooltipPage: TooltipPage;
    resizablePage: ResizablePage;
    complexDomPage: ComplexDomPage;
    dynamicContentPage: DynamicContentPage;
    waitsSyncPage: WaitsSyncPage;
    hiddenElementsPage: HiddenElementsPage;
    staleElementPage: StaleElementPage;
    dynamicListPage: DynamicListPage;
    networkDelayPage: NetworkDelayPage;
    flakyElementsPage: FlakyElementsPage;
    fileUploadPage: FileUploadPage;
    downloadPage: DownloadPage;
    scrollTestingPage: ScrollTestingPage;
    multipleWindowsPage: MultipleWindowsPage;
};

export const test = base.extend<CustomFixtures>({
    homePage: async ({ page }, use) => { await use(new HomePage(page)); },
    loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
    basicFormPage: async ({ page }, use) => { await use(new BasicFormPage(page)); },
    buttonInteractionsPage: async ({ page }, use) => { await use(new ButtonInteractionsPage(page)); },
    checkboxesRadiosPage: async ({ page }, use) => { await use(new CheckboxesRadiosPage(page)); },
    alertsPage: async ({ page }, use) => { await use(new AlertsPage(page)); },
    modalsPage: async ({ page }, use) => { await use(new ModalsPage(page)); },
    dropdownsPage: async ({ page }, use) => { await use(new DropdownsPage(page)); },
    locatorPracticePage: async ({ page }, use) => { await use(new LocatorPracticePage(page)); },
    tablePage: async ({ page }, use) => { await use(new TablePage(page)); },
    keyboardActionsPage: async ({ page }, use) => { await use(new KeyboardActionsPage(page)); },
    sliderPage: async ({ page }, use) => { await use(new SliderPage(page)); },
    datePickerPage: async ({ page }, use) => { await use(new DatePickerPage(page)); },
    iframePage: async ({ page }, use) => { await use(new IFramePage(page)); },
    shadowDomPage: async ({ page }, use) => { await use(new ShadowDomPage(page)); },
    dragDropPage: async ({ page }, use) => { await use(new DragDropPage(page)); },
    hoverMenuPage: async ({ page }, use) => { await use(new HoverMenuPage(page)); },
    tooltipPage: async ({ page }, use) => { await use(new TooltipPage(page)); },
    resizablePage: async ({ page }, use) => { await use(new ResizablePage(page)); },
    complexDomPage: async ({ page }, use) => { await use(new ComplexDomPage(page)); },
    dynamicContentPage: async ({ page }, use) => { await use(new DynamicContentPage(page)); },
    waitsSyncPage: async ({ page }, use) => { await use(new WaitsSyncPage(page)); },
    hiddenElementsPage: async ({ page }, use) => { await use(new HiddenElementsPage(page)); },
    staleElementPage: async ({ page }, use) => { await use(new StaleElementPage(page)); },
    dynamicListPage: async ({ page }, use) => { await use(new DynamicListPage(page)); },
    networkDelayPage: async ({ page }, use) => { await use(new NetworkDelayPage(page)); },
    flakyElementsPage: async ({ page }, use) => { await use(new FlakyElementsPage(page)); },
    fileUploadPage: async ({ page }, use) => { await use(new FileUploadPage(page)); },
    downloadPage: async ({ page }, use) => { await use(new DownloadPage(page)); },
    scrollTestingPage: async ({ page }, use) => { await use(new ScrollTestingPage(page)); },
    multipleWindowsPage: async ({ page }, use) => { await use(new MultipleWindowsPage(page)); },
});

export { expect } from '@playwright/test';
