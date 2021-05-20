var Airtable = require('airtable');
// const table = new Airtable({apiKey: APIKEY}).base('appXZRW3UphpXJY9l');
const KEY = process.env.AIRTABLE_KEY;
const base = new Airtable({apiKey: KEY,}).base('appXZRW3UphpXJY9l');

const table = base('table');



// maps over the records, calling minifyRecord, giving us required data
const getMinifiedRecords = records => {
  return records.map(record => minifyRecord(record));
};

// gets the data we want and puts it into variables
const minifyRecord = record => {
  return {
    id: record.id,
    fields: record.fields,
  };
};

export default async function getPosts() {
  const records = await table.select({}).all();
  const minifiedRecords = await getMinifiedRecords(records);

  return minifiedRecords;
}

function pre(string) {
  return '/project/' + string
}

function dedup(array) {
  return [...new Set(array)];
}

export async function getPaths() {
  const records = await table.select({}).all();
  const minifiedRecords = await getMinifiedRecords(records);
  var ids = [];
  for (var record in minifiedRecords) {
    // console.log(minifiedRecords[record]);
    ids.push(pre(minifiedRecords[record].fields.Name.toLowerCase()));
  }
  // console.log(dedup(ids))
  return dedup(ids)
}

export async function getPostData(id) {
  const records = await table.select({}).all();
  const minifiedRecords = await getMinifiedRecords(records);
  console.log(minifiedRecords);
}