# Test Automation Project

This project includes automated Selenium tests using Jest for four websites: **FishingStore.pl**, **Koleo.pl**, and **Basketo.pl**. The tests cover essential user interactions for each site, including navigation, product search, adding items to the cart or wishlist, and form submissions.

## Project Structure

The project is organized with separate test files for each website, and each file contains tests that are specific to that website's user scenarios.

### Test Files:
- **Basketo.pl**: `basketo-chrome-test.js`, `basketo-firefox-test.js`, `basketo-safari-test.js`
- **FishingStore.pl**: `fishingstore-chrome-test.js`, `fishingstore-firefox-test.js`, `fishingstore-safari-test.js`
- **Koleo.pl**: `koleo-chrome-test.js`, `koleo-firefox-test.js`, `koleo-safari-test.js`

Each file tests a specific scenario on a designated website. These scenarios are described in detail below.

## Test Scenarios

### Basketo.pl

**Goal:** Test navigation, search functionality, and cart operations on Basketo.pl.

#### Scenario 1: Navigate through categories and search for products

1. Open the Basketo.pl homepage.
2. Confirm that the page title includes "Buty koszykarskie, do kosza, obuwie do koszykówki sklep Jordan, AND1, Spalding, K1X."
3. Navigate to the "Obuwie" category.
4. Verify that the URL contains "Obuwie" and that the product grid is displayed.
5. Use the search bar to search for "Nike"
6. Confirm that search results include products with "Nike" in their names.
7. Open the first product, then verify that the image slider and price are displayed.

#### Scenario 2: Add product to cart, adjust quantity, and remove it

1. Search for "Nike" on the Basketo.pl homepage.
2. Open the first product and add it to the cart.
3. Verify navigation to the cart page and ensure the product list and total price are visible.
4. Increase the product quantity to two, then decrease it back to one.
5. Remove the product from the cart and confirm that the cart is empty.

### FishingStore.pl

**Goal:** Test product search and wishlist functionality on FishingStore.pl.

#### Scenario: Navigate through categories, search for products, and manage wishlist

1. Open the FishingStore.pl homepage.
2. Go to the "Nowości" (New Products) section and confirm the correct URL.
3. Verify that the product grid is displayed.
4. Adjust the quantity for the first product.
5. Add the product to the wishlist, creating a new wishlist named "test"
6. Confirm that the item count in the wishlist is accurate.

### Koleo.pl

**Goal:** Test train search functionality and ensure correct train details.

#### Scenario: Search for a train and verify details

1. Open the Koleo.pl homepage.
2. Select origin and destination stations.
3. Confirm that the search button is active and submit the search form.
4. On the results page, ensure the selected stations are displayed.
5. Open details for the first train and verify contact information and train schedule details.

## Setting Up the Environment

1. Ensure you have Node.js and npm installed.
2. Install necessary dependencies:
   ```bash
   npm install
   
## Videos

https://github.com/user-attachments/assets/2cc90dec-8dd7-4645-a730-c6229154c0fa

https://github.com/user-attachments/assets/d728d5ea-124e-45b3-8894-bb3ef4ff68e2

https://github.com/user-attachments/assets/6c03555b-b762-47b5-9e64-41c724af994f
