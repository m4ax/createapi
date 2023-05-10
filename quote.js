import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

const fileName = 'quotes.json';

export async function addQuote(quoteText) {
  const quotesList = await fs.readFile(fileName);
  const data = JSON.parse(quotesList);
  console.log(data);

  const newQuote = {
    id: uuidv4(),
    quoteText: quoteText,
  };

  // const quotes = await getQuotes();
  // quotes.push(newQuote);

  data.push(newQuote);

  const quotesJSON = JSON.stringify(data);
  await fs.writeFile(fileName, quotesJSON, 'utf-8');
  console.log('Complete');

  return newQuote;
}

addQuote()


export async function getQuotes() {

  const quotesList = await fs.readFile(fileName);
  const data = JSON.parse(quotesList);

  return data
}


/* 
 not take in any arguments
- read/parse all quote objects from `quotes.json`
- return a single randomly selected quote object
*/

export async function getRandomQuote() {
  const quotesList = await fs.readFile(fileName);
  const data = JSON.parse(quotesList);

  const randomNumber = Math.floor(Math.random() * data.length);

  return data[randomNumber]

}

/*export async function editQuote(id, quoteText) {
    const quotesList = await fs.readFile(fileName);
  const data = JSON.parse(quotesList);
  for(i = 0; i < data.length; i++){
  if(id === data[i][id]){
    let oldQuote = data[i][quoteText]
     oldQuote.replace(newQuote, oldQuote)
  }
  else{
     null
  }}
  
  const quotesJSON = JSON.stringify(data);
  await fs.writeFile(fileName, quotesJSON, 'utf-8');
  console.log('Complete');
  
  return 
}
*/

export async function editQuote(id, quoteText) {
    const quotesList = await fs.readFile(fileName);
    const data = JSON.parse(quotesList);
    for (let i = 0; i < data.length; i++) {
      if (id === data[i].id) {
        const oldQuote = data[i].quoteText;
        data[i].quoteText = quoteText;
        const quotesJSON = JSON.stringify(data);
        await fs.writeFile(fileName, quotesJSON, 'utf-8');
        console.log('Complete');
        return data[i];
      }
    }
    return null;
  }
  
  
  export async function deleteQuote(id) {

    const quoteList = await fs.readFile("quotes.json", 'utf-8')
    const quotes = JSON.parse(quoteList)

    const indexToDelete = quotes.findIndex(item => {
      return item.id === id
    })

    if (indexToDelete == null) {
      return null
    }

    const [deletedQuote] = quotes.splice(indexToDelete, 1)

    await fs.writeFile(fileName, JSON.stringify(quotes), 'utf-8')
    return deletedQuote
  }
  

