<!-- # URL-SHORTNER
POST /url/shorten
Create a short URL for an original url recieved in the request body.
The baseUrl must be the application's baseUrl. Example if the originalUrl is http://abc.com/user/images/name/2 then the shortened url should be http://localhost:3000/xyz
Return the shortened unique url. Refer this for the response
Ensure the same response is returned for an original url everytime
Return HTTP status 400 for an invalid request
GET /:urlCode
Redirect to the original URL corresponding
Use a valid HTTP status code meant for a redirection scenario.
Return a suitable error for a url not found
Return HTTP status 400 for an invalid request
Testing
To test these apis create a new collection in Postman named Project 2 Url Shortner
Each api should have a new request in this collection
Each request in the collection should be rightly named. Eg Url shorten, Get Url etc
Each member of each team should have their tests in running state
Phase II
+Consider that Twitter has this trend where a famous person with a wide following when posts a link, the link gets frequented in millions within a day.

+So in our application we would want to implement caching so that a newly created link is cached for 24 hours. When a person uses a short url, the long url should be retrieved from cache in the first 24 hours of that url being created.

+- Use caching while fetching the shortened url to minimize db calls.
+- Implement what makes sense to you and we will build understanding over the assessment of -->
