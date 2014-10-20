function ObjectBase() {
    Class.inherit(this, Object);

    var _vars = {};
    var _events = {};

    this.__proto__.defineProperty = function(name, descriptor) {
        if (descriptor === undefined)
            descriptor = {};
        _vars[name] = descriptor.default;
        var _set = descriptor.readOnly ? undefined : function(v) {
            if (v !== _vars[name]) {
                _vars[name] = v;
                _events["onPropertyValueChanged"](name);
            }
        };
        var _get = function() {
            return _vars[name];
        };
        Object.defineProperty(this, name, {set: _set, get: _get, enumerable: true});
    };

    this.__proto__.defineEvent = function(name) {
        this[name] = function(v) {
            if (v !== undefined)
                _events[name] = v;
            return _events[name];
        };
        _events[name]=function(){};
    };
    
    this.defineEvent("onPropertyValueChanged");
    /*
     * Compare objects
     * syntax
     * ObjectBase.equals(obj)
     * ObjectBase.equals(obj1, obj2)
     */
    this.__proto__.equals = function() {
        var a, b;
        if (arguments.length === 1) {
            a = this;
            b = arguments[0];
        } else {
            a = arguments[0];
            b = arguments[1];
        }
        return _equals(a, b);
    };

    function _equals(a, b) {
        // compare props amount
        if (Object.keys(a).length !== Object.keys(b).length)
            return false;
        // compare each prop
        for (var prop in a) {
            console.log(prop);
            switch (typeof (a[prop])) {
                case "string":
                case "number":
                case "boolean":
                    if (a[prop] !== b[prop])
                        return false;
                    break;
                case "function":
                    if (a[prop].toString() !== b[prop].toString())
                        return false;
                    break
                case "object":
                    if ({}.toString.apply(a[prop]) === "[object Array]") {
                        if ({}.toString.apply(b[prop]) !== "[object Array]")
                            return false;
                        for (var index in a[prop])
                            if (!_equals(a[prop][index], b[prop][index]))
                                return false;
                    } else
                    if (!_equals(a[prop], b[prop]))
                        return false;
                    break
            }
        }
        // go to proto
        if (a.type !== undefined && a.type !== "ObjectBase")
            return _equals(a[prop].__proto__, b[prop].__proto__);
        return true;
    }

    function init(args) {

    }

    init.call(this, arguments);
}

