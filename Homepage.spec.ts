import { test } from "@playwright/test";
import { POManager } from "../page-support/testData2.json";
import { compareJSON, readJSON } from "../utils/jsonCompare";

test.describe("Homepage Test cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://automationexercise.com/");
  });


test("Compare two JSONS", async ({ page }) => {
  
// Paths to your JSON files
const JSON_File1: string = "page-support/testData.json";
const JSON_File2: string = "page-support/testData2.json";

(async () => {
  const jsonData1 = await readJSON(JSON_File1);
  const jsonData2 = await readJSON(JSON_File2);

  if (jsonData1 && jsonData2) {
    console.log("Comparing JSON data...");
    const differences = compareJSON(jsonData1, jsonData2);
    console.log("Differences:", differences);
  } else {
    console.log("Failed to load one or both JSON files.");
  }
})();

});



  // test("Verify Page Title", async ({ page }) => {
  //   const poManager = new POManager(page);
  //   await poManager.getHomepage().VerifyTitle("Automation Exercise");
  // });

  // test('Verify image carousel on the top of the page', async ({ page }) => {
  //   await page.goto('https://automationexercise.com/');
  //   const carousel = page.locator('.carousel').first();
  //   await expect(carousel).toBeVisible();
  //   const initialImage = carousel.locator('.carousel-item.active img');
  //   await expect(initialImage).toBeVisible();
  //   await page.waitForTimeout(5000); // Adjust this timeout to match the carousel's transition interval
  //   const nextImage = carousel.locator('.carousel-item.active img').nth(1);
  //   await expect(nextImage).toBeVisible();
  // });

  // test("Verify Navigation menu contains correct options with working links", async ({page}) => {
  //   const poManager = new POManager(page);
  //   const expectedMenuItems = [
  //     "Home",
  //     "Products",
  //     "Cart",
  //     "Signup / Login",
  //     "Test Cases",
  //     "API Testing",
  //     "Contact us",
  //   ];
  //   await poManager.getHomepage().VerifyNavigationMenu(expectedMenuItems);
  // });

  // test("Verify Overlay with Product Details is Visible on Hover", async ({page,}) => {
  //   const poManager = new POManager(page);
  //   await poManager.getHomepage().VerifyOverlayOfProducts();
  // });

  // test("Verify Categories Section Lists All Categories Correctly", async ({page}) => {
  //   const poManager = new POManager(page);
  //   const expectedCategories = ["Women", "Men", "Kids"];
  //   await poManager.getHomepage().VerifyCategorySection(expectedCategories);
  // });

  // test.only("Verify featured items in features section displays products with accurate details", async ({page}) => {
  //   const poManager = new POManager(page);
  //   await poManager.getHomepage().VerifyFeaturesSection();
  // });
});
