class Example {
  constructor(server) {
    this.server = server;
  }

  // localhost/example returns "foobar"
  get() {
      return "foobar"
  }
}

module.exports = Example;
