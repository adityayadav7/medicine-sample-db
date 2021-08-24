const axios = require('axios')
var options = {
  url: 'https://medcdb.innoht.live:6984/',
  headers: {
    'Authorization': 'Basic bWVkaWNpbmVfYWRtaW46UVh4V0QzNlVWTS4jfUw0IQ=='
  },
}

let url = 'http://admin:password@localhost:5990/'
const nano = require('nano')(url);
// const viewDoc = require('./_designDoc.json')
// const nano = require('nano')(url);
const db = nano.use('inno_medicines')
const data = require('./master_data_drug.json');
// const data = require('./test.json')
// const data = require('./PathologyTestsComplete.json')
// let data = require('./Countries.json')
//require('./TimeZones.json')
//require('./CitiesIndia.json')
//require('./Specialities.json')


// const data = require('./MedicinesSample.json')
// db.info().then(res => {
//   console.log(res)
// })
// console.log(db)
// let document = []
// data.forEach(element => {
//   document.push({
//     _id: element.code,
//     ...element
//   })
// });


// async function createDb(dbName,doc){
  
//   try {
//     await nano.db.create(dbName)
    
//   } catch (error) {

//      console.log('Db already exist')
//     // process.exit(1)
//   }
//   await insertDocument(dbName,doc)
  
// }
// // createDb('timezone',data)

// async function insertDocument(dbName,doc){
//   try {
//     const db = nano.db.use(dbName)
//     const response = await db.insert(doc)
//     console.log(response)
//   } catch (error) {

//     console.log('Problem occur during document insert',error)
//   }
// }

// async function runner(doc){
//   await createDb('countries',doc)
  
// }
// runner(data)

// this for creating document of each element of data 

const chunks = (a, size) =>
  Array.from(
    new Array(Math.ceil(a.length / size)),
    (_, i) => a.slice(i * size, i * size + size)
  );
const chunked = chunks(data, 1000)


function documentCreation(doc) {
  doc.forEach(element => {
    db.bulk({ docs: element }).then(res => {
    }).catch(err => {
      console.log(err)
    })
  });
}
documentCreation(chunked)




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
// const chunk = (array, size) =>
//   array.reduce((acc, _, i) => {
//     if (i % size === 0) acc.push(array.slice(i, i + size))
//     return acc
//   }, [])




function pushDoc(doc) {
  let data = JSON.stringify({
    docs:doc
  })
  //console.log(data)
  var configlocal = {
    method: 'post',
    url: 'http://localhost:5990/inno_medicines/_bulk_docs',
    headers: { 
      'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ=',
      'Content-Type': 'application/json'
    },
    data: data
  };
  // var config = {
  //   method: 'post',
  //   url: 'https://medcdb.innoht.live:6984/inno_medicines/',
  //   headers: {
  //     'Authorization': 'Basic bWVkaWNpbmVfYWRtaW46UVh4V0QzNlVWTS4jfUw0IQ=='
  //   },
  //   data: doc
  // };
  axios(configlocal)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
//  let objTest = {docs}
// //console.log(objTest)
// pushDoc(objTest)
// console.log(x)
// db.list().then(res=>{
//   console.log(res)
// })

// db.destroy('0fc55f5eb5625109056bd51cc30023d8', '1-a8cf84310e77425d1e8f18c0980a200d').then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })