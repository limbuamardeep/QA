import {test,expect} from '@playwright/test';

// constructor for locator
exports.LoginPage = class LoginPage {
    constructor(page){
        this.page = page;
        this.usernameInput = "//input[@id='email']"
        this.passwordInput = "//input[@id='password']"
        this.loginButton = "//button[text()='Submit']"
        this.logOut = "//button[@id='logout']"
        this.loginValidation = "//p[text()='Click on any contact to view the Contact Details']"
        this.alertMessage = '//span[@id="error]';
    
    }
    async login(username,password){
        await this.page.locator(this.usernameInput).fill(username)
        await this.page.locator(this.passwordInput).fill(password)
        await this.page.locator(this.loginButton).click()
    }
    async verifyValidLogin(){
        const loginValidation = await this.page.locator(this.loginValidation);
        await this.page.waitForTimeout(2000);
        expect(this.logOut).toBeVisible;
        await expect(loginValidation).toHaveText("Click on any contact to view the Contact Details");
    }
}