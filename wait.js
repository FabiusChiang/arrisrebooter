
function wait(seconds){
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
    return promise;
}

module.exports = wait;