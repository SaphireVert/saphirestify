class Example {
  constructor(server) {
    this.server = server;
  }

  // GET localhost/example returns a json
  get(req) {
    console.log("GET request");
    return {"foo": "bar"};
  }

  post(req) {
    console.log("POST request");
    return req.body;
  }

  put(req) {
    console.log("PUT request");
    return { foo: "bar" };
  }

  patch(req) {
    console.log("PATCH request");
    return { foo: "bar" };
  }
  
  del(req) {
    console.log("DELETE request");
    return { foo: "bar" };
  }
  
  opts(req) {
    console.log("OPTIONS request");
    return { foo: "bar" };
  }
}

module.exports = Example;
