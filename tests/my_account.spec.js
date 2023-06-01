import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { adminDetalis } from "../data/userDetails";

test.only("My account using cookie injection and mocking network request", async ({
  page,
}) => {
  //make a request to get login token
  const loginToken = await getLoginToken(
    adminDetalis.username,
    adminDetalis.password
  );

  await page.route("**/api/user**", async (route, request) => {
    await route.fulfill({
      status: 500,
      contentType: "aplication/json",
      body: JSON.stringify({ message: "PLAYWRIGHT ERROR FROM MOCKING" }),
    });
  });

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
  await myAccount.waitForErrorMessage();
});
