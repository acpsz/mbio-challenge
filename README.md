# Mercedes-Benz.io QA Technical Challenge

In this repository, you can find the work done for Task 1 and Task 2 of the Mercedes-Benz.io QA Technical Challenge.

* Task 1 - Manual Testing
* Task 2 - Automated Testing


## Task 1

This folder has a .pdf file with the answers. You can read/download them directly from the GitHub repository without cloning the project.


## Task 2

This folder has the implementation of the scenario "Validate the negative path of enquiring the highest price at Mercedes-Benz". This implementation was done using Playwright tool and Typescript language.
The test is configured to run on Chrome (chromium) and Safari (webkit).

### Requirements
* npm
* node ^20.10.0

### Installation
Clone the repository:
```bash
https://github.com/acpsz/mbio-challenge.git
```

Go to the TASK_2 folder and install the dependencies:
```bash
npm install
```

### Running the test
Command to run the test on all browsers:
```bash
npx playwright test
```

Command to run the test on a specific browser (chromium or webkit):
```bash
npx playwright test --project chromium
```

