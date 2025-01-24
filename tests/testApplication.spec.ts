import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registration-page';
import { ApplicationPage1 } from '../pages/application-page1';
import { ApplicationPage2 } from '../pages/application-page2';
import { ApplicationPage3 } from '../pages/application-page3';
import { ApplicationPage4 } from '../pages/application-page4';
import { ReviewPage } from '../pages/review-page';
import { SubmissionPage } from '../pages/submission-page';
import { LoginPage } from '../pages/login-page';
import { creds } from '../userdata/creds';

test('@test Complete Applicant Application Process', async ({ page }) => {
  // User Registration
//   const registrationPage = new RegistrationPage(page);
//   await registrationPage.navigate();
//   await registrationPage.registerNewUser({
//     firstName: 'Test',
//     lastName: 'Applicant',
//     email: 'test.applicant@example.com',
//     password: 'StrongPassword123!'
//   });

//login to application
  const loginPage = new LoginPage(page);
    
  // Navigate to login
  await loginPage.navigate();
  
  // Valid login scenario
  await loginPage.login(creds.username, creds.password);
  await loginPage.validateSuccessfulLogin();

  // Start Application
  const applicationPage1 = new ApplicationPage1(page);
  await applicationPage1.navigate('sdet-test-scholarship');
  await applicationPage1.beginApplication();

  await applicationPage1.fillRequiredFields({
    address: "india",
    street: "vijayapuri colony",
    state: "Alaska",
    city: "Hyderabad",
    zip: "90001",
    country: "United States" 

    // Add required field details
  });


  // Extracurricular Activities Page
  const applicationPage2 = new ApplicationPage2(page);
  await applicationPage2.validateMinimumActivities();
  await applicationPage2.addActivities([
    { name: 'Coding Club', id:"123", roles: "lead", description: 'Participated in programming workshops' },
    { name: 'Robotics Team', id:"124", roles: "senior", description: 'Led team in regional competition' },
    { name: 'Debate Society', id:"125", roles: "middle", description: 'Represented school in debate tournaments' },
    { name: 'Volunteer Work', id:"126", roles: "Junior",description: 'Community service at local shelter' }
  ]);

  // Transcript Upload Page
  const applicationPage3 = new ApplicationPage3(page);
  await applicationPage3.fillForm({
    name: "rah",
    street: "ddd",
    school: "ddd",
    city: "dd",
    state: "Alaska",
    zip: "90001",
    gpa:"4",

    // Add form details
  });
  await applicationPage3.uploadTranscript('test-data/school-transcript.pdf');
 
  // Essay Selection Page
  const applicationPage4 = new ApplicationPage4(page);
  await applicationPage4.validateEssayOptions();
  await applicationPage4.selectEssayTopics(['Animals', 'School']);
  await applicationPage4.writeEssays({
    Animals: 'An essay about the importance of animal conservation...',
    School: 'Reflecting on the transformative power of education...'
  });

  // Review Page
  const reviewPage = new ReviewPage(page);
  await reviewPage.validateAllPagesAnswered();

  // Submission
  const submissionPage = new SubmissionPage(page);
  const applicationUrl = await submissionPage.submit();
  
  // Validate post-submission behavior
  await submissionPage.validateEditingDisabled();

  // Store application URL for potential future reference
  console.log('Application Submitted at:', applicationUrl);
});