# ShortUrl

ShortUrl is simple URL shortener service. <br>
You can shorten any valid url link and customize it by giving special slug.

### How to use it?
Visit **<a href="https://shrtpl.herokuapp.com/" target="_blank">https://shrtpl.herokuapp.com/</a>** and paste your link. That's it ;)

## Tech stack:
- **Backend:** Node.js, Express
- **Frontend:** Vue.js
 - **DB:** MongoDB
 
# API
You can use ShortUrl API to shorten URL directly from your app

### Available endpoints:

 - **/api/url/shorten**
	 - Method: **POST**
	 - Parameters: <br>
			 - **longUrl (required)**: string - Url to shorten <br>
			 - slug: string - Custom slug for url

 
