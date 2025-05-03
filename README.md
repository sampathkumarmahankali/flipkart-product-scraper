Flipkart Product Scraper
This project is an Apify actor that gets product data from Flipkart category pages.

1. How To Run
Prerequisites:

You must register an account with Apify and have the Apify CLI installed and set up on your machine. You can check the official Apify documentation for further details.

2. Clone or Copy the Project:

Make sure that all the project files (main.js, package.json, Dockerfile, .actor/actor.json) are available in a local folder.

3. Go to the Project Folder:

bash cd flipkart-product-scraper

4. Push the Actor to Apify:

apify push  
This command will build and deploy your actor to the Apify platform.

5. Run the Actor in Apify:

Open your web browser and navigate to the Apify Console.

Look for the actor titled 'flipkart-product-scraper'.

Press the Run button.

As input, you will need to add a JSON string. The input required is the categoryUrl of the Flipkart page you wish to scrape. For instance:
json { "categoryUrl": "[https://www.flipkart.com/mobiles/pr?sid=tyy,4io&q=mobiles&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off](https://www.flipkart.com/mobiles/pr?sid=tyy,4io&q=mobiles&otracker=search&otracker1=search&m
}

6. Results Overview
Upon completion of the actor run (status will show “Succeeded”), navigate to the "Dataset" tab of the run to view the scraped product data in JSON format.

Furthermore, you may verify the final run output within the "OUTPUT" key-value store.

////Made Assumptions

Flipkart Website Structure: This actor depends on the HTML structure and CSS class styles currently used on the Flipkart website for product listings. If Flipkart macroscopically changes its website layout, the actor’s selectors will most probably need to be changed.

Single Level Pagination: Currently, the actor is set up to only single-level pagination (the “Next” button at the first page of results). It will not deep-scrape any further than the immediate next page.

Product Data Consistency: The scraping logic set up for each product name, price and rating for each product are supposed to be present on the listing container on the category page.

Confronting Issues

Initial Deployment Problems: Getting Apify to detect and execute the actor's main.js was problematic, necessitating some changes to package.json and possibly a fresh deploy.

Dynamic Website Structure: Web scrapers face a host of issues with the possibility of a website's structure changing without any prior notice, which can disrupt