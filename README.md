# foodie
Web application to assist consumers and restaurants with table side ordering and payment

1. In terminal navigate to directories backend and foodie; run npm install; sudo npm install -g nodemon --save;

2. Set up MongoDB following this tutorial: https://docs.atlas.mongodb.com/getting-started/

3. In MongoDB Atlas create a Collection foodie

4. Navigate to backend folder and create env.sh file

5. Place following lines in env.sh file

    export MONGODB_URI="mongodb+srv://YOUR_USERNAME:PASSWORD@cluster0-etsdk.mongodb.net/foodie?retryWrites=true&w=majority"
    
    export SECRET="YOUR_SECRET_KEY"
    
6. In terminal run source env.sh

7. Having two terminals opened navigate to backend and foodies directories for each and run npm start

This will start up the app!

