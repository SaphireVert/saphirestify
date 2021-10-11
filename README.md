# API Restify

API Restity is a RestifyJs based library that simply allows you to use filenames as route name.

## Get started:
### NPM:
Simply install npm module by typing
```
npm install saphirestify
```

And then set up files:

index.js:
```
const apiExample = require('saphirestify');
apiExample.start('./routes', __dirname);
```

config.js:
```
module.exports = {
  port: process.env.PORT || 8081,
  server: {
    name: 'API'
  },
};

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

## Documentation
Saphirestify is just an extra layer that allows you to hook up the name of your files as routes names.
To learn how to use the restify, please refer to the [official restify documentation](http://restify.com/docs/home/)
