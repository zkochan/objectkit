/*global describe:false, it:false, expect:false, beforeEach:false */

var ok = require('./objectkit');
var assert = require('assert');

describe('ok.check', function() {
    it('should be defined', function() {
        var a = {};
        assert.notEqual(ok(a).check, undefined);
    });

    it('should return true for defined properties', function() {
        var a = {foo: 'bar'},
            okInstance = ok(a);
        assert.equal(okInstance.check('foo'), true);
    });

    it('should return true for nested properties', function() {
        var a = {foo: {bar: 'baz'}},
            okInstance = ok(a);
        assert.equal(okInstance.check('foo.bar'), true);
    });

    it('should return false for undefined properties', function() {
        var a = {foo: 'bar'},
            okInstance = ok(a);
        assert.equal(okInstance.check('bar'), false);
    });
});

describe('ok.getIfExists', function() {
    it('should return the value of the deep property', function() {
        var a = {b: {c: {d: 32}}},
            okInstance = ok(a);
        assert.equal(okInstance.getIfExists('b.c.d'), 32);
    });

    it('should return undefined for missing property', function() {
        var a = {b: 32},
            okInstance = ok(a);
        assert.equal(okInstance.getIfExists('b.c.d'), undefined);
    });

    it('should return an array when an array is requested', function() {
        var a = {a: 'foo', b: 'bar', c: 'fred'},
            values = ok(a).getIfExists(['a', 'b', 'c', 'd']);

        assert.notEqual(values.indexOf('foo'), -1);
        assert.notEqual(values.indexOf('bar'), -1);
        assert.notEqual(values.indexOf('fred'), -1);
    });
});

describe('ok.list', function() {
    it('should return an object\'s keys', function() {
        var a = {
                "foo": 1,
                "bar": 2
            },
            keys = ok(a).list();
        assert.equal(keys.length, 2);
        assert.notEqual(keys.indexOf('foo'), -1);
        assert.notEqual(keys.indexOf('bar'), -1);
    });
});

describe('ok.merge', function() {
    it('should extend first object with second object', function() {
        var a = {
                "foo": 1,
                "bar": 2
            },b = {
                "bar": 3,
                "baz": function(){return false;}
            };
            ok(a).merge(b);
        assert.equal(a.foo, 1);
        assert.equal(a.bar, 3);
        assert.equal(a.baz(), false);
    });
});

describe('ok.ifExists', function() {
    var fired,
        success,
        param,
        context,
        obj = {
            "foo": function() {
                fired = true;
                context = this;
                return 91;
            },
            "bar": 3
        },
        fn = function(p) {
            success = true;
            param = p;
        };

    beforeEach(function() {
        fired = false;
        success = false;
        param = null;
        context = null;
    });

    it('should check that the requested method is a function', function() {
        var okInstance = ok(obj);
        okInstance.ifExists('bar').do(fn);
        assert.equal(success, false);
        okInstance.ifExists('foo').do(fn);
        assert.equal(success, true);
    });

    it('should run the requested method if a function', function() {
        var okInstance = ok(obj);
        okInstance.ifExists('foo').do(fn);
        assert.equal(fired, true);
    });

    it('should pass the method\'s return value as param to callback', function() {
        var okInstance = ok(obj);
        okInstance.ifExists('foo').do(fn);
        assert.equal(param, 91);
    });

    it('should apply the object as its own context', function() {
        var okInstance = ok(obj);
        okInstance.ifExists('foo').do(fn);
        assert.equal(context, obj);
    });
});

describe('ok.try', function() {
    var success,
        error,
        obj = {
            "foo": function() {
                throw 'an error';
            }
        },
        fn = function(e) {
            success = true;
            error = e;
        };

    beforeEach(function() {
        success = null;
        error = null;
    });

    it('should fire the callback when an exception is thrown', function() {
        var okInstance = ok(obj);
        okInstance.try('foo').catch(fn);
        assert.equal(success, true);
    });

    it('should pass the error to the callback', function() {
        var okInstance = ok(obj);
        okInstance.try('foo').catch(fn);
        assert.equal(error, 'an error');
    });
});

describe('ok alias', function(){
  it('kind of basically works', function(){
    assert.notEqual(ok.ok.check, undefined);
  });
});
