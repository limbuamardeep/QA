const testData = require('../fixtures/contactFixture.json');
import { test } from '@playwright/test';
import { LoginPage} from '../page_object/login.po.js';
import {ContactPage} from '../page_object/contact.po.js'
const { authenticateUser, createEntity, getEntity, deleteEntity, validateEntity } = require('../utils/helper.spec.js');
let accessToken;
test.beforeEach(async ({page}) => {
    const login = new LoginPage(page); 
    await page.goto('/');
    await login.login(testData.validUser.id, testData.validUser.password);
    await login.verifyValidLogin();
});
test.describe('Contact Management Tests', () => {
    test('Add a new contact', async ({ page }) => {
        const contact = new ContactPage(page);
        await contact.addContact(testData.contact.firstName, testData.contact.lastName, testData.contact.phone, 
         testData.contact.street1, testData.contact.street2, testData.contact.city, testData.contact.state);
        await contact.viewContacts();
        await contact.verifyContactAdded(`${testData.contact.firstName} ${testData.contact.lastName}`); 
    });
    test.only("Contact Edit test", async ({ page,request }) => {
        const data={
            "firstName": "John",
            "lastName": "Doe",
            "birthdate": "1990-01-01",
            "email": "johndoe@gmail.com",
            "phone": "1234567890",
            "street1": "123 Main St",
            "street2": "Apt 4B",
            "city": "New York",
            "stateProvince": "NY",
            "zipCode": "10001", 
            "country": "USA",
        }
        const contact = new ContactPage(page);
        accessToken = await authenticateUser(testData.validUser.id, testData.validUser.password, { request });
        const contactId = await createEntity(data, accessToken, '/contacts', { request });
        await page.reload();
        await contact.viewContacts();
        await contact.contactEdit(testData.contactEdit.firstName);
        await deleteEntity(accessToken, '/contacts', contactId, { request });
        await validateEntity(accessToken, `/contacts/${contactId}`, '404', { request });
    });
});
test.describe("Contact testcases",() => {
    test("Contact Delete test", async ({ page, request }) => {
        const contact = new ContactPage(page);
        await contact.contactaDD(testData.contact.firstName, testData.contact.lastName, testData.contact.phone,
            testData.contact.street1, testData.contact.street2, testData.contact.city, testData.contact.state);
        await contact
        await contact.validateContact();
    });
});
class ContactPage {


    async contactDelete() {
        await this.page.waitForTimeout(2000);
        this.page.once('dialog', async dialog => {
            console.log("Dialog message: ", dialog.message());
            await dialog.accept();
        });
        await this.page.locator(this.deleteContact).click();
    }
}