Object Kit
=========

A better object handler for JavaScript, forked from Brototype, and [brotied](http://brotie.jdauriemma.com/) so that we actually know wtf is going on.

## Installing
Object Kit is available via npm

```bash
# via npm
$ npm install objectkit

# via bower (*not implemented*)
$ bower install objectkit
```

## Adding to your Node.js project
```js
var Ok = require('objectkit').Ok;
```

## Features

You've got a deeply-nested set of objects that may or may not always be there.
We've all seen something like this:
`var myURL = app.config.environment.buildURL('dev');`
which leads to one of our favorite javascript errors...
`error: undefined is not a function`

And the solution only makes the code base ugly:
```js
var myURL;
if (app && app.config && app.config.environment && app.config.environment.buildURL) {
    myURL = app.config.environment.buildURL('dev');
}
```

We all hate that, don't we?

So what if you could just type:
```js
var myURL;
if (Ok(app).check('config.environment.buildURL')) {
    myURL = app.config.environment.buildURL('dev');
}
```

Or better yet, how about:
```js
var myURL;
Ok(app)
    .ifExists('config.environment.buildURL')
    .do(function(buildURL){
        myURL = buildURL('dev');
    });
```

Well, now you can!

But what if you have something like this:

```js
app['soap:Envelope']['soap:Body'][0].getResponse[0]['rval'][0].customerId[0]
```

We got you covered.

```js
if (Ok(app).check("soap:Envelope.soap:Body.0.getResponse.0.rval.0.customerId.0")) {
    var thisVar = app['soap:Envelope']['soap:Body'][0].getResponse[0]['rval'][0].customerId[0];
}
```

## Features

### Testing nested members
```js
if(Ok(object).check('lift') === Ok.true) {
    console.log(object.lift);
}
```

Or, just use a callback...
```js
Ok(object)
    .check('property.subproperty', function(subproperty) {
        console.log(subproperty);
    });
```

### Fetching nested members
```js
// get a value if it exists
var value = Ok(object).getIfExists('cheezeburger');

// get an array of values for paths that exist
var values = Ok(object).getIfExists(['cheezeburger', 'money', 'beer']);
```

### Calling nested functions
```js
Ok(object)
    .ifExists('method')
    .do(function(returnVal) {
        console.log('object.method() returned ', returnVal);
    });
```

### Handling exceptions
```js
Ok(object)
    .try('method.name')
    .catch(function(e) {
        console.log('error ' + e + ' happened.');
    });
```

### Booleans
```js
Ok.true // true;
Ok.false   // false;
```

### Check for undefined
```js
if (Ok(someVar).exists() === Ok.true) {
    // do stuff
}
```

### Get a list of object keys
```js
var object = {foo: 1, bar: 2};
Ok(object).list();
// returns ['foo', 'bar'];
```

### Extending objects
```js
var obj1 = {foo: 'boo', bar: 'bar'},
    obj2 = {foo: 'bar', yes: 'no'};
Ok(obj1).mergeWith(obj2);

// now obj1.foo == 'bar' and obj1.yes == 'no'
```

### Extending Object Kit
```js
var plugin = { foo: function() { whatever; }};
Ok.prototype.mergeWith(plugin);
```

## Original Method Map
Want to know what was changed into what?

```
Bromise > ObjectKit
Bro > Ok
bro > ok
isThatEvenAThing > exists
doYouEven > check
iCanHaz > getIfExists
comeAtMe > merge
giveMeProps > list
hasRespect > has
iDontAlways > ifExists
butWhenIdo > do
braceYourself > try
hereComeTheErrors > catch
errorsAreComing > finally
TOTALLY > true
NOWAY > false
```

## Author

Randy Hunt, brotied by Brandon S.

## License

The MIT License

Copyright © 2015

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
