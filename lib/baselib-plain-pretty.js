var _$rapyd$_iterator_symbol = (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") ? Symbol.iterator : "iterator-Symbol-5d0927e5554349048cf0e3762a228256";
var _$rapyd$_kwargs_symbol = (typeof Symbol === "function") ? Symbol("kwargs-object") : "kwargs-object-Symbol-5d0927e5554349048cf0e3762a228256";
var _$rapyd$_cond_temp;
var abs = (function abs() {
            return Math.abs;
        })();
var max = (function max() {
            return Math.max;
        })();
var min = (function min() {
            return Math.min;
        })();
function dir(item) {
            var arr;
            arr = _$rapyd$_list_decorate([]);
            for (var i in item) {
                arr.push(i);
            }
            return arr;
        }
function enumerate(iterable) {
            var ans, iterator;
            if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = Array.isArray(iterable))) ? _$rapyd$_cond_temp : typeof iterable === "string")) {
                ans = {
                    "_i": -1,
                    "next": function() {
                        this._i += 1;
                        if (_$rapyd$_bool(this._i < iterable.length)) {
                            return {
                                "done": false,
                                "value": _$rapyd$_list_decorate([ this._i, iterable[this._i] ])
                            };
                        }
                        return {
                            "done": true
                        };
                    }
                };
                ans[_$rapyd$_iterator_symbol] = function() {
                    return this;
                };
                return ans;
            }
            if (_$rapyd$_bool(typeof iterable[_$rapyd$_iterator_symbol] === "function")) {
                iterator = ((_$rapyd$_bool(_$rapyd$_cond_temp = typeof Map === "function")) ? iterable instanceof Map : _$rapyd$_cond_temp) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
                ans = {
                    "_iterator": iterator,
                    "_i": -1,
                    "next": function() {
                        var r;
                        r = this._iterator.next();
                        if (_$rapyd$_bool(r.done)) {
                            return {
                                "done": true
                            };
                        }
                        this._i += 1;
                        return {
                            "done": false,
                            "value": _$rapyd$_list_decorate([ this._i, r.value ])
                        };
                    }
                };
                ans[_$rapyd$_iterator_symbol] = function() {
                    return this;
                };
                return ans;
            }
            return enumerate(Object.keys(iterable));
        }
function iter(iterable) {
            var ans;
            if (_$rapyd$_bool(typeof iterable[_$rapyd$_iterator_symbol] === "function")) {
                return ((_$rapyd$_bool(_$rapyd$_cond_temp = typeof Map === "function")) ? iterable instanceof Map : _$rapyd$_cond_temp) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
            }
            if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = Array.isArray(iterable))) ? _$rapyd$_cond_temp : typeof iterable === "string")) {
                ans = {
                    "_i": -1,
                    "next": function() {
                        this._i += 1;
                        if (_$rapyd$_bool(this._i < iterable.length)) {
                            return {
                                "done": false,
                                "value": iterable[this._i]
                            };
                        }
                        return {
                            "done": true
                        };
                    }
                };
                ans[_$rapyd$_iterator_symbol] = function() {
                    return this;
                };
                return ans;
            }
            return iter(Object.keys(iterable));
        }
function _$rapyd$_extends(child, parent) {
            child.prototype = Object.create(parent.prototype);
            child.prototype.constructor = child;
        }
function _$rapyd$_flatten(arr) {
            var ans, value;
            ans = _$rapyd$_list_decorate([]);
            for (var i=0; i<arr.length; i++) {
                value = arr[i];
                if (_$rapyd$_bool(Array.isArray(value))) {
                    ans = ans.concat(_$rapyd$_flatten(value));
                } else {
                    ans.push(value);
                }
            }
            return ans;
        }
