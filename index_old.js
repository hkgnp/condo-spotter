require("dotenv").config();
const express = require("express");
const { convert } = require("html-to-text");
const puppeteer = require("puppeteer");
const userAgent = require("user-agents");
const { sendMail } = require("./utils");

const app = express();

const { URL0, URL1, URL2, URL3, URL4, URL5 } = process.env;

const urls = [URL0, URL1, URL2, URL3, URL4, URL5];

async function main() {
  let noOfUnits = [0, 0, 0, 0, 0, 0, 0];
  let noOfUnitsFiltered = [0, 0];

  setInterval(function () {
    puppeteer
      .launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
        ],
      })
      .then(async (browser) => {
        //// Get for Summerhill - Property Guru
        //await page.goto(urls[0])
        //const summerHillContentPG = await page.content();
        //let summerHillCountPG = convert(summerHillContentPG, {
        //    baseElements: { selectors: ["div.sale-rent-cta"] },
        //    wordwrap: false,
        //})
        //summerHillCountPG = summerHillCountPG.substring(4, 5)
        //console.log(`No. of units for Summer Hill (Property Guru): ${summerHillCountPG}`)

        //// Get for Summerhill - 99.co
        //await page.goto(urls[1])
        //const summerHillContent99 = await page.content();
        //let summerHillCount99 = convert(summerHillContent99, {

        //    baseElements: { selectors: ["div#active_listings"] },
        //    wordwrap: false,
        //})
        //summerHillCount99 = (summerHillCount99.substring(summerHillCount99.indexOf("active listings for rent and sale") - 3).substring(0, 2))
        //console.log(`No. of units for Summer Hill (99.co): ${summerHillCount99}`)

        // Get for Hillington - Property Guru
        //   await page.goto(urls[2]);
        //   const hillingtonContentPG = await page.content();
        //   let hillingtonCountPG = convert(hillingtonContentPG, {
        //     baseElements: { selectors: ["div.sale-rent-cta"] },
        //     wordwrap: false,
        //   });
        //   hillingtonCountPG = hillingtonCountPG.substring(4, 5);
        //   console.log(
        //     `No. of units for Hillington Green (Property Guru): ${hillingtonCountPG}`
        //   );

        // Get for Hillington - 99.co
        //      await page.goto(urls[3]);
        //      const hillingtonContent99 = await page.content();
        //      let hillingtonCount99 = convert(hillingtonContent99, {
        //        baseElements: { selectors: ["div#active_listings"] },
        //        wordwrap: false,
        //      });
        //      hillingtonCount99 = hillingtonCount99
        //        .substring(
        //          hillingtonCount99.indexOf("active listings for rent and sale") - 3
        //        )
        //        .substring(0, 2);
        //      console.log(
        //        `No. of units for Hillington Green (99.co): ${hillingtonCount99}`
        //      );

        // Get for Signature Park (filtered)
        let page = await browser.newPage();
        await page.setUserAgent(
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
        );
        await page.goto(
          "https://www.propertyguru.com.sg/property-for-sale?beds%5B0%5D=10&beds%5B1%5D=11&beds%5B2%5D=12&beds%5B3%5D=13&beds%5B4%5D=14&beds%5B5%5D=15&beds%5B6%5D=16&beds%5B7%5D=17&beds%5B8%5D=18&beds%5B9%5D=19&beds%5B10%5D=3&beds%5B11%5D=4&beds%5B12%5D=5&beds%5B13%5D=6&beds%5B14%5D=7&beds%5B15%5D=8&beds%5B16%5D=9&market=residential&property_id=210&property_name=Signature+Park&property_type=N&newProject=all"
        );
        const signatureParkContentFiltered = await page.content();
        let signatureParkCountFiltered = convert(signatureParkContentFiltered, {
          baseElements: { selectors: ["span.shorten-search-summary-title"] },
          wordwrap: false,
        });
        signatureParkCountFiltered = parseInt(
          signatureParkCountFiltered.substring(0, 1)
        );
        console.log(
          `${new Date()} No. of units for Signature Park - 3 bedrooms: ${signatureParkCountFiltered}`
        );

        await browser.close();
      });

    puppeteer
      .launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
        ],
      })
      .then(async (browser) => {
        await new Promise((r) => setTimeout(r, 1000 * 60 * 5));

        page = await browser.newPage();
        await page.setUserAgent(
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
        );

        // Get for Hillington Green (filtered)
        await page.goto(
          "https://www.propertyguru.com.sg/property-for-sale/at-hillington-green-357"
        );
        const hillingtonGreenContentFiltered = await page.content();
        let hillingtonGreenCountFiltered = convert(
          hillingtonGreenContentFiltered,
          {
            baseElements: { selectors: ["span.shorten-search-summary-title"] },
            wordwrap: false,
          }
        );
        console.log(hillingtonGreenCountFiltered);
        hillingtonGreenCountFiltered = parseInt(
          hillingtonGreenCountFiltered.substring(0, 1)
        );
        console.log(
          `${new Date()} No. of units for Hillington Green: ${hillingtonGreenCountFiltered}`
        );

        await browser.close();
        //    // Get for Signature Park - Property Guru
        //    await page.goto(urls[4])
        //    const signatureParkContentPG = await page.content();
        //    let signatureParkCountPG = convert(signatureParkContentPG, {
        //        baseElements: { selectors: ["div.sale-rent-cta"] },
        //        wordwrap: false,
        //    })
        //    console.log(signatureParkCountPG)
        //    signatureParkCountPG = signatureParkCountPG.substring(4, 5)
        //    console.log(`No. of units for Signature Park (Property Guru): ${signatureParkCountPG}`)

        //    // Get for Signature Park - 99.co
        //    await page.goto(urls[5])
        //    const signatureParkContent99 = await page.content();
        //    let signatureParkCount99 = convert(signatureParkContent99, {
        //        baseElements: { selectors: ["div#active_listings"] },
        //        wordwrap: false,
        //    })
        //    signatureParkCount99 = (signatureParkCount99.substring(signatureParkCount99.indexOf("active listings for rent and sale") - 3).substring(0, 2))
        //    console.log(`No. of units for Signature Park (99.co): ${signatureParkCount99}`)

        //if (summerHillCountPG !== noOfUnits[0]) {
        //  sendMail("SUMMERHILL (Property Guru)", summerHillCountPG);
        //  noOfUnits[0] = summerHillCountPG;
        //}

        //if (summerHillCount99 !== noOfUnits[1]) {
        //  sendMail("SUMMERHILL (99.co)", summerHillCount99);
        //  noOfUnits[1] = summerHillCount99;
        //}

        //if (hillingtonCountPG !== noOfUnits[2]) {
        //  sendMail("HILLINGTON (Property Guru)", hillingtonCountPG);
        //  noOfUnits[2] = hillingtonCountPG;
        //}

        //if (hillingtonCount99 !== noOfUnits[3]) {
        //  sendMail("HILLINGTON (99.co)", hillingtonCount99);
        //  noOfUnits[3] = hillingtonCount99;
        //}

        if (signatureParkCountFiltered !== noOfUnitsFiltered[0]) {
          sendMail("Signature Park (3-bedoom)", signatureParkCountFiltered);
          noOfUnitsFiltered[0] = signatureParkCountFiltered;
        }

        if (hillingtonGreenCountFiltered !== noOfUnitsFiltered[1]) {
          sendMail("Hillington Green", hillingtonGreenCountFiltered);
          noOfUnitsFiltered[1] = hillingtonGreenCountFiltered;
        }
        //     if (signatureParkCountPG !== noOfUnits[4]) {
        //         sendMail('SIGNATURE PARK (Property Guru)', signatureParkCountPG)
        //         noOfUnits[4] = signatureParkCountPG
        //     }
        //     if (signatureParkCount99 !== noOfUnits[5]) {
        //         sendMail('SIGNATURE PARK (99.co)', signatureParkCount99)
        //         noOfUnits[5] = signatureParkCount99
        //     }
      });
  }, 1000 * 60 * 15);
}

main();

app.listen(process.env.PORT || 6999, () =>
  console.log("Server is running! Woohoo!")
);
