require('dotenv').config()
const express = require('express')
const { convert } = require('html-to-text');
const puppeteer = require('puppeteer')
const userAgent = require('user-agents');
const { sendMail } = require('./sendMail')

const app = express();

const { URL0, URL1, URL2, URL3 } = process.env

const urls = [URL0, URL1, URL2, URL3]

async function main() {
    let noOfUnits = [0, 0, 0, 0];

    setInterval(function() {
        puppeteer.launch({ headless: true }).then(async browser => {
            const page = await browser.newPage()
            await page.setUserAgent(userAgent.toString())

            // Get for Summerhill - Property Guru
            await page.goto(urls[0])
            const summerHillContentPG = await page.content();
            let summerHillCountPG = convert(summerHillContentPG, {
                baseElements: { selectors: ["div.sale-rent-cta"] },
                wordwrap: false,
            })
            summerHillCountPG = summerHillCountPG.substring(4, 5)
            console.log(`No. of units for Summer Hill (Property Guru): ${summerHillCountPG}`)

            // Get for Summerhill - 99.co
            await page.goto(urls[1])
            const summerHillContent99 = await page.content();
            let summerHillCount99 = convert(summerHillContent99, {

                baseElements: { selectors: ["div#active_listings"] },
                wordwrap: false,
            })
            summerHillCount99 = (summerHillCountPG.substring(summerHillCountPG.indexOf("active listings for rent and sale") - 3).substring(0, 2))
            console.log(`No. of units for Summer Hill (99.co): ${summerHillCount99}`)

            // Get for Hillington - Property Guru
            await page.goto(urls[2])
            const hillingtonContentPG = await page.content();
            let hillingtonCountPG = convert(hillingtonContentPG, {
                baseElements: { selectors: ["div.sale-rent-cta"] },
                wordwrap: false,
            })
            hillingtonCountPG = hillingtonCountPG.substring(4, 5)
            console.log(`No. of units for Hillington Green (Property Guru): ${hillingtonCountPG}`)

            // Get for Hillington - 99.co
            await page.goto(urls[3])
            const hillingtonContent99 = await page.content();
            let hillingtonCount99 = convert(hillingtonContent99, {
                baseElements: { selectors: ["div#active_listings"] },
                wordwrap: false,
            })
            hillingtonCount99 = hillingtonCount99.substring(hillingtonCount99.indexOf("active listings for rent and sale") - 3).substring(0, 2)
            console.log(`No. of units for Hillington Green (99.co): ${hillingtonCount99}`)

            await browser.close()

            if (summerHillCountPG !== noOfUnits[0]) {
                sendMail('SUMMERHILL (Property Guru)', summerHillCountPG)
            }

            if (summerHillCount99 !== noOfUnits[1]) {
                sendMail('SUMMERHILL (99.co)', summerHillCount99)
            }

            if (hillingtonCountPG !== noOfUnits[2]) {
                sendMail('HILLINGTON (Property Guru)', hillingtonCountPG)
            }

            if (hillingtonCount99 !== noOfUnits[3]) {
                sendMail('HILLINGTON (99.co)', hillingtonCount99)
            }
        })
    }, 1000 * 60 * 15)
}

main();

app.listen(process.env.PORT || 6999, () =>
    console.log('Server is running! Woohoo!')
);
