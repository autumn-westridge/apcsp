function defer() {
    var res;
    var promise = new Promise((resolve) => {
        res = resolve;
    });
    promise.resolve = res;

    console.log("inside of defer");

    // This is what we use to know when the call is complete
    return promise;
}

var that = this;
this.aPromise = defer();
this.aPromise.then((value) => {
    console.log("YES FINISHE")
    console.log(value);
    console.log("Start the next step now")
});

console.log("outside of defer");

setTimeout(function () {
    console.log("in setTimeout function");
    that.aPromise.resolve("A PROMISE IS RESOLVE");
}, 2000);