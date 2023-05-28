App Review App
The App Review App is a Node.js API with MySQL database integration that allows filtering and searching of app reviews based on various criteria.
It provides endpoints to fetch, filter, and search app reviews stored in a MySQL database.

Features
Fetch all reviews: Get all the app reviews stored in the MySQL database.
Filter reviews: Filter reviews based on criteria such as app ID, app store name, rating, and country.
Search reviews: Search for reviews based on the review heading and review text.
Prerequisites
Node.js: Make sure you have Node.js installed on your machine.
MySQL: Set up a MySQL database and have the connection details (host, username, password, database name) ready.
Installation
Clone the repository:

git clone https://github.com/your-username/app-review-app.git

Navigate to the project directory:
cd app-review-app

Install dependencies:
npm install

Set up the MySQL database:
Create a new MySQL database.
Update the MySQL connection details in the index.js file (host, user, password, database) to match your MySQL configuration.
Import reviews from a JSON file (optional):

If you have a JSON file containing reviews, place it in the project directory.
In the index.js file, uncomment the code block that reads the JSON file and inserts reviews into the MySQL database.
Run the application using node index.js to import the reviews.
Start the application:
node index.js

Access the API endpoints:

Fetch all reviews:

Endpoint: GET /reviews
Example: http://localhost:3000/reviews
Filter reviews:

Endpoint: GET /reviews/filter
Query Parameters:
appID: Filter reviews by the specified app ID.
appStoreName: Filter reviews by the specified app store name.
rating: Filter reviews with the specified rating value.
countryName: Filter reviews from the specified country.
Example: http://localhost:3000/reviews/filter?appID=com.example&rating=5

Search reviews:

Endpoint: GET /reviews/search
Query Parameter:
query: Search query for review heading and review text.
Example: http://localhost:3000/reviews/search?query=awesome
Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.
