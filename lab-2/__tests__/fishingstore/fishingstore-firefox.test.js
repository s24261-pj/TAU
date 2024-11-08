const { Builder, By, Key, until} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
require('geckodriver');

describe('fishingstore.pl', () => {
  let driver;

  beforeAll(async () => {
    const options = new firefox.Options();

    driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(options)
      .build();
  });

  afterAll(async () => {
      await driver.quit();
  });

  test('should navigate through categories and search for products', async () => {
    await driver.manage().window().setRect({width: 1280, height: 720})
    await driver.get('https://www.fishingstore.pl/');
    expect(await driver.getTitle()).toContain('Sklep Wędkarski - sprzęt dla wędkarza - FishingStore.pl');

    const newProductsLink = await driver.findElement(By.linkText('Nowości'));
    await newProductsLink.click();

    const currentUrl = await driver.getCurrentUrl();
    expect(await currentUrl).toContain('https://www.fishingstore.pl/Nowosc-snewproducts-pol.html');

    const productList = await driver.findElement(By.css('.products'));
    expect(await productList.isDisplayed()).toBe(true);

    const quantityIncrease  = await driver.wait(
       until.elementLocated(By.css('.products .product:first-child .nb_up')),
       5000
    );
    await quantityIncrease.click();

    const quantity = await driver.findElement(By.css('.prod_count input'));
    expect(await quantity.getAttribute('value')).toBe('2');

    const decreaseQuantityButton = await driver.findElement(By.css('.products .product:first-child .nb_down'));
    await decreaseQuantityButton.click();

    expect(await quantity.getAttribute('value')).toBe('1');

    const favoriteButton  = await driver.wait(
       until.elementLocated(By.css('.products .product:first-child .--list-shopping-list')),
       5000
    );
    await favoriteButton.click();

    const chooseModal = await driver.findElement(By.css('.sl_choose.--active'));
    expect(await chooseModal.isDisplayed()).toBe(true);

    const createListButton = await driver.findElement(By.linkText('Stwórz nową listę zakupową'));
    await driver.executeScript("arguments[0].click();", createListButton);

    const input = await driver.findElement(By.css('.sl_create__input'));
    await input.sendKeys('test' , Key.RETURN);

    const parentDiv = await driver.wait(
       until.elementLocated(By.xpath("//div[contains(@class, 'sl_choose__list')]//span[@class='sl_choose__name' and text()='test']/ancestor::div[contains(@class, 'sl_choose__list')]")),
       10000
    );

    const chooseElementButton = await parentDiv.findElement(By.css('.sl_choose__group_label.f-label.py-4'));
    await driver.executeScript("arguments[0].click();", chooseElementButton);

    const button = await driver.wait(
       until.elementLocated(By.xpath(".//button[@class='sl_choose__button --desktop btn --solid']")),
       10000
    );
    await driver.executeScript("arguments[0].click();", button);

    await driver.sleep(1000);

    const result = await parentDiv.findElement(By.css('.sl_choose__count'));
    expect(await result.getText()).toBe("1");
    expect(await result.getText()).not.toBeFalsy();
  }, 30000);
});
