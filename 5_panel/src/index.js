var req = (function () {

  this.test = function(val, fn) {
    nanoajax.ajax({url:'https://httpbin.org/get'}, function(code, responseText) {
console.log("beginning");
      console.log("got here");
      fn(code, responseText);
    });

    return val + "and so it begins";
  }

  return {
    test: this.test
  }


})();

function tester(code, res) {
  console.log(res);
  console.log(code);
}

console.log(req.test("really",tester));
