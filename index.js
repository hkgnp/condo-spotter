require("dotenv").config();
const express = require("express");
const { sendMail, accessPage } = require("./utils");

const app = express();

const { URL6, URL7, URL8 } = process.env;

async function main() {
  let noOfUnitsFiltered = [0, 0, 0];

  setInterval(async function () {
    const signatureParkCountFiltered = await accessPage(URL6);
    if (signatureParkCountFiltered !== noOfUnitsFiltered[0]) {
      sendMail("Signature Park (3-bedoom)", signatureParkCountFiltered);
      noOfUnitsFiltered[0] = signatureParkCountFiltered;
    }
    console.log(
      `${new Date()} No. of units for Signature Park - 3 bedrooms: ${signatureParkCountFiltered}`
    );

    await new Promise((r) => setTimeout(r, 1000 * 60 * 1));

    const hillingtonGreenCountFiltered = await accessPage(URL7);
    if (hillingtonGreenCountFiltered !== noOfUnitsFiltered[1]) {
      sendMail("Hillington Green", hillingtonGreenCountFiltered);
      noOfUnitsFiltered[1] = hillingtonGreenCountFiltered;
    }
    console.log(
      `${new Date()} No. of units for Hillington Green: ${hillingtonGreenCountFiltered}`
    );

    await new Promise((r) => setTimeout(r, 1000 * 60 * 1));

    const summerHillCountFiltered = await accessPage(URL8);
    if (summerHillCountFiltered !== noOfUnitsFiltered[2]) {
      sendMail("Summer Hill", summerHillCountFiltered);
      noOfUnitsFiltered[2] = summerHillCountFiltered;
    }
    console.log(
      `${new Date()} No. of units for Summer Hill: ${summerHillCountFiltered}`
    );
  }, 1000 * 60 * 15);
}

main();

app.listen(process.env.PORT || 6999, () =>
  console.log("Server is running! Woohoo!")
);