var _$rapyd$_in = (function _$rapyd$_in() {
            if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = typeof Map === "function")) ? typeof Set === "function" : _$rapyd$_cond_temp)) {
                return function(val, arr) {
                    if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = Array.isArray(arr))) ? _$rapyd$_cond_temp : typeof arr === "string")) {
                        return arr.indexOf(val) !== -1;
                    }
                    if (_$rapyd$_bool(typeof arr.__contains__ === "function")) {
                        return arr.__contains__(val);
                    }
                    if (_$rapyd$_bool((arr instanceof Map || arr instanceof Set))) {
                        return arr.has(val);
                    }
                    return arr.hasOwnProperty(val);
                };
            }
            return function(val, arr) {
                if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = Array.isArray(arr))) ? _$rapyd$_cond_temp : typeof arr === "string")) {
                    return arr.indexOf(val) !== -1;
                }
                if (_$rapyd$_bool(typeof arr.__contains__ === "function")) {
                    return arr.__contains__(val);
                }
                return arr.hasOwnProperty(val);
            };
        })();
function _$rapyd$_Iterable(iterable) {
            var iterator, ans, result;
            if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = Array.isArray(iterable))) ? _$rapyd$_cond_temp : typeof iterable === "string")) {
                return iterable;
            }
            if (_$rapyd$_bool(typeof iterable[_$rapyd$_iterator_symbol] === "function")) {
                iterator = ((_$rapyd$_bool(_$rapyd$_cond_temp = typeof Map === "function")) ? iterable instanceof Map : _$rapyd$_cond_temp) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
                ans = _$rapyd$_list_decorate([]);
                result = iterator.next();
                while (_$rapyd$_bool(!(_$rapyd$_bool(result.done)))) {
                    ans.push(result.value);
                    result = iterator.next();
                }
                return ans;
            }
            return Object.keys(iterable);
        }
var len = (function _$rapyd$_len() {
            if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = typeof Set === "function")) ? typeof Map === "function" : _$rapyd$_cond_temp)) {
                return function(obj) {
                    if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = Array.isArray(obj))) ? _$rapyd$_cond_temp : typeof obj === "string")) {
                        return obj.length;
                    }
                    if (_$rapyd$_bool((obj instanceof Set) ? obj instanceof Set : obj instanceof Map)) {
                        return obj.size;
                    }
                    return Object.keys(obj).length;
                };
            }
            return function(obj) {
                if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = Array.isArray(obj))) ? _$rapyd$_cond_temp : typeof obj === "string")) {
                    return obj.length;
                }
                return Object.keys(obj).length;
            };
        })();
function range(start, stop, step) {
            var length;
            if (_$rapyd$_bool(arguments.length <= 1)) {
                stop = (start) ? start : 0;
                start = 0;
            }
            step = (_$rapyd$_bool(_$rapyd$_cond_temp = arguments[2])) ? _$rapyd$_cond_temp : 1;
            length = Math.max(Math.ceil((stop - start) / step), 0);
            return (function(){
                var d = {};
                d[_$rapyd$_iterator_symbol] = function() {
                    return this;
                };
                d["_i"] = start - step;
                d["_idx"] = -1;
                d["next"] = function() {
                    this._i += step;
                    this._idx += 1;
                    if (_$rapyd$_bool(this._idx >= length)) {
                        return {
                            "done": true
                        };
                    }
                    return {
                        "done": false,
                        "value": this._i
                    };
                };
                return d;
            })();
        }
function reversed(iterable) {
            var ans;
            if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = Array.isArray(iterable))) ? _$rapyd$_cond_temp : typeof iterable === "string")) {
                ans = {
                    "_i": iterable.length,
                    "next": function() {
                        this._i -= 1;
                        if (_$rapyd$_bool(this._i > -1)) {
                            return {
                                "done": false,
                                "value": iterable[this._i]
                            };
                        }
                        return {
                            "done": true
                        };
                    }
                };
                ans[_$rapyd$_iterator_symbol] = function() {
                    return this;
                };
                return ans;
            }
            throw TypeError("reversed() can only be called on arrays or strings");
        }
function getattr(obj, name, defval) {
            var ret;
            try {
                ret = obj[name];
            } catch (_$rapyd$_Exception) {
                if (_$rapyd$_Exception instanceof TypeError) {
                    if (_$rapyd$_bool(defval === undefined)) {
                        throw new AttributeError("The attribute " + name + " is not present");
                    }
                    return defval;
                } else {
                    throw _$rapyd$_Exception;
                }
            }
            if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = ret === undefined)) ? !((name in obj)) : _$rapyd$_cond_temp)) {
                if (_$rapyd$_bool(defval === undefined)) {
                    throw new AttributeError("The attribute " + name + " is not present");
                }
                ret = defval;
            }
            return ret;
        }
