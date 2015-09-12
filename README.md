ObjectKit
=========

ObjectKit is a better object handler for JavaScript, forked from [Brototype](https://github.com/letsgetrandy/brototype) (and [brotied](http://brotie.jdauriemma.com/) so that we actually have a chance at remembering what some of these functions do!)

So what does ObjectKit actually do?

We've all seen something like this:
`var myURL = app.config.environments.dev.url;`
which leads to one of our favorite javascript errors:
`error: undefined is not a function`

> */ragequit* :@

And the solution:
```js
var myURL;
if (app && 
    app.config && 
    app.config.environments && 
    app.config.environments.dev && 
    app.config.environments.dev.url) {
    myURL = app.config.environments.dev.url;
}
```

We all hate that, don't we? (And it gets even worse if we use `.hasOwnProperty()`)

So what if you could just type:
```js
var myURL;
if (ok(app).check('config.environment.environments.dev')) {
    myURL = app.config.environments.dev.url;
}
```

Or even simpler:

```js
var myURL = ok(app).getIfExists('config.environments.dev.url');
```

## Important
In version 0.1.0 and higher, the self-executing nature of objectkit has been deprecated in favor of a more Node.js-style syntax. As such, going forward, this fork only will be tested and targetted at Node.js implementations.

Additionally, `Ok` has been changed to lowercase `ok` in the examples, and `.Ok` is no longer required to initialize `require('objectkit')`.

## Installing
Object Kit is available via npm:

```bash
# via npm
$ npm install objectkit
```

## Adding to your Node.js project
```js
var ok = require('objectkit');
```

## Functions


### **.check**

Check to see if the object exists:

```js
if (Ok(app).check('config.environment.buildURL')) {
    myURL = app.config.environment.buildURL('dev');
}
```

`.check()` also works with `[]` object notation. To check for:

```js
app['soap:Envelope']['soap:Body'][0].getResponse[0]['rval'][0].customerId[0]
```

do:

```js
var customerId;
if (ok(app).check("soap:Envelope.soap:Body.0.getResponse.0.rval.0.customerId.0")) {
    customerId = app['soap:Envelope']['soap:Body'][0].getResponse[0]['rval'][0].customerId[0];
}
```

You can also access a callback for the target object:

```js
ok(object)
    .check('property.with.subproperty', function(subproperty) {
        console.log(subproperty);
    });
```

### **.ifExists.do**

A convenience builder method to check if a nested property exists and do something with the target object:

```js
var myURL;
Ok(app)
    .ifExists('config.environment.buildURL')
    .do(function(buildURL){
        myURL = buildURL('dev');
    });
```

Or directly execute a method:

```js
Ok(object)
    .ifExists('method')
    .do(function(returnVal) {
        console.log('object.method() returned ', returnVal);
    });
```

### **.true** and **.false**

An object alias BOOLs for `true` and `false`:

```js
if(ok(object).check('lift') === Ok.true) {
    console.log(object.lift);
}
```

### **.getIfExists**

Conveniently retrieve the nested value if it exists, else return undefined:
```js
// get a value if it exists
var value = ok(object).getIfExists('property');

// get an array of values for paths that exist
var values = ok(object).getIfExists(['name', 'username', 'email']);
```

### **.try** and **.catch**

Handle exceptions for nested methods:

```js
ok(object)
    .try('method.name')
    .catch(function(e) {
        console.log('error ' + e + ' happened.');
    });
```

### **.exists**

Check if any accessible variable exists:

```js
if (ok(someVar).exists() === Ok.true) {
    // do stuff
}
```

### **.list**

Get a list of object keys:

```js
var object = {foo: 1, bar: 2};
ok(object).list();
// returns ['foo', 'bar'];
// equivalent to Object.keys(object)
```

### **.mergeWith**

Extend one object onto another:
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
When we bromide Brototype, things changed. If you're looking at reworking your impelemtnation, this is what we changed:

```
Bromise > ObjectKit
Bro > ok
bro > (effectively removed in 0.1.0)
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

Randy Hunt, brotied and modified by Brandon Shelley

## License

The MIT License

Copyright © 2015

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
