const http = require('http');
const url = require('url');
const getMS = require('./getMilliseconds');

function sendRequest (config){

  const cookie = "credential=" + config.cookie;
  const token = config.token;
  const gatewayUrl = "http://192.168.0.1/snmpSet?oid=1.3.6.1.2.1.69.1.1.3.0=1;2;&_n=" 
    + token + "&_=" + getMS();
  const urlObj = url.parse(gatewayUrl);


  const promise = new Promise((resolve, reject) => {
    const options = {
      port: urlObj.port,
      host: urlObj.hostname,
      method: 'get',
      path: urlObj.path,
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
        "Accept": "text/plain, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en,zh-CN;q=0.9,zh;q=0.8",
        "X-Requested-With": "XMLHttpRequest",
        "Cookie": cookie
      }
    }

    const request = http.request(options, (resp) => {

        let responseBody = "";
        resp.on("data", d => {
            responseBody = responseBody + d;
        });

        resp.on("end", () => {
            console.log("Reboot is done and the return body is " + responseBody);
            resolve(responseBody);
        });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
      reject();
    });
    request.end();
  });
  return promise;
}

module.exports = sendRequest;