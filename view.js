const nano = require('nano')('http://admin:password@localhost:5990/');
const db = nano.use('medicines_sample')
// console.log(db)
async function viewMDB(){
    const  body = await db.view('by_name_code', 'new-view', { key: key.includes('Cheston Cold Tablet'), include_docs: true })
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