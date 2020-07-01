const login = require('./login');
const reboot = require('./reboot');
const getBase64Credentials = require('./getBase64Credential');
const credentialInLocal = require('./password.json');
const wait = require('./wait');

async function restart() {
  const originCredential = getBase64Credentials(credentialInLocal.userName, credentialInLocal.password);
  const credential = await login(originCredential);
  const rebootResult = await reboot(credential);
  return rebootResult;
}

async function main() {
  let waitTime = 1;
  while (waitTime < 1025){
    const result = await restart();
    if (!!result) {
      break;
    }
    console.log("Wait for " + waitTime + " seconds");
    await wait(waitTime);
    waitTime = waitTime * 2;
  }
  
}

main();