function getMillSec (){
  const d = new Date();
  const n = d.getTime();
  return n;
}

module.exports = getMillSec;