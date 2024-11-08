const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
require('geckodriver');

describe('koleo.pl', () => {
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

  test('should open train information', async () => {
    await driver.get('https://koleo.pl/');
    expect(await driver.getTitle()).toContain('KOLEO');

    const inputContainers = await driver.wait(
       until.elementsLocated(By.css('.large-4.columns.has-input.query-form-element')),
       4000
    );

    const values = ["Tczew", "Gdańsk"];

    for (let i = 0; i < inputContainers.length; i++) {
      const container = inputContainers[i];

      const input = await container.findElement(By.css('input'));

      if (i !== inputContainers.length - 2) {
        await input.sendKeys(values[i]);

        const ul = await container.findElement(By.css('ul.autocomplete'));
        await driver.wait(until.elementIsVisible(ul), 5000);
        const li = await container.findElement(By.css('li.active'));

        await li.click();
        await driver.sleep(500);
        const value = await input.getAttribute('value');
        expect(value).toContain(values[i]);
      }

      if (i === 2) break;
    }

    const button = await driver.findElement(By.id('small_search'));
    const buttonDisable = await button.getAttribute('disabled');
    expect(buttonDisable).toBeNull();

    await button.click();

    const startStation = await driver.wait(
       until.elementLocated(By.css('.departure-header .icon-with-text strong')),
       5000
    );
    const startStationText = await startStation.getText();
    expect(startStationText.toLowerCase()).toBe(values[0].toLowerCase());

    const finalStation = await driver.findElement(By.css('.arrival-header .icon-with-text strong'));
    const finalStationText = await finalStation.getText();
    expect(finalStationText.toLowerCase()).toBe(values[1].toLowerCase());

    const searchContainer = driver.wait(
       until.elementLocated(By.css('.search-results')),
       5000
    );

    const firstElement = await searchContainer.findElement(By.css('.has-train-nr'));
    await firstElement.click();
    await driver.sleep(2000);

    const link = await searchContainer.findElement(By.css('a.ember-view'));
    expect(await link.getText()).toBe('Szczegóły połączenia')
    await driver.executeScript("arguments[0].click();", link);

    const buttonOpenTable = await driver.wait(
       until.elementLocated(By.css('.brand-logo.brand-logo-REG.clickable')),
       1000
    );
    await driver.executeScript("arguments[0].click();", buttonOpenTable);
    const heading = await driver.wait(
       until.elementLocated(By.css('.small-16.columns')),
       1000
    );
    expect(await heading.getAttribute('outerHTML')).toContain(values[0]);
    expect(await heading.getAttribute('outerHTML')).toContain(values[1]);

  }, 10000);
});
