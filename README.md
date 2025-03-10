# Instagram Automation with Playwright

This repository contains Playwright automation to search for a profile on Instagram and send a message.

## Setup

1. Install dependencies:
   
   ```sh
   npm install
   ```  

2. Create a `.env` file in the root folder with the following format:
   
   ```sh
   USERNAME=your_instagram_username  
   PASSWORD=your_instagram_password  
   ```  

## Run the Test

Run the test in **headed mode** using:

```sh
npx playwright test tests/sendMessage.spec.js --headed --project=chromium
```
