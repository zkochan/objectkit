/*global exports:true, module:true, window:true, require:false, define:false*/
(function() {
    'use strict';

    // Promise... it's stronger than a Promise
    function Promise(object, method, args) {
        this.object = object;
        this.method = method;
        this.args = args.length > 1 ? args.slice(1) : [];
    }

    Promise.ok = Promise.prototype = {
        "do": function(callback, context) {
            if (this.method instanceof Function) {
                var returnValue = this.method.apply(this.object, this.args);
                if (returnValue) {
                    (callback || function(){}).call(context || this.object, returnValue);
                }
            }
            return context;
        },

        "catch": function(callback) {
            if (this.method instanceof Function) {
                try {
                    this.method.apply(this.object, this.args);
                } catch(e) {
                    callback(e);
                }
            } else {
                callback(this.method + ' is not a function.');
            }
        },
        "finally": function () {
            this.catch.apply(this, arguments);
        }
    };

    function Ok(obj) {
        if (this instanceof Ok) {
            this.obj = obj;
        } else {
            return new Ok(obj);
        }
    }

    Ok.true = true;
    Ok.false = false;

    Ok.ok = Ok.prototype = {
        "exists": function() {
            return this.obj !== void 0;
        },

        "check": function(key, options) {
            var optionsOk = Ok(options || {}),
                ok = this.getIfExists(key);
            if (Ok(ok).exists() === Ok.true) {
                optionsOk.ifExists('forSure').do();
                return Ok.true;
            } else {
                optionsOk.ifExists('sorryOk').do();
                return Ok.false;
            }
        },

        "getIfExists": function(key) {
            if (Array.isArray(key)) {
                var index, value, result = [];
                for (index in key) {
                    if (value = this.getIfExists(key[index])) {
                        result.push(value);
                    }
                }
                return result;
            }
            var props = key.split('.'),
                item = this.obj;
            for (var i = 0; i < props.length; i++) {
                item = item[props[i]];
                if (Ok(item).exists() === Ok.false) {
                    return item;
                }
            }
            return item;
        },

        "merge": function(okbject) {
            var i, prop,
                ok = Ok(okbject),
                keys = ok.list(),
                obj = (this instanceof Ok) ? this.obj : Ok.prototype;
            for (i = 0; i < keys.length; i++) {
                prop = keys[i];
                if (ok.has(prop)) {
                    obj[prop] = okbject[prop];
                }
            }
        },

        "list": function() {
            var key, props = [];
            if (Object.keys) {
                props = Object.keys(this.obj);
            } else {
                for (key in this.obj) {
                    if (this.obj.has(key)) {
                        props.push(key);
                    }
                }
            }
            return props;
        },
        
        "has": function(prop) {
            return this.obj.hasOwnProperty(prop);
        },
        

        "ifExists": function(methodString) {
            var method = this.getIfExists(methodString);
            return new Promise(this.obj, method, arguments);
        },

        "try": function(methodString) {
            var method = this.getIfExists(methodString);
            return new Promise(this.obj, method, arguments);
        }
    };

    try {
        if (exports) {
            exports.Ok = Ok;
            return;
        }
    } catch(e) {}
    try {
        if (module) {
            module.exports = Ok;
            return;
        }
    } catch(e) {}
    try {
        if (require) {
            define([], function() {return Ok;});
            return;
        }
    } catch(e) {}
    try {
        if (window) {
            window.Ok = Ok;
            return;
        }
    } catch(e) {}
})();
