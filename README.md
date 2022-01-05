# Chelsea's Cookies

## Chelsea's Cookies at a Glance

Chelsea's Cookies is a full stack app that allows users to purchase cookies from a local entrepreneur. Logged in users can purchase cookies from a standard menu set by the owner or custom cookies designed by the user. Users can also leave reviews about the products they have purchased and view a gallery of available cookies. Currently, Chelsea's Cookies is designed to have the owner arrange delivery independent of the website using the information available on the user's account.

Application Architecture
Chelsea's Cookies is built on a React frontend with Python/Flask backend, using PostgreSQL as a database.

Frontend Overview
Chelsea's Cookies does the vast majority of its application logic on the backend, but display/interaction logic on the frontend is managed using several technologies.

Frontend Technologies Used
React
Chelsea's Cookies is a React application. All display logic is handled by the React libraries.

Redux
Chelesea's Cookies makes extensive use of Redux. All state management is handled with Redux, with thunks making API calls to the backend server for data.

Amazon Serverless Image Handler
Amazon Serverless Image Handler is used to transform user product pictures into the sizes appropriate for display on Chelsea's Cookies, without having to worry about whether the image is being cropped correctly or not. This allows for users to be able to upload any image as a profile picture and ensuring that the relevant portion of the picture will be displayed on the site.

Backend Overview
JamOut uses an Python/Flask server with a PostgreSQL database.

Backend Technologies Used
Flask
Flask was an easy choice to make for the Chelsea's Cookies server. The simple data flow from the frontend to the backend with JavaScript at the core of both made for quick, easy development, with little worry about the data types being sent and received.

PostgreSQL
PostgreSQL was the database of choice because it is simple to work with, and is easily manipulated using Sequelize.

AWS S3
Amazon Web Services S3 was used to allow users to upload image.

Faker
The Python faker library was used extensively to create users for JamOut.

## Features
1. Main Page
![Alt text](https://wziller-personal-portfolio.s3.us-east-2.amazonaws.com/project-images/cc-individual-product-page-screenshot.PNG)
The main page displays the current menu of offerings from the company as well as a gallery of custom creations by the baker.

2. Administrator Back End
![Alt text](https://wziller-personal-portfolio.s3.us-east-2.amazonaws.com/project-images/cc-admin-screenshot.PNG)
The website features a page that utilizes dual authorization to only allow administrator access. This page allows the adiminstrator to manage orders, products, galleries and other content on the site without having to access the webssites code.

3. Individual Product Page
![Alt text](https://wziller-personal-portfolio.s3.us-east-2.amazonaws.com/project-images/cc-individual-product-page-screenshot.PNG)
TThe individual product oage allows customerss to view product descriptions and pricing. It also allows users to review product they have purchased and view reviews by other customers.