function setattr(obj, name, value) {
            obj[name] = value;
        }
function hasattr(obj, name) {
            return name in obj;
        }
var _$rapyd$_desugar_kwargs = (function _$rapyd$_desugar_kwargs() {
            if (_$rapyd$_bool(typeof Object.assign === "function")) {
                return function() {
                    var ans;
                    ans = {};
                    ans[_$rapyd$_kwargs_symbol] = true;
                    return Object.assign.apply(ans, arguments);
                };
            }
            return function() {
                var ans, keys;
                ans = {};
                ans[_$rapyd$_kwargs_symbol] = true;
                for (var i = 0; i < arguments.length; i++) {
                    keys = Object.keys(arguments[i]);
                    for (var j = 0; j < keys.length; j++) {
                        ans[keys[j]] = arguments[i][keys[j]];
                    }
                }
                return ans;
            };
        })();
function _$rapyd$_bool(val) {
    var func;
    if (val == undefined) {
        return false;
    }
    if (Array.isArray(val)) {
        return val.length > 0;
    }
    func = null;
    if (typeof (func = val.__bool__) === "function") {
        return func();
    }
    if (typeof (func = val.__len__) === "function") {
        return func() > 0;
    }
    return !!val;
}
function _$rapyd$_bind(fn, thisArg) {
    var ret;
    if (_$rapyd$_bool(fn.orig)) {
        fn = fn.orig;
    }
    if (_$rapyd$_bool(thisArg === false)) {
        return fn;
    }
    ret = function() {
        return fn.apply(thisArg, arguments);
    };
    ret.orig = fn;
    return ret;
}
function _$rapyd$_rebind_all(thisArg, rebind) {
    if (_$rapyd$_bool(typeof rebind === "undefined")) {
        rebind = true;
    }
    for (var p in thisArg) {
        if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = thisArg[p])) ? thisArg[p].orig : _$rapyd$_cond_temp)) {
            if (_$rapyd$_bool(rebind)) {
                thisArg[p] = _$rapyd$_bind(thisArg[p], thisArg);
            } else {
                thisArg[p] = thisArg[p].orig;
            }
        }
    }
}
function _$rapyd$_eslice(arr, step, start, end) {
    var isString;
    arr = arr.slice(0);
    if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = typeof arr === "string")) ? _$rapyd$_cond_temp : arr instanceof String)) {
        isString = true;
        arr = arr.split("");
    }
    if (_$rapyd$_bool(step < 0)) {
        step = -step;
        arr.reverse();
        if (_$rapyd$_bool(typeof start !== "undefined")) {
            start = arr.length - start - 1;
        }
        if (_$rapyd$_bool(typeof end !== "undefined")) {
            end = arr.length - end - 1;
        }
    }
    if (_$rapyd$_bool(typeof start === "undefined")) {
        start = 0;
    }
    if (_$rapyd$_bool(typeof end === "undefined")) {
        end = arr.length;
    }
    arr = arr.slice(start, end).filter(function(e, i) {
        return i % step === 0;
    });
    return (isString) ? arr.join("") : arr;
}
function _$rapyd$_mixin(target, source, overwrite) {
    for (var i in source) {
        if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = (_$rapyd$_bool(_$rapyd$_cond_temp = source.hasOwnProperty(i))) ? overwrite : _$rapyd$_cond_temp)) ? _$rapyd$_cond_temp : typeof target[i] === "undefined")) {
            target[i] = source[i];
        }
    }
}
function _$rapyd$_print() {
    if (_$rapyd$_bool(typeof console === "object")) {
        console.log.apply(console, arguments);
    }
}
var bool = _$rapyd$_bool, bind = _$rapyd$_bind, rebind_all = _$rapyd$_rebind_all;
var float = parseFloat, int = parseInt, rebind_all = _$rapyd$_rebind_all;
var mixin = _$rapyd$_mixin, print = _$rapyd$_print, eslice = _$rapyd$_eslice;
function _$rapyd$_list_extend(iterable) {
    var start, iterator, result;
    if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = Array.isArray(iterable))) ? _$rapyd$_cond_temp : typeof iterable === "string")) {
        start = this.length;
        this.length += iterable.length;
        for (var i = 0; i < iterable.length; i++) {
            this[start + i] = iterable[i];
        }
    } else {
        iterator = ((_$rapyd$_bool(_$rapyd$_cond_temp = typeof Map === "function")) ? iterable instanceof Map : _$rapyd$_cond_temp) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
        result = iterator.next();
        while (_$rapyd$_bool(!(_$rapyd$_bool(result.done)))) {
            this.push(result.value);
            result = iterator.next();
        }
    }
}
function _$rapyd$_list_index(val, start, stop) {
    var idx;
    start = (start) ? start : 0;
    if (_$rapyd$_bool(start < 0)) {
        start = this.length + start;
    }
    if (_$rapyd$_bool(start < 0)) {
        throw new ValueError(val + " is not in list");
    }
    if (_$rapyd$_bool(stop === undefined)) {
        idx = this.indexOf(val, start);
        if (_$rapyd$_bool(idx === -1)) {
            throw new ValueError(val + " is not in list");
        }
        return idx;
    }
    if (_$rapyd$_bool(stop < 0)) {
        stop = this.length + stop;
    }
    for (var i = start; i < stop; i++) {
        if (_$rapyd$_bool(this[i] === val)) {
            return i;
        }
    }
    throw new ValueError(val + " is not in list");
}
function _$rapyd$_list_pop(index) {
    var ans;
    if (_$rapyd$_bool(this.length === 0)) {
        throw new IndexError("list is empty");
    }
    ans = this.splice(index, 1);
    if (_$rapyd$_bool(!(_$rapyd$_bool(ans.length)))) {
        throw new IndexError("pop index out of range");
    }
    return ans[0];
}
function _$rapyd$_list_remove(value) {
    var idx;
    idx = this.indexOf(value);
    if (_$rapyd$_bool(idx === -1)) {
        throw new ValueError(value + " not in list");
    }
    this.splice(idx, 1);
}
function _$rapyd$_list_to_string() {
    return "[" + this.join(", ") + "]";
}
function _$rapyd$_list_insert(index, val) {
    if (_$rapyd$_bool(index < 0)) {
        index += this.length;
    }
    index = min(this.length, max(index, 0));
    if (_$rapyd$_bool(index === 0)) {
        this.unshift(val);
        return;
    }
    for (var i = this.length; i > index; i--) {
        this[i] = this[i - 1];
    }
    this[index] = val;
}
function _$rapyd$_list_copy() {
    return _$rapyd$_list_constructor(this);
}
function _$rapyd$_list_clear() {
    this.length = 0;
}
function _$rapyd$_list_as_array() {
    return Array.prototype.slice.call(this);
}
function _$rapyd$_list_count(value) {
    return this.reduce(function(n, val) {
        return n + (val === value);
    }, 0);
}
function _$rapyd$_list_sort_key(value) {
    var t;
    t = typeof value;
    if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = t === "string")) ? _$rapyd$_cond_temp : t === "number")) {
        return value;
    }
    return value.toString();
}
function _$rapyd$_list_sort_cmp(a, b) {
    if (_$rapyd$_bool(a < b)) {
        return -1;
    }
    if (_$rapyd$_bool(a > b)) {
        return 1;
    }
    return 0;
}
function _$rapyd$_list_sort() {
    var key = (arguments[0] === undefined || ( 0 === arguments.length-1 && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? (null) : arguments[0];
    var reverse = (arguments[1] === undefined || ( 1 === arguments.length-1 && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? (false) : arguments[1];
    var _$rapyd$_kwargs_obj = arguments[arguments.length-1];
    if (typeof _$rapyd$_kwargs_obj !== "object" || _$rapyd$_kwargs_obj [_$rapyd$_kwargs_symbol] !== true) _$rapyd$_kwargs_obj = {};
    if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "key")){
        key = _$rapyd$_kwargs_obj.key;
    }
    if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "reverse")){
        reverse = _$rapyd$_kwargs_obj.reverse;
    }
    var mult, keymap, k;
    key = (key) ? key : _$rapyd$_list_sort_key;
    mult = (reverse) ? -1 : 1;
    keymap = {};
    for (var i=0; i < this.length; i++) {
        k = this[i];
        keymap[k] = key(k);
    }
    this.sort(function(a, b) {
        return mult * _$rapyd$_list_sort_cmp(keymap[a], keymap[b]);
    });
}
function _$rapyd$_list_concat() {
    var ans;
    ans = Array.prototype.concat.apply(this, arguments);
    _$rapyd$_list_decorate(ans);
    return ans;
}
function _$rapyd$_list_slice() {
    var ans;
    ans = Array.prototype.slice.apply(this, arguments);
    _$rapyd$_list_decorate(ans);
    return ans;
}
function _$rapyd$_list_iterator(value) {
    var self;
    self = this;
    return {
        "_i": -1,
        "_list": self,
        "next": function() {
            this._i += 1;
            if (_$rapyd$_bool(this._i >= this._list.length)) {
                return {
                    "done": true
                };
            }
            return {
                "done": false,
                "value": this._list[this._i]
            };
        }
    };
}
function _$rapyd$_list_len() {
    return this.length;
}
function _$rapyd$_list_contains(val) {
    return this.indexOf(val) !== -1;
}
function _$rapyd$_list_decorate(ans) {
    ans.append = Array.prototype.push;
    ans.toString = _$rapyd$_list_to_string;
    ans.inspect = _$rapyd$_list_to_string;
    ans.extend = _$rapyd$_list_extend;
    ans.index = _$rapyd$_list_index;
    ans.pypop = _$rapyd$_list_pop;
    ans.remove = _$rapyd$_list_remove;
    ans.insert = _$rapyd$_list_insert;
    ans.copy = _$rapyd$_list_copy;
    ans.clear = _$rapyd$_list_clear;
    ans.count = _$rapyd$_list_count;
    ans.concat = _$rapyd$_list_concat;
    ans.pysort = _$rapyd$_list_sort;
    ans.slice = _$rapyd$_list_slice;
    ans.as_array = _$rapyd$_list_as_array;
    ans.__len__ = _$rapyd$_list_len;
    ans.__contains__ = _$rapyd$_list_contains;
    ans.constructor = _$rapyd$_list_constructor;
    if (_$rapyd$_bool(typeof ans[_$rapyd$_iterator_symbol] !== "function")) {
        ans[_$rapyd$_iterator_symbol] = _$rapyd$_list_iterator;
    }
    return ans;
}
function _$rapyd$_list_constructor(iterable) {
    var ans, iterator, result;
    if (_$rapyd$_bool(iterable === undefined)) {
        ans = _$rapyd$_list_decorate([]);
    } else if (_$rapyd$_bool((_$rapyd$_bool(_$rapyd$_cond_temp = Array.isArray(iterable))) ? _$rapyd$_cond_temp : typeof iterable === "string")) {
        ans = new Array(iterable.length);
        for (var i = 0; i < iterable.length; i++) {
            ans[i] = iterable[i];
        }
    } else if (_$rapyd$_bool(typeof iterable[_$rapyd$_iterator_symbol] === "function")) {
        iterator = ((_$rapyd$_bool(_$rapyd$_cond_temp = typeof Map === "function")) ? iterable instanceof Map : _$rapyd$_cond_temp) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
        ans = _$rapyd$_list_decorate([]);
        result = iterator.next();
        while (_$rapyd$_bool(!(_$rapyd$_bool(result.done)))) {
            ans.push(result.value);
            result = iterator.next();
        }
    } else if (_$rapyd$_bool(typeof iterable === "number")) {
        ans = new Array(iterable);
    } else {
        ans = Object.keys(iterable);
    }
    return _$rapyd$_list_decorate(ans);
}
_$rapyd$_list_constructor.__name__ = "list";
var list = _$rapyd$_list_constructor;
var list_wrap = _$rapyd$_list_decorate;
var Exception = Error;
function AttributeError() {
    AttributeError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(AttributeError, Error);
AttributeError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = new Error().stack;
};
AttributeError.prototype.name = "AttributeError";

