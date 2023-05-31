import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { adminDetalis } from "../data/userDetails";

test.only("My account using cookie injection", async ({ page }) => {
  //make a request to get login token
  const loginToken = await getLoginToken(
    adminDetalis.username,
    adminDetalis.password
  );

  //inject the login token into the browser
  const myAccount = new MyAccountPage(page);
  await myAccount.visit();

  await page.evaluate(
    ([loginTokenInsideBrowsecode]) => {
      document.cookie = "token=" + loginTokenInsideBrowsecode;
    },
    [loginToken]
  );

  await myAccount.visit();
  await myAccount.waitForPageHeading();
});
