const { Builder, By, Key } = require('selenium-webdriver');

describe('basketo.pl', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('should navigate through categories and search for products', async () => {
    await driver.get('https://basketo.pl/');
    expect(await driver.getTitle()).toContain('Buty koszykarskie, do kosza, obuwie do koszykówki sklep Jordan, AND1, Spalding, K1X');

    const shoesCategoryLink = await driver.findElement(By.linkText('Obuwie'));
    await shoesCategoryLink.click();

    const currentUrl = await driver.getCurrentUrl();
    expect(await currentUrl).toContain('https://basketo.pl/pol_m_Obuwie-223.html');

    const productGrid = await driver.findElement(By.css('.products'));
    expect(await productGrid.isDisplayed()).toBe(true);

    const searchBox = await driver.findElement(By.css('.menu_search__input'));
    await searchBox.sendKeys('Nike', Key.RETURN);

    const searchResults = await driver.findElements(By.css('.product__name'));
    expect(searchResults.length).toBeGreaterThan(0);

    const firstResultText = await searchResults[0].getText();
    expect(firstResultText.toLowerCase()).toContain('nike');

    await searchResults[0].click();
    const slider = await driver.findElement(By.css('.photos___slider_wrapper div'));
    expect(await slider.isDisplayed()).toBe(true);

    const price = await driver.findElement(By.css('#projector_price_value'));
    expect(await price.isDisplayed()).toBe(true);

    const addToCartButton = await driver.findElement(By.css('#projector_button_basket'));
    expect(await addToCartButton.isDisplayed()).toBe(true);
  }, 10000);

  test('should add product to cart, adjust quantity, and remove it', async () => {
    await driver.get('https://basketo.pl/');
    expect(await driver.getTitle()).toContain('Buty koszykarskie, do kosza, obuwie do koszykówki sklep Jordan, AND1, Spalding, K1X');

    const searchBox = await driver.findElement(By.css('.menu_search__input'));
    await searchBox.sendKeys('Nike', Key.RETURN);

    const searchResults = await driver.findElements(By.css('.product__name'));
    expect(await searchResults.length).toBeGreaterThan(0);

    await searchResults[0].click();

    const addToCartButton = await driver.findElement(By.css('#projector_button_basket'));
    await addToCartButton.click();

    const cartUrl = await driver.getCurrentUrl();
    expect(await cartUrl).toContain('https://basketo.pl/basketedit.php');

    const productList = await driver.findElement(By.css('.basket__productslist'));
    expect(await productList.isDisplayed()).toBe(true);

    const totalPrice = await driver.findElement(By.css('.basketedit_summary_container'));
    expect(await totalPrice.isDisplayed()).toBe(true);

    const addQuantityButton = await driver.findElement(By.css('.quantity__add'));
    await addQuantityButton.click();

    const quantity = await driver.findElement(By.css('.quantity__input'));
    expect(await quantity.getAttribute('value')).toBe('2');

    const decreaseQuantityButton = await driver.findElement(By.css('.quantity__del'));
    await decreaseQuantityButton.click();

    expect(await quantity.getAttribute('value')).toBe('1');

    const removeButton = await driver.findElement(By.css('.basket__remove'));
    await removeButton.click();

    const emptyCartUrl = await driver.getCurrentUrl();
    expect(await emptyCartUrl).toContain('https://basketo.pl/return.php?status=basket_empty');

    const message = await driver.findElement(By.css('.return_label'));
    expect(await message.getAttribute('outerHTML')).toContain('Twój koszyk jest pusty.');
  }, 10000);
});
