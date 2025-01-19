# SAUCEDEMO README

Hello and welcome to my Sauce Demo README

To get this project set up locally you will need to follow these steps:

### Prerequisites:

Make sure you have the following installed on your machine:

- [Node.js] (https://nodejs.org/) This includes npm

Clone this repo:

- Open your terminal or command prompt.
- Run the follow command to clone this repository:

```
git clone https://github.com/Dash1704/Sauce-Demo.git

```

- Navigate to the project directory (replace your-folder with your applicable path):
```
cd your-folder/your-folder/Sauce-Demo
```

- Install dependencies:

```
npm install
```

To run the tests with the Cypress Test Suite run:

```
npx cypress open
```

Once you have done so a Cypress interface will pop open and follow the following steps:

- E2E Testing
- Chrome (or other preferred browser), and Start E2E testing in Chrome
- Click Specs folder in left hand column
- Choose any of the three testing specs
- Tests should start running automatically

The tests are in three different specs: Login Tests, Add to Basket Tests and Checkout Tests so that they can be easily located when maintenence and updates are required. This structure also simplifies de-bugging by isolating the tests for specific features, making it easy to identify and resolve issues.


### Test reasons:
I have tested the following three features:

LOGIN/LOG OUT
This is an important feature that focuses on validating the login functionality, including successful and failed attempts and edge cases.

SHOPPING FEATURE
A key part of an e-commerce platform is to be able to freely shop around without any unexpected errors. This ensures a good user experience and if there are any errors it will make the user put off from using the site and would potentially make them believe it is a scam website.

COMPLETE PURCHASE
Due to the obvious business model being that the user is paying for items, if they are unable to complate sales then it makes the business redundant, therefore ensuring that the payments are able to be completed is paramount to the website.
















