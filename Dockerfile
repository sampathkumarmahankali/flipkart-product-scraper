FROM apify/actor-node-playwright:latest

COPY . ./
RUN npm install
RUN npx playwright install

CMD ["node", "main.js"]