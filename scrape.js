const puppeteer = require('puppeteer');
const url = 'https://www.billybishopairport.com/flights/departures';
const $ = require('cheerio');
const fs = require('fs');
const YTZDestinations = {
    "Cities": []
}

const uniqueSet = new Set();
puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto(url);
    let html = await page.content();
    await $('td:nth-child(5)',html).each(function(i, elem) {
        if(uniqueSet.has($(this).text()))return true;
         uniqueSet.add($(this).text())   
     });
 
    YTZDestinations.Cities = await [...uniqueSet].sort();
            
    await fs.writeFile('YTZDestinations.json', JSON.stringify(YTZDestinations), function(err){
        if (err) throw err;
        console.log("Successfully Written to File.");
    });
    await browser.close();
});