# API Restify

API Restity is a RestifyJs based library that simply allows you to use filenames as route name.

## Get started:

Simply install npm module by typing
```
npm install saphirestify
```

```
var saphirestify = require("saphirestify")

var params = {
  server: server,
  routePath: "routes",
  parseChar: "-",
  argSeparator: "/",
};

saphirestify.hookup(params);

```
### params

`server`: restify server instance

`routePath`: folder to look at 

`parseChar`: char used instead of colon in a route 

`argSeparator` (optionnal): char used to separate route name from arguments 

#### Examples 

When parseChar is set to "-" : 
| Filename                   | Route path                  |
|----------------------------|-----------------------------|
| `routes/foo-arg1/bar.js`   | `/foo:arg1/bar.js`          |

When argSeparator is set to "/" : 
| Filename                   | Route path                |
|----------------------------|------------------------------|
| `routes/foo-arg1/bar.js`   | `/foo/:arg1/bar.js`    |

When argSeparator is set to "" : 
| Filename                   | Route path                |
|----------------------------|------------------------------|
| `routes/foo-arg1/bar.js`   | `/foo:arg1/bar.js`     |
## Documentation
Saphirestify is a transparent extra layer that allows you to hook up the name of your files as routes names while allowing you to use all the first places restify features.
To learn how to use the restify, please refer to the [official restify documentation](http://restify.com/docs/home/)
