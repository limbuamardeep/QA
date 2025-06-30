import { test, expect } from '@playwright/test';

test.describe('Login functionality tests', () => {

  const baseURL = 'https://practicetestautomation.com/practice-test-login/';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('Valid login', async ({ page }) => {
    await page.locator('//input[@id="username"]').fill('student');
    await page.locator('//input[@id="password"]').fill('Password123');
    await page.locator('//button[@id="submit"]').click();

    await page.waitForSelector('//h1[text()="Logged In Successfully"]');
    const message = await page.locator('//h1[text()="Logged In Successfully"]').textContent();
    console.log('Login Success Message:', message);
    expect(message).toContain('Logged In Successfully');
  });

  test('Invalid username', async ({ page }) => {
    await page.locator('//input[@id="username"]').fill('wronguser');
    await page.locator('//input[@id="password"]').fill('Password123');
    await page.locator('//button[@id="submit"]').click();

    const error = await page.locator('div#error').textContent();
    console.log('Error Message:', error);
    expect(error).toContain('Your username is invalid!');
  });

  test('Invalid password', async ({ page }) => {
    await page.locator('//input[@id="username"]').fill('student');
    await page.locator('//input[@id="password"]').fill('wrongpassword');
    await page.locator('//button[@id="submit"]').click();

    const error = await page.locator('div#error').textContent();
    console.log(' Error Message:', error);
    expect(error).toContain('Your password is invalid!');
  });

  test('Empty username and password', async ({ page }) => {
    await page.locator('//button[@id="submit"]').click();

    const error = await page.locator('div#error').textContent();
    console.log('Error Message:', error);
    expect(error).toContain('Your username is invalid!');
  });

  test('Only username entered', async ({ page }) => {
    await page.locator('//input[@id="username"]').fill('student');
    await page.locator('//button[@id="submit"]').click();

    const error = await page.locator('div#error').textContent();
    console.log('Error Message:', error);
    expect(error).toContain('Your password is invalid!');
  });

  test('Only password entered', async ({ page }) => {
    await page.locator('//input[@id="password"]').fill('Password123');
    await page.locator('//button[@id="submit"]').click();

    const error = await page.locator('div#error').textContent();
    console.log('Error Message:', error);
    expect(error).toContain('Your username is invalid!');
  });


});