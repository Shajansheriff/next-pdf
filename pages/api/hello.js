// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import generatePDF from '../../lib/pdf'
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import Card from '../../components/card';

export default async function handler(req, res) {
  const pdf = await generatePDF(`
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.1/tailwind.min.css">
    </head>
    <body>
     ${renderToString(<Card />)}
    </body>
  </html>
`);
  
  // prompt to download pdf
  res.setHeader('Content-disposition', 'attachment; filename="article.pdf');
  
  // set content type
  res.setHeader('Content-Type', 'application/pdf');
  
  // output the pdf buffer
  res.end(pdf);
}
