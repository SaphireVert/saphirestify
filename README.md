# API Restify

API Restity is a RestifyJs based library that simply allows you to use filenames as route name.

## Get started:

Simply install npm module by typing
```
npm install saphirestify
```

And then set up files:

index.js:
```
const apiExample = require('saphirestify');

//Route hookup
apiExample.hookup({
    routesFolder: "./routes",
    server: server
});
```

routes/Example.js:
```
class Example {
  // Returns a simple json
  get(req) {
    console.log("Caught GET request");
    return {'foo': 'bar'};
  }
}

module.exports = Example;
```
> Note The route path must only have route files. Otherwise the server could not start.

Then run `node index.js`

Connect to `localhost:8081/example` and enjoy !

To illustrate how it works, here is a couple examples: 

| Filename              | Route           |
|-----------------------|-----------------|
| `routes/index.js`     | `/`             |
| `routes/example.js`   | `/example`      |
| `routes/foo/bar.js`   | `/foo/bar`      |
## Documentation
Saphirestify is a transparent extra layer that allows you to hook up the name of your files as routes names while allowing you to use all the first places restify features.
To learn how to use the restify, please refer to the [official restify documentation](http://restify.com/docs/home/)
