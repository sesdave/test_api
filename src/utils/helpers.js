const crypto = require('crypto');

exports.generateId = (num = 12) => {
  return crypto.randomBytes(num).toString('hex');
};

exports.generateRcNumber=(rcNumber)=>{
  console.log('started converstion');
  let prefix='RC'
  let breakRc=rcNumber.slice(2);
  breakRc++;
  let result=prefix.concat(breakRc)

  return result;
}

exports.conAuthorisation=(userType)=>{
  console.log('entered', userType);
  let userArray=userType.split(',');
  console.log('userArray', userArray);
  let retArray='';
  userArray.forEach(element => {
    retArray.concat('|',element)
  });
  console.log('retArray', retArray);
  return retArray;
}