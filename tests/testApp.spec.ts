import test, { expect, Page } from "@playwright/test";
import { CommonUtils } from "../src/utils/commonUtils";
import { RegistrationPage } from "../src/pages/registration-page";
import { ApplicationReview } from "../src/pages/application-review";
import { SubmitApplication } from "../src/pages/review-submit";



test.describe('Shared Data Tests', () => {
    let fullName: string;
    let randomPhone: string;
    let password: string
    let randomEmail: string

test.beforeAll(() => {
    // Generate shared random data before all tests
    fullName = CommonUtils.getRandomName();
    randomPhone = CommonUtils.generateRandomPhoneNumber();
    password=CommonUtils.generatePassword();
    randomEmail = CommonUtils.generateRandomEmail();
  });

test('Complete Applicant Application Process', async ({ page }) => {

    const resgister = new RegistrationPage(page);
    resgister.registeruser(randomEmail, fullName, randomPhone, password);

    //Fill the Stage 1 form
    const reviewPage = new ApplicationReview(page);
    await reviewPage.fillStageOneDetails();

    //fill the stage 2 form
    await reviewPage.fillSecondStageDetails();
    
    //fill the stage 3 detials
    await reviewPage.fillThirdStageDetails();

    //final stage
    const submitDetails = new SubmitApplication(page);
    submitDetails.submitDetails();
   
   
});


});
