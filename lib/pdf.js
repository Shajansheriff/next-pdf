import puppeteer from "puppeteer";

export default async (html = "") => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);

  const pdfBuffer = await page.pdf({ landscape: true, printBackground: true, width: "510mm", height: "697mm" });

  await page.close();
  await browser.close();

  return pdfBuffer;
};
