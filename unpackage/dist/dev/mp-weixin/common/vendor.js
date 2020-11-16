(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"JisuKangfu","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!****************************************************************!*\
  !*** /Users/jiangxiantao/Desktop/shy/Jisukangfu/config/api.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var apiRoot = 'http://www.huaxiakangfu.com:8090/';
var api = {
  common: {
    aboutUs: apiRoot + 'common/aboutUs.html',
    verify: apiRoot + "common/verify.html" },

  article: {
    index: 'https://life.weisite.org/api/article/index.html',
    category: 'https://life.weisite.org/api/article/category.html',
    detail: apiRoot + 'article/detail.html',
    comment: apiRoot + 'article/comment.html',
    commentDetail: apiRoot + "article/commentDetail.html",
    commentReply: apiRoot + "article/commentReply.html",
    addComment: apiRoot + 'article/addComment.html',
    addReply: apiRoot + 'article/addReply.html',
    like: apiRoot + "article/like.html",
    commentLike: apiRoot + "article/commentLike.html",
    commentReplyLike: apiRoot + "article/commentReplyLike.html",
    favorite: apiRoot + "article/favorite.html",
    favoriteList: apiRoot + "article/favoriteList.html" },


  shouye: {
    //首页接口
    //获取课程类型列表
    getcourseCategoryList: apiRoot + "/datatype/datatype/list",
    //推荐课程列表
    getRecommendcourseList: apiRoot + "app/home_page/recommendedCourses",
    //推荐学习班
    getRecommendClassList: apiRoot + "app/home_page/recommendedClass",
    //朋友在看
    getPengyouzaikanList: apiRoot + "app/home_page/getFriendLook",
    //轮播图
    getBannerImageList: apiRoot + "app/home_page/queryList" },

  pingdingliangbiao: {
    //获取评定列表List
    getPingDingliebiaoList: apiRoot + "app/ratingScale/listByUser",
    //评定量表下的分类
    getPingDingItemList: apiRoot + "app/questionType/listByRatingScale" },



  user: {
    //获取验证码
    getcode: apiRoot + "app/msg/sendcode",
    //手机验证码登陆
    loginCode: apiRoot + "app/user/loginByPhoneCode",
    //手机密码登陆
    loginPwd: apiRoot + "app/user/loginByPasswd",
    //密码重置
    resetPwd: apiRoot + "app/user/updateByPhoneCode",
    //设置密码
    setPwd: apiRoot + "app/user/setPasswd",


    login: apiRoot + "user/login.html",
    register: apiRoot + "user/register.html",
    index: apiRoot + "user/index.html",
    userInfo: apiRoot + "user/userInfo.html",
    updateAvatar: apiRoot + "user/updateAvatar.html",
    upload: apiRoot + "user/upload.html",
    setting: apiRoot + "user/setting.html",
    updatePassword: apiRoot + "user/updatePassword.html",
    forgot: apiRoot + "user/forgot.html",
    updatePasswordByMobile: apiRoot + "user/updatePasswordByMobile.html",
    feedback: apiRoot + "user/feedback.html",
    logout: apiRoot + "user/logout.html" },

  huanzhe: {
    //获取病症
    getillnessList: apiRoot + "app/illness/listByUser"
    //添加患者
  },
  wechat: {
    miniAppLogin: apiRoot + 'wechat/miniAppLogin',
    mpLogin: apiRoot + 'wechat/mpLogin',
    devLogin: apiRoot + 'wechat/devLogin',
    mpConfig: apiRoot + 'wechat/mpConfig' } };var _default =


api;exports.default = _default;

/***/ }),

/***/ 12:
/*!****************************************************************!*\
  !*** /Users/jiangxiantao/Desktop/shy/Jisukangfu/common/app.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _api = _interopRequireDefault(__webpack_require__(/*! @/config/api.js */ 11));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                 * tabBarUrl
                                                                                                                                                                                                                                                                 */
var tabBarUrl = [
'/pages/article/index',
'/pages/user/favorites',
'/pages/user/index'];


var objectToUrlParams = function objectToUrlParams(obj) {
  var str = "";
  for (var key in obj) {
    str += "&" + key + "=" + obj[key];
  }
  return str.substr(1);
};

/**
    * 是否登录
    */
var isLogin = function isLogin() {
  if (uni.getStorageSync("isLogin") == "1") {
    return true;
  }
  return false;
};

/**
    * 初始化登录
    */
var initLogin = function initLogin() {
  if (!isLogin()) {
    login();
  }
};

/**
    * 登录
    */
var login = function login() {
  /*清除登录缓存*/
  uni.removeStorageSync('isLogin');
  uni.removeStorageSync('accessToken');
  uni.removeStorageSync('currentUser');
  uni.removeStorageSync('platform');

  console.log('跳转登录');

  /*储存当前页*/
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  var originUrl = '/' + currentPage.route;








  uni.setStorageSync('loginOriginUrl', originUrl); //存储跳转前URL
  console.log('loginOriginUrl:' + originUrl);


  uni.navigateTo({
    url: '/pages/wechat/miniAppLogin' });












};

/*微信小程序登录初始化*/
var wechatAppLoginInit = function wechatAppLoginInit() {
  /*检测是否授权*/
  uni.getSetting({
    success: function success(res) {
      /* 已经授权直接登录*/
      if (res.authSetting['scope.userInfo']) {
        wechatAppLogin(false); //登录
      } else {
        uni.navigateTo({
          url: '/pages/wechat/miniAppLogin' });

      }
    } });

};

/*微信小程序登录*/
var wechatAppLogin = function wechatAppLogin() {var isBack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  /*登录提示*/
  uni.showLoading({
    title: "正在登录",
    mask: true });


  /*微信登录*/
  uni.login({
    provider: 'weixin',
    success: function success(loginResult) {
      var code = loginResult.code;
      console.log(loginResult);
      /*获取用户信息*/
      uni.getUserInfo({
        success: function success(result) {
          /*获取分享id*/
          var share_user_id = uni.getStorageSync('share_user_id');
          share_user_id = share_user_id > 0 ? share_user_id : 0;

          /*登录验证*/
          request({
            url: _api.default.wechat.miniAppLogin,
            data: {
              share_user_id: share_user_id,
              code: code,
              user_info: result.rawData,
              encrypted_data: result.encryptedData,
              iv: result.iv,
              signature: result.signature },

            method: 'POST',
            dataType: 'json',
            success: function success(res) {
              console.log(res);
              if (res.code == 0) {
                alert('登录成功', 'success');

                /*更新登录状态,保存用户数据*/
                var userInfo = res.data;
                uni.setStorageSync("isLogin", '1');
                uni.setStorageSync("accessToken", userInfo.token);
                uni.setStorageSync('currentUser', userInfo);
                uni.setStorageSync('platform', 'wechatMiniApp');
                uni.setStorageSync('source', 'login');
                if (userInfo.is_exist_user == 0) {
                  uni.setStorageSync('register', 1);
                }

                /*switchTab刷新*/
                var originUrl = uni.getStorageSync('loginOriginUrl');
                if (originUrl) {
                  var originUrlRoute = originUrl.split('?');
                  console.log('originUrlRoute:' + originUrlRoute);
                  if (tabBarUrl.includes(originUrlRoute[0])) {
                    uni.switchTab({
                      url: originUrlRoute[0] });

                  } else {
                    uni.navigateBack();
                  }
                } else {
                  /*登录后跳转*/
                  if (isBack) {
                    uni.navigateBack();
                  }
                }
              } else {
                alert(res.msg, 'warning');
              }
            } });

        },
        fail: function fail(result) {
          uni.hideLoading();
        } });

    } });

};

/*微信公众号登录*/
var initMPLogin = function initMPLogin() {
  /*获取登录验证url*/
  var url = location.href.split('/pages/');
  var loginUrl = '';
  if (url.length > 1) {
    loginUrl = url[0] + '/pages/wechat/mpLogin';
  } else {
    loginUrl = url[0] + 'pages/wechat/mpLogin';
  }

  /*获取分享id*/
  var share_user_id = uni.getStorageSync('share_user_id');
  share_user_id = share_user_id > 0 ? share_user_id : 0;

  /*拼装url*/
  location.href = _api.default.wechat.mpLogin + '?url=' + encodeURIComponent(loginUrl) + '&share_user_id=' + share_user_id;
};

/*检查是否有操作权限*/
var checkAuth = function checkAuth() {
  request({
    url: _api.default.user.checkAuth,
    data: {},
    method: 'POST',
    dataType: 'json',
    success: function success(res) {
      console.log('has auth');
    } });

};

/*绑定手机号码*/
var bindMobile = function bindMobile() {
  uni.navigateTo({
    url: '/pages/user/bindMobile' });

};

/*获取来源url*/
var getSourcePage = function getSourcePage() {
  var pages = getCurrentPages();
  console.log(pages);
  if (pages.length >= 2) {
    var currentPage = pages[pages.length - 2];
    var originUrl = '/' + currentPage.route;
    console.log('source:' + originUrl);
    return originUrl;
  } else {
    console.log('source:' + 'no');
    return '';
  }

};


/**
    * 网络请求
    * @param {Object} req
    */
var request = function request(req) {
  var platform = getPlatform();
  var header = {
    'Content-type': 'application/json' };

  if (req.header) {
    header = Object.assign(header, req.header);
  }
  uni.request({
    url: req.url,
    data: req.data || {},
    header: header,
    method: req.method || "GET",
    dataType: req.dataType || "json",
    success: function success(res) {
      if (res.data.code == '1000') {
        login(); //登录
      } else if (res.data.code == '1003') {
        bindMobile(); //绑定手机号码
      } else {
        if (req.success) {
          console.log(res);
          req.success(res.data);
        }
      }
    },
    fail: function fail(res) {
      console.warn('--- request fail >>>');
      console.warn(res);
      console.warn('<<< request fail ---');
      uni.showToast({
        title: '网络异常~',
        icon: 'none' });

      if (req.fail) {
        req.fail(res);
      }
    },
    complete: function complete(res) {
      if (res.statusCode != 200) {
        if (res.code == '1000') {
          login();
        }
        console.log('--- request http error >>>');
        console.log(res.statusCode);
        console.log(res.data);
        console.log('<<< request http error ---');
      }
      if (req.complete) {
        req.complete(res);
      }
    } });

};

/*上传文件*/
var uploadFile = function uploadFile(req) {
  var accessToken = uni.getStorageSync("accessToken");
  var platform = getPlatform();
  var header = {
    'platform': platform,
    'token': accessToken };

  if (req.header) {
    header = Object.assign(header, req.header);
  }
  console.log(header);
  uni.uploadFile({
    url: req.url,
    filePath: req.filePath,
    header: header,
    name: req.name || 'file',
    formData: req.formData || {},
    success: function success(res) {
      if (res.data.code == '1000') {
        login(); //登录
      } else if (res.data.code == '1003') {
        bindMobile(); //绑定手机号码
      } else {
        if (req.success) {
          req.success(JSON.parse(res.data));
        }
      }
    },
    fail: function fail(res) {
      console.warn('--- request fail >>>');
      console.warn(res);
      console.warn('<<< request fail ---');
      uni.showToast({
        title: '网络异常~',
        icon: 'none' });

      if (req.fail) {
        req.fail(res);
      }
    },
    complete: function complete(res) {
      if (res.statusCode != 200) {
        if (res.code == '1000') {
          login();
        }
        console.log('--- request http error >>>');
        console.log(res.statusCode);
        console.log(res.data);
        console.log('<<< request http error ---');
      }
      if (req.complete) {
        req.complete(res);
      }
    } });

};

/*获取平台类型 */
var getPlatform = function getPlatform() {
  var platform = uni.getStorageSync('platform');


  platform = 'wechatMiniApp'; //微信小程序
















  return platform;
};

/*无状态提示信息*/
var alert = function alert() {var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var openType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'navigate';
  /*消息强制转字符串*/
  if (typeof msg != 'string') {
    msg = msg.toString();
  }

  if (msg.length > 7) {
    //长度超过7个字符，用示模态弹窗展示
    uni.showModal({
      title: '提示',
      content: msg,
      showCancel: false });

  } else {
    if (icon == 'warning') {
      uni.showToast({
        title: msg,
        image: "/static/images/icon-warning.png" });

    } else {
      uni.showToast({
        title: msg,
        icon: icon });

    }
  }
  if (url || openType == 'back') {
    setTimeout(function () {
      if (openType == 'redirect') {
        uni.redirectTo({
          url: url });

      } else if (openType == 'switchTab') {
        uni.switchTab({
          url: url });

      } else if (openType == 'reLaunch') {
        uni.reLaunch({
          url: url });

      } else if (openType == 'back') {
        uni.navigateBack();
      } else {
        uni.navigateTo({
          url: url });

      }
    }, 1500);
  }
};

/*弹出加载框*/
var loading = function loading() {var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  /*消息强制转字符串*/
  if (typeof msg != 'string') {
    msg = msg.toString();
  }
  uni.showLoading({
    title: msg,
    mask: mask });

};

/*是否微信浏览器*/
var isWechat = function isWechat() {

  return false;










};

/*获取平台类型 */
var getNaviBarHeight = function getNaviBarHeight() {
  var height = '90';

  var device = uni.getSystemInfoSync();
  console.log(device);
  if (device.system.indexOf('iOS') > -1) {
    if (device.model.indexOf('iPhone X') > -1) {
      height = '44;margin-top: 25px;padding-bottom: 5px;';
    } else {
      height = '44';
    }
  } else {
    height = '48 ';
  }

  console.log(height);
  return height;
};
// 获取屏幕宽度
var getwindowWidth = function getwindowWidth() {
  var device = uni.getSystemInfoSync();
  return device.windowWidth;
};
var getwindowHeight = function getwindowHeight() {
  var device = uni.getSystemInfoSync();
  return device.windowHeight;
};var _default =
{
  tabBarUrl: tabBarUrl,
  isLogin: isLogin,
  initLogin: initLogin,
  login: login,
  wechatAppLogin: wechatAppLogin,
  initMPLogin: initMPLogin,
  request: request,
  uploadFile: uploadFile,
  alert: alert,
  loading: loading,
  isWechat: isWechat,
  getNaviBarHeight: getNaviBarHeight,
  getPlatform: getPlatform,
  getSourcePage: getSourcePage,
  checkAuth: checkAuth,
  bindMobile: bindMobile,
  getwindowHeight: getwindowHeight,
  getwindowWidth: getwindowWidth };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!*****************************************************************!*\
  !*** /Users/jiangxiantao/Desktop/shy/Jisukangfu/common/util.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time;
  }

  var hour = parseInt(time / 3600);
  time = time % 3600;
  var minute = parseInt(time / 60);
  time = time % 60;
  var second = time;

  return [hour, minute, second].map(function (n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }).join(':');
}
function checkmoblie(mobilestr) {
  var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
  // var inputStr = "18810998988";
  if (!telStr.test(mobilestr)) {
    return 1;
  } else {
    return 0;
  }

}
function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude);
    latitude = parseFloat(latitude);
  }

  longitude = longitude.toFixed(2);
  latitude = latitude.toFixed(2);

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.') };

}
var dateUtils = {
  UNITS: {
    '年': 31557600000,
    '月': 2629800000,
    '天': 86400000,
    '小时': 3600000,
    '分钟': 60000,
    '秒': 1000 },

  humanize: function humanize(milliseconds) {
    var humanize = '';
    for (var key in this.UNITS) {
      if (milliseconds >= this.UNITS[key]) {
        humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
        break;
      }
    }
    return humanize || '刚刚';
  },
  format: function format(dateStr) {
    var date = this.parse(dateStr);
    var diff = Date.now() - date.getTime();
    if (diff < this.UNITS['天']) {
      return this.humanize(diff);
    }
    var _format = function _format(number) {
      return number < 10 ? '0' + number : number;
    };
    return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
    _format(date.getHours()) + ':' + _format(date.getMinutes());
  },
  parse: function parse(str) {//将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
    var a = str.split(/[^0-9]/);
    return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
  } };


module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  dateUtils: dateUtils };

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"JisuKangfu","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"JisuKangfu","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"JisuKangfu","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"JisuKangfu","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** /Users/jiangxiantao/Desktop/shy/Jisukangfu/pages.json ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 558:
/*!**********************************************************************************!*\
  !*** /Users/jiangxiantao/Desktop/shy/Jisukangfu/components/scroller/scroller.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = Scroller; /* scroller
                                                                                                        * version 1.1.8
                                                                                                        * 2019-11-01 wenju
                                                                                                        * http://www.mescroll.com
                                                                                                        */

function Scroller(options) {
  var me = this;
  me.version = '1.1.8'; // scroller版本号
  me.options = options || {}; // 配置

  me.isDownScrolling = false; // 是否在执行下拉刷新的回调
  me.isUpScrolling = false; // 是否在执行上拉加载的回调
  var hasDownCallback = me.options.down && me.options.down.callback; // 是否配置了down的callback

  // 初始化下拉刷新
  me.initDownScroll();
  // 初始化上拉加载,则初始化
  me.initUpScroll();

  // 自动加载
  setTimeout(function () {// 待主线程执行完毕再执行,避免new Scroller未初始化,在回调获取不到scroller的实例
    // 自动触发下拉刷新 (只有配置了down的callback才自动触发下拉刷新)
    if (me.optDown.use && me.optDown.auto && hasDownCallback) {
      if (me.optDown.autoShowLoading) {
        me.triggerDownScroll(); // 显示下拉进度,执行下拉回调
      } else {
        me.optDown.callback && me.optDown.callback(me); // 不显示下拉进度,直接执行下拉回调
      }
    }
    // 自动触发上拉加载
    me.optUp.use && me.optUp.auto && !me.isUpAutoLoad && me.triggerUpScroll();
  }, 30); // 需让me.optDown.inited和me.optUp.inited先执行
}

/* 配置参数:下拉刷新 */
Scroller.prototype.extendDownScroll = function (optDown) {
  // 下拉刷新的配置
  Scroller.extend(optDown, {
    use: true, // 是否启用下拉刷新; 默认true
    auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
    autoShowLoading: false, // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
    isLock: false, // 是否锁定下拉刷新,默认false;
    offset: 80, // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    startTop: 100, // scroll-view滚动到顶部时,此时的scroll-top不一定为0, 此值用于控制最大的误差
    fps: 40, // 下拉节流 (值越大每秒刷新频率越高)
    inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    bottomOffset: 20, // 当手指touchmove位置在距离body底部20px范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
    minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...', // 加载中的提示文本
    inited: null, // 下拉刷新初始化完毕的回调
    inOffset: null, // 下拉的距离进入offset范围内那一刻的回调
    outOffset: null, // 下拉的距离大于offset那一刻的回调
    onMoving: null, // 下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
    beforeLoading: null, // 准备触发下拉刷新的回调: 如果return true,将不触发showLoading和callback回调; 常用来完全自定义下拉刷新, 参考案例【淘宝 v6.8.0】
    showLoading: null, // 显示下拉刷新进度的回调
    afterLoading: null, // 准备结束下拉的回调. 返回结束下拉的延时执行时间,默认0ms; 常用于结束下拉之前再显示另外一小段动画,才去隐藏下拉刷新的场景, 参考案例【dotJump】
    endDownScroll: null, // 结束下拉刷新的回调
    callback: function callback(scroller) {
      // 下拉刷新的回调;默认重置上拉加载列表为第一页
      scroller.resetUpScroll();
    } });

};

/* 配置参数:上拉加载 */
Scroller.prototype.extendUpScroll = function (optUp) {
  // 上拉加载的配置
  Scroller.extend(optUp, {
    use: true, // 是否启用上拉加载; 默认true
    auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
    isLock: false, // 是否锁定上拉加载,默认false;
    isBoth: true, // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认true,两者可同时触发;
    isBounce: false, // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
    callback: null, // 上拉加载的回调;function(page,scroller){ }
    page: {
      num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
      size: 10, // 每页数据的数量
      time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
    },
    noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
    offset: 80, // 距底部多远时,触发upCallback
    textLoading: '加载中 ...', // 加载中的提示文本
    textNoMore: '-- 没有更多数据了 --', // 没有更多数据的提示文本
    inited: null, // 初始化完毕的回调
    showLoading: null, // 显示加载中的回调
    showNoMore: null, // 显示无更多数据的回调
    hideUpScroll: null, // 隐藏上拉加载的回调
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: null, // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
      duration: 300, // 回到顶部的动画时长,默认300ms
      btnClick: null, // 点击按钮的回调
      onShow: null // 是否显示的回调
    },
    empty: {
      use: true, // 是否显示空布局
      icon: null, // 图标路径
      tip: '~ 暂无相关数据 ~', // 提示
      btnText: '', // 按钮
      btnClick: null, // 点击按钮的回调
      onShow: null // 是否显示的回调
    },
    onScroll: false // 是否监听滚动事件
  });
};

/* 配置参数 */
Scroller.extend = function (userOption, defaultOption) {
  if (!userOption) return defaultOption;
  for (var key in defaultOption) {
    if (userOption[key] == null) {
      var def = defaultOption[key];
      if (def != null && typeof def === 'object') {
        userOption[key] = Scroller.extend({}, def); // 深度匹配
      } else {
        userOption[key] = def;
      }
    } else if (typeof userOption[key] === 'object') {
      Scroller.extend(userOption[key], defaultOption[key]); // 深度匹配
    }
  }
  return userOption;
};

/* -------初始化下拉刷新------- */
Scroller.prototype.initDownScroll = function () {
  var me = this;
  // 配置参数
  me.optDown = me.options.down || {};
  me.extendDownScroll(me.optDown);

  me.downHight = 0; // 下拉区域的高度

  // 在页面中加入下拉布局
  if (me.optDown.use && me.optDown.inited) {
    // 初始化完毕的回调
    setTimeout(function () {// 待主线程执行完毕再执行,避免new Scroller未初始化,在回调获取不到scroller的实例
      me.optDown.inited(me);
    }, 0);
  }
};

/* 列表touchstart事件 */
Scroller.prototype.touchstartEvent = function (e) {
  if (!this.optDown.use) return;

  this.startPoint = this.getPoint(e); // 记录起点
  this.startTop = this.getScrollTop(); // 记录此时的滚动条位置
  this.lastPoint = this.startPoint; // 重置上次move的点
  this.maxTouchmoveY = this.getBodyHeight() - this.optDown.bottomOffset; // 手指触摸的最大范围(写在touchstart避免body获取高度为0的情况)
  this.inTouchend = false; // 标记不是touchend
};

/* 列表touchmove事件 */
Scroller.prototype.touchmoveEvent = function (e) {
  if (!this.optDown.use) return;
  if (!this.startPoint) return;
  var me = this;

  // 节流
  var t = new Date().getTime();
  if (me.moveTime && t - me.moveTime < me.moveTimeDiff) {// 小于节流时间,则不处理
    return;
  } else {
    me.moveTime = t;
    me.moveTimeDiff = 1000 / me.optDown.fps;
  }

  var scrollTop = me.getScrollTop(); // 当前滚动条的距离
  var curPoint = me.getPoint(e); // 当前点

  var moveY = curPoint.y - me.startPoint.y; // 和起点比,移动的距离,大于0向下拉,小于0向上拉

  // (向下拉&&在顶部) scroll-view在滚动时不会触发touchmove,当触顶/底/左/右时,才会触发touchmove
  // scroll-view滚动到顶部时,scrollTop不一定为0; 在iOS的APP中scrollTop可能为负数,不一定和startTop相等
  if (moveY > 0 && (scrollTop <= 0 || scrollTop <= me.optDown.startTop && scrollTop === me.startTop)) {
    // 可下拉的条件
    if (me.optDown.use && !me.inTouchend && !me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || me.isUpScrolling &&
    me.optUp.isBoth)) {

      // 下拉的角度是否在配置的范围内
      var x = Math.abs(me.lastPoint.x - curPoint.x);
      var y = Math.abs(me.lastPoint.y - curPoint.y);
      var z = Math.sqrt(x * x + y * y);
      if (z !== 0) {
        var angle = Math.asin(y / z) / Math.PI * 180; // 两点之间的角度,区间 [0,90]
        if (angle < me.optDown.minAngle) return; // 如果小于配置的角度,则不往下执行下拉刷新
      }

      // 如果手指的位置超过配置的距离,则提前结束下拉,避免Webview嵌套导致touchend无法触发
      if (me.maxTouchmoveY > 0 && curPoint.y >= me.maxTouchmoveY) {
        me.inTouchend = true; // 标记执行touchend
        me.touchendEvent(); // 提前触发touchend
        return;
      }

      me.preventDefault(e); // 阻止默认事件

      var diff = curPoint.y - me.lastPoint.y; // 和上次比,移动的距离 (大于0向下,小于0向上)

      // 下拉距离  < 指定距离
      if (me.downHight < me.optDown.offset) {
        if (me.movetype !== 1) {
          me.movetype = 1; // 加入标记,保证只执行一次
          me.optDown.inOffset && me.optDown.inOffset(me); // 进入指定距离范围内那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        me.downHight += diff * me.optDown.inOffsetRate; // 越往下,高度变化越小

        // 指定距离  <= 下拉距离
      } else {
        if (me.movetype !== 2) {
          me.movetype = 2; // 加入标记,保证只执行一次
          me.optDown.outOffset && me.optDown.outOffset(me); // 下拉超过指定距离那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        if (diff > 0) {// 向下拉
          me.downHight += Math.round(diff * me.optDown.outOffsetRate); // 越往下,高度变化越小
        } else {// 向上收
          me.downHight += diff; // 向上收回高度,则向上滑多少收多少高度
        }
      }

      var rate = me.downHight / me.optDown.offset; // 下拉区域当前高度与指定距离的比值
      me.optDown.onMoving && me.optDown.onMoving(me, rate, me.downHight); // 下拉过程中的回调,一直在执行
    }
  }

  me.lastPoint = curPoint; // 记录本次移动的点
};

/* 列表touchend事件 */
Scroller.prototype.touchendEvent = function (e) {
  if (!this.optDown.use) return;
  // 如果下拉区域高度已改变,则需重置回来
  if (this.isMoveDown) {
    if (this.downHight >= this.optDown.offset) {
      // 符合触发刷新的条件
      this.triggerDownScroll();
    } else {
      // 不符合的话 则重置
      this.downHight = 0;
      this.optDown.endDownScroll && this.optDown.endDownScroll(this);
    }
    this.movetype = 0;
    this.isMoveDown = false;
  } else if (this.getScrollTop() === this.startTop) {// 到顶/左/右/底的滑动事件
    var isScrollUp = this.getPoint(e).y - this.startPoint.y < 0; // 和起点比,移动的距离,大于0向下拉,小于0向上拉
    // 上滑 && 检查并触发上拉
    isScrollUp && this.triggerUpScroll(true);
  }
};

/* 根据点击滑动事件获取第一个手指的坐标 */
Scroller.prototype.getPoint = function (e) {
  if (!e) {
    return {
      x: 0,
      y: 0 };

  }
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY };

  } else if (e.changedTouches && e.changedTouches[0]) {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY };

  } else {
    return {
      x: e.clientX,
      y: e.clientY };

  }
};

/* 触发下拉刷新 */
Scroller.prototype.triggerDownScroll = function () {
  if (this.optDown.beforeLoading && this.optDown.beforeLoading(this)) {
    //return true则处于完全自定义状态
  } else {
    this.showDownScroll(); // 下拉刷新中...
    this.optDown.callback && this.optDown.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示下拉进度布局 */
Scroller.prototype.showDownScroll = function () {
  this.isDownScrolling = true; // 标记下拉中
  this.downHight = this.optDown.offset; // 更新下拉区域高度
  this.optDown.showLoading(this, this.downHight); // 下拉刷新中...
};

/* 结束下拉刷新 */
Scroller.prototype.endDownScroll = function () {
  var me = this;
  // 结束下拉刷新的方法
  var endScroll = function endScroll() {
    me.downHight = 0;
    me.isDownScrolling = false;
    me.optDown.endDownScroll && me.optDown.endDownScroll(me);
    me.setScrollHeight(0); // 重置滚动区域,使数据不满屏时仍可检查触发翻页
  };
  // 结束下拉刷新时的回调
  var delay = 0;
  if (me.optDown.afterLoading) delay = me.optDown.afterLoading(me); // 结束下拉刷新的延时,单位ms
  if (typeof delay === 'number' && delay > 0) {
    setTimeout(endScroll, delay);
  } else {
    endScroll();
  }
};

/* 锁定下拉刷新:isLock=ture,null锁定;isLock=false解锁 */
Scroller.prototype.lockDownScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optDown.isLock = isLock;
};

/* -------初始化上拉加载------- */
Scroller.prototype.initUpScroll = function () {
  var me = this;
  // 配置参数
  me.optUp = me.options.up || {
    use: false };

  me.extendUpScroll(me.optUp);

  if (!me.optUp.isBounce) me.setBounce(false); // 不允许bounce时,需禁止window的touchmove事件

  if (me.optUp.use === false) return; // 配置不使用上拉加载时,则不初始化上拉布局
  me.optUp.hasNext = true; // 如果使用上拉,则默认有下一页
  me.startNum = me.optUp.page.num + 1; // 记录page开始的页码

  // 初始化完毕的回调
  if (me.optUp.inited) {
    setTimeout(function () {// 待主线程执行完毕再执行,避免new Scroller未初始化,在回调获取不到scroller的实例
      me.optUp.inited(me);
    }, 0);
  }
};

/*列表滚动事件*/
Scroller.prototype.scroll = function (e, onScroll) {
  // 更新滚动条的位置
  this.setScrollTop(e.scrollTop);
  // 更新滚动内容高度
  this.setScrollHeight(e.scrollHeight);

  // 向上滑还是向下滑动
  if (this.preScrollY == null) this.preScrollY = 0;
  this.isScrollUp = e.scrollTop - this.preScrollY > 0;
  this.preScrollY = e.scrollTop;

  // 上滑 && 检查并触发上拉
  this.isScrollUp && this.triggerUpScroll(true);

  // 顶部按钮的显示隐藏
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }

  // 滑动监听
  this.optUp.onScroll && onScroll && onScroll();
};

/* 触发上拉加载 */
Scroller.prototype.triggerUpScroll = function (isCheck) {
  if (!this.isUpScrolling && this.optUp.use && this.optUp.callback) {
    // 是否校验在底部; 默认不校验
    if (isCheck === true) {
      var canUp = false;
      // 还有下一页 && 没有锁定 && 不在下拉中
      if (this.optUp.hasNext && !this.optUp.isLock && !this.isDownScrolling) {
        if (this.getScrollBottom() <= this.optUp.offset) {// 到底部
          canUp = true; // 标记可上拉
        }
      }
      if (canUp === false) return;
    }
    this.showUpScroll(); // 上拉加载中...
    this.optUp.page.num++; // 预先加一页,如果失败则减回
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = this.optUp.page.num; // 把最新的页数赋值在scroller上,避免对page的影响
    this.size = this.optUp.page.size; // 把最新的页码赋值在scroller上,避免对page的影响
    this.time = this.optUp.page.time; // 把最新的页码赋值在scroller上,避免对page的影响
    this.optUp.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示上拉加载中 */
Scroller.prototype.showUpScroll = function () {
  this.isUpScrolling = true; // 标记上拉加载中
  this.optUp.showLoading && this.optUp.showLoading(this); // 回调
};

/* 显示上拉无更多数据 */
Scroller.prototype.showNoMore = function () {
  this.optUp.hasNext = false; // 标记无更多数据
  this.optUp.showNoMore && this.optUp.showNoMore(this); // 回调
};

/* 隐藏上拉区域**/
Scroller.prototype.hideUpScroll = function () {
  this.optUp.hideUpScroll && this.optUp.hideUpScroll(this); // 回调
};

/* 结束上拉加载 */
Scroller.prototype.endUpScroll = function (isShowNoMore) {
  if (isShowNoMore != null) {// isShowNoMore=null,不处理下拉状态,下拉刷新的时候调用
    if (isShowNoMore) {
      this.showNoMore(); // isShowNoMore=true,显示无更多数据
    } else {
      this.hideUpScroll(); // isShowNoMore=false,隐藏上拉加载
    }
  }
  this.isUpScrolling = false; // 标记结束上拉加载
};

/* 重置上拉加载列表为第一页
    *isShowLoading 是否显示进度布局;
    * 1.默认null,不传参,则显示上拉加载的进度布局
    * 2.传参true, 则显示下拉刷新的进度布局
    * 3.传参false,则不显示上拉和下拉的进度 (常用于静默更新列表数据)
    */
Scroller.prototype.resetUpScroll = function (isShowLoading) {
  if (this.optUp && this.optUp.use) {
    var page = this.optUp.page;
    this.prePageNum = page.num; // 缓存重置前的页码,加载失败可退回
    this.prePageTime = page.time; // 缓存重置前的时间,加载失败可退回
    page.num = this.startNum; // 重置为第一页
    page.time = null; // 重置时间为空
    if (!this.isDownScrolling && isShowLoading !== false) {// 如果不是下拉刷新触发的resetUpScroll并且不配置列表静默更新,则显示进度;
      if (isShowLoading == null) {
        this.removeEmpty(); // 移除空布局
        this.showUpScroll(); // 不传参,默认显示上拉加载的进度布局
      } else {
        this.showDownScroll(); // 传true,显示下拉刷新的进度布局,不清空列表
      }
    }
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = page.num; // 把最新的页数赋值在scroller上,避免对page的影响
    this.size = page.size; // 把最新的页码赋值在scroller上,避免对page的影响
    this.time = page.time; // 把最新的页码赋值在scroller上,避免对page的影响
    this.optUp.callback && this.optUp.callback(this); // 执行上拉回调
  }
};

/* 设置page.num的值 */
Scroller.prototype.setPageNum = function (num) {
  this.optUp.page.num = num - 1;
};

/* 设置page.size的值 */
Scroller.prototype.setPageSize = function (size) {
  this.optUp.page.size = size;
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalPage: 总页数(必传)
    * systime: 服务器时间 (可空)
    */
Scroller.prototype.endByPage = function (dataSize, totalPage, systime) {
  var hasNext;
  if (this.optUp.use && totalPage != null) hasNext = this.optUp.page.num < totalPage; // 是否还有下一页
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalSize: 列表所有数据总数量(必传)
    * systime: 服务器时间 (可空)
    */
Scroller.prototype.endBySize = function (dataSize, totalSize, systime) {
  var hasNext;
  if (this.optUp.use && totalSize != null) {
    var loadSize = (this.optUp.page.num - 1) * this.optUp.page.size + dataSize; // 已加载的数据总数
    hasNext = loadSize < totalSize; // 是否还有下一页
  }
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据个数(不是所有页的数据总和),用于上拉加载判断是否还有下一页.如果不传,则会判断还有下一页
    * hasNext: 是否还有下一页,布尔类型;用来解决这个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据dataSize判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
    * systime: 服务器时间(可空);用来解决这个小问题:当准备翻下一页时,数据库新增了几条记录,此时翻下一页,前面的几条数据会和上一页的重复;这里传入了systime,那么upCallback的page.time就会有值,把page.time传给服务器,让后台过滤新加入的那几条记录
    */
Scroller.prototype.endSuccess = function (dataSize, hasNext, systime) {
  var me = this;
  // 结束下拉刷新
  if (me.isDownScrolling) me.endDownScroll();

  // 结束上拉加载
  if (me.optUp.use) {
    var isShowNoMore; // 是否已无更多数据
    if (dataSize != null) {
      var pageNum = me.optUp.page.num; // 当前页码
      var pageSize = me.optUp.page.size; // 每页长度
      // 如果是第一页
      if (pageNum === 1) {
        if (systime) me.optUp.page.time = systime; // 设置加载列表数据第一页的时间
      }
      if (dataSize < pageSize || hasNext === false) {
        // 返回的数据不满一页时,则说明已无更多数据
        me.optUp.hasNext = false;
        if (dataSize === 0 && pageNum === 1) {
          // 如果第一页无任何数据且配置了空布局
          isShowNoMore = false;
          me.showEmpty();
        } else {
          // 总列表数少于配置的数量,则不显示无更多数据
          var allDataSize = (pageNum - 1) * pageSize + dataSize;
          if (allDataSize < me.optUp.noMoreSize) {
            isShowNoMore = false;
          } else {
            isShowNoMore = true;
          }
          me.removeEmpty(); // 移除空布局
        }
      } else {
        // 还有下一页
        isShowNoMore = false;
        me.optUp.hasNext = true;
        me.removeEmpty(); // 移除空布局
      }
    }

    // 隐藏上拉
    me.endUpScroll(isShowNoMore);
  }
};

/* 回调失败,结束下拉刷新和上拉加载 */
Scroller.prototype.endErr = function () {
  // 结束下拉,回调失败重置回原来的页码和时间
  if (this.isDownScrolling) {
    var page = this.optUp.page;
    if (page && this.prePageNum) {
      page.num = this.prePageNum;
      page.time = this.prePageTime;
    }
    this.endDownScroll();
  }
  // 结束上拉,回调失败重置回原来的页码
  if (this.isUpScrolling) {
    this.optUp.page.num--;
    this.endUpScroll(false);
  }
};

/* 显示空布局 */
Scroller.prototype.showEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(true);
};

/* 移除空布局 */
Scroller.prototype.removeEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(false);
};

/* 显示回到顶部的按钮 */
Scroller.prototype.showTopBtn = function () {
  if (!this.topBtnShow) {
    this.topBtnShow = true;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(true);
  }
};

/* 隐藏回到顶部的按钮 */
Scroller.prototype.hideTopBtn = function () {
  if (this.topBtnShow) {
    this.topBtnShow = false;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(false);
  }
};

/* 获取滚动条的位置 */
Scroller.prototype.getScrollTop = function () {
  return this.scrollTop || 0;
};

/* 记录滚动条的位置 */
Scroller.prototype.setScrollTop = function (y) {
  this.scrollTop = y;
};

/* 滚动到指定位置 */
Scroller.prototype.scrollTo = function (y, t) {
  this.myScrollTo && this.myScrollTo(y, t); // scrollview需自定义回到顶部方法
};

/* 自定义scrollTo */
Scroller.prototype.resetScrollTo = function (myScrollTo) {
  this.myScrollTo = myScrollTo;
};

/* 滚动条到底部的距离 */
Scroller.prototype.getScrollBottom = function () {
  return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
};

/* 计步器
    star: 开始值
    end: 结束值
    callback(step,timer): 回调step值,计步器timer,可自行通过window.clearInterval(timer)结束计步器;
    t: 计步时长,传0则直接回调end值;不传则默认300ms
    rate: 周期;不传则默认30ms计步一次
    * */
Scroller.prototype.getStep = function (star, end, callback, t, rate) {
  var diff = end - star; // 差值
  if (t === 0 || diff === 0) {
    callback && callback(end);
    return;
  }
  t = t || 300; // 时长 300ms
  rate = rate || 30; // 周期 30ms
  var count = t / rate; // 次数
  var step = diff / count; // 步长
  var i = 0; // 计数
  var timer = setInterval(function () {
    if (i < count - 1) {
      star += step;
      callback && callback(star, timer);
      i++;
    } else {
      callback && callback(end, timer); // 最后一次直接设置end,避免计算误差
      clearInterval(timer);
    }
  }, rate);
};

/* 滚动容器的高度 */
Scroller.prototype.getClientHeight = function (isReal) {
  var h = this.clientHeight || 0;
  if (h === 0 && isReal !== true) {// 未获取到容器的高度,可临时取body的高度 (可能会有误差)
    h = this.getBodyHeight();
  }
  return h;
};
Scroller.prototype.setClientHeight = function (h) {
  this.clientHeight = h;
};

/* 滚动内容的高度 */
Scroller.prototype.getScrollHeight = function () {
  return this.scrollHeight || 0;
};
Scroller.prototype.setScrollHeight = function (h) {
  this.scrollHeight = h;
};

/* body的高度 */
Scroller.prototype.getBodyHeight = function () {
  return this.bodyHeight || 0;
};
Scroller.prototype.setBodyHeight = function (h) {
  this.bodyHeight = h;
};

/* 阻止浏览器默认滚动事件 */
Scroller.prototype.preventDefault = function (e) {
  // 小程序不支持e.preventDefault
  // app的bounce只能通过配置pages.json的style.app-plus.bounce为"none"来禁止
  // cancelable:是否可以被禁用; defaultPrevented:是否已经被禁用
  if (e && e.cancelable && !e.defaultPrevented) e.preventDefault();
};

/* 是否允许下拉回弹(橡皮筋效果); true或null为允许; false禁止bounce */
Scroller.prototype.setBounce = function (isBounce) {


































































};

/***/ }),

/***/ 559:
/*!********************************************************************************!*\
  !*** /Users/jiangxiantao/Desktop/shy/Jisukangfu/components/scroller/option.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // scroller 全局配置
var GlobalOption = {
  down: {
    // 其他down的配置参数也可以写,这里只展示了常用的配置:
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放刷新', // 下拉的距离大于offset范围的提示文本
    textLoading: '刷新中…', // 加载中的提示文本
    offset: 80 // 在列表顶部,下拉大于80upx,松手即可触发下拉刷新的回调
  },
  up: {
    // 其他up的配置参数也可以写,这里只展示了常用的配置:
    textLoading: '', // 加载中的提示文本
    textNoMore: '没有更多了~', // 没有更多数据的提示文本
    offset: 80, // 距底部多远时,触发upCallback
    isBounce: false, // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
    toTop: {
      // 回到顶部按钮,需配置src才显示
      //src: "/static/images/scroll-top.png", // 图片路径 (建议放入static目录, 如 /static/img/mescroll-totop.png )
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
      duration: 300 // 回到顶部的动画时长,默认300ms
    },
    empty: {
      type: 'default',
      use: true, // 是否显示空布局
      icon: "/static/images/icon_no_data_02.png", // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
      tip: '暂无数据~' // 提示
    } } };var _default =



GlobalOption;exports.default = _default;

/***/ }),

/***/ 581:
/*!****************************************************************!*\
  !*** /Users/jiangxiantao/Desktop/shy/Jisukangfu/utils/area.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var city = [{ "value": "11", "label": "北京市", "children": [{ "value": "1101", "label": "市辖区", "children": [{ "value": "110101", "label": "东城区" }, { "value": "110102", "label": "西城区" }, { "value": "110105", "label": "朝阳区" }, { "value": "110106", "label": "丰台区" }, { "value": "110107", "label": "石景山区" }, { "value": "110108", "label": "海淀区" }, { "value": "110109", "label": "门头沟区" }, { "value": "110111", "label": "房山区" }, { "value": "110112", "label": "通州区" }, { "value": "110113", "label": "顺义区" }, { "value": "110114", "label": "昌平区" }, { "value": "110115", "label": "大兴区" }, { "value": "110116", "label": "怀柔区" }, { "value": "110117", "label": "平谷区" }, { "value": "110118", "label": "密云区" }, { "value": "110119", "label": "延庆区" }] }] }, { "value": "12", "label": "天津市", "children": [{ "value": "1201", "label": "市辖区", "children": [{ "value": "120101", "label": "和平区" }, { "value": "120102", "label": "河东区" }, { "value": "120103", "label": "河西区" }, { "value": "120104", "label": "南开区" }, { "value": "120105", "label": "河北区" }, { "value": "120106", "label": "红桥区" }, { "value": "120110", "label": "东丽区" }, { "value": "120111", "label": "西青区" }, { "value": "120112", "label": "津南区" }, { "value": "120113", "label": "北辰区" }, { "value": "120114", "label": "武清区" }, { "value": "120115", "label": "宝坻区" }, { "value": "120116", "label": "滨海新区" }, { "value": "120117", "label": "宁河区" }, { "value": "120118", "label": "静海区" }, { "value": "120119", "label": "蓟州区" }] }] }, { "value": "13", "label": "河北省", "children": [{ "value": "1301", "label": "石家庄市", "children": [{ "value": "130102", "label": "长安区" }, { "value": "130104", "label": "桥西区" }, { "value": "130105", "label": "新华区" }, { "value": "130107", "label": "井陉矿区" }, { "value": "130108", "label": "裕华区" }, { "value": "130109", "label": "藁城区" }, { "value": "130110", "label": "鹿泉区" }, { "value": "130111", "label": "栾城区" }, { "value": "130121", "label": "井陉县" }, { "value": "130123", "label": "正定县" }, { "value": "130125", "label": "行唐县" }, { "value": "130126", "label": "灵寿县" }, { "value": "130127", "label": "高邑县" }, { "value": "130128", "label": "深泽县" }, { "value": "130129", "label": "赞皇县" }, { "value": "130130", "label": "无极县" }, { "value": "130131", "label": "平山县" }, { "value": "130132", "label": "元氏县" }, { "value": "130133", "label": "赵县" }, { "value": "130171", "label": "石家庄高新技术产业开发区" }, { "value": "130172", "label": "石家庄循环化工园区" }, { "value": "130181", "label": "辛集市" }, { "value": "130183", "label": "晋州市" }, { "value": "130184", "label": "新乐市" }] }, { "value": "1302", "label": "唐山市", "children": [{ "value": "130202", "label": "路南区" }, { "value": "130203", "label": "路北区" }, { "value": "130204", "label": "古冶区" }, { "value": "130205", "label": "开平区" }, { "value": "130207", "label": "丰南区" }, { "value": "130208", "label": "丰润区" }, { "value": "130209", "label": "曹妃甸区" }, { "value": "130224", "label": "滦南县" }, { "value": "130225", "label": "乐亭县" }, { "value": "130227", "label": "迁西县" }, { "value": "130229", "label": "玉田县" }, { "value": "130271", "label": "唐山市芦台经济技术开发区" }, { "value": "130272", "label": "唐山市汉沽管理区" }, { "value": "130273", "label": "唐山高新技术产业开发区" }, { "value": "130274", "label": "河北唐山海港经济开发区" }, { "value": "130281", "label": "遵化市" }, { "value": "130283", "label": "迁安市" }, { "value": "130284", "label": "滦州市" }] }, { "value": "1303", "label": "秦皇岛市", "children": [{ "value": "130302", "label": "海港区" }, { "value": "130303", "label": "山海关区" }, { "value": "130304", "label": "北戴河区" }, { "value": "130306", "label": "抚宁区" }, { "value": "130321", "label": "青龙满族自治县" }, { "value": "130322", "label": "昌黎县" }, { "value": "130324", "label": "卢龙县" }, { "value": "130371", "label": "秦皇岛市经济技术开发区" }, { "value": "130372", "label": "北戴河新区" }] }, { "value": "1304", "label": "邯郸市", "children": [{ "value": "130402", "label": "邯山区" }, { "value": "130403", "label": "丛台区" }, { "value": "130404", "label": "复兴区" }, { "value": "130406", "label": "峰峰矿区" }, { "value": "130407", "label": "肥乡区" }, { "value": "130408", "label": "永年区" }, { "value": "130423", "label": "临漳县" }, { "value": "130424", "label": "成安县" }, { "value": "130425", "label": "大名县" }, { "value": "130426", "label": "涉县" }, { "value": "130427", "label": "磁县" }, { "value": "130430", "label": "邱县" }, { "value": "130431", "label": "鸡泽县" }, { "value": "130432", "label": "广平县" }, { "value": "130433", "label": "馆陶县" }, { "value": "130434", "label": "魏县" }, { "value": "130435", "label": "曲周县" }, { "value": "130471", "label": "邯郸经济技术开发区" }, { "value": "130473", "label": "邯郸冀南新区" }, { "value": "130481", "label": "武安市" }] }, { "value": "1305", "label": "邢台市", "children": [{ "value": "130502", "label": "桥东区" }, { "value": "130503", "label": "桥西区" }, { "value": "130521", "label": "邢台县" }, { "value": "130522", "label": "临城县" }, { "value": "130523", "label": "内丘县" }, { "value": "130524", "label": "柏乡县" }, { "value": "130525", "label": "隆尧县" }, { "value": "130526", "label": "任县" }, { "value": "130527", "label": "南和县" }, { "value": "130528", "label": "宁晋县" }, { "value": "130529", "label": "巨鹿县" }, { "value": "130530", "label": "新河县" }, { "value": "130531", "label": "广宗县" }, { "value": "130532", "label": "平乡县" }, { "value": "130533", "label": "威县" }, { "value": "130534", "label": "清河县" }, { "value": "130535", "label": "临西县" }, { "value": "130571", "label": "河北邢台经济开发区" }, { "value": "130581", "label": "南宫市" }, { "value": "130582", "label": "沙河市" }] }, { "value": "1306", "label": "保定市", "children": [{ "value": "130602", "label": "竞秀区" }, { "value": "130606", "label": "莲池区" }, { "value": "130607", "label": "满城区" }, { "value": "130608", "label": "清苑区" }, { "value": "130609", "label": "徐水区" }, { "value": "130623", "label": "涞水县" }, { "value": "130624", "label": "阜平县" }, { "value": "130626", "label": "定兴县" }, { "value": "130627", "label": "唐县" }, { "value": "130628", "label": "高阳县" }, { "value": "130629", "label": "容城县" }, { "value": "130630", "label": "涞源县" }, { "value": "130631", "label": "望都县" }, { "value": "130632", "label": "安新县" }, { "value": "130633", "label": "易县" }, { "value": "130634", "label": "曲阳县" }, { "value": "130635", "label": "蠡县" }, { "value": "130636", "label": "顺平县" }, { "value": "130637", "label": "博野县" }, { "value": "130638", "label": "雄县" }, { "value": "130671", "label": "保定高新技术产业开发区" }, { "value": "130672", "label": "保定白沟新城" }, { "value": "130681", "label": "涿州市" }, { "value": "130682", "label": "定州市" }, { "value": "130683", "label": "安国市" }, { "value": "130684", "label": "高碑店市" }] }, { "value": "1307", "label": "张家口市", "children": [{ "value": "130702", "label": "桥东区" }, { "value": "130703", "label": "桥西区" }, { "value": "130705", "label": "宣化区" }, { "value": "130706", "label": "下花园区" }, { "value": "130708", "label": "万全区" }, { "value": "130709", "label": "崇礼区" }, { "value": "130722", "label": "张北县" }, { "value": "130723", "label": "康保县" }, { "value": "130724", "label": "沽源县" }, { "value": "130725", "label": "尚义县" }, { "value": "130726", "label": "蔚县" }, { "value": "130727", "label": "阳原县" }, { "value": "130728", "label": "怀安县" }, { "value": "130730", "label": "怀来县" }, { "value": "130731", "label": "涿鹿县" }, { "value": "130732", "label": "赤城县" }, { "value": "130771", "label": "张家口市高新技术产业开发区" }, { "value": "130772", "label": "张家口市察北管理区" }, { "value": "130773", "label": "张家口市塞北管理区" }] }, { "value": "1308", "label": "承德市", "children": [{ "value": "130802", "label": "双桥区" }, { "value": "130803", "label": "双滦区" }, { "value": "130804", "label": "鹰手营子矿区" }, { "value": "130821", "label": "承德县" }, { "value": "130822", "label": "兴隆县" }, { "value": "130824", "label": "滦平县" }, { "value": "130825", "label": "隆化县" }, { "value": "130826", "label": "丰宁满族自治县" }, { "value": "130827", "label": "宽城满族自治县" }, { "value": "130828", "label": "围场满族蒙古族自治县" }, { "value": "130871", "label": "承德高新技术产业开发区" }, { "value": "130881", "label": "平泉市" }] }, { "value": "1309", "label": "沧州市", "children": [{ "value": "130902", "label": "新华区" }, { "value": "130903", "label": "运河区" }, { "value": "130921", "label": "沧县" }, { "value": "130922", "label": "青县" }, { "value": "130923", "label": "东光县" }, { "value": "130924", "label": "海兴县" }, { "value": "130925", "label": "盐山县" }, { "value": "130926", "label": "肃宁县" }, { "value": "130927", "label": "南皮县" }, { "value": "130928", "label": "吴桥县" }, { "value": "130929", "label": "献县" }, { "value": "130930", "label": "孟村回族自治县" }, { "value": "130971", "label": "河北沧州经济开发区" }, { "value": "130972", "label": "沧州高新技术产业开发区" }, { "value": "130973", "label": "沧州渤海新区" }, { "value": "130981", "label": "泊头市" }, { "value": "130982", "label": "任丘市" }, { "value": "130983", "label": "黄骅市" }, { "value": "130984", "label": "河间市" }] }, { "value": "1310", "label": "廊坊市", "children": [{ "value": "131002", "label": "安次区" }, { "value": "131003", "label": "广阳区" }, { "value": "131022", "label": "固安县" }, { "value": "131023", "label": "永清县" }, { "value": "131024", "label": "香河县" }, { "value": "131025", "label": "大城县" }, { "value": "131026", "label": "文安县" }, { "value": "131028", "label": "大厂回族自治县" }, { "value": "131071", "label": "廊坊经济技术开发区" }, { "value": "131081", "label": "霸州市" }, { "value": "131082", "label": "三河市" }] }, { "value": "1311", "label": "衡水市", "children": [{ "value": "131102", "label": "桃城区" }, { "value": "131103", "label": "冀州区" }, { "value": "131121", "label": "枣强县" }, { "value": "131122", "label": "武邑县" }, { "value": "131123", "label": "武强县" }, { "value": "131124", "label": "饶阳县" }, { "value": "131125", "label": "安平县" }, { "value": "131126", "label": "故城县" }, { "value": "131127", "label": "景县" }, { "value": "131128", "label": "阜城县" }, { "value": "131171", "label": "河北衡水高新技术产业开发区" }, { "value": "131172", "label": "衡水滨湖新区" }, { "value": "131182", "label": "深州市" }] }] }, { "value": "14", "label": "山西省", "children": [{ "value": "1401", "label": "太原市", "children": [{ "value": "140105", "label": "小店区" }, { "value": "140106", "label": "迎泽区" }, { "value": "140107", "label": "杏花岭区" }, { "value": "140108", "label": "尖草坪区" }, { "value": "140109", "label": "万柏林区" }, { "value": "140110", "label": "晋源区" }, { "value": "140121", "label": "清徐县" }, { "value": "140122", "label": "阳曲县" }, { "value": "140123", "label": "娄烦县" }, { "value": "140171", "label": "山西转型综合改革示范区" }, { "value": "140181", "label": "古交市" }] }, { "value": "1402", "label": "大同市", "children": [{ "value": "140212", "label": "新荣区" }, { "value": "140213", "label": "平城区" }, { "value": "140214", "label": "云冈区" }, { "value": "140215", "label": "云州区" }, { "value": "140221", "label": "阳高县" }, { "value": "140222", "label": "天镇县" }, { "value": "140223", "label": "广灵县" }, { "value": "140224", "label": "灵丘县" }, { "value": "140225", "label": "浑源县" }, { "value": "140226", "label": "左云县" }, { "value": "140271", "label": "山西大同经济开发区" }] }, { "value": "1403", "label": "阳泉市", "children": [{ "value": "140302", "label": "城区" }, { "value": "140303", "label": "矿区" }, { "value": "140311", "label": "郊区" }, { "value": "140321", "label": "平定县" }, { "value": "140322", "label": "盂县" }] }, { "value": "1404", "label": "长治市", "children": [{ "value": "140403", "label": "潞州区" }, { "value": "140404", "label": "上党区" }, { "value": "140405", "label": "屯留区" }, { "value": "140406", "label": "潞城区" }, { "value": "140423", "label": "襄垣县" }, { "value": "140425", "label": "平顺县" }, { "value": "140426", "label": "黎城县" }, { "value": "140427", "label": "壶关县" }, { "value": "140428", "label": "长子县" }, { "value": "140429", "label": "武乡县" }, { "value": "140430", "label": "沁县" }, { "value": "140431", "label": "沁源县" }, { "value": "140471", "label": "山西长治高新技术产业园区" }] }, { "value": "1405", "label": "晋城市", "children": [{ "value": "140502", "label": "城区" }, { "value": "140521", "label": "沁水县" }, { "value": "140522", "label": "阳城县" }, { "value": "140524", "label": "陵川县" }, { "value": "140525", "label": "泽州县" }, { "value": "140581", "label": "高平市" }] }, { "value": "1406", "label": "朔州市", "children": [{ "value": "140602", "label": "朔城区" }, { "value": "140603", "label": "平鲁区" }, { "value": "140621", "label": "山阴县" }, { "value": "140622", "label": "应县" }, { "value": "140623", "label": "右玉县" }, { "value": "140671", "label": "山西朔州经济开发区" }, { "value": "140681", "label": "怀仁市" }] }, { "value": "1407", "label": "晋中市", "children": [{ "value": "140702", "label": "榆次区" }, { "value": "140721", "label": "榆社县" }, { "value": "140722", "label": "左权县" }, { "value": "140723", "label": "和顺县" }, { "value": "140724", "label": "昔阳县" }, { "value": "140725", "label": "寿阳县" }, { "value": "140726", "label": "太谷县" }, { "value": "140727", "label": "祁县" }, { "value": "140728", "label": "平遥县" }, { "value": "140729", "label": "灵石县" }, { "value": "140781", "label": "介休市" }] }, { "value": "1408", "label": "运城市", "children": [{ "value": "140802", "label": "盐湖区" }, { "value": "140821", "label": "临猗县" }, { "value": "140822", "label": "万荣县" }, { "value": "140823", "label": "闻喜县" }, { "value": "140824", "label": "稷山县" }, { "value": "140825", "label": "新绛县" }, { "value": "140826", "label": "绛县" }, { "value": "140827", "label": "垣曲县" }, { "value": "140828", "label": "夏县" }, { "value": "140829", "label": "平陆县" }, { "value": "140830", "label": "芮城县" }, { "value": "140881", "label": "永济市" }, { "value": "140882", "label": "河津市" }] }, { "value": "1409", "label": "忻州市", "children": [{ "value": "140902", "label": "忻府区" }, { "value": "140921", "label": "定襄县" }, { "value": "140922", "label": "五台县" }, { "value": "140923", "label": "代县" }, { "value": "140924", "label": "繁峙县" }, { "value": "140925", "label": "宁武县" }, { "value": "140926", "label": "静乐县" }, { "value": "140927", "label": "神池县" }, { "value": "140928", "label": "五寨县" }, { "value": "140929", "label": "岢岚县" }, { "value": "140930", "label": "河曲县" }, { "value": "140931", "label": "保德县" }, { "value": "140932", "label": "偏关县" }, { "value": "140971", "label": "五台山风景名胜区" }, { "value": "140981", "label": "原平市" }] }, { "value": "1410", "label": "临汾市", "children": [{ "value": "141002", "label": "尧都区" }, { "value": "141021", "label": "曲沃县" }, { "value": "141022", "label": "翼城县" }, { "value": "141023", "label": "襄汾县" }, { "value": "141024", "label": "洪洞县" }, { "value": "141025", "label": "古县" }, { "value": "141026", "label": "安泽县" }, { "value": "141027", "label": "浮山县" }, { "value": "141028", "label": "吉县" }, { "value": "141029", "label": "乡宁县" }, { "value": "141030", "label": "大宁县" }, { "value": "141031", "label": "隰县" }, { "value": "141032", "label": "永和县" }, { "value": "141033", "label": "蒲县" }, { "value": "141034", "label": "汾西县" }, { "value": "141081", "label": "侯马市" }, { "value": "141082", "label": "霍州市" }] }, { "value": "1411", "label": "吕梁市", "children": [{ "value": "141102", "label": "离石区" }, { "value": "141121", "label": "文水县" }, { "value": "141122", "label": "交城县" }, { "value": "141123", "label": "兴县" }, { "value": "141124", "label": "临县" }, { "value": "141125", "label": "柳林县" }, { "value": "141126", "label": "石楼县" }, { "value": "141127", "label": "岚县" }, { "value": "141128", "label": "方山县" }, { "value": "141129", "label": "中阳县" }, { "value": "141130", "label": "交口县" }, { "value": "141181", "label": "孝义市" }, { "value": "141182", "label": "汾阳市" }] }] }, { "value": "15", "label": "内蒙古自治区", "children": [{ "value": "1501", "label": "呼和浩特市", "children": [{ "value": "150102", "label": "新城区" }, { "value": "150103", "label": "回民区" }, { "value": "150104", "label": "玉泉区" }, { "value": "150105", "label": "赛罕区" }, { "value": "150121", "label": "土默特左旗" }, { "value": "150122", "label": "托克托县" }, { "value": "150123", "label": "和林格尔县" }, { "value": "150124", "label": "清水河县" }, { "value": "150125", "label": "武川县" }, { "value": "150171", "label": "呼和浩特金海工业园区" }, { "value": "150172", "label": "呼和浩特经济技术开发区" }] }, { "value": "1502", "label": "包头市", "children": [{ "value": "150202", "label": "东河区" }, { "value": "150203", "label": "昆都仑区" }, { "value": "150204", "label": "青山区" }, { "value": "150205", "label": "石拐区" }, { "value": "150206", "label": "白云鄂博矿区" }, { "value": "150207", "label": "九原区" }, { "value": "150221", "label": "土默特右旗" }, { "value": "150222", "label": "固阳县" }, { "value": "150223", "label": "达尔罕茂明安联合旗" }, { "value": "150271", "label": "包头稀土高新技术产业开发区" }] }, { "value": "1503", "label": "乌海市", "children": [{ "value": "150302", "label": "海勃湾区" }, { "value": "150303", "label": "海南区" }, { "value": "150304", "label": "乌达区" }] }, { "value": "1504", "label": "赤峰市", "children": [{ "value": "150402", "label": "红山区" }, { "value": "150403", "label": "元宝山区" }, { "value": "150404", "label": "松山区" }, { "value": "150421", "label": "阿鲁科尔沁旗" }, { "value": "150422", "label": "巴林左旗" }, { "value": "150423", "label": "巴林右旗" }, { "value": "150424", "label": "林西县" }, { "value": "150425", "label": "克什克腾旗" }, { "value": "150426", "label": "翁牛特旗" }, { "value": "150428", "label": "喀喇沁旗" }, { "value": "150429", "label": "宁城县" }, { "value": "150430", "label": "敖汉旗" }] }, { "value": "1505", "label": "通辽市", "children": [{ "value": "150502", "label": "科尔沁区" }, { "value": "150521", "label": "科尔沁左翼中旗" }, { "value": "150522", "label": "科尔沁左翼后旗" }, { "value": "150523", "label": "开鲁县" }, { "value": "150524", "label": "库伦旗" }, { "value": "150525", "label": "奈曼旗" }, { "value": "150526", "label": "扎鲁特旗" }, { "value": "150571", "label": "通辽经济技术开发区" }, { "value": "150581", "label": "霍林郭勒市" }] }, { "value": "1506", "label": "鄂尔多斯市", "children": [{ "value": "150602", "label": "东胜区" }, { "value": "150603", "label": "康巴什区" }, { "value": "150621", "label": "达拉特旗" }, { "value": "150622", "label": "准格尔旗" }, { "value": "150623", "label": "鄂托克前旗" }, { "value": "150624", "label": "鄂托克旗" }, { "value": "150625", "label": "杭锦旗" }, { "value": "150626", "label": "乌审旗" }, { "value": "150627", "label": "伊金霍洛旗" }] }, { "value": "1507", "label": "呼伦贝尔市", "children": [{ "value": "150702", "label": "海拉尔区" }, { "value": "150703", "label": "扎赉诺尔区" }, { "value": "150721", "label": "阿荣旗" }, { "value": "150722", "label": "莫力达瓦达斡尔族自治旗" }, { "value": "150723", "label": "鄂伦春自治旗" }, { "value": "150724", "label": "鄂温克族自治旗" }, { "value": "150725", "label": "陈巴尔虎旗" }, { "value": "150726", "label": "新巴尔虎左旗" }, { "value": "150727", "label": "新巴尔虎右旗" }, { "value": "150781", "label": "满洲里市" }, { "value": "150782", "label": "牙克石市" }, { "value": "150783", "label": "扎兰屯市" }, { "value": "150784", "label": "额尔古纳市" }, { "value": "150785", "label": "根河市" }] }, { "value": "1508", "label": "巴彦淖尔市", "children": [{ "value": "150802", "label": "临河区" }, { "value": "150821", "label": "五原县" }, { "value": "150822", "label": "磴口县" }, { "value": "150823", "label": "乌拉特前旗" }, { "value": "150824", "label": "乌拉特中旗" }, { "value": "150825", "label": "乌拉特后旗" }, { "value": "150826", "label": "杭锦后旗" }] }, { "value": "1509", "label": "乌兰察布市", "children": [{ "value": "150902", "label": "集宁区" }, { "value": "150921", "label": "卓资县" }, { "value": "150922", "label": "化德县" }, { "value": "150923", "label": "商都县" }, { "value": "150924", "label": "兴和县" }, { "value": "150925", "label": "凉城县" }, { "value": "150926", "label": "察哈尔右翼前旗" }, { "value": "150927", "label": "察哈尔右翼中旗" }, { "value": "150928", "label": "察哈尔右翼后旗" }, { "value": "150929", "label": "四子王旗" }, { "value": "150981", "label": "丰镇市" }] }, { "value": "1522", "label": "兴安盟", "children": [{ "value": "152201", "label": "乌兰浩特市" }, { "value": "152202", "label": "阿尔山市" }, { "value": "152221", "label": "科尔沁右翼前旗" }, { "value": "152222", "label": "科尔沁右翼中旗" }, { "value": "152223", "label": "扎赉特旗" }, { "value": "152224", "label": "突泉县" }] }, { "value": "1525", "label": "锡林郭勒盟", "children": [{ "value": "152501", "label": "二连浩特市" }, { "value": "152502", "label": "锡林浩特市" }, { "value": "152522", "label": "阿巴嘎旗" }, { "value": "152523", "label": "苏尼特左旗" }, { "value": "152524", "label": "苏尼特右旗" }, { "value": "152525", "label": "东乌珠穆沁旗" }, { "value": "152526", "label": "西乌珠穆沁旗" }, { "value": "152527", "label": "太仆寺旗" }, { "value": "152528", "label": "镶黄旗" }, { "value": "152529", "label": "正镶白旗" }, { "value": "152530", "label": "正蓝旗" }, { "value": "152531", "label": "多伦县" }, { "value": "152571", "label": "乌拉盖管委会" }] }, { "value": "1529", "label": "阿拉善盟", "children": [{ "value": "152921", "label": "阿拉善左旗" }, { "value": "152922", "label": "阿拉善右旗" }, { "value": "152923", "label": "额济纳旗" }, { "value": "152971", "label": "内蒙古阿拉善经济开发区" }] }] }, { "value": "21", "label": "辽宁省", "children": [{ "value": "2101", "label": "沈阳市", "children": [{ "value": "210102", "label": "和平区" }, { "value": "210103", "label": "沈河区" }, { "value": "210104", "label": "大东区" }, { "value": "210105", "label": "皇姑区" }, { "value": "210106", "label": "铁西区" }, { "value": "210111", "label": "苏家屯区" }, { "value": "210112", "label": "浑南区" }, { "value": "210113", "label": "沈北新区" }, { "value": "210114", "label": "于洪区" }, { "value": "210115", "label": "辽中区" }, { "value": "210123", "label": "康平县" }, { "value": "210124", "label": "法库县" }, { "value": "210181", "label": "新民市" }] }, { "value": "2102", "label": "大连市", "children": [{ "value": "210202", "label": "中山区" }, { "value": "210203", "label": "西岗区" }, { "value": "210204", "label": "沙河口区" }, { "value": "210211", "label": "甘井子区" }, { "value": "210212", "label": "旅顺口区" }, { "value": "210213", "label": "金州区" }, { "value": "210214", "label": "普兰店区" }, { "value": "210224", "label": "长海县" }, { "value": "210281", "label": "瓦房店市" }, { "value": "210283", "label": "庄河市" }] }, { "value": "2103", "label": "鞍山市", "children": [{ "value": "210302", "label": "铁东区" }, { "value": "210303", "label": "铁西区" }, { "value": "210304", "label": "立山区" }, { "value": "210311", "label": "千山区" }, { "value": "210321", "label": "台安县" }, { "value": "210323", "label": "岫岩满族自治县" }, { "value": "210381", "label": "海城市" }] }, { "value": "2104", "label": "抚顺市", "children": [{ "value": "210402", "label": "新抚区" }, { "value": "210403", "label": "东洲区" }, { "value": "210404", "label": "望花区" }, { "value": "210411", "label": "顺城区" }, { "value": "210421", "label": "抚顺县" }, { "value": "210422", "label": "新宾满族自治县" }, { "value": "210423", "label": "清原满族自治县" }] }, { "value": "2105", "label": "本溪市", "children": [{ "value": "210502", "label": "平山区" }, { "value": "210503", "label": "溪湖区" }, { "value": "210504", "label": "明山区" }, { "value": "210505", "label": "南芬区" }, { "value": "210521", "label": "本溪满族自治县" }, { "value": "210522", "label": "桓仁满族自治县" }] }, { "value": "2106", "label": "丹东市", "children": [{ "value": "210602", "label": "元宝区" }, { "value": "210603", "label": "振兴区" }, { "value": "210604", "label": "振安区" }, { "value": "210624", "label": "宽甸满族自治县" }, { "value": "210681", "label": "东港市" }, { "value": "210682", "label": "凤城市" }] }, { "value": "2107", "label": "锦州市", "children": [{ "value": "210702", "label": "古塔区" }, { "value": "210703", "label": "凌河区" }, { "value": "210711", "label": "太和区" }, { "value": "210726", "label": "黑山县" }, { "value": "210727", "label": "义县" }, { "value": "210781", "label": "凌海市" }, { "value": "210782", "label": "北镇市" }] }, { "value": "2108", "label": "营口市", "children": [{ "value": "210802", "label": "站前区" }, { "value": "210803", "label": "西市区" }, { "value": "210804", "label": "鲅鱼圈区" }, { "value": "210811", "label": "老边区" }, { "value": "210881", "label": "盖州市" }, { "value": "210882", "label": "大石桥市" }] }, { "value": "2109", "label": "阜新市", "children": [{ "value": "210902", "label": "海州区" }, { "value": "210903", "label": "新邱区" }, { "value": "210904", "label": "太平区" }, { "value": "210905", "label": "清河门区" }, { "value": "210911", "label": "细河区" }, { "value": "210921", "label": "阜新蒙古族自治县" }, { "value": "210922", "label": "彰武县" }] }, { "value": "2110", "label": "辽阳市", "children": [{ "value": "211002", "label": "白塔区" }, { "value": "211003", "label": "文圣区" }, { "value": "211004", "label": "宏伟区" }, { "value": "211005", "label": "弓长岭区" }, { "value": "211011", "label": "太子河区" }, { "value": "211021", "label": "辽阳县" }, { "value": "211081", "label": "灯塔市" }] }, { "value": "2111", "label": "盘锦市", "children": [{ "value": "211102", "label": "双台子区" }, { "value": "211103", "label": "兴隆台区" }, { "value": "211104", "label": "大洼区" }, { "value": "211122", "label": "盘山县" }] }, { "value": "2112", "label": "铁岭市", "children": [{ "value": "211202", "label": "银州区" }, { "value": "211204", "label": "清河区" }, { "value": "211221", "label": "铁岭县" }, { "value": "211223", "label": "西丰县" }, { "value": "211224", "label": "昌图县" }, { "value": "211281", "label": "调兵山市" }, { "value": "211282", "label": "开原市" }] }, { "value": "2113", "label": "朝阳市", "children": [{ "value": "211302", "label": "双塔区" }, { "value": "211303", "label": "龙城区" }, { "value": "211321", "label": "朝阳县" }, { "value": "211322", "label": "建平县" }, { "value": "211324", "label": "喀喇沁左翼蒙古族自治县" }, { "value": "211381", "label": "北票市" }, { "value": "211382", "label": "凌源市" }] }, { "value": "2114", "label": "葫芦岛市", "children": [{ "value": "211402", "label": "连山区" }, { "value": "211403", "label": "龙港区" }, { "value": "211404", "label": "南票区" }, { "value": "211421", "label": "绥中县" }, { "value": "211422", "label": "建昌县" }, { "value": "211481", "label": "兴城市" }] }] }, { "value": "22", "label": "吉林省", "children": [{ "value": "2201", "label": "长春市", "children": [{ "value": "220102", "label": "南关区" }, { "value": "220103", "label": "宽城区" }, { "value": "220104", "label": "朝阳区" }, { "value": "220105", "label": "二道区" }, { "value": "220106", "label": "绿园区" }, { "value": "220112", "label": "双阳区" }, { "value": "220113", "label": "九台区" }, { "value": "220122", "label": "农安县" }, { "value": "220171", "label": "长春经济技术开发区" }, { "value": "220172", "label": "长春净月高新技术产业开发区" }, { "value": "220173", "label": "长春高新技术产业开发区" }, { "value": "220174", "label": "长春汽车经济技术开发区" }, { "value": "220182", "label": "榆树市" }, { "value": "220183", "label": "德惠市" }] }, { "value": "2202", "label": "吉林市", "children": [{ "value": "220202", "label": "昌邑区" }, { "value": "220203", "label": "龙潭区" }, { "value": "220204", "label": "船营区" }, { "value": "220211", "label": "丰满区" }, { "value": "220221", "label": "永吉县" }, { "value": "220271", "label": "吉林经济开发区" }, { "value": "220272", "label": "吉林高新技术产业开发区" }, { "value": "220273", "label": "吉林中国新加坡食品区" }, { "value": "220281", "label": "蛟河市" }, { "value": "220282", "label": "桦甸市" }, { "value": "220283", "label": "舒兰市" }, { "value": "220284", "label": "磐石市" }] }, { "value": "2203", "label": "四平市", "children": [{ "value": "220302", "label": "铁西区" }, { "value": "220303", "label": "铁东区" }, { "value": "220322", "label": "梨树县" }, { "value": "220323", "label": "伊通满族自治县" }, { "value": "220381", "label": "公主岭市" }, { "value": "220382", "label": "双辽市" }] }, { "value": "2204", "label": "辽源市", "children": [{ "value": "220402", "label": "龙山区" }, { "value": "220403", "label": "西安区" }, { "value": "220421", "label": "东丰县" }, { "value": "220422", "label": "东辽县" }] }, { "value": "2205", "label": "通化市", "children": [{ "value": "220502", "label": "东昌区" }, { "value": "220503", "label": "二道江区" }, { "value": "220521", "label": "通化县" }, { "value": "220523", "label": "辉南县" }, { "value": "220524", "label": "柳河县" }, { "value": "220581", "label": "梅河口市" }, { "value": "220582", "label": "集安市" }] }, { "value": "2206", "label": "白山市", "children": [{ "value": "220602", "label": "浑江区" }, { "value": "220605", "label": "江源区" }, { "value": "220621", "label": "抚松县" }, { "value": "220622", "label": "靖宇县" }, { "value": "220623", "label": "长白朝鲜族自治县" }, { "value": "220681", "label": "临江市" }] }, { "value": "2207", "label": "松原市", "children": [{ "value": "220702", "label": "宁江区" }, { "value": "220721", "label": "前郭尔罗斯蒙古族自治县" }, { "value": "220722", "label": "长岭县" }, { "value": "220723", "label": "乾安县" }, { "value": "220771", "label": "吉林松原经济开发区" }, { "value": "220781", "label": "扶余市" }] }, { "value": "2208", "label": "白城市", "children": [{ "value": "220802", "label": "洮北区" }, { "value": "220821", "label": "镇赉县" }, { "value": "220822", "label": "通榆县" }, { "value": "220871", "label": "吉林白城经济开发区" }, { "value": "220881", "label": "洮南市" }, { "value": "220882", "label": "大安市" }] }, { "value": "2224", "label": "延边朝鲜族自治州", "children": [{ "value": "222401", "label": "延吉市" }, { "value": "222402", "label": "图们市" }, { "value": "222403", "label": "敦化市" }, { "value": "222404", "label": "珲春市" }, { "value": "222405", "label": "龙井市" }, { "value": "222406", "label": "和龙市" }, { "value": "222424", "label": "汪清县" }, { "value": "222426", "label": "安图县" }] }] }, { "value": "23", "label": "黑龙江省", "children": [{ "value": "2301", "label": "哈尔滨市", "children": [{ "value": "230102", "label": "道里区" }, { "value": "230103", "label": "南岗区" }, { "value": "230104", "label": "道外区" }, { "value": "230108", "label": "平房区" }, { "value": "230109", "label": "松北区" }, { "value": "230110", "label": "香坊区" }, { "value": "230111", "label": "呼兰区" }, { "value": "230112", "label": "阿城区" }, { "value": "230113", "label": "双城区" }, { "value": "230123", "label": "依兰县" }, { "value": "230124", "label": "方正县" }, { "value": "230125", "label": "宾县" }, { "value": "230126", "label": "巴彦县" }, { "value": "230127", "label": "木兰县" }, { "value": "230128", "label": "通河县" }, { "value": "230129", "label": "延寿县" }, { "value": "230183", "label": "尚志市" }, { "value": "230184", "label": "五常市" }] }, { "value": "2302", "label": "齐齐哈尔市", "children": [{ "value": "230202", "label": "龙沙区" }, { "value": "230203", "label": "建华区" }, { "value": "230204", "label": "铁锋区" }, { "value": "230205", "label": "昂昂溪区" }, { "value": "230206", "label": "富拉尔基区" }, { "value": "230207", "label": "碾子山区" }, { "value": "230208", "label": "梅里斯达斡尔族区" }, { "value": "230221", "label": "龙江县" }, { "value": "230223", "label": "依安县" }, { "value": "230224", "label": "泰来县" }, { "value": "230225", "label": "甘南县" }, { "value": "230227", "label": "富裕县" }, { "value": "230229", "label": "克山县" }, { "value": "230230", "label": "克东县" }, { "value": "230231", "label": "拜泉县" }, { "value": "230281", "label": "讷河市" }] }, { "value": "2303", "label": "鸡西市", "children": [{ "value": "230302", "label": "鸡冠区" }, { "value": "230303", "label": "恒山区" }, { "value": "230304", "label": "滴道区" }, { "value": "230305", "label": "梨树区" }, { "value": "230306", "label": "城子河区" }, { "value": "230307", "label": "麻山区" }, { "value": "230321", "label": "鸡东县" }, { "value": "230381", "label": "虎林市" }, { "value": "230382", "label": "密山市" }] }, { "value": "2304", "label": "鹤岗市", "children": [{ "value": "230402", "label": "向阳区" }, { "value": "230403", "label": "工农区" }, { "value": "230404", "label": "南山区" }, { "value": "230405", "label": "兴安区" }, { "value": "230406", "label": "东山区" }, { "value": "230407", "label": "兴山区" }, { "value": "230421", "label": "萝北县" }, { "value": "230422", "label": "绥滨县" }] }, { "value": "2305", "label": "双鸭山市", "children": [{ "value": "230502", "label": "尖山区" }, { "value": "230503", "label": "岭东区" }, { "value": "230505", "label": "四方台区" }, { "value": "230506", "label": "宝山区" }, { "value": "230521", "label": "集贤县" }, { "value": "230522", "label": "友谊县" }, { "value": "230523", "label": "宝清县" }, { "value": "230524", "label": "饶河县" }] }, { "value": "2306", "label": "大庆市", "children": [{ "value": "230602", "label": "萨尔图区" }, { "value": "230603", "label": "龙凤区" }, { "value": "230604", "label": "让胡路区" }, { "value": "230605", "label": "红岗区" }, { "value": "230606", "label": "大同区" }, { "value": "230621", "label": "肇州县" }, { "value": "230622", "label": "肇源县" }, { "value": "230623", "label": "林甸县" }, { "value": "230624", "label": "杜尔伯特蒙古族自治县" }, { "value": "230671", "label": "大庆高新技术产业开发区" }] }, { "value": "2307", "label": "伊春市", "children": [{ "value": "230702", "label": "伊春区" }, { "value": "230703", "label": "南岔区" }, { "value": "230704", "label": "友好区" }, { "value": "230705", "label": "西林区" }, { "value": "230706", "label": "翠峦区" }, { "value": "230707", "label": "新青区" }, { "value": "230708", "label": "美溪区" }, { "value": "230709", "label": "金山屯区" }, { "value": "230710", "label": "五营区" }, { "value": "230711", "label": "乌马河区" }, { "value": "230712", "label": "汤旺河区" }, { "value": "230713", "label": "带岭区" }, { "value": "230714", "label": "乌伊岭区" }, { "value": "230715", "label": "红星区" }, { "value": "230716", "label": "上甘岭区" }, { "value": "230722", "label": "嘉荫县" }, { "value": "230781", "label": "铁力市" }] }, { "value": "2308", "label": "佳木斯市", "children": [{ "value": "230803", "label": "向阳区" }, { "value": "230804", "label": "前进区" }, { "value": "230805", "label": "东风区" }, { "value": "230811", "label": "郊区" }, { "value": "230822", "label": "桦南县" }, { "value": "230826", "label": "桦川县" }, { "value": "230828", "label": "汤原县" }, { "value": "230881", "label": "同江市" }, { "value": "230882", "label": "富锦市" }, { "value": "230883", "label": "抚远市" }] }, { "value": "2309", "label": "七台河市", "children": [{ "value": "230902", "label": "新兴区" }, { "value": "230903", "label": "桃山区" }, { "value": "230904", "label": "茄子河区" }, { "value": "230921", "label": "勃利县" }] }, { "value": "2310", "label": "牡丹江市", "children": [{ "value": "231002", "label": "东安区" }, { "value": "231003", "label": "阳明区" }, { "value": "231004", "label": "爱民区" }, { "value": "231005", "label": "西安区" }, { "value": "231025", "label": "林口县" }, { "value": "231071", "label": "牡丹江经济技术开发区" }, { "value": "231081", "label": "绥芬河市" }, { "value": "231083", "label": "海林市" }, { "value": "231084", "label": "宁安市" }, { "value": "231085", "label": "穆棱市" }, { "value": "231086", "label": "东宁市" }] }, { "value": "2311", "label": "黑河市", "children": [{ "value": "231102", "label": "爱辉区" }, { "value": "231121", "label": "嫩江县" }, { "value": "231123", "label": "逊克县" }, { "value": "231124", "label": "孙吴县" }, { "value": "231181", "label": "北安市" }, { "value": "231182", "label": "五大连池市" }] }, { "value": "2312", "label": "绥化市", "children": [{ "value": "231202", "label": "北林区" }, { "value": "231221", "label": "望奎县" }, { "value": "231222", "label": "兰西县" }, { "value": "231223", "label": "青冈县" }, { "value": "231224", "label": "庆安县" }, { "value": "231225", "label": "明水县" }, { "value": "231226", "label": "绥棱县" }, { "value": "231281", "label": "安达市" }, { "value": "231282", "label": "肇东市" }, { "value": "231283", "label": "海伦市" }] }, { "value": "2327", "label": "大兴安岭地区", "children": [{ "value": "232701", "label": "漠河市" }, { "value": "232721", "label": "呼玛县" }, { "value": "232722", "label": "塔河县" }, { "value": "232761", "label": "加格达奇区" }, { "value": "232762", "label": "松岭区" }, { "value": "232763", "label": "新林区" }, { "value": "232764", "label": "呼中区" }] }] }, { "value": "31", "label": "上海市", "children": [{ "value": "3101", "label": "市辖区", "children": [{ "value": "310101", "label": "黄浦区" }, { "value": "310104", "label": "徐汇区" }, { "value": "310105", "label": "长宁区" }, { "value": "310106", "label": "静安区" }, { "value": "310107", "label": "普陀区" }, { "value": "310109", "label": "虹口区" }, { "value": "310110", "label": "杨浦区" }, { "value": "310112", "label": "闵行区" }, { "value": "310113", "label": "宝山区" }, { "value": "310114", "label": "嘉定区" }, { "value": "310115", "label": "浦东新区" }, { "value": "310116", "label": "金山区" }, { "value": "310117", "label": "松江区" }, { "value": "310118", "label": "青浦区" }, { "value": "310120", "label": "奉贤区" }, { "value": "310151", "label": "崇明区" }] }] }, { "value": "32", "label": "江苏省", "children": [{ "value": "3201", "label": "南京市", "children": [{ "value": "320102", "label": "玄武区" }, { "value": "320104", "label": "秦淮区" }, { "value": "320105", "label": "建邺区" }, { "value": "320106", "label": "鼓楼区" }, { "value": "320111", "label": "浦口区" }, { "value": "320113", "label": "栖霞区" }, { "value": "320114", "label": "雨花台区" }, { "value": "320115", "label": "江宁区" }, { "value": "320116", "label": "六合区" }, { "value": "320117", "label": "溧水区" }, { "value": "320118", "label": "高淳区" }] }, { "value": "3202", "label": "无锡市", "children": [{ "value": "320205", "label": "锡山区" }, { "value": "320206", "label": "惠山区" }, { "value": "320211", "label": "滨湖区" }, { "value": "320213", "label": "梁溪区" }, { "value": "320214", "label": "新吴区" }, { "value": "320281", "label": "江阴市" }, { "value": "320282", "label": "宜兴市" }] }, { "value": "3203", "label": "徐州市", "children": [{ "value": "320302", "label": "鼓楼区" }, { "value": "320303", "label": "云龙区" }, { "value": "320305", "label": "贾汪区" }, { "value": "320311", "label": "泉山区" }, { "value": "320312", "label": "铜山区" }, { "value": "320321", "label": "丰县" }, { "value": "320322", "label": "沛县" }, { "value": "320324", "label": "睢宁县" }, { "value": "320371", "label": "徐州经济技术开发区" }, { "value": "320381", "label": "新沂市" }, { "value": "320382", "label": "邳州市" }] }, { "value": "3204", "label": "常州市", "children": [{ "value": "320402", "label": "天宁区" }, { "value": "320404", "label": "钟楼区" }, { "value": "320411", "label": "新北区" }, { "value": "320412", "label": "武进区" }, { "value": "320413", "label": "金坛区" }, { "value": "320481", "label": "溧阳市" }] }, { "value": "3205", "label": "苏州市", "children": [{ "value": "320505", "label": "虎丘区" }, { "value": "320506", "label": "吴中区" }, { "value": "320507", "label": "相城区" }, { "value": "320508", "label": "姑苏区" }, { "value": "320509", "label": "吴江区" }, { "value": "320571", "label": "苏州工业园区" }, { "value": "320581", "label": "常熟市" }, { "value": "320582", "label": "张家港市" }, { "value": "320583", "label": "昆山市" }, { "value": "320585", "label": "太仓市" }] }, { "value": "3206", "label": "南通市", "children": [{ "value": "320602", "label": "崇川区" }, { "value": "320611", "label": "港闸区" }, { "value": "320612", "label": "通州区" }, { "value": "320623", "label": "如东县" }, { "value": "320671", "label": "南通经济技术开发区" }, { "value": "320681", "label": "启东市" }, { "value": "320682", "label": "如皋市" }, { "value": "320684", "label": "海门市" }, { "value": "320685", "label": "海安市" }] }, { "value": "3207", "label": "连云港市", "children": [{ "value": "320703", "label": "连云区" }, { "value": "320706", "label": "海州区" }, { "value": "320707", "label": "赣榆区" }, { "value": "320722", "label": "东海县" }, { "value": "320723", "label": "灌云县" }, { "value": "320724", "label": "灌南县" }, { "value": "320771", "label": "连云港经济技术开发区" }, { "value": "320772", "label": "连云港高新技术产业开发区" }] }, { "value": "3208", "label": "淮安市", "children": [{ "value": "320803", "label": "淮安区" }, { "value": "320804", "label": "淮阴区" }, { "value": "320812", "label": "清江浦区" }, { "value": "320813", "label": "洪泽区" }, { "value": "320826", "label": "涟水县" }, { "value": "320830", "label": "盱眙县" }, { "value": "320831", "label": "金湖县" }, { "value": "320871", "label": "淮安经济技术开发区" }] }, { "value": "3209", "label": "盐城市", "children": [{ "value": "320902", "label": "亭湖区" }, { "value": "320903", "label": "盐都区" }, { "value": "320904", "label": "大丰区" }, { "value": "320921", "label": "响水县" }, { "value": "320922", "label": "滨海县" }, { "value": "320923", "label": "阜宁县" }, { "value": "320924", "label": "射阳县" }, { "value": "320925", "label": "建湖县" }, { "value": "320971", "label": "盐城经济技术开发区" }, { "value": "320981", "label": "东台市" }] }, { "value": "3210", "label": "扬州市", "children": [{ "value": "321002", "label": "广陵区" }, { "value": "321003", "label": "邗江区" }, { "value": "321012", "label": "江都区" }, { "value": "321023", "label": "宝应县" }, { "value": "321071", "label": "扬州经济技术开发区" }, { "value": "321081", "label": "仪征市" }, { "value": "321084", "label": "高邮市" }] }, { "value": "3211", "label": "镇江市", "children": [{ "value": "321102", "label": "京口区" }, { "value": "321111", "label": "润州区" }, { "value": "321112", "label": "丹徒区" }, { "value": "321171", "label": "镇江新区" }, { "value": "321181", "label": "丹阳市" }, { "value": "321182", "label": "扬中市" }, { "value": "321183", "label": "句容市" }] }, { "value": "3212", "label": "泰州市", "children": [{ "value": "321202", "label": "海陵区" }, { "value": "321203", "label": "高港区" }, { "value": "321204", "label": "姜堰区" }, { "value": "321271", "label": "泰州医药高新技术产业开发区" }, { "value": "321281", "label": "兴化市" }, { "value": "321282", "label": "靖江市" }, { "value": "321283", "label": "泰兴市" }] }, { "value": "3213", "label": "宿迁市", "children": [{ "value": "321302", "label": "宿城区" }, { "value": "321311", "label": "宿豫区" }, { "value": "321322", "label": "沭阳县" }, { "value": "321323", "label": "泗阳县" }, { "value": "321324", "label": "泗洪县" }, { "value": "321371", "label": "宿迁经济技术开发区" }] }] }, { "value": "33", "label": "浙江省", "children": [{ "value": "3301", "label": "杭州市", "children": [{ "value": "330102", "label": "上城区" }, { "value": "330103", "label": "下城区" }, { "value": "330104", "label": "江干区" }, { "value": "330105", "label": "拱墅区" }, { "value": "330106", "label": "西湖区" }, { "value": "330108", "label": "滨江区" }, { "value": "330109", "label": "萧山区" }, { "value": "330110", "label": "余杭区" }, { "value": "330111", "label": "富阳区" }, { "value": "330112", "label": "临安区" }, { "value": "330122", "label": "桐庐县" }, { "value": "330127", "label": "淳安县" }, { "value": "330182", "label": "建德市" }] }, { "value": "3302", "label": "宁波市", "children": [{ "value": "330203", "label": "海曙区" }, { "value": "330205", "label": "江北区" }, { "value": "330206", "label": "北仑区" }, { "value": "330211", "label": "镇海区" }, { "value": "330212", "label": "鄞州区" }, { "value": "330213", "label": "奉化区" }, { "value": "330225", "label": "象山县" }, { "value": "330226", "label": "宁海县" }, { "value": "330281", "label": "余姚市" }, { "value": "330282", "label": "慈溪市" }] }, { "value": "3303", "label": "温州市", "children": [{ "value": "330302", "label": "鹿城区" }, { "value": "330303", "label": "龙湾区" }, { "value": "330304", "label": "瓯海区" }, { "value": "330305", "label": "洞头区" }, { "value": "330324", "label": "永嘉县" }, { "value": "330326", "label": "平阳县" }, { "value": "330327", "label": "苍南县" }, { "value": "330328", "label": "文成县" }, { "value": "330329", "label": "泰顺县" }, { "value": "330371", "label": "温州经济技术开发区" }, { "value": "330381", "label": "瑞安市" }, { "value": "330382", "label": "乐清市" }] }, { "value": "3304", "label": "嘉兴市", "children": [{ "value": "330402", "label": "南湖区" }, { "value": "330411", "label": "秀洲区" }, { "value": "330421", "label": "嘉善县" }, { "value": "330424", "label": "海盐县" }, { "value": "330481", "label": "海宁市" }, { "value": "330482", "label": "平湖市" }, { "value": "330483", "label": "桐乡市" }] }, { "value": "3305", "label": "湖州市", "children": [{ "value": "330502", "label": "吴兴区" }, { "value": "330503", "label": "南浔区" }, { "value": "330521", "label": "德清县" }, { "value": "330522", "label": "长兴县" }, { "value": "330523", "label": "安吉县" }] }, { "value": "3306", "label": "绍兴市", "children": [{ "value": "330602", "label": "越城区" }, { "value": "330603", "label": "柯桥区" }, { "value": "330604", "label": "上虞区" }, { "value": "330624", "label": "新昌县" }, { "value": "330681", "label": "诸暨市" }, { "value": "330683", "label": "嵊州市" }] }, { "value": "3307", "label": "金华市", "children": [{ "value": "330702", "label": "婺城区" }, { "value": "330703", "label": "金东区" }, { "value": "330723", "label": "武义县" }, { "value": "330726", "label": "浦江县" }, { "value": "330727", "label": "磐安县" }, { "value": "330781", "label": "兰溪市" }, { "value": "330782", "label": "义乌市" }, { "value": "330783", "label": "东阳市" }, { "value": "330784", "label": "永康市" }] }, { "value": "3308", "label": "衢州市", "children": [{ "value": "330802", "label": "柯城区" }, { "value": "330803", "label": "衢江区" }, { "value": "330822", "label": "常山县" }, { "value": "330824", "label": "开化县" }, { "value": "330825", "label": "龙游县" }, { "value": "330881", "label": "江山市" }] }, { "value": "3309", "label": "舟山市", "children": [{ "value": "330902", "label": "定海区" }, { "value": "330903", "label": "普陀区" }, { "value": "330921", "label": "岱山县" }, { "value": "330922", "label": "嵊泗县" }] }, { "value": "3310", "label": "台州市", "children": [{ "value": "331002", "label": "椒江区" }, { "value": "331003", "label": "黄岩区" }, { "value": "331004", "label": "路桥区" }, { "value": "331022", "label": "三门县" }, { "value": "331023", "label": "天台县" }, { "value": "331024", "label": "仙居县" }, { "value": "331081", "label": "温岭市" }, { "value": "331082", "label": "临海市" }, { "value": "331083", "label": "玉环市" }] }, { "value": "3311", "label": "丽水市", "children": [{ "value": "331102", "label": "莲都区" }, { "value": "331121", "label": "青田县" }, { "value": "331122", "label": "缙云县" }, { "value": "331123", "label": "遂昌县" }, { "value": "331124", "label": "松阳县" }, { "value": "331125", "label": "云和县" }, { "value": "331126", "label": "庆元县" }, { "value": "331127", "label": "景宁畲族自治县" }, { "value": "331181", "label": "龙泉市" }] }] }, { "value": "34", "label": "安徽省", "children": [{ "value": "3401", "label": "合肥市", "children": [{ "value": "340102", "label": "瑶海区" }, { "value": "340103", "label": "庐阳区" }, { "value": "340104", "label": "蜀山区" }, { "value": "340111", "label": "包河区" }, { "value": "340121", "label": "长丰县" }, { "value": "340122", "label": "肥东县" }, { "value": "340123", "label": "肥西县" }, { "value": "340124", "label": "庐江县" }, { "value": "340171", "label": "合肥高新技术产业开发区" }, { "value": "340172", "label": "合肥经济技术开发区" }, { "value": "340173", "label": "合肥新站高新技术产业开发区" }, { "value": "340181", "label": "巢湖市" }] }, { "value": "3402", "label": "芜湖市", "children": [{ "value": "340202", "label": "镜湖区" }, { "value": "340203", "label": "弋江区" }, { "value": "340207", "label": "鸠江区" }, { "value": "340208", "label": "三山区" }, { "value": "340221", "label": "芜湖县" }, { "value": "340222", "label": "繁昌县" }, { "value": "340223", "label": "南陵县" }, { "value": "340225", "label": "无为县" }, { "value": "340271", "label": "芜湖经济技术开发区" }, { "value": "340272", "label": "安徽芜湖长江大桥经济开发区" }] }, { "value": "3403", "label": "蚌埠市", "children": [{ "value": "340302", "label": "龙子湖区" }, { "value": "340303", "label": "蚌山区" }, { "value": "340304", "label": "禹会区" }, { "value": "340311", "label": "淮上区" }, { "value": "340321", "label": "怀远县" }, { "value": "340322", "label": "五河县" }, { "value": "340323", "label": "固镇县" }, { "value": "340371", "label": "蚌埠市高新技术开发区" }, { "value": "340372", "label": "蚌埠市经济开发区" }] }, { "value": "3404", "label": "淮南市", "children": [{ "value": "340402", "label": "大通区" }, { "value": "340403", "label": "田家庵区" }, { "value": "340404", "label": "谢家集区" }, { "value": "340405", "label": "八公山区" }, { "value": "340406", "label": "潘集区" }, { "value": "340421", "label": "凤台县" }, { "value": "340422", "label": "寿县" }] }, { "value": "3405", "label": "马鞍山市", "children": [{ "value": "340503", "label": "花山区" }, { "value": "340504", "label": "雨山区" }, { "value": "340506", "label": "博望区" }, { "value": "340521", "label": "当涂县" }, { "value": "340522", "label": "含山县" }, { "value": "340523", "label": "和县" }] }, { "value": "3406", "label": "淮北市", "children": [{ "value": "340602", "label": "杜集区" }, { "value": "340603", "label": "相山区" }, { "value": "340604", "label": "烈山区" }, { "value": "340621", "label": "濉溪县" }] }, { "value": "3407", "label": "铜陵市", "children": [{ "value": "340705", "label": "铜官区" }, { "value": "340706", "label": "义安区" }, { "value": "340711", "label": "郊区" }, { "value": "340722", "label": "枞阳县" }] }, { "value": "3408", "label": "安庆市", "children": [{ "value": "340802", "label": "迎江区" }, { "value": "340803", "label": "大观区" }, { "value": "340811", "label": "宜秀区" }, { "value": "340822", "label": "怀宁县" }, { "value": "340825", "label": "太湖县" }, { "value": "340826", "label": "宿松县" }, { "value": "340827", "label": "望江县" }, { "value": "340828", "label": "岳西县" }, { "value": "340871", "label": "安徽安庆经济开发区" }, { "value": "340881", "label": "桐城市" }, { "value": "340882", "label": "潜山市" }] }, { "value": "3410", "label": "黄山市", "children": [{ "value": "341002", "label": "屯溪区" }, { "value": "341003", "label": "黄山区" }, { "value": "341004", "label": "徽州区" }, { "value": "341021", "label": "歙县" }, { "value": "341022", "label": "休宁县" }, { "value": "341023", "label": "黟县" }, { "value": "341024", "label": "祁门县" }] }, { "value": "3411", "label": "滁州市", "children": [{ "value": "341102", "label": "琅琊区" }, { "value": "341103", "label": "南谯区" }, { "value": "341122", "label": "来安县" }, { "value": "341124", "label": "全椒县" }, { "value": "341125", "label": "定远县" }, { "value": "341126", "label": "凤阳县" }, { "value": "341171", "label": "苏滁现代产业园" }, { "value": "341172", "label": "滁州经济技术开发区" }, { "value": "341181", "label": "天长市" }, { "value": "341182", "label": "明光市" }] }, { "value": "3412", "label": "阜阳市", "children": [{ "value": "341202", "label": "颍州区" }, { "value": "341203", "label": "颍东区" }, { "value": "341204", "label": "颍泉区" }, { "value": "341221", "label": "临泉县" }, { "value": "341222", "label": "太和县" }, { "value": "341225", "label": "阜南县" }, { "value": "341226", "label": "颍上县" }, { "value": "341271", "label": "阜阳合肥现代产业园区" }, { "value": "341272", "label": "阜阳经济技术开发区" }, { "value": "341282", "label": "界首市" }] }, { "value": "3413", "label": "宿州市", "children": [{ "value": "341302", "label": "埇桥区" }, { "value": "341321", "label": "砀山县" }, { "value": "341322", "label": "萧县" }, { "value": "341323", "label": "灵璧县" }, { "value": "341324", "label": "泗县" }, { "value": "341371", "label": "宿州马鞍山现代产业园区" }, { "value": "341372", "label": "宿州经济技术开发区" }] }, { "value": "3415", "label": "六安市", "children": [{ "value": "341502", "label": "金安区" }, { "value": "341503", "label": "裕安区" }, { "value": "341504", "label": "叶集区" }, { "value": "341522", "label": "霍邱县" }, { "value": "341523", "label": "舒城县" }, { "value": "341524", "label": "金寨县" }, { "value": "341525", "label": "霍山县" }] }, { "value": "3416", "label": "亳州市", "children": [{ "value": "341602", "label": "谯城区" }, { "value": "341621", "label": "涡阳县" }, { "value": "341622", "label": "蒙城县" }, { "value": "341623", "label": "利辛县" }] }, { "value": "3417", "label": "池州市", "children": [{ "value": "341702", "label": "贵池区" }, { "value": "341721", "label": "东至县" }, { "value": "341722", "label": "石台县" }, { "value": "341723", "label": "青阳县" }] }, { "value": "3418", "label": "宣城市", "children": [{ "value": "341802", "label": "宣州区" }, { "value": "341821", "label": "郎溪县" }, { "value": "341822", "label": "广德县" }, { "value": "341823", "label": "泾县" }, { "value": "341824", "label": "绩溪县" }, { "value": "341825", "label": "旌德县" }, { "value": "341871", "label": "宣城市经济开发区" }, { "value": "341881", "label": "宁国市" }] }] }, { "value": "35", "label": "福建省", "children": [{ "value": "3501", "label": "福州市", "children": [{ "value": "350102", "label": "鼓楼区" }, { "value": "350103", "label": "台江区" }, { "value": "350104", "label": "仓山区" }, { "value": "350105", "label": "马尾区" }, { "value": "350111", "label": "晋安区" }, { "value": "350112", "label": "长乐区" }, { "value": "350121", "label": "闽侯县" }, { "value": "350122", "label": "连江县" }, { "value": "350123", "label": "罗源县" }, { "value": "350124", "label": "闽清县" }, { "value": "350125", "label": "永泰县" }, { "value": "350128", "label": "平潭县" }, { "value": "350181", "label": "福清市" }] }, { "value": "3502", "label": "厦门市", "children": [{ "value": "350203", "label": "思明区" }, { "value": "350205", "label": "海沧区" }, { "value": "350206", "label": "湖里区" }, { "value": "350211", "label": "集美区" }, { "value": "350212", "label": "同安区" }, { "value": "350213", "label": "翔安区" }] }, { "value": "3503", "label": "莆田市", "children": [{ "value": "350302", "label": "城厢区" }, { "value": "350303", "label": "涵江区" }, { "value": "350304", "label": "荔城区" }, { "value": "350305", "label": "秀屿区" }, { "value": "350322", "label": "仙游县" }] }, { "value": "3504", "label": "三明市", "children": [{ "value": "350402", "label": "梅列区" }, { "value": "350403", "label": "三元区" }, { "value": "350421", "label": "明溪县" }, { "value": "350423", "label": "清流县" }, { "value": "350424", "label": "宁化县" }, { "value": "350425", "label": "大田县" }, { "value": "350426", "label": "尤溪县" }, { "value": "350427", "label": "沙县" }, { "value": "350428", "label": "将乐县" }, { "value": "350429", "label": "泰宁县" }, { "value": "350430", "label": "建宁县" }, { "value": "350481", "label": "永安市" }] }, { "value": "3505", "label": "泉州市", "children": [{ "value": "350502", "label": "鲤城区" }, { "value": "350503", "label": "丰泽区" }, { "value": "350504", "label": "洛江区" }, { "value": "350505", "label": "泉港区" }, { "value": "350521", "label": "惠安县" }, { "value": "350524", "label": "安溪县" }, { "value": "350525", "label": "永春县" }, { "value": "350526", "label": "德化县" }, { "value": "350527", "label": "金门县" }, { "value": "350581", "label": "石狮市" }, { "value": "350582", "label": "晋江市" }, { "value": "350583", "label": "南安市" }] }, { "value": "3506", "label": "漳州市", "children": [{ "value": "350602", "label": "芗城区" }, { "value": "350603", "label": "龙文区" }, { "value": "350622", "label": "云霄县" }, { "value": "350623", "label": "漳浦县" }, { "value": "350624", "label": "诏安县" }, { "value": "350625", "label": "长泰县" }, { "value": "350626", "label": "东山县" }, { "value": "350627", "label": "南靖县" }, { "value": "350628", "label": "平和县" }, { "value": "350629", "label": "华安县" }, { "value": "350681", "label": "龙海市" }] }, { "value": "3507", "label": "南平市", "children": [{ "value": "350702", "label": "延平区" }, { "value": "350703", "label": "建阳区" }, { "value": "350721", "label": "顺昌县" }, { "value": "350722", "label": "浦城县" }, { "value": "350723", "label": "光泽县" }, { "value": "350724", "label": "松溪县" }, { "value": "350725", "label": "政和县" }, { "value": "350781", "label": "邵武市" }, { "value": "350782", "label": "武夷山市" }, { "value": "350783", "label": "建瓯市" }] }, { "value": "3508", "label": "龙岩市", "children": [{ "value": "350802", "label": "新罗区" }, { "value": "350803", "label": "永定区" }, { "value": "350821", "label": "长汀县" }, { "value": "350823", "label": "上杭县" }, { "value": "350824", "label": "武平县" }, { "value": "350825", "label": "连城县" }, { "value": "350881", "label": "漳平市" }] }, { "value": "3509", "label": "宁德市", "children": [{ "value": "350902", "label": "蕉城区" }, { "value": "350921", "label": "霞浦县" }, { "value": "350922", "label": "古田县" }, { "value": "350923", "label": "屏南县" }, { "value": "350924", "label": "寿宁县" }, { "value": "350925", "label": "周宁县" }, { "value": "350926", "label": "柘荣县" }, { "value": "350981", "label": "福安市" }, { "value": "350982", "label": "福鼎市" }] }] }, { "value": "36", "label": "江西省", "children": [{ "value": "3601", "label": "南昌市", "children": [{ "value": "360102", "label": "东湖区" }, { "value": "360103", "label": "西湖区" }, { "value": "360104", "label": "青云谱区" }, { "value": "360105", "label": "湾里区" }, { "value": "360111", "label": "青山湖区" }, { "value": "360112", "label": "新建区" }, { "value": "360121", "label": "南昌县" }, { "value": "360123", "label": "安义县" }, { "value": "360124", "label": "进贤县" }] }, { "value": "3602", "label": "景德镇市", "children": [{ "value": "360202", "label": "昌江区" }, { "value": "360203", "label": "珠山区" }, { "value": "360222", "label": "浮梁县" }, { "value": "360281", "label": "乐平市" }] }, { "value": "3603", "label": "萍乡市", "children": [{ "value": "360302", "label": "安源区" }, { "value": "360313", "label": "湘东区" }, { "value": "360321", "label": "莲花县" }, { "value": "360322", "label": "上栗县" }, { "value": "360323", "label": "芦溪县" }] }, { "value": "3604", "label": "九江市", "children": [{ "value": "360402", "label": "濂溪区" }, { "value": "360403", "label": "浔阳区" }, { "value": "360404", "label": "柴桑区" }, { "value": "360423", "label": "武宁县" }, { "value": "360424", "label": "修水县" }, { "value": "360425", "label": "永修县" }, { "value": "360426", "label": "德安县" }, { "value": "360428", "label": "都昌县" }, { "value": "360429", "label": "湖口县" }, { "value": "360430", "label": "彭泽县" }, { "value": "360481", "label": "瑞昌市" }, { "value": "360482", "label": "共青城市" }, { "value": "360483", "label": "庐山市" }] }, { "value": "3605", "label": "新余市", "children": [{ "value": "360502", "label": "渝水区" }, { "value": "360521", "label": "分宜县" }] }, { "value": "3606", "label": "鹰潭市", "children": [{ "value": "360602", "label": "月湖区" }, { "value": "360603", "label": "余江区" }, { "value": "360681", "label": "贵溪市" }] }, { "value": "3607", "label": "赣州市", "children": [{ "value": "360702", "label": "章贡区" }, { "value": "360703", "label": "南康区" }, { "value": "360704", "label": "赣县区" }, { "value": "360722", "label": "信丰县" }, { "value": "360723", "label": "大余县" }, { "value": "360724", "label": "上犹县" }, { "value": "360725", "label": "崇义县" }, { "value": "360726", "label": "安远县" }, { "value": "360727", "label": "龙南县" }, { "value": "360728", "label": "定南县" }, { "value": "360729", "label": "全南县" }, { "value": "360730", "label": "宁都县" }, { "value": "360731", "label": "于都县" }, { "value": "360732", "label": "兴国县" }, { "value": "360733", "label": "会昌县" }, { "value": "360734", "label": "寻乌县" }, { "value": "360735", "label": "石城县" }, { "value": "360781", "label": "瑞金市" }] }, { "value": "3608", "label": "吉安市", "children": [{ "value": "360802", "label": "吉州区" }, { "value": "360803", "label": "青原区" }, { "value": "360821", "label": "吉安县" }, { "value": "360822", "label": "吉水县" }, { "value": "360823", "label": "峡江县" }, { "value": "360824", "label": "新干县" }, { "value": "360825", "label": "永丰县" }, { "value": "360826", "label": "泰和县" }, { "value": "360827", "label": "遂川县" }, { "value": "360828", "label": "万安县" }, { "value": "360829", "label": "安福县" }, { "value": "360830", "label": "永新县" }, { "value": "360881", "label": "井冈山市" }] }, { "value": "3609", "label": "宜春市", "children": [{ "value": "360902", "label": "袁州区" }, { "value": "360921", "label": "奉新县" }, { "value": "360922", "label": "万载县" }, { "value": "360923", "label": "上高县" }, { "value": "360924", "label": "宜丰县" }, { "value": "360925", "label": "靖安县" }, { "value": "360926", "label": "铜鼓县" }, { "value": "360981", "label": "丰城市" }, { "value": "360982", "label": "樟树市" }, { "value": "360983", "label": "高安市" }] }, { "value": "3610", "label": "抚州市", "children": [{ "value": "361002", "label": "临川区" }, { "value": "361003", "label": "东乡区" }, { "value": "361021", "label": "南城县" }, { "value": "361022", "label": "黎川县" }, { "value": "361023", "label": "南丰县" }, { "value": "361024", "label": "崇仁县" }, { "value": "361025", "label": "乐安县" }, { "value": "361026", "label": "宜黄县" }, { "value": "361027", "label": "金溪县" }, { "value": "361028", "label": "资溪县" }, { "value": "361030", "label": "广昌县" }] }, { "value": "3611", "label": "上饶市", "children": [{ "value": "361102", "label": "信州区" }, { "value": "361103", "label": "广丰区" }, { "value": "361121", "label": "上饶县" }, { "value": "361123", "label": "玉山县" }, { "value": "361124", "label": "铅山县" }, { "value": "361125", "label": "横峰县" }, { "value": "361126", "label": "弋阳县" }, { "value": "361127", "label": "余干县" }, { "value": "361128", "label": "鄱阳县" }, { "value": "361129", "label": "万年县" }, { "value": "361130", "label": "婺源县" }, { "value": "361181", "label": "德兴市" }] }] }, { "value": "37", "label": "山东省", "children": [{ "value": "3701", "label": "济南市", "children": [{ "value": "370102", "label": "历下区" }, { "value": "370103", "label": "市中区" }, { "value": "370104", "label": "槐荫区" }, { "value": "370105", "label": "天桥区" }, { "value": "370112", "label": "历城区" }, { "value": "370113", "label": "长清区" }, { "value": "370114", "label": "章丘区" }, { "value": "370115", "label": "济阳区" }, { "value": "370124", "label": "平阴县" }, { "value": "370126", "label": "商河县" }, { "value": "370171", "label": "济南高新技术产业开发区" }] }, { "value": "3702", "label": "青岛市", "children": [{ "value": "370202", "label": "市南区" }, { "value": "370203", "label": "市北区" }, { "value": "370211", "label": "黄岛区" }, { "value": "370212", "label": "崂山区" }, { "value": "370213", "label": "李沧区" }, { "value": "370214", "label": "城阳区" }, { "value": "370215", "label": "即墨区" }, { "value": "370271", "label": "青岛高新技术产业开发区" }, { "value": "370281", "label": "胶州市" }, { "value": "370283", "label": "平度市" }, { "value": "370285", "label": "莱西市" }] }, { "value": "3703", "label": "淄博市", "children": [{ "value": "370302", "label": "淄川区" }, { "value": "370303", "label": "张店区" }, { "value": "370304", "label": "博山区" }, { "value": "370305", "label": "临淄区" }, { "value": "370306", "label": "周村区" }, { "value": "370321", "label": "桓台县" }, { "value": "370322", "label": "高青县" }, { "value": "370323", "label": "沂源县" }] }, { "value": "3704", "label": "枣庄市", "children": [{ "value": "370402", "label": "市中区" }, { "value": "370403", "label": "薛城区" }, { "value": "370404", "label": "峄城区" }, { "value": "370405", "label": "台儿庄区" }, { "value": "370406", "label": "山亭区" }, { "value": "370481", "label": "滕州市" }] }, { "value": "3705", "label": "东营市", "children": [{ "value": "370502", "label": "东营区" }, { "value": "370503", "label": "河口区" }, { "value": "370505", "label": "垦利区" }, { "value": "370522", "label": "利津县" }, { "value": "370523", "label": "广饶县" }, { "value": "370571", "label": "东营经济技术开发区" }, { "value": "370572", "label": "东营港经济开发区" }] }, { "value": "3706", "label": "烟台市", "children": [{ "value": "370602", "label": "芝罘区" }, { "value": "370611", "label": "福山区" }, { "value": "370612", "label": "牟平区" }, { "value": "370613", "label": "莱山区" }, { "value": "370634", "label": "长岛县" }, { "value": "370671", "label": "烟台高新技术产业开发区" }, { "value": "370672", "label": "烟台经济技术开发区" }, { "value": "370681", "label": "龙口市" }, { "value": "370682", "label": "莱阳市" }, { "value": "370683", "label": "莱州市" }, { "value": "370684", "label": "蓬莱市" }, { "value": "370685", "label": "招远市" }, { "value": "370686", "label": "栖霞市" }, { "value": "370687", "label": "海阳市" }] }, { "value": "3707", "label": "潍坊市", "children": [{ "value": "370702", "label": "潍城区" }, { "value": "370703", "label": "寒亭区" }, { "value": "370704", "label": "坊子区" }, { "value": "370705", "label": "奎文区" }, { "value": "370724", "label": "临朐县" }, { "value": "370725", "label": "昌乐县" }, { "value": "370772", "label": "潍坊滨海经济技术开发区" }, { "value": "370781", "label": "青州市" }, { "value": "370782", "label": "诸城市" }, { "value": "370783", "label": "寿光市" }, { "value": "370784", "label": "安丘市" }, { "value": "370785", "label": "高密市" }, { "value": "370786", "label": "昌邑市" }] }, { "value": "3708", "label": "济宁市", "children": [{ "value": "370811", "label": "任城区" }, { "value": "370812", "label": "兖州区" }, { "value": "370826", "label": "微山县" }, { "value": "370827", "label": "鱼台县" }, { "value": "370828", "label": "金乡县" }, { "value": "370829", "label": "嘉祥县" }, { "value": "370830", "label": "汶上县" }, { "value": "370831", "label": "泗水县" }, { "value": "370832", "label": "梁山县" }, { "value": "370871", "label": "济宁高新技术产业开发区" }, { "value": "370881", "label": "曲阜市" }, { "value": "370883", "label": "邹城市" }] }, { "value": "3709", "label": "泰安市", "children": [{ "value": "370902", "label": "泰山区" }, { "value": "370911", "label": "岱岳区" }, { "value": "370921", "label": "宁阳县" }, { "value": "370923", "label": "东平县" }, { "value": "370982", "label": "新泰市" }, { "value": "370983", "label": "肥城市" }] }, { "value": "3710", "label": "威海市", "children": [{ "value": "371002", "label": "环翠区" }, { "value": "371003", "label": "文登区" }, { "value": "371071", "label": "威海火炬高技术产业开发区" }, { "value": "371072", "label": "威海经济技术开发区" }, { "value": "371073", "label": "威海临港经济技术开发区" }, { "value": "371082", "label": "荣成市" }, { "value": "371083", "label": "乳山市" }] }, { "value": "3711", "label": "日照市", "children": [{ "value": "371102", "label": "东港区" }, { "value": "371103", "label": "岚山区" }, { "value": "371121", "label": "五莲县" }, { "value": "371122", "label": "莒县" }, { "value": "371171", "label": "日照经济技术开发区" }] }, { "value": "3712", "label": "莱芜市", "children": [{ "value": "371202", "label": "莱城区" }, { "value": "371203", "label": "钢城区" }] }, { "value": "3713", "label": "临沂市", "children": [{ "value": "371302", "label": "兰山区" }, { "value": "371311", "label": "罗庄区" }, { "value": "371312", "label": "河东区" }, { "value": "371321", "label": "沂南县" }, { "value": "371322", "label": "郯城县" }, { "value": "371323", "label": "沂水县" }, { "value": "371324", "label": "兰陵县" }, { "value": "371325", "label": "费县" }, { "value": "371326", "label": "平邑县" }, { "value": "371327", "label": "莒南县" }, { "value": "371328", "label": "蒙阴县" }, { "value": "371329", "label": "临沭县" }, { "value": "371371", "label": "临沂高新技术产业开发区" }, { "value": "371372", "label": "临沂经济技术开发区" }, { "value": "371373", "label": "临沂临港经济开发区" }] }, { "value": "3714", "label": "德州市", "children": [{ "value": "371402", "label": "德城区" }, { "value": "371403", "label": "陵城区" }, { "value": "371422", "label": "宁津县" }, { "value": "371423", "label": "庆云县" }, { "value": "371424", "label": "临邑县" }, { "value": "371425", "label": "齐河县" }, { "value": "371426", "label": "平原县" }, { "value": "371427", "label": "夏津县" }, { "value": "371428", "label": "武城县" }, { "value": "371471", "label": "德州经济技术开发区" }, { "value": "371472", "label": "德州运河经济开发区" }, { "value": "371481", "label": "乐陵市" }, { "value": "371482", "label": "禹城市" }] }, { "value": "3715", "label": "聊城市", "children": [{ "value": "371502", "label": "东昌府区" }, { "value": "371521", "label": "阳谷县" }, { "value": "371522", "label": "莘县" }, { "value": "371523", "label": "茌平县" }, { "value": "371524", "label": "东阿县" }, { "value": "371525", "label": "冠县" }, { "value": "371526", "label": "高唐县" }, { "value": "371581", "label": "临清市" }] }, { "value": "3716", "label": "滨州市", "children": [{ "value": "371602", "label": "滨城区" }, { "value": "371603", "label": "沾化区" }, { "value": "371621", "label": "惠民县" }, { "value": "371622", "label": "阳信县" }, { "value": "371623", "label": "无棣县" }, { "value": "371625", "label": "博兴县" }, { "value": "371681", "label": "邹平市" }] }, { "value": "3717", "label": "菏泽市", "children": [{ "value": "371702", "label": "牡丹区" }, { "value": "371703", "label": "定陶区" }, { "value": "371721", "label": "曹县" }, { "value": "371722", "label": "单县" }, { "value": "371723", "label": "成武县" }, { "value": "371724", "label": "巨野县" }, { "value": "371725", "label": "郓城县" }, { "value": "371726", "label": "鄄城县" }, { "value": "371728", "label": "东明县" }, { "value": "371771", "label": "菏泽经济技术开发区" }, { "value": "371772", "label": "菏泽高新技术开发区" }] }] }, { "value": "41", "label": "河南省", "children": [{ "value": "4101", "label": "郑州市", "children": [{ "value": "410102", "label": "中原区" }, { "value": "410103", "label": "二七区" }, { "value": "410104", "label": "管城回族区" }, { "value": "410105", "label": "金水区" }, { "value": "410106", "label": "上街区" }, { "value": "410108", "label": "惠济区" }, { "value": "410122", "label": "中牟县" }, { "value": "410171", "label": "郑州经济技术开发区" }, { "value": "410172", "label": "郑州高新技术产业开发区" }, { "value": "410173", "label": "郑州航空港经济综合实验区" }, { "value": "410181", "label": "巩义市" }, { "value": "410182", "label": "荥阳市" }, { "value": "410183", "label": "新密市" }, { "value": "410184", "label": "新郑市" }, { "value": "410185", "label": "登封市" }] }, { "value": "4102", "label": "开封市", "children": [{ "value": "410202", "label": "龙亭区" }, { "value": "410203", "label": "顺河回族区" }, { "value": "410204", "label": "鼓楼区" }, { "value": "410205", "label": "禹王台区" }, { "value": "410212", "label": "祥符区" }, { "value": "410221", "label": "杞县" }, { "value": "410222", "label": "通许县" }, { "value": "410223", "label": "尉氏县" }, { "value": "410225", "label": "兰考县" }] }, { "value": "4103", "label": "洛阳市", "children": [{ "value": "410302", "label": "老城区" }, { "value": "410303", "label": "西工区" }, { "value": "410304", "label": "瀍河回族区" }, { "value": "410305", "label": "涧西区" }, { "value": "410306", "label": "吉利区" }, { "value": "410311", "label": "洛龙区" }, { "value": "410322", "label": "孟津县" }, { "value": "410323", "label": "新安县" }, { "value": "410324", "label": "栾川县" }, { "value": "410325", "label": "嵩县" }, { "value": "410326", "label": "汝阳县" }, { "value": "410327", "label": "宜阳县" }, { "value": "410328", "label": "洛宁县" }, { "value": "410329", "label": "伊川县" }, { "value": "410371", "label": "洛阳高新技术产业开发区" }, { "value": "410381", "label": "偃师市" }] }, { "value": "4104", "label": "平顶山市", "children": [{ "value": "410402", "label": "新华区" }, { "value": "410403", "label": "卫东区" }, { "value": "410404", "label": "石龙区" }, { "value": "410411", "label": "湛河区" }, { "value": "410421", "label": "宝丰县" }, { "value": "410422", "label": "叶县" }, { "value": "410423", "label": "鲁山县" }, { "value": "410425", "label": "郏县" }, { "value": "410471", "label": "平顶山高新技术产业开发区" }, { "value": "410472", "label": "平顶山市新城区" }, { "value": "410481", "label": "舞钢市" }, { "value": "410482", "label": "汝州市" }] }, { "value": "4105", "label": "安阳市", "children": [{ "value": "410502", "label": "文峰区" }, { "value": "410503", "label": "北关区" }, { "value": "410505", "label": "殷都区" }, { "value": "410506", "label": "龙安区" }, { "value": "410522", "label": "安阳县" }, { "value": "410523", "label": "汤阴县" }, { "value": "410526", "label": "滑县" }, { "value": "410527", "label": "内黄县" }, { "value": "410571", "label": "安阳高新技术产业开发区" }, { "value": "410581", "label": "林州市" }] }, { "value": "4106", "label": "鹤壁市", "children": [{ "value": "410602", "label": "鹤山区" }, { "value": "410603", "label": "山城区" }, { "value": "410611", "label": "淇滨区" }, { "value": "410621", "label": "浚县" }, { "value": "410622", "label": "淇县" }, { "value": "410671", "label": "鹤壁经济技术开发区" }] }, { "value": "4107", "label": "新乡市", "children": [{ "value": "410702", "label": "红旗区" }, { "value": "410703", "label": "卫滨区" }, { "value": "410704", "label": "凤泉区" }, { "value": "410711", "label": "牧野区" }, { "value": "410721", "label": "新乡县" }, { "value": "410724", "label": "获嘉县" }, { "value": "410725", "label": "原阳县" }, { "value": "410726", "label": "延津县" }, { "value": "410727", "label": "封丘县" }, { "value": "410728", "label": "长垣县" }, { "value": "410771", "label": "新乡高新技术产业开发区" }, { "value": "410772", "label": "新乡经济技术开发区" }, { "value": "410773", "label": "新乡市平原城乡一体化示范区" }, { "value": "410781", "label": "卫辉市" }, { "value": "410782", "label": "辉县市" }] }, { "value": "4108", "label": "焦作市", "children": [{ "value": "410802", "label": "解放区" }, { "value": "410803", "label": "中站区" }, { "value": "410804", "label": "马村区" }, { "value": "410811", "label": "山阳区" }, { "value": "410821", "label": "修武县" }, { "value": "410822", "label": "博爱县" }, { "value": "410823", "label": "武陟县" }, { "value": "410825", "label": "温县" }, { "value": "410871", "label": "焦作城乡一体化示范区" }, { "value": "410882", "label": "沁阳市" }, { "value": "410883", "label": "孟州市" }] }, { "value": "4109", "label": "濮阳市", "children": [{ "value": "410902", "label": "华龙区" }, { "value": "410922", "label": "清丰县" }, { "value": "410923", "label": "南乐县" }, { "value": "410926", "label": "范县" }, { "value": "410927", "label": "台前县" }, { "value": "410928", "label": "濮阳县" }, { "value": "410971", "label": "河南濮阳工业园区" }, { "value": "410972", "label": "濮阳经济技术开发区" }] }, { "value": "4110", "label": "许昌市", "children": [{ "value": "411002", "label": "魏都区" }, { "value": "411003", "label": "建安区" }, { "value": "411024", "label": "鄢陵县" }, { "value": "411025", "label": "襄城县" }, { "value": "411071", "label": "许昌经济技术开发区" }, { "value": "411081", "label": "禹州市" }, { "value": "411082", "label": "长葛市" }] }, { "value": "4111", "label": "漯河市", "children": [{ "value": "411102", "label": "源汇区" }, { "value": "411103", "label": "郾城区" }, { "value": "411104", "label": "召陵区" }, { "value": "411121", "label": "舞阳县" }, { "value": "411122", "label": "临颍县" }, { "value": "411171", "label": "漯河经济技术开发区" }] }, { "value": "4112", "label": "三门峡市", "children": [{ "value": "411202", "label": "湖滨区" }, { "value": "411203", "label": "陕州区" }, { "value": "411221", "label": "渑池县" }, { "value": "411224", "label": "卢氏县" }, { "value": "411271", "label": "河南三门峡经济开发区" }, { "value": "411281", "label": "义马市" }, { "value": "411282", "label": "灵宝市" }] }, { "value": "4113", "label": "南阳市", "children": [{ "value": "411302", "label": "宛城区" }, { "value": "411303", "label": "卧龙区" }, { "value": "411321", "label": "南召县" }, { "value": "411322", "label": "方城县" }, { "value": "411323", "label": "西峡县" }, { "value": "411324", "label": "镇平县" }, { "value": "411325", "label": "内乡县" }, { "value": "411326", "label": "淅川县" }, { "value": "411327", "label": "社旗县" }, { "value": "411328", "label": "唐河县" }, { "value": "411329", "label": "新野县" }, { "value": "411330", "label": "桐柏县" }, { "value": "411371", "label": "南阳高新技术产业开发区" }, { "value": "411372", "label": "南阳市城乡一体化示范区" }, { "value": "411381", "label": "邓州市" }] }, { "value": "4114", "label": "商丘市", "children": [{ "value": "411402", "label": "梁园区" }, { "value": "411403", "label": "睢阳区" }, { "value": "411421", "label": "民权县" }, { "value": "411422", "label": "睢县" }, { "value": "411423", "label": "宁陵县" }, { "value": "411424", "label": "柘城县" }, { "value": "411425", "label": "虞城县" }, { "value": "411426", "label": "夏邑县" }, { "value": "411471", "label": "豫东综合物流产业聚集区" }, { "value": "411472", "label": "河南商丘经济开发区" }, { "value": "411481", "label": "永城市" }] }, { "value": "4115", "label": "信阳市", "children": [{ "value": "411502", "label": "浉河区" }, { "value": "411503", "label": "平桥区" }, { "value": "411521", "label": "罗山县" }, { "value": "411522", "label": "光山县" }, { "value": "411523", "label": "新县" }, { "value": "411524", "label": "商城县" }, { "value": "411525", "label": "固始县" }, { "value": "411526", "label": "潢川县" }, { "value": "411527", "label": "淮滨县" }, { "value": "411528", "label": "息县" }, { "value": "411571", "label": "信阳高新技术产业开发区" }] }, { "value": "4116", "label": "周口市", "children": [{ "value": "411602", "label": "川汇区" }, { "value": "411621", "label": "扶沟县" }, { "value": "411622", "label": "西华县" }, { "value": "411623", "label": "商水县" }, { "value": "411624", "label": "沈丘县" }, { "value": "411625", "label": "郸城县" }, { "value": "411626", "label": "淮阳县" }, { "value": "411627", "label": "太康县" }, { "value": "411628", "label": "鹿邑县" }, { "value": "411671", "label": "河南周口经济开发区" }, { "value": "411681", "label": "项城市" }] }, { "value": "4117", "label": "驻马店市", "children": [{ "value": "411702", "label": "驿城区" }, { "value": "411721", "label": "西平县" }, { "value": "411722", "label": "上蔡县" }, { "value": "411723", "label": "平舆县" }, { "value": "411724", "label": "正阳县" }, { "value": "411725", "label": "确山县" }, { "value": "411726", "label": "泌阳县" }, { "value": "411727", "label": "汝南县" }, { "value": "411728", "label": "遂平县" }, { "value": "411729", "label": "新蔡县" }, { "value": "411771", "label": "河南驻马店经济开发区" }] }, { "value": "4190", "label": "省直辖县级行政区划", "children": [{ "value": "419001", "label": "济源市" }] }] }, { "value": "42", "label": "湖北省", "children": [{ "value": "4201", "label": "武汉市", "children": [{ "value": "420102", "label": "江岸区" }, { "value": "420103", "label": "江汉区" }, { "value": "420104", "label": "硚口区" }, { "value": "420105", "label": "汉阳区" }, { "value": "420106", "label": "武昌区" }, { "value": "420107", "label": "青山区" }, { "value": "420111", "label": "洪山区" }, { "value": "420112", "label": "东西湖区" }, { "value": "420113", "label": "汉南区" }, { "value": "420114", "label": "蔡甸区" }, { "value": "420115", "label": "江夏区" }, { "value": "420116", "label": "黄陂区" }, { "value": "420117", "label": "新洲区" }] }, { "value": "4202", "label": "黄石市", "children": [{ "value": "420202", "label": "黄石港区" }, { "value": "420203", "label": "西塞山区" }, { "value": "420204", "label": "下陆区" }, { "value": "420205", "label": "铁山区" }, { "value": "420222", "label": "阳新县" }, { "value": "420281", "label": "大冶市" }] }, { "value": "4203", "label": "十堰市", "children": [{ "value": "420302", "label": "茅箭区" }, { "value": "420303", "label": "张湾区" }, { "value": "420304", "label": "郧阳区" }, { "value": "420322", "label": "郧西县" }, { "value": "420323", "label": "竹山县" }, { "value": "420324", "label": "竹溪县" }, { "value": "420325", "label": "房县" }, { "value": "420381", "label": "丹江口市" }] }, { "value": "4205", "label": "宜昌市", "children": [{ "value": "420502", "label": "西陵区" }, { "value": "420503", "label": "伍家岗区" }, { "value": "420504", "label": "点军区" }, { "value": "420505", "label": "猇亭区" }, { "value": "420506", "label": "夷陵区" }, { "value": "420525", "label": "远安县" }, { "value": "420526", "label": "兴山县" }, { "value": "420527", "label": "秭归县" }, { "value": "420528", "label": "长阳土家族自治县" }, { "value": "420529", "label": "五峰土家族自治县" }, { "value": "420581", "label": "宜都市" }, { "value": "420582", "label": "当阳市" }, { "value": "420583", "label": "枝江市" }] }, { "value": "4206", "label": "襄阳市", "children": [{ "value": "420602", "label": "襄城区" }, { "value": "420606", "label": "樊城区" }, { "value": "420607", "label": "襄州区" }, { "value": "420624", "label": "南漳县" }, { "value": "420625", "label": "谷城县" }, { "value": "420626", "label": "保康县" }, { "value": "420682", "label": "老河口市" }, { "value": "420683", "label": "枣阳市" }, { "value": "420684", "label": "宜城市" }] }, { "value": "4207", "label": "鄂州市", "children": [{ "value": "420702", "label": "梁子湖区" }, { "value": "420703", "label": "华容区" }, { "value": "420704", "label": "鄂城区" }] }, { "value": "4208", "label": "荆门市", "children": [{ "value": "420802", "label": "东宝区" }, { "value": "420804", "label": "掇刀区" }, { "value": "420822", "label": "沙洋县" }, { "value": "420881", "label": "钟祥市" }, { "value": "420882", "label": "京山市" }] }, { "value": "4209", "label": "孝感市", "children": [{ "value": "420902", "label": "孝南区" }, { "value": "420921", "label": "孝昌县" }, { "value": "420922", "label": "大悟县" }, { "value": "420923", "label": "云梦县" }, { "value": "420981", "label": "应城市" }, { "value": "420982", "label": "安陆市" }, { "value": "420984", "label": "汉川市" }] }, { "value": "4210", "label": "荆州市", "children": [{ "value": "421002", "label": "沙市区" }, { "value": "421003", "label": "荆州区" }, { "value": "421022", "label": "公安县" }, { "value": "421023", "label": "监利县" }, { "value": "421024", "label": "江陵县" }, { "value": "421071", "label": "荆州经济技术开发区" }, { "value": "421081", "label": "石首市" }, { "value": "421083", "label": "洪湖市" }, { "value": "421087", "label": "松滋市" }] }, { "value": "4211", "label": "黄冈市", "children": [{ "value": "421102", "label": "黄州区" }, { "value": "421121", "label": "团风县" }, { "value": "421122", "label": "红安县" }, { "value": "421123", "label": "罗田县" }, { "value": "421124", "label": "英山县" }, { "value": "421125", "label": "浠水县" }, { "value": "421126", "label": "蕲春县" }, { "value": "421127", "label": "黄梅县" }, { "value": "421171", "label": "龙感湖管理区" }, { "value": "421181", "label": "麻城市" }, { "value": "421182", "label": "武穴市" }] }, { "value": "4212", "label": "咸宁市", "children": [{ "value": "421202", "label": "咸安区" }, { "value": "421221", "label": "嘉鱼县" }, { "value": "421222", "label": "通城县" }, { "value": "421223", "label": "崇阳县" }, { "value": "421224", "label": "通山县" }, { "value": "421281", "label": "赤壁市" }] }, { "value": "4213", "label": "随州市", "children": [{ "value": "421303", "label": "曾都区" }, { "value": "421321", "label": "随县" }, { "value": "421381", "label": "广水市" }] }, { "value": "4228", "label": "恩施土家族苗族自治州", "children": [{ "value": "422801", "label": "恩施市" }, { "value": "422802", "label": "利川市" }, { "value": "422822", "label": "建始县" }, { "value": "422823", "label": "巴东县" }, { "value": "422825", "label": "宣恩县" }, { "value": "422826", "label": "咸丰县" }, { "value": "422827", "label": "来凤县" }, { "value": "422828", "label": "鹤峰县" }] }, { "value": "4290", "label": "省直辖县级行政区划", "children": [{ "value": "429004", "label": "仙桃市" }, { "value": "429005", "label": "潜江市" }, { "value": "429006", "label": "天门市" }, { "value": "429021", "label": "神农架林区" }] }] }, { "value": "43", "label": "湖南省", "children": [{ "value": "4301", "label": "长沙市", "children": [{ "value": "430102", "label": "芙蓉区" }, { "value": "430103", "label": "天心区" }, { "value": "430104", "label": "岳麓区" }, { "value": "430105", "label": "开福区" }, { "value": "430111", "label": "雨花区" }, { "value": "430112", "label": "望城区" }, { "value": "430121", "label": "长沙县" }, { "value": "430181", "label": "浏阳市" }, { "value": "430182", "label": "宁乡市" }] }, { "value": "4302", "label": "株洲市", "children": [{ "value": "430202", "label": "荷塘区" }, { "value": "430203", "label": "芦淞区" }, { "value": "430204", "label": "石峰区" }, { "value": "430211", "label": "天元区" }, { "value": "430212", "label": "渌口区" }, { "value": "430223", "label": "攸县" }, { "value": "430224", "label": "茶陵县" }, { "value": "430225", "label": "炎陵县" }, { "value": "430271", "label": "云龙示范区" }, { "value": "430281", "label": "醴陵市" }] }, { "value": "4303", "label": "湘潭市", "children": [{ "value": "430302", "label": "雨湖区" }, { "value": "430304", "label": "岳塘区" }, { "value": "430321", "label": "湘潭县" }, { "value": "430371", "label": "湖南湘潭高新技术产业园区" }, { "value": "430372", "label": "湘潭昭山示范区" }, { "value": "430373", "label": "湘潭九华示范区" }, { "value": "430381", "label": "湘乡市" }, { "value": "430382", "label": "韶山市" }] }, { "value": "4304", "label": "衡阳市", "children": [{ "value": "430405", "label": "珠晖区" }, { "value": "430406", "label": "雁峰区" }, { "value": "430407", "label": "石鼓区" }, { "value": "430408", "label": "蒸湘区" }, { "value": "430412", "label": "南岳区" }, { "value": "430421", "label": "衡阳县" }, { "value": "430422", "label": "衡南县" }, { "value": "430423", "label": "衡山县" }, { "value": "430424", "label": "衡东县" }, { "value": "430426", "label": "祁东县" }, { "value": "430471", "label": "衡阳综合保税区" }, { "value": "430472", "label": "湖南衡阳高新技术产业园区" }, { "value": "430473", "label": "湖南衡阳松木经济开发区" }, { "value": "430481", "label": "耒阳市" }, { "value": "430482", "label": "常宁市" }] }, { "value": "4305", "label": "邵阳市", "children": [{ "value": "430502", "label": "双清区" }, { "value": "430503", "label": "大祥区" }, { "value": "430511", "label": "北塔区" }, { "value": "430521", "label": "邵东县" }, { "value": "430522", "label": "新邵县" }, { "value": "430523", "label": "邵阳县" }, { "value": "430524", "label": "隆回县" }, { "value": "430525", "label": "洞口县" }, { "value": "430527", "label": "绥宁县" }, { "value": "430528", "label": "新宁县" }, { "value": "430529", "label": "城步苗族自治县" }, { "value": "430581", "label": "武冈市" }] }, { "value": "4306", "label": "岳阳市", "children": [{ "value": "430602", "label": "岳阳楼区" }, { "value": "430603", "label": "云溪区" }, { "value": "430611", "label": "君山区" }, { "value": "430621", "label": "岳阳县" }, { "value": "430623", "label": "华容县" }, { "value": "430624", "label": "湘阴县" }, { "value": "430626", "label": "平江县" }, { "value": "430671", "label": "岳阳市屈原管理区" }, { "value": "430681", "label": "汨罗市" }, { "value": "430682", "label": "临湘市" }] }, { "value": "4307", "label": "常德市", "children": [{ "value": "430702", "label": "武陵区" }, { "value": "430703", "label": "鼎城区" }, { "value": "430721", "label": "安乡县" }, { "value": "430722", "label": "汉寿县" }, { "value": "430723", "label": "澧县" }, { "value": "430724", "label": "临澧县" }, { "value": "430725", "label": "桃源县" }, { "value": "430726", "label": "石门县" }, { "value": "430771", "label": "常德市西洞庭管理区" }, { "value": "430781", "label": "津市市" }] }, { "value": "4308", "label": "张家界市", "children": [{ "value": "430802", "label": "永定区" }, { "value": "430811", "label": "武陵源区" }, { "value": "430821", "label": "慈利县" }, { "value": "430822", "label": "桑植县" }] }, { "value": "4309", "label": "益阳市", "children": [{ "value": "430902", "label": "资阳区" }, { "value": "430903", "label": "赫山区" }, { "value": "430921", "label": "南县" }, { "value": "430922", "label": "桃江县" }, { "value": "430923", "label": "安化县" }, { "value": "430971", "label": "益阳市大通湖管理区" }, { "value": "430972", "label": "湖南益阳高新技术产业园区" }, { "value": "430981", "label": "沅江市" }] }, { "value": "4310", "label": "郴州市", "children": [{ "value": "431002", "label": "北湖区" }, { "value": "431003", "label": "苏仙区" }, { "value": "431021", "label": "桂阳县" }, { "value": "431022", "label": "宜章县" }, { "value": "431023", "label": "永兴县" }, { "value": "431024", "label": "嘉禾县" }, { "value": "431025", "label": "临武县" }, { "value": "431026", "label": "汝城县" }, { "value": "431027", "label": "桂东县" }, { "value": "431028", "label": "安仁县" }, { "value": "431081", "label": "资兴市" }] }, { "value": "4311", "label": "永州市", "children": [{ "value": "431102", "label": "零陵区" }, { "value": "431103", "label": "冷水滩区" }, { "value": "431121", "label": "祁阳县" }, { "value": "431122", "label": "东安县" }, { "value": "431123", "label": "双牌县" }, { "value": "431124", "label": "道县" }, { "value": "431125", "label": "江永县" }, { "value": "431126", "label": "宁远县" }, { "value": "431127", "label": "蓝山县" }, { "value": "431128", "label": "新田县" }, { "value": "431129", "label": "江华瑶族自治县" }, { "value": "431171", "label": "永州经济技术开发区" }, { "value": "431172", "label": "永州市金洞管理区" }, { "value": "431173", "label": "永州市回龙圩管理区" }] }, { "value": "4312", "label": "怀化市", "children": [{ "value": "431202", "label": "鹤城区" }, { "value": "431221", "label": "中方县" }, { "value": "431222", "label": "沅陵县" }, { "value": "431223", "label": "辰溪县" }, { "value": "431224", "label": "溆浦县" }, { "value": "431225", "label": "会同县" }, { "value": "431226", "label": "麻阳苗族自治县" }, { "value": "431227", "label": "新晃侗族自治县" }, { "value": "431228", "label": "芷江侗族自治县" }, { "value": "431229", "label": "靖州苗族侗族自治县" }, { "value": "431230", "label": "通道侗族自治县" }, { "value": "431271", "label": "怀化市洪江管理区" }, { "value": "431281", "label": "洪江市" }] }, { "value": "4313", "label": "娄底市", "children": [{ "value": "431302", "label": "娄星区" }, { "value": "431321", "label": "双峰县" }, { "value": "431322", "label": "新化县" }, { "value": "431381", "label": "冷水江市" }, { "value": "431382", "label": "涟源市" }] }, { "value": "4331", "label": "湘西土家族苗族自治州", "children": [{ "value": "433101", "label": "吉首市" }, { "value": "433122", "label": "泸溪县" }, { "value": "433123", "label": "凤凰县" }, { "value": "433124", "label": "花垣县" }, { "value": "433125", "label": "保靖县" }, { "value": "433126", "label": "古丈县" }, { "value": "433127", "label": "永顺县" }, { "value": "433130", "label": "龙山县" }, { "value": "433172", "label": "湖南吉首经济开发区" }, { "value": "433173", "label": "湖南永顺经济开发区" }] }] }, { "value": "44", "label": "广东省", "children": [{ "value": "4401", "label": "广州市", "children": [{ "value": "440103", "label": "荔湾区" }, { "value": "440104", "label": "越秀区" }, { "value": "440105", "label": "海珠区" }, { "value": "440106", "label": "天河区" }, { "value": "440111", "label": "白云区" }, { "value": "440112", "label": "黄埔区" }, { "value": "440113", "label": "番禺区" }, { "value": "440114", "label": "花都区" }, { "value": "440115", "label": "南沙区" }, { "value": "440117", "label": "从化区" }, { "value": "440118", "label": "增城区" }] }, { "value": "4402", "label": "韶关市", "children": [{ "value": "440203", "label": "武江区" }, { "value": "440204", "label": "浈江区" }, { "value": "440205", "label": "曲江区" }, { "value": "440222", "label": "始兴县" }, { "value": "440224", "label": "仁化县" }, { "value": "440229", "label": "翁源县" }, { "value": "440232", "label": "乳源瑶族自治县" }, { "value": "440233", "label": "新丰县" }, { "value": "440281", "label": "乐昌市" }, { "value": "440282", "label": "南雄市" }] }, { "value": "4403", "label": "深圳市", "children": [{ "value": "440303", "label": "罗湖区" }, { "value": "440304", "label": "福田区" }, { "value": "440305", "label": "南山区" }, { "value": "440306", "label": "宝安区" }, { "value": "440307", "label": "龙岗区" }, { "value": "440308", "label": "盐田区" }, { "value": "440309", "label": "龙华区" }, { "value": "440310", "label": "坪山区" }, { "value": "440311", "label": "光明区" }] }, { "value": "4404", "label": "珠海市", "children": [{ "value": "440402", "label": "香洲区" }, { "value": "440403", "label": "斗门区" }, { "value": "440404", "label": "金湾区" }] }, { "value": "4405", "label": "汕头市", "children": [{ "value": "440507", "label": "龙湖区" }, { "value": "440511", "label": "金平区" }, { "value": "440512", "label": "濠江区" }, { "value": "440513", "label": "潮阳区" }, { "value": "440514", "label": "潮南区" }, { "value": "440515", "label": "澄海区" }, { "value": "440523", "label": "南澳县" }] }, { "value": "4406", "label": "佛山市", "children": [{ "value": "440604", "label": "禅城区" }, { "value": "440605", "label": "南海区" }, { "value": "440606", "label": "顺德区" }, { "value": "440607", "label": "三水区" }, { "value": "440608", "label": "高明区" }] }, { "value": "4407", "label": "江门市", "children": [{ "value": "440703", "label": "蓬江区" }, { "value": "440704", "label": "江海区" }, { "value": "440705", "label": "新会区" }, { "value": "440781", "label": "台山市" }, { "value": "440783", "label": "开平市" }, { "value": "440784", "label": "鹤山市" }, { "value": "440785", "label": "恩平市" }] }, { "value": "4408", "label": "湛江市", "children": [{ "value": "440802", "label": "赤坎区" }, { "value": "440803", "label": "霞山区" }, { "value": "440804", "label": "坡头区" }, { "value": "440811", "label": "麻章区" }, { "value": "440823", "label": "遂溪县" }, { "value": "440825", "label": "徐闻县" }, { "value": "440881", "label": "廉江市" }, { "value": "440882", "label": "雷州市" }, { "value": "440883", "label": "吴川市" }] }, { "value": "4409", "label": "茂名市", "children": [{ "value": "440902", "label": "茂南区" }, { "value": "440904", "label": "电白区" }, { "value": "440981", "label": "高州市" }, { "value": "440982", "label": "化州市" }, { "value": "440983", "label": "信宜市" }] }, { "value": "4412", "label": "肇庆市", "children": [{ "value": "441202", "label": "端州区" }, { "value": "441203", "label": "鼎湖区" }, { "value": "441204", "label": "高要区" }, { "value": "441223", "label": "广宁县" }, { "value": "441224", "label": "怀集县" }, { "value": "441225", "label": "封开县" }, { "value": "441226", "label": "德庆县" }, { "value": "441284", "label": "四会市" }] }, { "value": "4413", "label": "惠州市", "children": [{ "value": "441302", "label": "惠城区" }, { "value": "441303", "label": "惠阳区" }, { "value": "441322", "label": "博罗县" }, { "value": "441323", "label": "惠东县" }, { "value": "441324", "label": "龙门县" }] }, { "value": "4414", "label": "梅州市", "children": [{ "value": "441402", "label": "梅江区" }, { "value": "441403", "label": "梅县区" }, { "value": "441422", "label": "大埔县" }, { "value": "441423", "label": "丰顺县" }, { "value": "441424", "label": "五华县" }, { "value": "441426", "label": "平远县" }, { "value": "441427", "label": "蕉岭县" }, { "value": "441481", "label": "兴宁市" }] }, { "value": "4415", "label": "汕尾市", "children": [{ "value": "441502", "label": "城区" }, { "value": "441521", "label": "海丰县" }, { "value": "441523", "label": "陆河县" }, { "value": "441581", "label": "陆丰市" }] }, { "value": "4416", "label": "河源市", "children": [{ "value": "441602", "label": "源城区" }, { "value": "441621", "label": "紫金县" }, { "value": "441622", "label": "龙川县" }, { "value": "441623", "label": "连平县" }, { "value": "441624", "label": "和平县" }, { "value": "441625", "label": "东源县" }] }, { "value": "4417", "label": "阳江市", "children": [{ "value": "441702", "label": "江城区" }, { "value": "441704", "label": "阳东区" }, { "value": "441721", "label": "阳西县" }, { "value": "441781", "label": "阳春市" }] }, { "value": "4418", "label": "清远市", "children": [{ "value": "441802", "label": "清城区" }, { "value": "441803", "label": "清新区" }, { "value": "441821", "label": "佛冈县" }, { "value": "441823", "label": "阳山县" }, { "value": "441825", "label": "连山壮族瑶族自治县" }, { "value": "441826", "label": "连南瑶族自治县" }, { "value": "441881", "label": "英德市" }, { "value": "441882", "label": "连州市" }] }, { "value": "4419", "label": "东莞市", "children": [{ "value": "441900003", "label": "东城街道" }, { "value": "441900004", "label": "南城街道" }, { "value": "441900005", "label": "万江街道" }, { "value": "441900006", "label": "莞城街道" }, { "value": "441900101", "label": "石碣镇" }, { "value": "441900102", "label": "石龙镇" }, { "value": "441900103", "label": "茶山镇" }, { "value": "441900104", "label": "石排镇" }, { "value": "441900105", "label": "企石镇" }, { "value": "441900106", "label": "横沥镇" }, { "value": "441900107", "label": "桥头镇" }, { "value": "441900108", "label": "谢岗镇" }, { "value": "441900109", "label": "东坑镇" }, { "value": "441900110", "label": "常平镇" }, { "value": "441900111", "label": "寮步镇" }, { "value": "441900112", "label": "樟木头镇" }, { "value": "441900113", "label": "大朗镇" }, { "value": "441900114", "label": "黄江镇" }, { "value": "441900115", "label": "清溪镇" }, { "value": "441900116", "label": "塘厦镇" }, { "value": "441900117", "label": "凤岗镇" }, { "value": "441900118", "label": "大岭山镇" }, { "value": "441900119", "label": "长安镇" }, { "value": "441900121", "label": "虎门镇" }, { "value": "441900122", "label": "厚街镇" }, { "value": "441900123", "label": "沙田镇" }, { "value": "441900124", "label": "道滘镇" }, { "value": "441900125", "label": "洪梅镇" }, { "value": "441900126", "label": "麻涌镇" }, { "value": "441900127", "label": "望牛墩镇" }, { "value": "441900128", "label": "中堂镇" }, { "value": "441900129", "label": "高埗镇" }, { "value": "441900401", "label": "松山湖管委会" }, { "value": "441900402", "label": "东莞港" }, { "value": "441900403", "label": "东莞生态园" }] }, { "value": "4420", "label": "中山市", "children": [{ "value": "442000001", "label": "石岐区街道" }, { "value": "442000002", "label": "东区街道" }, { "value": "442000003", "label": "火炬开发区街道" }, { "value": "442000004", "label": "西区街道" }, { "value": "442000005", "label": "南区街道" }, { "value": "442000006", "label": "五桂山街道" }, { "value": "442000100", "label": "小榄镇" }, { "value": "442000101", "label": "黄圃镇" }, { "value": "442000102", "label": "民众镇" }, { "value": "442000103", "label": "东凤镇" }, { "value": "442000104", "label": "东升镇" }, { "value": "442000105", "label": "古镇镇" }, { "value": "442000106", "label": "沙溪镇" }, { "value": "442000107", "label": "坦洲镇" }, { "value": "442000108", "label": "港口镇" }, { "value": "442000109", "label": "三角镇" }, { "value": "442000110", "label": "横栏镇" }, { "value": "442000111", "label": "南头镇" }, { "value": "442000112", "label": "阜沙镇" }, { "value": "442000113", "label": "南朗镇" }, { "value": "442000114", "label": "三乡镇" }, { "value": "442000115", "label": "板芙镇" }, { "value": "442000116", "label": "大涌镇" }, { "value": "442000117", "label": "神湾镇" }] }, { "value": "4451", "label": "潮州市", "children": [{ "value": "445102", "label": "湘桥区" }, { "value": "445103", "label": "潮安区" }, { "value": "445122", "label": "饶平县" }] }, { "value": "4452", "label": "揭阳市", "children": [{ "value": "445202", "label": "榕城区" }, { "value": "445203", "label": "揭东区" }, { "value": "445222", "label": "揭西县" }, { "value": "445224", "label": "惠来县" }, { "value": "445281", "label": "普宁市" }] }, { "value": "4453", "label": "云浮市", "children": [{ "value": "445302", "label": "云城区" }, { "value": "445303", "label": "云安区" }, { "value": "445321", "label": "新兴县" }, { "value": "445322", "label": "郁南县" }, { "value": "445381", "label": "罗定市" }] }] }, { "value": "45", "label": "广西壮族自治区", "children": [{ "value": "4501", "label": "南宁市", "children": [{ "value": "450102", "label": "兴宁区" }, { "value": "450103", "label": "青秀区" }, { "value": "450105", "label": "江南区" }, { "value": "450107", "label": "西乡塘区" }, { "value": "450108", "label": "良庆区" }, { "value": "450109", "label": "邕宁区" }, { "value": "450110", "label": "武鸣区" }, { "value": "450123", "label": "隆安县" }, { "value": "450124", "label": "马山县" }, { "value": "450125", "label": "上林县" }, { "value": "450126", "label": "宾阳县" }, { "value": "450127", "label": "横县" }] }, { "value": "4502", "label": "柳州市", "children": [{ "value": "450202", "label": "城中区" }, { "value": "450203", "label": "鱼峰区" }, { "value": "450204", "label": "柳南区" }, { "value": "450205", "label": "柳北区" }, { "value": "450206", "label": "柳江区" }, { "value": "450222", "label": "柳城县" }, { "value": "450223", "label": "鹿寨县" }, { "value": "450224", "label": "融安县" }, { "value": "450225", "label": "融水苗族自治县" }, { "value": "450226", "label": "三江侗族自治县" }] }, { "value": "4503", "label": "桂林市", "children": [{ "value": "450302", "label": "秀峰区" }, { "value": "450303", "label": "叠彩区" }, { "value": "450304", "label": "象山区" }, { "value": "450305", "label": "七星区" }, { "value": "450311", "label": "雁山区" }, { "value": "450312", "label": "临桂区" }, { "value": "450321", "label": "阳朔县" }, { "value": "450323", "label": "灵川县" }, { "value": "450324", "label": "全州县" }, { "value": "450325", "label": "兴安县" }, { "value": "450326", "label": "永福县" }, { "value": "450327", "label": "灌阳县" }, { "value": "450328", "label": "龙胜各族自治县" }, { "value": "450329", "label": "资源县" }, { "value": "450330", "label": "平乐县" }, { "value": "450332", "label": "恭城瑶族自治县" }, { "value": "450381", "label": "荔浦市" }] }, { "value": "4504", "label": "梧州市", "children": [{ "value": "450403", "label": "万秀区" }, { "value": "450405", "label": "长洲区" }, { "value": "450406", "label": "龙圩区" }, { "value": "450421", "label": "苍梧县" }, { "value": "450422", "label": "藤县" }, { "value": "450423", "label": "蒙山县" }, { "value": "450481", "label": "岑溪市" }] }, { "value": "4505", "label": "北海市", "children": [{ "value": "450502", "label": "海城区" }, { "value": "450503", "label": "银海区" }, { "value": "450512", "label": "铁山港区" }, { "value": "450521", "label": "合浦县" }] }, { "value": "4506", "label": "防城港市", "children": [{ "value": "450602", "label": "港口区" }, { "value": "450603", "label": "防城区" }, { "value": "450621", "label": "上思县" }, { "value": "450681", "label": "东兴市" }] }, { "value": "4507", "label": "钦州市", "children": [{ "value": "450702", "label": "钦南区" }, { "value": "450703", "label": "钦北区" }, { "value": "450721", "label": "灵山县" }, { "value": "450722", "label": "浦北县" }] }, { "value": "4508", "label": "贵港市", "children": [{ "value": "450802", "label": "港北区" }, { "value": "450803", "label": "港南区" }, { "value": "450804", "label": "覃塘区" }, { "value": "450821", "label": "平南县" }, { "value": "450881", "label": "桂平市" }] }, { "value": "4509", "label": "玉林市", "children": [{ "value": "450902", "label": "玉州区" }, { "value": "450903", "label": "福绵区" }, { "value": "450921", "label": "容县" }, { "value": "450922", "label": "陆川县" }, { "value": "450923", "label": "博白县" }, { "value": "450924", "label": "兴业县" }, { "value": "450981", "label": "北流市" }] }, { "value": "4510", "label": "百色市", "children": [{ "value": "451002", "label": "右江区" }, { "value": "451021", "label": "田阳县" }, { "value": "451022", "label": "田东县" }, { "value": "451023", "label": "平果县" }, { "value": "451024", "label": "德保县" }, { "value": "451026", "label": "那坡县" }, { "value": "451027", "label": "凌云县" }, { "value": "451028", "label": "乐业县" }, { "value": "451029", "label": "田林县" }, { "value": "451030", "label": "西林县" }, { "value": "451031", "label": "隆林各族自治县" }, { "value": "451081", "label": "靖西市" }] }, { "value": "4511", "label": "贺州市", "children": [{ "value": "451102", "label": "八步区" }, { "value": "451103", "label": "平桂区" }, { "value": "451121", "label": "昭平县" }, { "value": "451122", "label": "钟山县" }, { "value": "451123", "label": "富川瑶族自治县" }] }, { "value": "4512", "label": "河池市", "children": [{ "value": "451202", "label": "金城江区" }, { "value": "451203", "label": "宜州区" }, { "value": "451221", "label": "南丹县" }, { "value": "451222", "label": "天峨县" }, { "value": "451223", "label": "凤山县" }, { "value": "451224", "label": "东兰县" }, { "value": "451225", "label": "罗城仫佬族自治县" }, { "value": "451226", "label": "环江毛南族自治县" }, { "value": "451227", "label": "巴马瑶族自治县" }, { "value": "451228", "label": "都安瑶族自治县" }, { "value": "451229", "label": "大化瑶族自治县" }] }, { "value": "4513", "label": "来宾市", "children": [{ "value": "451302", "label": "兴宾区" }, { "value": "451321", "label": "忻城县" }, { "value": "451322", "label": "象州县" }, { "value": "451323", "label": "武宣县" }, { "value": "451324", "label": "金秀瑶族自治县" }, { "value": "451381", "label": "合山市" }] }, { "value": "4514", "label": "崇左市", "children": [{ "value": "451402", "label": "江州区" }, { "value": "451421", "label": "扶绥县" }, { "value": "451422", "label": "宁明县" }, { "value": "451423", "label": "龙州县" }, { "value": "451424", "label": "大新县" }, { "value": "451425", "label": "天等县" }, { "value": "451481", "label": "凭祥市" }] }] }, { "value": "46", "label": "海南省", "children": [{ "value": "4601", "label": "海口市", "children": [{ "value": "460105", "label": "秀英区" }, { "value": "460106", "label": "龙华区" }, { "value": "460107", "label": "琼山区" }, { "value": "460108", "label": "美兰区" }] }, { "value": "4602", "label": "三亚市", "children": [{ "value": "460202", "label": "海棠区" }, { "value": "460203", "label": "吉阳区" }, { "value": "460204", "label": "天涯区" }, { "value": "460205", "label": "崖州区" }] }, { "value": "4603", "label": "三沙市", "children": [{ "value": "460321", "label": "西沙群岛" }, { "value": "460322", "label": "南沙群岛" }, { "value": "460323", "label": "中沙群岛的岛礁及其海域" }] }, { "value": "4604", "label": "儋州市", "children": [{ "value": "460400100", "label": "那大镇" }, { "value": "460400101", "label": "和庆镇" }, { "value": "460400102", "label": "南丰镇" }, { "value": "460400103", "label": "大成镇" }, { "value": "460400104", "label": "雅星镇" }, { "value": "460400105", "label": "兰洋镇" }, { "value": "460400106", "label": "光村镇" }, { "value": "460400107", "label": "木棠镇" }, { "value": "460400108", "label": "海头镇" }, { "value": "460400109", "label": "峨蔓镇" }, { "value": "460400111", "label": "王五镇" }, { "value": "460400112", "label": "白马井镇" }, { "value": "460400113", "label": "中和镇" }, { "value": "460400114", "label": "排浦镇" }, { "value": "460400115", "label": "东成镇" }, { "value": "460400116", "label": "新州镇" }, { "value": "460400499", "label": "洋浦经济开发区" }, { "value": "460400500", "label": "华南热作学院" }] }, { "value": "4690", "label": "省直辖县级行政区划", "children": [{ "value": "469001", "label": "五指山市" }, { "value": "469002", "label": "琼海市" }, { "value": "469005", "label": "文昌市" }, { "value": "469006", "label": "万宁市" }, { "value": "469007", "label": "东方市" }, { "value": "469021", "label": "定安县" }, { "value": "469022", "label": "屯昌县" }, { "value": "469023", "label": "澄迈县" }, { "value": "469024", "label": "临高县" }, { "value": "469025", "label": "白沙黎族自治县" }, { "value": "469026", "label": "昌江黎族自治县" }, { "value": "469027", "label": "乐东黎族自治县" }, { "value": "469028", "label": "陵水黎族自治县" }, { "value": "469029", "label": "保亭黎族苗族自治县" }, { "value": "469030", "label": "琼中黎族苗族自治县" }] }] }, { "value": "50", "label": "重庆市", "children": [{ "value": "5001", "label": "市辖区", "children": [{ "value": "500101", "label": "万州区" }, { "value": "500102", "label": "涪陵区" }, { "value": "500103", "label": "渝中区" }, { "value": "500104", "label": "大渡口区" }, { "value": "500105", "label": "江北区" }, { "value": "500106", "label": "沙坪坝区" }, { "value": "500107", "label": "九龙坡区" }, { "value": "500108", "label": "南岸区" }, { "value": "500109", "label": "北碚区" }, { "value": "500110", "label": "綦江区" }, { "value": "500111", "label": "大足区" }, { "value": "500112", "label": "渝北区" }, { "value": "500113", "label": "巴南区" }, { "value": "500114", "label": "黔江区" }, { "value": "500115", "label": "长寿区" }, { "value": "500116", "label": "江津区" }, { "value": "500117", "label": "合川区" }, { "value": "500118", "label": "永川区" }, { "value": "500119", "label": "南川区" }, { "value": "500120", "label": "璧山区" }, { "value": "500151", "label": "铜梁区" }, { "value": "500152", "label": "潼南区" }, { "value": "500153", "label": "荣昌区" }, { "value": "500154", "label": "开州区" }, { "value": "500155", "label": "梁平区" }, { "value": "500156", "label": "武隆区" }] }, { "value": "5002", "label": "县", "children": [{ "value": "500229", "label": "城口县" }, { "value": "500230", "label": "丰都县" }, { "value": "500231", "label": "垫江县" }, { "value": "500233", "label": "忠县" }, { "value": "500235", "label": "云阳县" }, { "value": "500236", "label": "奉节县" }, { "value": "500237", "label": "巫山县" }, { "value": "500238", "label": "巫溪县" }, { "value": "500240", "label": "石柱土家族自治县" }, { "value": "500241", "label": "秀山土家族苗族自治县" }, { "value": "500242", "label": "酉阳土家族苗族自治县" }, { "value": "500243", "label": "彭水苗族土家族自治县" }] }] }, { "value": "51", "label": "四川省", "children": [{ "value": "5101", "label": "成都市", "children": [{ "value": "510104", "label": "锦江区" }, { "value": "510105", "label": "青羊区" }, { "value": "510106", "label": "金牛区" }, { "value": "510107", "label": "武侯区" }, { "value": "510108", "label": "成华区" }, { "value": "510112", "label": "龙泉驿区" }, { "value": "510113", "label": "青白江区" }, { "value": "510114", "label": "新都区" }, { "value": "510115", "label": "温江区" }, { "value": "510116", "label": "双流区" }, { "value": "510117", "label": "郫都区" }, { "value": "510121", "label": "金堂县" }, { "value": "510129", "label": "大邑县" }, { "value": "510131", "label": "蒲江县" }, { "value": "510132", "label": "新津县" }, { "value": "510181", "label": "都江堰市" }, { "value": "510182", "label": "彭州市" }, { "value": "510183", "label": "邛崃市" }, { "value": "510184", "label": "崇州市" }, { "value": "510185", "label": "简阳市" }] }, { "value": "5103", "label": "自贡市", "children": [{ "value": "510302", "label": "自流井区" }, { "value": "510303", "label": "贡井区" }, { "value": "510304", "label": "大安区" }, { "value": "510311", "label": "沿滩区" }, { "value": "510321", "label": "荣县" }, { "value": "510322", "label": "富顺县" }] }, { "value": "5104", "label": "攀枝花市", "children": [{ "value": "510402", "label": "东区" }, { "value": "510403", "label": "西区" }, { "value": "510411", "label": "仁和区" }, { "value": "510421", "label": "米易县" }, { "value": "510422", "label": "盐边县" }] }, { "value": "5105", "label": "泸州市", "children": [{ "value": "510502", "label": "江阳区" }, { "value": "510503", "label": "纳溪区" }, { "value": "510504", "label": "龙马潭区" }, { "value": "510521", "label": "泸县" }, { "value": "510522", "label": "合江县" }, { "value": "510524", "label": "叙永县" }, { "value": "510525", "label": "古蔺县" }] }, { "value": "5106", "label": "德阳市", "children": [{ "value": "510603", "label": "旌阳区" }, { "value": "510604", "label": "罗江区" }, { "value": "510623", "label": "中江县" }, { "value": "510681", "label": "广汉市" }, { "value": "510682", "label": "什邡市" }, { "value": "510683", "label": "绵竹市" }] }, { "value": "5107", "label": "绵阳市", "children": [{ "value": "510703", "label": "涪城区" }, { "value": "510704", "label": "游仙区" }, { "value": "510705", "label": "安州区" }, { "value": "510722", "label": "三台县" }, { "value": "510723", "label": "盐亭县" }, { "value": "510725", "label": "梓潼县" }, { "value": "510726", "label": "北川羌族自治县" }, { "value": "510727", "label": "平武县" }, { "value": "510781", "label": "江油市" }] }, { "value": "5108", "label": "广元市", "children": [{ "value": "510802", "label": "利州区" }, { "value": "510811", "label": "昭化区" }, { "value": "510812", "label": "朝天区" }, { "value": "510821", "label": "旺苍县" }, { "value": "510822", "label": "青川县" }, { "value": "510823", "label": "剑阁县" }, { "value": "510824", "label": "苍溪县" }] }, { "value": "5109", "label": "遂宁市", "children": [{ "value": "510903", "label": "船山区" }, { "value": "510904", "label": "安居区" }, { "value": "510921", "label": "蓬溪县" }, { "value": "510922", "label": "射洪县" }, { "value": "510923", "label": "大英县" }] }, { "value": "5110", "label": "内江市", "children": [{ "value": "511002", "label": "市中区" }, { "value": "511011", "label": "东兴区" }, { "value": "511024", "label": "威远县" }, { "value": "511025", "label": "资中县" }, { "value": "511071", "label": "内江经济开发区" }, { "value": "511083", "label": "隆昌市" }] }, { "value": "5111", "label": "乐山市", "children": [{ "value": "511102", "label": "市中区" }, { "value": "511111", "label": "沙湾区" }, { "value": "511112", "label": "五通桥区" }, { "value": "511113", "label": "金口河区" }, { "value": "511123", "label": "犍为县" }, { "value": "511124", "label": "井研县" }, { "value": "511126", "label": "夹江县" }, { "value": "511129", "label": "沐川县" }, { "value": "511132", "label": "峨边彝族自治县" }, { "value": "511133", "label": "马边彝族自治县" }, { "value": "511181", "label": "峨眉山市" }] }, { "value": "5113", "label": "南充市", "children": [{ "value": "511302", "label": "顺庆区" }, { "value": "511303", "label": "高坪区" }, { "value": "511304", "label": "嘉陵区" }, { "value": "511321", "label": "南部县" }, { "value": "511322", "label": "营山县" }, { "value": "511323", "label": "蓬安县" }, { "value": "511324", "label": "仪陇县" }, { "value": "511325", "label": "西充县" }, { "value": "511381", "label": "阆中市" }] }, { "value": "5114", "label": "眉山市", "children": [{ "value": "511402", "label": "东坡区" }, { "value": "511403", "label": "彭山区" }, { "value": "511421", "label": "仁寿县" }, { "value": "511423", "label": "洪雅县" }, { "value": "511424", "label": "丹棱县" }, { "value": "511425", "label": "青神县" }] }, { "value": "5115", "label": "宜宾市", "children": [{ "value": "511502", "label": "翠屏区" }, { "value": "511503", "label": "南溪区" }, { "value": "511504", "label": "叙州区" }, { "value": "511523", "label": "江安县" }, { "value": "511524", "label": "长宁县" }, { "value": "511525", "label": "高县" }, { "value": "511526", "label": "珙县" }, { "value": "511527", "label": "筠连县" }, { "value": "511528", "label": "兴文县" }, { "value": "511529", "label": "屏山县" }] }, { "value": "5116", "label": "广安市", "children": [{ "value": "511602", "label": "广安区" }, { "value": "511603", "label": "前锋区" }, { "value": "511621", "label": "岳池县" }, { "value": "511622", "label": "武胜县" }, { "value": "511623", "label": "邻水县" }, { "value": "511681", "label": "华蓥市" }] }, { "value": "5117", "label": "达州市", "children": [{ "value": "511702", "label": "通川区" }, { "value": "511703", "label": "达川区" }, { "value": "511722", "label": "宣汉县" }, { "value": "511723", "label": "开江县" }, { "value": "511724", "label": "大竹县" }, { "value": "511725", "label": "渠县" }, { "value": "511771", "label": "达州经济开发区" }, { "value": "511781", "label": "万源市" }] }, { "value": "5118", "label": "雅安市", "children": [{ "value": "511802", "label": "雨城区" }, { "value": "511803", "label": "名山区" }, { "value": "511822", "label": "荥经县" }, { "value": "511823", "label": "汉源县" }, { "value": "511824", "label": "石棉县" }, { "value": "511825", "label": "天全县" }, { "value": "511826", "label": "芦山县" }, { "value": "511827", "label": "宝兴县" }] }, { "value": "5119", "label": "巴中市", "children": [{ "value": "511902", "label": "巴州区" }, { "value": "511903", "label": "恩阳区" }, { "value": "511921", "label": "通江县" }, { "value": "511922", "label": "南江县" }, { "value": "511923", "label": "平昌县" }, { "value": "511971", "label": "巴中经济开发区" }] }, { "value": "5120", "label": "资阳市", "children": [{ "value": "512002", "label": "雁江区" }, { "value": "512021", "label": "安岳县" }, { "value": "512022", "label": "乐至县" }] }, { "value": "5132", "label": "阿坝藏族羌族自治州", "children": [{ "value": "513201", "label": "马尔康市" }, { "value": "513221", "label": "汶川县" }, { "value": "513222", "label": "理县" }, { "value": "513223", "label": "茂县" }, { "value": "513224", "label": "松潘县" }, { "value": "513225", "label": "九寨沟县" }, { "value": "513226", "label": "金川县" }, { "value": "513227", "label": "小金县" }, { "value": "513228", "label": "黑水县" }, { "value": "513230", "label": "壤塘县" }, { "value": "513231", "label": "阿坝县" }, { "value": "513232", "label": "若尔盖县" }, { "value": "513233", "label": "红原县" }] }, { "value": "5133", "label": "甘孜藏族自治州", "children": [{ "value": "513301", "label": "康定市" }, { "value": "513322", "label": "泸定县" }, { "value": "513323", "label": "丹巴县" }, { "value": "513324", "label": "九龙县" }, { "value": "513325", "label": "雅江县" }, { "value": "513326", "label": "道孚县" }, { "value": "513327", "label": "炉霍县" }, { "value": "513328", "label": "甘孜县" }, { "value": "513329", "label": "新龙县" }, { "value": "513330", "label": "德格县" }, { "value": "513331", "label": "白玉县" }, { "value": "513332", "label": "石渠县" }, { "value": "513333", "label": "色达县" }, { "value": "513334", "label": "理塘县" }, { "value": "513335", "label": "巴塘县" }, { "value": "513336", "label": "乡城县" }, { "value": "513337", "label": "稻城县" }, { "value": "513338", "label": "得荣县" }] }, { "value": "5134", "label": "凉山彝族自治州", "children": [{ "value": "513401", "label": "西昌市" }, { "value": "513422", "label": "木里藏族自治县" }, { "value": "513423", "label": "盐源县" }, { "value": "513424", "label": "德昌县" }, { "value": "513425", "label": "会理县" }, { "value": "513426", "label": "会东县" }, { "value": "513427", "label": "宁南县" }, { "value": "513428", "label": "普格县" }, { "value": "513429", "label": "布拖县" }, { "value": "513430", "label": "金阳县" }, { "value": "513431", "label": "昭觉县" }, { "value": "513432", "label": "喜德县" }, { "value": "513433", "label": "冕宁县" }, { "value": "513434", "label": "越西县" }, { "value": "513435", "label": "甘洛县" }, { "value": "513436", "label": "美姑县" }, { "value": "513437", "label": "雷波县" }] }] }, { "value": "52", "label": "贵州省", "children": [{ "value": "5201", "label": "贵阳市", "children": [{ "value": "520102", "label": "南明区" }, { "value": "520103", "label": "云岩区" }, { "value": "520111", "label": "花溪区" }, { "value": "520112", "label": "乌当区" }, { "value": "520113", "label": "白云区" }, { "value": "520115", "label": "观山湖区" }, { "value": "520121", "label": "开阳县" }, { "value": "520122", "label": "息烽县" }, { "value": "520123", "label": "修文县" }, { "value": "520181", "label": "清镇市" }] }, { "value": "5202", "label": "六盘水市", "children": [{ "value": "520201", "label": "钟山区" }, { "value": "520203", "label": "六枝特区" }, { "value": "520221", "label": "水城县" }, { "value": "520281", "label": "盘州市" }] }, { "value": "5203", "label": "遵义市", "children": [{ "value": "520302", "label": "红花岗区" }, { "value": "520303", "label": "汇川区" }, { "value": "520304", "label": "播州区" }, { "value": "520322", "label": "桐梓县" }, { "value": "520323", "label": "绥阳县" }, { "value": "520324", "label": "正安县" }, { "value": "520325", "label": "道真仡佬族苗族自治县" }, { "value": "520326", "label": "务川仡佬族苗族自治县" }, { "value": "520327", "label": "凤冈县" }, { "value": "520328", "label": "湄潭县" }, { "value": "520329", "label": "余庆县" }, { "value": "520330", "label": "习水县" }, { "value": "520381", "label": "赤水市" }, { "value": "520382", "label": "仁怀市" }] }, { "value": "5204", "label": "安顺市", "children": [{ "value": "520402", "label": "西秀区" }, { "value": "520403", "label": "平坝区" }, { "value": "520422", "label": "普定县" }, { "value": "520423", "label": "镇宁布依族苗族自治县" }, { "value": "520424", "label": "关岭布依族苗族自治县" }, { "value": "520425", "label": "紫云苗族布依族自治县" }] }, { "value": "5205", "label": "毕节市", "children": [{ "value": "520502", "label": "七星关区" }, { "value": "520521", "label": "大方县" }, { "value": "520522", "label": "黔西县" }, { "value": "520523", "label": "金沙县" }, { "value": "520524", "label": "织金县" }, { "value": "520525", "label": "纳雍县" }, { "value": "520526", "label": "威宁彝族回族苗族自治县" }, { "value": "520527", "label": "赫章县" }] }, { "value": "5206", "label": "铜仁市", "children": [{ "value": "520602", "label": "碧江区" }, { "value": "520603", "label": "万山区" }, { "value": "520621", "label": "江口县" }, { "value": "520622", "label": "玉屏侗族自治县" }, { "value": "520623", "label": "石阡县" }, { "value": "520624", "label": "思南县" }, { "value": "520625", "label": "印江土家族苗族自治县" }, { "value": "520626", "label": "德江县" }, { "value": "520627", "label": "沿河土家族自治县" }, { "value": "520628", "label": "松桃苗族自治县" }] }, { "value": "5223", "label": "黔西南布依族苗族自治州", "children": [{ "value": "522301", "label": "兴义市" }, { "value": "522302", "label": "兴仁市" }, { "value": "522323", "label": "普安县" }, { "value": "522324", "label": "晴隆县" }, { "value": "522325", "label": "贞丰县" }, { "value": "522326", "label": "望谟县" }, { "value": "522327", "label": "册亨县" }, { "value": "522328", "label": "安龙县" }] }, { "value": "5226", "label": "黔东南苗族侗族自治州", "children": [{ "value": "522601", "label": "凯里市" }, { "value": "522622", "label": "黄平县" }, { "value": "522623", "label": "施秉县" }, { "value": "522624", "label": "三穗县" }, { "value": "522625", "label": "镇远县" }, { "value": "522626", "label": "岑巩县" }, { "value": "522627", "label": "天柱县" }, { "value": "522628", "label": "锦屏县" }, { "value": "522629", "label": "剑河县" }, { "value": "522630", "label": "台江县" }, { "value": "522631", "label": "黎平县" }, { "value": "522632", "label": "榕江县" }, { "value": "522633", "label": "从江县" }, { "value": "522634", "label": "雷山县" }, { "value": "522635", "label": "麻江县" }, { "value": "522636", "label": "丹寨县" }] }, { "value": "5227", "label": "黔南布依族苗族自治州", "children": [{ "value": "522701", "label": "都匀市" }, { "value": "522702", "label": "福泉市" }, { "value": "522722", "label": "荔波县" }, { "value": "522723", "label": "贵定县" }, { "value": "522725", "label": "瓮安县" }, { "value": "522726", "label": "独山县" }, { "value": "522727", "label": "平塘县" }, { "value": "522728", "label": "罗甸县" }, { "value": "522729", "label": "长顺县" }, { "value": "522730", "label": "龙里县" }, { "value": "522731", "label": "惠水县" }, { "value": "522732", "label": "三都水族自治县" }] }] }, { "value": "53", "label": "云南省", "children": [{ "value": "5301", "label": "昆明市", "children": [{ "value": "530102", "label": "五华区" }, { "value": "530103", "label": "盘龙区" }, { "value": "530111", "label": "官渡区" }, { "value": "530112", "label": "西山区" }, { "value": "530113", "label": "东川区" }, { "value": "530114", "label": "呈贡区" }, { "value": "530115", "label": "晋宁区" }, { "value": "530124", "label": "富民县" }, { "value": "530125", "label": "宜良县" }, { "value": "530126", "label": "石林彝族自治县" }, { "value": "530127", "label": "嵩明县" }, { "value": "530128", "label": "禄劝彝族苗族自治县" }, { "value": "530129", "label": "寻甸回族彝族自治县" }, { "value": "530181", "label": "安宁市" }] }, { "value": "5303", "label": "曲靖市", "children": [{ "value": "530302", "label": "麒麟区" }, { "value": "530303", "label": "沾益区" }, { "value": "530304", "label": "马龙区" }, { "value": "530322", "label": "陆良县" }, { "value": "530323", "label": "师宗县" }, { "value": "530324", "label": "罗平县" }, { "value": "530325", "label": "富源县" }, { "value": "530326", "label": "会泽县" }, { "value": "530381", "label": "宣威市" }] }, { "value": "5304", "label": "玉溪市", "children": [{ "value": "530402", "label": "红塔区" }, { "value": "530403", "label": "江川区" }, { "value": "530422", "label": "澄江县" }, { "value": "530423", "label": "通海县" }, { "value": "530424", "label": "华宁县" }, { "value": "530425", "label": "易门县" }, { "value": "530426", "label": "峨山彝族自治县" }, { "value": "530427", "label": "新平彝族傣族自治县" }, { "value": "530428", "label": "元江哈尼族彝族傣族自治县" }] }, { "value": "5305", "label": "保山市", "children": [{ "value": "530502", "label": "隆阳区" }, { "value": "530521", "label": "施甸县" }, { "value": "530523", "label": "龙陵县" }, { "value": "530524", "label": "昌宁县" }, { "value": "530581", "label": "腾冲市" }] }, { "value": "5306", "label": "昭通市", "children": [{ "value": "530602", "label": "昭阳区" }, { "value": "530621", "label": "鲁甸县" }, { "value": "530622", "label": "巧家县" }, { "value": "530623", "label": "盐津县" }, { "value": "530624", "label": "大关县" }, { "value": "530625", "label": "永善县" }, { "value": "530626", "label": "绥江县" }, { "value": "530627", "label": "镇雄县" }, { "value": "530628", "label": "彝良县" }, { "value": "530629", "label": "威信县" }, { "value": "530681", "label": "水富市" }] }, { "value": "5307", "label": "丽江市", "children": [{ "value": "530702", "label": "古城区" }, { "value": "530721", "label": "玉龙纳西族自治县" }, { "value": "530722", "label": "永胜县" }, { "value": "530723", "label": "华坪县" }, { "value": "530724", "label": "宁蒗彝族自治县" }] }, { "value": "5308", "label": "普洱市", "children": [{ "value": "530802", "label": "思茅区" }, { "value": "530821", "label": "宁洱哈尼族彝族自治县" }, { "value": "530822", "label": "墨江哈尼族自治县" }, { "value": "530823", "label": "景东彝族自治县" }, { "value": "530824", "label": "景谷傣族彝族自治县" }, { "value": "530825", "label": "镇沅彝族哈尼族拉祜族自治县" }, { "value": "530826", "label": "江城哈尼族彝族自治县" }, { "value": "530827", "label": "孟连傣族拉祜族佤族自治县" }, { "value": "530828", "label": "澜沧拉祜族自治县" }, { "value": "530829", "label": "西盟佤族自治县" }] }, { "value": "5309", "label": "临沧市", "children": [{ "value": "530902", "label": "临翔区" }, { "value": "530921", "label": "凤庆县" }, { "value": "530922", "label": "云县" }, { "value": "530923", "label": "永德县" }, { "value": "530924", "label": "镇康县" }, { "value": "530925", "label": "双江拉祜族佤族布朗族傣族自治县" }, { "value": "530926", "label": "耿马傣族佤族自治县" }, { "value": "530927", "label": "沧源佤族自治县" }] }, { "value": "5323", "label": "楚雄彝族自治州", "children": [{ "value": "532301", "label": "楚雄市" }, { "value": "532322", "label": "双柏县" }, { "value": "532323", "label": "牟定县" }, { "value": "532324", "label": "南华县" }, { "value": "532325", "label": "姚安县" }, { "value": "532326", "label": "大姚县" }, { "value": "532327", "label": "永仁县" }, { "value": "532328", "label": "元谋县" }, { "value": "532329", "label": "武定县" }, { "value": "532331", "label": "禄丰县" }] }, { "value": "5325", "label": "红河哈尼族彝族自治州", "children": [{ "value": "532501", "label": "个旧市" }, { "value": "532502", "label": "开远市" }, { "value": "532503", "label": "蒙自市" }, { "value": "532504", "label": "弥勒市" }, { "value": "532523", "label": "屏边苗族自治县" }, { "value": "532524", "label": "建水县" }, { "value": "532525", "label": "石屏县" }, { "value": "532527", "label": "泸西县" }, { "value": "532528", "label": "元阳县" }, { "value": "532529", "label": "红河县" }, { "value": "532530", "label": "金平苗族瑶族傣族自治县" }, { "value": "532531", "label": "绿春县" }, { "value": "532532", "label": "河口瑶族自治县" }] }, { "value": "5326", "label": "文山壮族苗族自治州", "children": [{ "value": "532601", "label": "文山市" }, { "value": "532622", "label": "砚山县" }, { "value": "532623", "label": "西畴县" }, { "value": "532624", "label": "麻栗坡县" }, { "value": "532625", "label": "马关县" }, { "value": "532626", "label": "丘北县" }, { "value": "532627", "label": "广南县" }, { "value": "532628", "label": "富宁县" }] }, { "value": "5328", "label": "西双版纳傣族自治州", "children": [{ "value": "532801", "label": "景洪市" }, { "value": "532822", "label": "勐海县" }, { "value": "532823", "label": "勐腊县" }] }, { "value": "5329", "label": "大理白族自治州", "children": [{ "value": "532901", "label": "大理市" }, { "value": "532922", "label": "漾濞彝族自治县" }, { "value": "532923", "label": "祥云县" }, { "value": "532924", "label": "宾川县" }, { "value": "532925", "label": "弥渡县" }, { "value": "532926", "label": "南涧彝族自治县" }, { "value": "532927", "label": "巍山彝族回族自治县" }, { "value": "532928", "label": "永平县" }, { "value": "532929", "label": "云龙县" }, { "value": "532930", "label": "洱源县" }, { "value": "532931", "label": "剑川县" }, { "value": "532932", "label": "鹤庆县" }] }, { "value": "5331", "label": "德宏傣族景颇族自治州", "children": [{ "value": "533102", "label": "瑞丽市" }, { "value": "533103", "label": "芒市" }, { "value": "533122", "label": "梁河县" }, { "value": "533123", "label": "盈江县" }, { "value": "533124", "label": "陇川县" }] }, { "value": "5333", "label": "怒江傈僳族自治州", "children": [{ "value": "533301", "label": "泸水市" }, { "value": "533323", "label": "福贡县" }, { "value": "533324", "label": "贡山独龙族怒族自治县" }, { "value": "533325", "label": "兰坪白族普米族自治县" }] }, { "value": "5334", "label": "迪庆藏族自治州", "children": [{ "value": "533401", "label": "香格里拉市" }, { "value": "533422", "label": "德钦县" }, { "value": "533423", "label": "维西傈僳族自治县" }] }] }, { "value": "54", "label": "西藏自治区", "children": [{ "value": "5401", "label": "拉萨市", "children": [{ "value": "540102", "label": "城关区" }, { "value": "540103", "label": "堆龙德庆区" }, { "value": "540104", "label": "达孜区" }, { "value": "540121", "label": "林周县" }, { "value": "540122", "label": "当雄县" }, { "value": "540123", "label": "尼木县" }, { "value": "540124", "label": "曲水县" }, { "value": "540127", "label": "墨竹工卡县" }, { "value": "540171", "label": "格尔木藏青工业园区" }, { "value": "540172", "label": "拉萨经济技术开发区" }, { "value": "540173", "label": "西藏文化旅游创意园区" }, { "value": "540174", "label": "达孜工业园区" }] }, { "value": "5402", "label": "日喀则市", "children": [{ "value": "540202", "label": "桑珠孜区" }, { "value": "540221", "label": "南木林县" }, { "value": "540222", "label": "江孜县" }, { "value": "540223", "label": "定日县" }, { "value": "540224", "label": "萨迦县" }, { "value": "540225", "label": "拉孜县" }, { "value": "540226", "label": "昂仁县" }, { "value": "540227", "label": "谢通门县" }, { "value": "540228", "label": "白朗县" }, { "value": "540229", "label": "仁布县" }, { "value": "540230", "label": "康马县" }, { "value": "540231", "label": "定结县" }, { "value": "540232", "label": "仲巴县" }, { "value": "540233", "label": "亚东县" }, { "value": "540234", "label": "吉隆县" }, { "value": "540235", "label": "聂拉木县" }, { "value": "540236", "label": "萨嘎县" }, { "value": "540237", "label": "岗巴县" }] }, { "value": "5403", "label": "昌都市", "children": [{ "value": "540302", "label": "卡若区" }, { "value": "540321", "label": "江达县" }, { "value": "540322", "label": "贡觉县" }, { "value": "540323", "label": "类乌齐县" }, { "value": "540324", "label": "丁青县" }, { "value": "540325", "label": "察雅县" }, { "value": "540326", "label": "八宿县" }, { "value": "540327", "label": "左贡县" }, { "value": "540328", "label": "芒康县" }, { "value": "540329", "label": "洛隆县" }, { "value": "540330", "label": "边坝县" }] }, { "value": "5404", "label": "林芝市", "children": [{ "value": "540402", "label": "巴宜区" }, { "value": "540421", "label": "工布江达县" }, { "value": "540422", "label": "米林县" }, { "value": "540423", "label": "墨脱县" }, { "value": "540424", "label": "波密县" }, { "value": "540425", "label": "察隅县" }, { "value": "540426", "label": "朗县" }] }, { "value": "5405", "label": "山南市", "children": [{ "value": "540502", "label": "乃东区" }, { "value": "540521", "label": "扎囊县" }, { "value": "540522", "label": "贡嘎县" }, { "value": "540523", "label": "桑日县" }, { "value": "540524", "label": "琼结县" }, { "value": "540525", "label": "曲松县" }, { "value": "540526", "label": "措美县" }, { "value": "540527", "label": "洛扎县" }, { "value": "540528", "label": "加查县" }, { "value": "540529", "label": "隆子县" }, { "value": "540530", "label": "错那县" }, { "value": "540531", "label": "浪卡子县" }] }, { "value": "5406", "label": "那曲市", "children": [{ "value": "540602", "label": "色尼区" }, { "value": "540621", "label": "嘉黎县" }, { "value": "540622", "label": "比如县" }, { "value": "540623", "label": "聂荣县" }, { "value": "540624", "label": "安多县" }, { "value": "540625", "label": "申扎县" }, { "value": "540626", "label": "索县" }, { "value": "540627", "label": "班戈县" }, { "value": "540628", "label": "巴青县" }, { "value": "540629", "label": "尼玛县" }, { "value": "540630", "label": "双湖县" }] }, { "value": "5425", "label": "阿里地区", "children": [{ "value": "542521", "label": "普兰县" }, { "value": "542522", "label": "札达县" }, { "value": "542523", "label": "噶尔县" }, { "value": "542524", "label": "日土县" }, { "value": "542525", "label": "革吉县" }, { "value": "542526", "label": "改则县" }, { "value": "542527", "label": "措勤县" }] }] }, { "value": "61", "label": "陕西省", "children": [{ "value": "6101", "label": "西安市", "children": [{ "value": "610102", "label": "新城区" }, { "value": "610103", "label": "碑林区" }, { "value": "610104", "label": "莲湖区" }, { "value": "610111", "label": "灞桥区" }, { "value": "610112", "label": "未央区" }, { "value": "610113", "label": "雁塔区" }, { "value": "610114", "label": "阎良区" }, { "value": "610115", "label": "临潼区" }, { "value": "610116", "label": "长安区" }, { "value": "610117", "label": "高陵区" }, { "value": "610118", "label": "鄠邑区" }, { "value": "610122", "label": "蓝田县" }, { "value": "610124", "label": "周至县" }] }, { "value": "6102", "label": "铜川市", "children": [{ "value": "610202", "label": "王益区" }, { "value": "610203", "label": "印台区" }, { "value": "610204", "label": "耀州区" }, { "value": "610222", "label": "宜君县" }] }, { "value": "6103", "label": "宝鸡市", "children": [{ "value": "610302", "label": "渭滨区" }, { "value": "610303", "label": "金台区" }, { "value": "610304", "label": "陈仓区" }, { "value": "610322", "label": "凤翔县" }, { "value": "610323", "label": "岐山县" }, { "value": "610324", "label": "扶风县" }, { "value": "610326", "label": "眉县" }, { "value": "610327", "label": "陇县" }, { "value": "610328", "label": "千阳县" }, { "value": "610329", "label": "麟游县" }, { "value": "610330", "label": "凤县" }, { "value": "610331", "label": "太白县" }] }, { "value": "6104", "label": "咸阳市", "children": [{ "value": "610402", "label": "秦都区" }, { "value": "610403", "label": "杨陵区" }, { "value": "610404", "label": "渭城区" }, { "value": "610422", "label": "三原县" }, { "value": "610423", "label": "泾阳县" }, { "value": "610424", "label": "乾县" }, { "value": "610425", "label": "礼泉县" }, { "value": "610426", "label": "永寿县" }, { "value": "610428", "label": "长武县" }, { "value": "610429", "label": "旬邑县" }, { "value": "610430", "label": "淳化县" }, { "value": "610431", "label": "武功县" }, { "value": "610481", "label": "兴平市" }, { "value": "610482", "label": "彬州市" }] }, { "value": "6105", "label": "渭南市", "children": [{ "value": "610502", "label": "临渭区" }, { "value": "610503", "label": "华州区" }, { "value": "610522", "label": "潼关县" }, { "value": "610523", "label": "大荔县" }, { "value": "610524", "label": "合阳县" }, { "value": "610525", "label": "澄城县" }, { "value": "610526", "label": "蒲城县" }, { "value": "610527", "label": "白水县" }, { "value": "610528", "label": "富平县" }, { "value": "610581", "label": "韩城市" }, { "value": "610582", "label": "华阴市" }] }, { "value": "6106", "label": "延安市", "children": [{ "value": "610602", "label": "宝塔区" }, { "value": "610603", "label": "安塞区" }, { "value": "610621", "label": "延长县" }, { "value": "610622", "label": "延川县" }, { "value": "610623", "label": "子长县" }, { "value": "610625", "label": "志丹县" }, { "value": "610626", "label": "吴起县" }, { "value": "610627", "label": "甘泉县" }, { "value": "610628", "label": "富县" }, { "value": "610629", "label": "洛川县" }, { "value": "610630", "label": "宜川县" }, { "value": "610631", "label": "黄龙县" }, { "value": "610632", "label": "黄陵县" }] }, { "value": "6107", "label": "汉中市", "children": [{ "value": "610702", "label": "汉台区" }, { "value": "610703", "label": "南郑区" }, { "value": "610722", "label": "城固县" }, { "value": "610723", "label": "洋县" }, { "value": "610724", "label": "西乡县" }, { "value": "610725", "label": "勉县" }, { "value": "610726", "label": "宁强县" }, { "value": "610727", "label": "略阳县" }, { "value": "610728", "label": "镇巴县" }, { "value": "610729", "label": "留坝县" }, { "value": "610730", "label": "佛坪县" }] }, { "value": "6108", "label": "榆林市", "children": [{ "value": "610802", "label": "榆阳区" }, { "value": "610803", "label": "横山区" }, { "value": "610822", "label": "府谷县" }, { "value": "610824", "label": "靖边县" }, { "value": "610825", "label": "定边县" }, { "value": "610826", "label": "绥德县" }, { "value": "610827", "label": "米脂县" }, { "value": "610828", "label": "佳县" }, { "value": "610829", "label": "吴堡县" }, { "value": "610830", "label": "清涧县" }, { "value": "610831", "label": "子洲县" }, { "value": "610881", "label": "神木市" }] }, { "value": "6109", "label": "安康市", "children": [{ "value": "610902", "label": "汉滨区" }, { "value": "610921", "label": "汉阴县" }, { "value": "610922", "label": "石泉县" }, { "value": "610923", "label": "宁陕县" }, { "value": "610924", "label": "紫阳县" }, { "value": "610925", "label": "岚皋县" }, { "value": "610926", "label": "平利县" }, { "value": "610927", "label": "镇坪县" }, { "value": "610928", "label": "旬阳县" }, { "value": "610929", "label": "白河县" }] }, { "value": "6110", "label": "商洛市", "children": [{ "value": "611002", "label": "商州区" }, { "value": "611021", "label": "洛南县" }, { "value": "611022", "label": "丹凤县" }, { "value": "611023", "label": "商南县" }, { "value": "611024", "label": "山阳县" }, { "value": "611025", "label": "镇安县" }, { "value": "611026", "label": "柞水县" }] }] }, { "value": "62", "label": "甘肃省", "children": [{ "value": "6201", "label": "兰州市", "children": [{ "value": "620102", "label": "城关区" }, { "value": "620103", "label": "七里河区" }, { "value": "620104", "label": "西固区" }, { "value": "620105", "label": "安宁区" }, { "value": "620111", "label": "红古区" }, { "value": "620121", "label": "永登县" }, { "value": "620122", "label": "皋兰县" }, { "value": "620123", "label": "榆中县" }, { "value": "620171", "label": "兰州新区" }] }, { "value": "6202", "label": "嘉峪关市", "children": [{ "value": "620201100", "label": "新城镇" }, { "value": "620201101", "label": "峪泉镇" }, { "value": "620201102", "label": "文殊镇" }, { "value": "620201401", "label": "雄关区" }, { "value": "620201402", "label": "镜铁区" }, { "value": "620201403", "label": "长城区" }] }, { "value": "6203", "label": "金昌市", "children": [{ "value": "620302", "label": "金川区" }, { "value": "620321", "label": "永昌县" }] }, { "value": "6204", "label": "白银市", "children": [{ "value": "620402", "label": "白银区" }, { "value": "620403", "label": "平川区" }, { "value": "620421", "label": "靖远县" }, { "value": "620422", "label": "会宁县" }, { "value": "620423", "label": "景泰县" }] }, { "value": "6205", "label": "天水市", "children": [{ "value": "620502", "label": "秦州区" }, { "value": "620503", "label": "麦积区" }, { "value": "620521", "label": "清水县" }, { "value": "620522", "label": "秦安县" }, { "value": "620523", "label": "甘谷县" }, { "value": "620524", "label": "武山县" }, { "value": "620525", "label": "张家川回族自治县" }] }, { "value": "6206", "label": "武威市", "children": [{ "value": "620602", "label": "凉州区" }, { "value": "620621", "label": "民勤县" }, { "value": "620622", "label": "古浪县" }, { "value": "620623", "label": "天祝藏族自治县" }] }, { "value": "6207", "label": "张掖市", "children": [{ "value": "620702", "label": "甘州区" }, { "value": "620721", "label": "肃南裕固族自治县" }, { "value": "620722", "label": "民乐县" }, { "value": "620723", "label": "临泽县" }, { "value": "620724", "label": "高台县" }, { "value": "620725", "label": "山丹县" }] }, { "value": "6208", "label": "平凉市", "children": [{ "value": "620802", "label": "崆峒区" }, { "value": "620821", "label": "泾川县" }, { "value": "620822", "label": "灵台县" }, { "value": "620823", "label": "崇信县" }, { "value": "620825", "label": "庄浪县" }, { "value": "620826", "label": "静宁县" }, { "value": "620881", "label": "华亭市" }] }, { "value": "6209", "label": "酒泉市", "children": [{ "value": "620902", "label": "肃州区" }, { "value": "620921", "label": "金塔县" }, { "value": "620922", "label": "瓜州县" }, { "value": "620923", "label": "肃北蒙古族自治县" }, { "value": "620924", "label": "阿克塞哈萨克族自治县" }, { "value": "620981", "label": "玉门市" }, { "value": "620982", "label": "敦煌市" }] }, { "value": "6210", "label": "庆阳市", "children": [{ "value": "621002", "label": "西峰区" }, { "value": "621021", "label": "庆城县" }, { "value": "621022", "label": "环县" }, { "value": "621023", "label": "华池县" }, { "value": "621024", "label": "合水县" }, { "value": "621025", "label": "正宁县" }, { "value": "621026", "label": "宁县" }, { "value": "621027", "label": "镇原县" }] }, { "value": "6211", "label": "定西市", "children": [{ "value": "621102", "label": "安定区" }, { "value": "621121", "label": "通渭县" }, { "value": "621122", "label": "陇西县" }, { "value": "621123", "label": "渭源县" }, { "value": "621124", "label": "临洮县" }, { "value": "621125", "label": "漳县" }, { "value": "621126", "label": "岷县" }] }, { "value": "6212", "label": "陇南市", "children": [{ "value": "621202", "label": "武都区" }, { "value": "621221", "label": "成县" }, { "value": "621222", "label": "文县" }, { "value": "621223", "label": "宕昌县" }, { "value": "621224", "label": "康县" }, { "value": "621225", "label": "西和县" }, { "value": "621226", "label": "礼县" }, { "value": "621227", "label": "徽县" }, { "value": "621228", "label": "两当县" }] }, { "value": "6229", "label": "临夏回族自治州", "children": [{ "value": "622901", "label": "临夏市" }, { "value": "622921", "label": "临夏县" }, { "value": "622922", "label": "康乐县" }, { "value": "622923", "label": "永靖县" }, { "value": "622924", "label": "广河县" }, { "value": "622925", "label": "和政县" }, { "value": "622926", "label": "东乡族自治县" }, { "value": "622927", "label": "积石山保安族东乡族撒拉族自治县" }] }, { "value": "6230", "label": "甘南藏族自治州", "children": [{ "value": "623001", "label": "合作市" }, { "value": "623021", "label": "临潭县" }, { "value": "623022", "label": "卓尼县" }, { "value": "623023", "label": "舟曲县" }, { "value": "623024", "label": "迭部县" }, { "value": "623025", "label": "玛曲县" }, { "value": "623026", "label": "碌曲县" }, { "value": "623027", "label": "夏河县" }] }] }, { "value": "63", "label": "青海省", "children": [{ "value": "6301", "label": "西宁市", "children": [{ "value": "630102", "label": "城东区" }, { "value": "630103", "label": "城中区" }, { "value": "630104", "label": "城西区" }, { "value": "630105", "label": "城北区" }, { "value": "630121", "label": "大通回族土族自治县" }, { "value": "630122", "label": "湟中县" }, { "value": "630123", "label": "湟源县" }] }, { "value": "6302", "label": "海东市", "children": [{ "value": "630202", "label": "乐都区" }, { "value": "630203", "label": "平安区" }, { "value": "630222", "label": "民和回族土族自治县" }, { "value": "630223", "label": "互助土族自治县" }, { "value": "630224", "label": "化隆回族自治县" }, { "value": "630225", "label": "循化撒拉族自治县" }] }, { "value": "6322", "label": "海北藏族自治州", "children": [{ "value": "632221", "label": "门源回族自治县" }, { "value": "632222", "label": "祁连县" }, { "value": "632223", "label": "海晏县" }, { "value": "632224", "label": "刚察县" }] }, { "value": "6323", "label": "黄南藏族自治州", "children": [{ "value": "632321", "label": "同仁县" }, { "value": "632322", "label": "尖扎县" }, { "value": "632323", "label": "泽库县" }, { "value": "632324", "label": "河南蒙古族自治县" }] }, { "value": "6325", "label": "海南藏族自治州", "children": [{ "value": "632521", "label": "共和县" }, { "value": "632522", "label": "同德县" }, { "value": "632523", "label": "贵德县" }, { "value": "632524", "label": "兴海县" }, { "value": "632525", "label": "贵南县" }] }, { "value": "6326", "label": "果洛藏族自治州", "children": [{ "value": "632621", "label": "玛沁县" }, { "value": "632622", "label": "班玛县" }, { "value": "632623", "label": "甘德县" }, { "value": "632624", "label": "达日县" }, { "value": "632625", "label": "久治县" }, { "value": "632626", "label": "玛多县" }] }, { "value": "6327", "label": "玉树藏族自治州", "children": [{ "value": "632701", "label": "玉树市" }, { "value": "632722", "label": "杂多县" }, { "value": "632723", "label": "称多县" }, { "value": "632724", "label": "治多县" }, { "value": "632725", "label": "囊谦县" }, { "value": "632726", "label": "曲麻莱县" }] }, { "value": "6328", "label": "海西蒙古族藏族自治州", "children": [{ "value": "632801", "label": "格尔木市" }, { "value": "632802", "label": "德令哈市" }, { "value": "632803", "label": "茫崖市" }, { "value": "632821", "label": "乌兰县" }, { "value": "632822", "label": "都兰县" }, { "value": "632823", "label": "天峻县" }, { "value": "632857", "label": "大柴旦行政委员会" }] }] }, { "value": "64", "label": "宁夏回族自治区", "children": [{ "value": "6401", "label": "银川市", "children": [{ "value": "640104", "label": "兴庆区" }, { "value": "640105", "label": "西夏区" }, { "value": "640106", "label": "金凤区" }, { "value": "640121", "label": "永宁县" }, { "value": "640122", "label": "贺兰县" }, { "value": "640181", "label": "灵武市" }] }, { "value": "6402", "label": "石嘴山市", "children": [{ "value": "640202", "label": "大武口区" }, { "value": "640205", "label": "惠农区" }, { "value": "640221", "label": "平罗县" }] }, { "value": "6403", "label": "吴忠市", "children": [{ "value": "640302", "label": "利通区" }, { "value": "640303", "label": "红寺堡区" }, { "value": "640323", "label": "盐池县" }, { "value": "640324", "label": "同心县" }, { "value": "640381", "label": "青铜峡市" }] }, { "value": "6404", "label": "固原市", "children": [{ "value": "640402", "label": "原州区" }, { "value": "640422", "label": "西吉县" }, { "value": "640423", "label": "隆德县" }, { "value": "640424", "label": "泾源县" }, { "value": "640425", "label": "彭阳县" }] }, { "value": "6405", "label": "中卫市", "children": [{ "value": "640502", "label": "沙坡头区" }, { "value": "640521", "label": "中宁县" }, { "value": "640522", "label": "海原县" }] }] }, { "value": "65", "label": "新疆维吾尔自治区", "children": [{ "value": "6501", "label": "乌鲁木齐市", "children": [{ "value": "650102", "label": "天山区" }, { "value": "650103", "label": "沙依巴克区" }, { "value": "650104", "label": "新市区" }, { "value": "650105", "label": "水磨沟区" }, { "value": "650106", "label": "头屯河区" }, { "value": "650107", "label": "达坂城区" }, { "value": "650109", "label": "米东区" }, { "value": "650121", "label": "乌鲁木齐县" }, { "value": "650171", "label": "乌鲁木齐经济技术开发区" }, { "value": "650172", "label": "乌鲁木齐高新技术产业开发区" }] }, { "value": "6502", "label": "克拉玛依市", "children": [{ "value": "650202", "label": "独山子区" }, { "value": "650203", "label": "克拉玛依区" }, { "value": "650204", "label": "白碱滩区" }, { "value": "650205", "label": "乌尔禾区" }] }, { "value": "6504", "label": "吐鲁番市", "children": [{ "value": "650402", "label": "高昌区" }, { "value": "650421", "label": "鄯善县" }, { "value": "650422", "label": "托克逊县" }] }, { "value": "6505", "label": "哈密市", "children": [{ "value": "650502", "label": "伊州区" }, { "value": "650521", "label": "巴里坤哈萨克自治县" }, { "value": "650522", "label": "伊吾县" }] }, { "value": "6523", "label": "昌吉回族自治州", "children": [{ "value": "652301", "label": "昌吉市" }, { "value": "652302", "label": "阜康市" }, { "value": "652323", "label": "呼图壁县" }, { "value": "652324", "label": "玛纳斯县" }, { "value": "652325", "label": "奇台县" }, { "value": "652327", "label": "吉木萨尔县" }, { "value": "652328", "label": "木垒哈萨克自治县" }] }, { "value": "6527", "label": "博尔塔拉蒙古自治州", "children": [{ "value": "652701", "label": "博乐市" }, { "value": "652702", "label": "阿拉山口市" }, { "value": "652722", "label": "精河县" }, { "value": "652723", "label": "温泉县" }] }, { "value": "6528", "label": "巴音郭楞蒙古自治州", "children": [{ "value": "652801", "label": "库尔勒市" }, { "value": "652822", "label": "轮台县" }, { "value": "652823", "label": "尉犁县" }, { "value": "652824", "label": "若羌县" }, { "value": "652825", "label": "且末县" }, { "value": "652826", "label": "焉耆回族自治县" }, { "value": "652827", "label": "和静县" }, { "value": "652828", "label": "和硕县" }, { "value": "652829", "label": "博湖县" }, { "value": "652871", "label": "库尔勒经济技术开发区" }] }, { "value": "6529", "label": "阿克苏地区", "children": [{ "value": "652901", "label": "阿克苏市" }, { "value": "652922", "label": "温宿县" }, { "value": "652923", "label": "库车县" }, { "value": "652924", "label": "沙雅县" }, { "value": "652925", "label": "新和县" }, { "value": "652926", "label": "拜城县" }, { "value": "652927", "label": "乌什县" }, { "value": "652928", "label": "阿瓦提县" }, { "value": "652929", "label": "柯坪县" }] }, { "value": "6530", "label": "克孜勒苏柯尔克孜自治州", "children": [{ "value": "653001", "label": "阿图什市" }, { "value": "653022", "label": "阿克陶县" }, { "value": "653023", "label": "阿合奇县" }, { "value": "653024", "label": "乌恰县" }] }, { "value": "6531", "label": "喀什地区", "children": [{ "value": "653101", "label": "喀什市" }, { "value": "653121", "label": "疏附县" }, { "value": "653122", "label": "疏勒县" }, { "value": "653123", "label": "英吉沙县" }, { "value": "653124", "label": "泽普县" }, { "value": "653125", "label": "莎车县" }, { "value": "653126", "label": "叶城县" }, { "value": "653127", "label": "麦盖提县" }, { "value": "653128", "label": "岳普湖县" }, { "value": "653129", "label": "伽师县" }, { "value": "653130", "label": "巴楚县" }, { "value": "653131", "label": "塔什库尔干塔吉克自治县" }] }, { "value": "6532", "label": "和田地区", "children": [{ "value": "653201", "label": "和田市" }, { "value": "653221", "label": "和田县" }, { "value": "653222", "label": "墨玉县" }, { "value": "653223", "label": "皮山县" }, { "value": "653224", "label": "洛浦县" }, { "value": "653225", "label": "策勒县" }, { "value": "653226", "label": "于田县" }, { "value": "653227", "label": "民丰县" }] }, { "value": "6540", "label": "伊犁哈萨克自治州", "children": [{ "value": "654002", "label": "伊宁市" }, { "value": "654003", "label": "奎屯市" }, { "value": "654004", "label": "霍尔果斯市" }, { "value": "654021", "label": "伊宁县" }, { "value": "654022", "label": "察布查尔锡伯自治县" }, { "value": "654023", "label": "霍城县" }, { "value": "654024", "label": "巩留县" }, { "value": "654025", "label": "新源县" }, { "value": "654026", "label": "昭苏县" }, { "value": "654027", "label": "特克斯县" }, { "value": "654028", "label": "尼勒克县" }] }, { "value": "6542", "label": "塔城地区", "children": [{ "value": "654201", "label": "塔城市" }, { "value": "654202", "label": "乌苏市" }, { "value": "654221", "label": "额敏县" }, { "value": "654223", "label": "沙湾县" }, { "value": "654224", "label": "托里县" }, { "value": "654225", "label": "裕民县" }, { "value": "654226", "label": "和布克赛尔蒙古自治县" }] }, { "value": "6543", "label": "阿勒泰地区", "children": [{ "value": "654301", "label": "阿勒泰市" }, { "value": "654321", "label": "布尔津县" }, { "value": "654322", "label": "富蕴县" }, { "value": "654323", "label": "福海县" }, { "value": "654324", "label": "哈巴河县" }, { "value": "654325", "label": "青河县" }, { "value": "654326", "label": "吉木乃县" }] }, { "value": "6590", "label": "自治区直辖县级行政区划", "children": [{ "value": "659001", "label": "石河子市" }, { "value": "659002", "label": "阿拉尔市" }, { "value": "659003", "label": "图木舒克市" }, { "value": "659004", "label": "五家渠市" }, { "value": "659006", "label": "铁门关市" }] }] },

{
  "value": "67", "label": "香港特别行政区", "children": [{
    "value": "6701", "label": "香港", "children": [
    { "value": "670101", "label": "中西区" },
    { "value": "670102", "label": "湾仔区" },
    { "value": "670103", "label": "东区" },
    { "value": "670104", "label": "南区" },
    { "value": "670105", "label": "九龙-油尖旺区" },
    { "value": "670106", "label": "九龙-深水埗区" },
    { "value": "670107", "label": "九龙-九龙城区" },
    { "value": "670108", "label": "九龙-黄大仙区" },
    { "value": "670109", "label": "九龙-观塘区" },
    { "value": "670110", "label": "新界-北区" },
    { "value": "670111", "label": "新界-大埔区" },
    { "value": "670112", "label": "新界-沙田区" },
    { "value": "670113", "label": "新界-西贡区" },
    { "value": "670114", "label": "新界-荃湾区" },
    { "value": "670115", "label": "新界-屯门区" },
    { "value": "670116", "label": "新界-元朗区" },
    { "value": "670117", "label": "新界-葵青区" },
    { "value": "670118", "label": "新界-离岛区" }] }] },





{
  "value": "68", "label": "澳门特别行政区", "children": [{
    "value": "6801", "label": "澳门", "children": [
    { "value": "680101", "label": "花地玛堂区" },
    { "value": "680102", "label": "圣安多尼堂区" },
    { "value": "680103", "label": "大堂区" },
    { "value": "680104", "label": "望德堂区" },
    { "value": "680105", "label": "风顺堂区" },
    { "value": "680106", "label": "嘉模堂区" },
    { "value": "680107", "label": "圣方济各堂区" },
    { "value": "680108", "label": "路氹城" }] }] },





{
  "value": "69", "label": "台湾省", "children": [
  {
    "value": "6901", "label": "台北市", "children":
    [
    { "value": "690101", "label": "中正区" },
    { "value": "690102", "label": "大同区" },
    { "value": "690103", "label": "中山区" },
    { "value": "690104", "label": "松山区" },
    { "value": "690105", "label": "大安区" },
    { "value": "690106", "label": "万华区" },
    { "value": "690107", "label": "信义区" },
    { "value": "690108", "label": "士林区" },
    { "value": "690109", "label": "北投区" },
    { "value": "690110", "label": "内湖区" },
    { "value": "690111", "label": "南港区" },
    { "value": "690112", "label": "文山区" }] },


  {
    "value": "6902", "label": "高雄市", "children":
    [
    { "value": "690201", "label": "新兴区" },
    { "value": "690202", "label": "前金区" },
    { "value": "690203", "label": "芩雅区" },
    { "value": "690204", "label": "盐埕区" },
    { "value": "690205", "label": "鼓山区" },
    { "value": "690206", "label": "旗津区" },
    { "value": "690207", "label": "前镇区" },
    { "value": "690208", "label": "三民区" },
    { "value": "690209", "label": "左营区" },
    { "value": "690210", "label": "楠梓区" },
    { "value": "690211", "label": "小港区" }] },


  {
    "value": "6903", "label": "台南市", "children":
    [
    { "value": "690301", "label": "中西区" },
    { "value": "690302", "label": "东区" },
    { "value": "690303", "label": "南区" },
    { "value": "690304", "label": "北区" },
    { "value": "690305", "label": "安平区" },
    { "value": "690306", "label": "安南区" }] },


  {
    "value": "6904", "label": "台中市", "children":
    [
    { "value": "690401", "label": "中区" },
    { "value": "690402", "label": "东区" },
    { "value": "690403", "label": "南区" },
    { "value": "690404", "label": "西区" },
    { "value": "690405", "label": "北区" },
    { "value": "690406", "label": "北屯区" },
    { "value": "690407", "label": "西屯区" },
    { "value": "690408", "label": "南屯区" }] },


  {
    "value": "6905", "label": "基隆市", "children":
    [
    { "value": "690501", "label": "仁爱区" },
    { "value": "690502", "label": "信义区" },
    { "value": "690503", "label": "中正区" },
    { "value": "690504", "label": "中山区" },
    { "value": "690505", "label": "安乐区" },
    { "value": "690506", "label": "暖暖区" },
    { "value": "690507", "label": "七堵区" },
    { "value": "690508", "label": "南屯区" }] },


  {
    "value": "6906", "label": "新竹市", "children":
    [
    { "value": "690601", "label": "东区" },
    { "value": "690602", "label": "北区" },
    { "value": "690603", "label": "香山区" }] },


  {
    "value": "6907", "label": "嘉义市", "children":
    [
    { "value": "690701", "label": "东区" },
    { "value": "690702", "label": "西区" }] },


  {
    "value": "6908", "label": "县级", "children":
    [
    { "value": "690801", "label": "金门县" },
    { "value": "690802", "label": "南投县" },
    { "value": "690803", "label": "宜兰县" },
    { "value": "690804", "label": "新竹县" },
    { "value": "690805", "label": "桃园县" },
    { "value": "690806", "label": "苗栗县" },
    { "value": "690807", "label": "彰化县" },
    { "value": "690808", "label": "嘉义县" },
    { "value": "690809", "label": "云林县" },
    { "value": "690810", "label": "屏东县" },
    { "value": "690811", "label": "台东县" },
    { "value": "690812", "label": "花莲县" },
    { "value": "690813", "label": "澎湖县" }] }] }];var _default =







city;exports.default = _default;

/***/ }),

/***/ 587:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 588);

/***/ }),

/***/ 588:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 589);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 589:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
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

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
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
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
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

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
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
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
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

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
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

    // Return an iterator with no values.
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
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
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

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
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
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
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

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 639:
/*!*******************************************************************************************!*\
  !*** /Users/jiangxiantao/Desktop/shy/Jisukangfu/components/w-picker/areadata/areadata.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var cityData = [{ value: '110000', label: '北京市', children: [{ value: "110100", label: "北京市", children: [{ value: "110101", label: "东城区" }, { value: "110102", label: "西城区" }, { value: "110105", label: "朝阳区" }, { value: "110106", label: "丰台区" }, { value: "110107", label: "石景山区" }, { value: "110108", label: "海淀区" }, { value: "110109", label: "门头沟区" }, { value: "110111", label: "房山区" }, { value: "110112", label: "通州区" }, { value: "110113", label: "顺义区" }, { value: "110114", label: "昌平区" }, { value: "110115", label: "大兴区" }, { value: "110116", label: "怀柔区" }, { value: "110117", label: "平谷区" }, { value: "110118", label: "密云区" }, { value: "110119", label: "延庆区" }] }] }, { value: '120000', label: '天津市', children: [{ value: "120100", label: "天津市", children: [{ value: "120101", label: "和平区" }, { value: "120102", label: "河东区" }, { value: "120103", label: "河西区" }, { value: "120104", label: "南开区" }, { value: "120105", label: "河北区" }, { value: "120106", label: "红桥区" }, { value: "120110", label: "东丽区" }, { value: "120111", label: "西青区" }, { value: "120112", label: "津南区" }, { value: "120113", label: "北辰区" }, { value: "120114", label: "武清区" }, { value: "120115", label: "宝坻区" }, { value: "120116", label: "滨海新区" }, { value: "120117", label: "宁河区" }, { value: "120118", label: "静海区" }, { value: "120119", label: "蓟州区" }] }] }, { value: '130000', label: '河北省', children: [{ value: "130100", label: "石家庄市", children: [{ value: "130102", label: "长安区" }, { value: "130104", label: "桥西区" }, { value: "130105", label: "新华区" }, { value: "130107", label: "井陉矿区" }, { value: "130108", label: "裕华区" }, { value: "130109", label: "藁城区" }, { value: "130110", label: "鹿泉区" }, { value: "130111", label: "栾城区" }, { value: "130121", label: "井陉县" }, { value: "130123", label: "正定县" }, { value: "130125", label: "行唐县" }, { value: "130126", label: "灵寿县" }, { value: "130127", label: "高邑县" }, { value: "130128", label: "深泽县" }, { value: "130129", label: "赞皇县" }, { value: "130130", label: "无极县" }, { value: "130131", label: "平山县" }, { value: "130132", label: "元氏县" }, { value: "130133", label: "赵县" }, { value: "130181", label: "辛集市" }, { value: "130183", label: "晋州市" }, { value: "130184", label: "新乐市" }, { value: "130172", label: "石家庄循环化工园区" }, { value: "130171", label: "石家庄高新技术产业开发区" }] }, { value: "130200", label: "唐山市", children: [{ value: "130202", label: "路南区" }, { value: "130203", label: "路北区" }, { value: "130204", label: "古冶区" }, { value: "130205", label: "开平区" }, { value: "130207", label: "丰南区" }, { value: "130208", label: "丰润区" }, { value: "130209", label: "曹妃甸区" }, { value: "130223", label: "滦县" }, { value: "130224", label: "滦南县" }, { value: "130225", label: "乐亭县" }, { value: "130227", label: "迁西县" }, { value: "130229", label: "玉田县" }, { value: "130281", label: "遵化市" }, { value: "130283", label: "迁安市" }, { value: "130271", label: "唐山市芦台经济技术开发区" }, { value: "130272", label: "唐山市汉沽管理区" }, { value: "130273", label: "唐山高新技术产业开发区" }, { value: "130274", label: "河北唐山海港经济开发区" }] }, { value: "130300", label: "秦皇岛市", children: [{ value: "130302", label: "海港区" }, { value: "130303", label: "山海关区" }, { value: "130304", label: "北戴河区" }, { value: "130321", label: "青龙满族自治县" }, { value: "130322", label: "昌黎县" }, { value: "130306", label: "抚宁区" }, { value: "130324", label: "卢龙县" }, { value: "130371", label: "秦皇岛市经济技术开发区" }, { value: "130372", label: "北戴河新区" }] }, { value: "130400", label: "邯郸市", children: [{ value: "130402", label: "邯山区" }, { value: "130403", label: "丛台区" }, { value: "130404", label: "复兴区" }, { value: "130406", label: "峰峰矿区" }, { value: "130421", label: "邯郸县" }, { value: "130423", label: "临漳县" }, { value: "130424", label: "成安县" }, { value: "130425", label: "大名县" }, { value: "130426", label: "涉县" }, { value: "130427", label: "磁县" }, { value: "130407", label: "肥乡区" }, { value: "130408", label: "永年区" }, { value: "130430", label: "邱县" }, { value: "130431", label: "鸡泽县" }, { value: "130432", label: "广平县" }, { value: "130433", label: "馆陶县" }, { value: "130434", label: "魏县" }, { value: "130435", label: "曲周县" }, { value: "130481", label: "武安市" }, { value: "130471", label: "邯郸经济技术开发区" }, { value: "130473", label: "邯郸冀南新区" }] }, { value: "130500", label: "邢台市", children: [{ value: "130502", label: "桥东区" }, { value: "130503", label: "桥西区" }, { value: "130521", label: "邢台县" }, { value: "130522", label: "临城县" }, { value: "130523", label: "内丘县" }, { value: "130524", label: "柏乡县" }, { value: "130525", label: "隆尧县" }, { value: "130526", label: "任县" }, { value: "130527", label: "南和县" }, { value: "130528", label: "宁晋县" }, { value: "130529", label: "巨鹿县" }, { value: "130530", label: "新河县" }, { value: "130531", label: "广宗县" }, { value: "130532", label: "平乡县" }, { value: "130533", label: "威县" }, { value: "130534", label: "清河县" }, { value: "130535", label: "临西县" }, { value: "130581", label: "南宫市" }, { value: "130582", label: "沙河市" }, { value: "130571", label: "河北邢台经济开发区" }] }, { value: "130600", label: "保定市", children: [{ value: "130602", label: "竞秀区" }, { value: "130606", label: "莲池区" }, { value: "130607", label: "满城区" }, { value: "130608", label: "清苑区" }, { value: "130623", label: "涞水县" }, { value: "130624", label: "阜平县" }, { value: "130609", label: "徐水区" }, { value: "130626", label: "定兴县" }, { value: "130627", label: "唐县" }, { value: "130628", label: "高阳县" }, { value: "130629", label: "容城县" }, { value: "130630", label: "涞源县" }, { value: "130631", label: "望都县" }, { value: "130632", label: "安新县" }, { value: "130633", label: "易县" }, { value: "130634", label: "曲阳县" }, { value: "130635", label: "蠡县" }, { value: "130636", label: "顺平县" }, { value: "130637", label: "博野县" }, { value: "130638", label: "雄县" }, { value: "130681", label: "涿州市" }, { value: "130682", label: "定州市" }, { value: "130683", label: "安国市" }, { value: "130684", label: "高碑店市" }, { value: "130671", label: "保定高新技术产业开发区" }, { value: "130672", label: "保定白沟新城" }] }, { value: "130700", label: "张家口市", children: [{ value: "130702", label: "桥东区" }, { value: "130703", label: "桥西区" }, { value: "130705", label: "宣化区" }, { value: "130706", label: "下花园区" }, { value: "130708", label: "万全区" }, { value: "130709", label: "崇礼区" }, { value: "130722", label: "张北县" }, { value: "130723", label: "康保县" }, { value: "130724", label: "沽源县" }, { value: "130725", label: "尚义县" }, { value: "130726", label: "蔚县" }, { value: "130727", label: "阳原县" }, { value: "130728", label: "怀安县" }, { value: "130730", label: "怀来县" }, { value: "130731", label: "涿鹿县" }, { value: "130732", label: "赤城县" }, { value: "130733", label: "崇礼县" }, { value: "130771", label: "张家口市高新技术产业开发区" }, { value: "130772", label: "张家口市察北管理区" }, { value: "130773", label: "张家口市塞北管理区" }] }, { value: "130800", label: "承德市", children: [{ value: "130802", label: "双桥区" }, { value: "130803", label: "双滦区" }, { value: "130804", label: "鹰手营子矿区" }, { value: "130821", label: "承德县" }, { value: "130822", label: "兴隆县" }, { value: "130881", label: "平泉市" }, { value: "130824", label: "滦平县" }, { value: "130825", label: "隆化县" }, { value: "130826", label: "丰宁满族自治县" }, { value: "130827", label: "宽城满族自治县" }, { value: "130828", label: "围场满族蒙古族自治县" }, { value: "130871", label: "承德高新技术产业开发区" }] }, { value: "130900", label: "沧州市", children: [{ value: "130902", label: "新华区" }, { value: "130903", label: "运河区" }, { value: "130921", label: "沧县" }, { value: "130922", label: "青县" }, { value: "130923", label: "东光县" }, { value: "130924", label: "海兴县" }, { value: "130925", label: "盐山县" }, { value: "130926", label: "肃宁县" }, { value: "130927", label: "南皮县" }, { value: "130928", label: "吴桥县" }, { value: "130929", label: "献县" }, { value: "130930", label: "孟村回族自治县" }, { value: "130981", label: "泊头市" }, { value: "130982", label: "任丘市" }, { value: "130983", label: "黄骅市" }, { value: "130984", label: "河间市" }, { value: "130971", label: "河北沧州经济开发区" }, { value: "130972", label: "沧州高新技术产业开发区" }, { value: "130973", label: "沧州渤海新区" }] }, { value: "131000", label: "廊坊市", children: [{ value: "131002", label: "安次区" }, { value: "131003", label: "广阳区" }, { value: "131022", label: "固安县" }, { value: "131023", label: "永清县" }, { value: "131024", label: "香河县" }, { value: "131025", label: "大城县" }, { value: "131026", label: "文安县" }, { value: "131028", label: "大厂回族自治县" }, { value: "131071", label: "廊坊经济技术开发区" }, { value: "131081", label: "霸州市" }, { value: "131082", label: "三河市" }] }, { value: "131100", label: "衡水市", children: [{ value: "131102", label: "桃城区" }, { value: "131121", label: "枣强县" }, { value: "131122", label: "武邑县" }, { value: "131123", label: "武强县" }, { value: "131124", label: "饶阳县" }, { value: "131125", label: "安平县" }, { value: "131126", label: "故城县" }, { value: "131127", label: "景县" }, { value: "131128", label: "阜城县" }, { value: "131103", label: "冀州区" }, { value: "131182", label: "深州市" }, { value: "131172", label: "衡水滨湖新区" }, { value: "131171", label: "河北衡水经济开发区" }] }] }, { value: '140000', label: '山西省', children: [{ value: "140100", label: "太原市", children: [{ value: "140105", label: "小店区" }, { value: "140106", label: "迎泽区" }, { value: "140107", label: "杏花岭区" }, { value: "140108", label: "尖草坪区" }, { value: "140109", label: "万柏林区" }, { value: "140110", label: "晋源区" }, { value: "140121", label: "清徐县" }, { value: "140122", label: "阳曲县" }, { value: "140123", label: "娄烦县" }, { value: "140181", label: "古交市" }, { value: "140171", label: "山西转型综合改革示范区" }] }, { value: "140200", label: "大同市", children: [{ value: "140202", label: "城区" }, { value: "140203", label: "矿区" }, { value: "140211", label: "南郊区" }, { value: "140212", label: "新荣区" }, { value: "140221", label: "阳高县" }, { value: "140222", label: "天镇县" }, { value: "140223", label: "广灵县" }, { value: "140224", label: "灵丘县" }, { value: "140225", label: "浑源县" }, { value: "140226", label: "左云县" }, { value: "140227", label: "大同县" }, { value: "140271", label: "山西大同经济开发区" }] }, { value: "140300", label: "阳泉市", children: [{ value: "140302", label: "城区" }, { value: "140303", label: "矿区" }, { value: "140311", label: "郊区" }, { value: "140321", label: "平定县" }, { value: "140322", label: "盂县" }, { value: "140371", label: "山西阳泉经济开发区" }] }, { value: "140400", label: "长治市", children: [{ value: "140421", label: "长治县" }, { value: "140423", label: "襄垣县" }, { value: "140424", label: "屯留县" }, { value: "140425", label: "平顺县" }, { value: "140426", label: "黎城县" }, { value: "140427", label: "壶关县" }, { value: "140428", label: "长子县" }, { value: "140429", label: "武乡县" }, { value: "140430", label: "沁县" }, { value: "140431", label: "沁源县" }, { value: "140481", label: "潞城市" }, { value: "140402", label: "城区" }, { value: "140411", label: "郊区" }, { value: "140471", label: "山西长治高新技术产业园区" }] }, { value: "140500", label: "晋城市", children: [{ value: "140502", label: "城区" }, { value: "140521", label: "沁水县" }, { value: "140522", label: "阳城县" }, { value: "140524", label: "陵川县" }, { value: "140525", label: "泽州县" }, { value: "140581", label: "高平市" }] }, { value: "140600", label: "朔州市", children: [{ value: "140602", label: "朔城区" }, { value: "140603", label: "平鲁区" }, { value: "140621", label: "山阴县" }, { value: "140622", label: "应县" }, { value: "140623", label: "右玉县" }, { value: "140624", label: "怀仁县" }, { value: "140671", label: "山西朔州经济开发区" }] }, { value: "140700", label: "晋中市", children: [{ value: "140702", label: "榆次区" }, { value: "140721", label: "榆社县" }, { value: "140722", label: "左权县" }, { value: "140723", label: "和顺县" }, { value: "140724", label: "昔阳县" }, { value: "140725", label: "寿阳县" }, { value: "140726", label: "太谷县" }, { value: "140727", label: "祁县" }, { value: "140728", label: "平遥县" }, { value: "140729", label: "灵石县" }, { value: "140781", label: "介休市" }] }, { value: "140800", label: "运城市", children: [{ value: "140802", label: "盐湖区" }, { value: "140821", label: "临猗县" }, { value: "140822", label: "万荣县" }, { value: "140823", label: "闻喜县" }, { value: "140824", label: "稷山县" }, { value: "140825", label: "新绛县" }, { value: "140826", label: "绛县" }, { value: "140827", label: "垣曲县" }, { value: "140828", label: "夏县" }, { value: "140829", label: "平陆县" }, { value: "140830", label: "芮城县" }, { value: "140881", label: "永济市" }, { value: "140882", label: "河津市" }] }, { value: "140900", label: "忻州市", children: [{ value: "140902", label: "忻府区" }, { value: "140921", label: "定襄县" }, { value: "140922", label: "五台县" }, { value: "140923", label: "代县" }, { value: "140924", label: "繁峙县" }, { value: "140925", label: "宁武县" }, { value: "140926", label: "静乐县" }, { value: "140927", label: "神池县" }, { value: "140928", label: "五寨县" }, { value: "140929", label: "岢岚县" }, { value: "140930", label: "河曲县" }, { value: "140931", label: "保德县" }, { value: "140932", label: "偏关县" }, { value: "140981", label: "原平市" }, { value: "140971", label: "五台山风景名胜区" }] }, { value: "141000", label: "临汾市", children: [{ value: "141002", label: "尧都区" }, { value: "141021", label: "曲沃县" }, { value: "141022", label: "翼城县" }, { value: "141023", label: "襄汾县" }, { value: "141024", label: "洪洞县" }, { value: "141025", label: "古县" }, { value: "141026", label: "安泽县" }, { value: "141027", label: "浮山县" }, { value: "141028", label: "吉县" }, { value: "141029", label: "乡宁县" }, { value: "141030", label: "大宁县" }, { value: "141031", label: "隰县" }, { value: "141032", label: "永和县" }, { value: "141033", label: "蒲县" }, { value: "141034", label: "汾西县" }, { value: "141081", label: "侯马市" }, { value: "141082", label: "霍州市" }] }, { value: "141100", label: "吕梁市", children: [{ value: "141102", label: "离石区" }, { value: "141121", label: "文水县" }, { value: "141122", label: "交城县" }, { value: "141123", label: "兴县" }, { value: "141124", label: "临县" }, { value: "141125", label: "柳林县" }, { value: "141126", label: "石楼县" }, { value: "141127", label: "岚县" }, { value: "141128", label: "方山县" }, { value: "141129", label: "中阳县" }, { value: "141130", label: "交口县" }, { value: "141181", label: "孝义市" }, { value: "141182", label: "汾阳市" }] }] }, { value: '150000', label: '内蒙古', children: [{ value: "150100", label: "呼和浩特市", children: [{ value: "150102", label: "新城区" }, { value: "150103", label: "回民区" }, { value: "150104", label: "玉泉区" }, { value: "150105", label: "赛罕区" }, { value: "150121", label: "土默特左旗" }, { value: "150122", label: "托克托县" }, { value: "150123", label: "和林格尔县" }, { value: "150124", label: "清水河县" }, { value: "150125", label: "武川县" }, { value: "150171", label: "呼和浩特金海工业园区" }, { value: "150172", label: "呼和浩特经济技术开发区" }] }, { value: "150200", label: "包头市", children: [{ value: "150202", label: "东河区" }, { value: "150203", label: "昆都仑区" }, { value: "150204", label: "青山区" }, { value: "150205", label: "石拐区" }, { value: "150206", label: "白云矿区" }, { value: "150207", label: "九原区" }, { value: "150221", label: "土默特右旗" }, { value: "150222", label: "固阳县" }, { value: "150223", label: "达尔罕茂明安联合旗" }, { value: "150271", label: "包头稀土高新技术产业开发区" }] }, { value: "150300", label: "乌海市", children: [{ value: "150302", label: "海勃湾区" }, { value: "150303", label: "海南区" }, { value: "150304", label: "乌达区" }] }, { value: "150400", label: "赤峰市", children: [{ value: "150402", label: "红山区" }, { value: "150403", label: "元宝山区" }, { value: "150404", label: "松山区" }, { value: "150421", label: "阿鲁科尔沁旗" }, { value: "150422", label: "巴林左旗" }, { value: "150423", label: "巴林右旗" }, { value: "150424", label: "林西县" }, { value: "150425", label: "克什克腾旗" }, { value: "150426", label: "翁牛特旗" }, { value: "150428", label: "喀喇沁旗" }, { value: "150429", label: "宁城县" }, { value: "150430", label: "敖汉旗" }] }, { value: "150500", label: "通辽市", children: [{ value: "150502", label: "科尔沁区" }, { value: "150521", label: "科尔沁左翼中旗" }, { value: "150522", label: "科尔沁左翼后旗" }, { value: "150523", label: "开鲁县" }, { value: "150524", label: "库伦旗" }, { value: "150525", label: "奈曼旗" }, { value: "150526", label: "扎鲁特旗" }, { value: "150581", label: "霍林郭勒市" }, { value: "150571", label: "通辽经济技术开发区" }] }, { value: "150600", label: "鄂尔多斯市", children: [{ value: "150602", label: "东胜区" }, { value: "150621", label: "达拉特旗" }, { value: "150622", label: "准格尔旗" }, { value: "150623", label: "鄂托克前旗" }, { value: "150624", label: "鄂托克旗" }, { value: "150625", label: "杭锦旗" }, { value: "150626", label: "乌审旗" }, { value: "150627", label: "伊金霍洛旗" }, { value: "150603", label: "康巴什区" }] }, { value: "150700", label: "呼伦贝尔市", children: [{ value: "150702", label: "海拉尔区" }, { value: "150721", label: "阿荣旗" }, { value: "150722", label: "莫力达瓦达斡尔族自治旗" }, { value: "150723", label: "鄂伦春自治旗" }, { value: "150724", label: "鄂温克族自治旗" }, { value: "150725", label: "陈巴尔虎旗" }, { value: "150726", label: "新巴尔虎左旗" }, { value: "150727", label: "新巴尔虎右旗" }, { value: "150781", label: "满洲里市" }, { value: "150782", label: "牙克石市" }, { value: "150783", label: "扎兰屯市" }, { value: "150784", label: "额尔古纳市" }, { value: "150785", label: "根河市" }, { value: "150703", label: "扎赉诺尔区" }] }, { value: "150800", label: "巴彦淖尔市", children: [{ value: "150802", label: "临河区" }, { value: "150821", label: "五原县" }, { value: "150822", label: "磴口县" }, { value: "150823", label: "乌拉特前旗" }, { value: "150824", label: "乌拉特中旗" }, { value: "150825", label: "乌拉特后旗" }, { value: "150826", label: "杭锦后旗" }] }, { value: "150900", label: "乌兰察布市", children: [{ value: "150902", label: "集宁区" }, { value: "150921", label: "卓资县" }, { value: "150922", label: "化德县" }, { value: "150923", label: "商都县" }, { value: "150924", label: "兴和县" }, { value: "150925", label: "凉城县" }, { value: "150926", label: "察哈尔右翼前旗" }, { value: "150927", label: "察哈尔右翼中旗" }, { value: "150928", label: "察哈尔右翼后旗" }, { value: "150929", label: "四子王旗" }, { value: "150981", label: "丰镇市" }] }, { value: "152200", label: "兴安盟", children: [{ value: "152201", label: "乌兰浩特市" }, { value: "152202", label: "阿尔山市" }, { value: "152221", label: "科尔沁右翼前旗" }, { value: "152222", label: "科尔沁右翼中旗" }, { value: "152223", label: "扎赉特旗" }, { value: "152224", label: "突泉县" }] }, { value: "152500", label: "锡林郭勒盟", children: [{ value: "152501", label: "二连浩特市" }, { value: "152502", label: "锡林浩特市" }, { value: "152522", label: "阿巴嘎旗" }, { value: "152523", label: "苏尼特左旗" }, { value: "152524", label: "苏尼特右旗" }, { value: "152525", label: "东乌珠穆沁旗" }, { value: "152526", label: "西乌珠穆沁旗" }, { value: "152527", label: "太仆寺旗" }, { value: "152528", label: "镶黄旗" }, { value: "152529", label: "正镶白旗" }, { value: "152530", label: "正蓝旗" }, { value: "152531", label: "多伦县" }, { value: "152571", label: "乌拉盖管委会" }] }, { value: "152900", label: "阿拉善盟", children: [{ value: "152921", label: "阿拉善左旗" }, { value: "152922", label: "阿拉善右旗" }, { value: "152923", label: "额济纳旗" }, { value: "152971", label: "内蒙古阿拉善经济开发区" }] }] }, { value: '210000', label: '辽宁省', children: [{ value: "210100", label: "沈阳市", children: [{ value: "210102", label: "和平区" }, { value: "210103", label: "沈河区" }, { value: "210104", label: "大东区" }, { value: "210105", label: "皇姑区" }, { value: "210106", label: "铁西区" }, { value: "210111", label: "苏家屯区" }, { value: "210112", label: "东陵区" }, { value: "210113", label: "新城子区" }, { value: "210114", label: "于洪区" }, { value: "210115", label: "辽中区" }, { value: "210123", label: "康平县" }, { value: "210124", label: "法库县" }, { value: "210181", label: "新民市" }, { value: "210112", label: "浑南区" }, { value: "210113", label: "沈北新区" }] }, { value: "210200", label: "大连市", children: [{ value: "210202", label: "中山区" }, { value: "210203", label: "西岗区" }, { value: "210204", label: "沙河口区" }, { value: "210211", label: "甘井子区" }, { value: "210212", label: "旅顺口区" }, { value: "210213", label: "金州区" }, { value: "210224", label: "长海县" }, { value: "210251", label: "开发区" }, { value: "210281", label: "瓦房店市" }, { value: "210214", label: "普兰店区" }, { value: "210283", label: "庄河市" }] }, { value: "210300", label: "鞍山市", children: [{ value: "210302", label: "铁东区" }, { value: "210303", label: "铁西区" }, { value: "210304", label: "立山区" }, { value: "210311", label: "千山区" }, { value: "210321", label: "台安县" }, { value: "210323", label: "岫岩满族自治县" }, { value: "210381", label: "海城市" }] }, { value: "210400", label: "抚顺市", children: [{ value: "210402", label: "新抚区" }, { value: "210403", label: "东洲区" }, { value: "210404", label: "望花区" }, { value: "210411", label: "顺城区" }, { value: "210421", label: "抚顺县" }, { value: "210422", label: "新宾满族自治县" }, { value: "210423", label: "清原满族自治县" }] }, { value: "210500", label: "本溪市", children: [{ value: "210502", label: "平山区" }, { value: "210503", label: "溪湖区" }, { value: "210504", label: "明山区" }, { value: "210505", label: "南芬区" }, { value: "210521", label: "本溪满族自治县" }, { value: "210522", label: "桓仁满族自治县" }] }, { value: "210600", label: "丹东市", children: [{ value: "210602", label: "元宝区" }, { value: "210603", label: "振兴区" }, { value: "210604", label: "振安区" }, { value: "210624", label: "宽甸满族自治县" }, { value: "210681", label: "东港市" }, { value: "210682", label: "凤城市" }] }, { value: "210700", label: "锦州市", children: [{ value: "210702", label: "古塔区" }, { value: "210703", label: "凌河区" }, { value: "210711", label: "太和区" }, { value: "210726", label: "黑山县" }, { value: "210727", label: "义县" }, { value: "210781", label: "凌海市" }, { value: "210782", label: "北镇市" }] }, { value: "210800", label: "营口市", children: [{ value: "210802", label: "站前区" }, { value: "210803", label: "西市区" }, { value: "210804", label: "鲅鱼圈区" }, { value: "210811", label: "老边区" }, { value: "210881", label: "盖州市" }, { value: "210882", label: "大石桥市" }] }, { value: "210900", label: "阜新市", children: [{ value: "210902", label: "海州区" }, { value: "210903", label: "新邱区" }, { value: "210904", label: "太平区" }, { value: "210905", label: "清河门区" }, { value: "210911", label: "细河区" }, { value: "210921", label: "阜新蒙古族自治县" }, { value: "210922", label: "彰武县" }] }, { value: "211000", label: "辽阳市", children: [{ value: "211002", label: "白塔区" }, { value: "211003", label: "文圣区" }, { value: "211004", label: "宏伟区" }, { value: "211005", label: "弓长岭区" }, { value: "211011", label: "太子河区" }, { value: "211021", label: "辽阳县" }, { value: "211081", label: "灯塔市" }] }, { value: "211100", label: "盘锦市", children: [{ value: "211102", label: "双台子区" }, { value: "211103", label: "兴隆台区" }, { value: "211121", label: "大洼县" }, { value: "211122", label: "盘山县" }] }, { value: "211200", label: "铁岭市", children: [{ value: "211202", label: "银州区" }, { value: "211204", label: "清河区" }, { value: "211221", label: "铁岭县" }, { value: "211223", label: "西丰县" }, { value: "211224", label: "昌图县" }, { value: "211281", label: "调兵山市" }, { value: "211282", label: "开原市" }] }, { value: "211300", label: "朝阳市", children: [{ value: "211302", label: "双塔区" }, { value: "211303", label: "龙城区" }, { value: "211321", label: "朝阳县" }, { value: "211322", label: "建平县" }, { value: "211324", label: "喀喇沁左翼蒙古族自治县" }, { value: "211381", label: "北票市" }, { value: "211382", label: "凌源市" }] }, { value: "211400", label: "葫芦岛市", children: [{ value: "211402", label: "连山区" }, { value: "211403", label: "龙港区" }, { value: "211404", label: "南票区" }, { value: "211421", label: "绥中县" }, { value: "211422", label: "建昌县" }, { value: "211481", label: "兴城市" }] }] }, { value: '220000', label: '吉林省', children: [{ value: "220100", label: "长春市", children: [{ value: "220102", label: "南关区" }, { value: "220103", label: "宽城区" }, { value: "220104", label: "朝阳区" }, { value: "220105", label: "二道区" }, { value: "220106", label: "绿园区" }, { value: "220112", label: "双阳区" }, { value: "220122", label: "农安县" }, { value: "220181", label: "九台市" }, { value: "220182", label: "榆树市" }, { value: "220183", label: "德惠市" }, { value: "220171", label: "长春经济技术开发区" }, { value: "220172", label: "长春净月高新技术产业开发区" }, { value: "220173", label: "长春高新技术产业开发区" }, { value: "220174", label: "长春汽车经济技术开发区" }] }, { value: "220200", label: "吉林市", children: [{ value: "220202", label: "昌邑区" }, { value: "220203", label: "龙潭区" }, { value: "220204", label: "船营区" }, { value: "220211", label: "丰满区" }, { value: "220221", label: "永吉县" }, { value: "220281", label: "蛟河市" }, { value: "220282", label: "桦甸市" }, { value: "220283", label: "舒兰市" }, { value: "220284", label: "磐石市" }, { value: "220271", label: "吉林经济开发区" }, { value: "220272", label: "吉林高新技术产业开发区" }, { value: "220273", label: "吉林中国新加坡食品区" }] }, { value: "220300", label: "四平市", children: [{ value: "220302", label: "铁西区" }, { value: "220303", label: "铁东区" }, { value: "220322", label: "梨树县" }, { value: "220323", label: "伊通满族自治县" }, { value: "220381", label: "公主岭市" }, { value: "220382", label: "双辽市" }] }, { value: "220400", label: "辽源市", children: [{ value: "220402", label: "龙山区" }, { value: "220403", label: "西安区" }, { value: "220421", label: "东丰县" }, { value: "220422", label: "东辽县" }] }, { value: "220500", label: "通化市", children: [{ value: "220502", label: "东昌区" }, { value: "220503", label: "二道江区" }, { value: "220521", label: "通化县" }, { value: "220523", label: "辉南县" }, { value: "220524", label: "柳河县" }, { value: "220581", label: "梅河口市" }, { value: "220582", label: "集安市" }] }, { value: "220600", label: "白山市", children: [{ value: "220602", label: "八道江区" }, { value: "220621", label: "抚松县" }, { value: "220622", label: "靖宇县" }, { value: "220623", label: "长白朝鲜族自治县" }, { value: "220605", label: "江源区" }, { value: "220681", label: "临江市" }, { value: "220602", label: "浑江区" }] }, { value: "220700", label: "松原市", children: [{ value: "220702", label: "宁江区" }, { value: "220721", label: "前郭尔罗斯蒙古族自治县" }, { value: "220722", label: "长岭县" }, { value: "220723", label: "乾安县" }, { value: "220781", label: "扶余市" }, { value: "220771", label: "吉林松原经济开发区" }] }, { value: "220800", label: "白城市", children: [{ value: "220802", label: "洮北区" }, { value: "220821", label: "镇赉县" }, { value: "220822", label: "通榆县" }, { value: "220881", label: "洮南市" }, { value: "220882", label: "大安市" }, { value: "220871", label: "吉林白城经济开发区" }] }, { value: "222400", label: "延边朝鲜族自治州", children: [{ value: "222401", label: "延吉市" }, { value: "222402", label: "图们市" }, { value: "222403", label: "敦化市" }, { value: "222404", label: "珲春市" }, { value: "222405", label: "龙井市" }, { value: "222406", label: "和龙市" }, { value: "222424", label: "汪清县" }, { value: "222426", label: "安图县" }] }] }, { value: '230000', label: '黑龙江省', children: [{ value: "230100", label: "哈尔滨市", children: [{ value: "230102", label: "道里区" }, { value: "230103", label: "南岗区" }, { value: "230104", label: "道外区" }, { value: "230110", label: "香坊区" }, { value: "230107", label: "动力区" }, { value: "230108", label: "平房区" }, { value: "230109", label: "松北区" }, { value: "230111", label: "呼兰区" }, { value: "230123", label: "依兰县" }, { value: "230124", label: "方正县" }, { value: "230125", label: "宾县" }, { value: "230126", label: "巴彦县" }, { value: "230127", label: "木兰县" }, { value: "230128", label: "通河县" }, { value: "230129", label: "延寿县" }, { value: "230112", label: "阿城区" }, { value: "230113", label: "双城区" }, { value: "230183", label: "尚志市" }, { value: "230184", label: "五常市" }] }, { value: "230200", label: "齐齐哈尔市", children: [{ value: "230202", label: "龙沙区" }, { value: "230203", label: "建华区" }, { value: "230204", label: "铁锋区" }, { value: "230205", label: "昂昂溪区" }, { value: "230206", label: "富拉尔基区" }, { value: "230207", label: "碾子山区" }, { value: "230208", label: "梅里斯达斡尔族区" }, { value: "230221", label: "龙江县" }, { value: "230223", label: "依安县" }, { value: "230224", label: "泰来县" }, { value: "230225", label: "甘南县" }, { value: "230227", label: "富裕县" }, { value: "230229", label: "克山县" }, { value: "230230", label: "克东县" }, { value: "230231", label: "拜泉县" }, { value: "230281", label: "讷河市" }] }, { value: "230300", label: "鸡西市", children: [{ value: "230302", label: "鸡冠区" }, { value: "230303", label: "恒山区" }, { value: "230304", label: "滴道区" }, { value: "230305", label: "梨树区" }, { value: "230306", label: "城子河区" }, { value: "230307", label: "麻山区" }, { value: "230321", label: "鸡东县" }, { value: "230381", label: "虎林市" }, { value: "230382", label: "密山市" }] }, { value: "230400", label: "鹤岗市", children: [{ value: "230402", label: "向阳区" }, { value: "230403", label: "工农区" }, { value: "230404", label: "南山区" }, { value: "230405", label: "兴安区" }, { value: "230406", label: "东山区" }, { value: "230407", label: "兴山区" }, { value: "230421", label: "萝北县" }, { value: "230422", label: "绥滨县" }] }, { value: "230500", label: "双鸭山市", children: [{ value: "230502", label: "尖山区" }, { value: "230503", label: "岭东区" }, { value: "230505", label: "四方台区" }, { value: "230506", label: "宝山区" }, { value: "230521", label: "集贤县" }, { value: "230522", label: "友谊县" }, { value: "230523", label: "宝清县" }, { value: "230524", label: "饶河县" }] }, { value: "230600", label: "大庆市", children: [{ value: "230602", label: "萨尔图区" }, { value: "230603", label: "龙凤区" }, { value: "230604", label: "让胡路区" }, { value: "230605", label: "红岗区" }, { value: "230606", label: "大同区" }, { value: "230621", label: "肇州县" }, { value: "230622", label: "肇源县" }, { value: "230623", label: "林甸县" }, { value: "230624", label: "杜尔伯特蒙古族自治县" }, { value: "230671", label: "大庆高新技术产业开发区" }] }, { value: "230700", label: "伊春市", children: [{ value: "230702", label: "伊春区" }, { value: "230703", label: "南岔区" }, { value: "230704", label: "友好区" }, { value: "230705", label: "西林区" }, { value: "230706", label: "翠峦区" }, { value: "230707", label: "新青区" }, { value: "230708", label: "美溪区" }, { value: "230709", label: "金山屯区" }, { value: "230710", label: "五营区" }, { value: "230711", label: "乌马河区" }, { value: "230712", label: "汤旺河区" }, { value: "230713", label: "带岭区" }, { value: "230714", label: "乌伊岭区" }, { value: "230715", label: "红星区" }, { value: "230716", label: "上甘岭区" }, { value: "230722", label: "嘉荫县" }, { value: "230781", label: "铁力市" }] }, { value: "230800", label: "佳木斯市", children: [{ value: "230803", label: "向阳区" }, { value: "230804", label: "前进区" }, { value: "230805", label: "东风区" }, { value: "230811", label: "郊区" }, { value: "230822", label: "桦南县" }, { value: "230826", label: "桦川县" }, { value: "230828", label: "汤原县" }, { value: "230833", label: "抚远市" }, { value: "230881", label: "同江市" }, { value: "230882", label: "富锦市" }] }, { value: "230900", label: "七台河市", children: [{ value: "230902", label: "新兴区" }, { value: "230903", label: "桃山区" }, { value: "230904", label: "茄子河区" }, { value: "230921", label: "勃利县" }] }, { value: "231000", label: "牡丹江市", children: [{ value: "231002", label: "东安区" }, { value: "231003", label: "阳明区" }, { value: "231004", label: "爱民区" }, { value: "231005", label: "西安区" }, { value: "231086", label: "东宁市" }, { value: "231025", label: "林口县" }, { value: "231081", label: "绥芬河市" }, { value: "231083", label: "海林市" }, { value: "231084", label: "宁安市" }, { value: "231085", label: "穆棱市" }, { value: "231071", label: "牡丹江经济技术开发区" }] }, { value: "231100", label: "黑河市", children: [{ value: "231102", label: "爱辉区" }, { value: "231121", label: "嫩江县" }, { value: "231123", label: "逊克县" }, { value: "231124", label: "孙吴县" }, { value: "231181", label: "北安市" }, { value: "231182", label: "五大连池市" }] }, { value: "231200", label: "绥化市", children: [{ value: "231202", label: "北林区" }, { value: "231221", label: "望奎县" }, { value: "231222", label: "兰西县" }, { value: "231223", label: "青冈县" }, { value: "231224", label: "庆安县" }, { value: "231225", label: "明水县" }, { value: "231226", label: "绥棱县" }, { value: "231281", label: "安达市" }, { value: "231282", label: "肇东市" }, { value: "231283", label: "海伦市" }] }, { value: "232700", label: "大兴安岭地区", children: [{ value: "232721", label: "呼玛县" }, { value: "232722", label: "塔河县" }, { value: "232723", label: "漠河县" }, { value: "232701", label: "加格达奇区" }, { value: "232704", label: "呼中区" }, { value: "232703", label: "新林区" }] }] }, { value: '310000', label: '上海市', children: [{ value: '310100', label: '上海市', children: [{ value: "310101", label: "黄浦区" }, { value: "310104", label: "徐汇区" }, { value: "310105", label: "长宁区" }, { value: "310106", label: "静安区" }, { value: "310107", label: "普陀区" }, { value: "310109", label: "虹口区" }, { value: "310110", label: "杨浦区" }, { value: "310112", label: "闵行区" }, { value: "310113", label: "宝山区" }, { value: "310114", label: "嘉定区" }, { value: "310115", label: "浦东新区" }, { value: "310116", label: "金山区" }, { value: "310117", label: "松江区" }, { value: "310118", label: "青浦区" }, { value: "310120", label: "奉贤区" }, { value: "310151", label: "崇明区" }] }] }, { value: '320000', label: '江苏省', children: [{ value: "320100", label: "南京市", children: [{ value: "320102", label: "玄武区" }, { value: "320104", label: "秦淮区" }, { value: "320105", label: "建邺区" }, { value: "320106", label: "鼓楼区" }, { value: "320111", label: "浦口区" }, { value: "320113", label: "栖霞区" }, { value: "320114", label: "雨花台区" }, { value: "320115", label: "江宁区" }, { value: "320116", label: "六合区" }, { value: "320117", label: "溧水区" }, { value: "320118", label: "高淳区" }] }, { value: "320200", label: "无锡市", children: [{ value: "320205", label: "锡山区" }, { value: "320206", label: "惠山区" }, { value: "320211", label: "滨湖区" }, { value: "320281", label: "江阴市" }, { value: "320282", label: "宜兴市" }, { value: "320213", label: "梁溪区" }, { value: "320214", label: "新吴区" }] }, { value: "320300", label: "徐州市", children: [{ value: "320302", label: "鼓楼区" }, { value: "320303", label: "云龙区" }, { value: "320305", label: "贾汪区" }, { value: "320311", label: "泉山区" }, { value: "320321", label: "丰县" }, { value: "320322", label: "沛县" }, { value: "320324", label: "睢宁县" }, { value: "320381", label: "新沂市" }, { value: "320382", label: "邳州市" }, { value: "320371", label: "徐州经济技术开发区" }] }, { value: "320400", label: "常州市", children: [{ value: "320402", label: "天宁区" }, { value: "320404", label: "钟楼区" }, { value: "320411", label: "新北区" }, { value: "320412", label: "武进区" }, { value: "320481", label: "溧阳市" }, { value: "320413", label: "金坛区" }] }, { value: "320500", label: "苏州市", children: [{ value: "320505", label: "虎丘区" }, { value: "320506", label: "吴中区" }, { value: "320507", label: "相城区" }, { value: "320581", label: "常熟市" }, { value: "320582", label: "张家港市" }, { value: "320583", label: "昆山市" }, { value: "320509", label: "吴江区" }, { value: "320585", label: "太仓市" }, { value: "320508", label: "姑苏区" }, { value: "320571", label: "苏州工业园区" }] }, { value: "320600", label: "南通市", children: [{ value: "320602", label: "崇川区" }, { value: "320611", label: "港闸区" }, { value: "320612", label: "通州区" }, { value: "320621", label: "海安县" }, { value: "320623", label: "如东县" }, { value: "320681", label: "启东市" }, { value: "320682", label: "如皋市" }, { value: "320684", label: "海门市" }, { value: "320671", label: "南通经济技术开发区" }] }, { value: "320700", label: "连云港市", children: [{ value: "320703", label: "连云区" }, { value: "320706", label: "海州区" }, { value: "320707", label: "赣榆区" }, { value: "320722", label: "东海县" }, { value: "320723", label: "灌云县" }, { value: "320724", label: "灌南县" }, { value: "320771", label: "连云港经济技术开发区" }, { value: "320772", label: "连云港高新技术产业开发区" }] }, { value: "320800", label: "淮安市", children: [{ value: "320804", label: "淮阴区" }, { value: "320812", label: "清江浦区" }, { value: "320826", label: "涟水县" }, { value: "320813", label: "洪泽区" }, { value: "320830", label: "盱眙县" }, { value: "320831", label: "金湖县" }, { value: "320803", label: "淮安区" }, { value: "320871", label: "淮安经济技术开发区" }] }, { value: "320900", label: "盐城市", children: [{ value: "320902", label: "亭湖区" }, { value: "320903", label: "盐都区" }, { value: "320921", label: "响水县" }, { value: "320922", label: "滨海县" }, { value: "320904", label: "大丰区" }, { value: "320923", label: "阜宁县" }, { value: "320924", label: "射阳县" }, { value: "320925", label: "建湖县" }, { value: "320981", label: "东台市" }, { value: "320971", label: "盐城经济技术开发区" }] }, { value: "321000", label: "扬州市", children: [{ value: "321002", label: "广陵区" }, { value: "321003", label: "邗江区" }, { value: "321011", label: "维扬区" }, { value: "321023", label: "宝应县" }, { value: "321081", label: "仪征市" }, { value: "321084", label: "高邮市" }, { value: "321012", label: "江都区" }, { value: "321071", label: "扬州经济技术开发区" }] }, { value: "321100", label: "镇江市", children: [{ value: "321102", label: "京口区" }, { value: "321111", label: "润州区" }, { value: "321112", label: "丹徒区" }, { value: "321181", label: "丹阳市" }, { value: "321182", label: "扬中市" }, { value: "321183", label: "句容市" }, { value: "321171", label: "镇江新区" }] }, { value: "321200", label: "泰州市", children: [{ value: "321202", label: "海陵区" }, { value: "321203", label: "高港区" }, { value: "321281", label: "兴化市" }, { value: "321282", label: "靖江市" }, { value: "321283", label: "泰兴市" }, { value: "321204", label: "姜堰区" }, { value: "321271", label: "泰州医药高新技术产业开发区" }] }, { value: "321300", label: "宿迁市", children: [{ value: "321302", label: "宿城区" }, { value: "321311", label: "宿豫区" }, { value: "321322", label: "沭阳县" }, { value: "321323", label: "泗阳县" }, { value: "321324", label: "泗洪县" }] }] }, { value: '330000', label: '浙江省', children: [{ value: "330100", label: "杭州市", children: [{ value: "330102", label: "上城区" }, { value: "330103", label: "下城区" }, { value: "330104", label: "江干区" }, { value: "330105", label: "拱墅区" }, { value: "330106", label: "西湖区" }, { value: "330108", label: "滨江区" }, { value: "330109", label: "萧山区" }, { value: "330110", label: "余杭区" }, { value: "330122", label: "桐庐县" }, { value: "330127", label: "淳安县" }, { value: "330182", label: "建德市" }, { value: "330111", label: "富阳区" }, { value: "330112", label: "临安区" }, { value: "330186", label: "其它区" }] }, { value: "330200", label: "宁波市", children: [{ value: "330203", label: "海曙区" }, { value: "330205", label: "江北区" }, { value: "330206", label: "北仑区" }, { value: "330211", label: "镇海区" }, { value: "330212", label: "鄞州区" }, { value: "330225", label: "象山县" }, { value: "330226", label: "宁海县" }, { value: "330281", label: "余姚市" }, { value: "330282", label: "慈溪市" }, { value: "330213", label: "奉化区" }] }, { value: "330300", label: "温州市", children: [{ value: "330302", label: "鹿城区" }, { value: "330303", label: "龙湾区" }, { value: "330304", label: "瓯海区" }, { value: "330305", label: "洞头区" }, { value: "330324", label: "永嘉县" }, { value: "330326", label: "平阳县" }, { value: "330327", label: "苍南县" }, { value: "330328", label: "文成县" }, { value: "330329", label: "泰顺县" }, { value: "330381", label: "瑞安市" }, { value: "330382", label: "乐清市" }, { value: "330371", label: "温州经济技术开发区" }] }, { value: "330400", label: "嘉兴市", children: [{ value: "330402", label: "南湖区" }, { value: "330411", label: "秀洲区" }, { value: "330421", label: "嘉善县" }, { value: "330424", label: "海盐县" }, { value: "330481", label: "海宁市" }, { value: "330482", label: "平湖市" }, { value: "330483", label: "桐乡市" }] }, { value: "330500", label: "湖州市", children: [{ value: "330502", label: "吴兴区" }, { value: "330503", label: "南浔区" }, { value: "330521", label: "德清县" }, { value: "330522", label: "长兴县" }, { value: "330523", label: "安吉县" }] }, { value: "330600", label: "绍兴市", children: [{ value: "330602", label: "越城区" }, { value: "330621", label: "柯桥区" }, { value: "330681", label: "诸暨市" }, { value: "330604", label: "上虞区" }, { value: "330683", label: "嵊州市" }, { value: "330624", label: "新昌县" }] }, { value: "330700", label: "金华市", children: [{ value: "330702", label: "婺城区" }, { value: "330703", label: "金东区" }, { value: "330723", label: "武义县" }, { value: "330726", label: "浦江县" }, { value: "330727", label: "磐安县" }, { value: "330781", label: "兰溪市" }, { value: "330782", label: "义乌市" }, { value: "330783", label: "东阳市" }, { value: "330784", label: "永康市" }] }, { value: "330800", label: "衢州市", children: [{ value: "330802", label: "柯城区" }, { value: "330803", label: "衢江区" }, { value: "330822", label: "常山县" }, { value: "330824", label: "开化县" }, { value: "330825", label: "龙游县" }, { value: "330881", label: "江山市" }] }, { value: "330900", label: "舟山市", children: [{ value: "330902", label: "定海区" }, { value: "330903", label: "普陀区" }, { value: "330921", label: "岱山县" }, { value: "330922", label: "嵊泗县" }] }, { value: "331000", label: "台州市", children: [{ value: "331002", label: "椒江区" }, { value: "331003", label: "黄岩区" }, { value: "331004", label: "路桥区" }, { value: "331083", label: "玉环市" }, { value: "331022", label: "三门县" }, { value: "331023", label: "天台县" }, { value: "331024", label: "仙居县" }, { value: "331081", label: "温岭市" }, { value: "331082", label: "临海市" }] }, { value: "331100", label: "丽水市", children: [{ value: "331102", label: "莲都区" }, { value: "331121", label: "青田县" }, { value: "331122", label: "缙云县" }, { value: "331123", label: "遂昌县" }, { value: "331124", label: "松阳县" }, { value: "331125", label: "云和县" }, { value: "331126", label: "庆元县" }, { value: "331127", label: "景宁畲族自治县" }, { value: "331181", label: "龙泉市" }] }] }, { value: '340000', label: '安徽省', children: [{ value: "340100", label: "合肥市", children: [{ value: "340111", label: "包河区" }, { value: "340104", label: "蜀山区" }, { value: "340103", label: "庐阳区" }, { value: "340102", label: "瑶海区" }, { value: "340171", label: "合肥高新技术产业开发区" }, { value: "340172", label: "合肥经济技术开发区" }, { value: "340173", label: "合肥新站高新技术产业开发区" }, { value: "340121", label: "长丰县" }, { value: "340122", label: "肥东县" }, { value: "340123", label: "肥西县" }, { value: "340124", label: "庐江县" }, { value: "340181", label: "巢湖市" }] }, { value: "340200", label: "芜湖市", children: [{ value: "340202", label: "镜湖区" }, { value: "340203", label: "弋江区" }, { value: "340207", label: "鸠江区" }, { value: "340208", label: "三山区" }, { value: "340221", label: "芜湖县" }, { value: "340222", label: "繁昌县" }, { value: "340223", label: "南陵县" }, { value: "340225", label: "无为县" }, { value: "340272", label: "安徽芜湖长江大桥经济开发区" }, { value: "340271", label: "芜湖经济技术开发区" }] }, { value: "340300", label: "蚌埠市", children: [{ value: "340302", label: "龙子湖区" }, { value: "340303", label: "蚌山区" }, { value: "340304", label: "禹会区" }, { value: "340311", label: "淮上区" }, { value: "340321", label: "怀远县" }, { value: "340322", label: "五河县" }, { value: "340323", label: "固镇县" }, { value: "340371", label: "蚌埠市高新技术开发区" }, { value: "340372	", label: "蚌埠市经济开发区" }] }, { value: "340400", label: "淮南市", children: [{ value: "340402", label: "大通区" }, { value: "340403", label: "田家庵区" }, { value: "340404", label: "谢家集区" }, { value: "340405", label: "八公山区" }, { value: "340406", label: "潘集区" }, { value: "340421", label: "凤台县" }, { value: "340422", label: "寿县" }] }, { value: "340500", label: "马鞍山市", children: [{ value: "340503", label: "花山区" }, { value: "340504", label: "雨山区" }, { value: "340521", label: "当涂县" }, { value: "340506", label: "博望区" }, { value: "340522", label: "含山县" }, { value: "340523", label: "和县" }] }, { value: "340600", label: "淮北市", children: [{ value: "340602", label: "杜集区" }, { value: "340603", label: "相山区" }, { value: "340604", label: "烈山区" }, { value: "340621", label: "濉溪县" }] }, { value: "340700", label: "铜陵市", children: [{ value: "340705", label: "铜官区" }, { value: "340706", label: "义安区" }, { value: "340711", label: "郊区" }, { value: "340722", label: "枞阳县" }] }, { value: "340800", label: "安庆市", children: [{ value: "340802", label: "迎江区" }, { value: "340803", label: "大观区" }, { value: "340811", label: "宜秀区" }, { value: "340822", label: "怀宁县" }, { value: "340824", label: "潜山县" }, { value: "340825", label: "太湖县" }, { value: "340826", label: "宿松县" }, { value: "340827", label: "望江县" }, { value: "340828", label: "岳西县" }, { value: "340881", label: "桐城市" }, { value: "340871", label: "安徽安庆经济开发区" }] }, { value: "341000", label: "黄山市", children: [{ value: "341002", label: "屯溪区" }, { value: "341003", label: "黄山区" }, { value: "341004", label: "徽州区" }, { value: "341021", label: "歙县" }, { value: "341022", label: "休宁县" }, { value: "341023", label: "黟县" }, { value: "341024", label: "祁门县" }] }, { value: "341100", label: "滁州市", children: [{ value: "341102", label: "琅琊区" }, { value: "341103", label: "南谯区" }, { value: "341122", label: "来安县" }, { value: "341124", label: "全椒县" }, { value: "341125", label: "定远县" }, { value: "341126", label: "凤阳县" }, { value: "341181", label: "天长市" }, { value: "341182", label: "明光市" }, { value: "341171", label: "苏滁现代产业园" }, { value: "341172", label: "滁州经济技术开发区" }] }, { value: "341200", label: "阜阳市", children: [{ value: "341202", label: "颍州区" }, { value: "341203", label: "颍东区" }, { value: "341204", label: "颍泉区" }, { value: "341221", label: "临泉县" }, { value: "341222", label: "太和县" }, { value: "341225", label: "阜南县" }, { value: "341226", label: "颍上县" }, { value: "341282", label: "界首市" }, { value: "341272", label: "阜阳经济技术开发区" }, { value: "341271", label: "阜阳合肥现代产业园区" }] }, { value: "341300", label: "宿州市", children: [{ value: "341302", label: "埇桥区" }, { value: "341321", label: "砀山县" }, { value: "341322", label: "萧县" }, { value: "341323", label: "灵璧县" }, { value: "341324", label: "泗县" }, { value: "341371", label: "宿州马鞍山现代产业园区" }, { value: "341372", label: "宿州经济技术开发区" }] }, { value: "341500", label: "六安市", children: [{ value: "341502", label: "金安区" }, { value: "341503", label: "裕安区" }, { value: "341504", label: "叶集区" }, { value: "341522", label: "霍邱县" }, { value: "341523", label: "舒城县" }, { value: "341524", label: "金寨县" }, { value: "341525", label: "霍山县" }] }, { value: "341600", label: "亳州市", children: [{ value: "341602", label: "谯城区" }, { value: "341621", label: "涡阳县" }, { value: "341622", label: "蒙城县" }, { value: "341623", label: "利辛县" }] }, { value: "341700", label: "池州市", children: [{ value: "341702", label: "贵池区" }, { value: "341721", label: "东至县" }, { value: "341722", label: "石台县" }, { value: "341723", label: "青阳县" }] }, { value: "341800", label: "宣城市", children: [{ value: "341802", label: "宣州区" }, { value: "341821", label: "郎溪县" }, { value: "341822", label: "广德县" }, { value: "341823", label: "泾县" }, { value: "341824", label: "绩溪县" }, { value: "341825", label: "旌德县" }, { value: "341881", label: "宁国市" }, { value: "341871", label: "宣城市经济开发区" }] }] }, { value: '350000', label: '福建省', children: [{ value: "350100", label: "福州市", children: [{ value: "350102", label: "鼓楼区" }, { value: "350103", label: "台江区" }, { value: "350104", label: "仓山区" }, { value: "350105", label: "马尾区" }, { value: "350111", label: "晋安区" }, { value: "350121", label: "闽侯县" }, { value: "350122", label: "连江县" }, { value: "350123", label: "罗源县" }, { value: "350124", label: "闽清县" }, { value: "350125", label: "永泰县" }, { value: "350128", label: "平潭县" }, { value: "350181", label: "福清市" }, { value: "350182", label: "长乐市" }] }, { value: "350200", label: "厦门市", children: [{ value: "350203", label: "思明区" }, { value: "350205", label: "海沧区" }, { value: "350206", label: "湖里区" }, { value: "350211", label: "集美区" }, { value: "350212", label: "同安区" }, { value: "350213", label: "翔安区" }] }, { value: "350300", label: "莆田市", children: [{ value: "350302", label: "城厢区" }, { value: "350303", label: "涵江区" }, { value: "350304", label: "荔城区" }, { value: "350305", label: "秀屿区" }, { value: "350322", label: "仙游县" }] }, { value: "350400", label: "三明市", children: [{ value: "350402", label: "梅列区" }, { value: "350403", label: "三元区" }, { value: "350421", label: "明溪县" }, { value: "350423", label: "清流县" }, { value: "350424", label: "宁化县" }, { value: "350425", label: "大田县" }, { value: "350426", label: "尤溪县" }, { value: "350427", label: "沙县" }, { value: "350428", label: "将乐县" }, { value: "350429", label: "泰宁县" }, { value: "350430", label: "建宁县" }, { value: "350481", label: "永安市" }] }, { value: "350500", label: "泉州市", children: [{ value: "350502", label: "鲤城区" }, { value: "350503", label: "丰泽区" }, { value: "350504", label: "洛江区" }, { value: "350505", label: "泉港区" }, { value: "350521", label: "惠安县" }, { value: "350524", label: "安溪县" }, { value: "350525", label: "永春县" }, { value: "350526", label: "德化县" }, { value: "350527", label: "金门县" }, { value: "350581", label: "石狮市" }, { value: "350582", label: "晋江市" }, { value: "350583", label: "南安市" }] }, { value: "350600", label: "漳州市", children: [{ value: "350602", label: "芗城区" }, { value: "350603", label: "龙文区" }, { value: "350622", label: "云霄县" }, { value: "350623", label: "漳浦县" }, { value: "350624", label: "诏安县" }, { value: "350625", label: "长泰县" }, { value: "350626", label: "东山县" }, { value: "350627", label: "南靖县" }, { value: "350628", label: "平和县" }, { value: "350629", label: "华安县" }, { value: "350681", label: "龙海市" }] }, { value: "350700", label: "南平市", children: [{ value: "350702", label: "延平区" }, { value: "350721", label: "顺昌县" }, { value: "350722", label: "浦城县" }, { value: "350723", label: "光泽县" }, { value: "350724", label: "松溪县" }, { value: "350725", label: "政和县" }, { value: "350781", label: "邵武市" }, { value: "350782", label: "武夷山市" }, { value: "350783", label: "建瓯市" }, { value: "350703", label: "建阳区" }] }, { value: "350800", label: "龙岩市", children: [{ value: "350802", label: "新罗区" }, { value: "350821", label: "长汀县" }, { value: "350803", label: "永定区" }, { value: "350823", label: "上杭县" }, { value: "350824", label: "武平县" }, { value: "350825", label: "连城县" }, { value: "350881", label: "漳平市" }] }, { value: "350900", label: "宁德市", children: [{ value: "350902", label: "蕉城区" }, { value: "350921", label: "霞浦县" }, { value: "350922", label: "古田县" }, { value: "350923", label: "屏南县" }, { value: "350924", label: "寿宁县" }, { value: "350925", label: "周宁县" }, { value: "350926", label: "柘荣县" }, { value: "350981", label: "福安市" }, { value: "350982", label: "福鼎市" }] }] }, { value: '360000', label: '江西省', children: [{ value: "360100", label: "南昌市", children: [{ value: "360102", label: "东湖区" }, { value: "360103", label: "西湖区" }, { value: "360104", label: "青云谱区" }, { value: "360105", label: "湾里区" }, { value: "360111", label: "青山湖区" }, { value: "360121", label: "南昌县" }, { value: "360112", label: "新建区" }, { value: "360123", label: "安义县" }, { value: "360124", label: "进贤县" }] }, { value: "360200", label: "景德镇市", children: [{ value: "360202", label: "昌江区" }, { value: "360203", label: "珠山区" }, { value: "360222", label: "浮梁县" }, { value: "360281", label: "乐平市" }] }, { value: "360300", label: "萍乡市", children: [{ value: "360302", label: "安源区" }, { value: "360313", label: "湘东区" }, { value: "360321", label: "莲花县" }, { value: "360322", label: "上栗县" }, { value: "360323", label: "芦溪县" }] }, { value: "360400", label: "九江市", children: [{ value: "360402", label: "濂溪区" }, { value: "360403", label: "浔阳区" }, { value: "360404", label: "柴桑区" }, { value: "360423", label: "武宁县" }, { value: "360424", label: "修水县" }, { value: "360425", label: "永修县" }, { value: "360426", label: "德安县" }, { value: "360428", label: "都昌县" }, { value: "360429", label: "湖口县" }, { value: "360430", label: "彭泽县" }, { value: "360481", label: "瑞昌市" }, { value: "360482", label: "共青城市" }, { value: "360483", label: "庐山市" }] }, { value: "360500", label: "新余市", children: [{ value: "360502", label: "渝水区" }, { value: "360521", label: "分宜县" }] }, { value: "360600", label: "鹰潭市", children: [{ value: "360602", label: "月湖区" }, { value: "360622", label: "余江县" }, { value: "360681", label: "贵溪市" }] }, { value: "360700", label: "赣州市", children: [{ value: "360702", label: "章贡区" }, { value: "360704", label: "赣县区" }, { value: "360722", label: "信丰县" }, { value: "360723", label: "大余县" }, { value: "360724", label: "上犹县" }, { value: "360725", label: "崇义县" }, { value: "360726", label: "安远县" }, { value: "360727", label: "龙南县" }, { value: "360728", label: "定南县" }, { value: "360729", label: "全南县" }, { value: "360730", label: "宁都县" }, { value: "360731", label: "于都县" }, { value: "360732", label: "兴国县" }, { value: "360733", label: "会昌县" }, { value: "360734", label: "寻乌县" }, { value: "360735", label: "石城县" }, { value: "360781", label: "瑞金市" }, { value: "360703", label: "南康区" }] }, { value: "360800", label: "吉安市", children: [{ value: "360802", label: "吉州区" }, { value: "360803", label: "青原区" }, { value: "360821", label: "吉安县" }, { value: "360822", label: "吉水县" }, { value: "360823", label: "峡江县" }, { value: "360824", label: "新干县" }, { value: "360825", label: "永丰县" }, { value: "360826", label: "泰和县" }, { value: "360827", label: "遂川县" }, { value: "360828", label: "万安县" }, { value: "360829", label: "安福县" }, { value: "360830", label: "永新县" }, { value: "360881", label: "井冈山市" }] }, { value: "360900", label: "宜春市", children: [{ value: "360902", label: "袁州区" }, { value: "360921", label: "奉新县" }, { value: "360922", label: "万载县" }, { value: "360923", label: "上高县" }, { value: "360924", label: "宜丰县" }, { value: "360925", label: "靖安县" }, { value: "360926", label: "铜鼓县" }, { value: "360981", label: "丰城市" }, { value: "360982", label: "樟树市" }, { value: "360983", label: "高安市" }] }, { value: "361000", label: "抚州市", children: [{ value: "361002", label: "临川区" }, { value: "361021", label: "南城县" }, { value: "361022", label: "黎川县" }, { value: "361023", label: "南丰县" }, { value: "361024", label: "崇仁县" }, { value: "361025", label: "乐安县" }, { value: "361026", label: "宜黄县" }, { value: "361027", label: "金溪县" }, { value: "361028", label: "资溪县" }, { value: "361003", label: "东乡区" }, { value: "361030", label: "广昌县" }] }, { value: "361100", label: "上饶市", children: [{ value: "361102", label: "信州区" }, { value: "361121", label: "上饶县" }, { value: "361103", label: "广丰区" }, { value: "361123", label: "玉山县" }, { value: "361124", label: "铅山县" }, { value: "361125", label: "横峰县" }, { value: "361126", label: "弋阳县" }, { value: "361127", label: "余干县" }, { value: "361128", label: "鄱阳县" }, { value: "361129", label: "万年县" }, { value: "361130", label: "婺源县" }, { value: "361181", label: "德兴市" }] }] }, { value: '370000', label: '山东省', children: [{ value: "370100", label: "济南市", children: [{ value: "370102", label: "历下区" }, { value: "370103", label: "市中区" }, { value: "370104", label: "槐荫区" }, { value: "370105", label: "天桥区" }, { value: "370112", label: "历城区" }, { value: "370113", label: "长清区" }, { value: "370124", label: "平阴县" }, { value: "370125", label: "济阳县" }, { value: "370126", label: "商河县" }, { value: "370114", label: "章丘区" }, { value: "370171", label: "济南高新技术产业开发区" }] }, { value: "370200", label: "青岛市", children: [{ value: "370202", label: "市南区" }, { value: "370203", label: "市北区" }, { value: "370211", label: "黄岛区" }, { value: "370212", label: "崂山区" }, { value: "370213", label: "李沧区" }, { value: "370214", label: "城阳区" }, { value: "370281", label: "胶州市" }, { value: "370215", label: "即墨区" }, { value: "370283", label: "平度市" }, { value: "370285", label: "莱西市" }, { value: "370271", label: "青岛高新技术产业开发区" }] }, { value: "370300", label: "淄博市", children: [{ value: "370302", label: "淄川区" }, { value: "370303", label: "张店区" }, { value: "370304", label: "博山区" }, { value: "370305", label: "临淄区" }, { value: "370306", label: "周村区" }, { value: "370321", label: "桓台县" }, { value: "370322", label: "高青县" }, { value: "370323", label: "沂源县" }] }, { value: "370400", label: "枣庄市", children: [{ value: "370402", label: "市中区" }, { value: "370403", label: "薛城区" }, { value: "370404", label: "峄城区" }, { value: "370405", label: "台儿庄区" }, { value: "370406", label: "山亭区" }, { value: "370481", label: "滕州市" }] }, { value: "370500", label: "东营市", children: [{ value: "370502", label: "东营区" }, { value: "370503", label: "河口区" }, { value: "370521", label: "垦利县" }, { value: "370522", label: "利津县" }, { value: "370523", label: "广饶县" }, { value: "370589", label: "西城区" }, { value: "370571", label: "东营经济技术开发区" }, { value: "370572", label: "东营港经济开发区" }] }, { value: "370600", label: "烟台市", children: [{ value: "370602", label: "芝罘区" }, { value: "370611", label: "福山区" }, { value: "370612", label: "牟平区" }, { value: "370613", label: "莱山区" }, { value: "370634", label: "长岛县" }, { value: "370681", label: "龙口市" }, { value: "370682", label: "莱阳市" }, { value: "370683", label: "莱州市" }, { value: "370684", label: "蓬莱市" }, { value: "370685", label: "招远市" }, { value: "370686", label: "栖霞市" }, { value: "370687", label: "海阳市" }, { value: "370671", label: "烟台高新技术产业开发区" }, { value: "370672", label: "烟台经济技术开发区" }] }, { value: "370700", label: "潍坊市", children: [{ value: "370702", label: "潍城区" }, { value: "370703", label: "寒亭区" }, { value: "370704", label: "坊子区" }, { value: "370705", label: "奎文区" }, { value: "370724", label: "临朐县" }, { value: "370725", label: "昌乐县" }, { value: "370772", label: "潍坊滨海经济技术开发区" }, { value: "370781", label: "青州市" }, { value: "370782", label: "诸城市" }, { value: "370783", label: "寿光市" }, { value: "370784", label: "安丘市" }, { value: "370785", label: "高密市" }, { value: "370786", label: "昌邑市" }] }, { value: "370800", label: "济宁市", children: [{ value: "370811", label: "任城区" }, { value: "370826", label: "微山县" }, { value: "370827", label: "鱼台县" }, { value: "370828", label: "金乡县" }, { value: "370829", label: "嘉祥县" }, { value: "370830", label: "汶上县" }, { value: "370831", label: "泗水县" }, { value: "370832", label: "梁山县" }, { value: "370881", label: "曲阜市" }, { value: "370812", label: "兖州区" }, { value: "370883", label: "邹城市" }, { value: "370871", label: "济宁高新技术产业开发区" }] }, { value: "370900", label: "泰安市", children: [{ value: "370902", label: "泰山区" }, { value: "370903", label: "岱岳区" }, { value: "370921", label: "宁阳县" }, { value: "370923", label: "东平县" }, { value: "370982", label: "新泰市" }, { value: "370983", label: "肥城市" }] }, { value: "371000", label: "威海市", children: [{ value: "371002", label: "环翠区" }, { value: "371003", label: "文登区" }, { value: "371082", label: "荣成市" }, { value: "371083", label: "乳山市" }, { value: "371071", label: "威海火炬高技术产业开发区" }, { value: "371072", label: "威海经济技术开发区" }, { value: "371073", label: "威海临港经济技术开发区" }] }, { value: "371100", label: "日照市", children: [{ value: "371102", label: "东港区" }, { value: "371103", label: "岚山区" }, { value: "371121", label: "五莲县" }, { value: "371122", label: "莒县" }, { value: "371171", label: "日照经济技术开发区" }, { value: "371172", label: "日照国际海洋城" }] }, { value: "371200", label: "莱芜市", children: [{ value: "371202", label: "莱城区" }, { value: "371203", label: "钢城区" }] }, { value: "371300", label: "临沂市", children: [{ value: "371302", label: "兰山区" }, { value: "371311", label: "罗庄区" }, { value: "371312", label: "河东区" }, { value: "371321", label: "沂南县" }, { value: "371322", label: "郯城县" }, { value: "371323", label: "沂水县" }, { value: "371324", label: "兰陵县" }, { value: "371325", label: "费县" }, { value: "371326", label: "平邑县" }, { value: "371327", label: "莒南县" }, { value: "371328", label: "蒙阴县" }, { value: "371329", label: "临沭县" }, { value: "371371", label: "临沂高新技术产业开发区" }, { value: "371373", label: "临沂临港经济开发区" }, { value: "371372", label: "临沂经济技术开发区" }] }, { value: "371400", label: "德州市", children: [{ value: "371402", label: "德城区" }, { value: "371403", label: "陵城区" }, { value: "371422", label: "宁津县" }, { value: "371423", label: "庆云县" }, { value: "371424", label: "临邑县" }, { value: "371425", label: "齐河县" }, { value: "371426", label: "平原县" }, { value: "371427", label: "夏津县" }, { value: "371428", label: "武城县" }, { value: "371481", label: "乐陵市" }, { value: "371482", label: "禹城市" }, { value: "371471", label: "德州经济技术开发区" }, { value: "371472", label: "德州运河经济开发区" }] }, { value: "371500", label: "聊城市", children: [{ value: "371502", label: "东昌府区" }, { value: "371521", label: "阳谷县" }, { value: "371522", label: "莘县" }, { value: "371523", label: "茌平县" }, { value: "371524", label: "东阿县" }, { value: "371525", label: "冠县" }, { value: "371526", label: "高唐县" }, { value: "371581", label: "临清市" }] }, { value: "371600", label: "滨州市", children: [{ value: "371602", label: "滨城区" }, { value: "371621", label: "惠民县" }, { value: "371622", label: "阳信县" }, { value: "371623", label: "无棣县" }, { value: "371603", label: "沾化区" }, { value: "371625", label: "博兴县" }, { value: "371626", label: "邹平县" }] }, { value: "371700", label: "菏泽市", children: [{ value: "371702", label: "牡丹区" }, { value: "371721", label: "曹县" }, { value: "371722", label: "单县" }, { value: "371723", label: "成武县" }, { value: "371724", label: "巨野县" }, { value: "371725", label: "郓城县" }, { value: "371726", label: "鄄城县" }, { value: "371727", label: "定陶区" }, { value: "371728", label: "东明县" }, { value: "371771", label: "菏泽经济技术开发区" }, { value: "371772", label: "菏泽高新技术开发区" }] }] }, { value: '410000', label: '河南省', children: [{ value: "410100", label: "郑州市", children: [{ value: "410102", label: "中原区" }, { value: "410103", label: "二七区" }, { value: "410104", label: "管城回族区" }, { value: "410105", label: "金水区" }, { value: "410106", label: "上街区" }, { value: "410108", label: "惠济区" }, { value: "410122", label: "中牟县" }, { value: "410181", label: "巩义市" }, { value: "410182", label: "荥阳市" }, { value: "410183", label: "新密市" }, { value: "410184", label: "新郑市" }, { value: "410185", label: "登封市" }, { value: "410171", label: "郑州经济技术开发区" }, { value: "410172", label: "郑州高新技术产业开发区" }, { value: "410173", label: "郑州航空港经济综合实验区" }] }, { value: "410200", label: "开封市", children: [{ value: "410202", label: "龙亭区" }, { value: "410203", label: "顺河回族区" }, { value: "410204", label: "鼓楼区" }, { value: "410205", label: "禹王台区" }, { value: "410211", label: "金明区" }, { value: "410221", label: "杞县" }, { value: "410222", label: "通许县" }, { value: "410223", label: "尉氏县" }, { value: "410225", label: "兰考县" }, { value: "410212", label: "祥符区" }] }, { value: "410300", label: "洛阳市", children: [{ value: "410302", label: "老城区" }, { value: "410303", label: "西工区" }, { value: "410304", label: "廛河回族区" }, { value: "410305", label: "涧西区" }, { value: "410306", label: "吉利区" }, { value: "410307", label: "洛龙区" }, { value: "410322", label: "孟津县" }, { value: "410323", label: "新安县" }, { value: "410324", label: "栾川县" }, { value: "410325", label: "嵩县" }, { value: "410326", label: "汝阳县" }, { value: "410327", label: "宜阳县" }, { value: "410328", label: "洛宁县" }, { value: "410329", label: "伊川县" }, { value: "410381", label: "偃师市" }, { value: "410371", label: "洛阳高新技术产业开发区" }, { value: "471005", label: "其它区" }] }, { value: "410400", label: "平顶山市", children: [{ value: "410402", label: "新华区" }, { value: "410403", label: "卫东区" }, { value: "410404", label: "石龙区" }, { value: "410411", label: "湛河区" }, { value: "410421", label: "宝丰县" }, { value: "410422", label: "叶县" }, { value: "410423", label: "鲁山县" }, { value: "410425", label: "郏县" }, { value: "410481", label: "舞钢市" }, { value: "410482", label: "汝州市" }, { value: "410471", label: "平顶山高新技术产业开发区" }, { value: "410472", label: "平顶山市新城区" }] }, { value: "410500", label: "安阳市", children: [{ value: "410502", label: "文峰区" }, { value: "410503", label: "北关区" }, { value: "410505", label: "殷都区" }, { value: "410506", label: "龙安区" }, { value: "410522", label: "安阳县" }, { value: "410523", label: "汤阴县" }, { value: "410526", label: "滑县" }, { value: "410527", label: "内黄县" }, { value: "410581", label: "林州市" }, { value: "410571", label: "安阳高新技术产业开发区" }] }, { value: "410600", label: "鹤壁市", children: [{ value: "410602", label: "鹤山区" }, { value: "410603", label: "山城区" }, { value: "410611", label: "淇滨区" }, { value: "410621", label: "浚县" }, { value: "410622", label: "淇县" }, { value: "410671", label: "鹤壁经济技术开发区" }] }, { value: "410700", label: "新乡市", children: [{ value: "410702", label: "红旗区" }, { value: "410703", label: "卫滨区" }, { value: "410704", label: "凤泉区" }, { value: "410711", label: "牧野区" }, { value: "410721", label: "新乡县" }, { value: "410724", label: "获嘉县" }, { value: "410725", label: "原阳县" }, { value: "410726", label: "延津县" }, { value: "410727", label: "封丘县" }, { value: "410728", label: "长垣县" }, { value: "410781", label: "卫辉市" }, { value: "410782", label: "辉县市" }, { value: "410771", label: "新乡高新技术产业开发区" }, { value: "410773", label: "新乡市平原城乡一体化示范区" }, { value: "410772", label: "新乡经济技术开发区" }] }, { value: "410800", label: "焦作市", children: [{ value: "410802", label: "解放区" }, { value: "410803", label: "中站区" }, { value: "410804", label: "马村区" }, { value: "410811", label: "山阳区" }, { value: "410821", label: "修武县" }, { value: "410822", label: "博爱县" }, { value: "410823", label: "武陟县" }, { value: "410825", label: "温县" }, { value: "410882", label: "沁阳市" }, { value: "410883", label: "孟州市" }, { value: "410871", label: "焦作城乡一体化示范区" }] }, { value: "410900", label: "濮阳市", children: [{ value: "410902", label: "华龙区" }, { value: "410922", label: "清丰县" }, { value: "410923", label: "南乐县" }, { value: "410926", label: "范县" }, { value: "410927", label: "台前县" }, { value: "410928", label: "濮阳县" }, { value: "410971", label: "河南濮阳工业园区" }, { value: "410972", label: "濮阳经济技术开发区" }] }, { value: "411000", label: "许昌市", children: [{ value: "411002", label: "魏都区" }, { value: "411003", label: "建安区" }, { value: "411024", label: "鄢陵县" }, { value: "411025", label: "襄城县" }, { value: "411081", label: "禹州市" }, { value: "411082", label: "长葛市" }, { value: "411071", label: "许昌经济技术开发区" }] }, { value: "411100", label: "漯河市", children: [{ value: "411102", label: "源汇区" }, { value: "411103", label: "郾城区" }, { value: "411104", label: "召陵区" }, { value: "411121", label: "舞阳县" }, { value: "411122", label: "临颍县" }, { value: "411171", label: "漯河经济技术开发区" }] }, { value: "411200", label: "三门峡市", children: [{ value: "411202", label: "湖滨区" }, { value: "411221", label: "渑池县" }, { value: "411222", label: "陕县" }, { value: "411224", label: "卢氏县" }, { value: "411281", label: "义马市" }, { value: "411282", label: "灵宝市" }, { value: "411203", label: "陕州区" }, { value: "411271", label: "河南三门峡经济开发区" }] }, { value: "411300", label: "南阳市", children: [{ value: "411302", label: "宛城区" }, { value: "411303", label: "卧龙区" }, { value: "411321", label: "南召县" }, { value: "411322", label: "方城县" }, { value: "411323", label: "西峡县" }, { value: "411324", label: "镇平县" }, { value: "411325", label: "内乡县" }, { value: "411326", label: "淅川县" }, { value: "411327", label: "社旗县" }, { value: "411328", label: "唐河县" }, { value: "411329", label: "新野县" }, { value: "411330", label: "桐柏县" }, { value: "411381", label: "邓州市" }, { value: "411371", label: "南阳高新技术产业开发区" }, { value: "411372", label: "南阳市城乡一体化示范区" }] }, { value: "411400", label: "商丘市", children: [{ value: "411402", label: "梁园区" }, { value: "411403", label: "睢阳区" }, { value: "411421", label: "民权县" }, { value: "411422", label: "睢县" }, { value: "411423", label: "宁陵县" }, { value: "411424", label: "柘城县" }, { value: "411425", label: "虞城县" }, { value: "411426", label: "夏邑县" }, { value: "411481", label: "永城市" }, { value: "411471", label: "豫东综合物流产业聚集区" }, { value: "411472", label: "河南商丘经济开发" }] }, { value: "411500", label: "信阳市", children: [{ value: "411502", label: "浉河区" }, { value: "411503", label: "平桥区" }, { value: "411521", label: "罗山县" }, { value: "411522", label: "光山县" }, { value: "411523", label: "新县" }, { value: "411524", label: "商城县" }, { value: "411525", label: "固始县" }, { value: "411526", label: "潢川县" }, { value: "411527", label: "淮滨县" }, { value: "411528", label: "息县" }, { value: "411571", label: "信阳高新技术产业开发区" }] }, { value: "411600", label: "周口市", children: [{ value: "411602", label: "川汇区" }, { value: "411621", label: "扶沟县" }, { value: "411622", label: "西华县" }, { value: "411623", label: "商水县" }, { value: "411624", label: "沈丘县" }, { value: "411625", label: "郸城县" }, { value: "411626", label: "淮阳县" }, { value: "411627", label: "太康县" }, { value: "411628", label: "鹿邑县" }, { value: "411681", label: "项城市" }, { value: "411671", label: "河南周口经济开发区" }] }, { value: "411700", label: "驻马店市", children: [{ value: "411702", label: "驿城区" }, { value: "411721", label: "西平县" }, { value: "411722", label: "上蔡县" }, { value: "411723", label: "平舆县" }, { value: "411724", label: "正阳县" }, { value: "411725", label: "确山县" }, { value: "411726", label: "泌阳县" }, { value: "411727", label: "汝南县" }, { value: "411628", label: "遂平县" }, { value: "411729", label: "新蔡县" }, { value: "411771", label: "河南驻马店经济开发区" }] }] }, { value: '420000', label: '湖北省', children: [{ value: "420100", label: "武汉市", children: [{ value: "420101", label: "市辖区" }, { value: "420102", label: "江岸区" }, { value: "420103", label: "江汉区" }, { value: "420104", label: "硚口区" }, { value: "420105", label: "汉阳区" }, { value: "420106", label: "武昌区" }, { value: "420107", label: "青山区" }, { value: "420111", label: "洪山区" }, { value: "420112", label: "东西湖区" }, { value: "420113", label: "汉南区" }, { value: "420114", label: "蔡甸区" }, { value: "420115", label: "江夏区" }, { value: "420116", label: "黄陂区" }, { value: "420117", label: "新洲区" }] }, { value: "420200", label: "黄石市", children: [{ value: "420201", label: "市辖区" }, { value: "420202", label: "黄石港区" }, { value: "420203", label: "西塞山区" }, { value: "420204", label: "下陆区" }, { value: "420205", label: "铁山区" }, { value: "420222", label: "阳新县" }, { value: "420281", label: "大冶市" }] }, { value: "420300", label: "十堰市", children: [{ value: "420301", label: "市辖区" }, { value: "420302", label: "茅箭区" }, { value: "420303", label: "张湾区" }, { value: "420304", label: "郧阳区" }, { value: "420322", label: "郧西县" }, { value: "420323", label: "竹山县" }, { value: "420324", label: "竹溪县" }, { value: "420325", label: "房县" }, { value: "420381", label: "丹江口市" }] }, { value: "420500", label: "宜昌市", children: [{ value: "420501", label: "市辖区" }, { value: "420502", label: "西陵区" }, { value: "420503", label: "伍家岗区" }, { value: "420504", label: "点军区" }, { value: "420505", label: "猇亭区" }, { value: "420506", label: "夷陵区" }, { value: "420525", label: "远安县" }, { value: "420526", label: "兴山县" }, { value: "420527", label: "秭归县" }, { value: "420528", label: "长阳土家族自治县" }, { value: "420529", label: "五峰土家族自治县" }, { value: "420581", label: "宜都市" }, { value: "420582", label: "当阳市" }, { value: "420583", label: "枝江市" }] }, { value: "420600", label: "襄阳市", children: [{ value: "420601", label: "市辖区" }, { value: "420602", label: "襄城区" }, { value: "420606", label: "樊城区" }, { value: "420607", label: "襄州区" }, { value: "420624", label: "南漳县" }, { value: "420625", label: "谷城县" }, { value: "420626", label: "保康县" }, { value: "420682", label: "老河口市" }, { value: "420683", label: "枣阳市" }, { value: "420684", label: "宜城市" }] }, { value: "420700", label: "鄂州市", children: [{ value: "420701", label: "市辖区" }, { value: "420702", label: "梁子湖区" }, { value: "420703", label: "华容区" }, { value: "420704", label: "鄂城区" }] }, { value: "420800", label: "荆门市", children: [{ value: "420801", label: "市辖区" }, { value: "420802", label: "东宝区" }, { value: "420804", label: "掇刀区" }, { value: "420821", label: "京山县" }, { value: "420822", label: "沙洋县" }, { value: "420881", label: "钟祥市" }] }, { value: "420900", label: "孝感市", children: [{ value: "420901", label: "市辖区" }, { value: "420902", label: "孝南区" }, { value: "420921", label: "孝昌县" }, { value: "420922", label: "大悟县" }, { value: "420923", label: "云梦县" }, { value: "420981", label: "应城市" }, { value: "420982", label: "安陆市" }, { value: "420984", label: "汉川市" }] }, { value: "421000", label: "荆州市", children: [{ value: "421001", label: "市辖区" }, { value: "421002", label: "沙市区" }, { value: "421003", label: "荆州区" }, { value: "421022", label: "公安县" }, { value: "421023", label: "监利县" }, { value: "421024", label: "江陵县" }, { value: "421071", label: "荆州经济技术开发区" }, { value: "421081", label: "石首市" }, { value: "421083", label: "洪湖市" }, { value: "421087", label: "松滋市" }] }, { value: "421100", label: "黄冈市", children: [{ value: "421101", label: "市辖区" }, { value: "421102", label: "黄州区" }, { value: "421121", label: "团风县" }, { value: "421122", label: "红安县" }, { value: "421123", label: "罗田县" }, { value: "421124", label: "英山县" }, { value: "421125", label: "浠水县" }, { value: "421126", label: "蕲春县" }, { value: "421127", label: "黄梅县" }, { value: "421171", label: "龙感湖管理区" }, { value: "421181", label: "麻城市" }, { value: "421182", label: "武穴市" }] }, { value: "421200", label: "咸宁市", children: [{ value: "421201", label: "市辖区" }, { value: "421202", label: "咸安区" }, { value: "421221", label: "嘉鱼县" }, { value: "421222", label: "通城县" }, { value: "421223", label: "崇阳县" }, { value: "421224", label: "通山县" }, { value: "421281", label: "赤壁市" }] }, { value: "421300", label: "随州市", children: [{ value: "421301", label: "市辖区" }, { value: "421303", label: "曾都区" }, { value: "421321", label: "随县" }, { value: "421381", label: "广水市" }] }, { value: "422800", label: "恩施土家族苗族自治州", children: [{ value: "422801", label: "恩施市" }, { value: "422802", label: "利川市" }, { value: "422822", label: "建始县" }, { value: "422823", label: "巴东县" }, { value: "422825", label: "宣恩县" }, { value: "422826", label: "咸丰县" }, { value: "422827", label: "来凤县" }, { value: "422828", label: "鹤峰县" }] }, { value: "429000", label: "省直辖县级行政区划", children: [{ value: "429004", label: "仙桃市" }, { value: "429005", label: "潜江市" }, { value: "429006", label: "天门市" }, { value: "429021", label: "神农架林区" }] }] }, { value: '430000', label: '湖南省', children: [{ value: "430100", label: "长沙市", children: [{ value: "430101", label: "市辖区" }, { value: "430102", label: "芙蓉区" }, { value: "430103", label: "天心区" }, { value: "430104", label: "岳麓区" }, { value: "430105", label: "开福区" }, { value: "430111", label: "雨花区" }, { value: "430112", label: "望城区" }, { value: "430121", label: "长沙县" }, { value: "430181", label: "浏阳市" }, { value: "430182", label: "宁乡市" }] }, { value: "430200", label: "株洲市", children: [{ value: "430201", label: "市辖区" }, { value: "430202", label: "荷塘区" }, { value: "430203", label: "芦淞区" }, { value: "430204", label: "石峰区" }, { value: "430211", label: "天元区" }, { value: "430221", label: "株洲县" }, { value: "430223", label: "攸县" }, { value: "430224", label: "茶陵县" }, { value: "430225", label: "炎陵县" }, { value: "430271", label: "云龙示范区" }, { value: "430281", label: "醴陵市" }] }, { value: "430300", label: "湘潭市", children: [{ value: "430301", label: "市辖区" }, { value: "430302", label: "雨湖区" }, { value: "430304", label: "岳塘区" }, { value: "430321", label: "湘潭县" }, { value: "430371", label: "湖南湘潭高新技术产业园区" }, { value: "430372", label: "湘潭昭山示范区" }, { value: "430373", label: "湘潭九华示范区" }, { value: "430381", label: "湘乡市" }, { value: "430382", label: "韶山市" }] }, { value: "430400", label: "衡阳市", children: [{ value: "430401", label: "市辖区" }, { value: "430405", label: "珠晖区" }, { value: "430406", label: "雁峰区" }, { value: "430407", label: "石鼓区" }, { value: "430408", label: "蒸湘区" }, { value: "430412", label: "南岳区" }, { value: "430421", label: "衡阳县" }, { value: "430422", label: "衡南县" }, { value: "430423", label: "衡山县" }, { value: "430424", label: "衡东县" }, { value: "430426", label: "祁东县" }, { value: "430471", label: "衡阳综合保税区" }, { value: "430472", label: "湖南衡阳高新技术产业园区" }, { value: "430473", label: "湖南衡阳松木经济开发区" }, { value: "430481", label: "耒阳市" }, { value: "430482", label: "常宁市" }] }, { value: "430500", label: "邵阳市", children: [{ value: "430501", label: "市辖区" }, { value: "430502", label: "双清区" }, { value: "430503", label: "大祥区" }, { value: "430511", label: "北塔区" }, { value: "430521", label: "邵东县" }, { value: "430522", label: "新邵县" }, { value: "430523", label: "邵阳县" }, { value: "430524", label: "隆回县" }, { value: "430525", label: "洞口县" }, { value: "430527", label: "绥宁县" }, { value: "430528", label: "新宁县" }, { value: "430529", label: "城步苗族自治县" }, { value: "430581", label: "武冈市" }] }, { value: "430600", label: "岳阳市", children: [{ value: "430601", label: "市辖区" }, { value: "430602", label: "岳阳楼区" }, { value: "430603", label: "云溪区" }, { value: "430611", label: "君山区" }, { value: "430621", label: "岳阳县" }, { value: "430623", label: "华容县" }, { value: "430624", label: "湘阴县" }, { value: "430626", label: "平江县" }, { value: "430671", label: "岳阳市屈原管理区" }, { value: "430681", label: "汨罗市" }, { value: "430682", label: "临湘市" }] }, { value: "430700", label: "常德市", children: [{ value: "430701", label: "市辖区" }, { value: "430702", label: "武陵区" }, { value: "430703", label: "鼎城区" }, { value: "430721", label: "安乡县" }, { value: "430722", label: "汉寿县" }, { value: "430723", label: "澧县" }, { value: "430724", label: "临澧县" }, { value: "430725", label: "桃源县" }, { value: "430726", label: "石门县" }, { value: "430771", label: "常德市西洞庭管理区" }, { value: "430781", label: "津市市" }] }, { value: "430800", label: "张家界市", children: [{ value: "430801", label: "市辖区" }, { value: "430802", label: "永定区" }, { value: "430811", label: "武陵源区" }, { value: "430821", label: "慈利县" }, { value: "430822", label: "桑植县" }] }, { value: "430900", label: "益阳市", children: [{ value: "430901", label: "市辖区" }, { value: "430902", label: "资阳区" }, { value: "430903", label: "赫山区" }, { value: "430921", label: "南县" }, { value: "430922", label: "桃江县" }, { value: "430923", label: "安化县" }, { value: "430971", label: "益阳市大通湖管理区" }, { value: "430972", label: "湖南益阳高新技术产业园区" }, { value: "430981", label: "沅江市" }] }, { value: "431000", label: "郴州市", children: [{ value: "431001", label: "市辖区" }, { value: "431002", label: "北湖区" }, { value: "431003", label: "苏仙区" }, { value: "431021", label: "桂阳县" }, { value: "431022", label: "宜章县" }, { value: "431023", label: "永兴县" }, { value: "431024", label: "嘉禾县" }, { value: "431025", label: "临武县" }, { value: "431026", label: "汝城县" }, { value: "431027", label: "桂东县" }, { value: "431028", label: "安仁县" }, { value: "431081", label: "资兴市" }] }, { value: "431100", label: "永州市", children: [{ value: "431101", label: "市辖区" }, { value: "431102", label: "零陵区" }, { value: "431103", label: "冷水滩区" }, { value: "431121", label: "祁阳县" }, { value: "431122", label: "东安县" }, { value: "431123", label: "双牌县" }, { value: "431124", label: "道县" }, { value: "431125", label: "江永县" }, { value: "431126", label: "宁远县" }, { value: "431127", label: "蓝山县" }, { value: "431128", label: "新田县" }, { value: "431129", label: "江华瑶族自治县" }, { value: "431171", label: "永州经济技术开发区" }, { value: "431172", label: "永州市金洞管理区" }, { value: "431173", label: "永州市回龙圩管理区" }] }, { value: "431200", label: "怀化市", children: [{ value: "431201", label: "市辖区" }, { value: "431202", label: "鹤城区" }, { value: "431221", label: "中方县" }, { value: "431222", label: "沅陵县" }, { value: "431223", label: "辰溪县" }, { value: "431224", label: "溆浦县" }, { value: "431225", label: "会同县" }, { value: "431226", label: "麻阳苗族自治县" }, { value: "431227", label: "新晃侗族自治县" }, { value: "431228", label: "芷江侗族自治县" }, { value: "431229", label: "靖州苗族侗族自治县" }, { value: "431230", label: "通道侗族自治县" }, { value: "431271", label: "怀化市洪江管理区" }, { value: "431281", label: "洪江市" }] }, { value: "431300", label: "娄底市", children: [{ value: "431301", label: "市辖区" }, { value: "431302", label: "娄星区" }, { value: "431321", label: "双峰县" }, { value: "431322", label: "新化县" }, { value: "431381", label: "冷水江市" }, { value: "431382", label: "涟源市" }] }, { value: "433100", label: "湘西土家族苗族自治州", children: [{ value: "433101", label: "吉首市" }, { value: "433122", label: "泸溪县" }, { value: "433123", label: "凤凰县" }, { value: "433124", label: "花垣县" }, { value: "433125", label: "保靖县" }, { value: "433126", label: "古丈县" }, { value: "433127", label: "永顺县" }, { value: "433130", label: "龙山县" }, { value: "433172", label: "湖南吉首经济开发区" }, { value: "433173", label: "湖南永顺经济开发区" }] }] }, { value: '440000', label: '广东省', children: [{ value: "440100", label: "广州市", children: [{ value: "440101", label: "市辖区" }, { value: "440103", label: "荔湾区" }, { value: "440104", label: "越秀区" }, { value: "440105", label: "海珠区" }, { value: "440106", label: "天河区" }, { value: "440111", label: "白云区" }, { value: "440112", label: "黄埔区" }, { value: "440113", label: "番禺区" }, { value: "440114", label: "花都区" }, { value: "440115", label: "南沙区" }, { value: "440117", label: "从化区" }, { value: "440118", label: "增城区" }] }, { value: "440200", label: "韶关市", children: [{ value: "440201", label: "市辖区" }, { value: "440203", label: "武江区" }, { value: "440204", label: "浈江区" }, { value: "440205", label: "曲江区" }, { value: "440222", label: "始兴县" }, { value: "440224", label: "仁化县" }, { value: "440229", label: "翁源县" }, { value: "440232", label: "乳源瑶族自治县" }, { value: "440233", label: "新丰县" }, { value: "440281", label: "乐昌市" }, { value: "440282", label: "南雄市" }] }, { value: "440300", label: "深圳市", children: [{ value: "440301", label: "市辖区" }, { value: "440303", label: "罗湖区" }, { value: "440304", label: "福田区" }, { value: "440305", label: "南山区" }, { value: "440306", label: "宝安区" }, { value: "440307", label: "龙岗区" }, { value: "440308", label: "盐田区" }, { value: "440309", label: "龙华区" }, { value: "440310", label: "坪山区" }] }, { value: "440400", label: "珠海市", children: [{ value: "440401", label: "市辖区" }, { value: "440402", label: "香洲区" }, { value: "440403", label: "斗门区" }, { value: "440404", label: "金湾区" }] }, { value: "440500", label: "汕头市", children: [{ value: "440501", label: "市辖区" }, { value: "440507", label: "龙湖区" }, { value: "440511", label: "金平区" }, { value: "440512", label: "濠江区" }, { value: "440513", label: "潮阳区" }, { value: "440514", label: "潮南区" }, { value: "440515", label: "澄海区" }, { value: "440523", label: "南澳县" }] }, { value: "440600", label: "佛山市", children: [{ value: "440601", label: "市辖区" }, { value: "440604", label: "禅城区" }, { value: "440605", label: "南海区" }, { value: "440606", label: "顺德区" }, { value: "440607", label: "三水区" }, { value: "440608", label: "高明区" }] }, { value: "440700", label: "江门市", children: [{ value: "440701", label: "市辖区" }, { value: "440703", label: "蓬江区" }, { value: "440704", label: "江海区" }, { value: "440705", label: "新会区" }, { value: "440781", label: "台山市" }, { value: "440783", label: "开平市" }, { value: "440784", label: "鹤山市" }, { value: "440785", label: "恩平市" }] }, { value: "440800", label: "湛江市", children: [{ value: "440801", label: "市辖区" }, { value: "440802", label: "赤坎区" }, { value: "440803", label: "霞山区" }, { value: "440804", label: "坡头区" }, { value: "440811", label: "麻章区" }, { value: "440823", label: "遂溪县" }, { value: "440825", label: "徐闻县" }, { value: "440881", label: "廉江市" }, { value: "440882", label: "雷州市" }, { value: "440883", label: "吴川市" }] }, { value: "440900", label: "茂名市", children: [{ value: "440901", label: "市辖区" }, { value: "440902", label: "茂南区" }, { value: "440904", label: "电白区" }, { value: "440981", label: "高州市" }, { value: "440982", label: "化州市" }, { value: "440983", label: "信宜市" }] }, { value: "441200", label: "肇庆市", children: [{ value: "441201", label: "市辖区" }, { value: "441202", label: "端州区" }, { value: "441203", label: "鼎湖区" }, { value: "441204", label: "高要区" }, { value: "441223", label: "广宁县" }, { value: "441224", label: "怀集县" }, { value: "441225", label: "封开县" }, { value: "441226", label: "德庆县" }, { value: "441284", label: "四会市" }] }, { value: "441300", label: "惠州市", children: [{ value: "441301", label: "市辖区" }, { value: "441302", label: "惠城区" }, { value: "441303", label: "惠阳区" }, { value: "441322", label: "博罗县" }, { value: "441323", label: "惠东县" }, { value: "441324", label: "龙门县" }] }, { value: "441400", label: "梅州市", children: [{ value: "441401", label: "市辖区" }, { value: "441402", label: "梅江区" }, { value: "441403", label: "梅县区" }, { value: "441422", label: "大埔县" }, { value: "441423", label: "丰顺县" }, { value: "441424", label: "五华县" }, { value: "441426", label: "平远县" }, { value: "441427", label: "蕉岭县" }, { value: "441481", label: "兴宁市" }] }, { value: "441500", label: "汕尾市", children: [{ value: "441501", label: "市辖区" }, { value: "441502", label: "城区" }, { value: "441521", label: "海丰县" }, { value: "441523", label: "陆河县" }, { value: "441581", label: "陆丰市" }] }, { value: "441600", label: "河源市", children: [{ value: "441601", label: "市辖区" }, { value: "441602", label: "源城区" }, { value: "441621", label: "紫金县" }, { value: "441622", label: "龙川县" }, { value: "441623", label: "连平县" }, { value: "441624", label: "和平县" }, { value: "441625", label: "东源县" }] }, { value: "441700", label: "阳江市", children: [{ value: "441701", label: "市辖区" }, { value: "441702", label: "江城区" }, { value: "441704", label: "阳东区" }, { value: "441721", label: "阳西县" }, { value: "441781", label: "阳春市" }] }, { value: "441800", label: "清远市", children: [{ value: "441801", label: "市辖区" }, { value: "441802", label: "清城区" }, { value: "441803", label: "清新区" }, { value: "441821", label: "佛冈县" }, { value: "441823", label: "阳山县" }, { value: "441825", label: "连山壮族瑶族自治县" }, { value: "441826", label: "连南瑶族自治县" }, { value: "441881", label: "英德市" }, { value: "441882", label: "连州市" }] }, { value: "441900", label: "东莞市" }, { value: "442000", label: "中山市" }, { value: "445100", label: "潮州市", children: [{ value: "445101", label: "市辖区" }, { value: "445102", label: "湘桥区" }, { value: "445103", label: "潮安区" }, { value: "445122", label: "饶平县" }] }, { value: "445200", label: "揭阳市", children: [{ value: "445201", label: "市辖区" }, { value: "445202", label: "榕城区" }, { value: "445203", label: "揭东区" }, { value: "445222", label: "揭西县" }, { value: "445224", label: "惠来县" }, { value: "445281", label: "普宁市" }] }, { value: "445300", label: "云浮市", children: [{ value: "445301", label: "市辖区" }, { value: "445302", label: "云城区" }, { value: "445303", label: "云安区" }, { value: "445321", label: "新兴县" }, { value: "445322", label: "郁南县" }, { value: "445381", label: "罗定市" }] }] }, { value: '450000', label: '广西壮族', children: [{ value: "450100", label: "南宁市", children: [{ value: "450101", label: "市辖区" }, { value: "450102", label: "兴宁区" }, { value: "450103", label: "青秀区" }, { value: "450105", label: "江南区" }, { value: "450107", label: "西乡塘区" }, { value: "450108", label: "良庆区" }, { value: "450109", label: "邕宁区" }, { value: "450110", label: "武鸣区" }, { value: "450123", label: "隆安县" }, { value: "450124", label: "马山县" }, { value: "450125", label: "上林县" }, { value: "450126", label: "宾阳县" }, { value: "450127", label: "横县" }] }, { value: "450200", label: "柳州市", children: [{ value: "450201", label: "市辖区" }, { value: "450202", label: "城中区" }, { value: "450203", label: "鱼峰区" }, { value: "450204", label: "柳南区" }, { value: "450205", label: "柳北区" }, { value: "450206", label: "柳江区" }, { value: "450222", label: "柳城县" }, { value: "450223", label: "鹿寨县" }, { value: "450224", label: "融安县" }, { value: "450225", label: "融水苗族自治县" }, { value: "450226", label: "三江侗族自治县" }] }, { value: "450300", label: "桂林市", children: [{ value: "450301", label: "市辖区" }, { value: "450302", label: "秀峰区" }, { value: "450303", label: "叠彩区" }, { value: "450304", label: "象山区" }, { value: "450305", label: "七星区" }, { value: "450311", label: "雁山区" }, { value: "450312", label: "临桂区" }, { value: "450321", label: "阳朔县" }, { value: "450323", label: "灵川县" }, { value: "450324", label: "全州县" }, { value: "450325", label: "兴安县" }, { value: "450326", label: "永福县" }, { value: "450327", label: "灌阳县" }, { value: "450328", label: "龙胜各族自治县" }, { value: "450329", label: "资源县" }, { value: "450330", label: "平乐县" }, { value: "450331", label: "荔浦县" }, { value: "450332", label: "恭城瑶族自治县" }] }, { value: "450400", label: "梧州市", children: [{ value: "450401", label: "市辖区" }, { value: "450403", label: "万秀区" }, { value: "450405", label: "长洲区" }, { value: "450406", label: "龙圩区" }, { value: "450421", label: "苍梧县" }, { value: "450422", label: "藤县" }, { value: "450423", label: "蒙山县" }, { value: "450481", label: "岑溪市" }] }, { value: "450500", label: "北海市", children: [{ value: "450501", label: "市辖区" }, { value: "450502", label: "海城区" }, { value: "450503", label: "银海区" }, { value: "450512", label: "铁山港区" }, { value: "450521", label: "合浦县" }] }, { value: "450600", label: "防城港市", children: [{ value: "450601", label: "市辖区" }, { value: "450602", label: "港口区" }, { value: "450603", label: "防城区" }, { value: "450621", label: "上思县" }, { value: "450681", label: "东兴市" }] }, { value: "450700", label: "钦州市", children: [{ value: "450701", label: "市辖区" }, { value: "450702", label: "钦南区" }, { value: "450703", label: "钦北区" }, { value: "450721", label: "灵山县" }, { value: "450722", label: "浦北县" }] }, { value: "450800", label: "贵港市", children: [{ value: "450801", label: "市辖区" }, { value: "450802", label: "港北区" }, { value: "450803", label: "港南区" }, { value: "450804", label: "覃塘区" }, { value: "450821", label: "平南县" }, { value: "450881", label: "桂平市" }] }, { value: "450900", label: "玉林市", children: [{ value: "450901", label: "市辖区" }, { value: "450902", label: "玉州区" }, { value: "450903", label: "福绵区" }, { value: "450921", label: "容县" }, { value: "450922", label: "陆川县" }, { value: "450923", label: "博白县" }, { value: "450924", label: "兴业县" }, { value: "450981", label: "北流市" }] }, { value: "451000", label: "百色市", children: [{ value: "451001", label: "市辖区" }, { value: "451002", label: "右江区" }, { value: "451021", label: "田阳县" }, { value: "451022", label: "田东县" }, { value: "451023", label: "平果县" }, { value: "451024", label: "德保县" }, { value: "451026", label: "那坡县" }, { value: "451027", label: "凌云县" }, { value: "451028", label: "乐业县" }, { value: "451029", label: "田林县" }, { value: "451030", label: "西林县" }, { value: "451031", label: "隆林各族自治县" }, { value: "451081", label: "靖西市" }] }, { value: "451100", label: "贺州市", children: [{ value: "451101", label: "市辖区" }, { value: "451102", label: "八步区" }, { value: "451103", label: "平桂区" }, { value: "451121", label: "昭平县" }, { value: "451122", label: "钟山县" }, { value: "451123", label: "富川瑶族自治县" }] }, { value: "451200", label: "河池市", children: [{ value: "451201", label: "市辖区" }, { value: "451202", label: "金城江区" }, { value: "451203", label: "宜州区" }, { value: "451221", label: "南丹县" }, { value: "451222", label: "天峨县" }, { value: "451223", label: "凤山县" }, { value: "451224", label: "东兰县" }, { value: "451225", label: "罗城仫佬族自治县" }, { value: "451226", label: "环江毛南族自治县" }, { value: "451227", label: "巴马瑶族自治县" }, { value: "451228", label: "都安瑶族自治县" }, { value: "451229", label: "大化瑶族自治县" }] }, { value: "451300", label: "来宾市", children: [{ value: "451301", label: "市辖区" }, { value: "451302", label: "兴宾区" }, { value: "451321", label: "忻城县" }, { value: "451322", label: "象州县" }, { value: "451323", label: "武宣县" }, { value: "451324", label: "金秀瑶族自治县" }, { value: "451381", label: "合山市" }] }, { value: "451400", label: "崇左市", children: [{ value: "451401", label: "市辖区" }, { value: "451402", label: "江州区" }, { value: "451421", label: "扶绥县" }, { value: "451422", label: "宁明县" }, { value: "451423", label: "龙州县" }, { value: "451424", label: "大新县" }, { value: "451425", label: "天等县" }, { value: "451481", label: "凭祥市" }] }] }, { value: '460000', label: '海南省', children: [{ value: "460100", label: "海口市", children: [{ value: "460101", label: "市辖区" }, { value: "460105", label: "秀英区" }, { value: "460106", label: "龙华区" }, { value: "460107", label: "琼山区" }, { value: "460108", label: "美兰区" }] }, { value: "460200", label: "三亚市", children: [{ value: "460201", label: "市辖区" }, { value: "460202", label: "海棠区" }, { value: "460203", label: "吉阳区" }, { value: "460204", label: "天涯区" }, { value: "460205", label: "崖州区" }] }, { value: "460300", label: "三沙市", children: [{ value: "460321", label: "西沙群岛" }, { value: "460322", label: "南沙群岛" }, { value: "460323", label: "中沙群岛的岛礁及其海域" }] }, { value: "460400", label: "儋州市" }, { value: "469000", label: "省直辖县级行政区划", children: [{ value: "469001", label: "五指山市" }, { value: "469002", label: "琼海市" }, { value: "469005", label: "文昌市" }, { value: "469006", label: "万宁市" }, { value: "469007", label: "东方市" }, { value: "469021", label: "定安县" }, { value: "469022", label: "屯昌县" }, { value: "469023", label: "澄迈县" }, { value: "469024", label: "临高县" }, { value: "469025", label: "白沙黎族自治县" }, { value: "469026", label: "昌江黎族自治县" }, { value: "469027", label: "乐东黎族自治县" }, { value: "469028", label: "陵水黎族自治县" }, { value: "469029", label: "保亭黎族苗族自治县" }, { value: "469030", label: "琼中黎族苗族自治县" }] }] }, { value: '500000', label: '重庆', children: [{ value: "500100", label: "市辖区", children: [{ value: "500101", label: "万州区" }, { value: "500102", label: "涪陵区" }, { value: "500103", label: "渝中区" }, { value: "500104", label: "大渡口区" }, { value: "500105", label: "江北区" }, { value: "500106", label: "沙坪坝区" }, { value: "500107", label: "九龙坡区" }, { value: "500108", label: "南岸区" }, { value: "500109", label: "北碚区" }, { value: "500110", label: "綦江区" }, { value: "500111", label: "大足区" }, { value: "500112", label: "渝北区" }, { value: "500113", label: "巴南区" }, { value: "500114", label: "黔江区" }, { value: "500115", label: "长寿区" }, { value: "500116", label: "江津区" }, { value: "500117", label: "合川区" }, { value: "500118", label: "永川区" }, { value: "500119", label: "南川区" }, { value: "500120", label: "璧山区" }, { value: "500151", label: "铜梁区" }, { value: "500152", label: "潼南区" }, { value: "500153", label: "荣昌区" }, { value: "500154", label: "开州区" }, { value: "500155", label: "梁平区" }, { value: "500156", label: "武隆区" }] }, { value: "500200", label: "县", children: [{ value: "500229", label: "城口县" }, { value: "500230", label: "丰都县" }, { value: "500231", label: "垫江县" }, { value: "500233", label: "忠县" }, { value: "500235", label: "云阳县" }, { value: "500236", label: "奉节县" }, { value: "500237", label: "巫山县" }, { value: "500238", label: "巫溪县" }, { value: "500240", label: "石柱土家族自治县" }, { value: "500241", label: "秀山土家族苗族自治县" }, { value: "500242", label: "酉阳土家族苗族自治县" }, { value: "500243", label: "彭水苗族土家族自治县" }] }] }, { value: '510000', label: '四川省', children: [{ value: "510100", label: "成都市", children: [{ value: "510101", label: "市辖区" }, { value: "510104", label: "锦江区" }, { value: "510105", label: "青羊区" }, { value: "510106", label: "金牛区" }, { value: "510107", label: "武侯区" }, { value: "510108", label: "成华区" }, { value: "510112", label: "龙泉驿区" }, { value: "510113", label: "青白江区" }, { value: "510114", label: "新都区" }, { value: "510115", label: "温江区" }, { value: "510116", label: "双流区" }, { value: "510117", label: "郫都区" }, { value: "510121", label: "金堂县" }, { value: "510129", label: "大邑县" }, { value: "510131", label: "蒲江县" }, { value: "510132", label: "新津县" }, { value: "510181", label: "都江堰市" }, { value: "510182", label: "彭州市" }, { value: "510183", label: "邛崃市" }, { value: "510184", label: "崇州市" }, { value: "510185", label: "简阳市" }] }, { value: "510300", label: "自贡市", children: [{ value: "510301", label: "市辖区" }, { value: "510302", label: "自流井区" }, { value: "510303", label: "贡井区" }, { value: "510304", label: "大安区" }, { value: "510311", label: "沿滩区" }, { value: "510321", label: "荣县" }, { value: "510322", label: "富顺县" }] }, { value: "510400", label: "攀枝花市", children: [{ value: "510401", label: "市辖区" }, { value: "510402", label: "东区" }, { value: "510403", label: "西区" }, { value: "510411", label: "仁和区" }, { value: "510421", label: "米易县" }, { value: "510422", label: "盐边县" }] }, { value: "510500", label: "泸州市", children: [{ value: "510501", label: "市辖区" }, { value: "510502", label: "江阳区" }, { value: "510503", label: "纳溪区" }, { value: "510504", label: "龙马潭区" }, { value: "510521", label: "泸县" }, { value: "510522", label: "合江县" }, { value: "510524", label: "叙永县" }, { value: "510525", label: "古蔺县" }] }, { value: "510600", label: "德阳市", children: [{ value: "510601", label: "市辖区" }, { value: "510603", label: "旌阳区" }, { value: "510604", label: "罗江区" }, { value: "510623", label: "中江县" }, { value: "510681", label: "广汉市" }, { value: "510682", label: "什邡市" }, { value: "510683", label: "绵竹市" }] }, { value: "510700", label: "绵阳市", children: [{ value: "510701", label: "市辖区" }, { value: "510703", label: "涪城区" }, { value: "510704", label: "游仙区" }, { value: "510705", label: "安州区" }, { value: "510722", label: "三台县" }, { value: "510723", label: "盐亭县" }, { value: "510725", label: "梓潼县" }, { value: "510726", label: "北川羌族自治县" }, { value: "510727", label: "平武县" }, { value: "510781", label: "江油市" }] }, { value: "510800", label: "广元市", children: [{ value: "510801", label: "市辖区" }, { value: "510802", label: "利州区" }, { value: "510811", label: "昭化区" }, { value: "510812", label: "朝天区" }, { value: "510821", label: "旺苍县" }, { value: "510822", label: "青川县" }, { value: "510823", label: "剑阁县" }, { value: "510824", label: "苍溪县" }] }, { value: "510900", label: "遂宁市", children: [{ value: "510901", label: "市辖区" }, { value: "510903", label: "船山区" }, { value: "510904", label: "安居区" }, { value: "510921", label: "蓬溪县" }, { value: "510922", label: "射洪县" }, { value: "510923", label: "大英县" }] }, { value: "511000", label: "内江市", children: [{ value: "511001", label: "市辖区" }, { value: "511002", label: "市中区" }, { value: "511011", label: "东兴区" }, { value: "511024", label: "威远县" }, { value: "511025", label: "资中县" }, { value: "511071", label: "内江经济开发区" }, { value: "511083", label: "隆昌市" }] }, { value: "511100", label: "乐山市", children: [{ value: "511101", label: "市辖区" }, { value: "511102", label: "市中区" }, { value: "511111", label: "沙湾区" }, { value: "511112", label: "五通桥区" }, { value: "511113", label: "金口河区" }, { value: "511123", label: "犍为县" }, { value: "511124", label: "井研县" }, { value: "511126", label: "夹江县" }, { value: "511129", label: "沐川县" }, { value: "511132", label: "峨边彝族自治县" }, { value: "511133", label: "马边彝族自治县" }, { value: "511181", label: "峨眉山市" }] }, { value: "511300", label: "南充市", children: [{ value: "511301", label: "市辖区" }, { value: "511302", label: "顺庆区" }, { value: "511303", label: "高坪区" }, { value: "511304", label: "嘉陵区" }, { value: "511321", label: "南部县" }, { value: "511322", label: "营山县" }, { value: "511323", label: "蓬安县" }, { value: "511324", label: "仪陇县" }, { value: "511325", label: "西充县" }, { value: "511381", label: "阆中市" }] }, { value: "511400", label: "眉山市", children: [{ value: "511401", label: "市辖区" }, { value: "511402", label: "东坡区" }, { value: "511403", label: "彭山区" }, { value: "511421", label: "仁寿县" }, { value: "511423", label: "洪雅县" }, { value: "511424", label: "丹棱县" }, { value: "511425", label: "青神县" }] }, { value: "511500", label: "宜宾市", children: [{ value: "511501", label: "市辖区" }, { value: "511502", label: "翠屏区" }, { value: "511503", label: "南溪区" }, { value: "511521", label: "宜宾县" }, { value: "511523", label: "江安县" }, { value: "511524", label: "长宁县" }, { value: "511525", label: "高县" }, { value: "511526", label: "珙县" }, { value: "511527", label: "筠连县" }, { value: "511528", label: "兴文县" }, { value: "511529", label: "屏山县" }] }, { value: "511600", label: "广安市", children: [{ value: "511601", label: "市辖区" }, { value: "511602", label: "广安区" }, { value: "511603", label: "前锋区" }, { value: "511621", label: "岳池县" }, { value: "511622", label: "武胜县" }, { value: "511623", label: "邻水县" }, { value: "511681", label: "华蓥市" }] }, { value: "511700", label: "达州市", children: [{ value: "511701", label: "市辖区" }, { value: "511702", label: "通川区" }, { value: "511703", label: "达川区" }, { value: "511722", label: "宣汉县" }, { value: "511723", label: "开江县" }, { value: "511724", label: "大竹县" }, { value: "511725", label: "渠县" }, { value: "511771", label: "达州经济开发区" }, { value: "511781", label: "万源市" }] }, { value: "511800", label: "雅安市", children: [{ value: "511801", label: "市辖区" }, { value: "511802", label: "雨城区" }, { value: "511803", label: "名山区" }, { value: "511822", label: "荥经县" }, { value: "511823", label: "汉源县" }, { value: "511824", label: "石棉县" }, { value: "511825", label: "天全县" }, { value: "511826", label: "芦山县" }, { value: "511827", label: "宝兴县" }] }, { value: "511900", label: "巴中市", children: [{ value: "511901", label: "市辖区" }, { value: "511902", label: "巴州区" }, { value: "511903", label: "恩阳区" }, { value: "511921", label: "通江县" }, { value: "511922", label: "南江县" }, { value: "511923", label: "平昌县" }, { value: "511971", label: "巴中经济开发区" }] }, { value: "512000", label: "资阳市", children: [{ value: "512001", label: "市辖区" }, { value: "512002", label: "雁江区" }, { value: "512021", label: "安岳县" }, { value: "512022", label: "乐至县" }] }, { value: "513200", label: "阿坝藏族羌族自治州", children: [{ value: "513201", label: "马尔康市" }, { value: "513221", label: "汶川县" }, { value: "513222", label: "理县" }, { value: "513223", label: "茂县" }, { value: "513224", label: "松潘县" }, { value: "513225", label: "九寨沟县" }, { value: "513226", label: "金川县" }, { value: "513227", label: "小金县" }, { value: "513228", label: "黑水县" }, { value: "513230", label: "壤塘县" }, { value: "513231", label: "阿坝县" }, { value: "513232", label: "若尔盖县" }, { value: "513233", label: "红原县" }] }, { value: "513300", label: "甘孜藏族自治州", children: [{ value: "513301", label: "康定市" }, { value: "513322", label: "泸定县" }, { value: "513323", label: "丹巴县" }, { value: "513324", label: "九龙县" }, { value: "513325", label: "雅江县" }, { value: "513326", label: "道孚县" }, { value: "513327", label: "炉霍县" }, { value: "513328", label: "甘孜县" }, { value: "513329", label: "新龙县" }, { value: "513330", label: "德格县" }, { value: "513331", label: "白玉县" }, { value: "513332", label: "石渠县" }, { value: "513333", label: "色达县" }, { value: "513334", label: "理塘县" }, { value: "513335", label: "巴塘县" }, { value: "513336", label: "乡城县" }, { value: "513337", label: "稻城县" }, { value: "513338", label: "得荣县" }] }, { value: "513400", label: "凉山彝族自治州", children: [{ value: "513401", label: "西昌市" }, { value: "513422", label: "木里藏族自治县" }, { value: "513423", label: "盐源县" }, { value: "513424", label: "德昌县" }, { value: "513425", label: "会理县" }, { value: "513426", label: "会东县" }, { value: "513427", label: "宁南县" }, { value: "513428", label: "普格县" }, { value: "513429", label: "布拖县" }, { value: "513430", label: "金阳县" }, { value: "513431", label: "昭觉县" }, { value: "513432", label: "喜德县" }, { value: "513433", label: "冕宁县" }, { value: "513434", label: "越西县" }, { value: "513435", label: "甘洛县" }, { value: "513436", label: "美姑县" }, { value: "513437", label: "雷波县" }] }] }, { value: '520000', label: '贵州省', children: [{ value: "520100", label: "贵阳市", children: [{ value: "520101", label: "市辖区" }, { value: "520102", label: "南明区" }, { value: "520103", label: "云岩区" }, { value: "520111", label: "花溪区" }, { value: "520112", label: "乌当区" }, { value: "520113", label: "白云区" }, { value: "520115", label: "观山湖区" }, { value: "520121", label: "开阳县" }, { value: "520122", label: "息烽县" }, { value: "520123", label: "修文县" }, { value: "520181", label: "清镇市" }] }, { value: "520200", label: "六盘水市", children: [{ value: "520201", label: "钟山区" }, { value: "520203", label: "六枝特区" }, { value: "520221", label: "水城县" }, { value: "520281", label: "盘州市" }] }, { value: "520300", label: "遵义市", children: [{ value: "520301", label: "市辖区" }, { value: "520302", label: "红花岗区" }, { value: "520303", label: "汇川区" }, { value: "520304", label: "播州区" }, { value: "520322", label: "桐梓县" }, { value: "520323", label: "绥阳县" }, { value: "520324", label: "正安县" }, { value: "520325", label: "道真仡佬族苗族自治县" }, { value: "520326", label: "务川仡佬族苗族自治县" }, { value: "520327", label: "凤冈县" }, { value: "520328", label: "湄潭县" }, { value: "520329", label: "余庆县" }, { value: "520330", label: "习水县" }, { value: "520381", label: "赤水市" }, { value: "520382", label: "仁怀市" }] }, { value: "520400", label: "安顺市", children: [{ value: "520401", label: "市辖区" }, { value: "520402", label: "西秀区" }, { value: "520403", label: "平坝区" }, { value: "520422", label: "普定县" }, { value: "520423", label: "镇宁布依族苗族自治县" }, { value: "520424", label: "关岭布依族苗族自治县" }, { value: "520425", label: "紫云苗族布依族自治县" }] }, { value: "520500", label: "毕节市", children: [{ value: "520501", label: "市辖区" }, { value: "520502", label: "七星关区" }, { value: "520521", label: "大方县" }, { value: "520522", label: "黔西县" }, { value: "520523", label: "金沙县" }, { value: "520524", label: "织金县" }, { value: "520525", label: "纳雍县" }, { value: "520526", label: "威宁彝族回族苗族自治县" }, { value: "520527", label: "赫章县" }] }, { value: "520600", label: "铜仁市", children: [{ value: "520601", label: "市辖区" }, { value: "520602", label: "碧江区" }, { value: "520603", label: "万山区" }, { value: "520621", label: "江口县" }, { value: "520622", label: "玉屏侗族自治县" }, { value: "520623", label: "石阡县" }, { value: "520624", label: "思南县" }, { value: "520625", label: "印江土家族苗族自治县" }, { value: "520626", label: "德江县" }, { value: "520627", label: "沿河土家族自治县" }, { value: "520628", label: "松桃苗族自治县" }] }, { value: "522300", label: "黔西南布依族苗族自治州", children: [{ value: "522301", label: "兴义市" }, { value: "522322", label: "兴仁县" }, { value: "522323", label: "普安县" }, { value: "522324", label: "晴隆县" }, { value: "522325", label: "贞丰县" }, { value: "522326", label: "望谟县" }, { value: "522327", label: "册亨县" }, { value: "522328", label: "安龙县" }] }, { value: "522600", label: "黔东南苗族侗族自治州", children: [{ value: "522601", label: "凯里市" }, { value: "522622", label: "黄平县" }, { value: "522623", label: "施秉县" }, { value: "522624", label: "三穗县" }, { value: "522625", label: "镇远县" }, { value: "522626", label: "岑巩县" }, { value: "522627", label: "天柱县" }, { value: "522628", label: "锦屏县" }, { value: "522629", label: "剑河县" }, { value: "522630", label: "台江县" }, { value: "522631", label: "黎平县" }, { value: "522632", label: "榕江县" }, { value: "522633", label: "从江县" }, { value: "522634", label: "雷山县" }, { value: "522635", label: "麻江县" }, { value: "522636", label: "丹寨县" }] }, { value: "522700", label: "黔南布依族苗族自治州", children: [{ value: "522701", label: "都匀市" }, { value: "522702", label: "福泉市" }, { value: "522722", label: "荔波县" }, { value: "522723", label: "贵定县" }, { value: "522725", label: "瓮安县" }, { value: "522726", label: "独山县" }, { value: "522727", label: "平塘县" }, { value: "522728", label: "罗甸县" }, { value: "522729", label: "长顺县" }, { value: "522730", label: "龙里县" }, { value: "522731", label: "惠水县" }, { value: "522732", label: "三都水族自治县" }] }] }, { value: '530000', label: '云南省', children: [{ value: "530100", label: "昆明市", children: [{ value: "530101", label: "市辖区" }, { value: "530102", label: "五华区" }, { value: "530103", label: "盘龙区" }, { value: "530111", label: "官渡区" }, { value: "530112", label: "西山区" }, { value: "530113", label: "东川区" }, { value: "530114", label: "呈贡区" }, { value: "530115", label: "晋宁区" }, { value: "530124", label: "富民县" }, { value: "530125", label: "宜良县" }, { value: "530126", label: "石林彝族自治县" }, { value: "530127", label: "嵩明县" }, { value: "530128", label: "禄劝彝族苗族自治县" }, { value: "530129", label: "寻甸回族彝族自治县" }, { value: "530181", label: "安宁市" }] }, { value: "530300", label: "曲靖市", children: [{ value: "530301", label: "市辖区" }, { value: "530302", label: "麒麟区" }, { value: "530303", label: "沾益区" }, { value: "530321", label: "马龙县" }, { value: "530322", label: "陆良县" }, { value: "530323", label: "师宗县" }, { value: "530324", label: "罗平县" }, { value: "530325", label: "富源县" }, { value: "530326", label: "会泽县" }, { value: "530381", label: "宣威市" }] }, { value: "530400", label: "玉溪市", children: [{ value: "530401", label: "市辖区" }, { value: "530402", label: "红塔区" }, { value: "530403", label: "江川区" }, { value: "530422", label: "澄江县" }, { value: "530423", label: "通海县" }, { value: "530424", label: "华宁县" }, { value: "530425", label: "易门县" }, { value: "530426", label: "峨山彝族自治县" }, { value: "530427", label: "新平彝族傣族自治县" }, { value: "530428", label: "元江哈尼族彝族傣族自治县" }] }, { value: "530500", label: "保山市", children: [{ value: "530501", label: "市辖区" }, { value: "530502", label: "隆阳区" }, { value: "530521", label: "施甸县" }, { value: "530523", label: "龙陵县" }, { value: "530524", label: "昌宁县" }, { value: "530581", label: "腾冲市" }] }, { value: "530600", label: "昭通市", children: [{ value: "530601", label: "市辖区" }, { value: "530602", label: "昭阳区" }, { value: "530621", label: "鲁甸县" }, { value: "530622", label: "巧家县" }, { value: "530623", label: "盐津县" }, { value: "530624", label: "大关县" }, { value: "530625", label: "永善县" }, { value: "530626", label: "绥江县" }, { value: "530627", label: "镇雄县" }, { value: "530628", label: "彝良县" }, { value: "530629", label: "威信县" }, { value: "530630", label: "水富县" }] }, { value: "530700", label: "丽江市", children: [{ value: "530701", label: "市辖区" }, { value: "530702", label: "古城区" }, { value: "530721", label: "玉龙纳西族自治县" }, { value: "530722", label: "永胜县" }, { value: "530723", label: "华坪县" }, { value: "530724", label: "宁蒗彝族自治县" }] }, { value: "530800", label: "普洱市", children: [{ value: "530801", label: "市辖区" }, { value: "530802", label: "思茅区" }, { value: "530821", label: "宁洱哈尼族彝族自治县" }, { value: "530822", label: "墨江哈尼族自治县" }, { value: "530823", label: "景东彝族自治县" }, { value: "530824", label: "景谷傣族彝族自治县" }, { value: "530825", label: "镇沅彝族哈尼族拉祜族自治县" }, { value: "530826", label: "江城哈尼族彝族自治县" }, { value: "530827", label: "孟连傣族拉祜族佤族自治县" }, { value: "530828", label: "澜沧拉祜族自治县" }, { value: "530829", label: "西盟佤族自治县" }] }, { value: "530900", label: "临沧市", children: [{ value: "530901", label: "市辖区" }, { value: "530902", label: "临翔区" }, { value: "530921", label: "凤庆县" }, { value: "530922", label: "云县" }, { value: "530923", label: "永德县" }, { value: "530924", label: "镇康县" }, { value: "530925", label: "双江拉祜族佤族布朗族傣族自治县" }, { value: "530926", label: "耿马傣族佤族自治县" }, { value: "530927", label: "沧源佤族自治县" }] }, { value: "532300", label: "楚雄彝族自治州", children: [{ value: "532301", label: "楚雄市" }, { value: "532322", label: "双柏县" }, { value: "532323", label: "牟定县" }, { value: "532324", label: "南华县" }, { value: "532325", label: "姚安县" }, { value: "532326", label: "大姚县" }, { value: "532327", label: "永仁县" }, { value: "532328", label: "元谋县" }, { value: "532329", label: "武定县" }, { value: "532331", label: "禄丰县" }] }, { value: "532500", label: "红河哈尼族彝族自治州", children: [{ value: "532501", label: "个旧市" }, { value: "532502", label: "开远市" }, { value: "532503", label: "蒙自市" }, { value: "532504", label: "弥勒市" }, { value: "532523", label: "屏边苗族自治县" }, { value: "532524", label: "建水县" }, { value: "532525", label: "石屏县" }, { value: "532527", label: "泸西县" }, { value: "532528", label: "元阳县" }, { value: "532529", label: "红河县" }, { value: "532530", label: "金平苗族瑶族傣族自治县" }, { value: "532531", label: "绿春县" }, { value: "532532", label: "河口瑶族自治县" }] }, { value: "532600", label: "文山壮族苗族自治州", children: [{ value: "532601", label: "文山市" }, { value: "532622", label: "砚山县" }, { value: "532623", label: "西畴县" }, { value: "532624", label: "麻栗坡县" }, { value: "532625", label: "马关县" }, { value: "532626", label: "丘北县" }, { value: "532627", label: "广南县" }, { value: "532628", label: "富宁县" }] }, { value: "532800", label: "西双版纳傣族自治州", children: [{ value: "532801", label: "景洪市" }, { value: "532822", label: "勐海县" }, { value: "532823", label: "勐腊县" }] }, { value: "532900", label: "大理白族自治州", children: [{ value: "532901", label: "大理市" }, { value: "532922", label: "漾濞彝族自治县" }, { value: "532923", label: "祥云县" }, { value: "532924", label: "宾川县" }, { value: "532925", label: "弥渡县" }, { value: "532926", label: "南涧彝族自治县" }, { value: "532927", label: "巍山彝族回族自治县" }, { value: "532928", label: "永平县" }, { value: "532929", label: "云龙县" }, { value: "532930", label: "洱源县" }, { value: "532931", label: "剑川县" }, { value: "532932", label: "鹤庆县" }] }, { value: "533100", label: "德宏傣族景颇族自治州", children: [{ value: "533102", label: "瑞丽市" }, { value: "533103", label: "芒市" }, { value: "533122", label: "梁河县" }, { value: "533123", label: "盈江县" }, { value: "533124", label: "陇川县" }] }, { value: "533300", label: "怒江傈僳族自治州", children: [{ value: "533301", label: "泸水市" }, { value: "533323", label: "福贡县" }, { value: "533324", label: "贡山独龙族怒族自治县" }, { value: "533325", label: "兰坪白族普米族自治县" }] }, { value: "533400", label: "迪庆藏族自治州", children: [{ value: "533401", label: "香格里拉市" }, { value: "533422", label: "德钦县" }, { value: "533423", label: "维西傈僳族自治县" }] }] }, { value: '540000', label: '西藏', children: [{ value: "540100", label: "拉萨市", children: [{ value: "540101", label: "市辖区" }, { value: "540102", label: "城关区" }, { value: "540103", label: "堆龙德庆区" }, { value: "540121", label: "林周县" }, { value: "540122", label: "当雄县" }, { value: "540123", label: "尼木县" }, { value: "540124", label: "曲水县" }, { value: "540126", label: "达孜县" }, { value: "540127", label: "墨竹工卡县" }, { value: "540171", label: "格尔木藏青工业园区" }, { value: "540172", label: "拉萨经济技术开发区" }, { value: "540173", label: "西藏文化旅游创意园区" }, { value: "540174", label: "达孜工业园区" }] }, { value: "540200", label: "日喀则市", children: [{ value: "540202", label: "桑珠孜区" }, { value: "540221", label: "南木林县" }, { value: "540222", label: "江孜县" }, { value: "540223", label: "定日县" }, { value: "540224", label: "萨迦县" }, { value: "540225", label: "拉孜县" }, { value: "540226", label: "昂仁县" }, { value: "540227", label: "谢通门县" }, { value: "540228", label: "白朗县" }, { value: "540229", label: "仁布县" }, { value: "540230", label: "康马县" }, { value: "540231", label: "定结县" }, { value: "540232", label: "仲巴县" }, { value: "540233", label: "亚东县" }, { value: "540234", label: "吉隆县" }, { value: "540235", label: "聂拉木县" }, { value: "540236", label: "萨嘎县" }, { value: "540237", label: "岗巴县" }] }, { value: "540300", label: "昌都市", children: [{ value: "540302", label: "卡若区" }, { value: "540321", label: "江达县" }, { value: "540322", label: "贡觉县" }, { value: "540323", label: "类乌齐县" }, { value: "540324", label: "丁青县" }, { value: "540325", label: "察雅县" }, { value: "540326", label: "八宿县" }, { value: "540327", label: "左贡县" }, { value: "540328", label: "芒康县" }, { value: "540329", label: "洛隆县" }, { value: "540330", label: "边坝县" }] }, { value: "540400", label: "林芝市", children: [{ value: "540402", label: "巴宜区" }, { value: "540421", label: "工布江达县" }, { value: "540422", label: "米林县" }, { value: "540423", label: "墨脱县" }, { value: "540424", label: "波密县" }, { value: "540425", label: "察隅县" }, { value: "540426", label: "朗县" }] }, { value: "540500", label: "山南市", children: [{ value: "540501", label: "市辖区" }, { value: "540502", label: "乃东区" }, { value: "540521", label: "扎囊县" }, { value: "540522", label: "贡嘎县" }, { value: "540523", label: "桑日县" }, { value: "540524", label: "琼结县" }, { value: "540525", label: "曲松县" }, { value: "540526", label: "措美县" }, { value: "540527", label: "洛扎县" }, { value: "540528", label: "加查县" }, { value: "540529", label: "隆子县" }, { value: "540530", label: "错那县" }, { value: "540531", label: "浪卡子县" }] }, { value: "542400", label: "那曲地区", children: [{ value: "542421", label: "那曲县" }, { value: "542422", label: "嘉黎县" }, { value: "542423", label: "比如县" }, { value: "542424", label: "聂荣县" }, { value: "542425", label: "安多县" }, { value: "542426", label: "申扎县" }, { value: "542427", label: "索县" }, { value: "542428", label: "班戈县" }, { value: "542429", label: "巴青县" }, { value: "542430", label: "尼玛县" }, { value: "542431", label: "双湖县" }] }, { value: "542500", label: "阿里地区", children: [{ value: "542521", label: "普兰县" }, { value: "542522", label: "札达县" }, { value: "542523", label: "噶尔县" }, { value: "542524", label: "日土县" }, { value: "542525", label: "革吉县" }, { value: "542526", label: "改则县" }, { value: "542527", label: "措勤县" }] }] }, { value: '610000', label: '陕西省', children: [{ value: "610100", label: "西安市", children: [{ value: "610101", label: "市辖区" }, { value: "610102", label: "新城区" }, { value: "610103", label: "碑林区" }, { value: "610104", label: "莲湖区" }, { value: "610111", label: "灞桥区" }, { value: "610112", label: "未央区" }, { value: "610113", label: "雁塔区" }, { value: "610114", label: "阎良区" }, { value: "610115", label: "临潼区" }, { value: "610116", label: "长安区" }, { value: "610117", label: "高陵区" }, { value: "610118", label: "鄠邑区" }, { value: "610122", label: "蓝田县" }, { value: "610124", label: "周至县" }] }, { value: "610200", label: "铜川市", children: [{ value: "610201", label: "市辖区" }, { value: "610202", label: "王益区" }, { value: "610203", label: "印台区" }, { value: "610204", label: "耀州区" }, { value: "610222", label: "宜君县" }] }, { value: "610300", label: "宝鸡市", children: [{ value: "610301", label: "市辖区" }, { value: "610302", label: "渭滨区" }, { value: "610303", label: "金台区" }, { value: "610304", label: "陈仓区" }, { value: "610322", label: "凤翔县" }, { value: "610323", label: "岐山县" }, { value: "610324", label: "扶风县" }, { value: "610326", label: "眉县" }, { value: "610327", label: "陇县" }, { value: "610328", label: "千阳县" }, { value: "610329", label: "麟游县" }, { value: "610330", label: "凤县" }, { value: "610331", label: "太白县" }] }, { value: "610400", label: "咸阳市", children: [{ value: "610401", label: "市辖区" }, { value: "610402", label: "秦都区" }, { value: "610403", label: "杨陵区" }, { value: "610404", label: "渭城区" }, { value: "610422", label: "三原县" }, { value: "610423", label: "泾阳县" }, { value: "610424", label: "乾县" }, { value: "610425", label: "礼泉县" }, { value: "610426", label: "永寿县" }, { value: "610427", label: "彬县" }, { value: "610428", label: "长武县" }, { value: "610429", label: "旬邑县" }, { value: "610430", label: "淳化县" }, { value: "610431", label: "武功县" }, { value: "610481", label: "兴平市" }] }, { value: "610500", label: "渭南市", children: [{ value: "610501", label: "市辖区" }, { value: "610502", label: "临渭区" }, { value: "610503", label: "华州区" }, { value: "610522", label: "潼关县" }, { value: "610523", label: "大荔县" }, { value: "610524", label: "合阳县" }, { value: "610525", label: "澄城县" }, { value: "610526", label: "蒲城县" }, { value: "610527", label: "白水县" }, { value: "610528", label: "富平县" }, { value: "610581", label: "韩城市" }, { value: "610582", label: "华阴市" }] }, { value: "610600", label: "延安市", children: [{ value: "610601", label: "市辖区" }, { value: "610602", label: "宝塔区" }, { value: "610603", label: "安塞区" }, { value: "610621", label: "延长县" }, { value: "610622", label: "延川县" }, { value: "610623", label: "子长县" }, { value: "610625", label: "志丹县" }, { value: "610626", label: "吴起县" }, { value: "610627", label: "甘泉县" }, { value: "610628", label: "富县" }, { value: "610629", label: "洛川县" }, { value: "610630", label: "宜川县" }, { value: "610631", label: "黄龙县" }, { value: "610632", label: "黄陵县" }] }, { value: "610700", label: "汉中市", children: [{ value: "610701", label: "市辖区" }, { value: "610702", label: "汉台区" }, { value: "610703", label: "南郑区" }, { value: "610722", label: "城固县" }, { value: "610723", label: "洋县" }, { value: "610724", label: "西乡县" }, { value: "610725", label: "勉县" }, { value: "610726", label: "宁强县" }, { value: "610727", label: "略阳县" }, { value: "610728", label: "镇巴县" }, { value: "610729", label: "留坝县" }, { value: "610730", label: "佛坪县" }] }, { value: "610800", label: "榆林市", children: [{ value: "610801", label: "市辖区" }, { value: "610802", label: "榆阳区" }, { value: "610803", label: "横山区" }, { value: "610822", label: "府谷县" }, { value: "610824", label: "靖边县" }, { value: "610825", label: "定边县" }, { value: "610826", label: "绥德县" }, { value: "610827", label: "米脂县" }, { value: "610828", label: "佳县" }, { value: "610829", label: "吴堡县" }, { value: "610830", label: "清涧县" }, { value: "610831", label: "子洲县" }, { value: "610881", label: "神木市" }] }, { value: "610900", label: "安康市", children: [{ value: "610901", label: "市辖区" }, { value: "610902", label: "汉滨区" }, { value: "610921", label: "汉阴县" }, { value: "610922", label: "石泉县" }, { value: "610923", label: "宁陕县" }, { value: "610924", label: "紫阳县" }, { value: "610925", label: "岚皋县" }, { value: "610926", label: "平利县" }, { value: "610927", label: "镇坪县" }, { value: "610928", label: "旬阳县" }, { value: "610929", label: "白河县" }] }, { value: "611000", label: "商洛市", children: [{ value: "611001", label: "市辖区" }, { value: "611002", label: "商州区" }, { value: "611021", label: "洛南县" }, { value: "611022", label: "丹凤县" }, { value: "611023", label: "商南县" }, { value: "611024", label: "山阳县" }, { value: "611025", label: "镇安县" }, { value: "611026", label: "柞水县" }] }] }, { value: '620000', label: '甘肃省', children: [{ value: "620100", label: "兰州市", children: [{ value: "620101", label: "市辖区" }, { value: "620102", label: "城关区" }, { value: "620103", label: "七里河区" }, { value: "620104", label: "西固区" }, { value: "620105", label: "安宁区" }, { value: "620111", label: "红古区" }, { value: "620121", label: "永登县" }, { value: "620122", label: "皋兰县" }, { value: "620123", label: "榆中县" }, { value: "620171", label: "兰州新区" }] }, { value: "620200", label: "嘉峪关市", children: [{ value: "620201", label: "市辖区" }] }, { value: "620300", label: "金昌市", children: [{ value: "620301", label: "市辖区" }, { value: "620302", label: "金川区" }, { value: "620321", label: "永昌县" }] }, { value: "620400", label: "白银市", children: [{ value: "620401", label: "市辖区" }, { value: "620402", label: "白银区" }, { value: "620403", label: "平川区" }, { value: "620421", label: "靖远县" }, { value: "620422", label: "会宁县" }, { value: "620423", label: "景泰县" }] }, { value: "620500", label: "天水市", children: [{ value: "620501", label: "市辖区" }, { value: "620502", label: "秦州区" }, { value: "620503", label: "麦积区" }, { value: "620521", label: "清水县" }, { value: "620522", label: "秦安县" }, { value: "620523", label: "甘谷县" }, { value: "620524", label: "武山县" }, { value: "620525", label: "张家川回族自治县" }] }, { value: "620600", label: "武威市", children: [{ value: "620601", label: "市辖区" }, { value: "620602", label: "凉州区" }, { value: "620621", label: "民勤县" }, { value: "620622", label: "古浪县" }, { value: "620623", label: "天祝藏族自治县" }] }, { value: "620700", label: "张掖市", children: [{ value: "620701", label: "市辖区" }, { value: "620702", label: "甘州区" }, { value: "620721", label: "肃南裕固族自治县" }, { value: "620722", label: "民乐县" }, { value: "620723", label: "临泽县" }, { value: "620724", label: "高台县" }, { value: "620725", label: "山丹县" }] }, { value: "620800", label: "平凉市", children: [{ value: "620801", label: "市辖区" }, { value: "620802", label: "崆峒区" }, { value: "620821", label: "泾川县" }, { value: "620822", label: "灵台县" }, { value: "620823", label: "崇信县" }, { value: "620824", label: "华亭县" }, { value: "620825", label: "庄浪县" }, { value: "620826", label: "静宁县" }, { value: "620871", label: "平凉工业园区" }] }, { value: "620900", label: "酒泉市", children: [{ value: "620901", label: "市辖区" }, { value: "620902", label: "肃州区" }, { value: "620921", label: "金塔县" }, { value: "620922", label: "瓜州县" }, { value: "620923", label: "肃北蒙古族自治县" }, { value: "620924", label: "阿克塞哈萨克族自治县" }, { value: "620981", label: "玉门市" }, { value: "620982", label: "敦煌市" }] }, { value: "621000", label: "庆阳市", children: [{ value: "621001", label: "市辖区" }, { value: "621002", label: "西峰区" }, { value: "621021", label: "庆城县" }, { value: "621022", label: "环县" }, { value: "621023", label: "华池县" }, { value: "621024", label: "合水县" }, { value: "621025", label: "正宁县" }, { value: "621026", label: "宁县" }, { value: "621027", label: "镇原县" }] }, { value: "621100", label: "定西市", children: [{ value: "621101", label: "市辖区" }, { value: "621102", label: "安定区" }, { value: "621121", label: "通渭县" }, { value: "621122", label: "陇西县" }, { value: "621123", label: "渭源县" }, { value: "621124", label: "临洮县" }, { value: "621125", label: "漳县" }, { value: "621126", label: "岷县" }] }, { value: "621200", label: "陇南市", children: [{ value: "621201", label: "市辖区" }, { value: "621202", label: "武都区" }, { value: "621221", label: "成县" }, { value: "621222", label: "文县" }, { value: "621223", label: "宕昌县" }, { value: "621224", label: "康县" }, { value: "621225", label: "西和县" }, { value: "621226", label: "礼县" }, { value: "621227", label: "徽县" }, { value: "621228", label: "两当县" }] }, { value: "622900", label: "临夏回族自治州", children: [{ value: "622901", label: "临夏市" }, { value: "622921", label: "临夏县" }, { value: "622922", label: "康乐县" }, { value: "622923", label: "永靖县" }, { value: "622924", label: "广河县" }, { value: "622925", label: "和政县" }, { value: "622926", label: "东乡族自治县" }, { value: "622927", label: "积石山保安族东乡族撒拉族自治县" }] }, { value: "623000", label: "甘南藏族自治州", children: [{ value: "623001", label: "合作市" }, { value: "623021", label: "临潭县" }, { value: "623022", label: "卓尼县" }, { value: "623023", label: "舟曲县" }, { value: "623024", label: "迭部县" }, { value: "623025", label: "玛曲县" }, { value: "623026", label: "碌曲县" }, { value: "623027", label: "夏河县" }] }] }, { value: '630000', label: '青海省', children: [{ value: "630100", label: "西宁市", children: [{ value: "630101", label: "市辖区" }, { value: "630102", label: "城东区" }, { value: "630103", label: "城中区" }, { value: "630104", label: "城西区" }, { value: "630105", label: "城北区" }, { value: "630121", label: "大通回族土族自治县" }, { value: "630122", label: "湟中县" }, { value: "630123", label: "湟源县" }] }, { value: "630200", label: "海东市", children: [{ value: "630202", label: "乐都区" }, { value: "630203", label: "平安区" }, { value: "630222", label: "民和回族土族自治县" }, { value: "630223", label: "互助土族自治县" }, { value: "630224", label: "化隆回族自治县" }, { value: "630225", label: "循化撒拉族自治县" }] }, { value: "632200", label: "海北藏族自治州", children: [{ value: "632221", label: "门源回族自治县" }, { value: "632222", label: "祁连县" }, { value: "632223", label: "海晏县" }, { value: "632224", label: "刚察县" }] }, { value: "632300", label: "黄南藏族自治州", children: [{ value: "632321", label: "同仁县" }, { value: "632322", label: "尖扎县" }, { value: "632323", label: "泽库县" }, { value: "632324", label: "河南蒙古族自治县" }] }, { value: "632500", label: "海南藏族自治州", children: [{ value: "632521", label: "共和县" }, { value: "632522", label: "同德县" }, { value: "632523", label: "贵德县" }, { value: "632524", label: "兴海县" }, { value: "632525", label: "贵南县" }] }, { value: "632600", label: "果洛藏族自治州", children: [{ value: "632621", label: "玛沁县" }, { value: "632622", label: "班玛县" }, { value: "632623", label: "甘德县" }, { value: "632624", label: "达日县" }, { value: "632625", label: "久治县" }, { value: "632626", label: "玛多县" }] }, { value: "632700", label: "玉树藏族自治州", children: [{ value: "632701", label: "玉树市" }, { value: "632722", label: "杂多县" }, { value: "632723", label: "称多县" }, { value: "632724", label: "治多县" }, { value: "632725", label: "囊谦县" }, { value: "632726", label: "曲麻莱县" }] }, { value: "632800", label: "海西蒙古族藏族自治州", children: [{ value: "632801", label: "格尔木市" }, { value: "632802", label: "德令哈市" }, { value: "632821", label: "乌兰县" }, { value: "632822", label: "都兰县" }, { value: "632823", label: "天峻县" }, { value: "632857", label: "大柴旦行政委员会" }, { value: "632858", label: "冷湖行政委员会" }, { value: "632859", label: "茫崖行政委员会" }] }] }, { value: '640000', label: '宁夏', children: [{ value: "640100", label: "银川市", children: [{ value: "640101", label: "市辖区" }, { value: "640104", label: "兴庆区" }, { value: "640105", label: "西夏区" }, { value: "640106", label: "金凤区" }, { value: "640121", label: "永宁县" }, { value: "640122", label: "贺兰县" }, { value: "640181", label: "灵武市" }] }, { value: "640200", label: "石嘴山市", children: [{ value: "640201", label: "市辖区" }, { value: "640202", label: "大武口区" }, { value: "640205", label: "惠农区" }, { value: "640221", label: "平罗县" }] }, { value: "640300", label: "吴忠市", children: [{ value: "640301", label: "市辖区" }, { value: "640302", label: "利通区" }, { value: "640303", label: "红寺堡区" }, { value: "640323", label: "盐池县" }, { value: "640324", label: "同心县" }, { value: "640381", label: "青铜峡市" }] }, { value: "640400", label: "固原市", children: [{ value: "640401", label: "市辖区" }, { value: "640402", label: "原州区" }, { value: "640422", label: "西吉县" }, { value: "640423", label: "隆德县" }, { value: "640424", label: "泾源县" }, { value: "640425", label: "彭阳县" }] }, { value: "640500", label: "中卫市", children: [{ value: "640501", label: "市辖区" }, { value: "640502", label: "沙坡头区" }, { value: "640521", label: "中宁县" }, { value: "640522", label: "海原县" }] }] }, { value: '650000', label: '新疆', children: [{ value: "650100", label: "乌鲁木齐市", children: [{ value: "650101", label: "市辖区" }, { value: "650102", label: "天山区" }, { value: "650103", label: "沙依巴克区" }, { value: "650104", label: "新市区" }, { value: "650105", label: "水磨沟区" }, { value: "650106", label: "头屯河区" }, { value: "650107", label: "达坂城区" }, { value: "650109", label: "米东区" }, { value: "650121", label: "乌鲁木齐县" }, { value: "650171", label: "乌鲁木齐经济技术开发区" }, { value: "650172", label: "乌鲁木齐高新技术产业开发区" }] }, { value: "650200", label: "克拉玛依市", children: [{ value: "650201", label: "市辖区" }, { value: "650202", label: "独山子区" }, { value: "650203", label: "克拉玛依区" }, { value: "650204", label: "白碱滩区" }, { value: "650205", label: "乌尔禾区" }] }, { value: "650400", label: "吐鲁番市", children: [{ value: "650402", label: "高昌区" }, { value: "650421", label: "鄯善县" }, { value: "650422", label: "托克逊县" }] }, { value: "650500", label: "哈密市", children: [{ value: "650502", label: "伊州区" }, { value: "650521", label: "巴里坤哈萨克自治县" }, { value: "650522", label: "伊吾县" }] }, { value: "652300", label: "昌吉回族自治州", children: [{ value: "652301", label: "昌吉市" }, { value: "652302", label: "阜康市" }, { value: "652323", label: "呼图壁县" }, { value: "652324", label: "玛纳斯县" }, { value: "652325", label: "奇台县" }, { value: "652327", label: "吉木萨尔县" }, { value: "652328", label: "木垒哈萨克自治县" }] }, { value: "652700", label: "博尔塔拉蒙古自治州", children: [{ value: "652701", label: "博乐市" }, { value: "652702", label: "阿拉山口市" }, { value: "652722", label: "精河县" }, { value: "652723", label: "温泉县" }] }, { value: "652800", label: "巴音郭楞蒙古自治州", children: [{ value: "652801", label: "库尔勒市" }, { value: "652822", label: "轮台县" }, { value: "652823", label: "尉犁县" }, { value: "652824", label: "若羌县" }, { value: "652825", label: "且末县" }, { value: "652826", label: "焉耆回族自治县" }, { value: "652827", label: "和静县" }, { value: "652828", label: "和硕县" }, { value: "652829", label: "博湖县" }, { value: "652871", label: "库尔勒经济技术开发区" }] }, { value: "652900", label: "阿克苏地区", children: [{ value: "652901", label: "阿克苏市" }, { value: "652922", label: "温宿县" }, { value: "652923", label: "库车县" }, { value: "652924", label: "沙雅县" }, { value: "652925", label: "新和县" }, { value: "652926", label: "拜城县" }, { value: "652927", label: "乌什县" }, { value: "652928", label: "阿瓦提县" }, { value: "652929", label: "柯坪县" }] }, { value: "653000", label: "克孜勒苏柯尔克孜自治州", children: [{ value: "653001", label: "阿图什市" }, { value: "653022", label: "阿克陶县" }, { value: "653023", label: "阿合奇县" }, { value: "653024", label: "乌恰县" }] }, { value: "653100", label: "喀什地区", children: [{ value: "653101", label: "喀什市" }, { value: "653121", label: "疏附县" }, { value: "653122", label: "疏勒县" }, { value: "653123", label: "英吉沙县" }, { value: "653124", label: "泽普县" }, { value: "653125", label: "莎车县" }, { value: "653126", label: "叶城县" }, { value: "653127", label: "麦盖提县" }, { value: "653128", label: "岳普湖县" }, { value: "653129", label: "伽师县" }, { value: "653130", label: "巴楚县" }, { value: "653131", label: "塔什库尔干塔吉克自治县" }] }, { value: "653200", label: "和田地区", children: [{ value: "653201", label: "和田市" }, { value: "653221", label: "和田县" }, { value: "653222", label: "墨玉县" }, { value: "653223", label: "皮山县" }, { value: "653224", label: "洛浦县" }, { value: "653225", label: "策勒县" }, { value: "653226", label: "于田县" }, { value: "653227", label: "民丰县" }] }, { value: "654000", label: "伊犁哈萨克自治州", children: [{ value: "654002", label: "伊宁市" }, { value: "654003", label: "奎屯市" }, { value: "654004", label: "霍尔果斯市" }, { value: "654021", label: "伊宁县" }, { value: "654022", label: "察布查尔锡伯自治县" }, { value: "654023", label: "霍城县" }, { value: "654024", label: "巩留县" }, { value: "654025", label: "新源县" }, { value: "654026", label: "昭苏县" }, { value: "654027", label: "特克斯县" }, { value: "654028", label: "尼勒克县" }] }, { value: "654200", label: "塔城地区", children: [{ value: "654201", label: "塔城市" }, { value: "654202", label: "乌苏市" }, { value: "654221", label: "额敏县" }, { value: "654223", label: "沙湾县" }, { value: "654224", label: "托里县" }, { value: "654225", label: "裕民县" }, { value: "654226", label: "和布克赛尔蒙古自治县" }] }, { value: "654300", label: "阿勒泰地区", children: [{ value: "654301", label: "阿勒泰市" }, { value: "654321", label: "布尔津县" }, { value: "654322", label: "富蕴县" }, { value: "654323", label: "福海县" }, { value: "654324", label: "哈巴河县" }, { value: "654325", label: "青河县" }, { value: "654326", label: "吉木乃县" }] }, { value: "659000", label: "自治区直辖县级行政区划", children: [{ value: "659001", label: "石河子市" }, { value: "659002", label: "阿拉尔市" }, { value: "659003", label: "图木舒克市" }, { value: "659004", label: "五家渠市" }, { value: "659006", label: "铁门关市" }] }] }, { value: '660000', label: '台湾省', children: [{ value: "660100", label: "台北市", children: [{ value: "660101", label: "中正区" }, { value: "660102", label: "大同区" }, { value: "660103", label: "中山区" }, { value: "660104", label: "松山区" }, { value: "660105", label: "大安区" }, { value: "660106", label: "万华区" }, { value: "660107", label: "信义区" }, { value: "660108", label: "士林区" }, { value: "660109", label: "北投区" }, { value: "660110", label: "内湖区" }, { value: "660111", label: "南港区" }, { value: "660112", label: "文山区" }] }, { value: "660200", label: "高雄市", children: [{ value: "660201", label: "新兴区" }, { value: "660202", label: "前金区" }, { value: "660203", label: "芩雅区" }, { value: "660204", label: "盐埕区" }, { value: "660205", label: "鼓山区" }, { value: "660206", label: "旗津区" }, { value: "660207", label: "前镇区" }, { value: "660208", label: "三民区" }, { value: "660209", label: "左营区" }, { value: "660210", label: "楠梓区" }, { value: "660211", label: "小港区" }] }, { value: "660300", label: "台南市", children: [{ value: "660301", label: "中西区" }, { value: "660302", label: "东区" }, { value: "660303", label: "南区" }, { value: "660304", label: "北区" }, { value: "660305", label: "安平区" }, { value: "660306", label: "安南区" }] }, { value: "660400", label: "台中市", children: [{ value: "660401", label: "中区" }, { value: "660402", label: "东区" }, { value: "660403", label: "南区" }, { value: "660404", label: "西区" }, { value: "660405", label: "北区" }, { value: "660406", label: "北屯区" }, { value: "660407", label: "西屯区" }, { value: "660408", label: "南屯区" }] }, { value: "660500", label: "金门县", children: [{ value: "660501", label: "金门县" }] }, { value: "660600", label: "南投县", children: [{ value: "660601", label: "南投县" }] }, { value: "660700", label: "基隆市", children: [{ value: "660701", label: "仁爱区" }, { value: "660702", label: "信义区" }, { value: "660703", label: "中正区" }, { value: "660704", label: "中山区" }, { value: "660705", label: "安乐区" }, { value: "660706", label: "暖暖区" }, { value: "660707", label: "七堵区" }] }, { value: "660800", label: "新竹市", children: [{ value: "660801", label: "东区" }, { value: "660802", label: "北区" }, { value: "660803", label: "香山区" }] }, { value: "660900", label: "嘉义市", children: [{ value: "660901", label: "东区" }, { value: "660902", label: "西区" }] }, { value: "661000", label: "新北市", children: [{ value: "661001", label: "新北市" }] }, { value: "661100", label: "宜兰县", children: [{ value: "661100", label: "宜兰县" }] }, { value: "661200", label: "新竹县", children: [{ value: "661201", label: "新竹县" }] }, { value: "661300", label: "桃园县", children: [{ value: "661301", label: "桃园县" }] }, { value: "661400", label: "苗栗县", children: [{ value: "661401", label: "苗栗县" }] }, { value: "661500", label: "彰化县", children: [{ value: "661501", label: "彰化县" }] }, { value: "661600", label: "嘉义县", children: [{ value: "661601", label: "嘉义县" }] }, { value: "661700", label: "云林县", children: [{ value: "661701", label: "云林县" }] }, { value: "661800", label: "屏东县", children: [{ value: "661801", label: "屏东县" }] }, { value: "661900", label: "台东县", children: [{ value: "661901", label: "台东县" }] }, { value: "662000", label: "花莲县", children: [{ value: "662001", label: "花莲县" }] }, { value: "662100", label: "澎湖县", children: [{ value: "662101", label: "澎湖县" }] }] }, { value: '670000', label: '香港', children: [{ value: "670100", label: "香港岛", children: [{ value: "670101", label: "中西区" }, { value: "670102", label: "湾仔区" }, { value: "670103", label: "东区" }, { value: "670104", label: "南区" }] }, { value: "670200", label: "九龙半岛", children: [{ value: "670201", label: "九龙城区" }, { value: "670202", label: "油尖旺区" }, { value: "670203", label: "深水埗区" }, { value: "670204", label: "黄大仙区" }, { value: "670205", label: "观塘区" }] }, { value: "670300", label: "新界", children: [{ value: "670301", label: "北区" }, { value: "670302", label: "大埔区" }, { value: "670303", label: "沙田区" }, { value: "670304", label: "西贡区" }, { value: "670305", label: "元朗区" }, { value: "670306", label: "屯门区" }, { value: "670307", label: "荃湾区" }, { value: "670308", label: "葵青区" }, { value: "670309", label: "离岛区" }] }] }, { value: '680000', label: '澳门', children: [{ value: "680100", label: "澳门半岛", children: [{ value: "680101", label: "花地玛堂区" }, { value: "680102", label: "圣安多尼堂区" }, { value: "680103", label: "大堂区" }, { value: "680104", label: "望德堂区" }, { value: "680105", label: "风顺堂区" }] }, { value: "680200", label: "离岛", children: [{ value: "680201", label: "嘉模堂区" }, { value: "680202", label: "圣方济各堂区" }] }] }];var _default = cityData;exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map