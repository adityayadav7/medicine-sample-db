const nano = require('nano')('http://admin:password@localhost:5990/');
const db = nano.use('hospitalrun')
// console.log(db)
async function viewMDB(){
  let keyTest = {
    startkey: 'com',
    endkey: `com\ufff0`,
    include_docs: true 
  }
    const  body = await db.view('by_inventory', 'name', keyTest)
    console.log(body)
    body.rows.forEach((doc) => {
        console.log(doc.value)
      })

    //   console.log(body)
}
viewMDB()


// doc.forEach(element => {
  //     db.insert({ _id:element.code, ...element })
  // });
  // let document =[];
  // for(let i=50001;i<=60000;i++){
  //     document.push(doc[i])
  // }

    // let response = await db.bulk({ docs: document })
  // console.log(response)