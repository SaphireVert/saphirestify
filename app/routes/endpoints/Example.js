class Example {
  constructor(server) {
    this.server = server;
  }

  // localhost/example returns a json
  get() {
    return { foo: "bar" };
  }
}

module.exports = Example;