function IndexError() {
    IndexError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(IndexError, Error);
IndexError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = new Error().stack;
};
IndexError.prototype.name = "IndexError";

function KeyError() {
    KeyError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(KeyError, Error);
KeyError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = new Error().stack;
};
KeyError.prototype.name = "KeyError";

function ValueError() {
    ValueError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(ValueError, Error);
ValueError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = new Error().stack;
};
ValueError.prototype.name = "ValueError";

function sum(iterable, start) {
    var ans, iterator, r;
    if (_$rapyd$_bool(Array.isArray(iterable))) {
        return iterable.reduce(function(prev, cur) {
            return prev + cur;
        }, (start) ? start : 0);
    }
    ans = (start) ? start : 0;
    iterator = iter(iterable);
    r = iterator.next();
    while (_$rapyd$_bool(!(_$rapyd$_bool(r.done)))) {
        ans += r.value;
        r = iterator.next();
    }
    return ans;
}
function map() {
    var func, iterators, args;
    func = arguments[0];
    iterators = new Array(arguments.length - 1);
    args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++) {
        iterators[i - 1] = iter(arguments[i]);
    }
    return (function(){
        var d = {};
        d["_func"] = func;
        d["_iterators"] = iterators;
        d["_args"] = args;
        d["next"] = function() {
            var r;
            for (var i = 0; i < this._iterators.length; i++) {
                r = this._iterators[i].next();
                if (_$rapyd$_bool(r.done)) {
                    return {
                        "done": true
                    };
                }
                this._args[i] = r.value;
            }
            return {
                "done": false,
                "value": this._func.apply(undefined, this._args)
            };
        };
        d[_$rapyd$_iterator_symbol] = function() {
            return this;
        };
        return d;
    })();
}
function filter(func_or_none, iterable) {
    return (function(){
        var d = {};
        d["_iterator"] = iter(iterable);
        d["_func"] = (func_or_none === null) ? bool : func_or_none;
        d["next"] = function() {
            var r;
            r = this._iterator.next();
            while (_$rapyd$_bool(!(_$rapyd$_bool(r.done)))) {
                if (_$rapyd$_bool(this._func(r.value))) {
                    return r;
                }
                r = this._iterator.next();
            }
            return {
                "done": true
            };
        };
        d[_$rapyd$_iterator_symbol] = function() {
            return this;
        };
        return d;
    })();
}
function zip() {
    var iterators;
    iterators = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
        iterators[i] = iter(arguments[i]);
    }
    return (function(){
        var d = {};
        d["_iterators"] = iterators;
        d["next"] = function() {
            var args, r;
            args = new Array(this._iterators.length);
            for (var i = 0; i < this._iterators.length; i++) {
                r = this._iterators[i].next();
                if (_$rapyd$_bool(r.done)) {
                    return {
                        "done": true
                    };
                }
                args[i] = r.value;
            }
            return {
                "done": false,
                "value": args
            };
        };
        d[_$rapyd$_iterator_symbol] = function() {
            return this;
        };
        return d;
    })();
}
var _$rapyd$_regenerator = {};
!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; 

  var iteratorSymbol =
    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {

      module.exports = runtime;
    }

    return;
  }

  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {

    var generator = Object.create((outerFn || Generator).prototype);

    generator._invoke = makeInvokeMethod(
      innerFn, self || null,
      new Context(tryLocsList || [])
    );

    return generator;
  }
  runtime.wrap = wrap;

  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  var ContinueSentinel = {};

  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||

        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    genFun.__proto__ = GeneratorFunctionPrototype;
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {

    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument
        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
        : Promise.resolve(value).then(function(unwrapped) {

            result.value = unwrapped;
            return result;
          });
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      var enqueueResult =

        previousPromise ? previousPromise.then(function() {
          return invoke(method, arg);
        }) : new Promise(function(resolve) {
          resolve(invoke(method, arg));
        });

      previousPromise = enqueueResult["catch"](function(ignored){});

      return enqueueResult;
    }

    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter 

      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {

            context.delegate = null;

            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {

                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {

              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            method = "throw";
            arg = record.arg;
            continue;
          }

          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {

            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {

          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {

              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;

          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {

    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {

          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {

          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {

        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(_$rapyd$_regenerator);
