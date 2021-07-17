
var options = {
  'url': 'https://medcdb.innoht.live:6984/inno_medicines',
  'headers': {
    'Authorization': 'Basic bWVkaWNpbmVfYWRtaW46UVh4V0QzNlVWTS4jfUw0IQ=='
  }
}

let url = 'http://admin:password@localhost:5990/'
const nano = require('nano')(url);
const db = nano.use('test_db')
const data = require('./master_data_drug.json');
// const data = require('./MedicinesSample.json')
// db.info().then(res => {
//   console.log(res)
// })
// console.log(db)
let document = []
data.forEach(element => {
  document.push({
    _id: element.code,
    ...element
  })
});

// console.log(document[212200])
// console.log(document[194554])

// async function documentCreation(doc){
//     doc.forEach(element => {
//         db.insert({ _id:element.code, ...element })
//     });

//     let info = await db.info()
//     console.log(info)
// }
console.log(data.length)
const chunk = (array, size) =>
  array.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(array.slice(i, i + size))
    return acc
  }, [])
const chunks = (a, size) =>
  Array.from(
    new Array(Math.ceil(a.length / size)),
    (_, i) => a.slice(i * size, i * size + size)
  );
const chunked = chunks(document,1000)


async function documentCreation(doc) {
  
  doc.forEach(element => {
    db.bulk({ docs: element })
  });

  let info = await db.info()
  console.log(info)
}
documentCreation(chunked)