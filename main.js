const { Actor } = require('apify');
const { chromium } = require('playwright');
const { PlaywrightCrawler, Dataset, RequestQueue, log } = require('crawlee');

Actor.main(async () => {
    const input = await Actor.getInput();
    const { categoryUrl } = input || {};

    if (!categoryUrl) {
        throw new Error('The "categoryUrl" input is required.');
    }

    const dataset = await Dataset.open('flipkart-products');
    const requestQueue = await RequestQueue.open();
    await requestQueue.addRequest({ url: categoryUrl, userData: { pageNumber: 1 } });

    const crawler = new PlaywrightCrawler({
        requestQueue,
        launchContext: {
            launcher: chromium,
            launchOptions: {
                headless: true,
            },
        },
        maxRequestRetries: 3,
        requestHandler: async ({ page, request }) => {
            log.info(`Scraping page: ${request.url}`);

const productContainers = await page.$$('div.cPHDOP.col-12-12');
const products = [];

for (const container of productContainers) {
    try {
        const nameElement = await container.$('div.KzDlHZ');
        const priceElement = await container.$('div.Nx9bqj._4b5DiR');
        const ratingElement = await container.$('div.XQDdHH');

        const name = nameElement ? await nameElement.evaluate(el => el.innerText.trim()) : null;
        const price = priceElement ? await priceElement.evaluate(el => el.innerText.trim()) : null;
        const rating = ratingElement ? await ratingElement.evaluate(el => el.innerText.trim()) : null;

        const productData = {
            name,
            price,
            rating,
            timestamp: new Date().toISOString(),
        };

        products.push(productData);
    } catch (error) {
        log.warning('Error extracting product data', { error });
    }
}

await dataset.pushData(products);


            // Pagination handling for 1 more page
            if (request.userData.pageNumber === 1) {
                const nextPageButton = await page.locator('a._9QVEpD').last();
                const isNextPageEnabled = await nextPageButton.isVisible();

                if (isNextPageEnabled) {
                    const nextPageUrl = new URL(await nextPageButton.getAttribute('href'), request.url).href;
                    await requestQueue.addRequest({ url: nextPageUrl, userData: { pageNumber: 2 } });
                    log.info(`Navigating to next page: ${nextPageUrl}`);
                } else {
                    log.info('No more pages found.');
                }
            }
        },
        failedRequestHandler: async ({ request }) => {
            log.error(`Request ${request.url} failed too many times.`);
        },
    });

    await crawler.run();

    const output = await Dataset.getData();
const store = await Actor.openKeyValueStore();
await store.setValue('results.json', output.items); // No contentType specified



    log.info('Scraping finished.');
});