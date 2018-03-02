# Description
Ok, let's say you want to build your Facebook messenger bot but definitely hate using the third-party  REST API  because of the 
"powered by xx" at the bottom of the bot ,this repo will get your started with a basic Nodejs code.
# Installation
This repo is provided with a web interface where anything kicks off.
- Click on  the following link  and  fill the multi-step form : https://www.opendarasa.com/developers/

  (you might need to jump to [FAQ ](#faq) if you are really new to this before reading the rest of the instructions) 
- After submiting the form you will be provided with the basic source code of your Ai, Download the zip file and save it somewhere 
in your local computer.
- If you have Heroku installed in your computer ignore this step if not click on the following link and follow the instructions 
to install heroku: https://devcenter.heroku.com/articles/heroku-cli
- Once you have heroku installed open a command line and navigate to the source-code you just downloaded and extracted
- Type respectively the commands below to deploy your repo on heroku
   - `heroku login`
   - Enter heroku email and password
   - `heroku create <your_heroku_app_name>`
   - `git add .`
   - `git commit -m "first commit"`
   - `git push heroku master`
   - Wait until all files are pushed 
   - `heroku open`
   - You should be redirected to `https://<your_heroku_app_name>.herokuapp.com`
   - add `/webhook` at the end of the url like this `https://<your_heroku_app_name>.herokuapp.com/webhook`
     you should read `Hello youtube on the screen` if yes your app is succesfully deployed if not type
     `heroku logs` in your terminal ,read the error message , debug and start again from `git commit -m "<your new commit>"`
   - If your deployment is sucessfull (you get to read hello youtube on `https://<your_heroku_app_name>.herokuapp.com/webhook`) 
    go to your facebook page and start chating with your bot with `hi` or anything else you have filled in your form.
   
  # FAQ 
  
  - How do i get my Facebook page Token?
    - Go to https://developers.facebook.com
    - Create a new App
    - Click on the new created App and go the App dashboard
    - Navigate to `Product` and click on the plus icon to add a Product
    - select Messenger
    - select the facebook pageyou want to associate and click on subscribe
    - Fill the modal form as shown in the picture below
       - the Callback Url is your `https://<your_heroku_app_name>.herokuapp.com/webhook`
       - the Verify token is the token you entered in the  form above (https://www.opendarasa.com/developers/).
         the token can be anything like `my_ai_token`.
       
      ![alt text](https://github.com/Opendarasa/openai/blob/master/Screen%20Shot%202018-03-02%20at%2011.52.07%20PM.png)
  - How do i get my page Access ? 
    - Go to the App you newly created and navigate to Product > Messenger > Setting
    - Scroll down to `Token Generation`
    - Select the same facebook page as above
    - Get the Generated token 
    - Copy paste this token in the `Access` field in https://www.opendarasa.com/developers/
    
 - For more documentation please refer to the Facebook Tutorial https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start
      
