const http = require('http');
const url = require('url');
const getMS = require('./getMilliseconds');

function getRandomToken() {
    return Math.round(Math.random() * 1000);
}

function sendRequest (base64Credential){

  const randomRoken = getRandomToken();
  const gatewayUrl = `http://192.168.0.1/login?arg=${base64Credential}=&_n=` 
    + randomRoken + "&_=" + getMS();
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
        "X-Requested-With": "XMLHttpRequest"
      }
    }

    const request = http.request(options, (resp) => {

        let responseBody = "";
        resp.on("data", d => {
            responseBody = responseBody + d;
        });

        resp.on("end", () => {
            console.log("Login is done and the cookie length is " + responseBody.length);
            const retVal = {
                cookie: responseBody,
                token: randomRoken
            };
            debugger;
            resolve(retVal);
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