THE EASY PART
15) Is there a way to bump up isloading to reduce duplication? 
THE HARDER PART
14) Make forms for logging in and signing up
13) If not logged in, show login and signup
12) If logged in, show logout and username
  - add logging out functionality
11) Homepage shows different messages based on log in state
10) Figure out token functionality 
9) Add local storage to keep the token in simple state
8) Write useLocalStorage hook
7) Protect routes from logged out users
6) Create profile page
5) Allow user to edit profile and update site
    - create listing of jobs applied for on profile site using job card
4) Allow job application functionality
    Button to apply if you haven't applied yet
    Should show Applied if you've already applied
    Should retain that information across pages during your session
    Should retain that information between sessions (pull it from the database)
THE REALLY HARD PART
3) Write tests
1) Deploy on Render
    Set up database on Supabase
    Deploy backend on Render
    Deploy frontend on Render

/* pink: #E5C1BD, 
tan: #D2D0BA
blue: #5E747F
yellow: B6BE9C
green: 7B9E87 */


## **Step Four: Companies & Company Detail**

Flesh out your components for showing detail on a company, showing the list of all companies, and showing simple info about a company on the list (we called these ***CompanyDetail***, ***CompanyList***, and ***CompanyCard***, respectively —but you might have used different names).

Make your companies list have a search box, which filters companies to those matching the search (remember: there’s a backend endpoint for this!). Do this filtering in the backend — **not** by loading all companies and filtering in the front end!

## **Step Five: Jobs**

Similarly, flesh out the page that lists all jobs, and the “job card”, which shows info on a single job. You can use this component on both the list-all-jobs page as well as the show-detail-on-a-company page.

Don’t worry about the “apply” button for now — you’ll add that later, when there’s authentication for the app.

## **Step Six: Current User**

This step is tricky. Go slowly and test your work carefully.

Add features where users can log in, sign up, and log out. This should use the backend routes design for authentication and registration.

When the user logs in or registers, retrieve information about that user and keep track of it somewhere easily reached elsewhere in the application.

Things to do:

- Make forms for logging in and signing up
- In the navigation, show links to the login and signup forms if a user is not currently logged in.
    
    If someone is logged in, show their username in the navigation, along with a way to log out.
    
- Have the homepage show different messages if the user is logged in or out.
- When you get a token from the login and register processes, store that token on the ***JoblyApi*** class, instead of always using the hardcoded test one. You should also store the token in state high up in your hierarchy; this will let use use an effect to watch for changes to that token to kick off a process of loading the information about the new user.

Think carefully about where functionality should go, and keep your components as simple as you can. For example, in the ***LoginForm*** component, its better design that this doesn’t handle directly all of the parts of logging in (authenticating via API, managing the current user state, etc). The logic should be more centrally organized, in the ***App*** component or a specialized component.

While writing this, your server will restart often, which will make it tedious to keep typing in on the login and signup forms. A good development tip is to hardcode suitable defaults onto these forms during development; you can remove those defaults later.

### Click on the > for a hint!

Hint on Proceeding — Read After Thinking!

Here’s the strategy we took from our solution:

- Make ***login***, ***signup***, and ***logout*** functions in the ***App*** component.
    
    By passing ***login***, ***logout***, and ***signup*** functions down to the login and signup forms and the navigation bar, they’ll be able to call centralized functions to perform these processes.
    
- Add ***token*** as a piece of state in ***App***, along with state for the ***currentUser***.
- Create an effect triggered by a state change of the token: this should call the backend to get information on the newly-logged-in user and store it in the ***currentUser*** state. You will need to decode the token and get the payload with the correct username. **Do not use the jsonwebtoken module to do this, you will encounter errors**. Instead, take a look at the ***jwt-decode*** module.
- Expose the current user throughout the app with a context provider. This will make it easy to refer to the current app in navigation, on pages, and so on.

This would be an excellent place to use ***useContext***, so you can store the current user’s info high up in your hierarchy, like on the ***App*** component.

## **Step Seven: Using localStorage and Protecting Routes**

If the user refreshes their page or closes the browser window, they’ll lose their token. Find a way to add ***localStorage*** to your application so instead of keeping the token in simple state, it can be stored in localStorage. This way, when the page is loaded, it can first look for it there.

Be thoughtful about your design: it’s not great design to have calls to reading and writing localStorage spread around your app. Try to centralize this concern somewhere.

As a bonus, you can write a generalized ***useLocalStorage*** hook, rather than writing this tied specifically to keeping track of the token.

### **Protecting Routes**

Once React knows whether or not there’s a current user, you can start protecting certain views! Next, make sure that on the front-end, you need to be logged in if you want to access the companies page, the jobs page, or a company details page.

## **Step Eight: Profile Page**

Add a feature where the logged-in user can edit their profile. Make sure that when a user saves changes here, those are reflected elsewhere in the app.

## **Step Nine: Job Applications**

A user should be able to apply for jobs (there’s already a backend endpoint for this!).

On the job info (both on the jobs page, as well as the company detail page), add a button to apply for a job. This should change if this is a job the user has already applied to.

## **Step Ten: Deploy your Application**

We’re going to use Render to deploy our backend and frontend! Before you continue, make sure you have two folders, each with their own git repository (and make sure you do not have one inside of another!)



It’s important to have this structure because we need two different deployments, one for the front-end and one for the backend.

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