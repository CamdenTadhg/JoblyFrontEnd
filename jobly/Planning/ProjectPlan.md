THE REALLY HARD PART
3) Write tests 
    - ApplyButton [save to git]: Friday
    - App [save to git]: Friday
1) Deploy on Render: Sunday
    Set up database on Supabase
    Deploy backend on Render
    Deploy frontend on Render

THE FUTURE PART
- finish any incomplete tests
- Substitute in my own backend and get it working
    - will need all the application stuff I added
- Tweak to be accessible for portfolio
- Implement comprehensible error messages for json schema failing for signup and login



### **Render Deploy**

(Flask version here [https://lessons.springboard.com/Flask-Python-Deployment-with-Render-86d8c634de0b4ee6a74286e91f4c9aca](https://lessons.springboard.com/86d8c634de0b4ee6a74286e91f4c9aca?pvs=21))

Ensure the app works without error on your local computer.


## **The Database (for Supabase)**

You should already have an account at **Supabase** but you can create a new one if needed

1. Create a New Project (If you are at the limit of 2 active projects, you can **PAUSE** one)
2. Select region: **Supabase** will choose one for you, but you may select one closest to you
3. Create a **strong** database password or let **Supabase** generate one for you automatically
4. Wait for the project to be created, then navigate to: ‘Project Settings’ > ‘Configuration’ > ‘Database’

## **Transferring data from the existing Jobly database to Supabase**

To transfer your existing **Jobly** database INCLUDING any data that you may have created, you can use the **<pg_dump>** command along with **<psql>:**

1. Grab the PSQL connection string from Supabase

*Example may look something like this:*

*“psql -h aws-0-us-east-1.pooler.supabase.com -p 5432 -d postgres -U postgres.wmytcyirfgszxtvlxsbg”*

1. Open up the terminal and initialize **<pg_dump>**

*Example:*

```jsx
**pg_dump -O jobly | psql -h** aws-0-us-east-1.pooler.supabase.com **-p** 5432 **-d** postgres **-U** postgres.wmytcyirfgszxtvlxsbg
```

*(IMPORTANT: The connection options will be different for every user, the values in RED are for demonstration purposes only and will be different in your database instance.*

1. PSQL will connect to your **Supabase** database and prompt you for your password, enter your **Supabase** database password and wait for the copy process to finish

*This dumps your existing **Jobly** database and loads it in your new database hosted on Supabase. If you are deploying a different application such as your capstone, you will need to update the previous line of code.*

*Your local Database on your machine HAS to be named “jobly” for the command above to work properly, if it is named something else, alter the command accordingly.*

## **Deployment on Render**

- A service for serving web applications from the cloud
- Similar to Salesforce’s Heroku product, but has a free tier

### **Backend, First!**

At User Dashboard choose **New Web Service**. Build and deploy from git repository(If none of your repos are appearing click on Configure Account and make sure you’ve linked the proper Github account to Render). Choose your Jobly backend repository.

You can name it anything you want, but keep in mind that future employers may look at this.

- Choose Oregon (US West)

You should not need to change any other entries, but they should be:

- Node → npm install → node server.js
- Choose free

You will need to make three environment variables.

| SECRET_KEY | The value can be any string you want. |
| --- | --- |
| NODE_ENV | Must be the string "production" |
| DATABASE_URL | Copy and paste the url from your Supabase database.  |

You will be taken to the logs screen of your back end. You should see it compile and deploy.

**There will be two 404 errors.**

- One is trying to go to the / directory of the backend. It does not have one.
- The other is trying to load a favicon. Unless you add one, you don’t have one and you can ignore both errors.

To test your backend go to the url listed towards the top of the web service page, just under the name for the app and the GitHub address.Copy that url into your browser and add companies at the end like so:https://myjoblyprojectname.onrender.com/companies

Copy and save the url for later use in the front end setup.

### **Front End**

1. From your Render top nav bar choose New +
2. Choose Static Site
3. Build and deploy from a Git repository
4. Choose your jobly front end repository
5. Choose Oregon (US West). You should not need to change the other entries.
6. Instance Type choose free.You will need to add an Environment Variable

| REACT_APP_BASE_URL | Copy and paste the url from the Render back end. |
| --- | --- |
| NODE_ENV  | Must be the string "production"NODE_VERSION
Must be the value 16.20.0 |

Once it is deployed you should go to the url given towards the top of the dashboard. It may be a bit slow the first time it is used. You can also check the logs of your backend to see if it’s been contacted.

## **Solution**

[View our solution](http://curric.rithmschool.com/springboard/exercises/react-jobly/solution)