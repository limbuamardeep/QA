import {test, expect} from '@playwright/test';
import {LoginPage} from '../page_object/login.po.js';
const testData = require('../fixtures/loginFixture.json');

test.beforeEach(async ({ page }) => {
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
});
test.describe('Valid login tests', () => {
    test('Login using valid credentials', async ({ page }) => {

        const login= new LoginPage(page);
        await login.login(testData.validUser.id,testData.validUser.password);
        await login.verifyValidLogin();
    });
    
});
test.describe('Invalid login tests',()=>{
    test("Login using invalid credentials",async({page})=>{
        const login=new LoginPage(page);
        await login.login(testData.invalidUser.id,testData.invalidUser.password);
        await login.verifyInvalidLogin();
    })
})
