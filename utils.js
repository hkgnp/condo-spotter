const nodemailer = require("nodemailer");
const { convert } = require("html-to-text");
const puppeteer = require("puppeteer");

const { HOST, USERNAME, PASS } = process.env;

const mailTransporter = nodemailer.createTransport({
  host: HOST,
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: USERNAME,
    pass: PASS,
  },
});

function sendMail(name, count) {
  const mailOptions = {
    from: "benpng@u.nus.edu",
    to: "ben@pngs.cc",
    subject: `[${name}]: Change in number of units`,
    text: `The current available number of available units are ${count}`,
  };

  mailTransporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`${name} Email Sent: ${info.response}`);
    }
  });
}

async function accessPage(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--user-agent='Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/13.10586'",
    ],
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.setUserAgent(
    "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/13.10586"
  );
  const content = await page.content();
  // Works for PG only
  let count = convert(content, {
    baseElements: { selectors: ["span.shorten-search-summary-title"] },
    wordwrap: false,
  });
  console.log(count);
  if (count.startsWith("No")) {
    count = 0;
  } else {
    count = parseInt(count.substring(0, 1));
  }
  await browser.close();
  return count;
}

module.exports = { sendMail, accessPage };
