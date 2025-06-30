import { expect } from "@playwright/test";

exports.ContactPage = class ContactPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('//input[@id="firstName"]');
    this.lastName = page.locator('//input[@id="lastName"]');
    this.dob = page.locator('//input[@id="birthdate"]');
    this.email = page.locator('//input[@id="email"]');
    this.phone = page.locator('//input[@id="phone"]');
    this.address1 = page.locator('//input[@id="street1"]');
    this.address2 = page.locator('//input[@id="street2"]');
    this.city = page.locator('//input[@id="city"]');
    this.province = page.locator('//input[@id="stateProvince"]');
    this.postalCode = page.locator('//input[@id="postalCode"]');
    this.country = page.locator('//input[@id="country"]');
    this.signInButton = page.locator('//button[@id="submit"]');
    this.errorMessage = page.locator("text=Invalid Username or Password");
  }
  async addContact(){
    await expect(this.firstName).toBeVisible();
    await this.firstName.fill(firstName);

    await expect(this.lastName).toBeVisible();
    await this.lastName.fill(lastName);
    await expect(this.dob).toBeVisible();
    await this.dob.fill(dob);
    await expect(this.email).toBeVisible();
    await this.email.fill(email);
    await expect(this.phone).toBeVisible();
    await this.phone.fill(phone);
    await expect(this.address1).toBeVisible();
    await this.address1.fill(address1);
    await expect(this.address2).toBeVisible();
    await this.address2.fill(address2);
    await expect(this.city).toBeVisible();
    await this.city.fill(city);
    await expect(this.province).toBeVisible();
    await this.province.fill(province);
    await expect(this.postalCode).toBeVisible();
    await this.postalCode.fill(postalCode);
    await expect(this.country).toBeVisible();
    await this.country.fill(country);
    // await this.page.waitForTimeout(3000); // Wait for 1 second to ensure all fields are filled
    await expect(this.signInButton).toBeVisible();
    await this.signInButton.click();
  }

    async verifyValidContact() {
        await expect(this.page).toHaveURL(
       "https://thinking-tester-contact-list.herokuapp.com/contactList"
        );
        const constValidation = await this.page.locator(this.constValidation);
        await this.page.waitForTimeout(2000);
        expect(this.logOut).toBeVisible;
        await expect(constValidation).toHaveText("aakash");
    }
    async contactEdit(firstName) {
        await this.page.locator(this.editContact).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.firstName).clear();
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.Save).click();
    }
  //   console.log("Contact added successful, ");
  // }
  // async verifyInvalidLogin() {
  //   await expect(this.page).toHaveURL(
  //     "http://110.44.113.165:85/EMISPortal/Login.aspx"
  //   );
  //   console.log("Login failed, user remained on the login page.");
  // }
};