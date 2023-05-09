import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

const fileName = 'quotes.json';

export async function addQuote(quoteText) {
  const quotesList = await fs.readFile(fileName);
  const data = JSON.parse(quotesList);
  console.log(data);

  const newQuote = {
    id: uuidv4(),
    quoteText: 'Five four three two one',
  };

  // const quotes = await getQuotes();
  // quotes.push(newQuote);

  data.push(newQuote);

  const quotesJSON = JSON.stringify(data);
  await fs.writeFile(fileName, quotesJSON, 'utf-8');
  console.log('Complete');

  return newQuote;
}

export async function getQuotes() {}

export async function getRandomQuote() {}

export async function editQuote(id, quoteText) {}

export async function deleteQuote(id) {}
