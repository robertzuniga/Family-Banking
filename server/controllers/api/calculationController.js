const controller = require('express').Router();

var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appfX5sQa53WlKBDg');


// Create Financial Calculator records

//////////////////////////////////////////////////////////////////////
// Create => Post to Server (calculationController.js) to AirTable db 
//////////////////////////////////////////////////////////////////////


controller.post('/', (req,res) => {
    //req.body contains present value / rate / periods / years

 var user_id = req.body.user_id;
  var present_value = req.body.present_value;
  var rate=req.body.rate;
  var periods=req.body.periods;
  var years=req.body.years;
 
    base('Financial Calculator').create({
      "user_id": user_id,
      "present_value": present_value,
      "rate": rate,
      "periods": periods,
      "years": years
  }, function(err, record) {
    if (err) {
      console.error("controller.post ==>",err);
      return;
    }
    console.log(record.getId());
  });

})
 
// myRetrieve a Financial Calculator record

// controller.get('/', (req,res) => {

//   base('Financial Calculator').find('recvzk8qUIcZEXrHG', function(err, record) {
//     if (err) { console.error("myRetrieve ==> ",err); return; }
//     console.log('Retrieved', record.id);
//   });

// })

//my Update Financial Calculator records

// base('Financial Calculator').update("recvzk8qUIcZEXrHG", {
//   "User ID": 1,
//   "Present Value": 50000,
//   "Rate": 0.1,
//   "Periods": 4,
//   "Years": 5
// }, function(err, record) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(record.get('User ID'));
// });

// my Delete Record
// base('Financial Calculator').destroy('recvzk8qUIcZEXrHG', function(err, deletedRecord) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Deleted record', deletedRecord.id);
// });



module.exports = controller;