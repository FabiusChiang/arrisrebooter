function getCredentials(userName, password) {
  let data = `${userName}:${password}`;
  let buff = new Buffer.alloc(data.length, data);
  let base64data = buff.toString('base64');
  console.log('"' + data + '" converted to Base64 is "' + base64data + '"');
  return base64data;
}

module.exports = getCredentials;