/**
 * Framework7 6.0.3
 * Full featured mobile HTML framework for building iOS & Android apps
 * https://framework7.io/
 *
 * Copyright 2014-2021 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: January 11, 2021
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Framework7 = factory());
}(this, (function () { 'use strict';

    /**
     * SSR Window 3.0.0
     * Better handling for window object in SSR environment
     * https://github.com/nolimits4web/ssr-window
     *
     * Copyright 2020, Vladimir Kharlampidi
     *
     * Licensed under MIT
     *
     * Released on: November 9, 2020
     */

    /* eslint-disable no-param-reassign */
    function isObject(obj) {
      return obj !== null && typeof obj === 'object' && 'constructor' in obj && obj.constructor === Object;
    }

    function extend(target, src) {
      if (target === void 0) {
        target = {};
      }

      if (src === void 0) {
        src = {};
      }

      Object.keys(src).forEach(function (key) {
        if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
          extend(target[key], src[key]);
        }
      });
    }

    var ssrDocument = {
      body: {},
      addEventListener: function addEventListener() {},
      removeEventListener: function removeEventListener() {},
      activeElement: {
        blur: function blur() {},
        nodeName: ''
      },
      querySelector: function querySelector() {
        return null;
      },
      querySelectorAll: function querySelectorAll() {
        return [];
      },
      getElementById: function getElementById() {
        return null;
      },
      createEvent: function createEvent() {
        return {
          initEvent: function initEvent() {}
        };
      },
      createElement: function createElement() {
        return {
          children: [],
          childNodes: [],
          style: {},
          setAttribute: function setAttribute() {},
          getElementsByTagName: function getElementsByTagName() {
            return [];
          }
        };
      },
      createElementNS: function createElementNS() {
        return {};
      },
      importNode: function importNode() {
        return null;
      },
      location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: ''
      }
    };

    function getDocument() {
      var doc = typeof document !== 'undefined' ? document : {};
      extend(doc, ssrDocument);
      return doc;
    }

    var ssrWindow = {
      document: ssrDocument,
      navigator: {
        userAgent: ''
      },
      location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: ''
      },
      history: {
        replaceState: function replaceState() {},
        pushState: function pushState() {},
        go: function go() {},
        back: function back() {}
      },
      CustomEvent: function CustomEvent() {
        return this;
      },
      addEventListener: function addEventListener() {},
      removeEventListener: function removeEventListener() {},
      getComputedStyle: function getComputedStyle() {
        return {
          getPropertyValue: function getPropertyValue() {
            return '';
          }
        };
      },
      Image: function Image() {},
      Date: function Date() {},
      screen: {},
      setTimeout: function setTimeout() {},
      clearTimeout: function clearTimeout() {},
      matchMedia: function matchMedia() {
        return {};
      },
      requestAnimationFrame: function requestAnimationFrame(callback) {
        if (typeof setTimeout === 'undefined') {
          callback();
          return null;
        }

        return setTimeout(callback, 0);
      },
      cancelAnimationFrame: function cancelAnimationFrame(id) {
        if (typeof setTimeout === 'undefined') {
          return;
        }

        clearTimeout(id);
      }
    };

    function getWindow() {
      var win = typeof window !== 'undefined' ? window : {};
      extend(win, ssrWindow);
      return win;
    }

    /**
     * Dom7 3.0.0
     * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
     * https://framework7.io/docs/dom7.html
     *
     * Copyright 2020, Vladimir Kharlampidi
     *
     * Licensed under MIT
     *
     * Released on: November 9, 2020
     */

    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;

      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    function _construct(Parent, args, Class) {
      if (_isNativeReflectConstruct()) {
        _construct = Reflect.construct;
      } else {
        _construct = function _construct(Parent, args, Class) {
          var a = [null];
          a.push.apply(a, args);
          var Constructor = Function.bind.apply(Parent, a);
          var instance = new Constructor();
          if (Class) _setPrototypeOf(instance, Class.prototype);
          return instance;
        };
      }

      return _construct.apply(null, arguments);
    }

    function _isNativeFunction(fn) {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    }

    function _wrapNativeSuper(Class) {
      var _cache = typeof Map === "function" ? new Map() : undefined;

      _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction(Class)) return Class;

        if (typeof Class !== "function") {
          throw new TypeError("Super expression must either be null or a function");
        }

        if (typeof _cache !== "undefined") {
          if (_cache.has(Class)) return _cache.get(Class);

          _cache.set(Class, Wrapper);
        }

        function Wrapper() {
          return _construct(Class, arguments, _getPrototypeOf(this).constructor);
        }

        Wrapper.prototype = Object.create(Class.prototype, {
          constructor: {
            value: Wrapper,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        return _setPrototypeOf(Wrapper, Class);
      };

      return _wrapNativeSuper(Class);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }
    /* eslint-disable no-proto */


    function makeReactive(obj) {
      var proto = obj.__proto__;
      Object.defineProperty(obj, '__proto__', {
        get: function get() {
          return proto;
        },
        set: function set(value) {
          proto.__proto__ = value;
        }
      });
    }

    var Dom7 = /*#__PURE__*/function (_Array) {
      _inheritsLoose(Dom7, _Array);

      function Dom7(items) {
        var _this;

        _this = _Array.call.apply(_Array, [this].concat(items)) || this;
        makeReactive(_assertThisInitialized(_this));
        return _this;
      }

      return Dom7;
    }( /*#__PURE__*/_wrapNativeSuper(Array));

    function arrayFlat(arr) {
      if (arr === void 0) {
        arr = [];
      }

      var res = [];
      arr.forEach(function (el) {
        if (Array.isArray(el)) {
          res.push.apply(res, arrayFlat(el));
        } else {
          res.push(el);
        }
      });
      return res;
    }

    function arrayFilter(arr, callback) {
      return Array.prototype.filter.call(arr, callback);
    }

    function arrayUnique(arr) {
      var uniqueArray = [];

      for (var i = 0; i < arr.length; i += 1) {
        if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
      }

      return uniqueArray;
    }

    function toCamelCase(string) {
      return string.toLowerCase().replace(/-(.)/g, function (match, group) {
        return group.toUpperCase();
      });
    }

    function qsa(selector, context) {
      if (typeof selector !== 'string') {
        return [selector];
      }

      var a = [];
      var res = context.querySelectorAll(selector);

      for (var i = 0; i < res.length; i += 1) {
        a.push(res[i]);
      }

      return a;
    }

    function $(selector, context) {
      var window = getWindow();
      var document = getDocument();
      var arr = [];

      if (!context && selector instanceof Dom7) {
        return selector;
      }

      if (!selector) {
        return new Dom7(arr);
      }

      if (typeof selector === 'string') {
        var html = selector.trim();

        if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
          var toCreate = 'div';
          if (html.indexOf('<li') === 0) toCreate = 'ul';
          if (html.indexOf('<tr') === 0) toCreate = 'tbody';
          if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
          if (html.indexOf('<tbody') === 0) toCreate = 'table';
          if (html.indexOf('<option') === 0) toCreate = 'select';
          var tempParent = document.createElement(toCreate);
          tempParent.innerHTML = html;

          for (var i = 0; i < tempParent.childNodes.length; i += 1) {
            arr.push(tempParent.childNodes[i]);
          }
        } else {
          arr = qsa(selector.trim(), context || document);
        } // arr = qsa(selector, document);

      } else if (selector.nodeType || selector === window || selector === document) {
        arr.push(selector);
      } else if (Array.isArray(selector)) {
        if (selector instanceof Dom7) return selector;
        arr = selector;
      }

      return new Dom7(arrayUnique(arr));
    }

    $.fn = Dom7.prototype;

    function addClass() {
      for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
        classes[_key] = arguments[_key];
      }

      var classNames = arrayFlat(classes.map(function (c) {
        return c.split(' ');
      }));
      this.forEach(function (el) {
        var _el$classList;

        (_el$classList = el.classList).add.apply(_el$classList, classNames);
      });
      return this;
    }

    function removeClass() {
      for (var _len2 = arguments.length, classes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        classes[_key2] = arguments[_key2];
      }

      var classNames = arrayFlat(classes.map(function (c) {
        return c.split(' ');
      }));
      this.forEach(function (el) {
        var _el$classList2;

        (_el$classList2 = el.classList).remove.apply(_el$classList2, classNames);
      });
      return this;
    }

    function toggleClass() {
      for (var _len3 = arguments.length, classes = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        classes[_key3] = arguments[_key3];
      }

      var classNames = arrayFlat(classes.map(function (c) {
        return c.split(' ');
      }));
      this.forEach(function (el) {
        classNames.forEach(function (className) {
          el.classList.toggle(className);
        });
      });
    }

    function hasClass() {
      for (var _len4 = arguments.length, classes = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        classes[_key4] = arguments[_key4];
      }

      var classNames = arrayFlat(classes.map(function (c) {
        return c.split(' ');
      }));
      return arrayFilter(this, function (el) {
        return classNames.filter(function (className) {
          return el.classList.contains(className);
        }).length > 0;
      }).length > 0;
    }

    function attr(attrs, value) {
      if (arguments.length === 1 && typeof attrs === 'string') {
        // Get attr
        if (this[0]) return this[0].getAttribute(attrs);
        return undefined;
      } // Set attrs


      for (var i = 0; i < this.length; i += 1) {
        if (arguments.length === 2) {
          // String
          this[i].setAttribute(attrs, value);
        } else {
          // Object
          for (var attrName in attrs) {
            this[i][attrName] = attrs[attrName];
            this[i].setAttribute(attrName, attrs[attrName]);
          }
        }
      }

      return this;
    }

    function removeAttr(attr) {
      for (var i = 0; i < this.length; i += 1) {
        this[i].removeAttribute(attr);
      }

      return this;
    }

    function prop(props, value) {
      if (arguments.length === 1 && typeof props === 'string') {
        // Get prop
        if (this[0]) return this[0][props];
      } else {
        // Set props
        for (var i = 0; i < this.length; i += 1) {
          if (arguments.length === 2) {
            // String
            this[i][props] = value;
          } else {
            // Object
            for (var propName in props) {
              this[i][propName] = props[propName];
            }
          }
        }

        return this;
      }

      return this;
    }

    function data(key, value) {
      var el;

      if (typeof value === 'undefined') {
        el = this[0];
        if (!el) return undefined; // Get value

        if (el.dom7ElementDataStorage && key in el.dom7ElementDataStorage) {
          return el.dom7ElementDataStorage[key];
        }

        var dataKey = el.getAttribute("data-" + key);

        if (dataKey) {
          return dataKey;
        }

        return undefined;
      } // Set value


      for (var i = 0; i < this.length; i += 1) {
        el = this[i];
        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
        el.dom7ElementDataStorage[key] = value;
      }

      return this;
    }

    function removeData(key) {
      for (var i = 0; i < this.length; i += 1) {
        var el = this[i];

        if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
          el.dom7ElementDataStorage[key] = null;
          delete el.dom7ElementDataStorage[key];
        }
      }
    }

    function dataset() {
      var el = this[0];
      if (!el) return undefined;
      var dataset = {}; // eslint-disable-line

      if (el.dataset) {
        for (var dataKey in el.dataset) {
          dataset[dataKey] = el.dataset[dataKey];
        }
      } else {
        for (var i = 0; i < el.attributes.length; i += 1) {
          var _attr = el.attributes[i];

          if (_attr.name.indexOf('data-') >= 0) {
            dataset[toCamelCase(_attr.name.split('data-')[1])] = _attr.value;
          }
        }
      }

      for (var key in dataset) {
        if (dataset[key] === 'false') dataset[key] = false;else if (dataset[key] === 'true') dataset[key] = true;else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] *= 1;
      }

      return dataset;
    }

    function val(value) {
      if (typeof value === 'undefined') {
        // get value
        var el = this[0];
        if (!el) return undefined;

        if (el.multiple && el.nodeName.toLowerCase() === 'select') {
          var values = [];

          for (var i = 0; i < el.selectedOptions.length; i += 1) {
            values.push(el.selectedOptions[i].value);
          }

          return values;
        }

        return el.value;
      } // set value


      for (var _i = 0; _i < this.length; _i += 1) {
        var _el = this[_i];

        if (Array.isArray(value) && _el.multiple && _el.nodeName.toLowerCase() === 'select') {
          for (var j = 0; j < _el.options.length; j += 1) {
            _el.options[j].selected = value.indexOf(_el.options[j].value) >= 0;
          }
        } else {
          _el.value = value;
        }
      }

      return this;
    }

    function value(value) {
      return this.val(value);
    }

    function transform(transform) {
      for (var i = 0; i < this.length; i += 1) {
        this[i].style.transform = transform;
      }

      return this;
    }

    function transition(duration) {
      for (var i = 0; i < this.length; i += 1) {
        this[i].style.transitionDuration = typeof duration !== 'string' ? duration + "ms" : duration;
      }

      return this;
    }

    function on() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      var eventType = args[0],
          targetSelector = args[1],
          listener = args[2],
          capture = args[3];

      if (typeof args[1] === 'function') {
        eventType = args[0];
        listener = args[1];
        capture = args[2];
        targetSelector = undefined;
      }

      if (!capture) capture = false;

      function handleLiveEvent(e) {
        var target = e.target;
        if (!target) return;
        var eventData = e.target.dom7EventData || [];

        if (eventData.indexOf(e) < 0) {
          eventData.unshift(e);
        }

        if ($(target).is(targetSelector)) listener.apply(target, eventData);else {
          var _parents = $(target).parents(); // eslint-disable-line


          for (var k = 0; k < _parents.length; k += 1) {
            if ($(_parents[k]).is(targetSelector)) listener.apply(_parents[k], eventData);
          }
        }
      }

      function handleEvent(e) {
        var eventData = e && e.target ? e.target.dom7EventData || [] : [];

        if (eventData.indexOf(e) < 0) {
          eventData.unshift(e);
        }

        listener.apply(this, eventData);
      }

      var events = eventType.split(' ');
      var j;

      for (var i = 0; i < this.length; i += 1) {
        var el = this[i];

        if (!targetSelector) {
          for (j = 0; j < events.length; j += 1) {
            var event = events[j];
            if (!el.dom7Listeners) el.dom7Listeners = {};
            if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
            el.dom7Listeners[event].push({
              listener: listener,
              proxyListener: handleEvent
            });
            el.addEventListener(event, handleEvent, capture);
          }
        } else {
          // Live events
          for (j = 0; j < events.length; j += 1) {
            var _event = events[j];
            if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
            if (!el.dom7LiveListeners[_event]) el.dom7LiveListeners[_event] = [];

            el.dom7LiveListeners[_event].push({
              listener: listener,
              proxyListener: handleLiveEvent
            });

            el.addEventListener(_event, handleLiveEvent, capture);
          }
        }
      }

      return this;
    }

    function off() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      var eventType = args[0],
          targetSelector = args[1],
          listener = args[2],
          capture = args[3];

      if (typeof args[1] === 'function') {
        eventType = args[0];
        listener = args[1];
        capture = args[2];
        targetSelector = undefined;
      }

      if (!capture) capture = false;
      var events = eventType.split(' ');

      for (var i = 0; i < events.length; i += 1) {
        var event = events[i];

        for (var j = 0; j < this.length; j += 1) {
          var el = this[j];
          var handlers = void 0;

          if (!targetSelector && el.dom7Listeners) {
            handlers = el.dom7Listeners[event];
          } else if (targetSelector && el.dom7LiveListeners) {
            handlers = el.dom7LiveListeners[event];
          }

          if (handlers && handlers.length) {
            for (var k = handlers.length - 1; k >= 0; k -= 1) {
              var handler = handlers[k];

              if (listener && handler.listener === listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              } else if (!listener) {
                el.removeEventListener(event, handler.proxyListener, capture);
                handlers.splice(k, 1);
              }
            }
          }
        }
      }

      return this;
    }

    function once() {
      var dom = this;

      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      var eventName = args[0],
          targetSelector = args[1],
          listener = args[2],
          capture = args[3];

      if (typeof args[1] === 'function') {
        eventName = args[0];
        listener = args[1];
        capture = args[2];
        targetSelector = undefined;
      }

      function onceHandler() {
        for (var _len8 = arguments.length, eventArgs = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          eventArgs[_key8] = arguments[_key8];
        }

        listener.apply(this, eventArgs);
        dom.off(eventName, targetSelector, onceHandler, capture);

        if (onceHandler.dom7proxy) {
          delete onceHandler.dom7proxy;
        }
      }

      onceHandler.dom7proxy = listener;
      return dom.on(eventName, targetSelector, onceHandler, capture);
    }

    function trigger() {
      var window = getWindow();

      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      var events = args[0].split(' ');
      var eventData = args[1];

      for (var i = 0; i < events.length; i += 1) {
        var event = events[i];

        for (var j = 0; j < this.length; j += 1) {
          var el = this[j];

          if (window.CustomEvent) {
            var evt = new window.CustomEvent(event, {
              detail: eventData,
              bubbles: true,
              cancelable: true
            });
            el.dom7EventData = args.filter(function (data, dataIndex) {
              return dataIndex > 0;
            });
            el.dispatchEvent(evt);
            el.dom7EventData = [];
            delete el.dom7EventData;
          }
        }
      }

      return this;
    }

    function transitionEnd(callback) {
      var dom = this;

      function fireCallBack(e) {
        if (e.target !== this) return;
        callback.call(this, e);
        dom.off('transitionend', fireCallBack);
      }

      if (callback) {
        dom.on('transitionend', fireCallBack);
      }

      return this;
    }

    function animationEnd(callback) {
      var dom = this;

      function fireCallBack(e) {
        if (e.target !== this) return;
        callback.call(this, e);
        dom.off('animationend', fireCallBack);
      }

      if (callback) {
        dom.on('animationend', fireCallBack);
      }

      return this;
    }

    function width() {
      var window = getWindow();

      if (this[0] === window) {
        return window.innerWidth;
      }

      if (this.length > 0) {
        return parseFloat(this.css('width'));
      }

      return null;
    }

    function outerWidth(includeMargins) {
      if (this.length > 0) {
        if (includeMargins) {
          var _styles = this.styles();

          return this[0].offsetWidth + parseFloat(_styles.getPropertyValue('margin-right')) + parseFloat(_styles.getPropertyValue('margin-left'));
        }

        return this[0].offsetWidth;
      }

      return null;
    }

    function height() {
      var window = getWindow();

      if (this[0] === window) {
        return window.innerHeight;
      }

      if (this.length > 0) {
        return parseFloat(this.css('height'));
      }

      return null;
    }

    function outerHeight(includeMargins) {
      if (this.length > 0) {
        if (includeMargins) {
          var _styles2 = this.styles();

          return this[0].offsetHeight + parseFloat(_styles2.getPropertyValue('margin-top')) + parseFloat(_styles2.getPropertyValue('margin-bottom'));
        }

        return this[0].offsetHeight;
      }

      return null;
    }

    function offset() {
      if (this.length > 0) {
        var window = getWindow();
        var document = getDocument();
        var el = this[0];
        var box = el.getBoundingClientRect();
        var body = document.body;
        var clientTop = el.clientTop || body.clientTop || 0;
        var clientLeft = el.clientLeft || body.clientLeft || 0;
        var scrollTop = el === window ? window.scrollY : el.scrollTop;
        var scrollLeft = el === window ? window.scrollX : el.scrollLeft;
        return {
          top: box.top + scrollTop - clientTop,
          left: box.left + scrollLeft - clientLeft
        };
      }

      return null;
    }

    function hide() {
      for (var i = 0; i < this.length; i += 1) {
        this[i].style.display = 'none';
      }

      return this;
    }

    function show() {
      var window = getWindow();

      for (var i = 0; i < this.length; i += 1) {
        var el = this[i];

        if (el.style.display === 'none') {
          el.style.display = '';
        }

        if (window.getComputedStyle(el, null).getPropertyValue('display') === 'none') {
          // Still not visible
          el.style.display = 'block';
        }
      }

      return this;
    }

    function styles() {
      var window = getWindow();
      if (this[0]) return window.getComputedStyle(this[0], null);
      return {};
    }

    function css(props, value) {
      var window = getWindow();
      var i;

      if (arguments.length === 1) {
        if (typeof props === 'string') {
          // .css('width')
          if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
        } else {
          // .css({ width: '100px' })
          for (i = 0; i < this.length; i += 1) {
            for (var _prop in props) {
              this[i].style[_prop] = props[_prop];
            }
          }

          return this;
        }
      }

      if (arguments.length === 2 && typeof props === 'string') {
        // .css('width', '100px')
        for (i = 0; i < this.length; i += 1) {
          this[i].style[props] = value;
        }

        return this;
      }

      return this;
    }

    function each(callback) {
      if (!callback) return this;
      this.forEach(function (el, index) {
        callback.apply(el, [el, index]);
      });
      return this;
    }

    function filter(callback) {
      var result = arrayFilter(this, callback);
      return $(result);
    }

    function html(html) {
      if (typeof html === 'undefined') {
        return this[0] ? this[0].innerHTML : null;
      }

      for (var i = 0; i < this.length; i += 1) {
        this[i].innerHTML = html;
      }

      return this;
    }

    function text(text) {
      if (typeof text === 'undefined') {
        return this[0] ? this[0].textContent.trim() : null;
      }

      for (var i = 0; i < this.length; i += 1) {
        this[i].textContent = text;
      }

      return this;
    }

    function is(selector) {
      var window = getWindow();
      var document = getDocument();
      var el = this[0];
      var compareWith;
      var i;
      if (!el || typeof selector === 'undefined') return false;

      if (typeof selector === 'string') {
        if (el.matches) return el.matches(selector);
        if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
        if (el.msMatchesSelector) return el.msMatchesSelector(selector);
        compareWith = $(selector);

        for (i = 0; i < compareWith.length; i += 1) {
          if (compareWith[i] === el) return true;
        }

        return false;
      }

      if (selector === document) {
        return el === document;
      }

      if (selector === window) {
        return el === window;
      }

      if (selector.nodeType || selector instanceof Dom7) {
        compareWith = selector.nodeType ? [selector] : selector;

        for (i = 0; i < compareWith.length; i += 1) {
          if (compareWith[i] === el) return true;
        }

        return false;
      }

      return false;
    }

    function index() {
      var child = this[0];
      var i;

      if (child) {
        i = 0; // eslint-disable-next-line

        while ((child = child.previousSibling) !== null) {
          if (child.nodeType === 1) i += 1;
        }

        return i;
      }

      return undefined;
    }

    function eq(index) {
      if (typeof index === 'undefined') return this;
      var length = this.length;

      if (index > length - 1) {
        return $([]);
      }

      if (index < 0) {
        var returnIndex = length + index;
        if (returnIndex < 0) return $([]);
        return $([this[returnIndex]]);
      }

      return $([this[index]]);
    }

    function append() {
      var newChild;
      var document = getDocument();

      for (var k = 0; k < arguments.length; k += 1) {
        newChild = k < 0 || arguments.length <= k ? undefined : arguments[k];

        for (var i = 0; i < this.length; i += 1) {
          if (typeof newChild === 'string') {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = newChild;

            while (tempDiv.firstChild) {
              this[i].appendChild(tempDiv.firstChild);
            }
          } else if (newChild instanceof Dom7) {
            for (var j = 0; j < newChild.length; j += 1) {
              this[i].appendChild(newChild[j]);
            }
          } else {
            this[i].appendChild(newChild);
          }
        }
      }

      return this;
    }

    function appendTo(parent) {
      $(parent).append(this);
      return this;
    }

    function prepend(newChild) {
      var document = getDocument();
      var i;
      var j;

      for (i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;

          for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
          }
        } else if (newChild instanceof Dom7) {
          for (j = 0; j < newChild.length; j += 1) {
            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
          }
        } else {
          this[i].insertBefore(newChild, this[i].childNodes[0]);
        }
      }

      return this;
    }

    function prependTo(parent) {
      $(parent).prepend(this);
      return this;
    }

    function insertBefore(selector) {
      var before = $(selector);

      for (var i = 0; i < this.length; i += 1) {
        if (before.length === 1) {
          before[0].parentNode.insertBefore(this[i], before[0]);
        } else if (before.length > 1) {
          for (var j = 0; j < before.length; j += 1) {
            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
          }
        }
      }
    }

    function insertAfter(selector) {
      var after = $(selector);

      for (var i = 0; i < this.length; i += 1) {
        if (after.length === 1) {
          after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
        } else if (after.length > 1) {
          for (var j = 0; j < after.length; j += 1) {
            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
          }
        }
      }
    }

    function next(selector) {
      if (this.length > 0) {
        if (selector) {
          if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
            return $([this[0].nextElementSibling]);
          }

          return $([]);
        }

        if (this[0].nextElementSibling) return $([this[0].nextElementSibling]);
        return $([]);
      }

      return $([]);
    }

    function nextAll(selector) {
      var nextEls = [];
      var el = this[0];
      if (!el) return $([]);

      while (el.nextElementSibling) {
        var _next = el.nextElementSibling; // eslint-disable-line

        if (selector) {
          if ($(_next).is(selector)) nextEls.push(_next);
        } else nextEls.push(_next);

        el = _next;
      }

      return $(nextEls);
    }

    function prev(selector) {
      if (this.length > 0) {
        var el = this[0];

        if (selector) {
          if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
            return $([el.previousElementSibling]);
          }

          return $([]);
        }

        if (el.previousElementSibling) return $([el.previousElementSibling]);
        return $([]);
      }

      return $([]);
    }

    function prevAll(selector) {
      var prevEls = [];
      var el = this[0];
      if (!el) return $([]);

      while (el.previousElementSibling) {
        var _prev = el.previousElementSibling; // eslint-disable-line

        if (selector) {
          if ($(_prev).is(selector)) prevEls.push(_prev);
        } else prevEls.push(_prev);

        el = _prev;
      }

      return $(prevEls);
    }

    function siblings(selector) {
      return this.nextAll(selector).add(this.prevAll(selector));
    }

    function parent(selector) {
      var parents = []; // eslint-disable-line

      for (var i = 0; i < this.length; i += 1) {
        if (this[i].parentNode !== null) {
          if (selector) {
            if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
          } else {
            parents.push(this[i].parentNode);
          }
        }
      }

      return $(parents);
    }

    function parents(selector) {
      var parents = []; // eslint-disable-line

      for (var i = 0; i < this.length; i += 1) {
        var _parent = this[i].parentNode; // eslint-disable-line

        while (_parent) {
          if (selector) {
            if ($(_parent).is(selector)) parents.push(_parent);
          } else {
            parents.push(_parent);
          }

          _parent = _parent.parentNode;
        }
      }

      return $(parents);
    }

    function closest(selector) {
      var closest = this; // eslint-disable-line

      if (typeof selector === 'undefined') {
        return $([]);
      }

      if (!closest.is(selector)) {
        closest = closest.parents(selector).eq(0);
      }

      return closest;
    }

    function find(selector) {
      var foundElements = [];

      for (var i = 0; i < this.length; i += 1) {
        var found = this[i].querySelectorAll(selector);

        for (var j = 0; j < found.length; j += 1) {
          foundElements.push(found[j]);
        }
      }

      return $(foundElements);
    }

    function children(selector) {
      var children = []; // eslint-disable-line

      for (var i = 0; i < this.length; i += 1) {
        var childNodes = this[i].children;

        for (var j = 0; j < childNodes.length; j += 1) {
          if (!selector || $(childNodes[j]).is(selector)) {
            children.push(childNodes[j]);
          }
        }
      }

      return $(children);
    }

    function remove() {
      for (var i = 0; i < this.length; i += 1) {
        if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
      }

      return this;
    }

    function detach() {
      return this.remove();
    }

    function add() {
      var dom = this;
      var i;
      var j;

      for (var _len10 = arguments.length, els = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        els[_key10] = arguments[_key10];
      }

      for (i = 0; i < els.length; i += 1) {
        var toAdd = $(els[i]);

        for (j = 0; j < toAdd.length; j += 1) {
          dom.push(toAdd[j]);
        }
      }

      return dom;
    }

    function empty() {
      for (var i = 0; i < this.length; i += 1) {
        var el = this[i];

        if (el.nodeType === 1) {
          for (var j = 0; j < el.childNodes.length; j += 1) {
            if (el.childNodes[j].parentNode) {
              el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
            }
          }

          el.textContent = '';
        }
      }

      return this;
    }

    function scrollTo() {
      var window = getWindow();

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var left = args[0],
          top = args[1],
          duration = args[2],
          easing = args[3],
          callback = args[4];

      if (args.length === 4 && typeof easing === 'function') {
        callback = easing;
        left = args[0];
        top = args[1];
        duration = args[2];
        callback = args[3];
        easing = args[4];
      }

      if (typeof easing === 'undefined') easing = 'swing';
      return this.each(function animate() {
        var el = this;
        var currentTop;
        var currentLeft;
        var maxTop;
        var maxLeft;
        var newTop;
        var newLeft;
        var scrollTop; // eslint-disable-line

        var scrollLeft; // eslint-disable-line

        var animateTop = top > 0 || top === 0;
        var animateLeft = left > 0 || left === 0;

        if (typeof easing === 'undefined') {
          easing = 'swing';
        }

        if (animateTop) {
          currentTop = el.scrollTop;

          if (!duration) {
            el.scrollTop = top;
          }
        }

        if (animateLeft) {
          currentLeft = el.scrollLeft;

          if (!duration) {
            el.scrollLeft = left;
          }
        }

        if (!duration) return;

        if (animateTop) {
          maxTop = el.scrollHeight - el.offsetHeight;
          newTop = Math.max(Math.min(top, maxTop), 0);
        }

        if (animateLeft) {
          maxLeft = el.scrollWidth - el.offsetWidth;
          newLeft = Math.max(Math.min(left, maxLeft), 0);
        }

        var startTime = null;
        if (animateTop && newTop === currentTop) animateTop = false;
        if (animateLeft && newLeft === currentLeft) animateLeft = false;

        function render(time) {
          if (time === void 0) {
            time = new Date().getTime();
          }

          if (startTime === null) {
            startTime = time;
          }

          var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
          var easeProgress = easing === 'linear' ? progress : 0.5 - Math.cos(progress * Math.PI) / 2;
          var done;
          if (animateTop) scrollTop = currentTop + easeProgress * (newTop - currentTop);
          if (animateLeft) scrollLeft = currentLeft + easeProgress * (newLeft - currentLeft);

          if (animateTop && newTop > currentTop && scrollTop >= newTop) {
            el.scrollTop = newTop;
            done = true;
          }

          if (animateTop && newTop < currentTop && scrollTop <= newTop) {
            el.scrollTop = newTop;
            done = true;
          }

          if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft) {
            el.scrollLeft = newLeft;
            done = true;
          }

          if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft) {
            el.scrollLeft = newLeft;
            done = true;
          }

          if (done) {
            if (callback) callback();
            return;
          }

          if (animateTop) el.scrollTop = scrollTop;
          if (animateLeft) el.scrollLeft = scrollLeft;
          window.requestAnimationFrame(render);
        }

        window.requestAnimationFrame(render);
      });
    } // scrollTop(top, duration, easing, callback) {


    function scrollTop() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var top = args[0],
          duration = args[1],
          easing = args[2],
          callback = args[3];

      if (args.length === 3 && typeof easing === 'function') {
        top = args[0];
        duration = args[1];
        callback = args[2];
        easing = args[3];
      }

      var dom = this;

      if (typeof top === 'undefined') {
        if (dom.length > 0) return dom[0].scrollTop;
        return null;
      }

      return dom.scrollTo(undefined, top, duration, easing, callback);
    }

    function scrollLeft() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var left = args[0],
          duration = args[1],
          easing = args[2],
          callback = args[3];

      if (args.length === 3 && typeof easing === 'function') {
        left = args[0];
        duration = args[1];
        callback = args[2];
        easing = args[3];
      }

      var dom = this;

      if (typeof left === 'undefined') {
        if (dom.length > 0) return dom[0].scrollLeft;
        return null;
      }

      return dom.scrollTo(left, undefined, duration, easing, callback);
    }

    function animate(initialProps, initialParams) {
      var window = getWindow();
      var els = this;
      var a = {
        props: Object.assign({}, initialProps),
        params: Object.assign({
          duration: 300,
          easing: 'swing' // or 'linear'

          /* Callbacks
          begin(elements)
          complete(elements)
          progress(elements, complete, remaining, start, tweenValue)
          */

        }, initialParams),
        elements: els,
        animating: false,
        que: [],
        easingProgress: function easingProgress(easing, progress) {
          if (easing === 'swing') {
            return 0.5 - Math.cos(progress * Math.PI) / 2;
          }

          if (typeof easing === 'function') {
            return easing(progress);
          }

          return progress;
        },
        stop: function stop() {
          if (a.frameId) {
            window.cancelAnimationFrame(a.frameId);
          }

          a.animating = false;
          a.elements.each(function (el) {
            var element = el;
            delete element.dom7AnimateInstance;
          });
          a.que = [];
        },
        done: function done(complete) {
          a.animating = false;
          a.elements.each(function (el) {
            var element = el;
            delete element.dom7AnimateInstance;
          });
          if (complete) complete(els);

          if (a.que.length > 0) {
            var que = a.que.shift();
            a.animate(que[0], que[1]);
          }
        },
        animate: function animate(props, params) {
          if (a.animating) {
            a.que.push([props, params]);
            return a;
          }

          var elements = []; // Define & Cache Initials & Units

          a.elements.each(function (el, index) {
            var initialFullValue;
            var initialValue;
            var unit;
            var finalValue;
            var finalFullValue;
            if (!el.dom7AnimateInstance) a.elements[index].dom7AnimateInstance = a;
            elements[index] = {
              container: el
            };
            Object.keys(props).forEach(function (prop) {
              initialFullValue = window.getComputedStyle(el, null).getPropertyValue(prop).replace(',', '.');
              initialValue = parseFloat(initialFullValue);
              unit = initialFullValue.replace(initialValue, '');
              finalValue = parseFloat(props[prop]);
              finalFullValue = props[prop] + unit;
              elements[index][prop] = {
                initialFullValue: initialFullValue,
                initialValue: initialValue,
                unit: unit,
                finalValue: finalValue,
                finalFullValue: finalFullValue,
                currentValue: initialValue
              };
            });
          });
          var startTime = null;
          var time;
          var elementsDone = 0;
          var propsDone = 0;
          var done;
          var began = false;
          a.animating = true;

          function render() {
            time = new Date().getTime();
            var progress;
            var easeProgress; // let el;

            if (!began) {
              began = true;
              if (params.begin) params.begin(els);
            }

            if (startTime === null) {
              startTime = time;
            }

            if (params.progress) {
              // eslint-disable-next-line
              params.progress(els, Math.max(Math.min((time - startTime) / params.duration, 1), 0), startTime + params.duration - time < 0 ? 0 : startTime + params.duration - time, startTime);
            }

            elements.forEach(function (element) {
              var el = element;
              if (done || el.done) return;
              Object.keys(props).forEach(function (prop) {
                if (done || el.done) return;
                progress = Math.max(Math.min((time - startTime) / params.duration, 1), 0);
                easeProgress = a.easingProgress(params.easing, progress);
                var _el$prop = el[prop],
                    initialValue = _el$prop.initialValue,
                    finalValue = _el$prop.finalValue,
                    unit = _el$prop.unit;
                el[prop].currentValue = initialValue + easeProgress * (finalValue - initialValue);
                var currentValue = el[prop].currentValue;

                if (finalValue > initialValue && currentValue >= finalValue || finalValue < initialValue && currentValue <= finalValue) {
                  el.container.style[prop] = finalValue + unit;
                  propsDone += 1;

                  if (propsDone === Object.keys(props).length) {
                    el.done = true;
                    elementsDone += 1;
                  }

                  if (elementsDone === elements.length) {
                    done = true;
                  }
                }

                if (done) {
                  a.done(params.complete);
                  return;
                }

                el.container.style[prop] = currentValue + unit;
              });
            });
            if (done) return; // Then call

            a.frameId = window.requestAnimationFrame(render);
          }

          a.frameId = window.requestAnimationFrame(render);
          return a;
        }
      };

      if (a.elements.length === 0) {
        return els;
      }

      var animateInstance;

      for (var i = 0; i < a.elements.length; i += 1) {
        if (a.elements[i].dom7AnimateInstance) {
          animateInstance = a.elements[i].dom7AnimateInstance;
        } else a.elements[i].dom7AnimateInstance = a;
      }

      if (!animateInstance) {
        animateInstance = a;
      }

      if (initialProps === 'stop') {
        animateInstance.stop();
      } else {
        animateInstance.animate(a.props, a.params);
      }

      return els;
    }

    function stop() {
      var els = this;

      for (var i = 0; i < els.length; i += 1) {
        if (els[i].dom7AnimateInstance) {
          els[i].dom7AnimateInstance.stop();
        }
      }
    }

    var noTrigger = 'resize scroll'.split(' ');

    function shortcut(name) {
      function eventHandler() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (typeof args[0] === 'undefined') {
          for (var i = 0; i < this.length; i += 1) {
            if (noTrigger.indexOf(name) < 0) {
              if (name in this[i]) this[i][name]();else {
                $(this[i]).trigger(name);
              }
            }
          }

          return this;
        }

        return this.on.apply(this, [name].concat(args));
      }

      return eventHandler;
    }

    var click = shortcut('click');
    var blur = shortcut('blur');
    var focus = shortcut('focus');
    var focusin = shortcut('focusin');
    var focusout = shortcut('focusout');
    var keyup = shortcut('keyup');
    var keydown = shortcut('keydown');
    var keypress = shortcut('keypress');
    var submit = shortcut('submit');
    var change = shortcut('change');
    var mousedown = shortcut('mousedown');
    var mousemove = shortcut('mousemove');
    var mouseup = shortcut('mouseup');
    var mouseenter = shortcut('mouseenter');
    var mouseleave = shortcut('mouseleave');
    var mouseout = shortcut('mouseout');
    var mouseover = shortcut('mouseover');
    var touchstart = shortcut('touchstart');
    var touchend = shortcut('touchend');
    var touchmove = shortcut('touchmove');
    var resize = shortcut('resize');
    var scroll = shortcut('scroll');

    var methods = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': $,
        $: $,
        add: add,
        addClass: addClass,
        animate: animate,
        animationEnd: animationEnd,
        append: append,
        appendTo: appendTo,
        attr: attr,
        blur: blur,
        change: change,
        children: children,
        click: click,
        closest: closest,
        css: css,
        data: data,
        dataset: dataset,
        detach: detach,
        each: each,
        empty: empty,
        eq: eq,
        filter: filter,
        find: find,
        focus: focus,
        focusin: focusin,
        focusout: focusout,
        hasClass: hasClass,
        height: height,
        hide: hide,
        html: html,
        index: index,
        insertAfter: insertAfter,
        insertBefore: insertBefore,
        is: is,
        keydown: keydown,
        keypress: keypress,
        keyup: keyup,
        mousedown: mousedown,
        mouseenter: mouseenter,
        mouseleave: mouseleave,
        mousemove: mousemove,
        mouseout: mouseout,
        mouseover: mouseover,
        mouseup: mouseup,
        next: next,
        nextAll: nextAll,
        off: off,
        offset: offset,
        on: on,
        once: once,
        outerHeight: outerHeight,
        outerWidth: outerWidth,
        parent: parent,
        parents: parents,
        prepend: prepend,
        prependTo: prependTo,
        prev: prev,
        prevAll: prevAll,
        prop: prop,
        remove: remove,
        removeAttr: removeAttr,
        removeClass: removeClass,
        removeData: removeData,
        resize: resize,
        scroll: scroll,
        scrollLeft: scrollLeft,
        scrollTo: scrollTo,
        scrollTop: scrollTop,
        show: show,
        siblings: siblings,
        stop: stop,
        styles: styles,
        submit: submit,
        text: text,
        toggleClass: toggleClass,
        touchend: touchend,
        touchmove: touchmove,
        touchstart: touchstart,
        transform: transform,
        transition: transition,
        transitionEnd: transitionEnd,
        trigger: trigger,
        val: val,
        value: value,
        width: width
    });

    Object.keys(methods).forEach(function (methodName) {
      if (methodName === '$') return;
      $.fn[methodName] = methods[methodName];
    });
    var $$1 = $;

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _extends() {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      return _extends.apply(this, arguments);
    }

    function _inheritsLoose$1(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }

    function _getPrototypeOf$1(o) {
      _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf$1(o);
    }

    function _setPrototypeOf$1(o, p) {
      _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf$1(o, p);
    }

    function _isNativeReflectConstruct$1() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;

      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    function _construct$1(Parent, args, Class) {
      if (_isNativeReflectConstruct$1()) {
        _construct$1 = Reflect.construct;
      } else {
        _construct$1 = function _construct(Parent, args, Class) {
          var a = [null];
          a.push.apply(a, args);
          var Constructor = Function.bind.apply(Parent, a);
          var instance = new Constructor();
          if (Class) _setPrototypeOf$1(instance, Class.prototype);
          return instance;
        };
      }

      return _construct$1.apply(null, arguments);
    }

    function _isNativeFunction$1(fn) {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    }

    function _wrapNativeSuper$1(Class) {
      var _cache = typeof Map === "function" ? new Map() : undefined;

      _wrapNativeSuper$1 = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction$1(Class)) return Class;

        if (typeof Class !== "function") {
          throw new TypeError("Super expression must either be null or a function");
        }

        if (typeof _cache !== "undefined") {
          if (_cache.has(Class)) return _cache.get(Class);

          _cache.set(Class, Wrapper);
        }

        function Wrapper() {
          return _construct$1(Class, arguments, _getPrototypeOf$1(this).constructor);
        }

        Wrapper.prototype = Object.create(Class.prototype, {
          constructor: {
            value: Wrapper,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        return _setPrototypeOf$1(Wrapper, Class);
      };

      return _wrapNativeSuper$1(Class);
    }

    function _assertThisInitialized$1(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _readOnlyError(name) {
      throw new Error("\"" + name + "\" is read-only");
    }

    var uniqueNum = 0;
    function uniqueNumber() {
      uniqueNum += 1;
      return uniqueNum;
    }
    function id(mask, map) {
      if (mask === void 0) {
        mask = 'xxxxxxxxxx';
      }

      if (map === void 0) {
        map = '0123456789abcdef';
      }

      var length = map.length;
      return mask.replace(/x/g, function () {
        return map[Math.floor(Math.random() * length)];
      });
    }
    var mdPreloaderContent = "\n  <span class=\"preloader-inner\">\n    <svg viewBox=\"0 0 36 36\">\n      <circle cx=\"18\" cy=\"18\" r=\"16\"></circle>\n    </svg>\n  </span>\n".trim();
    var iosPreloaderContent = ("\n  <span class=\"preloader-inner\">\n    " + [0, 1, 2, 3, 4, 5, 6, 7].map(function () {
      return '<span class="preloader-inner-line"></span>';
    }).join('') + "\n  </span>\n").trim();
    var auroraPreloaderContent = "\n  <span class=\"preloader-inner\">\n    <span class=\"preloader-inner-circle\"></span>\n  </span>\n";
    function eventNameToColonCase(eventName) {
      var hasColon;
      return eventName.split('').map(function (char, index) {
        if (char.match(/[A-Z]/) && index !== 0 && !hasColon) {
          hasColon = true;
          return ":" + char.toLowerCase();
        }

        return char.toLowerCase();
      }).join('');
    }
    function deleteProps(obj) {
      var object = obj;
      Object.keys(object).forEach(function (key) {
        try {
          object[key] = null;
        } catch (e) {// no setter for object
        }

        try {
          delete object[key];
        } catch (e) {// something got wrong
        }
      });
    }
    function requestAnimationFrame(callback) {
      var window = getWindow();
      return window.requestAnimationFrame(callback);
    }
    function cancelAnimationFrame(frameId) {
      var window = getWindow();
      return window.cancelAnimationFrame(frameId);
    }
    function nextTick(callback, delay) {
      if (delay === void 0) {
        delay = 0;
      }

      return setTimeout(callback, delay);
    }
    function nextFrame(callback) {
      return requestAnimationFrame(function () {
        requestAnimationFrame(callback);
      });
    }
    function now() {
      return Date.now();
    }
    function parseUrlQuery(url) {
      var window = getWindow();
      var query = {};
      var urlToParse = url || window.location.href;
      var i;
      var params;
      var param;
      var length;

      if (typeof urlToParse === 'string' && urlToParse.length) {
        urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
        params = urlToParse.split('&').filter(function (paramsPart) {
          return paramsPart !== '';
        });
        length = params.length;

        for (i = 0; i < length; i += 1) {
          param = params[i].replace(/#\S+/g, '').split('=');
          query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param.slice(1).join('=')) || '';
        }
      }

      return query;
    }
    function getTranslate(el, axis) {
      if (axis === void 0) {
        axis = 'x';
      }

      var window = getWindow();
      var matrix;
      var curTransform;
      var transformMatrix;
      var curStyle = window.getComputedStyle(el, null);

      if (window.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;

        if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(function (a) {
            return a.replace(',', '.');
          }).join(', ');
        } // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case


        transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
      } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
      }

      if (axis === 'x') {
        // Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; // Crazy IE10 Matrix
        else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); // Normal Browsers
          else curTransform = parseFloat(matrix[4]);
      }

      if (axis === 'y') {
        // Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; // Crazy IE10 Matrix
        else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); // Normal Browsers
          else curTransform = parseFloat(matrix[5]);
      }

      return curTransform || 0;
    }
    function serializeObject(obj, parents) {
      if (parents === void 0) {
        parents = [];
      }

      if (typeof obj === 'string') return obj;
      var resultArray = [];
      var separator = '&';
      var newParents;

      function varName(name) {
        if (parents.length > 0) {
          var parentParts = '';

          for (var j = 0; j < parents.length; j += 1) {
            if (j === 0) parentParts += parents[j];else parentParts += "[" + encodeURIComponent(parents[j]) + "]";
          }

          return parentParts + "[" + encodeURIComponent(name) + "]";
        }

        return encodeURIComponent(name);
      }

      function varValue(value) {
        return encodeURIComponent(value);
      }

      Object.keys(obj).forEach(function (prop) {
        var toPush;

        if (Array.isArray(obj[prop])) {
          toPush = [];

          for (var i = 0; i < obj[prop].length; i += 1) {
            if (!Array.isArray(obj[prop][i]) && typeof obj[prop][i] === 'object') {
              newParents = parents.slice();
              newParents.push(prop);
              newParents.push(String(i));
              toPush.push(serializeObject(obj[prop][i], newParents));
            } else {
              toPush.push(varName(prop) + "[]=" + varValue(obj[prop][i]));
            }
          }

          if (toPush.length > 0) resultArray.push(toPush.join(separator));
        } else if (obj[prop] === null || obj[prop] === '') {
          resultArray.push(varName(prop) + "=");
        } else if (typeof obj[prop] === 'object') {
          // Object, convert to named array
          newParents = parents.slice();
          newParents.push(prop);
          toPush = serializeObject(obj[prop], newParents);
          if (toPush !== '') resultArray.push(toPush);
        } else if (typeof obj[prop] !== 'undefined' && obj[prop] !== '') {
          // Should be string or plain value
          resultArray.push(varName(prop) + "=" + varValue(obj[prop]));
        } else if (obj[prop] === '') resultArray.push(varName(prop));
      });
      return resultArray.join(separator);
    }
    function isObject$1(o) {
      return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
    }
    function merge() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var to = args[0];
      args.splice(0, 1);
      var from = args;

      for (var i = 0; i < from.length; i += 1) {
        var nextSource = args[i];

        if (nextSource !== undefined && nextSource !== null) {
          var keysArray = Object.keys(Object(nextSource));

          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

            if (desc !== undefined && desc.enumerable) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    }
    function extend$1() {
      var deep = true;
      var to;
      var from;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (typeof args[0] === 'boolean') {
        deep = args[0];
        to = args[1];
        args.splice(0, 2);
        from = args;
      } else {
        to = args[0];
        args.splice(0, 1);
        from = args;
      }

      for (var i = 0; i < from.length; i += 1) {
        var nextSource = args[i];

        if (nextSource !== undefined && nextSource !== null) {
          var keysArray = Object.keys(Object(nextSource));

          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

            if (desc !== undefined && desc.enumerable) {
              if (!deep) {
                to[nextKey] = nextSource[nextKey];
              } else if (isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
                extend$1(to[nextKey], nextSource[nextKey]);
              } else if (!isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
                to[nextKey] = {};
                extend$1(to[nextKey], nextSource[nextKey]);
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }

      return to;
    }
    function colorHexToRgb(hex) {
      var h = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
      return result ? result.slice(1).map(function (n) {
        return parseInt(n, 16);
      }) : null;
    }
    function colorRgbToHex(r, g, b) {
      var result = [r, g, b].map(function (n) {
        var hex = n.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      }).join('');
      return "#" + result;
    }
    function colorRgbToHsl(r, g, b) {
      r /= 255; // eslint-disable-line

      g /= 255; // eslint-disable-line

      b /= 255; // eslint-disable-line

      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var d = max - min;
      var h;
      if (d === 0) h = 0;else if (max === r) h = (g - b) / d % 6;else if (max === g) h = (b - r) / d + 2;else if (max === b) h = (r - g) / d + 4;
      var l = (min + max) / 2;
      var s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
      if (h < 0) h = 360 / 60 + h;
      return [h * 60, s, l];
    }
    function colorHslToRgb(h, s, l) {
      var c = (1 - Math.abs(2 * l - 1)) * s;
      var hp = h / 60;
      var x = c * (1 - Math.abs(hp % 2 - 1));
      var rgb1;

      if (Number.isNaN(h) || typeof h === 'undefined') {
        rgb1 = [0, 0, 0];
      } else if (hp <= 1) rgb1 = [c, x, 0];else if (hp <= 2) rgb1 = [x, c, 0];else if (hp <= 3) rgb1 = [0, c, x];else if (hp <= 4) rgb1 = [0, x, c];else if (hp <= 5) rgb1 = [x, 0, c];else if (hp <= 6) rgb1 = [c, 0, x];

      var m = l - c / 2;
      return rgb1.map(function (n) {
        return Math.max(0, Math.min(255, Math.round(255 * (n + m))));
      });
    }
    function colorHsbToHsl(h, s, b) {
      var HSL = {
        h: h,
        s: 0,
        l: 0
      };
      var HSB = {
        h: h,
        s: s,
        b: b
      };
      HSL.l = (2 - HSB.s) * HSB.b / 2;
      HSL.s = HSL.l && HSL.l < 1 ? HSB.s * HSB.b / (HSL.l < 0.5 ? HSL.l * 2 : 2 - HSL.l * 2) : HSL.s;
      return [HSL.h, HSL.s, HSL.l];
    }
    function colorHslToHsb(h, s, l) {
      var HSB = {
        h: h,
        s: 0,
        b: 0
      };
      var HSL = {
        h: h,
        s: s,
        l: l
      };
      var t = HSL.s * (HSL.l < 0.5 ? HSL.l : 1 - HSL.l);
      HSB.b = HSL.l + t;
      HSB.s = HSL.l > 0 ? 2 * t / HSB.b : HSB.s;
      return [HSB.h, HSB.s, HSB.b];
    }
    function colorThemeCSSProperties() {
      var hex;
      var rgb;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (args.length === 1) {
        hex = args[0];
        rgb = colorHexToRgb(hex);
      } else if (args.length === 3) {
        rgb = args;
        hex = colorRgbToHex.apply(void 0, rgb);
      }

      if (!rgb) return {};
      var hsl = colorRgbToHsl.apply(void 0, rgb);
      var hslShade = [hsl[0], hsl[1], Math.max(0, hsl[2] - 0.08)];
      var hslTint = [hsl[0], hsl[1], Math.max(0, hsl[2] + 0.08)];
      var shade = colorRgbToHex.apply(void 0, colorHslToRgb.apply(void 0, hslShade));
      var tint = colorRgbToHex.apply(void 0, colorHslToRgb.apply(void 0, hslTint));
      return {
        '--f7-theme-color': hex,
        '--f7-theme-color-rgb': rgb.join(', '),
        '--f7-theme-color-shade': shade,
        '--f7-theme-color-tint': tint
      };
    }
    function bindMethods(instance, obj) {
      Object.keys(obj).forEach(function (key) {
        if (isObject$1(obj[key])) {
          Object.keys(obj[key]).forEach(function (subKey) {
            if (typeof obj[key][subKey] === 'function') {
              obj[key][subKey] = obj[key][subKey].bind(instance);
            }
          });
        }

        instance[key] = obj[key];
      });
    }
    function flattenArray() {
      var arr = [];

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      args.forEach(function (arg) {
        if (Array.isArray(arg)) arr.push.apply(arr, flattenArray.apply(void 0, arg));else arr.push(arg);
      });
      return arr;
    }

    var utils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        uniqueNumber: uniqueNumber,
        id: id,
        mdPreloaderContent: mdPreloaderContent,
        iosPreloaderContent: iosPreloaderContent,
        auroraPreloaderContent: auroraPreloaderContent,
        eventNameToColonCase: eventNameToColonCase,
        deleteProps: deleteProps,
        requestAnimationFrame: requestAnimationFrame,
        cancelAnimationFrame: cancelAnimationFrame,
        nextTick: nextTick,
        nextFrame: nextFrame,
        now: now,
        parseUrlQuery: parseUrlQuery,
        getTranslate: getTranslate,
        serializeObject: serializeObject,
        isObject: isObject$1,
        merge: merge,
        extend: extend$1,
        colorHexToRgb: colorHexToRgb,
        colorRgbToHex: colorRgbToHex,
        colorRgbToHsl: colorRgbToHsl,
        colorHslToRgb: colorHslToRgb,
        colorHsbToHsl: colorHsbToHsl,
        colorHslToHsb: colorHslToHsb,
        colorThemeCSSProperties: colorThemeCSSProperties,
        bindMethods: bindMethods,
        flattenArray: flattenArray
    });

    var support;

    function calcSupport() {
      var window = getWindow();
      var document = getDocument();
      return {
        touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch),
        pointerEvents: !!window.PointerEvent && 'maxTouchPoints' in window.navigator && window.navigator.maxTouchPoints >= 0,
        passiveListener: function checkPassiveListener() {
          var supportsPassive = false;

          try {
            var opts = Object.defineProperty({}, 'passive', {
              // eslint-disable-next-line
              get: function get() {
                supportsPassive = true;
              }
            });
            window.addEventListener('testPassiveListener', null, opts);
          } catch (e) {// No support
          }

          return supportsPassive;
        }(),
        intersectionObserver: function checkObserver() {
          return 'IntersectionObserver' in window;
        }()
      };
    }

    function getSupport() {
      if (!support) {
        support = calcSupport();
      }

      return support;
    }

    var deviceCalculated;

    function calcDevice(_temp) {
      var _ref = _temp === void 0 ? {} : _temp,
          userAgent = _ref.userAgent;

      var support = getSupport();
      var window = getWindow();
      var platform = window.navigator.platform;
      var ua = userAgent || window.navigator.userAgent;
      var device = {
        ios: false,
        android: false,
        androidChrome: false,
        desktop: false,
        iphone: false,
        ipod: false,
        ipad: false,
        edge: false,
        ie: false,
        firefox: false,
        macos: false,
        windows: false,
        cordova: !!(window.cordova || window.phonegap),
        phonegap: !!(window.cordova || window.phonegap),
        electron: false,
        capacitor: !!window.Capacitor,
        nwjs: false
      };
      var screenWidth = window.screen.width;
      var screenHeight = window.screen.height;
      var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

      var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
      var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
      var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      var ie = ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
      var edge = ua.indexOf('Edge/') >= 0;
      var firefox = ua.indexOf('Gecko/') >= 0 && ua.indexOf('Firefox/') >= 0;
      var windows = platform === 'Win32';
      var electron = ua.toLowerCase().indexOf('electron') >= 0;
      var nwjs = typeof nw !== 'undefined' && typeof process !== 'undefined' && typeof process.versions !== 'undefined' && typeof process.versions.nw !== 'undefined';
      var macos = platform === 'MacIntel'; // iPadOs 13 fix

      var iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];

      if (!ipad && macos && support.touch && iPadScreens.indexOf(screenWidth + "x" + screenHeight) >= 0) {
        ipad = ua.match(/(Version)\/([\d.]+)/);
        if (!ipad) ipad = [0, 1, '13_0_0'];
        macos = false;
      }

      device.ie = ie;
      device.edge = edge;
      device.firefox = firefox; // Android

      if (android && !windows) {
        device.os = 'android';
        device.osVersion = android[2];
        device.android = true;
        device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
      }

      if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
      } // iOS


      if (iphone && !ipod) {
        device.osVersion = iphone[2].replace(/_/g, '.');
        device.iphone = true;
      }

      if (ipad) {
        device.osVersion = ipad[2].replace(/_/g, '.');
        device.ipad = true;
      }

      if (ipod) {
        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        device.ipod = true;
      } // iOS 8+ changed UA


      if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
        if (device.osVersion.split('.')[0] === '10') {
          device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
        }
      } // Webview


      device.webView = !!((iphone || ipad || ipod) && (ua.match(/.*AppleWebKit(?!.*Safari)/i) || window.navigator.standalone)) || window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
      device.webview = device.webView;
      device.standalone = device.webView; // Desktop

      device.desktop = !(device.ios || device.android) || electron || nwjs;

      if (device.desktop) {
        device.electron = electron;
        device.nwjs = nwjs;
        device.macos = macos;
        device.windows = windows;

        if (device.macos) {
          device.os = 'macos';
        }

        if (device.windows) {
          device.os = 'windows';
        }
      } // Pixel Ratio


      device.pixelRatio = window.devicePixelRatio || 1; // Color Scheme

      var DARK = '(prefers-color-scheme: dark)';
      var LIGHT = '(prefers-color-scheme: light)';

      device.prefersColorScheme = function prefersColorTheme() {
        var theme;

        if (window.matchMedia && window.matchMedia(LIGHT).matches) {
          theme = 'light';
        }

        if (window.matchMedia && window.matchMedia(DARK).matches) {
          theme = 'dark';
        }

        return theme;
      }; // Export object


      return device;
    }

    function getDevice(overrides, reset) {
      if (overrides === void 0) {
        overrides = {};
      }

      if (!deviceCalculated || reset) {
        deviceCalculated = calcDevice(overrides);
      }

      return deviceCalculated;
    }

    var EventsClass = /*#__PURE__*/function () {
      function EventsClass(parents) {
        if (parents === void 0) {
          parents = [];
        }

        var self = this;
        self.eventsParents = parents;
        self.eventsListeners = {};
      }

      var _proto = EventsClass.prototype;

      _proto.on = function on(events, handler, priority) {
        var self = this;
        if (typeof handler !== 'function') return self;
        var method = priority ? 'unshift' : 'push';
        events.split(' ').forEach(function (event) {
          if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
          self.eventsListeners[event][method](handler);
        });
        return self;
      };

      _proto.once = function once(events, handler, priority) {
        var self = this;
        if (typeof handler !== 'function') return self;

        function onceHandler() {
          self.off(events, onceHandler);

          if (onceHandler.f7proxy) {
            delete onceHandler.f7proxy;
          }

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          handler.apply(self, args);
        }

        onceHandler.f7proxy = handler;
        return self.on(events, onceHandler, priority);
      };

      _proto.off = function off(events, handler) {
        var self = this;
        if (!self.eventsListeners) return self;
        events.split(' ').forEach(function (event) {
          if (typeof handler === 'undefined') {
            self.eventsListeners[event] = [];
          } else if (self.eventsListeners[event]) {
            self.eventsListeners[event].forEach(function (eventHandler, index) {
              if (eventHandler === handler || eventHandler.f7proxy && eventHandler.f7proxy === handler) {
                self.eventsListeners[event].splice(index, 1);
              }
            });
          }
        });
        return self;
      };

      _proto.emit = function emit() {
        var self = this;
        if (!self.eventsListeners) return self;
        var events;
        var data;
        var context;
        var eventsParents;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        if (typeof args[0] === 'string' || Array.isArray(args[0])) {
          events = args[0];
          data = args.slice(1, args.length);
          context = self;
          eventsParents = self.eventsParents;
        } else {
          events = args[0].events;
          data = args[0].data;
          context = args[0].context || self;
          eventsParents = args[0].local ? [] : args[0].parents || self.eventsParents;
        }

        var eventsArray = Array.isArray(events) ? events : events.split(' ');
        var localEvents = eventsArray.map(function (eventName) {
          return eventName.replace('local::', '');
        });
        var parentEvents = eventsArray.filter(function (eventName) {
          return eventName.indexOf('local::') < 0;
        });
        localEvents.forEach(function (event) {
          if (self.eventsListeners && self.eventsListeners[event]) {
            var handlers = [];
            self.eventsListeners[event].forEach(function (eventHandler) {
              handlers.push(eventHandler);
            });
            handlers.forEach(function (eventHandler) {
              eventHandler.apply(context, data);
            });
          }
        });

        if (eventsParents && eventsParents.length > 0) {
          eventsParents.forEach(function (eventsParent) {
            eventsParent.emit.apply(eventsParent, [parentEvents].concat(data));
          });
        }

        return self;
      };

      return EventsClass;
    }();

    var Framework7Class = /*#__PURE__*/function (_EventsClass) {
      _inheritsLoose$1(Framework7Class, _EventsClass);

      function Framework7Class(params, parents) {
        var _this;

        if (params === void 0) {
          params = {};
        }

        if (parents === void 0) {
          parents = [];
        }

        _this = _EventsClass.call(this, parents) || this;

        var self = _assertThisInitialized$1(_this);

        self.params = params;

        if (self.params && self.params.on) {
          Object.keys(self.params.on).forEach(function (eventName) {
            self.on(eventName, self.params.on[eventName]);
          });
        }

        return _this;
      } // eslint-disable-next-line


      var _proto = Framework7Class.prototype;

      _proto.useModuleParams = function useModuleParams(module, instanceParams) {
        if (module.params) {
          var originalParams = {};
          Object.keys(module.params).forEach(function (paramKey) {
            if (typeof instanceParams[paramKey] === 'undefined') return;
            originalParams[paramKey] = extend$1({}, instanceParams[paramKey]);
          });
          extend$1(instanceParams, module.params);
          Object.keys(originalParams).forEach(function (paramKey) {
            extend$1(instanceParams[paramKey], originalParams[paramKey]);
          });
        }
      };

      _proto.useModulesParams = function useModulesParams(instanceParams) {
        var instance = this;
        if (!instance.modules) return;
        Object.keys(instance.modules).forEach(function (moduleName) {
          var module = instance.modules[moduleName]; // Extend params

          if (module.params) {
            extend$1(instanceParams, module.params);
          }
        });
      };

      _proto.useModule = function useModule(moduleName, moduleParams) {
        if (moduleName === void 0) {
          moduleName = '';
        }

        if (moduleParams === void 0) {
          moduleParams = {};
        }

        var instance = this;
        if (!instance.modules) return;
        var module = typeof moduleName === 'string' ? instance.modules[moduleName] : moduleName;
        if (!module) return; // Extend instance methods and props

        if (module.instance) {
          Object.keys(module.instance).forEach(function (modulePropName) {
            var moduleProp = module.instance[modulePropName];

            if (typeof moduleProp === 'function') {
              instance[modulePropName] = moduleProp.bind(instance);
            } else {
              instance[modulePropName] = moduleProp;
            }
          });
        } // Add event listeners


        if (module.on && instance.on) {
          Object.keys(module.on).forEach(function (moduleEventName) {
            instance.on(moduleEventName, module.on[moduleEventName]);
          });
        } // Add vnode hooks


        if (module.vnode) {
          if (!instance.vnodeHooks) instance.vnodeHooks = {};
          Object.keys(module.vnode).forEach(function (vnodeId) {
            Object.keys(module.vnode[vnodeId]).forEach(function (hookName) {
              var handler = module.vnode[vnodeId][hookName];
              if (!instance.vnodeHooks[hookName]) instance.vnodeHooks[hookName] = {};
              if (!instance.vnodeHooks[hookName][vnodeId]) instance.vnodeHooks[hookName][vnodeId] = [];
              instance.vnodeHooks[hookName][vnodeId].push(handler.bind(instance));
            });
          });
        } // Module create callback


        if (module.create) {
          module.create.bind(instance)(moduleParams);
        }
      };

      _proto.useModules = function useModules(modulesParams) {
        if (modulesParams === void 0) {
          modulesParams = {};
        }

        var instance = this;
        if (!instance.modules) return;
        Object.keys(instance.modules).forEach(function (moduleName) {
          var moduleParams = modulesParams[moduleName] || {};
          instance.useModule(moduleName, moduleParams);
        });
      };

      Framework7Class.installModule = function installModule(module) {
        var Class = this;
        if (!Class.prototype.modules) Class.prototype.modules = {};
        var name = module.name || Object.keys(Class.prototype.modules).length + "_" + now();
        Class.prototype.modules[name] = module; // Prototype

        if (module.proto) {
          Object.keys(module.proto).forEach(function (key) {
            Class.prototype[key] = module.proto[key];
          });
        } // Class


        if (module.static) {
          Object.keys(module.static).forEach(function (key) {
            Class[key] = module.static[key];
          });
        } // Callback


        if (module.install) {
          for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
          }

          module.install.apply(Class, params);
        }

        return Class;
      };

      Framework7Class.use = function use(module) {
        var Class = this;

        if (Array.isArray(module)) {
          module.forEach(function (m) {
            return Class.installModule(m);
          });
          return Class;
        }

        for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          params[_key2 - 1] = arguments[_key2];
        }

        return Class.installModule.apply(Class, [module].concat(params));
      };

      _createClass(Framework7Class, null, [{
        key: "components",
        set: function set(components) {
          var Class = this;
          if (!Class.use) return;
          Class.use(components);
        }
      }]);

      return Framework7Class;
    }(EventsClass);

    function ConstructorMethods(parameters) {
      if (parameters === void 0) {
        parameters = {};
      }

      var _parameters = parameters,
          defaultSelector = _parameters.defaultSelector,
          Constructor = _parameters.constructor,
          domProp = _parameters.domProp,
          app = _parameters.app,
          addMethods = _parameters.addMethods;
      var methods = {
        create: function create() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          if (app) return _construct$1(Constructor, [app].concat(args));
          return _construct$1(Constructor, args);
        },
        get: function get(el) {
          if (el === void 0) {
            el = defaultSelector;
          }

          if (el instanceof Constructor) return el;
          var $el = $$1(el);
          if ($el.length === 0) return undefined;
          return $el[0][domProp];
        },
        destroy: function destroy(el) {
          var instance = methods.get(el);
          if (instance && instance.destroy) return instance.destroy();
          return undefined;
        }
      };

      if (addMethods && Array.isArray(addMethods)) {
        addMethods.forEach(function (methodName) {
          methods[methodName] = function (el) {
            if (el === void 0) {
              el = defaultSelector;
            }

            var instance = methods.get(el);

            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            if (instance && instance[methodName]) return instance[methodName].apply(instance, args);
            return undefined;
          };
        });
      }

      return methods;
    }

    function ModalMethods(parameters) {
      if (parameters === void 0) {
        parameters = {};
      }

      var _parameters = parameters,
          defaultSelector = _parameters.defaultSelector,
          Constructor = _parameters.constructor,
          app = _parameters.app;
      var methods = extend$1(ConstructorMethods({
        defaultSelector: defaultSelector,
        constructor: Constructor,
        app: app,
        domProp: 'f7Modal'
      }), {
        open: function open(el, animate, targetEl) {
          var $el = $$1(el);

          if ($el.length > 1 && targetEl) {
            // check if same modal in other page
            var $targetPage = $$1(targetEl).parents('.page');

            if ($targetPage.length) {
              $el.each(function (modalEl) {
                var $modalEl = $$1(modalEl);

                if ($modalEl.parents($targetPage)[0] === $targetPage[0]) {
                  $el = $modalEl;
                }
              });
            }
          }

          if ($el.length > 1) {
            $el = $el.eq($el.length - 1);
          }

          if (!$el.length) return undefined;
          var instance = $el[0].f7Modal;

          if (!instance) {
            var params = $el.dataset();
            instance = new Constructor(app, _extends({
              el: $el
            }, params));
          }

          return instance.open(animate);
        },
        close: function close(el, animate, targetEl) {
          if (el === void 0) {
            el = defaultSelector;
          }

          var $el = $$1(el);
          if (!$el.length) return undefined;

          if ($el.length > 1) {
            // check if close link (targetEl) in this modal
            var $parentEl;

            if (targetEl) {
              var $targetEl = $$1(targetEl);

              if ($targetEl.length) {
                $parentEl = $targetEl.parents($el);
              }
            }

            if ($parentEl && $parentEl.length > 0) {
              $el = $parentEl;
            } else {
              $el = $el.eq($el.length - 1);
            }
          }

          var instance = $el[0].f7Modal;

          if (!instance) {
            var params = $el.dataset();
            instance = new Constructor(app, _extends({
              el: $el
            }, params));
          }

          return instance.close(animate);
        }
      });
      return methods;
    }

    var fetchedModules = [];

    function loadModule(moduleToLoad) {
      var Framework7 = this;
      var window = getWindow();
      var document = getDocument();
      return new Promise(function (resolve, reject) {
        var app = Framework7.instance;
        var modulePath;
        var moduleObj;
        var moduleFunc;

        if (!moduleToLoad) {
          reject(new Error('Framework7: Lazy module must be specified'));
          return;
        }

        function install(module) {
          Framework7.use(module);

          if (app) {
            app.useModuleParams(module, app.params);
            app.useModule(module);
          }
        }

        if (typeof moduleToLoad === 'string') {
          var matchNamePattern = moduleToLoad.match(/([a-z0-9-]*)/i);

          if (moduleToLoad.indexOf('.') < 0 && matchNamePattern && matchNamePattern[0].length === moduleToLoad.length) {
            if (!app || app && !app.params.lazyModulesPath) {
              reject(new Error('Framework7: "lazyModulesPath" app parameter must be specified to fetch module by name'));
              return;
            }

            modulePath = app.params.lazyModulesPath + "/" + moduleToLoad + "/" + moduleToLoad + ".js";
          } else {
            modulePath = moduleToLoad;
          }
        } else if (typeof moduleToLoad === 'function') {
          moduleFunc = moduleToLoad;
        } else {
          // considering F7-Plugin object
          moduleObj = moduleToLoad;
        }

        if (moduleFunc) {
          var module = moduleFunc(Framework7, false);

          if (!module) {
            reject(new Error("Framework7: Can't find Framework7 component in specified component function"));
            return;
          } // Check if it was added


          if (Framework7.prototype.modules && Framework7.prototype.modules[module.name]) {
            resolve();
            return;
          } // Install It


          install(module);
          resolve();
        }

        if (moduleObj) {
          var _module = moduleObj;

          if (!_module) {
            reject(new Error("Framework7: Can't find Framework7 component in specified component"));
            return;
          } // Check if it was added


          if (Framework7.prototype.modules && Framework7.prototype.modules[_module.name]) {
            resolve();
            return;
          } // Install It


          install(_module);
          resolve();
        }

        if (modulePath) {
          if (fetchedModules.indexOf(modulePath) >= 0) {
            resolve();
            return;
          }

          fetchedModules.push(modulePath);
          var scriptLoad = new Promise(function (resolveScript, rejectScript) {
            Framework7.request.get(modulePath, function (scriptContent) {
              var callbackId = id();
              var callbackLoadName = "f7_component_loader_callback_" + callbackId;
              var scriptEl = document.createElement('script');
              scriptEl.innerHTML = "window." + callbackLoadName + " = function (Framework7, Framework7AutoInstallComponent) {return " + scriptContent.trim() + "}";
              $$1('head').append(scriptEl);
              var componentLoader = window[callbackLoadName];
              delete window[callbackLoadName];
              $$1(scriptEl).remove();
              var module = componentLoader(Framework7, false);

              if (!module) {
                rejectScript(new Error("Framework7: Can't find Framework7 component in " + modulePath + " file"));
                return;
              } // Check if it was added


              if (Framework7.prototype.modules && Framework7.prototype.modules[module.name]) {
                resolveScript();
                return;
              } // Install It


              install(module);
              resolveScript();
            }, function (xhr, status) {
              rejectScript(xhr, status);
            });
          });
          var styleLoad = new Promise(function (resolveStyle) {
            Framework7.request.get(modulePath.replace('.js', app.rtl ? '.rtl.css' : '.css'), function (styleContent) {
              var styleEl = document.createElement('style');
              styleEl.innerHTML = styleContent;
              $$1('head').append(styleEl);
              resolveStyle();
            }, function () {
              resolveStyle();
            });
          });
          Promise.all([scriptLoad, styleLoad]).then(function () {
            resolve();
          }).catch(function (err) {
            reject(err);
          });
        }
      });
    }

    var Framework7 = /*#__PURE__*/function (_Framework7Class) {
      _inheritsLoose$1(Framework7, _Framework7Class);

      function Framework7(params) {
        var _this;

        if (params === void 0) {
          params = {};
        }

        _this = _Framework7Class.call(this, params) || this;

        if (Framework7.instance) {
          throw new Error("Framework7 is already initialized and can't be initialized more than once");
        }

        var device = getDevice({
          userAgent: params.userAgent || undefined
        });
        var support = getSupport();
        var passedParams = extend$1({}, params); // App Instance

        var app = _assertThisInitialized$1(_this);

        app.device = device;
        app.support = support;
        var window = getWindow();
        var document = getDocument();
        Framework7.instance = app; // Default

        var defaults = {
          version: '1.0.0',
          id: 'io.framework7.myapp',
          el: 'body',
          theme: 'auto',
          language: window.navigator.language,
          routes: [],
          name: 'Framework7',
          lazyModulesPath: null,
          initOnDeviceReady: true,
          init: true,
          autoDarkTheme: false,
          iosTranslucentBars: true,
          iosTranslucentModals: true,
          component: undefined,
          componentUrl: undefined,
          userAgent: null,
          url: null
        }; // Extend defaults with modules params

        app.useModulesParams(defaults); // Extend defaults with passed params

        app.params = extend$1(defaults, params);
        extend$1(app, {
          // App Id
          id: app.params.id,
          // App Name
          name: app.params.name,
          // App version
          version: app.params.version,
          // Routes
          routes: app.params.routes,
          // Lang
          language: app.params.language,
          // Theme
          theme: function getTheme() {
            if (app.params.theme === 'auto') {
              if (device.ios) return 'ios';
              if (device.desktop && device.electron) return 'aurora';
              return 'md';
            }

            return app.params.theme;
          }(),
          // Initially passed parameters
          passedParams: passedParams,
          online: window.navigator.onLine
        });
        if (params.store) app.params.store = params.store; // Save Root

        if (app.$el && app.$el[0]) {
          app.$el[0].f7 = app;
        } // Install Modules


        app.useModules(); // Init Store

        app.initStore(); // Init

        if (app.params.init) {
          if (device.cordova && app.params.initOnDeviceReady) {
            $$1(document).on('deviceready', function () {
              app.init();
            });
          } else {
            app.init();
          }
        } // Return app instance


        return app || _assertThisInitialized$1(_this);
      }

      var _proto = Framework7.prototype;

      _proto.mount = function mount(rootEl) {
        var app = this;
        var window = getWindow();
        var document = getDocument();
        var $rootEl = $$1(rootEl || app.params.el).eq(0);
        app.$el = $rootEl;

        if (app.$el && app.$el[0]) {
          app.el = app.$el[0];
          app.el.f7 = app;
          app.rtl = $rootEl.css('direction') === 'rtl';
        } // Auto Dark Theme


        var DARK = '(prefers-color-scheme: dark)';
        var LIGHT = '(prefers-color-scheme: light)';
        app.mq = {};

        if (window.matchMedia) {
          app.mq.dark = window.matchMedia(DARK);
          app.mq.light = window.matchMedia(LIGHT);
        }

        app.colorSchemeListener = function colorSchemeListener(_ref) {
          var matches = _ref.matches,
              media = _ref.media;

          if (!matches) {
            return;
          }

          var html = document.querySelector('html');

          if (media === DARK) {
            html.classList.add('theme-dark');
            app.darkTheme = true;
            app.emit('darkThemeChange', true);
          } else if (media === LIGHT) {
            html.classList.remove('theme-dark');
            app.darkTheme = false;
            app.emit('darkThemeChange', false);
          }
        };

        app.emit('mount');
      };

      _proto.initStore = function initStore() {
        var app = this;

        if (typeof app.params.store !== 'undefined' && app.params.store.__store) {
          app.store = app.params.store;
        } else {
          app.store = app.createStore(app.params.store);
        }
      };

      _proto.enableAutoDarkTheme = function enableAutoDarkTheme() {
        var window = getWindow();
        var document = getDocument();
        if (!window.matchMedia) return;
        var app = this;
        var html = document.querySelector('html');

        if (app.mq.dark && app.mq.light) {
          app.mq.dark.addListener(app.colorSchemeListener);
          app.mq.light.addListener(app.colorSchemeListener);
        }

        if (app.mq.dark && app.mq.dark.matches) {
          html.classList.add('theme-dark');
          app.darkTheme = true;
          app.emit('darkThemeChange', true);
        } else if (app.mq.light && app.mq.light.matches) {
          html.classList.remove('theme-dark');
          app.darkTheme = false;
          app.emit('darkThemeChange', false);
        }
      };

      _proto.disableAutoDarkTheme = function disableAutoDarkTheme() {
        var window = getWindow();
        if (!window.matchMedia) return;
        var app = this;
        if (app.mq.dark) app.mq.dark.removeListener(app.colorSchemeListener);
        if (app.mq.light) app.mq.light.removeListener(app.colorSchemeListener);
      };

      _proto.initAppComponent = function initAppComponent(callback) {
        var app = this;
        app.router.componentLoader(app.params.component, app.params.componentUrl, {
          componentOptions: {
            el: app.$el[0]
          }
        }, function (el) {
          app.$el = $$1(el);
          app.$el[0].f7 = app;
          app.$elComponent = el.f7Component;
          app.el = app.$el[0];
          if (callback) callback();
        }, function () {});
      };

      _proto.init = function init(rootEl) {
        var app = this;
        app.mount(rootEl);

        var init = function init() {
          if (app.initialized) return;
          app.$el.addClass('framework7-initializing'); // RTL attr

          if (app.rtl) {
            $$1('html').attr('dir', 'rtl');
          } // Auto Dark Theme


          if (app.params.autoDarkTheme) {
            app.enableAutoDarkTheme();
          } // Watch for online/offline state


          var window = getWindow();
          window.addEventListener('offline', function () {
            app.online = false;
            app.emit('offline');
            app.emit('connection', false);
          });
          window.addEventListener('online', function () {
            app.online = true;
            app.emit('online');
            app.emit('connection', true);
          }); // Root class

          app.$el.addClass('framework7-root'); // Theme class

          $$1('html').removeClass('ios md aurora').addClass(app.theme); // iOS Translucent

          var device = app.device;

          if (app.params.iosTranslucentBars && app.theme === 'ios' && device.ios) {
            $$1('html').addClass('ios-translucent-bars');
          }

          if (app.params.iosTranslucentModals && app.theme === 'ios' && device.ios) {
            $$1('html').addClass('ios-translucent-modals');
          } // Init class


          nextFrame(function () {
            app.$el.removeClass('framework7-initializing');
          }); // Emit, init other modules

          app.initialized = true;
          app.emit('init');
        };

        if (app.params.component || app.params.componentUrl) {
          app.initAppComponent(function () {
            init();
          });
        } else {
          init();
        }

        return app;
      } // eslint-disable-next-line
      ;

      _proto.loadModule = function loadModule() {
        return Framework7.loadModule.apply(Framework7, arguments);
      } // eslint-disable-next-line
      ;

      _proto.loadModules = function loadModules() {
        return Framework7.loadModules.apply(Framework7, arguments);
      };

      _proto.getVnodeHooks = function getVnodeHooks(hook, id) {
        var app = this;
        if (!app.vnodeHooks || !app.vnodeHooks[hook]) return [];
        return app.vnodeHooks[hook][id] || [];
      } // eslint-disable-next-line
      ;

      _createClass(Framework7, [{
        key: "$",
        get: function get() {
          return $$1;
        }
      }], [{
        key: "Dom7",
        get: function get() {
          return $$1;
        }
      }, {
        key: "$",
        get: function get() {
          return $$1;
        }
      }, {
        key: "device",
        get: function get() {
          return getDevice();
        }
      }, {
        key: "support",
        get: function get() {
          return getSupport();
        }
      }, {
        key: "Class",
        get: function get() {
          return Framework7Class;
        }
      }, {
        key: "Events",
        get: function get() {
          return EventsClass;
        }
      }]);

      return Framework7;
    }(Framework7Class);

    Framework7.ModalMethods = ModalMethods;
    Framework7.ConstructorMethods = ConstructorMethods;
    Framework7.loadModule = loadModule;

    Framework7.loadModules = function loadModules(modules) {
      return Promise.all(modules.map(function (module) {
        return Framework7.loadModule(module);
      }));
    };

    var DeviceModule = {
      name: 'device',
      static: {
        getDevice: getDevice
      },
      on: {
        init: function init() {
          var document = getDocument();
          var device = getDevice();
          var classNames = [];
          var html = document.querySelector('html');
          var metaStatusbar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
          if (!html) return;

          if (device.standalone && device.ios && metaStatusbar && metaStatusbar.content === 'black-translucent') {
            classNames.push('device-full-viewport');
          } // Pixel Ratio


          classNames.push("device-pixel-ratio-" + Math.floor(device.pixelRatio)); // OS classes

          if (device.os && !device.desktop) {
            classNames.push("device-" + device.os);
          } else if (device.desktop) {
            classNames.push('device-desktop');

            if (device.os) {
              classNames.push("device-" + device.os);
            }
          }

          if (device.cordova || device.phonegap) {
            classNames.push('device-cordova');
          }

          if (device.capacitor) {
            classNames.push('device-capacitor');
          } // Add html classes


          classNames.forEach(function (className) {
            html.classList.add(className);
          });
        }
      }
    };

    var SupportModule = {
      name: 'support',
      static: {
        getSupport: getSupport
      }
    };

    var UtilsModule = {
      name: 'utils',
      proto: {
        utils: utils
      },
      static: {
        utils: utils
      }
    };

    var ResizeModule = {
      name: 'resize',
      create: function create() {
        var app = this;

        app.getSize = function () {
          if (!app.el) return {
            width: 0,
            height: 0,
            left: 0,
            top: 0
          };
          var offset = app.$el.offset();
          var _ref = [app.el.offsetWidth, app.el.offsetHeight, offset.left, offset.top],
              width = _ref[0],
              height = _ref[1],
              left = _ref[2],
              top = _ref[3];
          app.width = width;
          app.height = height;
          app.left = left;
          app.top = top;
          return {
            width: width,
            height: height,
            left: left,
            top: top
          };
        };
      },
      on: {
        init: function init() {
          var app = this;
          var window = getWindow(); // Get Size

          app.getSize(); // Emit resize

          window.addEventListener('resize', function () {
            app.emit('resize');
          }, false); // Emit orientationchange

          window.addEventListener('orientationchange', function () {
            app.emit('orientationchange');
          });
        },
        orientationchange: function orientationchange() {
          var document = getDocument();
          var device = getDevice(); // Fix iPad weird body scroll

          if (device.ipad) {
            document.body.scrollLeft = 0;
            setTimeout(function () {
              document.body.scrollLeft = 0;
            }, 0);
          }
        },
        resize: function resize() {
          var app = this;
          app.getSize();
        }
      }
    };

    var globals = {};
    var jsonpRequests = 0;

    var RequestResponse = function RequestResponse(obj) {
      Object.assign(this, obj);
    };

    var RequestError = /*#__PURE__*/function (_Error) {
      _inheritsLoose$1(RequestError, _Error);

      function RequestError(obj) {
        var _this;

        _this = _Error.call(this) || this;
        Object.assign(_assertThisInitialized$1(_this), obj);
        return _this;
      }

      return RequestError;
    }( /*#__PURE__*/_wrapNativeSuper$1(Error));

    var request = function request(requestOptions) {
      return new Promise(function (resolve, reject) {
        var window = getWindow();
        var document = getDocument();
        var globalsNoCallbacks = extend$1({}, globals);
        'beforeCreate beforeOpen beforeSend error complete success statusCode'.split(' ').forEach(function (callbackName) {
          delete globalsNoCallbacks[callbackName];
        });
        var defaults = extend$1({
          url: window.location.toString(),
          method: 'GET',
          data: false,
          async: true,
          cache: true,
          user: '',
          password: '',
          headers: {},
          xhrFields: {},
          statusCode: {},
          processData: true,
          dataType: 'text',
          contentType: 'application/x-www-form-urlencoded',
          timeout: 0
        }, globalsNoCallbacks);
        var proceedRequest;
        var options = extend$1({}, defaults, requestOptions);

        if (requestOptions.abortController) {
          options.abortController = requestOptions.abortController;
        }

        if (options.abortController && options.abortController.canceled) {
          reject(new RequestError({
            options: options,
            status: 'canceled',
            message: 'canceled'
          }));
          return;
        } // Function to run XHR callbacks and events


        function fireCallback(callbackName) {
          /*
          Callbacks:
          beforeCreate (options),
          beforeOpen (xhr, options),
          beforeSend (xhr, options),
          error (xhr, status, message),
          complete (xhr, status),
          success (response, status, xhr),
          statusCode ()
          */
          var globalCallbackValue;
          var optionCallbackValue;

          for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            data[_key - 1] = arguments[_key];
          }

          if (globals[callbackName]) {
            globalCallbackValue = globals[callbackName].apply(globals, data);
          }

          if (options[callbackName]) {
            optionCallbackValue = options[callbackName].apply(options, data);
          }

          if (typeof globalCallbackValue !== 'boolean') globalCallbackValue = true;
          if (typeof optionCallbackValue !== 'boolean') optionCallbackValue = true;

          if (options.abortController && options.abortController.canceled && (callbackName === 'beforeCreate' || callbackName === 'beforeOpen' || callbackName === 'beforeSend')) {
            return false;
          }

          return globalCallbackValue && optionCallbackValue;
        } // Before create callback


        proceedRequest = fireCallback('beforeCreate', options);

        if (proceedRequest === false) {
          reject(new RequestError({
            options: options,
            status: 'canceled',
            message: 'canceled'
          }));
          return;
        } // For jQuery guys


        if (options.type) options.method = options.type; // Parameters Prefix

        var paramsPrefix = options.url.indexOf('?') >= 0 ? '&' : '?'; // UC method

        var method = options.method.toUpperCase(); // Data to modify GET URL

        if ((method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'DELETE') && options.data) {
          var stringData;

          if (typeof options.data === 'string') {
            // Should be key=value string
            if (options.data.indexOf('?') >= 0) stringData = options.data.split('?')[1];else stringData = options.data;
          } else {
            // Should be key=value object
            stringData = serializeObject(options.data);
          }

          if (stringData.length) {
            options.url += paramsPrefix + stringData;
            if (paramsPrefix === '?') paramsPrefix = '&';
          }
        } // JSONP


        if (options.dataType === 'json' && options.url.indexOf('callback=') >= 0) {
          var callbackName = "f7jsonp_" + (Date.now() + (jsonpRequests += 1));
          var abortTimeout;
          var callbackSplit = options.url.split('callback=');
          var requestUrl = callbackSplit[0] + "callback=" + callbackName;

          if (callbackSplit[1].indexOf('&') >= 0) {
            var addVars = callbackSplit[1].split('&').filter(function (el) {
              return el.indexOf('=') > 0;
            }).join('&');
            if (addVars.length > 0) requestUrl += "&" + addVars;
          } // Create script


          var script = document.createElement('script');
          script.type = 'text/javascript';

          script.onerror = function onerror() {
            clearTimeout(abortTimeout);
            fireCallback('error', null, 'scripterror', 'scripterror');
            reject(new RequestError({
              options: options,
              status: 'scripterror',
              message: 'scripterror'
            }));
            fireCallback('complete', null, 'scripterror');
          };

          script.src = requestUrl; // Handler

          window[callbackName] = function jsonpCallback(data) {
            clearTimeout(abortTimeout);
            fireCallback('success', data);
            script.parentNode.removeChild(script);
            script = null;
            delete window[callbackName];
            resolve(new RequestResponse({
              options: options,
              data: data
            }));
          };

          document.querySelector('head').appendChild(script);

          if (options.timeout > 0) {
            abortTimeout = setTimeout(function () {
              script.parentNode.removeChild(script);
              script = null;
              fireCallback('error', null, 'timeout', 'timeout');
              reject(new RequestError({
                options: options,
                status: 'timeout',
                message: 'timeout'
              }));
            }, options.timeout);
          }

          return;
        } // Cache for GET/HEAD requests


        if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'DELETE') {
          if (options.cache === false) {
            options.url += paramsPrefix + "_nocache" + Date.now();
          }
        } // Create XHR


        var xhr = new XMLHttpRequest();

        if (options.abortController) {
          var aborted = false;

          options.abortController.onAbort = function () {
            if (aborted) return;
            aborted = true;
            xhr.abort();
            reject(new RequestError({
              options: options,
              xhr: xhr,
              status: 'canceled',
              message: 'canceled'
            }));
          };
        } // Save Request URL


        xhr.requestUrl = options.url;
        xhr.requestParameters = options; // Before open callback

        proceedRequest = fireCallback('beforeOpen', xhr, options);

        if (proceedRequest === false) {
          reject(new RequestError({
            options: options,
            xhr: xhr,
            status: 'canceled',
            message: 'canceled'
          }));
          return;
        } // Open XHR


        xhr.open(method, options.url, options.async, options.user, options.password); // Create POST Data

        var postData = null;

        if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && options.data) {
          if (options.processData) {
            var postDataInstances = [ArrayBuffer, Blob, Document, FormData]; // Post Data

            if (postDataInstances.indexOf(options.data.constructor) >= 0) {
              postData = options.data;
            } else {
              // POST Headers
              var boundary = "---------------------------" + Date.now().toString(16);

              if (options.contentType === 'multipart/form-data') {
                xhr.setRequestHeader('Content-Type', "multipart/form-data; boundary=" + boundary);
              } else {
                xhr.setRequestHeader('Content-Type', options.contentType);
              }

              postData = '';
              var data = serializeObject(options.data);

              if (options.contentType === 'multipart/form-data') {
                data = data.split('&');
                var newData = [];

                for (var i = 0; i < data.length; i += 1) {
                  newData.push("Content-Disposition: form-data; name=\"" + data[i].split('=')[0] + "\"\r\n\r\n" + data[i].split('=')[1] + "\r\n");
                }

                postData = "--" + boundary + "\r\n" + newData.join("--" + boundary + "\r\n") + "--" + boundary + "--\r\n";
              } else if (options.contentType === 'application/json') {
                postData = JSON.stringify(options.data);
              } else {
                postData = data;
              }
            }
          } else {
            postData = options.data;
            xhr.setRequestHeader('Content-Type', options.contentType);
          }
        }

        if (options.dataType === 'json' && (!options.headers || !options.headers.Accept)) {
          xhr.setRequestHeader('Accept', 'application/json');
        } // Additional headers


        if (options.headers) {
          Object.keys(options.headers).forEach(function (headerName) {
            if (typeof options.headers[headerName] === 'undefined') return;
            xhr.setRequestHeader(headerName, options.headers[headerName]);
          });
        } // Check for crossDomain


        if (typeof options.crossDomain === 'undefined') {
          options.crossDomain = // eslint-disable-next-line
          /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== window.location.host;
        }

        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }

        if (options.xhrFields) {
          extend$1(xhr, options.xhrFields);
        } // Handle XHR


        xhr.onload = function onload() {
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 0) {
            var responseData;

            if (options.dataType === 'json') {
              var parseError;

              try {
                responseData = JSON.parse(xhr.responseText);
              } catch (err) {
                parseError = true;
              }

              if (!parseError) {
                fireCallback('success', responseData, xhr.status, xhr);
                resolve(new RequestResponse({
                  options: options,
                  data: responseData,
                  status: xhr.status,
                  xhr: xhr
                }));
              } else {
                fireCallback('error', xhr, 'parseerror', 'parseerror');
                reject(new RequestError({
                  options: options,
                  xhr: xhr,
                  status: 'parseerror',
                  message: 'parseerror'
                }));
              }
            } else {
              responseData = xhr.responseType === 'text' || xhr.responseType === '' ? xhr.responseText : xhr.response;
              fireCallback('success', responseData, xhr.status, xhr);
              resolve(new RequestResponse({
                options: options,
                data: responseData,
                status: xhr.status,
                xhr: xhr
              }));
            }
          } else {
            fireCallback('error', xhr, xhr.status, xhr.statusText);
            reject(new RequestError({
              options: options,
              xhr: xhr,
              status: xhr.status,
              message: xhr.statusText
            }));
          }

          if (options.statusCode) {
            if (globals.statusCode && globals.statusCode[xhr.status]) globals.statusCode[xhr.status](xhr);
            if (options.statusCode[xhr.status]) options.statusCode[xhr.status](xhr);
          }

          fireCallback('complete', xhr, xhr.status);
        };

        xhr.onerror = function onerror() {
          fireCallback('error', xhr, xhr.status, xhr.status);
          reject(new RequestError({
            options: options,
            xhr: xhr,
            status: xhr.status,
            message: xhr.statusText
          }));
          fireCallback('complete', xhr, 'error');
        }; // Timeout


        if (options.timeout > 0) {
          xhr.timeout = options.timeout;

          xhr.ontimeout = function () {
            fireCallback('error', xhr, 'timeout', 'timeout');
            reject(new RequestError({
              options: options,
              xhr: xhr,
              status: 'timeout',
              message: 'timeout'
            }));
            fireCallback('complete', xhr, 'timeout');
          };
        } // Ajax start callback


        proceedRequest = fireCallback('beforeSend', xhr, options);

        if (proceedRequest === false) {
          reject(new RequestError({
            options: options,
            xhr: xhr,
            status: 'canceled',
            message: 'canceled'
          }));
          return;
        } // Send XHR


        xhr.send(postData);
      });
    };

    function requestShortcut(method) {
      var _ref = [],
          url = _ref[0],
          data = _ref[1],
          success = _ref[2],
          error = _ref[3],
          dataType = _ref[4];

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (typeof args[1] === 'function') {
        url = args[0];
        success = args[1];
        error = args[2];
        dataType = args[3];
      } else {
        url = args[0];
        data = args[1];
        success = args[2];
        error = args[3];
        dataType = args[4];
      }

      [success, error].forEach(function (callback) {
        if (typeof callback === 'string') {
          dataType = callback;
          if (callback === success) success = undefined;else error = undefined;
        }
      });
      dataType = dataType || (method === 'json' || method === 'postJSON' ? 'json' : undefined);
      var requestOptions = {
        url: url,
        method: method === 'post' || method === 'postJSON' ? 'POST' : 'GET',
        data: data,
        success: success,
        error: error,
        dataType: dataType
      };

      if (method === 'postJSON') {
        extend$1(requestOptions, {
          contentType: 'application/json',
          processData: false,
          crossDomain: true,
          data: typeof data === 'string' ? data : JSON.stringify(data)
        });
      }

      return request(requestOptions);
    }

    Object.assign(request, {
      get: function get() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return requestShortcut.apply(void 0, ['get'].concat(args));
      },
      post: function post() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return requestShortcut.apply(void 0, ['post'].concat(args));
      },
      json: function json() {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        return requestShortcut.apply(void 0, ['json'].concat(args));
      },
      getJSON: function getJSON() {
        for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }

        return requestShortcut.apply(void 0, ['json'].concat(args));
      },
      postJSON: function postJSON() {
        for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          args[_key7] = arguments[_key7];
        }

        return requestShortcut.apply(void 0, ['postJSON'].concat(args));
      }
    });

    request.abortController = function () {
      var contoller = {
        canceled: false,
        onAbort: null,
        abort: function abort() {
          contoller.canceled = true;
          if (contoller.onAbort) contoller.onAbort();
        }
      };
      return contoller;
    };

    request.setup = function setup(options) {
      if (options.type && !options.method) {
        extend$1(options, {
          method: options.type
        });
      }

      extend$1(globals, options);
    };

    /* eslint no-param-reassign: "off" */
    var RequestModule = {
      name: 'request',
      proto: {
        request: request
      },
      static: {
        request: request
      }
    };

    /* eslint-disable no-nested-ternary */

    function initTouch() {
      var app = this;
      var device = getDevice();
      var support = getSupport();
      var window = getWindow();
      var document = getDocument();
      var params = app.params.touch;
      var useRipple = params[app.theme + "TouchRipple"];

      if (device.ios && device.webView) {
        // Strange hack required for iOS 8 webview to work on inputs
        window.addEventListener('touchstart', function () {});
      }

      var touchStartX;
      var touchStartY;
      var targetElement;
      var isMoved;
      var tapHoldFired;
      var tapHoldTimeout;
      var preventClick;
      var activableElement;
      var activeTimeout;
      var rippleWave;
      var rippleTarget;
      var rippleTimeout;

      function findActivableElement(el) {
        var target = $$1(el);
        var parents = target.parents(params.activeStateElements);

        if (target.closest('.no-active-state').length) {
          return null;
        }

        var activable;

        if (target.is(params.activeStateElements)) {
          activable = target;
        }

        if (parents.length > 0) {
          activable = activable ? activable.add(parents) : parents;
        }

        if (activable && activable.length > 1) {
          var newActivable = [];
          var preventPropagation;

          for (var i = 0; i < activable.length; i += 1) {
            if (!preventPropagation) {
              newActivable.push(activable[i]);

              if (activable.eq(i).hasClass('prevent-active-state-propagation') || activable.eq(i).hasClass('no-active-state-propagation')) {
                preventPropagation = true;
              }
            }
          }

          activable = $$1(newActivable);
        }

        return activable || target;
      }

      function isInsideScrollableView(el) {
        var pageContent = el.parents('.page-content');
        return pageContent.length > 0;
      }

      function addActive() {
        if (!activableElement) return;
        activableElement.addClass('active-state');
      }

      function removeActive() {
        if (!activableElement) return;
        activableElement.removeClass('active-state');
        activableElement = null;
      } // Ripple handlers


      function findRippleElement(el) {
        var rippleElements = params.touchRippleElements;
        var $el = $$1(el);

        if ($el.is(rippleElements)) {
          if ($el.hasClass('no-ripple')) {
            return false;
          }

          return $el;
        }

        if ($el.parents(rippleElements).length > 0) {
          var rippleParent = $el.parents(rippleElements).eq(0);

          if (rippleParent.hasClass('no-ripple')) {
            return false;
          }

          return rippleParent;
        }

        return false;
      }

      function createRipple($el, x, y) {
        if (!$el) return;
        rippleWave = app.touchRipple.create(app, $el, x, y);
      }

      function removeRipple() {
        if (!rippleWave) return;
        rippleWave.remove();
        rippleWave = undefined;
        rippleTarget = undefined;
      }

      function rippleTouchStart(el) {
        rippleTarget = findRippleElement(el);

        if (!rippleTarget || rippleTarget.length === 0) {
          rippleTarget = undefined;
          return;
        }

        var inScrollable = isInsideScrollableView(rippleTarget);

        if (!inScrollable) {
          removeRipple();
          createRipple(rippleTarget, touchStartX, touchStartY);
        } else {
          clearTimeout(rippleTimeout);
          rippleTimeout = setTimeout(function () {
            removeRipple();
            createRipple(rippleTarget, touchStartX, touchStartY);
          }, 80);
        }
      }

      function rippleTouchMove() {
        clearTimeout(rippleTimeout);
        removeRipple();
      }

      function rippleTouchEnd() {
        if (!rippleWave && rippleTarget && !isMoved) {
          clearTimeout(rippleTimeout);
          createRipple(rippleTarget, touchStartX, touchStartY);
          setTimeout(removeRipple, 0);
        } else {
          removeRipple();
        }
      } // Mouse Handlers


      function handleMouseDown(e) {
        var $activableEl = findActivableElement(e.target);

        if ($activableEl) {
          $activableEl.addClass('active-state');

          if ('which' in e && e.which === 3) {
            setTimeout(function () {
              $$1('.active-state').removeClass('active-state');
            }, 0);
          }
        }

        if (useRipple) {
          touchStartX = e.pageX;
          touchStartY = e.pageY;
          rippleTouchStart(e.target, e.pageX, e.pageY);
        }
      }

      function handleMouseMove() {
        if (!params.activeStateOnMouseMove) {
          $$1('.active-state').removeClass('active-state');
        }

        if (useRipple) {
          rippleTouchMove();
        }
      }

      function handleMouseUp() {
        $$1('.active-state').removeClass('active-state');

        if (useRipple) {
          rippleTouchEnd();
        }
      }

      function handleTouchCancel() {
        targetElement = null; // Remove Active State

        clearTimeout(activeTimeout);
        clearTimeout(tapHoldTimeout);

        if (params.activeState) {
          removeActive();
        } // Remove Ripple


        if (useRipple) {
          rippleTouchEnd();
        }
      }

      function handleTouchStart(e) {
        isMoved = false;
        tapHoldFired = false;
        preventClick = false;

        if (e.targetTouches.length > 1) {
          if (activableElement) removeActive();
          return true;
        }

        if (e.touches.length > 1 && activableElement) {
          removeActive();
        }

        if (params.tapHold) {
          if (tapHoldTimeout) clearTimeout(tapHoldTimeout);
          tapHoldTimeout = setTimeout(function () {
            if (e && e.touches && e.touches.length > 1) return;
            tapHoldFired = true;
            e.preventDefault();
            preventClick = true;
            $$1(e.target).trigger('taphold', e);
            app.emit('taphold', e);
          }, params.tapHoldDelay);
        }

        targetElement = e.target;
        touchStartX = e.targetTouches[0].pageX;
        touchStartY = e.targetTouches[0].pageY;

        if (params.activeState) {
          activableElement = findActivableElement(targetElement);

          if (activableElement && !isInsideScrollableView(activableElement)) {
            addActive();
          } else if (activableElement) {
            activeTimeout = setTimeout(addActive, 80);
          }
        }

        if (useRipple) {
          rippleTouchStart(targetElement);
        }

        return true;
      }

      function handleTouchMove(e) {
        var touch;
        var distance;

        if (e.type === 'touchmove') {
          touch = e.targetTouches[0];
          distance = params.touchClicksDistanceThreshold;
        }

        if (distance && touch) {
          var pageX = touch.pageX;
          var pageY = touch.pageY;

          if (Math.abs(pageX - touchStartX) > distance || Math.abs(pageY - touchStartY) > distance) {
            isMoved = true;
          }
        } else {
          isMoved = true;
        }

        if (isMoved) {
          preventClick = true;

          if (params.tapHold) {
            clearTimeout(tapHoldTimeout);
          }

          if (params.activeState) {
            clearTimeout(activeTimeout);
            removeActive();
          }

          if (useRipple) {
            rippleTouchMove();
          }
        }
      }

      function handleTouchEnd(e) {
        clearTimeout(activeTimeout);
        clearTimeout(tapHoldTimeout);

        if (document.activeElement === e.target) {
          if (params.activeState) removeActive();

          if (useRipple) {
            rippleTouchEnd();
          }

          return true;
        }

        if (params.activeState) {
          addActive();
          setTimeout(removeActive, 0);
        }

        if (useRipple) {
          rippleTouchEnd();
        }

        if (params.tapHoldPreventClicks && tapHoldFired || preventClick) {
          if (e.cancelable) e.preventDefault();
          preventClick = true;
          return false;
        }

        return true;
      }

      function handleClick(e) {
        var isOverswipe = e && e.detail && e.detail === 'f7Overswipe';
        var localPreventClick = preventClick;

        if (targetElement && e.target !== targetElement) {
          if (isOverswipe) {
            localPreventClick = false;
          } else {
            localPreventClick = true;
          }
        }

        if (params.tapHold && params.tapHoldPreventClicks && tapHoldFired) {
          localPreventClick = true;
        }

        if (localPreventClick) {
          e.stopImmediatePropagation();
          e.stopPropagation();
          e.preventDefault();
        }

        if (params.tapHold) {
          tapHoldTimeout = setTimeout(function () {
            tapHoldFired = false;
          }, device.ios || device.androidChrome ? 100 : 400);
        }

        preventClick = false;
        targetElement = null;
        return !localPreventClick;
      }

      function emitAppTouchEvent(name, e) {
        app.emit({
          events: name,
          data: [e]
        });
      }

      function appClick(e) {
        emitAppTouchEvent('click', e);
      }

      function appTouchStartActive(e) {
        emitAppTouchEvent('touchstart touchstart:active', e);
      }

      function appTouchMoveActive(e) {
        emitAppTouchEvent('touchmove touchmove:active', e);
      }

      function appTouchEndActive(e) {
        emitAppTouchEvent('touchend touchend:active', e);
      }

      function appTouchStartPassive(e) {
        emitAppTouchEvent('touchstart:passive', e);
      }

      function appTouchMovePassive(e) {
        emitAppTouchEvent('touchmove:passive', e);
      }

      function appTouchEndPassive(e) {
        emitAppTouchEvent('touchend:passive', e);
      }

      var passiveListener = support.passiveListener ? {
        passive: true
      } : false;
      var passiveListenerCapture = support.passiveListener ? {
        passive: true,
        capture: true
      } : true;
      var activeListener = support.passiveListener ? {
        passive: false
      } : false;
      var activeListenerCapture = support.passiveListener ? {
        passive: false,
        capture: true
      } : true;
      document.addEventListener('click', appClick, true);

      if (support.passiveListener) {
        document.addEventListener(app.touchEvents.start, appTouchStartActive, activeListenerCapture);
        document.addEventListener(app.touchEvents.move, appTouchMoveActive, activeListener);
        document.addEventListener(app.touchEvents.end, appTouchEndActive, activeListener);
        document.addEventListener(app.touchEvents.start, appTouchStartPassive, passiveListenerCapture);
        document.addEventListener(app.touchEvents.move, appTouchMovePassive, passiveListener);
        document.addEventListener(app.touchEvents.end, appTouchEndPassive, passiveListener);
      } else {
        document.addEventListener(app.touchEvents.start, function (e) {
          appTouchStartActive(e);
          appTouchStartPassive(e);
        }, true);
        document.addEventListener(app.touchEvents.move, function (e) {
          appTouchMoveActive(e);
          appTouchMovePassive(e);
        }, false);
        document.addEventListener(app.touchEvents.end, function (e) {
          appTouchEndActive(e);
          appTouchEndPassive(e);
        }, false);
      }

      if (support.touch) {
        app.on('click', handleClick);
        app.on('touchstart', handleTouchStart);
        app.on('touchmove', handleTouchMove);
        app.on('touchend', handleTouchEnd);
        document.addEventListener('touchcancel', handleTouchCancel, {
          passive: true
        });
      } else if (params.activeState) {
        app.on('touchstart', handleMouseDown);
        app.on('touchmove', handleMouseMove);
        app.on('touchend', handleMouseUp);
        document.addEventListener('pointercancel', handleMouseUp, {
          passive: true
        });
      }

      document.addEventListener('contextmenu', function (e) {
        if (params.disableContextMenu && (device.ios || device.android || device.cordova || window.Capacitor && window.Capacitor.isNative)) {
          e.preventDefault();
        }

        if (useRipple) {
          if (activableElement) removeActive();
          rippleTouchEnd();
        }
      });
    }

    var TouchModule = {
      name: 'touch',
      params: {
        touch: {
          // Clicks
          touchClicksDistanceThreshold: 5,
          // ContextMenu
          disableContextMenu: false,
          // Tap Hold
          tapHold: false,
          tapHoldDelay: 750,
          tapHoldPreventClicks: true,
          // Active State
          activeState: true,
          activeStateElements: 'a, button, label, span, .actions-button, .stepper-button, .stepper-button-plus, .stepper-button-minus, .card-expandable, .menu-item, .link, .item-link, .accordion-item-toggle',
          activeStateOnMouseMove: false,
          mdTouchRipple: true,
          iosTouchRipple: false,
          auroraTouchRipple: false,
          touchRippleElements: '.ripple, .link, .item-link, .list-button, .links-list a, .button, button, .input-clear-button, .dialog-button, .tab-link, .item-radio, .item-checkbox, .actions-button, .searchbar-disable-button, .fab a, .checkbox, .radio, .data-table .sortable-cell:not(.input-cell), .notification-close-button, .stepper-button, .stepper-button-minus, .stepper-button-plus, .menu-item-content, .list.accordion-list .accordion-item-toggle',
          touchRippleInsetElements: '.ripple-inset, .icon-only, .searchbar-disable-button, .input-clear-button, .notification-close-button, .md .navbar .link.back'
        }
      },
      create: function create() {
        var app = this;
        var support = getSupport();
        extend$1(app, {
          touchEvents: {
            start: support.touch ? 'touchstart' : support.pointerEvents ? 'pointerdown' : 'mousedown',
            move: support.touch ? 'touchmove' : support.pointerEvents ? 'pointermove' : 'mousemove',
            end: support.touch ? 'touchend' : support.pointerEvents ? 'pointerup' : 'mouseup'
          }
        });
      },
      on: {
        init: initTouch
      }
    };

    /**
     * Tokenize input string.
     */
    function lexer(str) {
      var tokens = [];
      var i = 0;

      while (i < str.length) {
        var char = str[i];

        if (char === "*" || char === "+" || char === "?") {
          tokens.push({
            type: "MODIFIER",
            index: i,
            value: str[i++]
          });
          continue;
        }

        if (char === "\\") {
          tokens.push({
            type: "ESCAPED_CHAR",
            index: i++,
            value: str[i++]
          });
          continue;
        }

        if (char === "{") {
          tokens.push({
            type: "OPEN",
            index: i,
            value: str[i++]
          });
          continue;
        }

        if (char === "}") {
          tokens.push({
            type: "CLOSE",
            index: i,
            value: str[i++]
          });
          continue;
        }

        if (char === ":") {
          var name = "";
          var j = i + 1;

          while (j < str.length) {
            var code = str.charCodeAt(j);

            if ( // `0-9`
            code >= 48 && code <= 57 || // `A-Z`
            code >= 65 && code <= 90 || // `a-z`
            code >= 97 && code <= 122 || // `_`
            code === 95) {
              name += str[j++];
              continue;
            }

            break;
          }

          if (!name) throw new TypeError("Missing parameter name at " + i);
          tokens.push({
            type: "NAME",
            index: i,
            value: name
          });
          i = j;
          continue;
        }

        if (char === "(") {
          var count = 1;
          var pattern = "";
          var j = i + 1;

          if (str[j] === "?") {
            throw new TypeError("Pattern cannot start with \"?\" at " + j);
          }

          while (j < str.length) {
            if (str[j] === "\\") {
              pattern += str[j++] + str[j++];
              continue;
            }

            if (str[j] === ")") {
              count--;

              if (count === 0) {
                j++;
                break;
              }
            } else if (str[j] === "(") {
              count++;

              if (str[j + 1] !== "?") {
                throw new TypeError("Capturing groups are not allowed at " + j);
              }
            }

            pattern += str[j++];
          }

          if (count) throw new TypeError("Unbalanced pattern at " + i);
          if (!pattern) throw new TypeError("Missing pattern at " + i);
          tokens.push({
            type: "PATTERN",
            index: i,
            value: pattern
          });
          i = j;
          continue;
        }

        tokens.push({
          type: "CHAR",
          index: i,
          value: str[i++]
        });
      }

      tokens.push({
        type: "END",
        index: i,
        value: ""
      });
      return tokens;
    }
    /**
     * Parse a string for the raw tokens.
     */


    function parse(str, options) {
      if (options === void 0) {
        options = {};
      }

      var tokens = lexer(str);
      var _a = options.prefixes,
          prefixes = _a === void 0 ? "./" : _a;
      var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
      var result = [];
      var key = 0;
      var i = 0;
      var path = "";

      var tryConsume = function tryConsume(type) {
        if (i < tokens.length && tokens[i].type === type) return tokens[i++].value;
      };

      var mustConsume = function mustConsume(type) {
        var value = tryConsume(type);
        if (value !== undefined) return value;
        var _a = tokens[i],
            nextType = _a.type,
            index = _a.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
      };

      var consumeText = function consumeText() {
        var result = "";
        var value; // tslint:disable-next-line

        while (value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
          result += value;
        }

        return result;
      };

      while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");

        if (name || pattern) {
          var prefix = char || "";

          if (prefixes.indexOf(prefix) === -1) {
            path += prefix;
            prefix = "";
          }

          if (path) {
            result.push(path);
            path = "";
          }

          result.push({
            name: name || key++,
            prefix: prefix,
            suffix: "",
            pattern: pattern || defaultPattern,
            modifier: tryConsume("MODIFIER") || ""
          });
          continue;
        }

        var value = char || tryConsume("ESCAPED_CHAR");

        if (value) {
          path += value;
          continue;
        }

        if (path) {
          result.push(path);
          path = "";
        }

        var open = tryConsume("OPEN");

        if (open) {
          var prefix = consumeText();
          var name_1 = tryConsume("NAME") || "";
          var pattern_1 = tryConsume("PATTERN") || "";
          var suffix = consumeText();
          mustConsume("CLOSE");
          result.push({
            name: name_1 || (pattern_1 ? key++ : ""),
            pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
            prefix: prefix,
            suffix: suffix,
            modifier: tryConsume("MODIFIER") || ""
          });
          continue;
        }

        mustConsume("END");
      }

      return result;
    }
    /**
     * Compile a string to a template function for the path.
     */

    function compile(str, options) {
      return tokensToFunction(parse(str, options), options);
    }
    /**
     * Expose a method for transforming tokens into the path function.
     */

    function tokensToFunction(tokens, options) {
      if (options === void 0) {
        options = {};
      }

      var reFlags = flags(options);
      var _a = options.encode,
          encode = _a === void 0 ? function (x) {
        return x;
      } : _a,
          _b = options.validate,
          validate = _b === void 0 ? true : _b; // Compile all the tokens into regexps.

      var matches = tokens.map(function (token) {
        if (typeof token === "object") {
          return new RegExp("^(?:" + token.pattern + ")$", reFlags);
        }
      });
      return function (data) {
        var path = "";

        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];

          if (typeof token === "string") {
            path += token;
            continue;
          }

          var value = data ? data[token.name] : undefined;
          var optional = token.modifier === "?" || token.modifier === "*";
          var repeat = token.modifier === "*" || token.modifier === "+";

          if (Array.isArray(value)) {
            if (!repeat) {
              throw new TypeError("Expected \"" + token.name + "\" to not repeat, but got an array");
            }

            if (value.length === 0) {
              if (optional) continue;
              throw new TypeError("Expected \"" + token.name + "\" to not be empty");
            }

            for (var j = 0; j < value.length; j++) {
              var segment = encode(value[j], token);

              if (validate && !matches[i].test(segment)) {
                throw new TypeError("Expected all \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
              }

              path += token.prefix + segment + token.suffix;
            }

            continue;
          }

          if (typeof value === "string" || typeof value === "number") {
            var segment = encode(String(value), token);

            if (validate && !matches[i].test(segment)) {
              throw new TypeError("Expected \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
            }

            path += token.prefix + segment + token.suffix;
            continue;
          }

          if (optional) continue;
          var typeOfMessage = repeat ? "an array" : "a string";
          throw new TypeError("Expected \"" + token.name + "\" to be " + typeOfMessage);
        }

        return path;
      };
    }
    /**
     * Escape a regular expression string.
     */

    function escapeString(str) {
      return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    }
    /**
     * Get the flags for a regexp from the options.
     */


    function flags(options) {
      return options && options.sensitive ? "" : "i";
    }
    /**
     * Pull out keys from a regexp.
     */


    function regexpToRegexp(path, keys) {
      if (!keys) return path;
      var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
      var index = 0;
      var execResult = groupsRegex.exec(path.source);

      while (execResult) {
        keys.push({
          // Use parenthesized substring match if available, index otherwise
          name: execResult[1] || index++,
          prefix: "",
          suffix: "",
          modifier: "",
          pattern: ""
        });
        execResult = groupsRegex.exec(path.source);
      }

      return path;
    }
    /**
     * Transform an array into a regexp.
     */


    function arrayToRegexp(paths, keys, options) {
      var parts = paths.map(function (path) {
        return pathToRegexp(path, keys, options).source;
      });
      return new RegExp("(?:" + parts.join("|") + ")", flags(options));
    }
    /**
     * Create a path regexp from string input.
     */


    function stringToRegexp(path, keys, options) {
      return tokensToRegexp(parse(path, options), keys, options);
    }
    /**
     * Expose a function for taking tokens and returning a RegExp.
     */


    function tokensToRegexp(tokens, keys, options) {
      if (options === void 0) {
        options = {};
      }

      var _a = options.strict,
          strict = _a === void 0 ? false : _a,
          _b = options.start,
          start = _b === void 0 ? true : _b,
          _c = options.end,
          end = _c === void 0 ? true : _c,
          _d = options.encode,
          encode = _d === void 0 ? function (x) {
        return x;
      } : _d;
      var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
      var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
      var route = start ? "^" : ""; // Iterate over the tokens and create our regexp string.

      for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];

        if (typeof token === "string") {
          route += escapeString(encode(token));
        } else {
          var prefix = escapeString(encode(token.prefix));
          var suffix = escapeString(encode(token.suffix));

          if (token.pattern) {
            if (keys) keys.push(token);

            if (prefix || suffix) {
              if (token.modifier === "+" || token.modifier === "*") {
                var mod = token.modifier === "*" ? "?" : "";
                route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
              } else {
                route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
              }
            } else {
              route += "(" + token.pattern + ")" + token.modifier;
            }
          } else {
            route += "(?:" + prefix + suffix + ")" + token.modifier;
          }
        }
      }

      if (end) {
        if (!strict) route += delimiter + "?";
        route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
      } else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string" ? delimiter.indexOf(endToken[endToken.length - 1]) > -1 : // tslint:disable-next-line
        endToken === undefined;

        if (!strict) {
          route += "(?:" + delimiter + "(?=" + endsWith + "))?";
        }

        if (!isEndDelimited) {
          route += "(?=" + delimiter + "|" + endsWith + ")";
        }
      }

      return new RegExp(route, flags(options));
    }
    /**
     * Normalize the given path string, returning a regular expression.
     *
     * An empty array can be passed in for the keys, which will hold the
     * placeholder key descriptions. For example, using `/user/:id`, `keys` will
     * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
     */

    function pathToRegexp(path, keys, options) {
      if (path instanceof RegExp) return regexpToRegexp(path, keys);
      if (Array.isArray(path)) return arrayToRegexp(path, keys, options);
      return stringToRegexp(path, keys, options);
    }

    var History = {
      queue: [],
      clearQueue: function clearQueue() {
        if (History.queue.length === 0) return;
        var currentQueue = History.queue.shift();
        currentQueue();
      },
      routerQueue: [],
      clearRouterQueue: function clearRouterQueue() {
        if (History.routerQueue.length === 0) return;
        var currentQueue = History.routerQueue.pop();
        var router = currentQueue.router,
            stateUrl = currentQueue.stateUrl,
            action = currentQueue.action;
        var animate = router.params.animate;
        if (router.params.browserHistoryAnimate === false) animate = false;

        if (action === 'back') {
          router.back({
            animate: animate,
            browserHistory: false
          });
        }

        if (action === 'load') {
          router.navigate(stateUrl, {
            animate: animate,
            browserHistory: false
          });
        }
      },
      handle: function handle(e) {
        if (History.blockPopstate) return;
        var app = this; // const mainView = app.views.main;

        var state = e.state;
        History.previousState = History.state;
        History.state = state;
        History.allowChange = true;
        History.clearQueue();
        state = History.state;
        if (!state) state = {};
        app.views.forEach(function (view) {
          var router = view.router;
          var viewState = state[view.id];

          if (!viewState && view.params.browserHistory) {
            viewState = {
              url: view.router.history[0]
            };
          }

          if (!viewState) return;
          var stateUrl = viewState.url || undefined;
          var animate = router.params.animate;
          if (router.params.browserHistoryAnimate === false) animate = false;

          if (stateUrl !== router.url) {
            if (router.history.indexOf(stateUrl) >= 0) {
              // Go Back
              if (router.allowPageChange) {
                router.back({
                  animate: animate,
                  browserHistory: false
                });
              } else {
                History.routerQueue.push({
                  action: 'back',
                  router: router
                });
              }
            } else if (router.allowPageChange) {
              // Load page
              router.navigate(stateUrl, {
                animate: animate,
                browserHistory: false
              });
            } else {
              History.routerQueue.unshift({
                action: 'load',
                stateUrl: stateUrl,
                router: router
              });
            }
          }
        });
      },
      initViewState: function initViewState(viewId, viewState) {
        var _extend;

        var window = getWindow();
        var newState = extend$1({}, History.state || {}, (_extend = {}, _extend[viewId] = viewState, _extend));
        History.state = newState;
        window.history.replaceState(newState, '');
      },
      push: function push(viewId, viewState, url) {
        var _extend2;

        var window = getWindow();

        if (url.substr(-3) === '#!/') {
          // eslint-disable-next-line
          url = url.replace('#!/', '');
        }

        if (!History.allowChange) {
          History.queue.push(function () {
            History.push(viewId, viewState, url);
          });
          return;
        }

        History.previousState = History.state;
        var newState = extend$1({}, History.previousState || {}, (_extend2 = {}, _extend2[viewId] = viewState, _extend2));
        History.state = newState;
        window.history.pushState(newState, '', url);
      },
      replace: function replace(viewId, viewState, url) {
        var _extend3;

        var window = getWindow();

        if (url.substr(-3) === '#!/') {
          // eslint-disable-next-line
          url = url.replace('#!/', '');
        }

        if (!History.allowChange) {
          History.queue.push(function () {
            History.replace(viewId, viewState, url);
          });
          return;
        }

        History.previousState = History.state;
        var newState = extend$1({}, History.previousState || {}, (_extend3 = {}, _extend3[viewId] = viewState, _extend3));
        History.state = newState;
        window.history.replaceState(newState, '', url);
      },
      go: function go(index) {
        var window = getWindow();
        History.allowChange = false;
        window.history.go(index);
      },
      back: function back() {
        var window = getWindow();
        History.allowChange = false;
        window.history.back();
      },
      allowChange: true,
      previousState: {},
      state: {},
      blockPopstate: true,
      init: function init(app) {
        var window = getWindow();
        var document = getDocument();
        History.state = window.history.state;
        $$1(window).on('load', function () {
          setTimeout(function () {
            History.blockPopstate = false;
          }, 0);
        });

        if (document.readyState && document.readyState === 'complete') {
          History.blockPopstate = false;
        }

        $$1(window).on('popstate', History.handle.bind(app));
      }
    };

    function SwipeBack(r) {
      var router = r;
      var $el = router.$el,
          $navbarsEl = router.$navbarsEl,
          app = router.app,
          params = router.params;
      var support = getSupport();
      var device = getDevice();
      var isTouched = false;
      var isMoved = false;
      var touchesStart = {};
      var isScrolling;
      var $currentPageEl = [];
      var $previousPageEl = [];
      var viewContainerWidth;
      var touchesDiff;
      var allowViewTouchMove = true;
      var touchStartTime;
      var $currentNavbarEl = [];
      var $previousNavbarEl = [];
      var dynamicNavbar;
      var $pageShadowEl;
      var $pageOpacityEl;
      var animatableNavEls;
      var paramsSwipeBackAnimateShadow = params[app.theme + "SwipeBackAnimateShadow"];
      var paramsSwipeBackAnimateOpacity = params[app.theme + "SwipeBackAnimateOpacity"];
      var paramsSwipeBackActiveArea = params[app.theme + "SwipeBackActiveArea"];
      var paramsSwipeBackThreshold = params[app.theme + "SwipeBackThreshold"];
      var transformOrigin = app.rtl ? 'right center' : 'left center';
      var transformOriginTitleLarge = app.rtl ? 'calc(100% - var(--f7-navbar-large-title-padding-left) - var(--f7-safe-area-left)) center' : 'calc(var(--f7-navbar-large-title-padding-left) + var(--f7-safe-area-left)) center';

      function animatableNavElements() {
        var els = [];
        var inverter = app.rtl ? -1 : 1;
        var currentNavIsTransparent = $currentNavbarEl.hasClass('navbar-transparent') && !$currentNavbarEl.hasClass('navbar-large') && !$currentNavbarEl.hasClass('navbar-transparent-visible');
        var currentNavIsLarge = $currentNavbarEl.hasClass('navbar-large');
        var currentNavIsCollapsed = $currentNavbarEl.hasClass('navbar-large-collapsed');
        var currentNavIsLargeTransparent = $currentNavbarEl.hasClass('navbar-large-transparent') || $currentNavbarEl.hasClass('navbar-large') && $currentNavbarEl.hasClass('navbar-transparent');
        var previousNavIsTransparent = $previousNavbarEl.hasClass('navbar-transparent') && !$previousNavbarEl.hasClass('navbar-large') && !$previousNavbarEl.hasClass('navbar-transparent-visible');
        var previousNavIsLarge = $previousNavbarEl.hasClass('navbar-large');
        var previousNavIsCollapsed = $previousNavbarEl.hasClass('navbar-large-collapsed');
        var previousNavIsLargeTransparent = $previousNavbarEl.hasClass('navbar-large-transparent') || $previousNavbarEl.hasClass('navbar-large') && $previousNavbarEl.hasClass('navbar-transparent');
        var fromLarge = currentNavIsLarge && !currentNavIsCollapsed;
        var toLarge = previousNavIsLarge && !previousNavIsCollapsed;
        var $currentNavElements = $currentNavbarEl.find('.left, .title, .right, .subnavbar, .fading, .title-large, .navbar-bg');
        var $previousNavElements = $previousNavbarEl.find('.left, .title, .right, .subnavbar, .fading, .title-large, .navbar-bg');
        var activeNavBackIconText;
        var previousNavBackIconText;

        if (params.iosAnimateNavbarBackIcon) {
          if ($currentNavbarEl.hasClass('sliding') || $currentNavbarEl.find('.navbar-inner.sliding').length) {
            activeNavBackIconText = $currentNavbarEl.find('.left').find('.back .icon + span').eq(0);
          } else {
            activeNavBackIconText = $currentNavbarEl.find('.left.sliding').find('.back .icon + span').eq(0);
          }

          if ($previousNavbarEl.hasClass('sliding') || $previousNavbarEl.find('.navbar-inner.sliding').length) {
            previousNavBackIconText = $previousNavbarEl.find('.left').find('.back .icon + span').eq(0);
          } else {
            previousNavBackIconText = $previousNavbarEl.find('.left.sliding').find('.back .icon + span').eq(0);
          }

          if (activeNavBackIconText.length) {
            $previousNavElements.each(function (el) {
              if (!$$1(el).hasClass('title')) return;
              el.f7NavbarLeftOffset += activeNavBackIconText.prev('.icon')[0].offsetWidth;
            });
          }
        }

        $currentNavElements.each(function (navEl) {
          var $navEl = $$1(navEl);
          var isSubnavbar = $navEl.hasClass('subnavbar');
          var isLeft = $navEl.hasClass('left');
          var isTitle = $navEl.hasClass('title');
          var isBg = $navEl.hasClass('navbar-bg');
          if ((isTitle || isBg) && currentNavIsTransparent) return;
          if (!fromLarge && $navEl.hasClass('.title-large')) return;
          var el = {
            el: navEl
          };

          if (fromLarge) {
            if (isTitle) return;

            if ($navEl.hasClass('title-large')) {
              if (els.indexOf(el) < 0) els.push(el);
              el.overflow = 'visible';
              $navEl.find('.title-large-text').each(function (subNavEl) {
                els.push({
                  el: subNavEl,
                  transform: function transform(progress) {
                    return "translateX(" + progress * 100 * inverter + "%)";
                  }
                });
              });
              return;
            }
          }

          if (toLarge) {
            if (!fromLarge) {
              if ($navEl.hasClass('title-large')) {
                if (els.indexOf(el) < 0) els.push(el);
                el.opacity = 0;
              }
            }

            if (isLeft) {
              if (els.indexOf(el) < 0) els.push(el);

              el.opacity = function (progress) {
                return 1 - Math.pow(progress, 0.33);
              };

              $navEl.find('.back span').each(function (subNavEl) {
                els.push({
                  el: subNavEl,
                  'transform-origin': transformOrigin,
                  transform: function transform(progress) {
                    return "translateX(calc(" + progress + " * (var(--f7-navbarTitleLargeOffset) - var(--f7-navbarLeftTextOffset)))) translateY(calc(" + progress + " * (var(--f7-navbar-large-title-height) - var(--f7-navbar-large-title-padding-vertical) / 2))) scale(" + (1 + 1 * progress) + ")";
                  }
                });
              });
              return;
            }
          }

          if (isBg) {
            if (els.indexOf(el) < 0) els.push(el);

            if (!fromLarge && !toLarge) {
              if (currentNavIsCollapsed) {
                if (currentNavIsLargeTransparent) {
                  el.className = 'ios-swipeback-navbar-bg-large';
                }

                el.transform = function (progress) {
                  return "translateX(" + 100 * progress * inverter + "%) translateY(calc(-1 * var(--f7-navbar-large-title-height)))";
                };
              } else {
                el.transform = function (progress) {
                  return "translateX(" + 100 * progress * inverter + "%)";
                };
              }
            }

            if (!fromLarge && toLarge) {
              el.className = 'ios-swipeback-navbar-bg-large';

              el.transform = function (progress) {
                return "translateX(" + 100 * progress * inverter + "%) translateY(calc(-1 * " + (1 - progress) + " * var(--f7-navbar-large-title-height)))";
              };
            }

            if (fromLarge && toLarge) {
              el.transform = function (progress) {
                return "translateX(" + 100 * progress * inverter + "%)";
              };
            }

            if (fromLarge && !toLarge) {
              el.transform = function (progress) {
                return "translateX(" + 100 * progress * inverter + "%) translateY(calc(-" + progress + " * var(--f7-navbar-large-title-height)))";
              };
            }

            return;
          }

          if ($navEl.hasClass('title-large')) return;
          var isSliding = $navEl.hasClass('sliding') || $navEl.parents('.navbar-inner.sliding').length;
          if (els.indexOf(el) < 0) els.push(el);

          if (!isSubnavbar || isSubnavbar && !isSliding) {
            el.opacity = function (progress) {
              return 1 - Math.pow(progress, 0.33);
            };
          }

          if (isSliding) {
            var transformTarget = el;

            if (isLeft && activeNavBackIconText.length && params.iosAnimateNavbarBackIcon) {
              var textEl = {
                el: activeNavBackIconText[0]
              };
              transformTarget = textEl;
              els.push(textEl);
            }

            transformTarget.transform = function (progress) {
              var activeNavTranslate = progress * transformTarget.el.f7NavbarRightOffset;
              if (device.pixelRatio === 1) activeNavTranslate = Math.round(activeNavTranslate);

              if (isSubnavbar && currentNavIsLarge) {
                return "translate3d(" + activeNavTranslate + "px, calc(-1 * var(--f7-navbar-large-collapse-progress) * var(--f7-navbar-large-title-height)), 0)";
              }

              return "translate3d(" + activeNavTranslate + "px,0,0)";
            };
          }
        });
        $previousNavElements.each(function (navEl) {
          var $navEl = $$1(navEl);
          var isSubnavbar = $navEl.hasClass('subnavbar');
          var isLeft = $navEl.hasClass('left');
          var isTitle = $navEl.hasClass('title');
          var isBg = $navEl.hasClass('navbar-bg');
          if ((isTitle || isBg) && previousNavIsTransparent) return;
          var el = {
            el: navEl
          };

          if (toLarge) {
            if (isTitle) return;
            if (els.indexOf(el) < 0) els.push(el);

            if ($navEl.hasClass('title-large')) {
              el.opacity = 1;
              el.overflow = 'visible';
              $navEl.find('.title-large-text').each(function (subNavEl) {
                els.push({
                  el: subNavEl,
                  'transform-origin': transformOriginTitleLarge,
                  opacity: function opacity(progress) {
                    return Math.pow(progress, 3);
                  },
                  transform: function transform(progress) {
                    return "translateX(calc(" + (1 - progress) + " * (var(--f7-navbarLeftTextOffset) - var(--f7-navbarTitleLargeOffset)))) translateY(calc(" + (progress - 1) + " * var(--f7-navbar-large-title-height) + " + (1 - progress) + " * var(--f7-navbar-large-title-padding-vertical))) scale(" + (0.5 + progress * 0.5) + ")";
                  }
                });
              });
              return;
            }
          }

          if (isBg) {
            if (els.indexOf(el) < 0) els.push(el);

            if (!fromLarge && !toLarge) {
              if (previousNavIsCollapsed) {
                if (previousNavIsLargeTransparent) {
                  el.className = 'ios-swipeback-navbar-bg-large';
                }

                el.transform = function (progress) {
                  return "translateX(" + (-100 + 100 * progress) * inverter + "%) translateY(calc(-1 * var(--f7-navbar-large-title-height)))";
                };
              } else {
                el.transform = function (progress) {
                  return "translateX(" + (-100 + 100 * progress) * inverter + "%)";
                };
              }
            }

            if (!fromLarge && toLarge) {
              el.transform = function (progress) {
                return "translateX(" + (-100 + 100 * progress) * inverter + "%) translateY(calc(-1 * " + (1 - progress) + " * var(--f7-navbar-large-title-height)))";
              };
            }

            if (fromLarge && !toLarge) {
              el.className = 'ios-swipeback-navbar-bg-large';

              el.transform = function (progress) {
                return "translateX(" + (-100 + 100 * progress) * inverter + "%) translateY(calc(-" + progress + " * var(--f7-navbar-large-title-height)))";
              };
            }

            if (fromLarge && toLarge) {
              el.transform = function (progress) {
                return "translateX(" + (-100 + 100 * progress) * inverter + "%)";
              };
            }

            return;
          }

          if ($navEl.hasClass('title-large')) return;
          var isSliding = $navEl.hasClass('sliding') || $previousNavbarEl.children('.navbar-inner.sliding').length;
          if (els.indexOf(el) < 0) els.push(el);

          if (!isSubnavbar || isSubnavbar && !isSliding) {
            el.opacity = function (progress) {
              return Math.pow(progress, 3);
            };
          }

          if (isSliding) {
            var transformTarget = el;

            if (isLeft && previousNavBackIconText.length && params.iosAnimateNavbarBackIcon) {
              var textEl = {
                el: previousNavBackIconText[0]
              };
              transformTarget = textEl;
              els.push(textEl);
            }

            transformTarget.transform = function (progress) {
              var previousNavTranslate = transformTarget.el.f7NavbarLeftOffset * (1 - progress);
              if (device.pixelRatio === 1) previousNavTranslate = Math.round(previousNavTranslate);

              if (isSubnavbar && previousNavIsLarge) {
                return "translate3d(" + previousNavTranslate + "px, calc(-1 * var(--f7-navbar-large-collapse-progress) * var(--f7-navbar-large-title-height)), 0)";
              }

              return "translate3d(" + previousNavTranslate + "px,0,0)";
            };
          }
        });
        return els;
      }

      function setAnimatableNavElements(_temp) {
        var _ref = _temp === void 0 ? {} : _temp,
            progress = _ref.progress,
            reset = _ref.reset,
            transition = _ref.transition,
            reflow = _ref.reflow;

        var styles = ['overflow', 'transform', 'transform-origin', 'opacity'];

        if (transition === true || transition === false) {
          for (var i = 0; i < animatableNavEls.length; i += 1) {
            var el = animatableNavEls[i];

            if (el && el.el) {
              if (transition === true) el.el.classList.add('navbar-page-transitioning');
              if (transition === false) el.el.classList.remove('navbar-page-transitioning');
            }
          }
        }

        if (reflow && animatableNavEls.length && animatableNavEls[0] && animatableNavEls[0].el) {
          // eslint-disable-next-line
          animatableNavEls[0].el._clientLeft = animatableNavEls[0].el.clientLeft;
        }

        for (var _i = 0; _i < animatableNavEls.length; _i += 1) {
          var _el = animatableNavEls[_i];

          if (_el && _el.el) {
            if (_el.className && !_el.classNameSet && !reset) {
              _el.el.classList.add(_el.className);

              _el.classNameSet = true;
            }

            if (_el.className && reset) {
              _el.el.classList.remove(_el.className);
            }

            for (var j = 0; j < styles.length; j += 1) {
              var styleProp = styles[j];

              if (_el[styleProp]) {
                if (reset) {
                  _el.el.style[styleProp] = '';
                } else if (typeof _el[styleProp] === 'function') {
                  _el.el.style[styleProp] = _el[styleProp](progress);
                } else {
                  _el.el.style[styleProp] = _el[styleProp];
                }
              }
            }
          }
        }
      }

      function handleTouchStart(e) {
        var swipeBackEnabled = params[app.theme + "SwipeBack"];
        if (!allowViewTouchMove || !swipeBackEnabled || isTouched || app.swipeout && app.swipeout.el || !router.allowPageChange) return;
        if ($$1(e.target).closest('.range-slider, .calendar-months').length > 0) return;
        if ($$1(e.target).closest('.page-master, .page-master-detail').length > 0 && params.masterDetailBreakpoint > 0 && app.width >= params.masterDetailBreakpoint) return;
        isMoved = false;
        isTouched = true;
        isScrolling = undefined;
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchStartTime = now();
        dynamicNavbar = router.dynamicNavbar;
      }

      function handleTouchMove(e) {
        if (!isTouched) return;
        var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

        if (typeof isScrolling === 'undefined') {
          isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x)) || pageX < touchesStart.x && !app.rtl || pageX > touchesStart.x && app.rtl;
        }

        if (isScrolling || e.f7PreventSwipeBack || app.preventSwipeBack) {
          isTouched = false;
          return;
        }

        if (!isMoved) {
          // Calc values during first move fired
          var cancel = false;
          var target = $$1(e.target);
          var swipeout = target.closest('.swipeout');

          if (swipeout.length > 0) {
            if (!app.rtl && swipeout.find('.swipeout-actions-left').length > 0) cancel = true;
            if (app.rtl && swipeout.find('.swipeout-actions-right').length > 0) cancel = true;
          }

          $currentPageEl = target.closest('.page');
          if ($currentPageEl.hasClass('no-swipeback') || target.closest('.no-swipeback, .card-opened').length > 0) cancel = true;
          $previousPageEl = $el.find('.page-previous:not(.stacked)');

          if ($previousPageEl.length > 1) {
            $previousPageEl = $previousPageEl.eq($previousPageEl.length - 1);
          }

          var notFromBorder = touchesStart.x - $el.offset().left > paramsSwipeBackActiveArea;
          viewContainerWidth = $el.width();

          if (app.rtl) {
            notFromBorder = touchesStart.x < $el.offset().left - $el[0].scrollLeft + (viewContainerWidth - paramsSwipeBackActiveArea);
          } else {
            notFromBorder = touchesStart.x - $el.offset().left > paramsSwipeBackActiveArea;
          }

          if (notFromBorder) cancel = true;
          if ($previousPageEl.length === 0 || $currentPageEl.length === 0) cancel = true;

          if (cancel) {
            isTouched = false;
            return;
          }

          if (paramsSwipeBackAnimateShadow) {
            $pageShadowEl = $currentPageEl.find('.page-shadow-effect');

            if ($pageShadowEl.length === 0) {
              $pageShadowEl = $$1('<div class="page-shadow-effect"></div>');
              $currentPageEl.append($pageShadowEl);
            }
          }

          if (paramsSwipeBackAnimateOpacity) {
            $pageOpacityEl = $previousPageEl.find('.page-opacity-effect');

            if ($pageOpacityEl.length === 0) {
              $pageOpacityEl = $$1('<div class="page-opacity-effect"></div>');
              $previousPageEl.append($pageOpacityEl);
            }
          }

          if (dynamicNavbar) {
            $currentNavbarEl = $navbarsEl.find('.navbar-current:not(.stacked)');
            $previousNavbarEl = $navbarsEl.find('.navbar-previous:not(.stacked)');

            if ($previousNavbarEl.length > 1) {
              $previousNavbarEl = $previousNavbarEl.eq($previousNavbarEl.length - 1);
            }

            animatableNavEls = animatableNavElements();
          } // Close/Hide Any Picker


          if ($$1('.sheet.modal-in').length > 0 && app.sheet) {
            app.sheet.close($$1('.sheet.modal-in'));
          }
        }

        e.f7PreventSwipePanel = true;
        isMoved = true;
        app.preventSwipePanelBySwipeBack = true;
        e.preventDefault(); // RTL inverter

        var inverter = app.rtl ? -1 : 1; // Touches diff

        touchesDiff = (pageX - touchesStart.x - paramsSwipeBackThreshold) * inverter;
        if (touchesDiff < 0) touchesDiff = 0;
        var percentage = Math.min(Math.max(touchesDiff / viewContainerWidth, 0), 1); // Swipe Back Callback

        var callbackData = {
          percentage: percentage,
          progress: percentage,
          currentPageEl: $currentPageEl[0],
          previousPageEl: $previousPageEl[0],
          currentNavbarEl: $currentNavbarEl[0],
          previousNavbarEl: $previousNavbarEl[0]
        };
        $el.trigger('swipeback:move', callbackData);
        router.emit('swipebackMove', callbackData); // Transform pages

        var currentPageTranslate = touchesDiff * inverter;
        var previousPageTranslate = (touchesDiff / 5 - viewContainerWidth / 5) * inverter;

        if (!app.rtl) {
          currentPageTranslate = Math.min(currentPageTranslate, viewContainerWidth);
          previousPageTranslate = Math.min(previousPageTranslate, 0);
        } else {
          currentPageTranslate = Math.max(currentPageTranslate, -viewContainerWidth);
          previousPageTranslate = Math.max(previousPageTranslate, 0);
        }

        if (device.pixelRatio === 1) {
          currentPageTranslate = Math.round(currentPageTranslate);
          previousPageTranslate = Math.round(previousPageTranslate);
        }

        router.swipeBackActive = true;
        $$1([$currentPageEl[0], $previousPageEl[0]]).addClass('page-swipeback-active');
        $currentPageEl.transform("translate3d(" + currentPageTranslate + "px,0,0)");
        if (paramsSwipeBackAnimateShadow) $pageShadowEl[0].style.opacity = 1 - 1 * percentage;

        if (app.theme === 'ios') {
          $previousPageEl.transform("translate3d(" + previousPageTranslate + "px,0,0)");
        }

        if (paramsSwipeBackAnimateOpacity) $pageOpacityEl[0].style.opacity = 1 - 1 * percentage; // Dynamic Navbars Animation

        if (!dynamicNavbar) return;
        setAnimatableNavElements({
          progress: percentage
        });
      }

      function handleTouchEnd() {
        app.preventSwipePanelBySwipeBack = false;

        if (!isTouched || !isMoved) {
          isTouched = false;
          isMoved = false;
          return;
        }

        isTouched = false;
        isMoved = false;
        router.swipeBackActive = false;
        var $pages = $$1([$currentPageEl[0], $previousPageEl[0]]);
        $pages.removeClass('page-swipeback-active');

        if (touchesDiff === 0) {
          $pages.transform('');
          if ($pageShadowEl && $pageShadowEl.length > 0) $pageShadowEl.remove();
          if ($pageOpacityEl && $pageOpacityEl.length > 0) $pageOpacityEl.remove();

          if (dynamicNavbar) {
            setAnimatableNavElements({
              reset: true
            });
          }

          return;
        }

        var timeDiff = now() - touchStartTime;
        var pageChanged = false; // Swipe back to previous page

        if (timeDiff < 300 && touchesDiff > 10 || timeDiff >= 300 && touchesDiff > viewContainerWidth / 2) {
          $currentPageEl.removeClass('page-current').addClass("page-next" + (app.theme !== 'ios' ? ' page-next-on-right' : ''));
          $previousPageEl.removeClass('page-previous').addClass('page-current').removeAttr('aria-hidden');
          if ($pageShadowEl) $pageShadowEl[0].style.opacity = '';
          if ($pageOpacityEl) $pageOpacityEl[0].style.opacity = '';

          if (dynamicNavbar) {
            router.setNavbarPosition($currentNavbarEl, 'next');
            router.setNavbarPosition($previousNavbarEl, 'current', false);
          }

          pageChanged = true;
        } // Reset custom styles
        // Add transitioning class for transition-duration


        $pages.addClass('page-transitioning page-transitioning-swipeback');

        if (device.ios) {
          // eslint-disable-next-line
          $currentPageEl[0]._clientLeft = $currentPageEl[0].clientLeft;
        }

        $pages.transform('');

        if (dynamicNavbar) {
          setAnimatableNavElements({
            progress: pageChanged ? 1 : 0,
            transition: true,
            reflow: !!device.ios
          });
        }

        allowViewTouchMove = false;
        router.allowPageChange = false; // Swipe Back Callback

        var callbackData = {
          currentPageEl: $currentPageEl[0],
          previousPageEl: $previousPageEl[0],
          currentNavbarEl: $currentNavbarEl[0],
          previousNavbarEl: $previousNavbarEl[0]
        };

        if (pageChanged) {
          // Update Route
          router.currentRoute = $previousPageEl[0].f7Page.route;
          router.currentPage = $previousPageEl[0]; // Page before animation callback

          router.pageCallback('beforeOut', $currentPageEl, $currentNavbarEl, 'current', 'next', {
            route: $currentPageEl[0].f7Page.route,
            swipeBack: true
          });
          router.pageCallback('beforeIn', $previousPageEl, $previousNavbarEl, 'previous', 'current', {
            route: $previousPageEl[0].f7Page.route,
            swipeBack: true
          }, $currentPageEl[0]);
          $el.trigger('swipeback:beforechange', callbackData);
          router.emit('swipebackBeforeChange', callbackData);
        } else {
          $el.trigger('swipeback:beforereset', callbackData);
          router.emit('swipebackBeforeReset', callbackData);
        }

        $currentPageEl.transitionEnd(function () {
          $pages.removeClass('page-transitioning page-transitioning-swipeback');

          if (dynamicNavbar) {
            setAnimatableNavElements({
              reset: true,
              transition: false
            });
          }

          allowViewTouchMove = true;
          router.allowPageChange = true;

          if (pageChanged) {
            // Update History
            if (router.history.length === 1) {
              router.history.unshift(router.url);
            }

            router.history.pop();
            router.saveHistory(); // Update push state

            if (params.browserHistory) {
              History.back();
            } // Page after animation callback


            router.pageCallback('afterOut', $currentPageEl, $currentNavbarEl, 'current', 'next', {
              route: $currentPageEl[0].f7Page.route,
              swipeBack: true
            });
            router.pageCallback('afterIn', $previousPageEl, $previousNavbarEl, 'previous', 'current', {
              route: $previousPageEl[0].f7Page.route,
              swipeBack: true
            }); // Remove Old Page

            if (params.stackPages && router.initialPages.indexOf($currentPageEl[0]) >= 0) {
              $currentPageEl.addClass('stacked');

              if (dynamicNavbar) {
                $currentNavbarEl.addClass('stacked');
              }
            } else {
              router.pageCallback('beforeRemove', $currentPageEl, $currentNavbarEl, 'next', {
                swipeBack: true
              });
              router.removePage($currentPageEl);

              if (dynamicNavbar) {
                router.removeNavbar($currentNavbarEl);
              }
            }

            $el.trigger('swipeback:afterchange', callbackData);
            router.emit('swipebackAfterChange', callbackData);
            router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

            if (params.preloadPreviousPage) {
              router.back(router.history[router.history.length - 2], {
                preload: true
              });
            }
          } else {
            $el.trigger('swipeback:afterreset', callbackData);
            router.emit('swipebackAfterReset', callbackData);
          }

          if ($pageShadowEl && $pageShadowEl.length > 0) $pageShadowEl.remove();
          if ($pageOpacityEl && $pageOpacityEl.length > 0) $pageOpacityEl.remove();
        });
      }

      function attachEvents() {
        var passiveListener = app.touchEvents.start === 'touchstart' && support.passiveListener ? {
          passive: true,
          capture: false
        } : false;
        $el.on(app.touchEvents.start, handleTouchStart, passiveListener);
        app.on('touchmove:active', handleTouchMove);
        app.on('touchend:passive', handleTouchEnd);
      }

      function detachEvents() {
        var passiveListener = app.touchEvents.start === 'touchstart' && support.passiveListener ? {
          passive: true,
          capture: false
        } : false;
        $el.off(app.touchEvents.start, handleTouchStart, passiveListener);
        app.off('touchmove:active', handleTouchMove);
        app.off('touchend:passive', handleTouchEnd);
      }

      attachEvents();
      router.on('routerDestroy', detachEvents);
    }

    function redirect(direction, route, options) {
      var router = this;
      var r = route.route.redirect;
      var method = direction === 'forward' ? 'navigate' : 'back';

      if (options.initial && router.params.browserHistory) {
        options.replaceState = true; // eslint-disable-line

        options.history = true; // eslint-disable-line
      }

      function redirectResolve(redirectUrl, redirectOptions) {
        if (redirectOptions === void 0) {
          redirectOptions = {};
        }

        router.allowPageChange = true;
        router[method](redirectUrl, extend$1({}, options, redirectOptions));
      }

      function redirectReject() {
        router.allowPageChange = true;
      }

      if (typeof r === 'function') {
        router.allowPageChange = false;
        var redirectUrl = r.call(router, {
          router: router,
          to: route,
          resolve: redirectResolve,
          reject: redirectReject,
          direction: direction,
          app: router.app
        });

        if (redirectUrl && typeof redirectUrl === 'string') {
          router.allowPageChange = true;
          return router[method](redirectUrl, options);
        }

        return router;
      }

      return router[method](r, options);
    }

    function processQueue(router, routerQueue, routeQueue, to, from, resolve, _reject, direction) {
      var queue = [];

      if (Array.isArray(routeQueue)) {
        queue.push.apply(queue, routeQueue);
      } else if (routeQueue && typeof routeQueue === 'function') {
        queue.push(routeQueue);
      }

      if (routerQueue) {
        if (Array.isArray(routerQueue)) {
          queue.push.apply(queue, routerQueue);
        } else {
          queue.push(routerQueue);
        }
      }

      function next() {
        if (queue.length === 0) {
          resolve();
          return;
        }

        var queueItem = queue.shift();
        queueItem.call(router, {
          router: router,
          to: to,
          from: from,
          resolve: function resolve() {
            next();
          },
          reject: function reject() {
            _reject();
          },
          direction: direction,
          app: router.app
        });
      }

      next();
    }

    function processRouteQueue(to, from, resolve, reject, direction) {
      var router = this;

      function enterNextRoute() {
        if (to && to.route && (router.params.routesBeforeEnter || to.route.beforeEnter)) {
          router.allowPageChange = false;
          processQueue(router, router.params.routesBeforeEnter, to.route.beforeEnter, to, from, function () {
            router.allowPageChange = true;
            resolve();
          }, function () {
            reject();
          }, direction);
        } else {
          resolve();
        }
      }

      function leaveCurrentRoute() {
        if (from && from.route && (router.params.routesBeforeLeave || from.route.beforeLeave)) {
          router.allowPageChange = false;
          processQueue(router, router.params.routesBeforeLeave, from.route.beforeLeave, to, from, function () {
            router.allowPageChange = true;
            enterNextRoute();
          }, function () {
            reject();
          }, direction);
        } else {
          enterNextRoute();
        }
      }

      leaveCurrentRoute();
    }

    function appRouterCheck(router, method) {
      if (!router.view) {
        throw new Error("Framework7: it is not allowed to use router methods on global app router. Use router methods only on related View, e.g. app.views.main.router." + method + "(...)");
      }
    }

    function asyncComponent(router, component, resolve, reject) {
      function resolvePromise(componentPromise) {
        componentPromise.then(function (c) {
          // eslint-disable-next-line
          resolve({
            component: c.default || c._default || c
          });
        }).catch(function (err) {
          reject();
          throw new Error(err);
        });
      }

      if (component instanceof Promise) {
        resolvePromise(component);
        return;
      }

      var asyncComponentResult = component.call(router);

      if (asyncComponentResult instanceof Promise) {
        resolvePromise(asyncComponentResult);
      } else {
        resolve({
          component: asyncComponentResult
        });
      }
    }

    function refreshPage() {
      var router = this;
      appRouterCheck(router, 'refreshPage');
      return router.navigate(router.currentRoute.url, {
        ignoreCache: true,
        reloadCurrent: true
      });
    }

    function forward(router, el, forwardOptions) {
      if (forwardOptions === void 0) {
        forwardOptions = {};
      }

      var document = getDocument();
      var $el = $$1(el);
      var app = router.app;
      var view = router.view;
      var options = extend$1(false, {
        animate: router.params.animate,
        browserHistory: true,
        replaceState: false,
        history: true,
        reloadCurrent: router.params.reloadPages,
        reloadPrevious: false,
        reloadAll: false,
        clearPreviousHistory: false,
        reloadDetail: router.params.reloadDetail,
        on: {}
      }, forwardOptions);
      var masterDetailEnabled = router.params.masterDetailBreakpoint > 0;
      var isMaster = masterDetailEnabled && options.route && options.route.route && (options.route.route.master === true || typeof options.route.route.master === 'function' && options.route.route.master(app, router));
      var masterPageEl;
      var otherDetailPageEl;
      var detailsInBetweenRemoved = 0;
      var currentRouteIsModal = router.currentRoute.modal;
      var modalType;

      if (!currentRouteIsModal) {
        'popup popover sheet loginScreen actions customModal panel'.split(' ').forEach(function (modalLoadProp) {
          if (router.currentRoute && router.currentRoute.route && router.currentRoute.route[modalLoadProp]) {
            currentRouteIsModal = true;
            modalType = modalLoadProp;
          }
        });
      }

      if (currentRouteIsModal) {
        var modalToClose = router.currentRoute.modal || router.currentRoute.route.modalInstance || app[modalType].get();
        var previousUrl = router.history[router.history.length - 2];
        var previousRoute = router.findMatchingRoute(previousUrl);

        if (!previousRoute && previousUrl) {
          previousRoute = {
            url: previousUrl,
            path: previousUrl.split('?')[0],
            query: parseUrlQuery(previousUrl),
            route: {
              path: previousUrl.split('?')[0],
              url: previousUrl
            }
          };
        }

        router.modalRemove(modalToClose);
      }

      var dynamicNavbar = router.dynamicNavbar;
      var $viewEl = router.$el;
      var $newPage = $el;
      var reload = options.reloadPrevious || options.reloadCurrent || options.reloadAll;
      var $oldPage;
      var $navbarsEl;
      var $newNavbarEl;
      var $oldNavbarEl;
      router.allowPageChange = false;

      if ($newPage.length === 0) {
        router.allowPageChange = true;
        return router;
      }

      if ($newPage.length) {
        // Remove theme elements
        router.removeThemeElements($newPage);
      }

      if (dynamicNavbar) {
        $newNavbarEl = $newPage.children('.navbar');
        $navbarsEl = router.$navbarsEl;

        if ($newNavbarEl.length === 0 && $newPage[0] && $newPage[0].f7Page) {
          // Try from pageData
          $newNavbarEl = $newPage[0].f7Page.$navbarEl;
        }
      } // Save Keep Alive Cache


      if (options.route && options.route.route && options.route.route.keepAlive && !options.route.route.keepAliveData) {
        options.route.route.keepAliveData = {
          pageEl: $el[0]
        };
      } // Pages In View


      var $pagesInView = $viewEl.children('.page:not(.stacked)').filter(function (pageInView) {
        return pageInView !== $newPage[0];
      }); // Navbars In View

      var $navbarsInView;

      if (dynamicNavbar) {
        $navbarsInView = $navbarsEl.children('.navbar:not(.stacked)').filter(function (navbarInView) {
          return navbarInView !== $newNavbarEl[0];
        });
      } // Exit when reload previous and only 1 page in view so nothing ro reload


      if (options.reloadPrevious && $pagesInView.length < 2) {
        router.allowPageChange = true;
        return router;
      } // Find Detail' master page


      var isDetail;
      var reloadDetail;
      var isDetailRoot;

      if (masterDetailEnabled && !options.reloadAll) {
        for (var i = 0; i < $pagesInView.length; i += 1) {
          if (!masterPageEl && $pagesInView[i].classList.contains('page-master')) {
            masterPageEl = $pagesInView[i];
            continue; // eslint-disable-line
          }
        }

        isDetail = !isMaster && masterPageEl;

        if (isDetail) {
          // Find Other Detail
          if (masterPageEl) {
            for (var _i = 0; _i < $pagesInView.length; _i += 1) {
              if ($pagesInView[_i].classList.contains('page-master-detail')) {
                otherDetailPageEl = $pagesInView[_i];
                continue; // eslint-disable-line
              }
            }
          }
        }

        reloadDetail = isDetail && options.reloadDetail && app.width >= router.params.masterDetailBreakpoint && masterPageEl;
      }

      if (isDetail) {
        isDetailRoot = !otherDetailPageEl || reloadDetail || options.reloadAll || options.reloadCurrent;
      } // New Page


      var newPagePosition = 'next';

      if (options.reloadCurrent || options.reloadAll || reloadDetail) {
        newPagePosition = 'current';
      } else if (options.reloadPrevious) {
        newPagePosition = 'previous';
      }

      $newPage.removeClass('page-previous page-current page-next').addClass("page-" + newPagePosition + (isMaster ? ' page-master' : '') + (isDetail ? ' page-master-detail' : '') + (isDetailRoot ? ' page-master-detail-root' : '')).removeClass('stacked').trigger('page:unstack').trigger('page:position', {
        position: newPagePosition
      });
      router.emit('pageUnstack', $newPage[0]);
      router.emit('pagePosition', $newPage[0], newPagePosition);

      if (isMaster || isDetail) {
        $newPage.trigger('page:role', {
          role: isMaster ? 'master' : 'detail',
          root: !!isDetailRoot
        });
        router.emit('pageRole', $newPage[0], {
          role: isMaster ? 'master' : 'detail',
          detailRoot: !!isDetailRoot
        });
      }

      if (dynamicNavbar && $newNavbarEl.length) {
        $newNavbarEl.removeClass('navbar-previous navbar-current navbar-next').addClass("navbar-" + newPagePosition + (isMaster ? ' navbar-master' : '') + (isDetail ? ' navbar-master-detail' : '') + (isDetailRoot ? ' navbar-master-detail-root' : '')).removeClass('stacked');
        $newNavbarEl.trigger('navbar:position', {
          position: newPagePosition
        });
        router.emit('navbarPosition', $newNavbarEl[0], newPagePosition);

        if (isMaster || isDetail) {
          router.emit('navbarRole', $newNavbarEl[0], {
            role: isMaster ? 'master' : 'detail',
            detailRoot: !!isDetailRoot
          });
        }
      } // Find Old Page


      if (options.reloadCurrent || reloadDetail) {
        if (reloadDetail) {
          $oldPage = $pagesInView.filter(function (pageEl) {
            return !pageEl.classList.contains('page-master');
          });

          if (dynamicNavbar) {
            $oldNavbarEl = $$1($oldPage.map(function (pageEl) {
              return app.navbar.getElByPage(pageEl);
            }));
          }

          if ($oldPage.length > 1 && masterPageEl) {
            detailsInBetweenRemoved = $oldPage.length - 1;
            $$1(masterPageEl).removeClass('page-master-stacked').trigger('page:masterunstack');
            router.emit('pageMasterUnstack', masterPageEl);

            if (dynamicNavbar) {
              $$1(app.navbar.getElByPage(masterPageEl)).removeClass('navbar-master-stacked');
              router.emit('navbarMasterUnstack', app.navbar.getElByPage(masterPageEl));
            }
          }
        } else {
          $oldPage = $pagesInView.eq($pagesInView.length - 1);

          if (dynamicNavbar) {
            $oldNavbarEl = $$1(app.navbar.getElByPage($oldPage));
          }
        }
      } else if (options.reloadPrevious) {
        $oldPage = $pagesInView.eq($pagesInView.length - 2);

        if (dynamicNavbar) {
          // $oldNavbarEl = $navbarsInView.eq($pagesInView.length - 2);
          $oldNavbarEl = $$1(app.navbar.getElByPage($oldPage));
        }
      } else if (options.reloadAll) {
        $oldPage = $pagesInView.filter(function (pageEl) {
          return pageEl !== $newPage[0];
        });

        if (dynamicNavbar) {
          $oldNavbarEl = $navbarsInView.filter(function (navbarEl) {
            return navbarEl !== $newNavbarEl[0];
          });
        }
      } else {
        var removedPageEls = [];
        var removedNavbarEls = [];

        if ($pagesInView.length > 1) {
          var _i2 = 0;

          for (_i2 = 0; _i2 < $pagesInView.length - 1; _i2 += 1) {
            if (masterPageEl && $pagesInView[_i2] === masterPageEl) {
              $pagesInView.eq(_i2).addClass('page-master-stacked');
              $pagesInView.eq(_i2).trigger('page:masterstack');
              router.emit('pageMasterStack', $pagesInView[_i2]);

              if (dynamicNavbar) {
                $$1(app.navbar.getElByPage(masterPageEl)).addClass('navbar-master-stacked');
                router.emit('navbarMasterStack', app.navbar.getElByPage(masterPageEl));
              }

              continue; // eslint-disable-line
            }

            var oldNavbarEl = app.navbar.getElByPage($pagesInView.eq(_i2));

            if (router.params.stackPages) {
              $pagesInView.eq(_i2).addClass('stacked');
              $pagesInView.eq(_i2).trigger('page:stack');
              router.emit('pageStack', $pagesInView[_i2]);

              if (dynamicNavbar) {
                $$1(oldNavbarEl).addClass('stacked');
              }
            } else {
              // Page remove event
              removedPageEls.push($pagesInView[_i2]);
              router.pageCallback('beforeRemove', $pagesInView[_i2], $navbarsInView && $navbarsInView[_i2], 'previous', undefined, options);
              router.removePage($pagesInView[_i2]);

              if (dynamicNavbar && oldNavbarEl) {
                removedNavbarEls.push(oldNavbarEl);
                router.removeNavbar(oldNavbarEl);
              }
            }
          }
        }

        $oldPage = $viewEl.children('.page:not(.stacked)').filter(function (pageEl) {
          return pageEl !== $newPage[0] && removedPageEls.indexOf(pageEl) < 0;
        });

        if (dynamicNavbar) {
          $oldNavbarEl = $navbarsEl.children('.navbar:not(.stacked)').filter(function (navbarEl) {
            return navbarEl !== $newNavbarEl[0] && removedNavbarEls.indexOf(removedNavbarEls) < 0;
          });
        }

        removedPageEls = [];
        removedNavbarEls = [];
      }

      if (isDetail && !options.reloadAll) {
        if ($oldPage.length > 1 || reloadDetail) {
          $oldPage = $oldPage.filter(function (pageEl) {
            return !pageEl.classList.contains('page-master');
          });
        }

        if ($oldNavbarEl && ($oldNavbarEl.length > 1 || reloadDetail)) {
          $oldNavbarEl = $oldNavbarEl.filter(function (navbarEl) {
            return !navbarEl.classList.contains('navbar-master');
          });
        }
      } // Push State


      if (router.params.browserHistory && (options.browserHistory || options.replaceState) && !options.reloadPrevious) {
        var browserHistoryRoot = router.params.browserHistoryRoot || '';
        History[options.reloadCurrent || reloadDetail && otherDetailPageEl || options.reloadAll || options.replaceState ? 'replace' : 'push'](view.id, {
          url: options.route.url
        }, browserHistoryRoot + router.params.browserHistorySeparator + options.route.url);
      }

      if (!options.reloadPrevious) {
        // Current Page & Navbar
        router.currentPageEl = $newPage[0];

        if (dynamicNavbar && $newNavbarEl.length) {
          router.currentNavbarEl = $newNavbarEl[0];
        } else {
          delete router.currentNavbarEl;
        } // Current Route


        router.currentRoute = options.route;
      } // Update router history


      var url = options.route.url;

      if (options.history) {
        if (((options.reloadCurrent || reloadDetail && otherDetailPageEl) && router.history.length) > 0 || options.replaceState) {
          if (reloadDetail && detailsInBetweenRemoved > 0) {
            router.history = router.history.slice(0, router.history.length - detailsInBetweenRemoved);
          }

          router.history[router.history.length - (options.reloadPrevious ? 2 : 1)] = url;
        } else if (options.reloadPrevious) {
          router.history[router.history.length - 2] = url;
        } else if (options.reloadAll) {
          router.history = [url];
        } else {
          router.history.push(url);
        }
      }

      router.saveHistory(); // Insert new page and navbar

      var newPageInDom = $newPage.parents(document).length > 0;
      var f7Component = $newPage[0].f7Component;

      if (options.reloadPrevious) {
        if (f7Component && !newPageInDom) {
          f7Component.mount(function (componentEl) {
            $$1(componentEl).insertBefore($oldPage);
          });
        } else {
          $newPage.insertBefore($oldPage);
        }

        if (dynamicNavbar && $newNavbarEl.length) {
          if ($newNavbarEl.find('.title-large').length) {
            $newNavbarEl.addClass('navbar-large');
          }

          if ($oldNavbarEl.length) {
            $newNavbarEl.insertBefore($oldNavbarEl);
          } else {
            if (!router.$navbarsEl.parents(document).length) {
              router.$el.prepend(router.$navbarsEl);
            }

            $navbarsEl.append($newNavbarEl);
          }
        }
      } else {
        if ($oldPage.next('.page')[0] !== $newPage[0]) {
          if (f7Component && !newPageInDom) {
            f7Component.mount(function (componentEl) {
              $viewEl.append(componentEl);
            });
          } else {
            $viewEl.append($newPage[0]);
          }
        }

        if (dynamicNavbar && $newNavbarEl.length) {
          if ($newNavbarEl.find('.title-large').length) {
            $newNavbarEl.addClass('navbar-large');
          }

          if (!router.$navbarsEl.parents(document).length) {
            router.$el.prepend(router.$navbarsEl);
          }

          $navbarsEl.append($newNavbarEl[0]);
        }
      }

      if (!newPageInDom) {
        router.pageCallback('mounted', $newPage, $newNavbarEl, newPagePosition, reload ? newPagePosition : 'current', options, $oldPage);
      } else if (options.route && options.route.route && options.route.route.keepAlive && !$newPage[0].f7PageMounted) {
        $newPage[0].f7PageMounted = true;
        router.pageCallback('mounted', $newPage, $newNavbarEl, newPagePosition, reload ? newPagePosition : 'current', options, $oldPage);
      } // Remove old page


      if ((options.reloadCurrent || reloadDetail) && $oldPage.length > 0) {
        if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
          $oldPage.addClass('stacked');
          $oldPage.trigger('page:stack');
          router.emit('pageStack', $oldPage[0]);

          if (dynamicNavbar) {
            $oldNavbarEl.addClass('stacked');
          }
        } else {
          // Page remove event
          router.pageCallback('beforeOut', $oldPage, $oldNavbarEl, 'current', undefined, options);
          router.pageCallback('afterOut', $oldPage, $oldNavbarEl, 'current', undefined, options);
          router.pageCallback('beforeRemove', $oldPage, $oldNavbarEl, 'current', undefined, options);
          router.removePage($oldPage);

          if (dynamicNavbar && $oldNavbarEl && $oldNavbarEl.length) {
            router.removeNavbar($oldNavbarEl);
          }
        }
      } else if (options.reloadAll) {
        $oldPage.each(function (pageEl, index) {
          var $oldPageEl = $$1(pageEl);
          var $oldNavbarElEl = $$1(app.navbar.getElByPage($oldPageEl));

          if (router.params.stackPages && router.initialPages.indexOf($oldPageEl[0]) >= 0) {
            $oldPageEl.addClass('stacked');
            $oldPageEl.trigger('page:stack');
            router.emit('pageStack', $oldPageEl[0]);

            if (dynamicNavbar) {
              $oldNavbarElEl.addClass('stacked');
            }
          } else {
            // Page remove event
            if ($oldPageEl.hasClass('page-current')) {
              router.pageCallback('beforeOut', $oldPage, $oldNavbarEl, 'current', undefined, options);
              router.pageCallback('afterOut', $oldPage, $oldNavbarEl, 'current', undefined, options);
            }

            router.pageCallback('beforeRemove', $oldPageEl, $oldNavbarEl && $oldNavbarEl.eq(index), 'previous', undefined, options);
            router.removePage($oldPageEl);

            if (dynamicNavbar && $oldNavbarElEl.length) {
              router.removeNavbar($oldNavbarElEl);
            }
          }
        });
      } else if (options.reloadPrevious) {
        if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
          $oldPage.addClass('stacked');
          $oldPage.trigger('page:stack');
          router.emit('pageStack', $oldPage[0]);

          if (dynamicNavbar) {
            $oldNavbarEl.addClass('stacked');
          }
        } else {
          // Page remove event
          router.pageCallback('beforeRemove', $oldPage, $oldNavbarEl, 'previous', undefined, options);
          router.removePage($oldPage);

          if (dynamicNavbar && $oldNavbarEl && $oldNavbarEl.length) {
            router.removeNavbar($oldNavbarEl);
          }
        }
      } // Load Tab


      if (options.route.route.tab) {
        router.tabLoad(options.route.route.tab, extend$1({}, options, {
          history: false,
          browserHistory: false
        }));
      } // Check master detail


      if (masterDetailEnabled) {
        view.checkMasterDetailBreakpoint();
      } // Page init and before init events


      router.pageCallback('init', $newPage, $newNavbarEl, newPagePosition, reload ? newPagePosition : 'current', options, $oldPage);

      if (options.reloadCurrent || options.reloadAll || reloadDetail) {
        router.allowPageChange = true;
        router.pageCallback('beforeIn', $newPage, $newNavbarEl, newPagePosition, 'current', options);
        $newPage.removeAttr('aria-hidden');

        if (dynamicNavbar && $newNavbarEl) {
          $newNavbarEl.removeAttr('aria-hidden');
        }

        router.pageCallback('afterIn', $newPage, $newNavbarEl, newPagePosition, 'current', options);
        if (options.reloadCurrent && options.clearPreviousHistory) router.clearPreviousHistory();

        if (reloadDetail) {
          router.setPagePosition($$1(masterPageEl), 'previous');

          if (masterPageEl.f7Page && masterPageEl.f7Page.navbarEl) {
            router.setNavbarPosition($$1(masterPageEl.f7Page.navbarEl), 'previous');
          }
        }

        return router;
      }

      if (options.reloadPrevious) {
        router.allowPageChange = true;
        return router;
      } // Before animation event


      router.pageCallback('beforeOut', $oldPage, $oldNavbarEl, 'current', 'previous', options);
      router.pageCallback('beforeIn', $newPage, $newNavbarEl, 'next', 'current', options); // Animation

      function afterAnimation() {
        router.setPagePosition($newPage, 'current', false);
        router.setPagePosition($oldPage, 'previous', !$oldPage.hasClass('page-master'));

        if (dynamicNavbar) {
          router.setNavbarPosition($newNavbarEl, 'current', false);
          router.setNavbarPosition($oldNavbarEl, 'previous', !$oldNavbarEl.hasClass('navbar-master'));
        } // After animation event


        router.allowPageChange = true;
        router.pageCallback('afterOut', $oldPage, $oldNavbarEl, 'current', 'previous', options);
        router.pageCallback('afterIn', $newPage, $newNavbarEl, 'next', 'current', options);
        var keepOldPage = (router.params.preloadPreviousPage || router.params[app.theme + "SwipeBack"]) && !isMaster;

        if (!keepOldPage) {
          if ($newPage.hasClass('smart-select-page') || $newPage.hasClass('photo-browser-page') || $newPage.hasClass('autocomplete-page') || $newPage.hasClass('color-picker-page')) {
            keepOldPage = true;
          }
        }

        if (!keepOldPage) {
          if (router.params.stackPages) {
            $oldPage.addClass('stacked');
            $oldPage.trigger('page:stack');
            router.emit('pageStack', $oldPage[0]);

            if (dynamicNavbar) {
              $oldNavbarEl.addClass('stacked');
            }
          } else if (!($newPage.attr('data-name') && $newPage.attr('data-name') === 'smart-select-page')) {
            // Remove event
            router.pageCallback('beforeRemove', $oldPage, $oldNavbarEl, 'previous', undefined, options);
            router.removePage($oldPage);

            if (dynamicNavbar && $oldNavbarEl.length) {
              router.removeNavbar($oldNavbarEl);
            }
          }
        }

        if (options.clearPreviousHistory) router.clearPreviousHistory();
        router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

        if (router.params.browserHistory) {
          History.clearRouterQueue();
        }
      }

      function setPositionClasses() {
        router.setPagePosition($oldPage, 'current', false);
        router.setPagePosition($newPage, 'next', false);

        if (dynamicNavbar) {
          router.setNavbarPosition($oldNavbarEl, 'current', false);
          router.setNavbarPosition($newNavbarEl, 'next', false);
        }
      }

      if (options.animate && !(isMaster && app.width >= router.params.masterDetailBreakpoint)) {
        var delay = router.params[router.app.theme + "PageLoadDelay"];
        var transition = router.params.transition;
        if (options.transition) transition = options.transition;

        if (!transition && router.currentRoute && router.currentRoute.route) {
          transition = router.currentRoute.route.transition;
        }

        if (!transition && router.currentRoute && router.currentRoute.route.options) {
          transition = router.currentRoute.route.options.transition;
        }

        if (transition) {
          $newPage[0].f7PageTransition = transition;
        }

        if (delay) {
          setTimeout(function () {
            setPositionClasses();
            router.animate($oldPage, $newPage, $oldNavbarEl, $newNavbarEl, 'forward', transition, function () {
              afterAnimation();
            });
          }, delay);
        } else {
          setPositionClasses();
          router.animate($oldPage, $newPage, $oldNavbarEl, $newNavbarEl, 'forward', transition, function () {
            afterAnimation();
          });
        }
      } else {
        afterAnimation();
      }

      return router;
    }

    function load(router, loadParams, loadOptions, ignorePageChange) {
      if (loadParams === void 0) {
        loadParams = {};
      }

      if (loadOptions === void 0) {
        loadOptions = {};
      }

      if (!router.allowPageChange && !ignorePageChange) return router;
      var params = loadParams;
      var options = loadOptions;
      var url = params.url,
          content = params.content,
          el = params.el,
          pageName = params.pageName,
          component = params.component,
          componentUrl = params.componentUrl;

      if (!options.reloadCurrent && options.route && options.route.route && options.route.route.parentPath && router.currentRoute.route && router.currentRoute.route.parentPath === options.route.route.parentPath) {
        // Do something nested
        if (options.route.url === router.url) {
          router.allowPageChange = true;
          return false;
        } // Check for same params


        var sameParams = Object.keys(options.route.params).length === Object.keys(router.currentRoute.params).length;

        if (sameParams) {
          // Check for equal params name
          Object.keys(options.route.params).forEach(function (paramName) {
            if (!(paramName in router.currentRoute.params) || router.currentRoute.params[paramName] !== options.route.params[paramName]) {
              sameParams = false;
            }
          });
        }

        if (sameParams) {
          if (options.route.route.tab) {
            return router.tabLoad(options.route.route.tab, options);
          }

          return false;
        }

        if (!sameParams && options.route.route.tab && router.currentRoute.route.tab && router.currentRoute.parentPath === options.route.parentPath) {
          return router.tabLoad(options.route.route.tab, options);
        }
      }

      if (options.route && options.route.url && router.url === options.route.url && !(options.reloadCurrent || options.reloadPrevious) && !router.params.allowDuplicateUrls) {
        router.allowPageChange = true;
        return false;
      }

      if (!options.route && url) {
        options.route = router.parseRouteUrl(url);
        extend$1(options.route, {
          route: {
            url: url,
            path: url
          }
        });
      } // Component Callbacks


      function resolve(pageEl, newOptions) {
        return forward(router, pageEl, extend$1(options, newOptions));
      }

      function reject() {
        router.allowPageChange = true;
        return router;
      }

      if (url || componentUrl || component) {
        router.allowPageChange = false;
      } // Proceed


      if (content) {
        forward(router, router.getPageEl(content), options);
      } else if (el) {
        // Load page from specified HTMLElement or by page name in pages container
        forward(router, router.getPageEl(el), options);
      } else if (pageName) {
        // Load page by page name in pages container
        forward(router, router.$el.children(".page[data-name=\"" + pageName + "\"]").eq(0), options);
      } else if (component || componentUrl) {
        // Load from component (F7/Vue/React/...)
        try {
          router.pageComponentLoader({
            routerEl: router.el,
            component: component,
            componentUrl: componentUrl,
            options: options,
            resolve: resolve,
            reject: reject
          });
        } catch (err) {
          router.allowPageChange = true;
          throw err;
        }
      } else if (url) {
        // Load using XHR
        if (router.xhrAbortController) {
          router.xhrAbortController.abort();
          router.xhrAbortController = false;
        }

        router.xhrRequest(url, options).then(function (pageContent) {
          forward(router, router.getPageEl(pageContent), options);
        }).catch(function () {
          router.allowPageChange = true;
        });
      }

      return router;
    }

    function openIn(router, url, options) {
      var navigateOptions = {
        url: url,
        route: {
          path: url,
          options: _extends({}, options, {
            openIn: undefined
          })
        }
      };

      var params = _extends({}, options);

      if (options.openIn === 'popup') {
        params.content = "<div class=\"popup popup-router-open-in\" data-url=\"" + url + "\"><div class=\"view view-init\" data-links-view=\"" + router.view.selector + "\" data-url=\"" + url + "\" data-ignore-open-in=\"true\"></div></div>";
        navigateOptions.route.popup = params;
      }

      if (options.openIn === 'loginScreen') {
        params.content = "<div class=\"login-screen login-screen-router-open-in\" data-url=\"" + url + "\"><div class=\"view view-init\" data-links-view=\"" + router.view.selector + "\" data-url=\"" + url + "\" data-ignore-open-in=\"true\"></div></div>";
        navigateOptions.route.loginScreen = params;
      }

      if (options.openIn === 'sheet') {
        params.content = "<div class=\"sheet-modal sheet-modal-router-open-in\" data-url=\"" + url + "\"><div class=\"sheet-modal-inner\"><div class=\"view view-init\" data-links-view=\"" + router.view.selector + "\" data-url=\"" + url + "\" data-ignore-open-in=\"true\"></div></div></div>";
        navigateOptions.route.sheet = params;
      }

      if (options.openIn === 'popover') {
        params.targetEl = options.clickedEl || options.targetEl;
        params.content = "<div class=\"popover popover-router-open-in\" data-url=\"" + url + "\"><div class=\"popover-inner\"><div class=\"view view-init\" data-links-view=\"" + router.view.selector + "\" data-url=\"" + url + "\" data-ignore-open-in=\"true\"></div></div></div>";
        navigateOptions.route.popover = params;
      }

      if (options.openIn.indexOf('panel') >= 0) {
        var parts = options.openIn.split(':');
        var side = parts[1] || 'left';
        var effect = parts[2] || 'cover';
        params.targetEl = options.clickedEl || options.targetEl;
        params.content = "<div class=\"panel panel-router-open-in panel-" + side + " panel-" + effect + "\" data-url=\"" + url + "\"><div class=\"view view-init\" data-links-view=\"" + router.view.selector + "\" data-url=\"" + url + "\" data-ignore-open-in=\"true\"></div></div>";
        navigateOptions.route.panel = params;
      }

      return router.navigate(navigateOptions);
    }

    function navigate(navigateParams, navigateOptions) {
      if (navigateOptions === void 0) {
        navigateOptions = {};
      }

      var router = this;
      if (router.swipeBackActive) return router;
      var url;
      var createRoute;
      var name;
      var path;
      var query;
      var params;
      var route;

      if (typeof navigateParams === 'string') {
        url = navigateParams;
      } else {
        url = navigateParams.url;
        createRoute = navigateParams.route;
        name = navigateParams.name;
        path = navigateParams.path;
        query = navigateParams.query;
        params = navigateParams.params;
      }

      if (name || path) {
        url = router.generateUrl({
          path: path,
          name: name,
          params: params,
          query: query
        });

        if (url) {
          return router.navigate(url, navigateOptions);
        }

        return router;
      }

      var app = router.app;
      appRouterCheck(router, 'navigate');

      if (url === '#' || url === '') {
        return router;
      }

      var navigateUrl = url.replace('./', '');

      if (navigateUrl[0] !== '/' && navigateUrl.indexOf('#') !== 0) {
        var currentPath = router.currentRoute.parentPath || router.currentRoute.path;
        navigateUrl = ((currentPath ? currentPath + "/" : '/') + navigateUrl).replace('///', '/').replace('//', '/');
      }

      if (createRoute) {
        route = extend$1(router.parseRouteUrl(navigateUrl), {
          route: extend$1({}, createRoute)
        });
      } else {
        route = router.findMatchingRoute(navigateUrl);
      }

      if (!route) {
        return router;
      }

      if (route.route && route.route.viewName) {
        var anotherViewName = route.route.viewName;
        var anotherView = app.views[anotherViewName];

        if (!anotherView) {
          throw new Error("Framework7: There is no View with \"" + anotherViewName + "\" name that was specified in this route");
        }

        if (anotherView !== router.view) {
          return anotherView.router.navigate(navigateParams, navigateOptions);
        }
      }

      if (route.route.redirect) {
        return redirect.call(router, 'forward', route, navigateOptions);
      }

      var options = {};

      if (route.route.options) {
        extend$1(options, route.route.options, navigateOptions);
      } else {
        extend$1(options, navigateOptions);
      }

      if (options.openIn && (!router.params.ignoreOpenIn || router.params.ignoreOpenIn && router.history.length > 0)) {
        return openIn(router, navigateUrl, options);
      }

      options.route = route;

      function resolve() {
        var routerLoaded = false;
        'popup popover sheet loginScreen actions customModal panel'.split(' ').forEach(function (modalLoadProp) {
          if (route.route[modalLoadProp] && !routerLoaded) {
            routerLoaded = true;
            router.modalLoad(modalLoadProp, route, options, 'forward');
          }
        });

        if (route.route.keepAlive && route.route.keepAliveData) {
          load(router, {
            el: route.route.keepAliveData.pageEl
          }, options, false);
          routerLoaded = true;
        }

        'url content component pageName el componentUrl'.split(' ').forEach(function (pageLoadProp) {
          if (route.route[pageLoadProp] && !routerLoaded) {
            var _load;

            routerLoaded = true;
            load(router, (_load = {}, _load[pageLoadProp] = route.route[pageLoadProp], _load), options, false);
          }
        });
        if (routerLoaded) return; // Async

        function asyncResolve(resolveParams, resolveOptions) {
          router.allowPageChange = false;
          var resolvedAsModal = false;
          'popup popover sheet loginScreen actions customModal panel'.split(' ').forEach(function (modalLoadProp) {
            if (resolveParams[modalLoadProp]) {
              resolvedAsModal = true;
              var modalRoute = extend$1({}, route, {
                route: resolveParams
              });
              router.allowPageChange = true;
              router.modalLoad(modalLoadProp, modalRoute, extend$1(options, resolveOptions), 'forward');
            }
          });
          if (resolvedAsModal) return;
          load(router, resolveParams, extend$1(options, resolveOptions), true);
        }

        function asyncReject() {
          router.allowPageChange = true;
        }

        if (route.route.async) {
          router.allowPageChange = false;
          route.route.async.call(router, {
            router: router,
            to: options.route,
            from: router.currentRoute,
            resolve: asyncResolve,
            reject: asyncReject,
            direction: 'forward',
            app: app
          });
        }

        if (route.route.asyncComponent) {
          asyncComponent(router, route.route.asyncComponent, asyncResolve, asyncReject);
        }
      }

      function reject() {
        router.allowPageChange = true;
      }

      if (router.params.masterDetailBreakpoint > 0 && route.route.masterRoute) {
        // load detail route
        var preloadMaster = true;
        var masterLoaded = false;

        if (router.currentRoute && router.currentRoute.route) {
          if ((router.currentRoute.route.master === true || typeof router.currentRoute.route.master === 'function' && router.currentRoute.route.master(app, router)) && (router.currentRoute.route === route.route.masterRoute || router.currentRoute.route.path === route.route.masterRoute.path)) {
            preloadMaster = false;
          }

          if (router.currentRoute.route.masterRoute && (router.currentRoute.route.masterRoute === route.route.masterRoute || router.currentRoute.route.masterRoute.path === route.route.masterRoute.path)) {
            preloadMaster = false;
            masterLoaded = true;
          }
        }

        if (preloadMaster || masterLoaded && navigateOptions.reloadAll) {
          router.navigate({
            path: route.route.masterRoute.path,
            params: route.params || {}
          }, {
            animate: false,
            reloadAll: navigateOptions.reloadAll,
            reloadCurrent: navigateOptions.reloadCurrent,
            reloadPrevious: navigateOptions.reloadPrevious,
            browserHistory: !navigateOptions.initial,
            history: !navigateOptions.initial,
            once: {
              pageAfterIn: function pageAfterIn() {
                router.navigate(navigateParams, extend$1({}, navigateOptions, {
                  animate: false,
                  reloadAll: false,
                  reloadCurrent: false,
                  reloadPrevious: false,
                  history: !navigateOptions.initial,
                  browserHistory: !navigateOptions.initial
                }));
              }
            }
          });
          return router;
        }
      }

      processRouteQueue.call(router, route, router.currentRoute, function () {
        if (route.route.modules) {
          app.loadModules(Array.isArray(route.route.modules) ? route.route.modules : [route.route.modules]).then(function () {
            resolve();
          }).catch(function () {
            reject();
          });
        } else {
          resolve();
        }
      }, function () {
        reject();
      }, 'forward'); // Return Router

      return router;
    }

    function tabLoad(tabRoute, loadOptions) {
      if (loadOptions === void 0) {
        loadOptions = {};
      }

      var router = this;
      var options = extend$1({
        animate: router.params.animate,
        browserHistory: true,
        history: true,
        parentPageEl: null,
        preload: false,
        on: {}
      }, loadOptions);
      var currentRoute;
      var previousRoute;

      if (options.route) {
        // Set Route
        if (!options.preload && options.route !== router.currentRoute) {
          previousRoute = router.previousRoute;
          router.currentRoute = options.route;
        }

        if (options.preload) {
          currentRoute = options.route;
          previousRoute = router.currentRoute;
        } else {
          currentRoute = router.currentRoute;
          if (!previousRoute) previousRoute = router.previousRoute;
        } // Update Browser History


        if (router.params.browserHistory && options.browserHistory && !options.reloadPrevious) {
          History.replace(router.view.id, {
            url: options.route.url
          }, (router.params.browserHistoryRoot || '') + router.params.browserHistorySeparator + options.route.url);
        } // Update Router History


        if (options.history) {
          router.history[Math.max(router.history.length - 1, 0)] = options.route.url;
          router.saveHistory();
        }
      } // Show Tab


      var $parentPageEl = $$1(options.parentPageEl || router.currentPageEl);
      var tabEl;

      if ($parentPageEl.length && $parentPageEl.find("#" + tabRoute.id).length) {
        tabEl = $parentPageEl.find("#" + tabRoute.id).eq(0);
      } else if (router.view.selector) {
        tabEl = router.view.selector + " #" + tabRoute.id;
      } else {
        tabEl = "#" + tabRoute.id;
      }

      var tabShowResult = router.app.tab.show({
        tabEl: tabEl,
        animate: options.animate,
        tabRoute: options.route
      });
      var $newTabEl = tabShowResult.$newTabEl,
          $oldTabEl = tabShowResult.$oldTabEl,
          animated = tabShowResult.animated,
          onTabsChanged = tabShowResult.onTabsChanged;

      if ($newTabEl && $newTabEl.parents('.page').length > 0 && options.route) {
        var tabParentPageData = $newTabEl.parents('.page')[0].f7Page;

        if (tabParentPageData && options.route) {
          tabParentPageData.route = options.route;
        }
      } // Tab Content Loaded


      function onTabLoaded(contentEl) {
        // Remove theme elements
        router.removeThemeElements($newTabEl);
        var tabEventTarget = $newTabEl;
        if (typeof contentEl !== 'string') tabEventTarget = $$1(contentEl);
        tabEventTarget.trigger('tab:init tab:mounted', tabRoute);
        router.emit('tabInit tabMounted', $newTabEl[0], tabRoute);

        if ($oldTabEl && $oldTabEl.length) {
          if (animated) {
            onTabsChanged(function () {
              router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

              if (router.params.unloadTabContent) {
                router.tabRemove($oldTabEl, $newTabEl, tabRoute);
              }
            });
          } else {
            router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

            if (router.params.unloadTabContent) {
              router.tabRemove($oldTabEl, $newTabEl, tabRoute);
            }
          }
        }
      }

      if ($newTabEl[0].f7RouterTabLoaded) {
        if (!$oldTabEl || !$oldTabEl.length) return router;

        if (animated) {
          onTabsChanged(function () {
            router.emit('routeChanged', router.currentRoute, router.previousRoute, router);
          });
        } else {
          router.emit('routeChanged', router.currentRoute, router.previousRoute, router);
        }

        return router;
      } // Load Tab Content


      function loadTab(loadTabParams, loadTabOptions) {
        // Load Tab Props
        var url = loadTabParams.url,
            content = loadTabParams.content,
            el = loadTabParams.el,
            component = loadTabParams.component,
            componentUrl = loadTabParams.componentUrl; // Component/Template Callbacks

        function resolve(contentEl) {
          router.allowPageChange = true;
          if (!contentEl) return;

          if (typeof contentEl === 'string') {
            $newTabEl.html(contentEl);
          } else {
            $newTabEl.html('');

            if (contentEl.f7Component) {
              contentEl.f7Component.mount(function (componentEl) {
                $newTabEl.append(componentEl);
              });
            } else {
              $newTabEl.append(contentEl);
            }
          }

          $newTabEl[0].f7RouterTabLoaded = true;
          onTabLoaded(contentEl);
        }

        function reject() {
          router.allowPageChange = true;
          return router;
        }

        if (content) {
          resolve(content);
        } else if (el) {
          resolve(el);
        } else if (component || componentUrl) {
          // Load from component (F7/Vue/React/...)
          try {
            router.tabComponentLoader({
              tabEl: $newTabEl[0],
              component: component,
              componentUrl: componentUrl,
              options: loadTabOptions,
              resolve: resolve,
              reject: reject
            });
          } catch (err) {
            router.allowPageChange = true;
            throw err;
          }
        } else if (url) {
          // Load using XHR
          if (router.xhrAbortController) {
            router.xhrAbortController.abort();
            router.xhrAbortController = false;
          }

          router.xhrRequest(url, loadTabOptions).then(function (tabContent) {
            resolve(tabContent);
          }).catch(function () {
            router.allowPageChange = true;
          });
        }
      }

      var hasContentLoadProp;
      'url content component el componentUrl'.split(' ').forEach(function (tabLoadProp) {
        if (tabRoute[tabLoadProp]) {
          var _loadTab;

          hasContentLoadProp = true;
          loadTab((_loadTab = {}, _loadTab[tabLoadProp] = tabRoute[tabLoadProp], _loadTab), options);
        }
      }); // Async

      function asyncResolve(resolveParams, resolveOptions) {
        loadTab(resolveParams, extend$1(options, resolveOptions));
      }

      function asyncReject() {
        router.allowPageChange = true;
      }

      if (tabRoute.async) {
        tabRoute.async.call(router, {
          router: router,
          to: currentRoute,
          from: previousRoute,
          resolve: asyncResolve,
          reject: asyncReject,
          app: router.app
        });
      } else if (tabRoute.asyncComponent) {
        asyncComponent(router, tabRoute.asyncComponent, asyncResolve, asyncReject);
      } else if (!hasContentLoadProp) {
        router.allowPageChange = true;
      }

      return router;
    }

    function tabRemove($oldTabEl, $newTabEl, tabRoute) {
      var router = this;
      var hasTabComponentChild;

      if ($oldTabEl[0]) {
        $oldTabEl[0].f7RouterTabLoaded = false;
        delete $oldTabEl[0].f7RouterTabLoaded;
      }

      $oldTabEl.children().each(function (tabChild) {
        if (tabChild.f7Component) {
          hasTabComponentChild = true;
          $$1(tabChild).trigger('tab:beforeremove', tabRoute);
          tabChild.f7Component.destroy();
        }
      });

      if (!hasTabComponentChild) {
        $oldTabEl.trigger('tab:beforeremove', tabRoute);
      }

      router.emit('tabBeforeRemove', $oldTabEl[0], $newTabEl[0], tabRoute);
      router.removeTabContent($oldTabEl[0], tabRoute);
    }

    function modalLoad(modalType, route, loadOptions, direction) {
      if (loadOptions === void 0) {
        loadOptions = {};
      }

      var router = this;
      var app = router.app;
      var isPanel = modalType === 'panel';
      var modalOrPanel = isPanel ? 'panel' : 'modal';
      var options = extend$1({
        animate: router.params.animate,
        browserHistory: true,
        history: true,
        on: {},
        once: {}
      }, loadOptions);
      var modalParams = extend$1({}, route.route[modalType]);
      var modalRoute = route.route;

      var routeCallback = function routeCallback(modal, name) {
        var on = options.on,
            once = options.once;
        var callback;

        if (name === 'open') {
          callback = on.modalOpen || once.modalOpen || on.panelOpen || once.panelOpen;
        }

        if (name === 'close') {
          callback = on.modalClose || once.modalClose || on.panelClose || once.panelClose;
        }

        if (name === 'closed') {
          callback = on.modalClosed || once.modalClosed || on.panelClosed || once.panelClosed;
        }

        if (callback) callback(modal);
      };

      function onModalLoaded() {
        // Create Modal
        var modal = app[modalType].create(modalParams);
        modalRoute.modalInstance = modal;
        var hasEl = modal.el;

        function closeOnSwipeBack() {
          modal.close();
        }

        modal.on(modalOrPanel + "Open", function () {
          if (!hasEl) {
            // Remove theme elements
            router.removeThemeElements(modal.el); // Emit events

            modal.$el.trigger(modalType.toLowerCase() + ":init " + modalType.toLowerCase() + ":mounted", route, modal);
            router.emit((!isPanel ? 'modalInit' : '') + " " + modalType + "Init " + modalType + "Mounted", modal.el, route, modal);
          }

          router.once('swipeBackMove', closeOnSwipeBack);
          routeCallback(modal, 'open');
        });
        modal.on(modalOrPanel + "Close", function () {
          router.off('swipeBackMove', closeOnSwipeBack);

          if (!modal.closeByRouter) {
            router.back();
          }

          routeCallback(modal, 'close');
        });
        modal.on(modalOrPanel + "Closed", function () {
          modal.$el.trigger(modalType.toLowerCase() + ":beforeremove", route, modal);
          modal.emit("" + (!isPanel ? 'modalBeforeRemove ' : '') + modalType + "BeforeRemove", modal.el, route, modal);
          var modalComponent = modal.el.f7Component;
          routeCallback(modal, 'closed');

          if (modalComponent) {
            modalComponent.destroy();
          }

          nextTick(function () {
            if (modalComponent || modalParams.component) {
              router.removeModal(modal.el);
            }

            modal.destroy();
            delete modal.route;
            delete modalRoute.modalInstance;
          });
        });

        if (options.route) {
          // Update Browser History
          if (router.params.browserHistory && options.browserHistory) {
            History.push(router.view.id, {
              url: options.route.url,
              modal: modalType
            }, (router.params.browserHistoryRoot || '') + router.params.browserHistorySeparator + options.route.url);
          } // Set Route


          if (options.route !== router.currentRoute) {
            modal.route = extend$1(options.route, {
              modal: modal
            });
            router.currentRoute = modal.route;
          } // Update Router History


          if (options.history && !options.reloadCurrent) {
            router.history.push(options.route.url);
            router.saveHistory();
          }
        }

        if (hasEl) {
          // Remove theme elements
          router.removeThemeElements(modal.el); // Emit events

          modal.$el.trigger(modalType.toLowerCase() + ":init " + modalType.toLowerCase() + ":mounted", route, modal);
          router.emit(modalOrPanel + "Init " + modalType + "Init " + modalType + "Mounted", modal.el, route, modal);
        } // Open


        modal.open(options.animate === false || options.animate === true ? options.animate : undefined);
      } // Load Modal Content


      function loadModal(loadModalParams, loadModalOptions) {
        // Load Modal Props
        var url = loadModalParams.url,
            content = loadModalParams.content,
            component = loadModalParams.component,
            componentUrl = loadModalParams.componentUrl; // Component/Template Callbacks

        function resolve(contentEl) {
          if (contentEl) {
            if (typeof contentEl === 'string') {
              modalParams.content = contentEl;
            } else if (contentEl.f7Component) {
              contentEl.f7Component.mount(function (componentEl) {
                modalParams.el = componentEl;
                app.$el.append(componentEl);
              });
            } else {
              modalParams.el = contentEl;
            }

            onModalLoaded();
          }
        }

        function reject() {
          router.allowPageChange = true;
          return router;
        }

        if (content) {
          resolve(content);
        } else if (component || componentUrl) {
          // Load from component (F7/Vue/React/...)
          try {
            router.modalComponentLoader({
              rootEl: app.el,
              component: component,
              componentUrl: componentUrl,
              options: loadModalOptions,
              resolve: resolve,
              reject: reject
            });
          } catch (err) {
            router.allowPageChange = true;
            throw err;
          }
        } else if (url) {
          // Load using XHR
          if (router.xhrAbortController) {
            router.xhrAbortController.abort();
            router.xhrAbortController = false;
          }

          router.xhrRequest(url, loadModalOptions).then(function (modalContent) {
            modalParams.content = modalContent;
            onModalLoaded();
          }).catch(function () {
            router.allowPageChange = true;
          });
        } else {
          onModalLoaded();
        }
      }

      var foundLoadProp;
      'url content component el componentUrl template'.split(' ').forEach(function (modalLoadProp) {
        if (modalParams[modalLoadProp] && !foundLoadProp) {
          var _loadModal;

          foundLoadProp = true;
          loadModal((_loadModal = {}, _loadModal[modalLoadProp] = modalParams[modalLoadProp], _loadModal), options);
        }
      });

      if (!foundLoadProp && modalType === 'actions') {
        onModalLoaded();
      } // Async


      function asyncResolve(resolveParams, resolveOptions) {
        loadModal(resolveParams, extend$1(options, resolveOptions));
      }

      function asyncReject() {
        router.allowPageChange = true;
      }

      if (modalParams.async) {
        modalParams.async.call(router, {
          router: router,
          to: options.route,
          from: router.currentRoute,
          resolve: asyncResolve,
          reject: asyncReject,
          direction: direction,
          app: app
        });
      }

      if (modalParams.asyncComponent) {
        asyncComponent(router, modalParams.asyncComponent, asyncResolve, asyncReject);
      }

      return router;
    }

    function modalRemove(modal) {
      extend$1(modal, {
        closeByRouter: true
      });
      modal.close();
    }

    function backward(router, el, backwardOptions) {
      var device = getDevice();
      var document = getDocument();
      var $el = $$1(el);
      var app = router.app;
      var view = router.view;
      var options = extend$1({
        animate: router.params.animate,
        browserHistory: true,
        replaceState: false
      }, backwardOptions);
      var masterDetailEnabled = router.params.masterDetailBreakpoint > 0;
      var isMaster = masterDetailEnabled && options.route && options.route.route && (options.route.route.master === true || typeof options.route.route.master === 'function' && options.route.route.master(app, router));
      var masterPageEl;
      var masterPageRemoved;
      var dynamicNavbar = router.dynamicNavbar;
      var $newPage = $el;
      var $oldPage = router.$el.children('.page-current');
      var initialPreload = $oldPage.length === 0 && options.preload;
      var currentIsMaster = masterDetailEnabled && $oldPage.hasClass('page-master');

      if ($newPage.length) {
        // Remove theme elements
        router.removeThemeElements($newPage);
      }

      var $navbarsEl;
      var $newNavbarEl;
      var $oldNavbarEl;

      if (dynamicNavbar) {
        $newNavbarEl = $newPage.children('.navbar');
        $navbarsEl = router.$navbarsEl;

        if ($newNavbarEl.length === 0 && $newPage[0] && $newPage[0].f7Page) {
          // Try from pageData
          $newNavbarEl = $newPage[0].f7Page.$navbarEl;
        }

        $oldNavbarEl = $navbarsEl.find('.navbar-current');
      }

      router.allowPageChange = false;

      if ($newPage.length === 0 || $oldPage.length === 0 && !options.preload) {
        router.allowPageChange = true;
        return router;
      } // Remove theme elements


      router.removeThemeElements($newPage); // Save Keep Alive Cache

      if (options.route && options.route.route && options.route.route.keepAlive && !options.route.route.keepAliveData) {
        options.route.route.keepAliveData = {
          pageEl: $el[0]
        };
      } // Pages In View


      var isDetail;
      var isDetailRoot;

      if (masterDetailEnabled) {
        var $pagesInView = router.$el.children('.page:not(.stacked)').filter(function (pageInView) {
          return pageInView !== $newPage[0];
        }); // Find Detail' master page

        for (var i = 0; i < $pagesInView.length; i += 1) {
          if (!masterPageEl && $pagesInView[i].classList.contains('page-master')) {
            masterPageEl = $pagesInView[i];
            continue; // eslint-disable-line
          }
        }

        isDetail = !isMaster && masterPageEl && router.history.indexOf(options.route.url) > router.history.indexOf(masterPageEl.f7Page.route.url);

        if (!isDetail && !isMaster && masterPageEl && masterPageEl.f7Page && options.route.route.masterRoute) {
          isDetail = options.route.route.masterRoute.path === masterPageEl.f7Page.route.route.path;
        }
      }

      if (isDetail && masterPageEl && masterPageEl.f7Page) {
        isDetailRoot = router.history.indexOf(options.route.url) - router.history.indexOf(masterPageEl.f7Page.route.url) === 1;
      } // New Page


      $newPage.addClass("page-" + (initialPreload ? 'current' : 'previous') + (isMaster ? ' page-master' : '') + (isDetail ? ' page-master-detail' : '') + (isDetailRoot ? ' page-master-detail-root' : '')).removeClass('stacked').removeAttr('aria-hidden').trigger('page:unstack').trigger('page:position', {
        position: initialPreload ? 'current' : 'previous'
      });
      router.emit('pageUnstack', $newPage[0]);
      router.emit('pagePosition', $newPage[0], initialPreload ? 'current' : 'previous');

      if (isMaster || isDetail) {
        $newPage.trigger('page:role', {
          role: isMaster ? 'master' : 'detail',
          root: !!isDetailRoot
        });
        router.emit('pageRole', $newPage[0], {
          role: isMaster ? 'master' : 'detail',
          detailRoot: !!isDetailRoot
        });
      }

      if (dynamicNavbar && $newNavbarEl.length > 0) {
        $newNavbarEl.addClass("navbar-" + (initialPreload ? 'current' : 'previous') + (isMaster ? ' navbar-master' : '') + (isDetail ? ' navbar-master-detail' : '') + (isDetailRoot ? ' navbar-master-detail-root' : '')).removeClass('stacked').removeAttr('aria-hidden');
        $newNavbarEl.trigger('navbar:position', {
          position: initialPreload ? 'current' : 'previous'
        });
        router.emit('navbarPosition', $newNavbarEl[0], initialPreload ? 'current' : 'previous');

        if (isMaster || isDetailRoot) {
          router.emit('navbarRole', $newNavbarEl[0], {
            role: isMaster ? 'master' : 'detail',
            detailRoot: !!isDetailRoot
          });
        }
      } // Remove previous page in case of "forced"


      var backIndex;

      if (options.force) {
        if ($oldPage.prev('.page-previous:not(.stacked)').length > 0 || $oldPage.prev('.page-previous').length === 0) {
          if (router.history.indexOf(options.route.url) >= 0) {
            backIndex = router.history.length - router.history.indexOf(options.route.url) - 1;
            router.history = router.history.slice(0, router.history.indexOf(options.route.url) + 2);
            view.history = router.history;
          } else if (router.history[[router.history.length - 2]]) {
            router.history[router.history.length - 2] = options.route.url;
          } else {
            router.history.unshift(router.url);
          }

          if (backIndex && router.params.stackPages) {
            $oldPage.prevAll('.page-previous').each(function (pageToRemove) {
              var $pageToRemove = $$1(pageToRemove);
              var $navbarToRemove;

              if (dynamicNavbar) {
                // $navbarToRemove = $oldNavbarEl.prevAll('.navbar-previous').eq(index);
                $navbarToRemove = $$1(app.navbar.getElByPage($pageToRemove));
              }

              if ($pageToRemove[0] !== $newPage[0] && $pageToRemove.index() > $newPage.index()) {
                if (router.initialPages.indexOf($pageToRemove[0]) >= 0) {
                  $pageToRemove.addClass('stacked');
                  $pageToRemove.trigger('page:stack');
                  router.emit('pageStack', $pageToRemove[0]);

                  if (dynamicNavbar) {
                    $navbarToRemove.addClass('stacked');
                  }
                } else {
                  router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined, options);

                  if ($pageToRemove[0] === masterPageEl) {
                    masterPageRemoved = true;
                  }

                  router.removePage($pageToRemove);

                  if (dynamicNavbar && $navbarToRemove.length > 0) {
                    router.removeNavbar($navbarToRemove);
                  }
                }
              }
            });
          } else {
            var $pageToRemove = $oldPage.prev('.page-previous:not(.stacked)');
            var $navbarToRemove;

            if (dynamicNavbar) {
              // $navbarToRemove = $oldNavbarEl.prev('.navbar-inner:not(.stacked)');
              $navbarToRemove = $$1(app.navbar.getElByPage($pageToRemove));
            }

            if (router.params.stackPages && router.initialPages.indexOf($pageToRemove[0]) >= 0) {
              $pageToRemove.addClass('stacked');
              $pageToRemove.trigger('page:stack');
              router.emit('pageStack', $pageToRemove[0]);
              $navbarToRemove.addClass('stacked');
            } else if ($pageToRemove.length > 0) {
              router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined, options);

              if ($pageToRemove[0] === masterPageEl) {
                masterPageRemoved = true;
              }

              router.removePage($pageToRemove);

              if (dynamicNavbar && $navbarToRemove.length) {
                router.removeNavbar($navbarToRemove);
              }
            }
          }
        }
      } // Insert new page


      var newPageInDom = $newPage.parents(document).length > 0;
      var f7Component = $newPage[0].f7Component;

      function insertPage() {
        if (initialPreload) {
          if (!newPageInDom && f7Component) {
            f7Component.mount(function (componentEl) {
              router.$el.append(componentEl);
            });
          } else {
            router.$el.append($newPage);
          }
        }

        if ($newPage.next($oldPage).length === 0) {
          if (!newPageInDom && f7Component) {
            f7Component.mount(function (componentEl) {
              $$1(componentEl).insertBefore($oldPage);
            });
          } else {
            $newPage.insertBefore($oldPage);
          }
        }

        if (dynamicNavbar && $newNavbarEl.length) {
          if ($newNavbarEl.find('.title-large').length) {
            $newNavbarEl.addClass('navbar-large');
          }

          $newNavbarEl.insertBefore($oldNavbarEl);

          if ($oldNavbarEl.length > 0) {
            $newNavbarEl.insertBefore($oldNavbarEl);
          } else {
            if (!router.$navbarsEl.parents(document).length) {
              router.$el.prepend(router.$navbarsEl);
            }

            $navbarsEl.append($newNavbarEl);
          }
        }

        if (!newPageInDom) {
          router.pageCallback('mounted', $newPage, $newNavbarEl, 'previous', 'current', options, $oldPage);
        } else if (options.route && options.route.route && options.route.route.keepAlive && !$newPage[0].f7PageMounted) {
          $newPage[0].f7PageMounted = true;
          router.pageCallback('mounted', $newPage, $newNavbarEl, 'previous', 'current', options, $oldPage);
        }
      }

      if (options.preload) {
        // Insert Page
        insertPage(); // Tab route

        if (options.route.route.tab) {
          router.tabLoad(options.route.route.tab, extend$1({}, options, {
            history: false,
            browserHistory: false,
            preload: true
          }));
        }

        if (isMaster) {
          $newPage.removeClass('page-master-stacked').trigger('page:masterunstack');
          router.emit('pageMasterUnstack', $newPage[0]);

          if (dynamicNavbar) {
            $$1(app.navbar.getElByPage($newPage)).removeClass('navbar-master-stacked');
            router.emit('navbarMasterUnstack', app.navbar.getElByPage($newPage));
          }
        } // Page init and before init events


        router.pageCallback('init', $newPage, $newNavbarEl, 'previous', 'current', options, $oldPage);

        if (initialPreload) {
          router.pageCallback('beforeIn', $newPage, $newNavbarEl, 'current', undefined, options);
          router.pageCallback('afterIn', $newPage, $newNavbarEl, 'current', undefined, options);
        }

        var $previousPages = $newPage.prevAll('.page-previous:not(.stacked):not(.page-master)');

        if ($previousPages.length > 0) {
          $previousPages.each(function (pageToRemove) {
            var $pageToRemove = $$1(pageToRemove);
            var $navbarToRemove;

            if (dynamicNavbar) {
              // $navbarToRemove = $newNavbarEl.prevAll('.navbar-previous:not(.stacked)').eq(index);
              $navbarToRemove = $$1(app.navbar.getElByPage($pageToRemove));
            }

            if (router.params.stackPages && router.initialPages.indexOf(pageToRemove) >= 0) {
              $pageToRemove.addClass('stacked');
              $pageToRemove.trigger('page:stack');
              router.emit('pageStack', $pageToRemove[0]);

              if (dynamicNavbar) {
                $navbarToRemove.addClass('stacked');
              }
            } else {
              router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined);
              router.removePage($pageToRemove);

              if (dynamicNavbar && $navbarToRemove.length) {
                router.removeNavbar($navbarToRemove);
              }
            }
          });
        }

        router.allowPageChange = true;
        return router;
      } // History State


      if (!(device.ie || device.edge || device.firefox && !device.ios)) {
        if (router.params.browserHistory && options.browserHistory) {
          if (options.replaceState) {
            var browserHistoryRoot = router.params.browserHistoryRoot || '';
            History.replace(view.id, {
              url: options.route.url
            }, browserHistoryRoot + router.params.browserHistorySeparator + options.route.url);
          } else if (backIndex) {
            History.go(-backIndex);
          } else {
            History.back();
          }
        }
      } // Update History


      if (options.replaceState) {
        router.history[router.history.length - 1] = options.route.url;
      } else {
        if (router.history.length === 1) {
          router.history.unshift(router.url);
        }

        router.history.pop();
      }

      router.saveHistory(); // Current Page & Navbar

      router.currentPageEl = $newPage[0];

      if (dynamicNavbar && $newNavbarEl.length) {
        router.currentNavbarEl = $newNavbarEl[0];
      } else {
        delete router.currentNavbarEl;
      } // Current Route


      router.currentRoute = options.route; // History State

      if (device.ie || device.edge || device.firefox && !device.ios) {
        if (router.params.browserHistory && options.browserHistory) {
          if (options.replaceState) {
            var _browserHistoryRoot = router.params.browserHistoryRoot || '';

            History.replace(view.id, {
              url: options.route.url
            }, _browserHistoryRoot + router.params.browserHistorySeparator + options.route.url);
          } else if (backIndex) {
            History.go(-backIndex);
          } else {
            History.back();
          }
        }
      } // Insert Page


      insertPage(); // Load Tab

      if (options.route.route.tab) {
        router.tabLoad(options.route.route.tab, extend$1({}, options, {
          history: false,
          browserHistory: false
        }));
      } // Check master detail


      if (masterDetailEnabled && (currentIsMaster || masterPageRemoved)) {
        view.checkMasterDetailBreakpoint(false);
      } // Page init and before init events


      router.pageCallback('init', $newPage, $newNavbarEl, 'previous', 'current', options, $oldPage); // Before animation callback

      router.pageCallback('beforeOut', $oldPage, $oldNavbarEl, 'current', 'next', options);
      router.pageCallback('beforeIn', $newPage, $newNavbarEl, 'previous', 'current', options); // Animation

      function afterAnimation() {
        // Set classes
        router.setPagePosition($newPage, 'current', false);
        router.setPagePosition($oldPage, 'next', true);

        if (dynamicNavbar) {
          router.setNavbarPosition($newNavbarEl, 'current', false);
          router.setNavbarPosition($oldNavbarEl, 'next', true);
        } // After animation event


        router.pageCallback('afterOut', $oldPage, $oldNavbarEl, 'current', 'next', options);
        router.pageCallback('afterIn', $newPage, $newNavbarEl, 'previous', 'current', options); // Remove Old Page

        if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
          $oldPage.addClass('stacked');
          $oldPage.trigger('page:stack');
          router.emit('pageStack', $oldPage[0]);

          if (dynamicNavbar) {
            $oldNavbarEl.addClass('stacked');
          }
        } else {
          router.pageCallback('beforeRemove', $oldPage, $oldNavbarEl, 'next', undefined, options);
          router.removePage($oldPage);

          if (dynamicNavbar && $oldNavbarEl.length) {
            router.removeNavbar($oldNavbarEl);
          }
        }

        router.allowPageChange = true;
        router.emit('routeChanged', router.currentRoute, router.previousRoute, router); // Preload previous page

        var preloadPreviousPage = router.params.preloadPreviousPage || router.params[app.theme + "SwipeBack"];

        if (preloadPreviousPage && router.history[router.history.length - 2] && !isMaster) {
          router.back(router.history[router.history.length - 2], {
            preload: true
          });
        }

        if (router.params.browserHistory) {
          History.clearRouterQueue();
        }
      }

      function setPositionClasses() {
        router.setPagePosition($oldPage, 'current');
        router.setPagePosition($newPage, 'previous', false);

        if (dynamicNavbar) {
          router.setNavbarPosition($oldNavbarEl, 'current');
          router.setNavbarPosition($newNavbarEl, 'previous', false);
        }
      }

      if (options.animate && !(currentIsMaster && app.width >= router.params.masterDetailBreakpoint)) {
        var transition = router.params.transition;

        if ($oldPage[0] && $oldPage[0].f7PageTransition) {
          transition = $oldPage[0].f7PageTransition;
          delete $oldPage[0].f7PageTransition;
        }

        if (options.transition) transition = options.transition;

        if (!transition && router.previousRoute && router.previousRoute.route) {
          transition = router.previousRoute.route.transition;
        }

        if (!transition && router.previousRoute && router.previousRoute.route && router.previousRoute.route.options) {
          transition = router.previousRoute.route.options.transition;
        }

        setPositionClasses();
        router.animate($oldPage, $newPage, $oldNavbarEl, $newNavbarEl, 'backward', transition, function () {
          afterAnimation();
        });
      } else {
        afterAnimation();
      }

      return router;
    }

    function loadBack(router, backParams, backOptions, ignorePageChange) {
      if (!router.allowPageChange && !ignorePageChange) return router;
      var params = backParams;
      var options = backOptions;
      var url = params.url,
          content = params.content,
          el = params.el,
          pageName = params.pageName,
          component = params.component,
          componentUrl = params.componentUrl;

      if (options.route.url && router.url === options.route.url && !(options.reloadCurrent || options.reloadPrevious) && !router.params.allowDuplicateUrls) {
        return false;
      }

      if (!options.route && url) {
        options.route = router.parseRouteUrl(url);
      } // Component Callbacks


      function resolve(pageEl, newOptions) {
        return backward(router, pageEl, extend$1(options, newOptions));
      }

      function reject() {
        router.allowPageChange = true;
        return router;
      }

      if (url || componentUrl || component) {
        router.allowPageChange = false;
      } // Proceed


      if (content) {
        backward(router, router.getPageEl(content), options);
      } else if (el) {
        // Load page from specified HTMLElement or by page name in pages container
        backward(router, router.getPageEl(el), options);
      } else if (pageName) {
        // Load page by page name in pages container
        backward(router, router.$el.children(".page[data-name=\"" + pageName + "\"]").eq(0), options);
      } else if (component || componentUrl) {
        // Load from component (F7/Vue/React/...)
        try {
          router.pageComponentLoader({
            routerEl: router.el,
            component: component,
            componentUrl: componentUrl,
            options: options,
            resolve: resolve,
            reject: reject
          });
        } catch (err) {
          router.allowPageChange = true;
          throw err;
        }
      } else if (url) {
        // Load using XHR
        if (router.xhrAbortController) {
          router.xhrAbortController.abort();
          router.xhrAbortController = false;
        }

        router.xhrRequest(url, options).then(function (pageContent) {
          backward(router, router.getPageEl(pageContent), options);
        }).catch(function () {
          router.allowPageChange = true;
        });
      }

      return router;
    }

    function back() {
      var router = this;
      var device = getDevice();
      if (router.swipeBackActive) return router;
      var navigateUrl;
      var navigateOptions;
      var route;

      if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'object') {
        navigateOptions = (arguments.length <= 0 ? undefined : arguments[0]) || {};
      } else {
        navigateUrl = arguments.length <= 0 ? undefined : arguments[0];
        navigateOptions = (arguments.length <= 1 ? undefined : arguments[1]) || {};
      }

      var _navigateOptions = navigateOptions,
          name = _navigateOptions.name,
          params = _navigateOptions.params,
          query = _navigateOptions.query;

      if (name) {
        navigateUrl = router.generateUrl({
          name: name,
          params: params,
          query: query
        });

        if (navigateUrl) {
          return router.back(navigateUrl, extend$1({}, navigateOptions, {
            name: null,
            params: null,
            query: null
          }));
        }

        return router;
      }

      var app = router.app;
      appRouterCheck(router, 'back');
      var currentRouteIsModal = router.currentRoute.modal;
      var modalType;

      if (!currentRouteIsModal) {
        'popup popover sheet loginScreen actions customModal panel'.split(' ').forEach(function (modalLoadProp) {
          if (router.currentRoute.route[modalLoadProp]) {
            currentRouteIsModal = true;
            modalType = modalLoadProp;
          }
        });
      }

      if (currentRouteIsModal && !navigateOptions.preload) {
        var modalToClose = router.currentRoute.modal || router.currentRoute.route.modalInstance || app[modalType].get();
        var previousUrl = router.history[router.history.length - 2];
        var previousRoute; // check if previous route is modal too

        if (modalToClose && modalToClose.$el) {
          var prevOpenedModals = modalToClose.$el.prevAll('.modal-in');

          if (prevOpenedModals.length && prevOpenedModals[0].f7Modal) {
            var modalEl = prevOpenedModals[0]; // check if current router not inside of the modalEl

            if (!router.$el.parents(modalEl).length) {
              previousRoute = modalEl.f7Modal.route;
            }
          }
        }

        if (!previousRoute) {
          previousRoute = router.findMatchingRoute(previousUrl);
        }

        if (!previousRoute && previousUrl) {
          previousRoute = {
            url: previousUrl,
            path: previousUrl.split('?')[0],
            query: parseUrlQuery(previousUrl),
            route: {
              path: previousUrl.split('?')[0],
              url: previousUrl
            }
          };
        }

        if (!navigateUrl || navigateUrl.replace(/[# ]/g, '').trim().length === 0) {
          if (!previousRoute || !modalToClose) {
            return router;
          }
        }

        var forceOtherUrl = navigateOptions.force && previousRoute && navigateUrl;

        if (previousRoute && modalToClose) {
          var isBrokenBrowserHistory = device.ie || device.edge || device.firefox && !device.ios;
          var needHistoryBack = router.params.browserHistory && navigateOptions.browserHistory !== false;
          var currentRouteWithoutBrowserHistory = router.currentRoute && router.currentRoute.route && router.currentRoute.route.options && router.currentRoute.route.options.browserHistory === false;

          if (needHistoryBack && !isBrokenBrowserHistory && !currentRouteWithoutBrowserHistory) {
            History.back();
          }

          router.currentRoute = previousRoute;
          router.history.pop();
          router.saveHistory();

          if (needHistoryBack && isBrokenBrowserHistory && !currentRouteWithoutBrowserHistory) {
            History.back();
          }

          router.modalRemove(modalToClose);

          if (forceOtherUrl) {
            router.navigate(navigateUrl, {
              reloadCurrent: true
            });
          }
        } else if (modalToClose) {
          router.modalRemove(modalToClose);

          if (navigateUrl) {
            router.navigate(navigateUrl, {
              reloadCurrent: true
            });
          }
        }

        return router;
      }

      var $previousPage = router.$el.children('.page-current').prevAll('.page-previous:not(.page-master)').eq(0);
      var skipMaster;

      if (router.params.masterDetailBreakpoint > 0) {
        var classes = [];
        router.$el.children('.page').each(function (pageEl) {
          classes.push(pageEl.className);
        });
        var $previousMaster = router.$el.children('.page-current').prevAll('.page-master').eq(0);

        if ($previousMaster.length) {
          var expectedPreviousPageUrl = router.history[router.history.length - 2];
          var expectedPreviousPageRoute = router.findMatchingRoute(expectedPreviousPageUrl);

          if (expectedPreviousPageRoute && $previousMaster[0].f7Page && expectedPreviousPageRoute.route === $previousMaster[0].f7Page.route.route) {
            $previousPage = $previousMaster;

            if (!navigateOptions.preload) {
              skipMaster = app.width >= router.params.masterDetailBreakpoint;
            }
          }
        }
      }

      if (!navigateOptions.force && $previousPage.length && !skipMaster) {
        if (router.params.browserHistory && $previousPage[0].f7Page && router.history[router.history.length - 2] !== $previousPage[0].f7Page.route.url) {
          router.back(router.history[router.history.length - 2], extend$1(navigateOptions, {
            force: true
          }));
          return router;
        }

        var previousPageRoute = $previousPage[0].f7Page.route;
        processRouteQueue.call(router, previousPageRoute, router.currentRoute, function () {
          loadBack(router, {
            el: $previousPage
          }, extend$1(navigateOptions, {
            route: previousPageRoute
          }));
        }, function () {}, 'backward');
        return router;
      } // Navigate URL


      if (navigateUrl === '#') {
        navigateUrl = undefined;
      }

      if (navigateUrl && navigateUrl[0] !== '/' && navigateUrl.indexOf('#') !== 0) {
        navigateUrl = ((router.path || '/') + navigateUrl).replace('//', '/');
      }

      if (!navigateUrl && router.history.length > 1) {
        navigateUrl = router.history[router.history.length - 2];
      }

      if (skipMaster && !navigateOptions.force && router.history[router.history.length - 3]) {
        return router.back(router.history[router.history.length - 3], extend$1({}, navigateOptions || {}, {
          force: true,
          animate: false
        }));
      }

      if (skipMaster && !navigateOptions.force) {
        return router;
      } // Find route to load


      route = router.findMatchingRoute(navigateUrl);

      if (!route) {
        if (navigateUrl) {
          route = {
            url: navigateUrl,
            path: navigateUrl.split('?')[0],
            query: parseUrlQuery(navigateUrl),
            route: {
              path: navigateUrl.split('?')[0],
              url: navigateUrl
            }
          };
        }
      }

      if (!route) {
        return router;
      }

      if (route.route.redirect) {
        return redirect.call(router, 'backward', route, navigateOptions);
      }

      var options = {};

      if (route.route.options) {
        extend$1(options, route.route.options, navigateOptions);
      } else {
        extend$1(options, navigateOptions);
      }

      options.route = route;
      var backForceLoaded;

      if (options.force && router.params.stackPages) {
        router.$el.children('.page-previous.stacked').each(function (pageEl) {
          if (pageEl.f7Page && pageEl.f7Page.route && pageEl.f7Page.route.url === route.url) {
            backForceLoaded = true;
            loadBack(router, {
              el: pageEl
            }, options);
          }
        });

        if (backForceLoaded) {
          return router;
        }
      }

      function resolve() {
        var routerLoaded = false;

        if (route.route.keepAlive && route.route.keepAliveData) {
          loadBack(router, {
            el: route.route.keepAliveData.pageEl
          }, options);
          routerLoaded = true;
        }

        'url content component pageName el componentUrl'.split(' ').forEach(function (pageLoadProp) {
          if (route.route[pageLoadProp] && !routerLoaded) {
            var _loadBack;

            routerLoaded = true;
            loadBack(router, (_loadBack = {}, _loadBack[pageLoadProp] = route.route[pageLoadProp], _loadBack), options);
          }
        });
        if (routerLoaded) return; // Async

        function asyncResolve(resolveParams, resolveOptions) {
          router.allowPageChange = false;
          loadBack(router, resolveParams, extend$1(options, resolveOptions), true);
        }

        function asyncReject() {
          router.allowPageChange = true;
        }

        if (route.route.async) {
          router.allowPageChange = false;
          route.route.async.call(router, {
            router: router,
            to: route,
            from: router.currentRoute,
            resolve: asyncResolve,
            reject: asyncReject,
            direction: 'backward',
            app: app
          });
        }

        if (route.route.asyncComponent) {
          asyncComponent(router, route.route.asyncComponent, asyncResolve, asyncReject);
        }
      }

      function reject() {
        router.allowPageChange = true;
      }

      if (options.preload) {
        resolve();
      } else {
        processRouteQueue.call(router, route, router.currentRoute, function () {
          if (route.route.modules) {
            app.loadModules(Array.isArray(route.route.modules) ? route.route.modules : [route.route.modules]).then(function () {
              resolve();
            }).catch(function () {
              reject();
            });
          } else {
            resolve();
          }
        }, function () {
          reject();
        }, 'backward');
      } // Return Router


      return router;
    }

    function clearPreviousPages(router) {
      appRouterCheck(router, 'clearPreviousPages');
      var app = router.app;
      var dynamicNavbar = router.dynamicNavbar;
      var $pagesToRemove = router.$el.children('.page').filter(function (pageInView) {
        if (router.currentRoute && (router.currentRoute.modal || router.currentRoute.panel)) return true;
        return pageInView !== router.currentPageEl;
      });
      $pagesToRemove.each(function (pageEl) {
        var $oldPageEl = $$1(pageEl);
        var $oldNavbarEl = $$1(app.navbar.getElByPage($oldPageEl));

        if (router.params.stackPages && router.initialPages.indexOf($oldPageEl[0]) >= 0) {
          $oldPageEl.addClass('stacked');

          if (dynamicNavbar) {
            $oldNavbarEl.addClass('stacked');
          }
        } else {
          // Page remove event
          router.pageCallback('beforeRemove', $oldPageEl, $oldNavbarEl, 'previous', undefined, {});
          router.removePage($oldPageEl);

          if (dynamicNavbar && $oldNavbarEl.length) {
            router.removeNavbar($oldNavbarEl);
          }
        }
      });
    }

    function clearPreviousHistory() {
      var router = this;
      appRouterCheck(router, 'clearPreviousHistory');
      var url = router.history[router.history.length - 1];
      clearPreviousPages(router);
      router.history = [url];
      router.view.history = [url];
      router.saveHistory();
    }
     // eslint-disable-line

    var Router = /*#__PURE__*/function (_Framework7Class) {
      _inheritsLoose$1(Router, _Framework7Class);

      function Router(app, view) {
        var _this;

        _this = _Framework7Class.call(this, {}, [typeof view === 'undefined' ? app : view]) || this;

        var router = _assertThisInitialized$1(_this); // Is App Router


        router.isAppRouter = typeof view === 'undefined';

        if (router.isAppRouter) {
          // App Router
          extend$1(false, router, {
            app: app,
            params: app.params.view,
            routes: app.routes || [],
            cache: app.cache
          });
        } else {
          // View Router
          extend$1(false, router, {
            app: app,
            view: view,
            viewId: view.id,
            id: view.params.routerId,
            params: view.params,
            routes: view.routes,
            history: view.history,
            scrollHistory: view.scrollHistory,
            cache: app.cache,
            dynamicNavbar: app.theme === 'ios' && view.params.iosDynamicNavbar,
            initialPages: [],
            initialNavbars: []
          });
        } // Install Modules


        router.useModules(); // AllowPageChage

        router.allowPageChange = true; // Current Route

        var currentRoute = {};
        var previousRoute = {};
        Object.defineProperty(router, 'currentRoute', {
          enumerable: true,
          configurable: true,
          set: function set(newRoute) {
            if (newRoute === void 0) {
              newRoute = {};
            }

            previousRoute = extend$1({}, currentRoute);
            currentRoute = newRoute;
            if (!currentRoute) return;
            router.url = currentRoute.url;
            router.emit('routeChange', newRoute, previousRoute, router);
          },
          get: function get() {
            return currentRoute;
          }
        });
        Object.defineProperty(router, 'previousRoute', {
          enumerable: true,
          configurable: true,
          get: function get() {
            return previousRoute;
          },
          set: function set(newRoute) {
            previousRoute = newRoute;
          }
        });
        return router || _assertThisInitialized$1(_this);
      }

      var _proto = Router.prototype;

      _proto.mount = function mount() {
        var router = this;
        var view = router.view;
        var document = getDocument();
        extend$1(false, router, {
          tempDom: document.createElement('div'),
          $el: view.$el,
          el: view.el,
          $navbarsEl: view.$navbarsEl,
          navbarsEl: view.navbarsEl
        });
        router.emit('local::mount routerMount', router);
      };

      _proto.animatableNavElements = function animatableNavElements($newNavbarEl, $oldNavbarEl, toLarge, fromLarge, direction) {
        var router = this;
        var dynamicNavbar = router.dynamicNavbar;
        var animateIcon = router.params.iosAnimateNavbarBackIcon;
        var newNavEls;
        var oldNavEls;

        function animatableNavEl($el, $navbarInner) {
          var isSliding = $el.hasClass('sliding') || $navbarInner.hasClass('sliding');
          var isSubnavbar = $el.hasClass('subnavbar');
          var needsOpacityTransition = isSliding ? !isSubnavbar : true;
          var $iconEl = $el.find('.back .icon');
          var isIconLabel;

          if (isSliding && animateIcon && $el.hasClass('left') && $iconEl.length > 0 && $iconEl.next('span').length) {
            $el = $iconEl.next('span'); // eslint-disable-line

            isIconLabel = true;
          }

          return {
            $el: $el,
            isIconLabel: isIconLabel,
            leftOffset: $el[0].f7NavbarLeftOffset,
            rightOffset: $el[0].f7NavbarRightOffset,
            isSliding: isSliding,
            isSubnavbar: isSubnavbar,
            needsOpacityTransition: needsOpacityTransition
          };
        }

        if (dynamicNavbar) {
          newNavEls = [];
          oldNavEls = [];
          $newNavbarEl.children('.navbar-inner').children('.left, .right, .title, .subnavbar').each(function (navEl) {
            var $navEl = $$1(navEl);
            if ($navEl.hasClass('left') && fromLarge && direction === 'forward') return;
            if ($navEl.hasClass('title') && toLarge) return;
            newNavEls.push(animatableNavEl($navEl, $newNavbarEl.children('.navbar-inner')));
          });

          if (!($oldNavbarEl.hasClass('navbar-master') && router.params.masterDetailBreakpoint > 0 && router.app.width >= router.params.masterDetailBreakpoint)) {
            $oldNavbarEl.children('.navbar-inner').children('.left, .right, .title, .subnavbar').each(function (navEl) {
              var $navEl = $$1(navEl);
              if ($navEl.hasClass('left') && toLarge && !fromLarge && direction === 'forward') return;
              if ($navEl.hasClass('left') && toLarge && direction === 'backward') return;

              if ($navEl.hasClass('title') && fromLarge) {
                return;
              }

              oldNavEls.push(animatableNavEl($navEl, $oldNavbarEl.children('.navbar-inner')));
            });
          }

          [oldNavEls, newNavEls].forEach(function (navEls) {
            navEls.forEach(function (navEl) {
              var n = navEl;
              var isSliding = navEl.isSliding,
                  $el = navEl.$el;
              var otherEls = navEls === oldNavEls ? newNavEls : oldNavEls;
              if (!(isSliding && $el.hasClass('title') && otherEls)) return;
              otherEls.forEach(function (otherNavEl) {
                if (otherNavEl.isIconLabel) {
                  var iconTextEl = otherNavEl.$el[0];
                  n.leftOffset += iconTextEl ? iconTextEl.offsetLeft || 0 : 0;
                }
              });
            });
          });
        }

        return {
          newNavEls: newNavEls,
          oldNavEls: oldNavEls
        };
      };

      _proto.animate = function animate($oldPageEl, $newPageEl, $oldNavbarEl, $newNavbarEl, direction, transition, callback) {
        var router = this;

        if (router.params.animateCustom) {
          router.params.animateCustom.apply(router, [$oldPageEl, $newPageEl, $oldNavbarEl, $newNavbarEl, direction, callback]);
          return;
        }

        var dynamicNavbar = router.dynamicNavbar;
        var ios = router.app.theme === 'ios';

        if (transition) {
          var routerCustomTransitionClass = "router-transition-custom router-transition-" + transition + "-" + direction; // Animate

          var onCustomTransitionDone = function onCustomTransitionDone() {
            router.$el.removeClass(routerCustomTransitionClass);

            if (dynamicNavbar && router.$navbarsEl.length) {
              if ($newNavbarEl) {
                router.$navbarsEl.prepend($newNavbarEl);
              }

              if ($oldNavbarEl) {
                router.$navbarsEl.prepend($oldNavbarEl);
              }
            }

            if (callback) callback();
          };

          (direction === 'forward' ? $newPageEl : $oldPageEl).animationEnd(onCustomTransitionDone);

          if (dynamicNavbar) {
            if ($newNavbarEl && $newPageEl) {
              router.setNavbarPosition($newNavbarEl, '');
              $newNavbarEl.removeClass('navbar-next navbar-previous navbar-current');
              $newPageEl.prepend($newNavbarEl);
            }

            if ($oldNavbarEl && $oldPageEl) {
              router.setNavbarPosition($oldNavbarEl, '');
              $oldNavbarEl.removeClass('navbar-next navbar-previous navbar-current');
              $oldPageEl.prepend($oldNavbarEl);
            }
          }

          router.$el.addClass(routerCustomTransitionClass);
          return;
        } // Router Animation class


        var routerTransitionClass = "router-transition-" + direction + " router-transition";
        var newNavEls;
        var oldNavEls;
        var fromLarge;
        var toLarge;
        var toDifferent;
        var oldIsLarge;
        var newIsLarge;

        if (ios && dynamicNavbar) {
          var betweenMasterAndDetail = router.params.masterDetailBreakpoint > 0 && router.app.width >= router.params.masterDetailBreakpoint && ($oldNavbarEl.hasClass('navbar-master') && $newNavbarEl.hasClass('navbar-master-detail') || $oldNavbarEl.hasClass('navbar-master-detail') && $newNavbarEl.hasClass('navbar-master'));

          if (!betweenMasterAndDetail) {
            oldIsLarge = $oldNavbarEl && $oldNavbarEl.hasClass('navbar-large');
            newIsLarge = $newNavbarEl && $newNavbarEl.hasClass('navbar-large');
            fromLarge = oldIsLarge && !$oldNavbarEl.hasClass('navbar-large-collapsed');
            toLarge = newIsLarge && !$newNavbarEl.hasClass('navbar-large-collapsed');
            toDifferent = fromLarge && !toLarge || toLarge && !fromLarge;
          }

          var navEls = router.animatableNavElements($newNavbarEl, $oldNavbarEl, toLarge, fromLarge, direction);
          newNavEls = navEls.newNavEls;
          oldNavEls = navEls.oldNavEls;
        }

        function animateNavbars(progress) {
          if (!(ios && dynamicNavbar)) return;

          if (progress === 1) {
            if (toLarge) {
              $newNavbarEl.addClass('router-navbar-transition-to-large');
              $oldNavbarEl.addClass('router-navbar-transition-to-large');
            }

            if (fromLarge) {
              $newNavbarEl.addClass('router-navbar-transition-from-large');
              $oldNavbarEl.addClass('router-navbar-transition-from-large');
            }
          }

          newNavEls.forEach(function (navEl) {
            var $el = navEl.$el;
            var offset = direction === 'forward' ? navEl.rightOffset : navEl.leftOffset;

            if (navEl.isSliding) {
              if (navEl.isSubnavbar && newIsLarge) {
                // prettier-ignore
                $el[0].style.setProperty('transform', "translate3d(" + offset * (1 - progress) + "px, calc(-1 * var(--f7-navbar-large-collapse-progress) * var(--f7-navbar-large-title-height)), 0)", 'important');
              } else {
                $el.transform("translate3d(" + offset * (1 - progress) + "px,0,0)");
              }
            }
          });
          oldNavEls.forEach(function (navEl) {
            var $el = navEl.$el;
            var offset = direction === 'forward' ? navEl.leftOffset : navEl.rightOffset;

            if (navEl.isSliding) {
              if (navEl.isSubnavbar && oldIsLarge) {
                $el.transform("translate3d(" + offset * progress + "px, calc(-1 * var(--f7-navbar-large-collapse-progress) * var(--f7-navbar-large-title-height)), 0)");
              } else {
                $el.transform("translate3d(" + offset * progress + "px,0,0)");
              }
            }
          });
        } // AnimationEnd Callback


        function onDone() {
          if (router.dynamicNavbar) {
            if ($newNavbarEl) {
              $newNavbarEl.removeClass('router-navbar-transition-to-large router-navbar-transition-from-large');
              $newNavbarEl.addClass('navbar-no-title-large-transition');
              nextFrame(function () {
                $newNavbarEl.removeClass('navbar-no-title-large-transition');
              });
            }

            if ($oldNavbarEl) {
              $oldNavbarEl.removeClass('router-navbar-transition-to-large router-navbar-transition-from-large');
            }

            if ($newNavbarEl.hasClass('sliding') || $newNavbarEl.children('.navbar-inner.sliding').length) {
              $newNavbarEl.find('.title, .left, .right, .left .icon, .subnavbar').transform('');
            } else {
              $newNavbarEl.find('.sliding').transform('');
            }

            if ($oldNavbarEl.hasClass('sliding') || $oldNavbarEl.children('.navbar-inner.sliding').length) {
              $oldNavbarEl.find('.title, .left, .right, .left .icon, .subnavbar').transform('');
            } else {
              $oldNavbarEl.find('.sliding').transform('');
            }
          }

          router.$el.removeClass(routerTransitionClass);
          if (callback) callback();
        }

        (direction === 'forward' ? $newPageEl : $oldPageEl).animationEnd(function () {
          onDone();
        }); // Animate

        if (dynamicNavbar) {
          // Prepare Navbars
          animateNavbars(0);
          nextFrame(function () {
            // Add class, start animation
            router.$el.addClass(routerTransitionClass);

            if (toDifferent) {
              // eslint-disable-next-line
              router.el._clientLeft = router.el.clientLeft;
            }

            animateNavbars(1);
          });
        } else {
          // Add class, start animation
          router.$el.addClass(routerTransitionClass);
        }
      };

      _proto.removeModal = function removeModal(modalEl) {
        var router = this;
        router.removeEl(modalEl);
      } // eslint-disable-next-line
      ;

      _proto.removeTabContent = function removeTabContent(tabEl) {
        var $tabEl = $$1(tabEl);
        $tabEl.html('');
      };

      _proto.removeNavbar = function removeNavbar(el) {
        var router = this;
        router.removeEl(el);
      };

      _proto.removePage = function removePage(el) {
        var $el = $$1(el);
        var f7Page = $el && $el[0] && $el[0].f7Page;
        var router = this;

        if (f7Page && f7Page.route && f7Page.route.route && f7Page.route.route.keepAlive) {
          $el.remove();
          return;
        }

        router.removeEl(el);
      };

      _proto.removeEl = function removeEl(el) {
        if (!el) return;
        var router = this;
        var $el = $$1(el);
        if ($el.length === 0) return;
        $el.find('.tab').each(function (tabEl) {
          $$1(tabEl).children().each(function (tabChild) {
            if (tabChild.f7Component) {
              $$1(tabChild).trigger('tab:beforeremove');
              tabChild.f7Component.destroy();
            }
          });
        });

        if ($el[0].f7Component && $el[0].f7Component.destroy) {
          $el[0].f7Component.destroy();
        }

        if (!router.params.removeElements) {
          return;
        }

        if (router.params.removeElementsWithTimeout) {
          setTimeout(function () {
            $el.remove();
          }, router.params.removeElementsTimeout);
        } else {
          $el.remove();
        }
      };

      _proto.getPageEl = function getPageEl(content) {
        var router = this;

        if (typeof content === 'string') {
          router.tempDom.innerHTML = content;
        } else {
          if ($$1(content).hasClass('page')) {
            return content;
          }

          router.tempDom.innerHTML = '';
          $$1(router.tempDom).append(content);
        }

        return router.findElement('.page', router.tempDom);
      };

      _proto.findElement = function findElement(stringSelector, container, notStacked) {
        var router = this;
        var view = router.view;
        var app = router.app; // Modals Selector

        var modalsSelector = '.popup, .dialog, .popover, .actions-modal, .sheet-modal, .login-screen, .page';
        var $container = $$1(container);
        var selector = stringSelector;
        if (notStacked) selector += ':not(.stacked)';
        var found = $container.find(selector).filter(function (el) {
          return $$1(el).parents(modalsSelector).length === 0;
        });

        if (found.length > 1) {
          if (typeof view.selector === 'string') {
            // Search in related view
            found = $container.find(view.selector + " " + selector);
          }

          if (found.length > 1) {
            // Search in main view
            found = $container.find("." + app.params.viewMainClass + " " + selector);
          }
        }

        if (found.length === 1) return found; // Try to find not stacked

        if (!notStacked) found = router.findElement(selector, $container, true);
        if (found && found.length === 1) return found;
        if (found && found.length > 1) return $$1(found[0]);
        return undefined;
      };

      _proto.flattenRoutes = function flattenRoutes(routes) {
        if (routes === void 0) {
          routes = this.routes;
        }

        var router = this;
        var flattenedRoutes = [];
        routes.forEach(function (route) {
          var hasTabRoutes = false;

          if ('tabs' in route && route.tabs) {
            var mergedPathsRoutes = route.tabs.map(function (tabRoute) {
              var tRoute = extend$1({}, route, {
                path: (route.path + "/" + tabRoute.path).replace('///', '/').replace('//', '/'),
                parentPath: route.path,
                tab: tabRoute
              });
              delete tRoute.tabs;
              delete tRoute.routes;
              return tRoute;
            });
            hasTabRoutes = true;
            flattenedRoutes = flattenedRoutes.concat(router.flattenRoutes(mergedPathsRoutes));
          }

          if ('detailRoutes' in route) {
            var _mergedPathsRoutes = route.detailRoutes.map(function (detailRoute) {
              var dRoute = extend$1({}, detailRoute);
              dRoute.masterRoute = route;
              dRoute.masterRoutePath = route.path;
              return dRoute;
            });

            flattenedRoutes = flattenedRoutes.concat(route, router.flattenRoutes(_mergedPathsRoutes));
          }

          if ('routes' in route) {
            var _mergedPathsRoutes2 = route.routes.map(function (childRoute) {
              var cRoute = extend$1({}, childRoute);
              cRoute.path = (route.path + "/" + cRoute.path).replace('///', '/').replace('//', '/');
              return cRoute;
            });

            if (hasTabRoutes) {
              flattenedRoutes = flattenedRoutes.concat(router.flattenRoutes(_mergedPathsRoutes2));
            } else {
              flattenedRoutes = flattenedRoutes.concat(route, router.flattenRoutes(_mergedPathsRoutes2));
            }
          }

          if (!('routes' in route) && !('tabs' in route && route.tabs) && !('detailRoutes' in route)) {
            flattenedRoutes.push(route);
          }
        });
        return flattenedRoutes;
      } // eslint-disable-next-line
      ;

      _proto.parseRouteUrl = function parseRouteUrl(url) {
        if (!url) return {};
        var query = parseUrlQuery(url);
        var hash = url.split('#')[1];
        var params = {};
        var path = url.split('#')[0].split('?')[0];
        return {
          query: query,
          hash: hash,
          params: params,
          url: url,
          path: path
        };
      };

      _proto.generateUrl = function generateUrl(parameters) {
        if (parameters === void 0) {
          parameters = {};
        }

        if (typeof parameters === 'string') {
          return parameters;
        }

        var _parameters = parameters,
            name = _parameters.name,
            path = _parameters.path,
            params = _parameters.params,
            query = _parameters.query;

        if (!name && !path) {
          throw new Error('Framework7: "name" or "path" parameter is required');
        }

        var router = this;
        var route = name ? router.findRouteByKey('name', name) : router.findRouteByKey('path', path);

        if (!route) {
          if (name) {
            throw new Error("Framework7: route with name \"" + name + "\" not found");
          } else {
            throw new Error("Framework7: route with path \"" + path + "\" not found");
          }
        }

        var url = router.constructRouteUrl(route, {
          params: params,
          query: query
        });

        if (!url) {
          throw new Error("Framework7: can't construct URL for route with name \"" + name + "\"");
        }

        return url;
      } // eslint-disable-next-line
      ;

      _proto.constructRouteUrl = function constructRouteUrl(route, _temp) {
        var _ref = _temp === void 0 ? {} : _temp,
            params = _ref.params,
            query = _ref.query;

        var path = route.path;
        var toUrl = compile(path);
        var url;

        try {
          url = toUrl(params || {});
        } catch (error) {
          throw new Error("Framework7: error constructing route URL from passed params:\nRoute: " + path + "\n" + error.toString());
        }

        if (query) {
          if (typeof query === 'string') url += "?" + query;else url += "?" + serializeObject(query);
        }

        return url;
      };

      _proto.findTabRoute = function findTabRoute(tabEl) {
        var router = this;
        var $tabEl = $$1(tabEl);
        var parentPath = router.currentRoute.route.parentPath;
        var tabId = $tabEl.attr('id');
        var flattenedRoutes = router.flattenRoutes(router.routes);
        var foundTabRoute;
        flattenedRoutes.forEach(function (route) {
          if (route.parentPath === parentPath && route.tab && route.tab.id === tabId) {
            foundTabRoute = route;
          }
        });
        return foundTabRoute;
      };

      _proto.findRouteByKey = function findRouteByKey(key, value) {
        var router = this;
        var routes = router.routes;
        var flattenedRoutes = router.flattenRoutes(routes);
        var matchingRoute;
        flattenedRoutes.forEach(function (route) {
          if (matchingRoute) return;

          if (route[key] === value) {
            matchingRoute = route;
          }
        });
        return matchingRoute;
      };

      _proto.findMatchingRoute = function findMatchingRoute(url) {
        if (!url) return undefined;
        var router = this;
        var routes = router.routes;
        var flattenedRoutes = router.flattenRoutes(routes);

        var _router$parseRouteUrl = router.parseRouteUrl(url),
            path = _router$parseRouteUrl.path,
            query = _router$parseRouteUrl.query,
            hash = _router$parseRouteUrl.hash,
            params = _router$parseRouteUrl.params;

        var matchingRoute;
        flattenedRoutes.forEach(function (route) {
          if (matchingRoute) return;
          var keys = [];
          var pathsToMatch = [route.path];

          if (route.alias) {
            if (typeof route.alias === 'string') pathsToMatch.push(route.alias);else if (Array.isArray(route.alias)) {
              route.alias.forEach(function (aliasPath) {
                pathsToMatch.push(aliasPath);
              });
            }
          }

          var matched;
          pathsToMatch.forEach(function (pathToMatch) {
            if (matched) return;
            matched = pathToRegexp(pathToMatch, keys).exec(path);
          });

          if (matched) {
            keys.forEach(function (keyObj, index) {
              if (typeof keyObj.name === 'number') return;
              var paramValue = matched[index + 1];

              if (typeof paramValue === 'undefined' || paramValue === null) {
                params[keyObj.name] = paramValue;
              } else {
                params[keyObj.name] = decodeURIComponent(paramValue);
              }
            });
            var parentPath;

            if (route.parentPath) {
              parentPath = path.split('/').slice(0, route.parentPath.split('/').length - 1).join('/');
            }

            matchingRoute = {
              query: query,
              hash: hash,
              params: params,
              url: url,
              path: path,
              parentPath: parentPath,
              route: route,
              name: route.name
            };
          }
        });
        return matchingRoute;
      } // eslint-disable-next-line
      ;

      _proto.replaceRequestUrlParams = function replaceRequestUrlParams(url, options) {
        if (url === void 0) {
          url = '';
        }

        if (options === void 0) {
          options = {};
        }

        var compiledUrl = url;

        if (typeof compiledUrl === 'string' && compiledUrl.indexOf('{{') >= 0 && options && options.route && options.route.params && Object.keys(options.route.params).length) {
          Object.keys(options.route.params).forEach(function (paramName) {
            var regExp = new RegExp("{{" + paramName + "}}", 'g');
            compiledUrl = compiledUrl.replace(regExp, options.route.params[paramName] || '');
          });
        }

        return compiledUrl;
      };

      _proto.removeFromXhrCache = function removeFromXhrCache(url) {
        var router = this;
        var xhrCache = router.cache.xhr;
        var index = false;

        for (var i = 0; i < xhrCache.length; i += 1) {
          if (xhrCache[i].url === url) index = i;
        }

        if (index !== false) xhrCache.splice(index, 1);
      };

      _proto.xhrRequest = function xhrRequest(requestUrl, options) {
        var router = this;
        var params = router.params;
        var ignoreCache = options.ignoreCache;
        var url = requestUrl;
        var hasQuery = url.indexOf('?') >= 0;

        if (params.passRouteQueryToRequest && options && options.route && options.route.query && Object.keys(options.route.query).length) {
          url += "" + (hasQuery ? '&' : '?') + serializeObject(options.route.query);
          hasQuery = true;
        }

        if (params.passRouteParamsToRequest && options && options.route && options.route.params && Object.keys(options.route.params).length) {
          url += "" + (hasQuery ? '&' : '?') + serializeObject(options.route.params);
          hasQuery = true;
        }

        if (url.indexOf('{{') >= 0) {
          url = router.replaceRequestUrlParams(url, options);
        } // should we ignore get params or not


        if (params.xhrCacheIgnoreGetParameters && url.indexOf('?') >= 0) {
          url = url.split('?')[0];
        }

        return new Promise(function (resolve, reject) {
          if (params.xhrCache && !ignoreCache && url.indexOf('nocache') < 0 && params.xhrCacheIgnore.indexOf(url) < 0) {
            for (var i = 0; i < router.cache.xhr.length; i += 1) {
              var cachedUrl = router.cache.xhr[i];

              if (cachedUrl.url === url) {
                // Check expiration
                if (now() - cachedUrl.time < params.xhrCacheDuration) {
                  // Load from cache
                  resolve(cachedUrl.content);
                  return;
                }
              }
            }
          }

          router.xhrAbortController = router.app.request.abortController();
          router.app.request({
            abortController: router.xhrAbortController,
            url: url,
            method: 'GET',
            beforeSend: function beforeSend(xhr) {
              router.emit('routerAjaxStart', xhr, options);
            },
            complete: function complete(xhr, status) {
              router.emit('routerAjaxComplete', xhr);

              if (status !== 'error' && status !== 'timeout' && xhr.status >= 200 && xhr.status < 300 || xhr.status === 0) {
                if (params.xhrCache && xhr.responseText !== '') {
                  router.removeFromXhrCache(url);
                  router.cache.xhr.push({
                    url: url,
                    time: now(),
                    content: xhr.responseText
                  });
                }

                router.emit('routerAjaxSuccess', xhr, options);
                resolve(xhr.responseText);
              } else {
                router.emit('routerAjaxError', xhr, options);
                reject(xhr);
              }
            },
            error: function error(xhr) {
              router.emit('routerAjaxError', xhr, options);
              reject(xhr);
            }
          });
        });
      };

      _proto.setNavbarPosition = function setNavbarPosition($el, position, ariaHidden) {
        var router = this;
        $el.removeClass('navbar-previous navbar-current navbar-next');

        if (position) {
          $el.addClass("navbar-" + position);
        }

        if (ariaHidden === false) {
          $el.removeAttr('aria-hidden');
        } else if (ariaHidden === true) {
          $el.attr('aria-hidden', 'true');
        }

        $el.trigger('navbar:position', {
          position: position
        });
        router.emit('navbarPosition', $el[0], position);
      };

      _proto.setPagePosition = function setPagePosition($el, position, ariaHidden) {
        var router = this;
        $el.removeClass('page-previous page-current page-next');
        $el.addClass("page-" + position);

        if (ariaHidden === false) {
          $el.removeAttr('aria-hidden');
        } else if (ariaHidden === true) {
          $el.attr('aria-hidden', 'true');
        }

        $el.trigger('page:position', {
          position: position
        });
        router.emit('pagePosition', $el[0], position);
      } // Remove theme elements
      ;

      _proto.removeThemeElements = function removeThemeElements(el) {
        var router = this;
        var theme = router.app.theme;
        var toRemove;

        if (theme === 'ios') {
          toRemove = '.md-only, .aurora-only, .if-md, .if-aurora, .if-not-ios, .not-ios';
        } else if (theme === 'md') {
          toRemove = '.ios-only, .aurora-only, .if-ios, .if-aurora, .if-not-md, .not-md';
        } else if (theme === 'aurora') {
          toRemove = '.ios-only, .md-only, .if-ios, .if-md, .if-not-aurora, .not-aurora';
        }

        $$1(el).find(toRemove).remove();
      };

      _proto.getPageData = function getPageData(pageEl, navbarEl, from, to, route, pageFromEl) {
        if (route === void 0) {
          route = {};
        }

        var router = this;
        var $pageEl = $$1(pageEl).eq(0);
        var $navbarEl = $$1(navbarEl).eq(0);
        var currentPage = $pageEl[0].f7Page || {};
        var direction;
        var pageFrom;
        if (from === 'next' && to === 'current' || from === 'current' && to === 'previous') direction = 'forward';
        if (from === 'current' && to === 'next' || from === 'previous' && to === 'current') direction = 'backward';

        if (currentPage && !currentPage.fromPage) {
          var $pageFromEl = $$1(pageFromEl);

          if ($pageFromEl.length) {
            pageFrom = $pageFromEl[0].f7Page;
          }
        }

        pageFrom = currentPage.pageFrom || pageFrom;

        if (pageFrom && pageFrom.pageFrom) {
          pageFrom.pageFrom = null;
        }

        var page = {
          app: router.app,
          view: router.view,
          router: router,
          $el: $pageEl,
          el: $pageEl[0],
          $pageEl: $pageEl,
          pageEl: $pageEl[0],
          $navbarEl: $navbarEl,
          navbarEl: $navbarEl[0],
          name: $pageEl.attr('data-name'),
          position: from,
          from: from,
          to: to,
          direction: direction,
          route: currentPage.route ? currentPage.route : route,
          pageFrom: pageFrom
        };
        $pageEl[0].f7Page = page;
        return page;
      } // Callbacks
      ;

      _proto.pageCallback = function pageCallback(callback, pageEl, navbarEl, from, to, options, pageFromEl) {
        if (options === void 0) {
          options = {};
        }

        if (!pageEl) return;
        var router = this;
        var $pageEl = $$1(pageEl);
        if (!$pageEl.length) return;
        var $navbarEl = $$1(navbarEl);
        var _options = options,
            route = _options.route;
        var restoreScrollTopOnBack = router.params.restoreScrollTopOnBack && !(router.params.masterDetailBreakpoint > 0 && $pageEl.hasClass('page-master') && router.app.width >= router.params.masterDetailBreakpoint);
        var keepAlive = $pageEl[0].f7Page && $pageEl[0].f7Page.route && $pageEl[0].f7Page.route.route && $pageEl[0].f7Page.route.route.keepAlive;

        if (callback === 'beforeRemove' && keepAlive) {
          callback = 'beforeUnmount'; // eslint-disable-line
        }

        var camelName = "page" + (callback[0].toUpperCase() + callback.slice(1, callback.length));
        var colonName = "page:" + callback.toLowerCase();
        var page = {};

        if (callback === 'beforeRemove' && $pageEl[0].f7Page) {
          page = extend$1($pageEl[0].f7Page, {
            from: from,
            to: to,
            position: from
          });
        } else {
          page = router.getPageData($pageEl[0], $navbarEl[0], from, to, route, pageFromEl);
        }

        page.swipeBack = !!options.swipeBack;

        var _ref2 = options.route ? options.route.route : {},
            _ref2$on = _ref2.on,
            on = _ref2$on === void 0 ? {} : _ref2$on,
            _ref2$once = _ref2.once,
            once = _ref2$once === void 0 ? {} : _ref2$once;

        if (options.on) {
          extend$1(on, options.on);
        }

        if (options.once) {
          extend$1(once, options.once);
        }

        function attachEvents() {
          if ($pageEl[0].f7RouteEventsAttached) return;
          $pageEl[0].f7RouteEventsAttached = true;

          if (on && Object.keys(on).length > 0) {
            $pageEl[0].f7RouteEventsOn = on;
            Object.keys(on).forEach(function (eventName) {
              on[eventName] = on[eventName].bind(router);
              $pageEl.on(eventNameToColonCase(eventName), on[eventName]);
            });
          }

          if (once && Object.keys(once).length > 0) {
            $pageEl[0].f7RouteEventsOnce = once;
            Object.keys(once).forEach(function (eventName) {
              once[eventName] = once[eventName].bind(router);
              $pageEl.once(eventNameToColonCase(eventName), once[eventName]);
            });
          }
        }

        function detachEvents() {
          if (!$pageEl[0].f7RouteEventsAttached) return;

          if ($pageEl[0].f7RouteEventsOn) {
            Object.keys($pageEl[0].f7RouteEventsOn).forEach(function (eventName) {
              $pageEl.off(eventNameToColonCase(eventName), $pageEl[0].f7RouteEventsOn[eventName]);
            });
          }

          if ($pageEl[0].f7RouteEventsOnce) {
            Object.keys($pageEl[0].f7RouteEventsOnce).forEach(function (eventName) {
              $pageEl.off(eventNameToColonCase(eventName), $pageEl[0].f7RouteEventsOnce[eventName]);
            });
          }

          $pageEl[0].f7RouteEventsAttached = null;
          $pageEl[0].f7RouteEventsOn = null;
          $pageEl[0].f7RouteEventsOnce = null;
          delete $pageEl[0].f7RouteEventsAttached;
          delete $pageEl[0].f7RouteEventsOn;
          delete $pageEl[0].f7RouteEventsOnce;
        }

        if (callback === 'mounted') {
          attachEvents();
        }

        if (callback === 'init') {
          if (restoreScrollTopOnBack && (from === 'previous' || !from) && to === 'current' && router.scrollHistory[page.route.url] && !$pageEl.hasClass('no-restore-scroll')) {
            var $pageContent = $pageEl.find('.page-content');

            if ($pageContent.length > 0) {
              // eslint-disable-next-line
              $pageContent = $pageContent.filter(function (pageContentEl) {
                return $$1(pageContentEl).parents('.tab:not(.tab-active)').length === 0 && !$$1(pageContentEl).is('.tab:not(.tab-active)');
              });
            }

            $pageContent.scrollTop(router.scrollHistory[page.route.url]);
          }

          attachEvents();

          if ($pageEl[0].f7PageInitialized) {
            $pageEl.trigger('page:reinit', page);
            router.emit('pageReinit', page);
            return;
          }

          $pageEl[0].f7PageInitialized = true;
        }

        if (restoreScrollTopOnBack && callback === 'beforeOut' && from === 'current' && to === 'previous') {
          // Save scroll position
          var _$pageContent = $pageEl.find('.page-content');

          if (_$pageContent.length > 0) {
            // eslint-disable-next-line
            _$pageContent = _$pageContent.filter(function (pageContentEl) {
              return $$1(pageContentEl).parents('.tab:not(.tab-active)').length === 0 && !$$1(pageContentEl).is('.tab:not(.tab-active)');
            });
          }

          router.scrollHistory[page.route.url] = _$pageContent.scrollTop();
        }

        if (restoreScrollTopOnBack && callback === 'beforeOut' && from === 'current' && to === 'next') {
          // Delete scroll position
          delete router.scrollHistory[page.route.url];
        }

        $pageEl.trigger(colonName, page);
        router.emit(camelName, page);

        if (callback === 'beforeRemove' || callback === 'beforeUnmount') {
          detachEvents();

          if (!keepAlive) {
            if ($pageEl[0].f7Page && $pageEl[0].f7Page.navbarEl) {
              delete $pageEl[0].f7Page.navbarEl.f7Page;
            }

            $pageEl[0].f7Page = null;
          }
        }
      };

      _proto.saveHistory = function saveHistory() {
        var router = this;
        var window = getWindow();
        router.view.history = router.history;

        if (router.params.browserHistory && router.params.browserHistoryStoreHistory && window.localStorage) {
          window.localStorage["f7router-" + router.view.id + "-history"] = JSON.stringify(router.history);
        }
      };

      _proto.restoreHistory = function restoreHistory() {
        var router = this;
        var window = getWindow();

        if (router.params.browserHistory && router.params.browserHistoryStoreHistory && window.localStorage && window.localStorage["f7router-" + router.view.id + "-history"]) {
          router.history = JSON.parse(window.localStorage["f7router-" + router.view.id + "-history"]);
          router.view.history = router.history;
        }
      };

      _proto.clearHistory = function clearHistory() {
        var router = this;
        router.history = [];
        if (router.view) router.view.history = [];
        router.saveHistory();
      };

      _proto.updateCurrentUrl = function updateCurrentUrl(newUrl) {
        var router = this;
        appRouterCheck(router, 'updateCurrentUrl'); // Update history

        if (router.history.length) {
          router.history[router.history.length - 1] = newUrl;
        } else {
          router.history.push(newUrl);
        } // Update current route params


        var _router$parseRouteUrl2 = router.parseRouteUrl(newUrl),
            query = _router$parseRouteUrl2.query,
            hash = _router$parseRouteUrl2.hash,
            params = _router$parseRouteUrl2.params,
            url = _router$parseRouteUrl2.url,
            path = _router$parseRouteUrl2.path;

        if (router.currentRoute) {
          extend$1(router.currentRoute, {
            query: query,
            hash: hash,
            params: params,
            url: url,
            path: path
          });
        }

        if (router.params.browserHistory) {
          var browserHistoryRoot = router.params.browserHistoryRoot || '';
          History.replace(router.view.id, {
            url: newUrl
          }, browserHistoryRoot + router.params.browserHistorySeparator + newUrl);
        } // Save History


        router.saveHistory();
        router.emit('routeUrlUpdate', router.currentRoute, router);
      };

      _proto.getInitialUrl = function getInitialUrl() {
        var router = this;

        if (router.initialUrl) {
          return {
            initialUrl: router.initialUrl,
            historyRestored: router.historyRestored
          };
        }

        var app = router.app,
            view = router.view;
        var document = getDocument();
        var window = getWindow();
        var location = app.params.url && typeof app.params.url === 'string' && typeof URL !== 'undefined' ? new URL(app.params.url) : document.location;
        var initialUrl = router.params.url;
        var documentUrl = location.href.split(location.origin)[1];
        var historyRestored;
        var _router$params = router.params,
            browserHistory = _router$params.browserHistory,
            browserHistoryOnLoad = _router$params.browserHistoryOnLoad,
            browserHistorySeparator = _router$params.browserHistorySeparator;
        var browserHistoryRoot = router.params.browserHistoryRoot;

        if ((window.cordova || window.Capacitor && window.Capacitor.isNative) && browserHistory && !browserHistorySeparator && !browserHistoryRoot && location.pathname.indexOf('index.html')) {
          // eslint-disable-next-line
          console.warn('Framework7: wrong or not complete browserHistory configuration, trying to guess browserHistoryRoot');
          browserHistoryRoot = location.pathname.split('index.html')[0];
        }

        if (!browserHistory || !browserHistoryOnLoad) {
          if (!initialUrl) {
            initialUrl = documentUrl;
          }

          if (location.search && initialUrl.indexOf('?') < 0) {
            initialUrl += location.search;
          }

          if (location.hash && initialUrl.indexOf('#') < 0) {
            initialUrl += location.hash;
          }
        } else {
          if (browserHistoryRoot && documentUrl.indexOf(browserHistoryRoot) >= 0) {
            documentUrl = documentUrl.split(browserHistoryRoot)[1];
            if (documentUrl === '') documentUrl = '/';
          }

          if (browserHistorySeparator.length > 0 && documentUrl.indexOf(browserHistorySeparator) >= 0) {
            initialUrl = documentUrl.split(browserHistorySeparator)[1];
          } else {
            initialUrl = documentUrl;
          }

          router.restoreHistory();

          if (router.history.indexOf(initialUrl) >= 0) {
            router.history = router.history.slice(0, router.history.indexOf(initialUrl) + 1);
          } else if (router.params.url === initialUrl) {
            router.history = [initialUrl];
          } else if (History.state && History.state[view.id] && History.state[view.id].url === router.history[router.history.length - 1]) {
            initialUrl = router.history[router.history.length - 1];
          } else {
            router.history = [documentUrl.split(browserHistorySeparator)[0] || '/', initialUrl];
          }

          if (router.history.length > 1) {
            historyRestored = true;
          } else {
            router.history = [];
          }

          router.saveHistory();
        }

        router.initialUrl = initialUrl;
        router.historyRestored = historyRestored;
        return {
          initialUrl: initialUrl,
          historyRestored: historyRestored
        };
      };

      _proto.init = function init() {
        var router = this;
        var app = router.app,
            view = router.view;
        var document = getDocument();
        router.mount();

        var _router$getInitialUrl = router.getInitialUrl(),
            initialUrl = _router$getInitialUrl.initialUrl,
            historyRestored = _router$getInitialUrl.historyRestored; // Init Swipeback


        if (view && router.params.iosSwipeBack && app.theme === 'ios' || view && router.params.mdSwipeBack && app.theme === 'md' || view && router.params.auroraSwipeBack && app.theme === 'aurora') {
          SwipeBack(router);
        }

        var _router$params2 = router.params,
            browserHistory = _router$params2.browserHistory,
            browserHistoryOnLoad = _router$params2.browserHistoryOnLoad,
            browserHistoryAnimateOnLoad = _router$params2.browserHistoryAnimateOnLoad,
            browserHistoryInitialMatch = _router$params2.browserHistoryInitialMatch;
        var currentRoute;

        if (router.history.length > 1) {
          // Will load page
          var initUrl = browserHistoryInitialMatch ? initialUrl : router.history[0];
          currentRoute = router.findMatchingRoute(initUrl);

          if (!currentRoute) {
            currentRoute = extend$1(router.parseRouteUrl(initUrl), {
              route: {
                url: initUrl,
                path: initUrl.split('?')[0]
              }
            });
          }
        } else {
          // Don't load page
          currentRoute = router.findMatchingRoute(initialUrl);

          if (!currentRoute) {
            currentRoute = extend$1(router.parseRouteUrl(initialUrl), {
              route: {
                url: initialUrl,
                path: initialUrl.split('?')[0]
              }
            });
          }
        }

        if (router.params.stackPages) {
          router.$el.children('.page').each(function (pageEl) {
            var $pageEl = $$1(pageEl);
            router.initialPages.push($pageEl[0]);

            if (router.dynamicNavbar && $pageEl.children('.navbar').length > 0) {
              router.initialNavbars.push($pageEl.children('.navbar')[0]);
            }
          });
        }

        if (router.$el.children('.page:not(.stacked)').length === 0 && initialUrl && router.params.loadInitialPage) {
          // No pages presented in DOM, reload new page
          router.navigate(initialUrl, {
            initial: true,
            reloadCurrent: true,
            browserHistory: false,
            animate: false,
            once: {
              modalOpen: function modalOpen() {
                if (!historyRestored) return;
                var preloadPreviousPage = router.params.preloadPreviousPage || router.params[app.theme + "SwipeBack"];

                if (preloadPreviousPage && router.history.length > 1) {
                  router.back({
                    preload: true
                  });
                }
              },
              pageAfterIn: function pageAfterIn() {
                if (!historyRestored) return;
                var preloadPreviousPage = router.params.preloadPreviousPage || router.params[app.theme + "SwipeBack"];

                if (preloadPreviousPage && router.history.length > 1) {
                  router.back({
                    preload: true
                  });
                }
              }
            }
          });
        } else if (router.$el.children('.page:not(.stacked)').length) {
          // Init current DOM page
          var hasTabRoute;
          router.currentRoute = currentRoute;
          router.$el.children('.page:not(.stacked)').each(function (pageEl) {
            var $pageEl = $$1(pageEl);
            var $navbarEl;
            router.setPagePosition($pageEl, 'current');

            if (router.dynamicNavbar) {
              $navbarEl = $pageEl.children('.navbar');

              if ($navbarEl.length > 0) {
                if (!router.$navbarsEl.parents(document).length) {
                  router.$el.prepend(router.$navbarsEl);
                }

                router.setNavbarPosition($navbarEl, 'current');
                router.$navbarsEl.append($navbarEl);

                if ($navbarEl.children('.title-large').length) {
                  $navbarEl.addClass('navbar-large');
                }

                $pageEl.children('.navbar').remove();
              } else {
                router.$navbarsEl.addClass('navbar-hidden');

                if ($navbarEl.children('.title-large').length) {
                  router.$navbarsEl.addClass('navbar-hidden navbar-large-hidden');
                }
              }
            }

            if (router.currentRoute && router.currentRoute.route && (router.currentRoute.route.master === true || typeof router.currentRoute.route.master === 'function' && router.currentRoute.route.master(app, router)) && router.params.masterDetailBreakpoint > 0) {
              $pageEl.addClass('page-master');
              $pageEl.trigger('page:role', {
                role: 'master'
              });

              if ($navbarEl && $navbarEl.length) {
                $navbarEl.addClass('navbar-master');
              }

              view.checkMasterDetailBreakpoint();
            }

            var initOptions = {
              route: router.currentRoute
            };

            if (router.currentRoute && router.currentRoute.route && router.currentRoute.route.options) {
              extend$1(initOptions, router.currentRoute.route.options);
            }

            router.currentPageEl = $pageEl[0];

            if (router.dynamicNavbar && $navbarEl.length) {
              router.currentNavbarEl = $navbarEl[0];
            }

            router.removeThemeElements($pageEl);

            if (router.dynamicNavbar && $navbarEl.length) {
              router.removeThemeElements($navbarEl);
            }

            if (initOptions.route.route.tab) {
              hasTabRoute = true;
              router.tabLoad(initOptions.route.route.tab, extend$1({}, initOptions));
            }

            router.pageCallback('init', $pageEl, $navbarEl, 'current', undefined, initOptions);
            router.pageCallback('beforeIn', $pageEl, $navbarEl, 'current', undefined, initOptions);
            router.pageCallback('afterIn', $pageEl, $navbarEl, 'current', undefined, initOptions);
          });

          if (historyRestored) {
            if (browserHistoryInitialMatch) {
              var preloadPreviousPage = router.params.preloadPreviousPage || router.params[app.theme + "SwipeBack"];

              if (preloadPreviousPage && router.history.length > 1) {
                router.back({
                  preload: true
                });
              }
            } else {
              router.navigate(initialUrl, {
                initial: true,
                browserHistory: false,
                history: false,
                animate: browserHistoryAnimateOnLoad,
                once: {
                  pageAfterIn: function pageAfterIn() {
                    var preloadPreviousPage = router.params.preloadPreviousPage || router.params[app.theme + "SwipeBack"];

                    if (preloadPreviousPage && router.history.length > 2) {
                      router.back({
                        preload: true
                      });
                    }
                  }
                }
              });
            }
          }

          if (!historyRestored && !hasTabRoute) {
            router.history.push(initialUrl);
            router.saveHistory();
          }
        }

        if (initialUrl && browserHistory && browserHistoryOnLoad && (!History.state || !History.state[view.id])) {
          History.initViewState(view.id, {
            url: initialUrl
          });
        }

        router.emit('local::init routerInit', router);
      };

      _proto.destroy = function destroy() {
        var router = this;
        router.emit('local::destroy routerDestroy', router); // Delete props & methods

        Object.keys(router).forEach(function (routerProp) {
          router[routerProp] = null;
          delete router[routerProp];
        });
        router = null;
      };

      return Router;
    }(Framework7Class); // Load


    Router.prototype.navigate = navigate;
    Router.prototype.refreshPage = refreshPage; // Tab

    Router.prototype.tabLoad = tabLoad;
    Router.prototype.tabRemove = tabRemove; // Modal

    Router.prototype.modalLoad = modalLoad;
    Router.prototype.modalRemove = modalRemove; // Back

    Router.prototype.back = back; // Clear history

    Router.prototype.clearPreviousHistory = clearPreviousHistory;

    var RouterModule = {
      name: 'router',
      static: {
        Router: Router
      },
      instance: {
        cache: {
          xhr: [],
          templates: [],
          components: []
        }
      },
      create: function create() {
        var instance = this;

        if (instance.app) {
          // View Router
          if (instance.params.router) {
            instance.router = new Router(instance.app, instance);
          }
        } else {
          // App Router
          instance.router = new Router(instance);
        }
      }
    };

    function resizableView(view) {
      var app = view.app;
      var support = getSupport();
      if (view.resizableInitialized) return;
      extend$1(view, {
        resizable: true,
        resizableWidth: null,
        resizableInitialized: true
      });
      var $htmlEl = $$1('html');
      var $el = view.$el;
      if (!$el) return;
      var $resizeHandlerEl;
      var isTouched;
      var isMoved;
      var touchesStart = {};
      var touchesDiff;
      var width;
      var minWidth;
      var maxWidth;

      function transformCSSWidth(v) {
        if (!v) return null;

        if (v.indexOf('%') >= 0 || v.indexOf('vw') >= 0) {
          return parseInt(v, 10) / 100 * app.width;
        }

        var newV = parseInt(v, 10);
        if (Number.isNaN(newV)) return null;
        return newV;
      }

      function isResizable() {
        return view.resizable && $el.hasClass('view-resizable') && $el.hasClass('view-master-detail');
      }

      function handleTouchStart(e) {
        if (!isResizable()) return;
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        isMoved = false;
        isTouched = true;
        var $pageMasterEl = $el.children('.page-master');
        minWidth = transformCSSWidth($pageMasterEl.css('min-width'));
        maxWidth = transformCSSWidth($pageMasterEl.css('max-width'));
      }

      function handleTouchMove(e) {
        if (!isTouched) return;
        e.f7PreventSwipePanel = true;
        var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;

        if (!isMoved) {
          width = $resizeHandlerEl[0].offsetLeft + $resizeHandlerEl[0].offsetWidth;
          $el.addClass('view-resizing');
          $htmlEl.css('cursor', 'col-resize');
        }

        isMoved = true;
        e.preventDefault();
        touchesDiff = pageX - touchesStart.x;
        var newWidth = width + touchesDiff;

        if (minWidth && !Number.isNaN(minWidth)) {
          newWidth = Math.max(newWidth, minWidth);
        }

        if (maxWidth && !Number.isNaN(maxWidth)) {
          newWidth = Math.min(newWidth, maxWidth);
        }

        newWidth = Math.min(Math.max(newWidth, 0), app.width);
        view.resizableWidth = newWidth;
        $htmlEl[0].style.setProperty('--f7-page-master-width', newWidth + "px");
        $el.trigger('view:resize', newWidth);
        view.emit('local::resize viewResize', view, newWidth);
      }

      function handleTouchEnd() {
        $$1('html').css('cursor', '');

        if (!isTouched || !isMoved) {
          isTouched = false;
          isMoved = false;
          return;
        }

        isTouched = false;
        isMoved = false;
        $htmlEl[0].style.setProperty('--f7-page-master-width', view.resizableWidth + "px");
        $el.removeClass('view-resizing');
      }

      function handleResize() {
        if (!view.resizableWidth) return;
        minWidth = transformCSSWidth($resizeHandlerEl.css('min-width'));
        maxWidth = transformCSSWidth($resizeHandlerEl.css('max-width'));

        if (minWidth && !Number.isNaN(minWidth) && view.resizableWidth < minWidth) {
          view.resizableWidth = Math.max(view.resizableWidth, minWidth);
        }

        if (maxWidth && !Number.isNaN(maxWidth) && view.resizableWidth > maxWidth) {
          view.resizableWidth = Math.min(view.resizableWidth, maxWidth);
        }

        view.resizableWidth = Math.min(Math.max(view.resizableWidth, 0), app.width);
        $htmlEl[0].style.setProperty('--f7-page-master-width', view.resizableWidth + "px");
      }

      $resizeHandlerEl = view.$el.children('.view-resize-handler');

      if (!$resizeHandlerEl.length) {
        view.$el.append('<div class="view-resize-handler"></div>');
        $resizeHandlerEl = view.$el.children('.view-resize-handler');
      }

      view.$resizeHandlerEl = $resizeHandlerEl;
      $el.addClass('view-resizable'); // Add Events

      var passive = support.passiveListener ? {
        passive: true
      } : false;
      view.$el.on(app.touchEvents.start, '.view-resize-handler', handleTouchStart, passive);
      app.on('touchmove:active', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
      app.on('resize', handleResize);
      view.on('beforeOpen', handleResize);
      view.once('viewDestroy', function () {
        $el.removeClass('view-resizable');
        view.$resizeHandlerEl.remove();
        view.$el.off(app.touchEvents.start, '.view-resize-handler', handleTouchStart, passive);
        app.off('touchmove:active', handleTouchMove);
        app.off('touchend:passive', handleTouchEnd);
        app.off('resize', handleResize);
        view.off('beforeOpen', handleResize);
      });
    }

    var View = /*#__PURE__*/function (_Framework7Class) {
      _inheritsLoose$1(View, _Framework7Class);

      function View(app, el, viewParams) {
        var _this;

        if (viewParams === void 0) {
          viewParams = {};
        }

        _this = _Framework7Class.call(this, viewParams, [app]) || this;

        var view = _assertThisInitialized$1(_this);

        var ssr = view.params.routerId;
        var defaults = {
          routes: [],
          routesAdd: []
        };

        if (!ssr) {
          var $el = $$1(el);

          if (!$el.length) {
            var message = "Framework7: can't create a View instance because ";
            message += typeof el === 'string' ? "the selector \"" + el + "\" didn't match any element" : 'el must be an HTMLElement or Dom7 object';
            throw new Error(message);
          }
        } // Default View params


        view.params = extend$1({
          el: el
        }, defaults, app.params.view, viewParams); // Routes

        if (view.params.routes.length > 0) {
          view.routes = view.params.routes;
        } else {
          view.routes = [].concat(app.routes, view.params.routesAdd);
        } // View Props


        extend$1(false, view, {
          app: app,
          name: view.params.name,
          main: view.params.main,
          history: [],
          scrollHistory: {}
        }); // Install Modules

        view.useModules(); // Add to app

        app.views.push(view);

        if (view.main) {
          app.views.main = view;
        }

        if (view.name) {
          app.views[view.name] = view;
        } // Index


        view.index = app.views.indexOf(view); // View ID

        var viewId;

        if (view.name) {
          viewId = "view_" + view.name;
        } else if (view.main) {
          viewId = 'view_main';
        } else {
          viewId = "view_" + view.index;
        }

        view.id = viewId;

        if (!view.params.init) {
          return view || _assertThisInitialized$1(_this);
        } // Init View


        if (app.initialized) {
          view.init();
        } else {
          app.on('init', function () {
            view.init();
          });
        }

        return view || _assertThisInitialized$1(_this);
      }

      var _proto = View.prototype;

      _proto.destroy = function destroy() {
        var view = this;
        var app = view.app;
        view.$el.trigger('view:beforedestroy');
        view.emit('local::beforeDestroy viewBeforeDestroy', view);
        app.off('resize', view.checkMasterDetailBreakpoint);

        if (view.main) {
          app.views.main = null;
          delete app.views.main;
        } else if (view.name) {
          app.views[view.name] = null;
          delete app.views[view.name];
        }

        view.$el[0].f7View = null;
        delete view.$el[0].f7View;
        app.views.splice(app.views.indexOf(view), 1); // Destroy Router

        if (view.params.router && view.router) {
          view.router.destroy();
        }

        view.emit('local::destroy viewDestroy', view); // Delete props & methods

        Object.keys(view).forEach(function (viewProp) {
          view[viewProp] = null;
          delete view[viewProp];
        });
        view = null;
      };

      _proto.checkMasterDetailBreakpoint = function checkMasterDetailBreakpoint(force) {
        var view = this;
        var app = view.app;
        var wasMasterDetail = view.$el.hasClass('view-master-detail');
        var isMasterDetail = app.width >= view.params.masterDetailBreakpoint && view.$el.children('.page-master').length;

        if (typeof force === 'undefined' && isMasterDetail || force === true) {
          view.$el.addClass('view-master-detail');

          if (!wasMasterDetail) {
            view.emit('local::masterDetailBreakpoint viewMasterDetailBreakpoint', view);
            view.$el.trigger('view:masterDetailBreakpoint');
          }
        } else {
          view.$el.removeClass('view-master-detail');

          if (wasMasterDetail) {
            view.emit('local::masterDetailBreakpoint viewMasterDetailBreakpoint', view);
            view.$el.trigger('view:masterDetailBreakpoint');
          }
        }
      };

      _proto.initMasterDetail = function initMasterDetail() {
        var view = this;
        var app = view.app;
        view.checkMasterDetailBreakpoint = view.checkMasterDetailBreakpoint.bind(view);
        view.checkMasterDetailBreakpoint();

        if (view.params.masterDetailResizable) {
          resizableView(view);
        }

        app.on('resize', view.checkMasterDetailBreakpoint);
      };

      _proto.mount = function mount(viewEl) {
        var view = this;
        var app = view.app;
        var el = view.params.el || viewEl;
        var $el = $$1(el); // Selector

        var selector;
        if (typeof el === 'string') selector = el;else {
          // Supposed to be HTMLElement or Dom7
          selector = ($el.attr('id') ? "#" + $el.attr('id') : '') + ($el.attr('class') ? "." + $el.attr('class').replace(/ /g, '.').replace('.active', '') : '');
        } // DynamicNavbar

        var $navbarsEl;

        if (app.theme === 'ios' && view.params.iosDynamicNavbar) {
          $navbarsEl = $el.children('.navbars').eq(0);

          if ($navbarsEl.length === 0) {
            $navbarsEl = $$1('<div class="navbars"></div>');
          }
        }

        extend$1(view, {
          $el: $el,
          el: $el[0],
          main: view.main || $el.hasClass('view-main'),
          $navbarsEl: $navbarsEl,
          navbarsEl: $navbarsEl ? $navbarsEl[0] : undefined,
          selector: selector
        });

        if (view.main) {
          app.views.main = view;
        } // Save in DOM


        if ($el && $el[0]) {
          $el[0].f7View = view;
        }

        view.emit('local::mount viewMount', view);
      };

      _proto.init = function init(viewEl) {
        var view = this;
        view.mount(viewEl);

        if (view.params.router) {
          if (view.params.masterDetailBreakpoint > 0) {
            view.initMasterDetail();
          }

          view.router.init();
          view.$el.trigger('view:init');
          view.emit('local::init viewInit', view);
        }
      };

      return View;
    }(Framework7Class); // Use Router


    View.use(RouterModule);

    function initClicks(app) {
      function handleClicks(e) {
        var window = getWindow();
        var $clickedEl = $$1(e.target);
        var $clickedLinkEl = $clickedEl.closest('a');
        var isLink = $clickedLinkEl.length > 0;
        var url = isLink && $clickedLinkEl.attr('href'); // Check if link is external

        if (isLink) {
          if ($clickedLinkEl.is(app.params.clicks.externalLinks) || // eslint-disable-next-line
          url && url.indexOf('javascript:') >= 0) {
            var target = $clickedLinkEl.attr('target');

            if (url && window.cordova && window.cordova.InAppBrowser && (target === '_system' || target === '_blank')) {
              e.preventDefault();
              window.cordova.InAppBrowser.open(url, target);
            } else if (url && window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Browser && (target === '_system' || target === '_blank')) {
              e.preventDefault();
              window.Capacitor.Plugins.Browser.open({
                url: url
              });
            }

            return;
          }
        } // Modules Clicks


        Object.keys(app.modules).forEach(function (moduleName) {
          var moduleClicks = app.modules[moduleName].clicks;
          if (!moduleClicks) return;
          if (e.preventF7Router) return;
          Object.keys(moduleClicks).forEach(function (clickSelector) {
            var matchingClickedElement = $clickedEl.closest(clickSelector).eq(0);

            if (matchingClickedElement.length > 0) {
              moduleClicks[clickSelector].call(app, matchingClickedElement, matchingClickedElement.dataset(), e);
            }
          });
        }); // Load Page

        var clickedLinkData = {};

        if (isLink) {
          e.preventDefault();
          clickedLinkData = $clickedLinkEl.dataset();
        }

        clickedLinkData.clickedEl = $clickedLinkEl[0]; // Prevent Router

        if (e.preventF7Router) return;
        if ($clickedLinkEl.hasClass('prevent-router') || $clickedLinkEl.hasClass('router-prevent')) return;
        var validUrl = url && url.length > 0 && url[0] !== '#';

        if (validUrl || $clickedLinkEl.hasClass('back')) {
          var view;

          if (clickedLinkData.view && clickedLinkData.view === 'current') {
            view = app.views.current;
          } else if (clickedLinkData.view) {
            view = $$1(clickedLinkData.view)[0].f7View;
          } else {
            view = $clickedEl.parents('.view')[0] && $clickedEl.parents('.view')[0].f7View;

            if (!$clickedLinkEl.hasClass('back') && view && view.params.linksView) {
              if (typeof view.params.linksView === 'string') view = $$1(view.params.linksView)[0].f7View;else if (view.params.linksView instanceof View) view = view.params.linksView;
            }
          }

          if (!view) {
            if (app.views.main) view = app.views.main;
          }

          if (!view || !view.router) return;

          if ($clickedLinkEl[0].f7RouteProps) {
            clickedLinkData.props = $clickedLinkEl[0].f7RouteProps;
          }

          if ($clickedLinkEl.hasClass('back')) view.router.back(url, clickedLinkData);else view.router.navigate(url, clickedLinkData);
        }
      }

      app.on('click', handleClicks);
    }

    var ClicksModule = {
      name: 'clicks',
      params: {
        clicks: {
          // External Links
          externalLinks: '.external'
        }
      },
      on: {
        init: function init() {
          var app = this;
          initClicks(app);
        }
      }
    };

    var RouterComponentLoaderModule = {
      name: 'routerComponentLoader',
      proto: {
        componentLoader: function componentLoader(component, componentUrl, options, resolve, reject) {
          if (options === void 0) {
            options = {};
          }

          var router = this;
          var app = router.app;
          var url = typeof component === 'string' ? component : componentUrl;
          var compiledUrl = router.replaceRequestUrlParams(url, options);

          function compile(componentFunction) {
            var context = options.context || {};
            if (typeof context === 'function') context = context.call(router);else if (typeof context === 'string') {
              try {
                context = JSON.parse(context);
              } catch (err) {
                reject(err);
                throw err;
              }
            }
            var componentContext = merge({}, context, {
              f7route: options.route,
              f7router: router
            });
            var componentProps = merge(options.route ? options.route.params || {} : {}, options.props || {}, options.routeProps || {});
            var componentEl;
            var componentRoot;

            if (options.componentOptions && options.componentOptions.el) {
              componentEl = options.componentOptions.el;
            }

            if (options.componentOptions && options.componentOptions.root) {
              componentRoot = options.componentOptions.root;
            }

            app.component.create(componentFunction, componentProps, {
              context: componentContext,
              el: componentEl,
              root: componentRoot
            }).then(function (createdComponent) {
              resolve(createdComponent.el);
            }).catch(function (err) {
              reject(err);
              throw new Error(err);
            });
          }

          var cachedComponent;

          if (compiledUrl && router.params.componentCache) {
            router.cache.components.forEach(function (cached) {
              if (cached.url === compiledUrl) cachedComponent = cached.component;
            });
          }

          if (compiledUrl && cachedComponent) {
            compile(cachedComponent);
          } else if (compiledUrl && !cachedComponent) {
            // Load via XHR
            if (router.xhrAbortController) {
              router.xhrAbortController.abort();
              router.xhrAbortController = false;
            }

            router.xhrRequest(url, options).then(function (loadedComponent) {
              var parsedComponent = app.component.parse(loadedComponent);

              if (router.params.componentCache) {
                router.cache.components.push({
                  url: compiledUrl,
                  component: parsedComponent
                });
              }

              compile(parsedComponent);
            }).catch(function (err) {
              reject();
              throw err;
            });
          } else {
            compile(component);
          }
        },
        modalComponentLoader: function modalComponentLoader(_temp) {
          var _ref = _temp === void 0 ? {} : _temp,
              component = _ref.component,
              componentUrl = _ref.componentUrl,
              options = _ref.options,
              resolve = _ref.resolve,
              reject = _ref.reject;

          var router = this;
          router.componentLoader(component, componentUrl, options, function (el) {
            resolve(el);
          }, reject);
        },
        tabComponentLoader: function tabComponentLoader(_temp2) {
          var _ref2 = _temp2 === void 0 ? {} : _temp2,
              component = _ref2.component,
              componentUrl = _ref2.componentUrl,
              options = _ref2.options,
              resolve = _ref2.resolve,
              reject = _ref2.reject;

          var router = this;
          router.componentLoader(component, componentUrl, options, function (el) {
            resolve(el);
          }, reject);
        },
        pageComponentLoader: function pageComponentLoader(_temp3) {
          var _ref3 = _temp3 === void 0 ? {} : _temp3,
              component = _ref3.component,
              componentUrl = _ref3.componentUrl,
              options = _ref3.options,
              resolve = _ref3.resolve,
              reject = _ref3.reject;

          var router = this;
          router.componentLoader(component, componentUrl, options, function (el, newOptions) {
            if (newOptions === void 0) {
              newOptions = {};
            }

            resolve(el, newOptions);
          }, reject);
        }
      }
    };

    var n = function n(t, s, r, e) {
      var u;
      s[0] = 0;

      for (var h = 1; h < s.length; h++) {
        var p = s[h++],
            a = s[h] ? (s[0] |= p ? 1 : 2, r[s[h++]]) : s[++h];
        3 === p ? e[0] = a : 4 === p ? e[1] = Object.assign(e[1] || {}, a) : 5 === p ? (e[1] = e[1] || {})[s[++h]] = a : 6 === p ? e[1][s[++h]] += a + "" : p ? (u = t.apply(a, n(t, a, r, ["", null])), e.push(u), a[0] ? s[0] |= 2 : (s[h - 2] = 0, s[h] = u)) : e.push(a);
      }

      return e;
    },
        t = new Map();

    function htm (s) {
      var r = t.get(this);
      return r || (r = new Map(), t.set(this, r)), (r = n(this, r.get(s) || (r.set(s, r = function (n) {
        for (var t, s, r = 1, e = "", u = "", h = [0], p = function p(n) {
          1 === r && (n || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h.push(0, n, e) : 3 === r && (n || e) ? (h.push(3, n, e), r = 2) : 2 === r && "..." === e && n ? h.push(4, n, 0) : 2 === r && e && !n ? h.push(5, 0, !0, e) : r >= 5 && ((e || !n && 5 === r) && (h.push(r, 0, e, s), r = 6), n && (h.push(r, n, 0, s), r = 6)), e = "";
        }, a = 0; a < n.length; a++) {
          a && (1 === r && p(), p(a));

          for (var l = 0; l < n[a].length; l++) {
            t = n[a][l], 1 === r ? "<" === t ? (p(), h = [h], r = 3) : e += t : 4 === r ? "--" === e && ">" === t ? (r = 1, e = "") : e = t + e[0] : u ? t === u ? u = "" : e += t : '"' === t || "'" === t ? u = t : ">" === t ? (p(), r = 1) : r && ("=" === t ? (r = 5, s = e, e = "") : "/" === t && (r < 5 || ">" === n[a][l + 1]) ? (p(), 3 === r && (h = h[0]), r = h, (h = h[0]).push(2, 0, r), r = 0) : " " === t || "\t" === t || "\n" === t || "\r" === t ? (p(), r = 2) : e += t), 3 === r && "!--" === e && (r = 4, h = h[0]);
          }
        }

        return p(), h;
      }(s)), r), arguments, [])).length > 1 ? r : r[0];
    }

    var ignoreChildren = [false, null, '', undefined];

    var h = function h(type, props) {
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }

      return {
        type: type,
        props: props || {},
        children: flattenArray(children.filter(function (child) {
          return ignoreChildren.indexOf(child) < 0;
        }))
      };
    };

    var $h = htm.bind(h);

    function vnode(sel, data, children, text, elm) {
      var key = data === undefined ? undefined : data.key;
      return {
        sel: sel,
        data: data,
        children: children,
        text: text,
        elm: elm,
        key: key
      };
    }

    var array = Array.isArray;
    function primitive(s) {
      return typeof s === 'string' || typeof s === 'number';
    }

    function addNS(data, children, sel) {
      data.ns = 'http://www.w3.org/2000/svg';

      if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
          var childData = children[i].data;

          if (childData !== undefined) {
            addNS(childData, children[i].children, children[i].sel);
          }
        }
      }
    }

    function h$1(sel, b, c) {
      var data = {},
          children,
          text,
          i;

      if (c !== undefined) {
        data = b;

        if (array(c)) {
          children = c;
        } else if (primitive(c)) {
          text = c;
        } else if (c && c.sel) {
          children = [c];
        }
      } else if (b !== undefined) {
        if (array(b)) {
          children = b;
        } else if (primitive(b)) {
          text = b;
        } else if (b && b.sel) {
          children = [b];
        } else {
          data = b;
        }
      }

      if (array(children)) {
        for (i = 0; i < children.length; ++i) {
          if (primitive(children[i])) children[i] = vnode(undefined, undefined, undefined, children[i], undefined);
        }
      }

      if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' && (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
      }

      return vnode(sel, data, children, text, undefined);
    }

    var customComponents = {};

    var SELF_CLOSING = 'area base br col command embed hr img input keygen link menuitem meta param source track wbr'.split(' ');
    var PROPS_ATTRS = 'hidden checked disabled readonly selected autofocus autoplay required multiple value indeterminate routeProps'.split(' ');
    var BOOLEAN_PROPS = 'hidden checked disabled readonly selected autofocus autoplay required multiple readOnly indeterminate'.split(' ');

    var getTagName = function getTagName(treeNode) {
      return typeof treeNode.type === 'function' ? treeNode.type.name || 'CustomComponent' : treeNode.type;
    };

    var toCamelCase$1 = function toCamelCase(name) {
      return name.split('-').map(function (word, index) {
        if (index === 0) return word.toLowerCase();
        return word[0].toUpperCase() + word.substr(1);
      }).join('');
    };

    var propsFromAttrs = function propsFromAttrs() {
      var context = {};

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.forEach(function (obj) {
        if (obj === void 0) {
          obj = {};
        }

        Object.keys(obj).forEach(function (key) {
          context[toCamelCase$1(key)] = obj[key];
        });
      });
      return context;
    };

    var createCustomComponent = function createCustomComponent(_ref) {
      var f7 = _ref.f7,
          treeNode = _ref.treeNode,
          vnode = _ref.vnode,
          data = _ref.data;
      var component = typeof treeNode.type === 'function' ? treeNode.type : customComponents[treeNode.type];
      f7.component.create(component, propsFromAttrs(data.attrs || {}, data.props || {}), {
        el: vnode.elm,
        children: treeNode.children
      }).then(function (c) {
        if (vnode.data && vnode.data.on && c && c.$el) {
          Object.keys(vnode.data.on).forEach(function (eventName) {
            c.$el.on(eventName, vnode.data.on[eventName]);
          });
        } // eslint-disable-next-line


        vnode.elm.__component__ = c;
      });
    };

    var updateCustomComponent = function updateCustomComponent(vnode) {
      // eslint-disable-next-line
      var component = vnode && vnode.elm && vnode.elm.__component__;
      if (!component) return;
      var newProps = propsFromAttrs(vnode.data.attrs || {}, vnode.data.props || {});
      component.children = vnode.data.treeNode.children;
      Object.assign(component.props, newProps);
      component.update();
    };

    var destroyCustomComponent = function destroyCustomComponent(vnode) {
      // eslint-disable-next-line
      var component = vnode && vnode.elm && vnode.elm.__component__;

      if (component) {
        var el = component.el,
            $el = component.$el;

        if (vnode.data && vnode.data.on && $el) {
          Object.keys(vnode.data.on).forEach(function (eventName) {
            $el.off(eventName, vnode.data.on[eventName]);
          });
        }

        if (component.destroy) component.destroy();
        if (el && el.parentNode) el.parentNode.removeChild(el);
        delete vnode.elm.__component__; // eslint-disable-line
      }
    };

    var isCustomComponent = function isCustomComponent(treeNodeType) {
      return typeof treeNodeType === 'function' || treeNodeType && treeNodeType.indexOf('-') > 0 && customComponents[treeNodeType];
    };

    function getHooks(treeNode, data, f7, initial, isRoot) {
      var hooks = {};
      var insert = [];
      var destroy = [];
      var update = [];
      var postpatch = [];
      var isFakeElement = false;
      var tagName = getTagName(treeNode);

      if (data && data.attrs && data.attrs.component) {
        // eslint-disable-next-line
        tagName = (_readOnlyError("tagName"), data.attrs.component);
        delete data.attrs.component;
        isFakeElement = true;
      }

      var isCustom = isCustomComponent(treeNode.type);

      if (isCustom) {
        insert.push(function (vnode) {
          if (vnode.sel !== tagName && !isFakeElement) return;
          createCustomComponent({
            f7: f7,
            treeNode: treeNode,
            vnode: vnode,
            data: data
          });
        });
        destroy.push(function (vnode) {
          destroyCustomComponent(vnode);
        });
        update.push(function (oldVnode, vnode) {
          updateCustomComponent(vnode);
        });
      }

      if (!isCustom) {
        if (!data || !data.attrs || !data.attrs.class) return hooks;
        var classNames = data.attrs.class;
        classNames.split(' ').forEach(function (className) {
          if (!initial) {
            insert.push.apply(insert, f7.getVnodeHooks('insert', className));
          }

          destroy.push.apply(destroy, f7.getVnodeHooks('destroy', className));
          update.push.apply(update, f7.getVnodeHooks('update', className));
          postpatch.push.apply(postpatch, f7.getVnodeHooks('postpatch', className));
        });
      }

      if (isRoot && !initial) {
        postpatch.push(function (oldVnode, vnode) {
          var vn = vnode || oldVnode;
          if (!vn) return;

          if (vn.data && vn.data.component) {
            vn.data.component.hook('onUpdated');
          }
        });
      }

      if (insert.length === 0 && destroy.length === 0 && update.length === 0 && postpatch.length === 0) {
        return hooks;
      }

      if (insert.length) {
        hooks.insert = function (vnode) {
          insert.forEach(function (f) {
            return f(vnode);
          });
        };
      }

      if (destroy.length) {
        hooks.destroy = function (vnode) {
          destroy.forEach(function (f) {
            return f(vnode);
          });
        };
      }

      if (update.length) {
        hooks.update = function (oldVnode, vnode) {
          update.forEach(function (f) {
            return f(oldVnode, vnode);
          });
        };
      }

      if (postpatch.length) {
        hooks.postpatch = function (oldVnode, vnode) {
          postpatch.forEach(function (f) {
            return f(oldVnode, vnode);
          });
        };
      }

      return hooks;
    }

    var getEventHandler = function getEventHandler(eventHandler, _temp) {
      var _ref2 = _temp === void 0 ? {} : _temp,
          stop = _ref2.stop,
          prevent = _ref2.prevent,
          once = _ref2.once;

      var fired = false;

      function handler() {
        var e = arguments.length <= 0 ? undefined : arguments[0];
        if (once && fired) return;
        if (stop) e.stopPropagation();
        if (prevent) e.preventDefault();
        fired = true;
        eventHandler.apply(void 0, arguments);
      }

      return handler;
    };

    var getData = function getData(treeNode, component, f7, initial, isRoot) {
      var data = {
        component: component,
        treeNode: treeNode
      };
      var tagName = getTagName(treeNode);
      Object.keys(treeNode.props).forEach(function (attrName) {
        var attrValue = treeNode.props[attrName];
        if (typeof attrValue === 'undefined') return;

        if (PROPS_ATTRS.indexOf(attrName) >= 0) {
          // Props
          if (!data.props) data.props = {};

          if (attrName === 'readonly') {
            // eslint-disable-next-line
            attrName = 'readOnly';
          }

          if (attrName === 'routeProps') {
            // eslint-disable-next-line
            attrName = 'f7RouteProps';
          }

          if (tagName === 'option' && attrName === 'value') {
            if (!data.attrs) data.attrs = {};
            data.attrs.value = attrValue;
          }

          if (BOOLEAN_PROPS.indexOf(attrName) >= 0) {
            // eslint-disable-next-line
            data.props[attrName] = attrValue === false ? false : true;
          } else {
            data.props[attrName] = attrValue;
          }
        } else if (attrName === 'key') {
          // Key
          data.key = attrValue;
        } else if (attrName.indexOf('@') === 0 || attrName.indexOf('on') === 0 && attrName.length > 2) {
          // Events
          if (!data.on) data.on = {};
          var eventName = attrName.indexOf('@') === 0 ? attrName.substr(1) : eventNameToColonCase(attrName.substr(2));
          var stop = false;
          var prevent = false;
          var once = false;

          if (eventName.indexOf('.') >= 0) {
            eventName.split('.').forEach(function (eventNamePart, eventNameIndex) {
              if (eventNameIndex === 0) eventName = eventNamePart;else {
                if (eventNamePart === 'stop') stop = true;
                if (eventNamePart === 'prevent') prevent = true;
                if (eventNamePart === 'once') once = true;
              }
            });
          }

          data.on[eventName] = getEventHandler(attrValue, {
            stop: stop,
            prevent: prevent,
            once: once
          });
        } else if (attrName === 'style') {
          // Style
          if (typeof attrValue !== 'string') {
            data.style = attrValue;
          } else {
            if (!data.attrs) data.attrs = {};
            data.attrs.style = attrValue;
          }
        } else {
          // Rest of attribures
          if (!data.attrs) data.attrs = {};
          data.attrs[attrName] = attrValue; // ID -> Key

          if (attrName === 'id' && !data.key && !isRoot) {
            data.key = attrValue;
          }
        }
      });
      var hooks = getHooks(treeNode, data, f7, initial, isRoot);

      hooks.prepatch = function (oldVnode, vnode) {
        if (!oldVnode || !vnode) return;

        if (oldVnode && oldVnode.data && oldVnode.data.props) {
          Object.keys(oldVnode.data.props).forEach(function (key) {
            if (BOOLEAN_PROPS.indexOf(key) < 0) return;
            if (!vnode.data) vnode.data = {};
            if (!vnode.data.props) vnode.data.props = {};

            if (oldVnode.data.props[key] === true && !(key in vnode.data.props)) {
              vnode.data.props[key] = false;
            }
          });
        }
      };

      data.hook = hooks;
      return data;
    };

    var getChildren = function getChildren(treeNode, component, f7, initial) {
      if (treeNode && treeNode.type && SELF_CLOSING.indexOf(treeNode.type) >= 0) {
        return [];
      }

      var children = [];
      var nodes = treeNode.children;

      for (var i = 0; i < nodes.length; i += 1) {
        var childNode = nodes[i];
        var child = treeNodeToVNode(childNode, component, f7, initial, false);

        if (Array.isArray(child)) {
          children.push.apply(children, child);
        } else if (child) {
          children.push(child);
        }
      }

      return children;
    };

    var getSlots = function getSlots(treeNode, component, f7, initial) {
      var slotName = treeNode.props.name || 'default';
      var slotNodes = (component.children || []).filter(function (childTreeNode) {
        var childSlotName = 'default';

        if (childTreeNode.props) {
          childSlotName = childTreeNode.props.slot || 'default';
        }

        return childSlotName === slotName;
      });

      if (slotNodes.length === 0) {
        return getChildren(treeNode, component, f7, initial);
      }

      return slotNodes.map(function (subTreeNode) {
        return treeNodeToVNode(subTreeNode, component, f7, initial);
      });
    };

    var isTreeNode = function isTreeNode(treeNode) {
      return isObject$1(treeNode) && 'props' in treeNode && 'type' in treeNode && 'children' in treeNode;
    };

    var treeNodeToVNode = function treeNodeToVNode(treeNode, component, f7, initial, isRoot) {
      if (!isTreeNode(treeNode)) {
        return String(treeNode);
      }

      if (treeNode.type === 'slot') {
        return getSlots(treeNode, component, f7, initial);
      }

      var data = getData(treeNode, component, f7, initial, isRoot);
      var children = isCustomComponent(treeNode.type) ? [] : getChildren(treeNode, component, f7, initial);
      return h$1(getTagName(treeNode), data, children);
    };

    function vdom(tree, component, initial) {
      if (tree === void 0) {
        tree = {};
      }

      return treeNodeToVNode(tree, component, component.f7, initial, true);
    }

    function createElement(tagName) {
      return document.createElement(tagName);
    }

    function createElementNS(namespaceURI, qualifiedName) {
      return document.createElementNS(namespaceURI, qualifiedName);
    }

    function createTextNode(text) {
      return document.createTextNode(text);
    }

    function createComment(text) {
      return document.createComment(text);
    }

    function insertBefore$1(parentNode, newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== parentNode) {
        if (referenceNode.__component__) referenceNode = referenceNode.__component__.el;
      }

      parentNode.insertBefore(newNode, referenceNode);
    }

    function removeChild(node, child) {
      if (!node) return;
      node.removeChild(child);
    }

    function appendChild(node, child) {
      node.appendChild(child);
    }

    function parentNode(node) {
      return node.parentNode;
    }

    function nextSibling(node) {
      return node.nextSibling;
    }

    function tagName(elm) {
      return elm.tagName;
    }

    function setTextContent(node, text) {
      node.textContent = text;
    }

    function getTextContent(node) {
      return node.textContent;
    }

    function isElement(node) {
      return node.nodeType === 1;
    }

    function isText(node) {
      return node.nodeType === 3;
    }

    function isComment(node) {
      return node.nodeType === 8;
    }

    var htmlDomApi = {
      createElement: createElement,
      createElementNS: createElementNS,
      createTextNode: createTextNode,
      createComment: createComment,
      insertBefore: insertBefore$1,
      removeChild: removeChild,
      appendChild: appendChild,
      parentNode: parentNode,
      nextSibling: nextSibling,
      tagName: tagName,
      setTextContent: setTextContent,
      getTextContent: getTextContent,
      isElement: isElement,
      isText: isText,
      isComment: isComment
    };

    function isUndef(s) {
      return s === undefined;
    }

    function isDef(s) {
      return s !== undefined;
    }

    var emptyNode = vnode('', {}, [], undefined, undefined);

    function sameVnode(vnode1, vnode2) {
      return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
    }

    function isVnode(vnode) {
      return vnode.sel !== undefined;
    }

    function createKeyToOldIdx(children, beginIdx, endIdx) {
      var i,
          map = {},
          key,
          ch;

      for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];

        if (ch != null) {
          key = ch.key;
          if (key !== undefined) map[key] = i;
        }
      }

      return map;
    }

    var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
    function init(modules, domApi) {
      var i,
          j,
          cbs = {};
      var api = domApi !== undefined ? domApi : htmlDomApi;

      for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];

        for (j = 0; j < modules.length; ++j) {
          var hook = modules[j][hooks[i]];

          if (hook !== undefined) {
            cbs[hooks[i]].push(hook);
          }
        }
      }

      function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
      }

      function createRmCb(childElm, listeners) {
        return function rmCb() {
          if (--listeners === 0) {
            var parent_1 = api.parentNode(childElm);
            api.removeChild(parent_1, childElm);
          }
        };
      }

      function createElm(vnode, insertedVnodeQueue) {
        var i,
            data = vnode.data;

        if (data !== undefined) {
          if (isDef(i = data.hook) && isDef(i = i.init)) {
            i(vnode);
            data = vnode.data;
          }
        }

        var children = vnode.children,
            sel = vnode.sel;

        if (sel === '!') {
          if (isUndef(vnode.text)) {
            vnode.text = '';
          }

          vnode.elm = api.createComment(vnode.text);
        } else if (sel !== undefined) {
          // Parse selector
          var hashIdx = sel.indexOf('#');
          var dotIdx = sel.indexOf('.', hashIdx);
          var hash = hashIdx > 0 ? hashIdx : sel.length;
          var dot = dotIdx > 0 ? dotIdx : sel.length;
          var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
          var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag) : api.createElement(tag);
          if (hash < dot) elm.setAttribute('id', sel.slice(hash + 1, dot));
          if (dotIdx > 0) elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));

          for (i = 0; i < cbs.create.length; ++i) {
            cbs.create[i](emptyNode, vnode);
          }

          if (array(children)) {
            for (i = 0; i < children.length; ++i) {
              var ch = children[i];

              if (ch != null) {
                api.appendChild(elm, createElm(ch, insertedVnodeQueue));
              }
            }
          } else if (primitive(vnode.text)) {
            api.appendChild(elm, api.createTextNode(vnode.text));
          }

          i = vnode.data.hook; // Reuse variable

          if (isDef(i)) {
            if (i.create) i.create(emptyNode, vnode);
            if (i.insert) insertedVnodeQueue.push(vnode);
          }
        } else {
          vnode.elm = api.createTextNode(vnode.text);
        }

        return vnode.elm;
      }

      function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
          var ch = vnodes[startIdx];

          if (ch != null) {
            api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
          }
        }
      }

      function invokeDestroyHook(vnode) {
        var i,
            j,
            data = vnode.data;

        if (data !== undefined) {
          if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);

          for (i = 0; i < cbs.destroy.length; ++i) {
            cbs.destroy[i](vnode);
          }

          if (vnode.children !== undefined) {
            for (j = 0; j < vnode.children.length; ++j) {
              i = vnode.children[j];

              if (i != null && typeof i !== "string") {
                invokeDestroyHook(i);
              }
            }
          }
        }
      }

      function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
          var i_1 = void 0,
              listeners = void 0,
              rm = void 0,
              ch = vnodes[startIdx];

          if (ch != null) {
            if (isDef(ch.sel)) {
              invokeDestroyHook(ch);
              listeners = cbs.remove.length + 1;
              rm = createRmCb(ch.elm, listeners);

              for (i_1 = 0; i_1 < cbs.remove.length; ++i_1) {
                cbs.remove[i_1](ch, rm);
              }

              if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                i_1(ch, rm);
              } else {
                rm();
              }
            } else {
              api.removeChild(parentElm, ch.elm);
            }
          }
        }
      }

      function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0,
            newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx;
        var idxInOld;
        var elmToMove;
        var before;

        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
          if (oldStartVnode == null) {
            oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
          } else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
          } else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
          } else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];
          } else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
          } else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
          } else if (sameVnode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
            api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
          } else if (sameVnode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
            api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
          } else {
            if (oldKeyToIdx === undefined) {
              oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
            }

            idxInOld = oldKeyToIdx[newStartVnode.key];

            if (isUndef(idxInOld)) {
              api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
              newStartVnode = newCh[++newStartIdx];
            } else {
              elmToMove = oldCh[idxInOld];

              if (elmToMove.sel !== newStartVnode.sel) {
                api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
              } else {
                patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                oldCh[idxInOld] = undefined;
                api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
              }

              newStartVnode = newCh[++newStartIdx];
            }
          }
        }

        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
          if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
          } else {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
          }
        }
      }

      function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var i, hook;

        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
          i(oldVnode, vnode);
        }

        var elm = vnode.elm = oldVnode.elm;
        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (oldVnode === vnode) return;

        if (vnode.data !== undefined) {
          for (i = 0; i < cbs.update.length; ++i) {
            cbs.update[i](oldVnode, vnode);
          }

          i = vnode.data.hook;
          if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
        }

        if (isUndef(vnode.text)) {
          if (isDef(oldCh) && isDef(ch)) {
            if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
          } else if (isDef(ch)) {
            if (isDef(oldVnode.text)) api.setTextContent(elm, '');
            addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
          } else if (isDef(oldCh)) {
            removeVnodes(elm, oldCh, 0, oldCh.length - 1);
          } else if (isDef(oldVnode.text)) {
            api.setTextContent(elm, '');
          }
        } else if (oldVnode.text !== vnode.text) {
          api.setTextContent(elm, vnode.text);
        }

        if (isDef(hook) && isDef(i = hook.postpatch)) {
          i(oldVnode, vnode);
        }
      }

      return function patch(oldVnode, vnode) {
        var i, elm, parent;
        var insertedVnodeQueue = [];

        for (i = 0; i < cbs.pre.length; ++i) {
          cbs.pre[i]();
        }

        if (!isVnode(oldVnode)) {
          oldVnode = emptyNodeAt(oldVnode);
        }

        if (sameVnode(oldVnode, vnode)) {
          patchVnode(oldVnode, vnode, insertedVnodeQueue);
        } else {
          elm = oldVnode.elm;
          parent = api.parentNode(elm);
          createElm(vnode, insertedVnodeQueue);

          if (parent !== null) {
            api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
            removeVnodes(parent, [oldVnode], 0, 0);
          }
        }

        for (i = 0; i < insertedVnodeQueue.length; ++i) {
          insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        }

        for (i = 0; i < cbs.post.length; ++i) {
          cbs.post[i]();
        }

        return vnode;
      };
    }

    var xlinkNS = 'http://www.w3.org/1999/xlink';
    var xmlNS = 'http://www.w3.org/XML/1998/namespace';
    var colonChar = 58;
    var xChar = 120;

    function updateAttrs(oldVnode, vnode) {
      var key,
          elm = vnode.elm,
          oldAttrs = oldVnode.data.attrs,
          attrs = vnode.data.attrs;
      if (!oldAttrs && !attrs) return;
      if (oldAttrs === attrs) return;
      oldAttrs = oldAttrs || {};
      attrs = attrs || {}; // update modified attributes, add new attributes

      for (key in attrs) {
        var cur = attrs[key];
        var old = oldAttrs[key];

        if (old !== cur) {
          if (cur === true) {
            elm.setAttribute(key, "");
          } else if (cur === false) {
            elm.removeAttribute(key);
          } else {
            if (key.charCodeAt(0) !== xChar) {
              elm.setAttribute(key, cur);
            } else if (key.charCodeAt(3) === colonChar) {
              // Assume xml namespace
              elm.setAttributeNS(xmlNS, key, cur);
            } else if (key.charCodeAt(5) === colonChar) {
              // Assume xlink namespace
              elm.setAttributeNS(xlinkNS, key, cur);
            } else {
              elm.setAttribute(key, cur);
            }
          }
        }
      } // remove removed attributes
      // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
      // the other option is to remove all attributes with value == undefined


      for (key in oldAttrs) {
        if (!(key in attrs)) {
          elm.removeAttribute(key);
        }
      }
    }

    var attributesModule = {
      create: updateAttrs,
      update: updateAttrs
    };

    function updateProps(oldVnode, vnode) {
      var key,
          cur,
          old,
          elm = vnode.elm,
          oldProps = oldVnode.data.props,
          props = vnode.data.props;
      if (!oldProps && !props) return;
      if (oldProps === props) return;
      oldProps = oldProps || {};
      props = props || {};

      for (key in oldProps) {
        if (!props[key]) {
          delete elm[key];
        }
      }

      for (key in props) {
        cur = props[key];
        old = oldProps[key];

        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
          elm[key] = cur;
        }
      }
    }

    var propsModule = {
      create: updateProps,
      update: updateProps
    };

    var raf = typeof window !== 'undefined' && window.requestAnimationFrame || setTimeout;

    var nextFrame$1 = function nextFrame(fn) {
      raf(function () {
        raf(fn);
      });
    };

    function setNextFrame(obj, prop, val) {
      nextFrame$1(function () {
        obj[prop] = val;
      });
    }

    function updateStyle(oldVnode, vnode) {
      var cur,
          name,
          elm = vnode.elm,
          oldStyle = oldVnode.data.style,
          style = vnode.data.style;
      if (!oldStyle && !style) return;
      if (oldStyle === style) return;
      oldStyle = oldStyle || {};
      style = style || {};
      var oldHasDel = ('delayed' in oldStyle);

      for (name in oldStyle) {
        if (!style[name]) {
          if (name[0] === '-' && name[1] === '-') {
            elm.style.removeProperty(name);
          } else {
            elm.style[name] = '';
          }
        }
      }

      for (name in style) {
        cur = style[name];

        if (name === 'delayed' && style.delayed) {
          for (var name2 in style.delayed) {
            cur = style.delayed[name2];

            if (!oldHasDel || cur !== oldStyle.delayed[name2]) {
              setNextFrame(elm.style, name2, cur);
            }
          }
        } else if (name !== 'remove' && cur !== oldStyle[name]) {
          if (name[0] === '-' && name[1] === '-') {
            elm.style.setProperty(name, cur);
          } else {
            elm.style[name] = cur;
          }
        }
      }
    }

    function applyDestroyStyle(vnode) {
      var style,
          name,
          elm = vnode.elm,
          s = vnode.data.style;
      if (!s || !(style = s.destroy)) return;

      for (name in style) {
        elm.style[name] = style[name];
      }
    }

    function applyRemoveStyle(vnode, rm) {
      var s = vnode.data.style;

      if (!s || !s.remove) {
        rm();
        return;
      }

      var name,
          elm = vnode.elm,
          i = 0,
          compStyle,
          style = s.remove,
          amount = 0,
          applied = [];

      for (name in style) {
        applied.push(name);
        elm.style[name] = style[name];
      }

      compStyle = getComputedStyle(elm);
      var props = compStyle['transition-property'].split(', ');

      for (; i < props.length; ++i) {
        if (applied.indexOf(props[i]) !== -1) amount++;
      }

      elm.addEventListener('transitionend', function (ev) {
        if (ev.target === elm) --amount;
        if (amount === 0) rm();
      });
    }

    var styleModule = {
      create: updateStyle,
      update: updateStyle,
      destroy: applyDestroyStyle,
      remove: applyRemoveStyle
    };

    function invokeHandler(handler, event, args) {
      if (typeof handler === 'function') {
        // call function handler
        handler.apply(void 0, [event].concat(args));
      }
    }

    function handleEvent(event, args, vnode) {
      var name = event.type;
      var on = vnode.data.on; // call event handler(s) if exists

      if (on && on[name]) {
        invokeHandler(on[name], event, args);
      }
    }

    function createListener() {
      return function handler(event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        handleEvent(event, args, handler.vnode);
      };
    }

    function updateEvents(oldVnode, vnode) {
      var oldOn = oldVnode.data.on;
      var oldListener = oldVnode.listener;
      var oldElm = oldVnode.elm;
      var on = vnode && vnode.data.on;
      var elm = vnode && vnode.elm; // optimization for reused immutable handlers

      if (oldOn === on) {
        return;
      } // remove existing listeners which no longer used


      if (oldOn && oldListener) {
        // if element changed or deleted we remove all existing listeners unconditionally
        if (!on) {
          Object.keys(oldOn).forEach(function (name) {
            $$1(oldElm).off(name, oldListener);
          });
        } else {
          Object.keys(oldOn).forEach(function (name) {
            if (!on[name]) {
              $$1(oldElm).off(name, oldListener);
            }
          });
        }
      } // add new listeners which has not already attached


      if (on) {
        // reuse existing listener or create new
        var listener = oldVnode.listener || createListener();
        vnode.listener = listener; // update vnode for listener

        listener.vnode = vnode; // if element changed or added we add all needed listeners unconditionally

        if (!oldOn) {
          Object.keys(on).forEach(function (name) {
            $$1(elm).on(name, listener);
          });
        } else {
          Object.keys(on).forEach(function (name) {
            if (!oldOn[name]) {
              $$1(elm).on(name, listener);
            }
          });
        }
      }
    }

    var eventListenersModule = {
      create: updateEvents,
      update: updateEvents,
      destroy: updateEvents
    };

    /* eslint import/no-named-as-default: off */
    var patch = init([attributesModule, propsModule, styleModule, eventListenersModule]);

    /* eslint no-underscore-dangle: "off" */

    var Component = /*#__PURE__*/function () {
      function Component(app, component, props, _temp) {
        var _this = this;

        if (props === void 0) {
          props = {};
        }

        var _ref = _temp === void 0 ? {} : _temp,
            el = _ref.el,
            context = _ref.context,
            children = _ref.children;

        var document = getDocument();
        merge(this, {
          f7: app,
          props: props || {},
          context: context || {},
          id: component.id || id(),
          children: children || [],
          theme: {
            ios: app.theme === 'ios',
            md: app.theme === 'md',
            aurora: app.theme === 'aurora'
          },
          style: component.style,
          __storeCallbacks: [],
          __updateQueue: [],
          __eventHandlers: [],
          __onceEventHandlers: [],
          __onBeforeMount: [],
          __onMounted: [],
          __onBeforeUpdate: [],
          __onUpdated: [],
          __onBeforeUnmount: [],
          __onUnmounted: []
        });

        var createComponent = function createComponent() {
          return component(_this.props, _this.getComponentContext(true));
        };

        var getRenderFuncion = function getRenderFuncion(componentResult) {
          return new Promise(function (resolve, reject) {
            if (typeof componentResult === 'function') {
              resolve(componentResult);
            } else if (componentResult instanceof Promise) {
              componentResult.then(function (render) {
                resolve(render);
              }).catch(function (err) {
                reject(err);
              });
            } else {
              reject(new Error('Framework7: Component render function is not a "function" type. Didn\'t you forget to "return $render"?'));
            }
          });
        };

        return new Promise(function (resolve, reject) {
          var componentResult = createComponent();
          getRenderFuncion(componentResult).then(function (render) {
            _this.renderFunction = render;

            var tree = _this.render();

            if (el) {
              _this.vnode = vdom(tree, _this, true);

              if (_this.style) {
                _this.styleEl = document.createElement('style');
                _this.styleEl.innerHTML = _this.style;
              }

              _this.el = el;
              patch(_this.el, _this.vnode);
              _this.el = _this.vnode.elm;
              _this.$el = $$1(_this.el);

              _this.attachEvents();

              _this.el.f7Component = _this;

              _this.mount();

              resolve(_this);
              return;
            } // Make Dom


            if (tree) {
              _this.vnode = vdom(tree, _this, true);
              _this.el = document.createElement(_this.vnode.sel || 'div');
              patch(_this.el, _this.vnode);
              _this.$el = $$1(_this.el);
            }

            if (_this.style) {
              _this.styleEl = document.createElement('style');
              _this.styleEl.innerHTML = _this.style;
            }

            _this.attachEvents();

            if (_this.el) {
              _this.el.f7Component = _this;
            }

            resolve(_this);
          }).catch(function (err) {
            reject(err);
          });
        });
      }

      var _proto = Component.prototype;

      _proto.on = function on(eventName, handler) {
        if (!this.__eventHandlers) return;

        this.__eventHandlers.push({
          eventName: eventName,
          handler: handler
        });
      };

      _proto.once = function once(eventName, handler) {
        if (!this.__eventHandlers) return;

        this.__onceEventHandlers.push({
          eventName: eventName,
          handler: handler
        });
      };

      _proto.getComponentStore = function getComponentStore() {
        var _this2 = this;

        var _this$f7$store = this.f7.store,
            state = _this$f7$store.state,
            getters = _this$f7$store.getters,
            dispatch = _this$f7$store.dispatch;
        var $store = {
          state: state,
          dispatch: dispatch
        };
        $store.getters = new Proxy(getters, {
          get: function get(target, prop) {
            var obj = target[prop];

            var callback = function callback() {
              _this2.update();
            };

            obj.onUpdated(callback);

            _this2.__storeCallbacks.push(callback, obj.__callback);

            return obj;
          }
        });
        return $store;
      };

      _proto.getComponentContext = function getComponentContext(includeHooks) {
        var _this3 = this;

        var ctx = {
          $f7route: this.context.f7route,
          $f7router: this.context.f7router,
          $h: $h,
          $: $$1,
          $id: this.id,
          $f7: this.f7,
          $f7ready: this.f7ready.bind(this),
          $theme: this.theme,
          $tick: this.tick.bind(this),
          $update: this.update.bind(this),
          $emit: this.emit.bind(this),
          $store: this.getComponentStore(),
          $el: {}
        };
        Object.defineProperty(ctx.$el, 'value', {
          get: function get() {
            return _this3.$el;
          }
        });
        if (includeHooks) Object.assign(ctx, {
          $on: this.on.bind(this),
          $once: this.once.bind(this),
          $onBeforeMount: function $onBeforeMount(handler) {
            return _this3.__onBeforeMount.push(handler);
          },
          $onMounted: function $onMounted(handler) {
            return _this3.__onMounted.push(handler);
          },
          $onBeforeUpdate: function $onBeforeUpdate(handler) {
            return _this3.__onBeforeUpdate.push(handler);
          },
          $onUpdated: function $onUpdated(handler) {
            return _this3.__onUpdated.push(handler);
          },
          $onBeforeUnmount: function $onBeforeUnmount(handler) {
            return _this3.__onBeforeUnmount.push(handler);
          },
          $onUnmounted: function $onUnmounted(handler) {
            return _this3.__onUnmounted.push(handler);
          }
        });
        return ctx;
      };

      _proto.render = function render() {
        return this.renderFunction(this.getComponentContext());
      };

      _proto.emit = function emit(name, data) {
        if (!this.el) return;
        this.$el.trigger(name, data);
      };

      _proto.attachEvents = function attachEvents() {
        var $el = this.$el;
        if (!this.__eventHandlers) return;

        this.__eventHandlers.forEach(function (_ref2) {
          var eventName = _ref2.eventName,
              handler = _ref2.handler;
          $el.on(eventNameToColonCase(eventName), handler);
        });

        this.__onceEventHandlers.forEach(function (_ref3) {
          var eventName = _ref3.eventName,
              handler = _ref3.handler;
          $el.once(eventNameToColonCase(eventName), handler);
        });
      };

      _proto.detachEvents = function detachEvents() {
        var $el = this.$el;
        if (!this.__eventHandlers) return;

        this.__eventHandlers.forEach(function (_ref4) {
          var eventName = _ref4.eventName,
              handler = _ref4.handler;
          $el.on(eventNameToColonCase(eventName), handler);
        });

        this.__onceEventHandlers.forEach(function (_ref5) {
          var eventName = _ref5.eventName,
              handler = _ref5.handler;
          $el.once(eventNameToColonCase(eventName), handler);
        });
      };

      _proto.startUpdateQueue = function startUpdateQueue() {
        var _this4 = this;

        var window = getWindow();
        if (this.__requestAnimationFrameId) return;

        var update = function update() {
          _this4.hook('onBeforeUpdate');

          var tree = _this4.render(); // Make Dom


          if (tree) {
            var newVNode = vdom(tree, _this4, false);
            _this4.vnode = patch(_this4.vnode, newVNode);
          }
        };

        this.__requestAnimationFrameId = window.requestAnimationFrame(function () {
          if (_this4.__updateIsPending) update();
          var resolvers = [].concat(_this4.__updateQueue);
          _this4.__updateQueue = [];
          _this4.__updateIsPending = false;
          window.cancelAnimationFrame(_this4.__requestAnimationFrameId);
          delete _this4.__requestAnimationFrameId;
          delete _this4.__updateIsPending;
          resolvers.forEach(function (resolver) {
            return resolver();
          });
          resolvers = [];
        });
      };

      _proto.tick = function tick(callback) {
        var _this5 = this;

        return new Promise(function (resolve) {
          function resolver() {
            resolve();
            if (callback) callback();
          }

          _this5.__updateQueue.push(resolver);

          _this5.startUpdateQueue();
        });
      };

      _proto.update = function update(callback) {
        var _this6 = this;

        if (this.__destroyed) return new Promise(function () {});
        return new Promise(function (resolve) {
          var resolver = function resolver() {
            resolve();
            if (callback) callback();
          };

          _this6.__updateIsPending = true;

          _this6.__updateQueue.push(resolver);

          _this6.startUpdateQueue();
        });
      };

      _proto.setState = function setState(callback) {
        return this.update(callback);
      };

      _proto.f7ready = function f7ready(callback) {
        var _this7 = this;

        if (this.f7.initialized) {
          callback(this.f7);
          return;
        }

        this.f7.once('init', function () {
          callback(_this7.f7);
        });
      };

      _proto.mount = function mount(mountMethod) {
        this.hook('onBeforeMount', this.$el);
        if (this.styleEl) $$1('head').append(this.styleEl);
        if (mountMethod) mountMethod(this.el);
        this.hook('onMounted', this.$el);
      };

      _proto.destroy = function destroy() {
        var _this8 = this;

        if (this.__destroyed) return;
        var window = getWindow();
        this.hook('onBeforeUnmount');
        if (this.styleEl) $$1(this.styleEl).remove();
        this.detachEvents();
        this.hook('onUnmounted'); // Delete component instance

        if (this.el && this.el.f7Component) {
          this.el.f7Component = null;
          delete this.el.f7Component;
        } // Patch with empty node


        if (this.vnode) {
          this.vnode = patch(this.vnode, {
            sel: this.vnode.sel,
            data: {}
          });
        } // Clear update queue


        window.cancelAnimationFrame(this.__requestAnimationFrameId);

        this.__storeCallbacks.forEach(function (callback) {
          _this8.f7.store.__removeCallback(callback);
        });

        this.__storeCallbacks = [];
        this.__updateQueue = [];
        this.__eventHandlers = [];
        this.__onceEventHandlers = [];
        this.__onBeforeMount = [];
        this.__onMounted = [];
        this.__onBeforeUpdate = [];
        this.__onUpdated = [];
        this.__onBeforeUnmount = [];
        this.__onUnmounted = []; // Delete all props

        deleteProps(this);
        this.__destroyed = true;
      };

      _proto.hook = function hook(name) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (this.__destroyed) return;
        this["__" + name].forEach(function (handler) {
          handler.apply(void 0, args);
        });
      };

      return Component;
    }();

    function parseComponent(componentString) {
      var window = getWindow();
      var document = getDocument();
      var componentId = id();
      var callbackCreateName = "f7_component_create_callback_" + componentId; // Template

      var template;
      var hasTemplate = componentString.match(/<template([ ]?)([a-z0-9-]*)>/);

      if (hasTemplate) {
        template = componentString.split(/<template[ ]?[a-z0-9-]*>/).filter(function (item, index) {
          return index > 0;
        }).join('<template>').split('</template>').filter(function (item, index, arr) {
          return index < arr.length - 1;
        }).join('</template>').replace(/{{#raw}}([ \n]*)<template/g, '{{#raw}}<template').replace(/\/template>([ \n]*){{\/raw}}/g, '/template>{{/raw}}').replace(/([ \n])<template/g, '$1{{#raw}}<template').replace(/\/template>([ \n])/g, '/template>{{/raw}}$1');
      } // Parse Styles


      var style = null;

      if (componentString.indexOf('<style>') >= 0) {
        style = componentString.split('<style>')[1].split('</style>')[0];
      }

      if (componentString.indexOf('<style scoped>') >= 0) {
        style = componentString.split('<style scoped>')[1].split('</style>')[0];
      } // Parse Script


      var scriptContent;

      if (componentString.indexOf('<script>') >= 0) {
        var scripts = componentString.split('<script>');
        scriptContent = scripts[scripts.length - 1].split('</script>')[0].trim();
      } else {
        scriptContent = 'return () => {return $render}';
      }

      if (!scriptContent || !scriptContent.trim()) scriptContent = 'return () => {return $render}'; // Parse Template

      if (template) {
        scriptContent = scriptContent.replace('$render', "function ($$ctx) {\n          var $ = $$ctx.$$;\n          var $h = $$ctx.$h;\n          var $root = $$ctx.$root;\n          var $f7 = $$ctx.$f7;\n          var $f7route = $$ctx.$f7route;\n          var $f7router = $$ctx.$f7router;\n          var $theme = $$ctx.$theme;\n          var $update = $$ctx.$update;\n          var $store = $$ctx.$store;\n\n          return $h`" + template + "`\n        }\n        ").replace(/export default/g, 'return');
      } // Execute Script


      scriptContent = "window." + callbackCreateName + " = function () {" + scriptContent + "}"; // Insert Script El

      var scriptEl = document.createElement('script');
      scriptEl.innerHTML = scriptContent;
      $$1('head').append(scriptEl);
      var component = window[callbackCreateName](); // Remove Script El

      $$1(scriptEl).remove();
      window[callbackCreateName] = null;
      delete window[callbackCreateName]; // Assign Style

      if (style) {
        component.style = style;
      } // Component ID


      component.id = componentId;
      return component;
    }

    function registerComponent(tagName, component) {
      customComponents[tagName] = component;
    }

    function unregisterComponent(tagName) {
      delete customComponents[tagName];
    }
    var ComponentModule = {
      name: 'component',
      static: {
        Component: Component,
        registerComponent: registerComponent,
        unregisterComponent: unregisterComponent
      },
      create: function create() {
        var app = this;
        app.component = {
          registerComponent: registerComponent,
          unregisterComponent: unregisterComponent,
          parse: function parse(componentString) {
            return parseComponent(componentString);
          },
          create: function create(component, props, _ref) {
            var root = _ref.root,
                el = _ref.el,
                context = _ref.context,
                children = _ref.children;
            return new Component(app, component, props, {
              root: root,
              el: el,
              context: context,
              children: children
            });
          }
        };
      }
    };

    var HistoryModule = {
      name: 'history',
      static: {
        history: History
      },
      on: {
        init: function init() {
          History.init(this);
        }
      }
    };

    var SW = {
      registrations: [],
      register: function register(path, scope) {
        var app = this;
        var window = getWindow();

        if (!('serviceWorker' in window.navigator) || !app.serviceWorker.container) {
          return new Promise(function (resolve, reject) {
            reject(new Error('Service worker is not supported'));
          });
        }

        return new Promise(function (resolve, reject) {
          app.serviceWorker.container.register(path, scope ? {
            scope: scope
          } : {}).then(function (reg) {
            SW.registrations.push(reg);
            app.emit('serviceWorkerRegisterSuccess', reg);
            resolve(reg);
          }).catch(function (error) {
            app.emit('serviceWorkerRegisterError', error);
            reject(error);
          });
        });
      },
      unregister: function unregister(registration) {
        var app = this;
        var window = getWindow();

        if (!('serviceWorker' in window.navigator) || !app.serviceWorker.container) {
          return new Promise(function (resolve, reject) {
            reject(new Error('Service worker is not supported'));
          });
        }

        var registrations;
        if (!registration) registrations = SW.registrations;else if (Array.isArray(registration)) registrations = registration;else registrations = [registration];
        return Promise.all(registrations.map(function (reg) {
          return new Promise(function (resolve, reject) {
            reg.unregister().then(function () {
              if (SW.registrations.indexOf(reg) >= 0) {
                SW.registrations.splice(SW.registrations.indexOf(reg), 1);
              }

              app.emit('serviceWorkerUnregisterSuccess', reg);
              resolve();
            }).catch(function (error) {
              app.emit('serviceWorkerUnregisterError', reg, error);
              reject(error);
            });
          });
        }));
      }
    };
    var ServiceWorkerModule = {
      name: 'sw',
      params: {
        serviceWorker: {
          path: undefined,
          scope: undefined
        }
      },
      create: function create() {
        var app = this;
        var window = getWindow();
        extend$1(app, {
          serviceWorker: {
            container: 'serviceWorker' in window.navigator ? window.navigator.serviceWorker : undefined,
            registrations: SW.registrations,
            register: SW.register.bind(app),
            unregister: SW.unregister.bind(app)
          }
        });
      },
      on: {
        init: function init() {
          var window = getWindow();
          if (!('serviceWorker' in window.navigator)) return;
          var app = this;
          if (app.device.cordova || window.Capacitor && window.Capacitor.isNative) return;
          if (!app.serviceWorker.container) return;
          var paths = app.params.serviceWorker.path;
          var scope = app.params.serviceWorker.scope;
          if (!paths || Array.isArray(paths) && !paths.length) return;
          var toRegister = Array.isArray(paths) ? paths : [paths];
          toRegister.forEach(function (path) {
            app.serviceWorker.register(path, scope);
          });
        }
      }
    };

    function createStore(storeParams) {
      if (storeParams === void 0) {
        storeParams = {};
      }

      var store = {
        __store: true
      };

      var originalState = _extends({}, storeParams.state || {});

      var actions = _extends({}, storeParams.actions || {});

      var getters = _extends({}, storeParams.getters || {});

      var state = extend$1({}, originalState);
      var propsQueue = [];
      var gettersDependencies = {};
      var gettersCallbacks = {};
      Object.keys(getters).forEach(function (key) {
        gettersDependencies[key] = [];
        gettersCallbacks[key] = [];
      });

      var addGetterDependencies = function addGetterDependencies(key, deps) {
        if (!gettersDependencies[key]) gettersDependencies[key] = [];
        deps.forEach(function (dep) {
          if (gettersDependencies[key].indexOf(dep) < 0) {
            gettersDependencies[key].push(dep);
          }
        });
      };

      var addGetterCallback = function addGetterCallback(key, callback) {
        if (!gettersCallbacks[key]) gettersCallbacks[key] = [];
        gettersCallbacks[key].push(callback);
      };

      var runGetterCallbacks = function runGetterCallbacks(stateKey, value) {
        var keys = Object.keys(gettersDependencies).filter(function (getterKey) {
          return gettersDependencies[getterKey].indexOf(stateKey) >= 0;
        });
        keys.forEach(function (getterKey) {
          if (!gettersCallbacks[getterKey] || !gettersCallbacks[getterKey].length) return;
          gettersCallbacks[getterKey].forEach(function (callback) {
            callback(value);
          });
        });
      };

      var removeGetterCallback = function removeGetterCallback(callback) {
        Object.keys(gettersCallbacks).forEach(function (key) {
          var callbacks = gettersCallbacks[key];

          if (callbacks.indexOf(callback) >= 0) {
            callbacks.splice(callbacks.indexOf(callback), 1);
          }
        });
      }; // eslint-disable-next-line


      store.__removeCallback = function (callback) {
        removeGetterCallback(callback);
      };

      var getterValue = function getterValue(key) {
        if (key === 'constructor') return;
        propsQueue = [];
        var value = getters[key]({
          state: store.state
        });
        addGetterDependencies(key, propsQueue);

        var onUpdated = function onUpdated(callback) {
          addGetterCallback(key, callback);
        };

        var obj = {
          value: value,
          onUpdated: onUpdated
        };

        var callback = function callback(v) {
          obj.value = v;
        };

        obj.__callback = callback;
        addGetterCallback(key, callback); // eslint-disable-next-line

        return obj;
      };

      store.state = new Proxy(state, {
        set: function set(target, prop, value) {
          target[prop] = value;
          runGetterCallbacks(prop, value);
          return true;
        },
        get: function get(target, prop) {
          propsQueue.push(prop);
          return target[prop];
        }
      });
      store.getters = new Proxy(getters, {
        set: function set() {
          return false;
        },
        get: function get(target, prop) {
          if (!target[prop]) {
            return undefined;
          }

          return getterValue(prop);
        }
      });

      store.dispatch = function (actionName, data) {
        return new Promise(function (resolve, reject) {
          if (!actions[actionName]) {
            reject();
            throw new Error("Framework7: Store action \"" + actionName + "\" is not found");
          }

          var result = actions[actionName]({
            state: store.state,
            dispatch: store.dispatch
          }, data);
          resolve(result);
        });
      };

      return store;
    }

    var StoreModule = {
      name: 'store',
      static: {
        createStore: createStore
      },
      proto: {
        createStore: createStore
      }
    };

    var isCapacitor = function isCapacitor() {
      var window = getWindow();
      return window.Capacitor && window.Capacitor.isNative && window.Capacitor.Plugins && window.Capacitor.Plugins.StatusBar;
    };

    var Statusbar = {
      hide: function hide() {
        var window = getWindow();
        var device = getDevice();

        if (device.cordova && window.StatusBar) {
          window.StatusBar.hide();
        }

        if (isCapacitor()) {
          window.Capacitor.Plugins.StatusBar.hide();
        }
      },
      show: function show() {
        var window = getWindow();
        var device = getDevice();

        if (device.cordova && window.StatusBar) {
          window.StatusBar.show();
        }

        if (isCapacitor()) {
          window.Capacitor.Plugins.StatusBar.show();
        }
      },
      onClick: function onClick() {
        var app = this;
        var pageContent;

        if ($$1('.popup.modal-in').length > 0) {
          // Check for opened popup
          pageContent = $$1('.popup.modal-in').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
        } else if ($$1('.panel.panel-in').length > 0) {
          // Check for opened panel
          pageContent = $$1('.panel.panel-in').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
        } else if ($$1('.views > .view.tab-active').length > 0) {
          // View in tab bar app layout
          pageContent = $$1('.views > .view.tab-active').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
        } else if ($$1('.views').length > 0) {
          pageContent = $$1('.views').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
        } else {
          pageContent = app.$el.children('.view').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
        }

        if (pageContent && pageContent.length > 0) {
          // Check for tab
          if (pageContent.hasClass('tab')) {
            pageContent = pageContent.parent('.tabs').children('.page-content.tab-active');
          }

          if (pageContent.length > 0) pageContent.scrollTop(0, 300);
        }
      },
      setTextColor: function setTextColor(color) {
        var window = getWindow();
        var device = getDevice();

        if (device.cordova && window.StatusBar) {
          if (color === 'white') {
            window.StatusBar.styleLightContent();
          } else {
            window.StatusBar.styleDefault();
          }
        }

        if (isCapacitor()) {
          if (color === 'white') {
            window.Capacitor.Plugins.StatusBar.setStyle({
              style: 'DARK'
            });
          } else {
            window.Capacitor.Plugins.StatusBar.setStyle({
              style: 'LIGHT'
            });
          }
        }
      },
      setBackgroundColor: function setBackgroundColor(color) {
        var window = getWindow();
        var device = getDevice();

        if (device.cordova && window.StatusBar) {
          window.StatusBar.backgroundColorByHexString(color);
        }

        if (isCapacitor()) {
          window.Capacitor.Plugins.StatusBar.setBackgroundColor({
            color: color
          });
        }
      },
      isVisible: function isVisible() {
        var window = getWindow();
        var device = getDevice();
        return new Promise(function (resolve) {
          if (device.cordova && window.StatusBar) {
            resolve(window.StatusBar.isVisible);
          }

          if (isCapacitor()) {
            window.Capacitor.Plugins.StatusBar.getInfo().then(function (info) {
              resolve(info.visible);
            });
          }

          resolve(false);
        });
      },
      overlaysWebView: function overlaysWebView(overlays) {
        if (overlays === void 0) {
          overlays = true;
        }

        var window = getWindow();
        var device = getDevice();

        if (device.cordova && window.StatusBar) {
          window.StatusBar.overlaysWebView(overlays);
        }

        if (isCapacitor()) {
          window.Capacitor.Plugins.StatusBar.setOverlaysWebView({
            overlay: overlays
          });
        }
      },
      init: function init() {
        var app = this;
        var window = getWindow();
        var device = getDevice();
        var params = app.params.statusbar;
        if (!params.enabled) return;
        var isCordova = device.cordova && window.StatusBar;
        var isCap = isCapacitor();

        if (isCordova || isCap) {
          if (params.scrollTopOnClick) {
            $$1(window).on('statusTap', Statusbar.onClick.bind(app));
          }

          if (device.ios) {
            if (params.iosOverlaysWebView) {
              Statusbar.overlaysWebView(true);
            } else {
              Statusbar.overlaysWebView(false);
            }

            if (params.iosTextColor === 'white') {
              Statusbar.setTextColor('white');
            } else {
              Statusbar.setTextColor('black');
            }
          }

          if (device.android) {
            if (params.androidOverlaysWebView) {
              Statusbar.overlaysWebView(true);
            } else {
              Statusbar.overlaysWebView(false);
            }

            if (params.androidTextColor === 'white') {
              Statusbar.setTextColor('white');
            } else {
              Statusbar.setTextColor('black');
            }
          }
        }

        if (params.iosBackgroundColor && device.ios) {
          Statusbar.setBackgroundColor(params.iosBackgroundColor);
        }

        if (params.androidBackgroundColor && device.android) {
          Statusbar.setBackgroundColor(params.androidBackgroundColor);
        }
      }
    };
    var Statusbar$1 = {
      name: 'statusbar',
      params: {
        statusbar: {
          enabled: true,
          scrollTopOnClick: true,
          iosOverlaysWebView: true,
          iosTextColor: 'black',
          iosBackgroundColor: null,
          androidOverlaysWebView: false,
          androidTextColor: 'black',
          androidBackgroundColor: null
        }
      },
      create: function create() {
        var app = this;
        bindMethods(app, {
          statusbar: Statusbar
        });
      },
      on: {
        init: function init() {
          var app = this;
          Statusbar.init.call(app);
        }
      }
    };

    function getCurrentView(app) {
      var $popoverView = $$1('.popover.modal-in .view');
      var $popupView = $$1('.popup.modal-in .view');
      var $panelView = $$1('.panel.panel-in .view');
      var $viewsEl = $$1('.views');
      if ($viewsEl.length === 0) $viewsEl = app.$el; // Find active view as tab

      var $viewEl = $viewsEl.children('.view');

      if ($viewEl.length === 0) {
        $viewEl = $viewsEl.children('.tabs').children('.view');
      } // Propably in tabs or split view


      if ($viewEl.length > 1) {
        if ($viewEl.hasClass('tab')) {
          // Tabs
          $viewEl = $viewsEl.children('.view.tab-active');

          if ($viewEl.length === 0) {
            $viewEl = $viewsEl.children('.tabs').children('.view.tab-active');
          }
        }
      }

      if ($popoverView.length > 0 && $popoverView[0].f7View) return $popoverView[0].f7View;
      if ($popupView.length > 0 && $popupView[0].f7View) return $popupView[0].f7View;
      if ($panelView.length > 0 && $panelView[0].f7View) return $panelView[0].f7View;

      if ($viewEl.length > 0) {
        if ($viewEl.length === 1 && $viewEl[0].f7View) return $viewEl[0].f7View;

        if ($viewEl.length > 1) {
          return app.views.main;
        }
      }

      return undefined;
    }

    var View$1 = {
      name: 'view',
      params: {
        view: {
          init: true,
          name: undefined,
          main: false,
          router: true,
          linksView: null,
          stackPages: false,
          xhrCache: true,
          xhrCacheIgnore: [],
          xhrCacheIgnoreGetParameters: false,
          xhrCacheDuration: 1000 * 60 * 10,
          // Ten minutes
          componentCache: true,
          preloadPreviousPage: true,
          allowDuplicateUrls: false,
          reloadPages: false,
          reloadDetail: false,
          masterDetailBreakpoint: 0,
          masterDetailResizable: false,
          removeElements: true,
          removeElementsWithTimeout: false,
          removeElementsTimeout: 0,
          restoreScrollTopOnBack: true,
          unloadTabContent: true,
          passRouteQueryToRequest: true,
          passRouteParamsToRequest: false,
          loadInitialPage: true,
          // Swipe Back
          iosSwipeBack: true,
          iosSwipeBackAnimateShadow: true,
          iosSwipeBackAnimateOpacity: true,
          iosSwipeBackActiveArea: 30,
          iosSwipeBackThreshold: 0,
          mdSwipeBack: false,
          mdSwipeBackAnimateShadow: true,
          mdSwipeBackAnimateOpacity: false,
          mdSwipeBackActiveArea: 30,
          mdSwipeBackThreshold: 0,
          auroraSwipeBack: false,
          auroraSwipeBackAnimateShadow: false,
          auroraSwipeBackAnimateOpacity: true,
          auroraSwipeBackActiveArea: 30,
          auroraSwipeBackThreshold: 0,
          // Push State
          browserHistory: false,
          browserHistoryRoot: undefined,
          browserHistoryAnimate: true,
          browserHistoryAnimateOnLoad: false,
          browserHistorySeparator: '#!',
          browserHistoryOnLoad: true,
          browserHistoryInitialMatch: false,
          browserHistoryStoreHistory: true,
          // Animate Pages
          animate: true,
          // iOS Dynamic Navbar
          iosDynamicNavbar: true,
          // Animate iOS Navbar Back Icon
          iosAnimateNavbarBackIcon: true,
          // Delays
          iosPageLoadDelay: 0,
          mdPageLoadDelay: 0,
          auroraPageLoadDelay: 0,
          // Routes hooks
          routesBeforeEnter: null,
          routesBeforeLeave: null
        }
      },
      static: {
        View: View
      },
      create: function create() {
        var app = this;
        extend$1(app, {
          views: extend$1([], {
            create: function create(el, params) {
              return new View(app, el, params);
            },
            get: function get(viewEl) {
              var $viewEl = $$1(viewEl);
              if ($viewEl.length && $viewEl[0].f7View) return $viewEl[0].f7View;
              return undefined;
            }
          })
        });
        Object.defineProperty(app.views, 'current', {
          enumerable: true,
          configurable: true,
          get: function get() {
            return getCurrentView(app);
          }
        }); // Alias

        app.view = app.views;
      },
      on: {
        init: function init() {
          var app = this;
          $$1('.view-init').each(function (viewEl) {
            if (viewEl.f7View) return;
            var viewParams = $$1(viewEl).dataset();
            app.views.create(viewEl, viewParams);
          });
        },
        'modalOpen panelOpen': function onOpen(instance) {
          var app = this;
          instance.$el.find('.view-init').each(function (viewEl) {
            if (viewEl.f7View) return;
            var viewParams = $$1(viewEl).dataset();
            app.views.create(viewEl, viewParams);
          });
        },
        'modalBeforeDestroy panelBeforeDestroy': function onClose(instance) {
          if (!instance || !instance.$el) return;
          instance.$el.find('.view-init').each(function (viewEl) {
            var view = viewEl.f7View;
            if (!view) return;
            view.destroy();
          });
        }
      },
      vnode: {
        'view-init': {
          insert: function insert(vnode) {
            var app = this;
            var viewEl = vnode.elm;
            if (viewEl.f7View) return;
            var viewParams = $$1(viewEl).dataset();
            app.views.create(viewEl, viewParams);
          },
          destroy: function destroy(vnode) {
            var viewEl = vnode.elm;
            var view = viewEl.f7View;
            if (!view) return;
            view.destroy();
          }
        }
      }
    };

    var Navbar = {
      size: function size(el) {
        var app = this;
        var $el = $$1(el);

        if ($el.hasClass('navbars')) {
          $el = $el.children('.navbar').each(function (navbarEl) {
            app.navbar.size(navbarEl);
          });
          return;
        }

        var $innerEl = $el.children('.navbar-inner');
        if (!$innerEl.length) return;
        var needCenterTitle = $innerEl.hasClass('navbar-inner-centered-title') || app.params.navbar[app.theme + "CenterTitle"];
        var needLeftTitle = app.theme === 'ios' && !app.params.navbar[app.theme + "CenterTitle"];
        if (!needCenterTitle && !needLeftTitle) return;

        if ($el.hasClass('stacked') || $el.parents('.stacked').length > 0 || $el.parents('.tab:not(.tab-active)').length > 0 || $el.parents('.popup:not(.modal-in)').length > 0) {
          return;
        }

        if (app.theme !== 'ios' && app.params.navbar[app.theme + "CenterTitle"]) {
          $innerEl.addClass('navbar-inner-centered-title');
        }

        if (app.theme === 'ios' && !app.params.navbar.iosCenterTitle) {
          $innerEl.addClass('navbar-inner-left-title');
        }

        var $viewEl = $el.parents('.view').eq(0);
        var left = app.rtl ? $innerEl.children('.right') : $innerEl.children('.left');
        var right = app.rtl ? $innerEl.children('.left') : $innerEl.children('.right');
        var title = $innerEl.children('.title');
        var subnavbar = $innerEl.children('.subnavbar');
        var noLeft = left.length === 0;
        var noRight = right.length === 0;
        var leftWidth = noLeft ? 0 : left.outerWidth(true);
        var rightWidth = noRight ? 0 : right.outerWidth(true);
        var titleWidth = title.outerWidth(true);
        var navbarStyles = $innerEl.styles();
        var navbarWidth = $innerEl[0].offsetWidth;
        var navbarInnerWidth = navbarWidth - parseInt(navbarStyles.paddingLeft, 10) - parseInt(navbarStyles.paddingRight, 10);
        var isPrevious = $el.hasClass('navbar-previous');
        var sliding = $innerEl.hasClass('sliding');
        var router;
        var dynamicNavbar;

        if ($viewEl.length > 0 && $viewEl[0].f7View) {
          router = $viewEl[0].f7View.router;
          dynamicNavbar = router && router.dynamicNavbar;
        }

        var currLeft;
        var diff;

        if (noRight) {
          currLeft = navbarInnerWidth - titleWidth;
        }

        if (noLeft) {
          currLeft = 0;
        }

        if (!noLeft && !noRight) {
          currLeft = (navbarInnerWidth - rightWidth - titleWidth + leftWidth) / 2;
        }

        var requiredLeft = (navbarInnerWidth - titleWidth) / 2;

        if (navbarInnerWidth - leftWidth - rightWidth > titleWidth) {
          if (requiredLeft < leftWidth) {
            requiredLeft = leftWidth;
          }

          if (requiredLeft + titleWidth > navbarInnerWidth - rightWidth) {
            requiredLeft = navbarInnerWidth - rightWidth - titleWidth;
          }

          diff = requiredLeft - currLeft;
        } else {
          diff = 0;
        } // RTL inverter


        var inverter = app.rtl ? -1 : 1;

        if (dynamicNavbar && app.theme === 'ios') {
          if (title.hasClass('sliding') || title.length > 0 && sliding) {
            var titleLeftOffset = -(currLeft + diff) * inverter;
            var titleRightOffset = (navbarInnerWidth - currLeft - diff - titleWidth) * inverter;

            if (isPrevious) {
              if (router && router.params.iosAnimateNavbarBackIcon) {
                var activeNavbarBackLink = $el.parent().find('.navbar-current').children('.left.sliding').find('.back .icon ~ span');

                if (activeNavbarBackLink.length > 0) {
                  titleLeftOffset += activeNavbarBackLink[0].offsetLeft;
                }
              }
            }

            title[0].f7NavbarLeftOffset = titleLeftOffset;
            title[0].f7NavbarRightOffset = titleRightOffset;
          }

          if (!noLeft && (left.hasClass('sliding') || sliding)) {
            if (app.rtl) {
              left[0].f7NavbarLeftOffset = -(navbarInnerWidth - left[0].offsetWidth) / 2 * inverter;
              left[0].f7NavbarRightOffset = leftWidth * inverter;
            } else {
              left[0].f7NavbarLeftOffset = -leftWidth;
              left[0].f7NavbarRightOffset = (navbarInnerWidth - left[0].offsetWidth) / 2;

              if (router && router.params.iosAnimateNavbarBackIcon && left.find('.back .icon').length > 0) {
                if (left.find('.back .icon ~ span').length) {
                  var leftOffset = left[0].f7NavbarLeftOffset;
                  var rightOffset = left[0].f7NavbarRightOffset;
                  left[0].f7NavbarLeftOffset = 0;
                  left[0].f7NavbarRightOffset = 0;
                  left.find('.back .icon ~ span')[0].f7NavbarLeftOffset = leftOffset;
                  left.find('.back .icon ~ span')[0].f7NavbarRightOffset = rightOffset - left.find('.back .icon')[0].offsetWidth;
                }
              }
            }
          }

          if (!noRight && (right.hasClass('sliding') || sliding)) {
            if (app.rtl) {
              right[0].f7NavbarLeftOffset = -rightWidth * inverter;
              right[0].f7NavbarRightOffset = (navbarInnerWidth - right[0].offsetWidth) / 2 * inverter;
            } else {
              right[0].f7NavbarLeftOffset = -(navbarInnerWidth - right[0].offsetWidth) / 2;
              right[0].f7NavbarRightOffset = rightWidth;
            }
          }

          if (subnavbar.length && (subnavbar.hasClass('sliding') || sliding)) {
            subnavbar[0].f7NavbarLeftOffset = app.rtl ? subnavbar[0].offsetWidth : -subnavbar[0].offsetWidth;
            subnavbar[0].f7NavbarRightOffset = -subnavbar[0].f7NavbarLeftOffset;
          }
        } // Center title


        if (needCenterTitle) {
          var titleLeft = diff;
          if (app.rtl && noLeft && noRight && title.length > 0) titleLeft = -titleLeft;
          title.css({
            left: titleLeft + "px"
          });
        }
      },
      hide: function hide(el, animate, hideStatusbar, hideOnlyCurrent) {
        if (animate === void 0) {
          animate = true;
        }

        if (hideStatusbar === void 0) {
          hideStatusbar = false;
        }

        if (hideOnlyCurrent === void 0) {
          hideOnlyCurrent = false;
        }

        var app = this;
        var $el = $$1(el);
        var isDynamic = $el.hasClass('navbar') && $el.parent('.navbars').length && !hideOnlyCurrent;
        if (isDynamic) $el = $el.parents('.navbars');
        if (!$el.length) return;
        if ($el.hasClass('navbar-hidden')) return;
        var className = "navbar-hidden" + (animate ? ' navbar-transitioning' : '');
        var currentIsLarge = isDynamic ? $el.find('.navbar-current .title-large').length : $el.find('.title-large').length;

        if (currentIsLarge) {
          className += ' navbar-large-hidden';
        }

        if (hideStatusbar) {
          className += ' navbar-hidden-statusbar';
        }

        $el.transitionEnd(function () {
          $el.removeClass('navbar-transitioning');
        });
        $el.addClass(className);

        if (isDynamic) {
          $el.children('.navbar').each(function (subEl) {
            $$1(subEl).trigger('navbar:hide');
            app.emit('navbarHide', subEl);
          });
        } else {
          $el.trigger('navbar:hide');
          app.emit('navbarHide', $el[0]);
        }
      },
      show: function show(el, animate, hideOnlyCurrent) {
        if (el === void 0) {
          el = '.navbar-hidden';
        }

        if (animate === void 0) {
          animate = true;
        }

        if (hideOnlyCurrent === void 0) {
          hideOnlyCurrent = false;
        }

        var app = this;
        var $el = $$1(el);
        var isDynamic = $el.hasClass('navbar') && $el.parent('.navbars').length && !hideOnlyCurrent;
        if (isDynamic) $el = $el.parents('.navbars');
        if (!$el.length) return;
        if (!$el.hasClass('navbar-hidden')) return;

        if (animate) {
          $el.addClass('navbar-transitioning');
          $el.transitionEnd(function () {
            $el.removeClass('navbar-transitioning');
          });
        }

        $el.removeClass('navbar-hidden navbar-large-hidden navbar-hidden-statusbar');

        if (isDynamic) {
          $el.children('.navbar').each(function (subEl) {
            $$1(subEl).trigger('navbar:show');
            app.emit('navbarShow', subEl);
          });
        } else {
          $el.trigger('navbar:show');
          app.emit('navbarShow', $el[0]);
        }
      },
      getElByPage: function getElByPage(page) {
        var $pageEl;
        var $navbarEl;
        var pageData;

        if (page.$navbarEl || page.$el) {
          pageData = page;
          $pageEl = page.$el;
        } else {
          $pageEl = $$1(page);
          if ($pageEl.length > 0) pageData = $pageEl[0].f7Page;
        }

        if (pageData && pageData.$navbarEl && pageData.$navbarEl.length > 0) {
          $navbarEl = pageData.$navbarEl;
        } else if ($pageEl) {
          $navbarEl = $pageEl.children('.navbar');
        }

        if (!$navbarEl || $navbarEl && $navbarEl.length === 0) return undefined;
        return $navbarEl[0];
      },
      getPageByEl: function getPageByEl(navbarEl) {
        var $navbarEl = $$1(navbarEl);

        if ($navbarEl.parents('.page').length) {
          return $navbarEl.parents('.page')[0];
        }

        var pageEl;
        $navbarEl.parents('.view').find('.page').each(function (el) {
          if (el && el.f7Page && el.f7Page.navbarEl && $navbarEl[0] === el.f7Page.navbarEl) {
            pageEl = el;
          }
        });
        return pageEl;
      },
      collapseLargeTitle: function collapseLargeTitle(navbarEl) {
        var app = this;
        var $navbarEl = $$1(navbarEl);

        if ($navbarEl.hasClass('navbars')) {
          $navbarEl = $navbarEl.find('.navbar');

          if ($navbarEl.length > 1) {
            $navbarEl = $$1(navbarEl).find('.navbar-large.navbar-current');
          }

          if ($navbarEl.length > 1 || !$navbarEl.length) {
            return;
          }
        }

        var $pageEl = $$1(app.navbar.getPageByEl($navbarEl));
        $navbarEl.addClass('navbar-large-collapsed');
        $pageEl.eq(0).addClass('page-with-navbar-large-collapsed').trigger('page:navbarlargecollapsed');
        app.emit('pageNavbarLargeCollapsed', $pageEl[0]);
        $navbarEl.trigger('navbar:collapse');
        app.emit('navbarCollapse', $navbarEl[0]);
      },
      expandLargeTitle: function expandLargeTitle(navbarEl) {
        var app = this;
        var $navbarEl = $$1(navbarEl);

        if ($navbarEl.hasClass('navbars')) {
          $navbarEl = $navbarEl.find('.navbar-large');

          if ($navbarEl.length > 1) {
            $navbarEl = $$1(navbarEl).find('.navbar-large.navbar-current');
          }

          if ($navbarEl.length > 1 || !$navbarEl.length) {
            return;
          }
        }

        var $pageEl = $$1(app.navbar.getPageByEl($navbarEl));
        $navbarEl.removeClass('navbar-large-collapsed');
        $pageEl.eq(0).removeClass('page-with-navbar-large-collapsed').trigger('page:navbarlargeexpanded');
        app.emit('pageNavbarLargeExpanded', $pageEl[0]);
        $navbarEl.trigger('navbar:expand');
        app.emit('navbarExpand', $navbarEl[0]);
      },
      toggleLargeTitle: function toggleLargeTitle(navbarEl) {
        var app = this;
        var $navbarEl = $$1(navbarEl);

        if ($navbarEl.hasClass('navbars')) {
          $navbarEl = $navbarEl.find('.navbar-large');

          if ($navbarEl.length > 1) {
            $navbarEl = $$1(navbarEl).find('.navbar-large.navbar-current');
          }

          if ($navbarEl.length > 1 || !$navbarEl.length) {
            return;
          }
        }

        if ($navbarEl.hasClass('navbar-large-collapsed')) {
          app.navbar.expandLargeTitle($navbarEl);
        } else {
          app.navbar.collapseLargeTitle($navbarEl);
        }
      },
      initNavbarOnScroll: function initNavbarOnScroll(pageEl, navbarEl, needHide, needCollapse, needTransparent) {
        var app = this;
        var support = getSupport();
        var $pageEl = $$1(pageEl);
        var $navbarEl = $$1(navbarEl);
        var $titleLargeEl = $navbarEl.find('.title-large');
        var isLarge = $titleLargeEl.length || $navbarEl.hasClass('.navbar-large');
        var navbarHideHeight = 44;
        var snapPageScrollToLargeTitle = app.params.navbar.snapPageScrollToLargeTitle;
        var snapPageScrollToTransparentNavbar = app.params.navbar.snapPageScrollToTransparentNavbar;
        var previousScrollTop;
        var currentScrollTop;
        var scrollHeight;
        var offsetHeight;
        var reachEnd;
        var action;
        var navbarHidden;
        var navbarCollapsed;
        var navbarTitleLargeHeight;
        var navbarOffsetHeight;

        if (needCollapse || needHide && isLarge) {
          navbarTitleLargeHeight = $navbarEl.css('--f7-navbar-large-title-height');

          if (navbarTitleLargeHeight && navbarTitleLargeHeight.indexOf('px') >= 0) {
            navbarTitleLargeHeight = parseInt(navbarTitleLargeHeight, 10);

            if (Number.isNaN(navbarTitleLargeHeight) && $titleLargeEl.length) {
              navbarTitleLargeHeight = $titleLargeEl[0].offsetHeight;
            } else if (Number.isNaN(navbarTitleLargeHeight)) {
              if (app.theme === 'ios') navbarTitleLargeHeight = 52;else if (app.theme === 'md') navbarTitleLargeHeight = 48;else if (app.theme === 'aurora') navbarTitleLargeHeight = 38;
            }
          } else if ($titleLargeEl.length) {
            navbarTitleLargeHeight = $titleLargeEl[0].offsetHeight;
          } else {
            // eslint-disable-next-line
            if (app.theme === 'ios') navbarTitleLargeHeight = 52;else if (app.theme === 'md') navbarTitleLargeHeight = 48;else if (app.theme === 'aurora') navbarTitleLargeHeight = 38;
          }
        }

        if (needHide && isLarge) {
          navbarHideHeight += navbarTitleLargeHeight;
        }

        var scrollChanged;
        var scrollContent;
        var scrollTimeoutId;
        var touchEndTimeoutId;
        var touchSnapTimeout = 70;
        var desktopSnapTimeout = 300;

        function snapLargeNavbar() {
          var inSearchbarExpanded = $navbarEl.hasClass('with-searchbar-expandable-enabled');
          if (inSearchbarExpanded) return;
          if (!scrollContent || currentScrollTop < 0) return;

          if (currentScrollTop >= navbarTitleLargeHeight / 2 && currentScrollTop < navbarTitleLargeHeight) {
            $$1(scrollContent).scrollTop(navbarTitleLargeHeight, 100);
          } else if (currentScrollTop < navbarTitleLargeHeight) {
            $$1(scrollContent).scrollTop(0, 200);
          }
        }

        function snapTransparentNavbar() {
          var inSearchbarExpanded = $navbarEl.hasClass('with-searchbar-expandable-enabled');
          if (inSearchbarExpanded) return;
          if (!scrollContent || currentScrollTop < 0) return;

          if (currentScrollTop >= navbarOffsetHeight / 2 && currentScrollTop < navbarOffsetHeight) {
            $$1(scrollContent).scrollTop(navbarOffsetHeight, 100);
          } else if (currentScrollTop < navbarOffsetHeight) {
            $$1(scrollContent).scrollTop(0, 200);
          }
        }

        function handleNavbarTransparent() {
          var isHidden = $navbarEl.hasClass('navbar-hidden') || $navbarEl.parent('.navbars').hasClass('navbar-hidden');
          var inSearchbarExpanded = $navbarEl.hasClass('with-searchbar-expandable-enabled');
          if (inSearchbarExpanded || isHidden) return;

          if (!navbarOffsetHeight) {
            navbarOffsetHeight = navbarEl.offsetHeight;
          }

          var opacity = currentScrollTop / navbarOffsetHeight;
          var notTransparent = $navbarEl.hasClass('navbar-transparent-visible');
          opacity = Math.max(Math.min(opacity, 1), 0);

          if (notTransparent && opacity === 1 || !notTransparent && opacity === 0) {
            $navbarEl.find('.navbar-bg, .title').css('opacity', '');
            return;
          }

          if (notTransparent && opacity === 0) {
            $navbarEl.trigger('navbar:transparenthide');
            app.emit('navbarTransparentHide', $navbarEl[0]);
            $navbarEl.removeClass('navbar-transparent-visible');
            $navbarEl.find('.navbar-bg, .title').css('opacity', '');
            return;
          }

          if (!notTransparent && opacity === 1) {
            $navbarEl.trigger('navbar:transparentshow');
            app.emit('navbarTransparentShow', $navbarEl[0]);
            $navbarEl.addClass('navbar-transparent-visible');
            $navbarEl.find('.navbar-bg, .title').css('opacity', '');
            return;
          }

          $navbarEl.find('.navbar-bg, .title').css('opacity', opacity);

          if (snapPageScrollToTransparentNavbar) {
            if (!support.touch) {
              clearTimeout(scrollTimeoutId);
              scrollTimeoutId = setTimeout(function () {
                snapTransparentNavbar();
              }, desktopSnapTimeout);
            } else if (touchEndTimeoutId) {
              clearTimeout(touchEndTimeoutId);
              touchEndTimeoutId = null;
              touchEndTimeoutId = setTimeout(function () {
                snapTransparentNavbar();
                clearTimeout(touchEndTimeoutId);
                touchEndTimeoutId = null;
              }, touchSnapTimeout);
            }
          }
        }

        var previousCollapseProgress = null;
        var collapseProgress = null;

        function handleLargeNavbarCollapse() {
          var isHidden = $navbarEl.hasClass('navbar-hidden') || $navbarEl.parent('.navbars').hasClass('navbar-hidden');
          if (isHidden) return;
          var isLargeTransparent = $navbarEl.hasClass('navbar-large-transparent') || $navbarEl.hasClass('navbar-large') && $navbarEl.hasClass('navbar-transparent');
          previousCollapseProgress = collapseProgress;
          collapseProgress = Math.min(Math.max(currentScrollTop / navbarTitleLargeHeight, 0), 1);
          var previousCollapseWasInMiddle = previousCollapseProgress > 0 && previousCollapseProgress < 1;
          var inSearchbarExpanded = $navbarEl.hasClass('with-searchbar-expandable-enabled');
          if (inSearchbarExpanded) return;
          navbarCollapsed = $navbarEl.hasClass('navbar-large-collapsed');

          if (collapseProgress === 0 && navbarCollapsed) {
            app.navbar.expandLargeTitle($navbarEl[0]);
          } else if (collapseProgress === 1 && !navbarCollapsed) {
            app.navbar.collapseLargeTitle($navbarEl[0]);
          }

          if (collapseProgress === 0 && navbarCollapsed || collapseProgress === 0 && previousCollapseWasInMiddle || collapseProgress === 1 && !navbarCollapsed || collapseProgress === 1 && previousCollapseWasInMiddle) {
            if (app.theme === 'md') {
              $navbarEl.find('.navbar-inner').css('overflow', '');
            }

            $navbarEl.find('.title').css('opacity', '');
            $navbarEl.find('.title-large-text, .subnavbar').css('transform', '');

            if (isLargeTransparent) {
              $navbarEl.find('.navbar-bg').css('opacity', '');
            } else {
              $navbarEl.find('.navbar-bg').css('transform', '');
            }
          } else if (collapseProgress > 0 && collapseProgress < 1) {
            if (app.theme === 'md') {
              $navbarEl.find('.navbar-inner').css('overflow', 'visible');
            }

            $navbarEl.find('.title').css('opacity', collapseProgress);
            $navbarEl.find('.title-large-text, .subnavbar').css('transform', "translate3d(0px, " + -1 * collapseProgress * navbarTitleLargeHeight + "px, 0)");

            if (isLargeTransparent) {
              $navbarEl.find('.navbar-bg').css('opacity', collapseProgress);
            } else {
              $navbarEl.find('.navbar-bg').css('transform', "translate3d(0px, " + -1 * collapseProgress * navbarTitleLargeHeight + "px, 0)");
            }
          }

          if (snapPageScrollToLargeTitle) {
            if (!support.touch) {
              clearTimeout(scrollTimeoutId);
              scrollTimeoutId = setTimeout(function () {
                snapLargeNavbar();
              }, desktopSnapTimeout);
            } else if (touchEndTimeoutId) {
              clearTimeout(touchEndTimeoutId);
              touchEndTimeoutId = null;
              touchEndTimeoutId = setTimeout(function () {
                snapLargeNavbar();
                clearTimeout(touchEndTimeoutId);
                touchEndTimeoutId = null;
              }, touchSnapTimeout);
            }
          }
        }

        function handleTitleHideShow() {
          if ($pageEl.hasClass('page-with-card-opened')) return;
          scrollHeight = scrollContent.scrollHeight;
          offsetHeight = scrollContent.offsetHeight;
          reachEnd = currentScrollTop + offsetHeight >= scrollHeight;
          navbarHidden = $navbarEl.hasClass('navbar-hidden') || $navbarEl.parent('.navbars').hasClass('navbar-hidden');

          if (reachEnd) {
            if (app.params.navbar.showOnPageScrollEnd) {
              action = 'show';
            }
          } else if (previousScrollTop > currentScrollTop) {
            if (app.params.navbar.showOnPageScrollTop || currentScrollTop <= navbarHideHeight) {
              action = 'show';
            } else {
              action = 'hide';
            }
          } else if (currentScrollTop > navbarHideHeight) {
            action = 'hide';
          } else {
            action = 'show';
          }

          if (action === 'show' && navbarHidden) {
            app.navbar.show($navbarEl, true, true);
            navbarHidden = false;
          } else if (action === 'hide' && !navbarHidden) {
            app.navbar.hide($navbarEl, true, false, true);
            navbarHidden = true;
          }

          previousScrollTop = currentScrollTop;
        }

        function handleScroll(e) {
          scrollContent = this;

          if (e && e.target && e.target !== scrollContent) {
            return;
          }

          currentScrollTop = scrollContent.scrollTop;
          scrollChanged = currentScrollTop;

          if (needCollapse) {
            handleLargeNavbarCollapse();
          } else if (needTransparent) {
            handleNavbarTransparent();
          }

          if ($pageEl.hasClass('page-previous')) return;

          if (needHide) {
            handleTitleHideShow();
          }
        }

        function handeTouchStart() {
          scrollChanged = false;
        }

        function handleTouchEnd() {
          clearTimeout(touchEndTimeoutId);
          touchEndTimeoutId = null;
          touchEndTimeoutId = setTimeout(function () {
            if (scrollChanged !== false) {
              if (needTransparent && !needCollapse) {
                snapTransparentNavbar();
              } else {
                snapLargeNavbar();
              }

              clearTimeout(touchEndTimeoutId);
              touchEndTimeoutId = null;
            }
          }, touchSnapTimeout);
        }

        $pageEl.on('scroll', '.page-content', handleScroll, true);

        if (support.touch && (needCollapse && snapPageScrollToLargeTitle || needTransparent && snapPageScrollToTransparentNavbar)) {
          app.on('touchstart:passive', handeTouchStart);
          app.on('touchend:passive', handleTouchEnd);
        }

        if (needCollapse) {
          $pageEl.find('.page-content').each(function (pageContentEl) {
            if (pageContentEl.scrollTop > 0) handleScroll.call(pageContentEl);
          });
        } else if (needTransparent) {
          $pageEl.find('.page-content').each(function (pageContentEl) {
            if (pageContentEl.scrollTop > 0) handleScroll.call(pageContentEl);
          });
        }

        $pageEl[0].f7DetachNavbarScrollHandlers = function f7DetachNavbarScrollHandlers() {
          delete $pageEl[0].f7DetachNavbarScrollHandlers;
          $pageEl.off('scroll', '.page-content', handleScroll, true);

          if (support.touch && (needCollapse && snapPageScrollToLargeTitle || needTransparent && snapPageScrollToTransparentNavbar)) {
            app.off('touchstart:passive', handeTouchStart);
            app.off('touchend:passive', handleTouchEnd);
          }
        };
      }
    };
    var Navbar$1 = {
      name: 'navbar',
      create: function create() {
        var app = this;
        bindMethods(app, {
          navbar: Navbar
        });
      },
      params: {
        navbar: {
          scrollTopOnTitleClick: true,
          iosCenterTitle: true,
          mdCenterTitle: false,
          auroraCenterTitle: true,
          hideOnPageScroll: false,
          showOnPageScrollEnd: true,
          showOnPageScrollTop: true,
          collapseLargeTitleOnScroll: true,
          snapPageScrollToLargeTitle: true,
          snapPageScrollToTransparentNavbar: true
        }
      },
      on: {
        'panelBreakpoint panelCollapsedBreakpoint panelResize viewResize resize viewMasterDetailBreakpoint': function onPanelResize() {
          var app = this;
          $$1('.navbar').each(function (navbarEl) {
            app.navbar.size(navbarEl);
          });
        },
        pageBeforeRemove: function pageBeforeRemove(page) {
          if (page.$el[0].f7DetachNavbarScrollHandlers) {
            page.$el[0].f7DetachNavbarScrollHandlers();
          }
        },
        pageBeforeIn: function pageBeforeIn(page) {
          var app = this;
          if (app.theme !== 'ios') return;
          var $navbarsEl;
          var view = page.$el.parents('.view')[0].f7View;
          var navbarEl = app.navbar.getElByPage(page);

          if (!navbarEl) {
            $navbarsEl = page.$el.parents('.view').children('.navbars');
          } else {
            $navbarsEl = $$1(navbarEl).parents('.navbars');
          }

          if (page.$el.hasClass('no-navbar') || view.router.dynamicNavbar && !navbarEl) {
            var animate = !!(page.pageFrom && page.router.history.length > 0);
            app.navbar.hide($navbarsEl, animate);
          } else {
            app.navbar.show($navbarsEl);
          }
        },
        pageReinit: function pageReinit(page) {
          var app = this;
          var $navbarEl = $$1(app.navbar.getElByPage(page));
          if (!$navbarEl || $navbarEl.length === 0) return;
          app.navbar.size($navbarEl);
        },
        pageInit: function pageInit(page) {
          var app = this;
          var $navbarEl = $$1(app.navbar.getElByPage(page));
          if (!$navbarEl || $navbarEl.length === 0) return; // Size

          app.navbar.size($navbarEl); // Need Collapse On Scroll

          var needCollapseOnScrollHandler;

          if ($navbarEl.find('.title-large').length > 0) {
            $navbarEl.addClass('navbar-large');
          }

          if ($navbarEl.hasClass('navbar-large')) {
            if (app.params.navbar.collapseLargeTitleOnScroll) needCollapseOnScrollHandler = true;
            page.$el.addClass('page-with-navbar-large');
          } // Need transparent on scroll


          var needTransparentOnScroll;

          if (!needCollapseOnScrollHandler && $navbarEl.hasClass('navbar-transparent')) {
            needTransparentOnScroll = true;
          } // Need Hide On Scroll


          var needHideOnScrollHandler;

          if (app.params.navbar.hideOnPageScroll || page.$el.find('.hide-navbar-on-scroll').length || page.$el.hasClass('hide-navbar-on-scroll') || page.$el.find('.hide-bars-on-scroll').length || page.$el.hasClass('hide-bars-on-scroll')) {
            if (page.$el.find('.keep-navbar-on-scroll').length || page.$el.hasClass('keep-navbar-on-scroll') || page.$el.find('.keep-bars-on-scroll').length || page.$el.hasClass('keep-bars-on-scroll')) {
              needHideOnScrollHandler = false;
            } else {
              needHideOnScrollHandler = true;
            }
          }

          if (needCollapseOnScrollHandler || needHideOnScrollHandler || needTransparentOnScroll) {
            app.navbar.initNavbarOnScroll(page.el, $navbarEl[0], needHideOnScrollHandler, needCollapseOnScrollHandler, needTransparentOnScroll);
          }
        },
        'panelOpen panelSwipeOpen modalOpen': function onPanelModalOpen(instance) {
          var app = this;
          instance.$el.find('.navbar:not(.navbar-previous):not(.stacked)').each(function (navbarEl) {
            app.navbar.size(navbarEl);
          });
        },
        tabShow: function tabShow(tabEl) {
          var app = this;
          $$1(tabEl).find('.navbar:not(.navbar-previous):not(.stacked)').each(function (navbarEl) {
            app.navbar.size(navbarEl);
          });
        }
      },
      clicks: {
        '.navbar .title': function onTitleClick($clickedEl) {
          var app = this;
          if (!app.params.navbar.scrollTopOnTitleClick) return;

          if ($clickedEl.closest('a').length > 0) {
            return;
          }

          var $pageContentEl; // Find active page

          var $navbarEl = $clickedEl.parents('.navbar');
          var $navbarsEl = $navbarEl.parents('.navbars'); // Static Layout

          $pageContentEl = $navbarEl.parents('.page-content');

          if ($pageContentEl.length === 0) {
            // Fixed Layout
            if ($navbarEl.parents('.page').length > 0) {
              $pageContentEl = $navbarEl.parents('.page').find('.page-content');
            } // Through Layout iOS


            if ($pageContentEl.length === 0 && $navbarsEl.length) {
              if ($navbarsEl.nextAll('.page-current:not(.stacked)').length > 0) {
                $pageContentEl = $navbarsEl.nextAll('.page-current:not(.stacked)').find('.page-content');
              }
            } // Through Layout


            if ($pageContentEl.length === 0) {
              if ($navbarEl.nextAll('.page-current:not(.stacked)').length > 0) {
                $pageContentEl = $navbarEl.nextAll('.page-current:not(.stacked)').find('.page-content');
              }
            }
          }

          if ($pageContentEl && $pageContentEl.length > 0) {
            // Check for tab
            if ($pageContentEl.hasClass('tab')) {
              $pageContentEl = $pageContentEl.parent('.tabs').children('.page-content.tab-active');
            }

            if ($pageContentEl.length > 0) $pageContentEl.scrollTop(0, 300);
          }
        }
      },
      vnode: {
        navbar: {
          postpatch: function postpatch(vnode) {
            var app = this;
            app.navbar.size(vnode.elm);
          }
        }
      }
    };

    var Toolbar = {
      setHighlight: function setHighlight(tabbarEl) {
        var app = this;
        if (app.theme === 'ios') return;
        var $tabbarEl = $$1(tabbarEl);
        if ($tabbarEl.length === 0 || !($tabbarEl.hasClass('tabbar') || $tabbarEl.hasClass('tabbar-labels'))) return;
        var $highlightEl = $tabbarEl.find('.tab-link-highlight');
        var tabLinksCount = $tabbarEl.find('.tab-link').length;

        if (tabLinksCount === 0) {
          $highlightEl.remove();
          return;
        }

        if ($highlightEl.length === 0) {
          $tabbarEl.children('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
          $highlightEl = $tabbarEl.find('.tab-link-highlight');
        } else if ($highlightEl.next().length) {
          $tabbarEl.children('.toolbar-inner').append($highlightEl);
        }

        var $activeLink = $tabbarEl.find('.tab-link-active');
        var highlightWidth;
        var highlightTranslate;

        if ($tabbarEl.hasClass('tabbar-scrollable') && $activeLink && $activeLink[0]) {
          highlightWidth = $activeLink[0].offsetWidth + "px";
          highlightTranslate = $activeLink[0].offsetLeft + "px";
        } else {
          var activeIndex = $activeLink.index();
          highlightWidth = 100 / tabLinksCount + "%";
          highlightTranslate = (app.rtl ? -activeIndex : activeIndex) * 100 + "%";
        }

        nextFrame(function () {
          $highlightEl.css('width', highlightWidth).transform("translate3d(" + highlightTranslate + ",0,0)");
        });
      },
      init: function init(tabbarEl) {
        var app = this;
        app.toolbar.setHighlight(tabbarEl);
      },
      hide: function hide(el, animate) {
        if (animate === void 0) {
          animate = true;
        }

        var app = this;
        var $el = $$1(el);
        if ($el.hasClass('toolbar-hidden')) return;
        var className = "toolbar-hidden" + (animate ? ' toolbar-transitioning' : '');
        $el.transitionEnd(function () {
          $el.removeClass('toolbar-transitioning');
        });
        $el.addClass(className);
        $el.trigger('toolbar:hide');
        app.emit('toolbarHide', $el[0]);
      },
      show: function show(el, animate) {
        if (animate === void 0) {
          animate = true;
        }

        var app = this;
        var $el = $$1(el);
        if (!$el.hasClass('toolbar-hidden')) return;

        if (animate) {
          $el.addClass('toolbar-transitioning');
          $el.transitionEnd(function () {
            $el.removeClass('toolbar-transitioning');
          });
        }

        $el.removeClass('toolbar-hidden');
        $el.trigger('toolbar:show');
        app.emit('toolbarShow', $el[0]);
      },
      initToolbarOnScroll: function initToolbarOnScroll(pageEl) {
        var app = this;
        var $pageEl = $$1(pageEl);
        var $toolbarEl = $pageEl.parents('.view').children('.toolbar');

        if ($toolbarEl.length === 0) {
          $toolbarEl = $pageEl.find('.toolbar');
        }

        if ($toolbarEl.length === 0) {
          $toolbarEl = $pageEl.parents('.views').children('.tabbar, .tabbar-labels');
        }

        if ($toolbarEl.length === 0) {
          return;
        }

        var previousScrollTop;
        var currentScrollTop;
        var scrollHeight;
        var offsetHeight;
        var reachEnd;
        var action;
        var toolbarHidden;

        function handleScroll(e) {
          if ($pageEl.hasClass('page-with-card-opened')) return;
          if ($pageEl.hasClass('page-previous')) return;
          var scrollContent = this;

          if (e && e.target && e.target !== scrollContent) {
            return;
          }

          currentScrollTop = scrollContent.scrollTop;
          scrollHeight = scrollContent.scrollHeight;
          offsetHeight = scrollContent.offsetHeight;
          reachEnd = currentScrollTop + offsetHeight >= scrollHeight;
          toolbarHidden = $toolbarEl.hasClass('toolbar-hidden');

          if (reachEnd) {
            if (app.params.toolbar.showOnPageScrollEnd) {
              action = 'show';
            }
          } else if (previousScrollTop > currentScrollTop) {
            if (app.params.toolbar.showOnPageScrollTop || currentScrollTop <= 44) {
              action = 'show';
            } else {
              action = 'hide';
            }
          } else if (currentScrollTop > 44) {
            action = 'hide';
          } else {
            action = 'show';
          }

          if (action === 'show' && toolbarHidden) {
            app.toolbar.show($toolbarEl);
            toolbarHidden = false;
          } else if (action === 'hide' && !toolbarHidden) {
            app.toolbar.hide($toolbarEl);
            toolbarHidden = true;
          }

          previousScrollTop = currentScrollTop;
        }

        $pageEl.on('scroll', '.page-content', handleScroll, true);
        $pageEl[0].f7ScrollToolbarHandler = handleScroll;
      }
    };
    var Toolbar$1 = {
      name: 'toolbar',
      create: function create() {
        var app = this;
        bindMethods(app, {
          toolbar: Toolbar
        });
      },
      params: {
        toolbar: {
          hideOnPageScroll: false,
          showOnPageScrollEnd: true,
          showOnPageScrollTop: true
        }
      },
      on: {
        pageBeforeRemove: function pageBeforeRemove(page) {
          if (page.$el[0].f7ScrollToolbarHandler) {
            page.$el.off('scroll', '.page-content', page.$el[0].f7ScrollToolbarHandler, true);
          }
        },
        pageBeforeIn: function pageBeforeIn(page) {
          var app = this;
          var $toolbarEl = page.$el.parents('.view').children('.toolbar');

          if ($toolbarEl.length === 0) {
            $toolbarEl = page.$el.parents('.views').children('.tabbar, .tabbar-labels');
          }

          if ($toolbarEl.length === 0) {
            $toolbarEl = page.$el.find('.toolbar');
          }

          if ($toolbarEl.length === 0) {
            return;
          }

          if (page.$el.hasClass('no-toolbar')) {
            app.toolbar.hide($toolbarEl);
          } else {
            app.toolbar.show($toolbarEl);
          }
        },
        pageInit: function pageInit(page) {
          var app = this;
          page.$el.find('.tabbar, .tabbar-labels').each(function (tabbarEl) {
            app.toolbar.init(tabbarEl);
          });

          if (app.params.toolbar.hideOnPageScroll || page.$el.find('.hide-toolbar-on-scroll').length || page.$el.hasClass('hide-toolbar-on-scroll') || page.$el.find('.hide-bars-on-scroll').length || page.$el.hasClass('hide-bars-on-scroll')) {
            if (page.$el.find('.keep-toolbar-on-scroll').length || page.$el.hasClass('keep-toolbar-on-scroll') || page.$el.find('.keep-bars-on-scroll').length || page.$el.hasClass('keep-bars-on-scroll')) {
              return;
            }

            app.toolbar.initToolbarOnScroll(page.el);
          }
        },
        init: function init() {
          var app = this;
          app.$el.find('.tabbar, .tabbar-labels').each(function (tabbarEl) {
            app.toolbar.init(tabbarEl);
          });
        }
      },
      vnode: {
        tabbar: {
          insert: function insert(vnode) {
            var app = this;
            app.toolbar.init(vnode.elm);
          }
        }
      }
    };

    var Subnavbar = {
      name: 'subnavbar',
      on: {
        pageInit: function pageInit(page) {
          if (page.$navbarEl && page.$navbarEl.length && page.$navbarEl.find('.subnavbar').length) {
            page.$el.addClass('page-with-subnavbar');
          }

          var $innerSubnavbars = page.$el.find('.subnavbar').filter(function (subnavbarEl) {
            return $$1(subnavbarEl).parents('.page')[0] === page.$el[0];
          });

          if ($innerSubnavbars.length) {
            page.$el.addClass('page-with-subnavbar');
          }
        }
      }
    };

    var TouchRipple = /*#__PURE__*/function () {
      function TouchRipple(app, $el, x, y) {
        var ripple = this;
        if (!$el) return undefined;

        var _$el$0$getBoundingCli = $el[0].getBoundingClientRect(),
            left = _$el$0$getBoundingCli.left,
            top = _$el$0$getBoundingCli.top,
            width = _$el$0$getBoundingCli.width,
            height = _$el$0$getBoundingCli.height;

        var center = {
          x: x - left,
          y: y - top
        };
        var diameter = Math.max(Math.pow(Math.pow(height, 2) + Math.pow(width, 2), 0.5), 48);
        var isInset = false;
        var insetElements = app.params.touch.touchRippleInsetElements || '';

        if (insetElements && $el.is(insetElements)) {
          isInset = true;
        }

        if (isInset) {
          diameter = Math.max(Math.min(width, height), 48);
        }

        if (!isInset && $el.css('overflow') === 'hidden') {
          var distanceFromCenter = Math.pow(Math.pow(center.x - width / 2, 2) + Math.pow(center.y - height / 2, 2), 0.5);
          var scale = (diameter / 2 + distanceFromCenter) / (diameter / 2);
          ripple.rippleTransform = "translate3d(0px, 0px, 0) scale(" + scale + ")";
        } else {
          // prettier-ignore
          ripple.rippleTransform = "translate3d(" + (-center.x + width / 2) + "px, " + (-center.y + height / 2) + "px, 0) scale(1)";
        }

        if (isInset) {
          $el.addClass('ripple-inset');
        }

        ripple.$rippleWaveEl = $$1("<div class=\"ripple-wave\" style=\"width: " + diameter + "px; height: " + diameter + "px; margin-top:-" + diameter / 2 + "px; margin-left:-" + diameter / 2 + "px; left:" + center.x + "px; top:" + center.y + "px; --f7-ripple-transform: " + ripple.rippleTransform + "\"></div>");
        $el.prepend(ripple.$rippleWaveEl);
        ripple.$rippleWaveEl.animationEnd(function () {
          if (!ripple.$rippleWaveEl) return;
          if (ripple.$rippleWaveEl.hasClass('ripple-wave-out')) return;
          ripple.$rippleWaveEl.addClass('ripple-wave-in');

          if (ripple.shouldBeRemoved) {
            ripple.out();
          }
        });
        return ripple;
      }

      var _proto = TouchRipple.prototype;

      _proto.destroy = function destroy() {
        var ripple = this;

        if (ripple.$rippleWaveEl) {
          ripple.$rippleWaveEl.remove();
        }

        Object.keys(ripple).forEach(function (key) {
          ripple[key] = null;
          delete ripple[key];
        });
        ripple = null;
      };

      _proto.out = function out() {
        var ripple = this;
        var $rippleWaveEl = this.$rippleWaveEl;
        clearTimeout(ripple.removeTimeout);
        $rippleWaveEl.addClass('ripple-wave-out');
        ripple.removeTimeout = setTimeout(function () {
          ripple.destroy();
        }, 300);
        $rippleWaveEl.animationEnd(function () {
          clearTimeout(ripple.removeTimeout);
          ripple.destroy();
        });
      };

      _proto.remove = function remove() {
        var ripple = this;
        if (ripple.shouldBeRemoved) return;
        ripple.removeTimeout = setTimeout(function () {
          ripple.destroy();
        }, 400);
        ripple.shouldBeRemoved = true;

        if (ripple.$rippleWaveEl.hasClass('ripple-wave-in')) {
          ripple.out();
        }
      };

      return TouchRipple;
    }();

    var TouchRipple$1 = {
      name: 'touch-ripple',
      static: {
        TouchRipple: TouchRipple
      },
      create: function create() {
        var app = this;
        app.touchRipple = {
          create: function create() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return _construct$1(TouchRipple, args);
          }
        };
      }
    };

    var openedModals = [];
    var dialogsQueue = [];

    function clearDialogsQueue() {
      if (dialogsQueue.length === 0) return;
      var dialog = dialogsQueue.shift();
      dialog.open();
    }

    var Modal = /*#__PURE__*/function (_Framework7Class) {
      _inheritsLoose$1(Modal, _Framework7Class);

      function Modal(app, params) {
        var _this;

        _this = _Framework7Class.call(this, params, [app]) || this;

        var modal = _assertThisInitialized$1(_this);

        var defaults = {}; // Extend defaults with modules params

        modal.useModulesParams(defaults);
        modal.params = extend$1(defaults, params);
        modal.opened = false;
        var $containerEl = modal.params.containerEl ? $$1(modal.params.containerEl).eq(0) : app.$el;
        if (!$containerEl.length) $containerEl = app.$el;
        modal.$containerEl = $containerEl;
        modal.containerEl = $containerEl[0]; // Install Modules

        modal.useModules();
        return _assertThisInitialized$1(_this) || _assertThisInitialized$1(_this);
      }

      var _proto = Modal.prototype;

      _proto.onOpen = function onOpen() {
        var modal = this;
        modal.opened = true;
        openedModals.push(modal);
        $$1('html').addClass("with-modal-" + modal.type.toLowerCase());
        modal.$el.trigger("modal:open " + modal.type.toLowerCase() + ":open");
        modal.emit("local::open modalOpen " + modal.type + "Open", modal);
      };

      _proto.onOpened = function onOpened() {
        var modal = this;
        modal.$el.trigger("modal:opened " + modal.type.toLowerCase() + ":opened");
        modal.emit("local::opened modalOpened " + modal.type + "Opened", modal);
      };

      _proto.onClose = function onClose() {
        var modal = this;
        modal.opened = false;
        if (!modal.type || !modal.$el) return;
        openedModals.splice(openedModals.indexOf(modal), 1);
        $$1('html').removeClass("with-modal-" + modal.type.toLowerCase());
        modal.$el.trigger("modal:close " + modal.type.toLowerCase() + ":close");
        modal.emit("local::close modalClose " + modal.type + "Close", modal);
      };

      _proto.onClosed = function onClosed() {
        var modal = this;
        if (!modal.type || !modal.$el) return;
        modal.$el.removeClass('modal-out');
        modal.$el.hide();
        modal.$el.trigger("modal:closed " + modal.type.toLowerCase() + ":closed");
        modal.emit("local::closed modalClosed " + modal.type + "Closed", modal);
      };

      _proto.open = function open(animateModal) {
        var modal = this;
        var document = getDocument();
        var app = modal.app;
        var $el = modal.$el;
        var $backdropEl = modal.$backdropEl;
        var type = modal.type;
        var animate = true;
        if (typeof animateModal !== 'undefined') animate = animateModal;else if (typeof modal.params.animate !== 'undefined') {
          animate = modal.params.animate;
        }

        if (!$el || $el.hasClass('modal-in')) {
          return modal;
        }

        if (type === 'dialog' && app.params.modal.queueDialogs) {
          var pushToQueue;

          if ($$1('.dialog.modal-in').length > 0) {
            pushToQueue = true;
          } else if (openedModals.length > 0) {
            openedModals.forEach(function (openedModal) {
              if (openedModal.type === 'dialog') pushToQueue = true;
            });
          }

          if (pushToQueue) {
            dialogsQueue.push(modal);
            return modal;
          }
        }

        var $modalParentEl = $el.parent();
        var wasInDom = $el.parents(document).length > 0;

        if (!$modalParentEl.is(modal.$containerEl)) {
          modal.$containerEl.append($el);
          modal.once(type + "Closed", function () {
            if (wasInDom) {
              $modalParentEl.append($el);
            } else {
              $el.remove();
            }
          });
        } // Show Modal


        $el.show();
        /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */

        modal._clientLeft = $el[0].clientLeft; // Modal

        function transitionEnd() {
          if ($el.hasClass('modal-out')) {
            modal.onClosed();
          } else if ($el.hasClass('modal-in')) {
            modal.onOpened();
          }
        }

        if (animate) {
          if ($backdropEl) {
            $backdropEl.removeClass('not-animated');
            $backdropEl.addClass('backdrop-in');
          }

          $el.animationEnd(function () {
            transitionEnd();
          });
          $el.transitionEnd(function () {
            transitionEnd();
          });
          $el.removeClass('modal-out not-animated').addClass('modal-in');
          modal.onOpen();
        } else {
          if ($backdropEl) {
            $backdropEl.addClass('backdrop-in not-animated');
          }

          $el.removeClass('modal-out').addClass('modal-in not-animated');
          modal.onOpen();
          modal.onOpened();
        }

        return modal;
      };

      _proto.close = function close(animateModal) {
        var modal = this;
        var $el = modal.$el;
        var $backdropEl = modal.$backdropEl;
        var animate = true;
        if (typeof animateModal !== 'undefined') animate = animateModal;else if (typeof modal.params.animate !== 'undefined') {
          animate = modal.params.animate;
        }

        if (!$el || !$el.hasClass('modal-in')) {
          if (dialogsQueue.indexOf(modal) >= 0) {
            dialogsQueue.splice(dialogsQueue.indexOf(modal), 1);
          }

          return modal;
        } // backdrop


        if ($backdropEl) {
          var needToHideBackdrop = true;

          if (modal.type === 'popup') {
            modal.$el.prevAll('.popup.modal-in').add(modal.$el.nextAll('.popup.modal-in')).each(function (popupEl) {
              var popupInstance = popupEl.f7Modal;
              if (!popupInstance) return;

              if (popupInstance.params.closeByBackdropClick && popupInstance.params.backdrop && popupInstance.backdropEl === modal.backdropEl) {
                needToHideBackdrop = false;
              }
            });
          }

          if (needToHideBackdrop) {
            $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');
            $backdropEl.removeClass('backdrop-in');
          }
        } // Modal


        $el[animate ? 'removeClass' : 'addClass']('not-animated');

        function transitionEnd() {
          if ($el.hasClass('modal-out')) {
            modal.onClosed();
          } else if ($el.hasClass('modal-in')) {
            modal.onOpened();
          }
        }

        if (animate) {
          $el.animationEnd(function () {
            transitionEnd();
          });
          $el.transitionEnd(function () {
            transitionEnd();
          });
          $el.removeClass('modal-in').addClass('modal-out'); // Emit close

          modal.onClose();
        } else {
          $el.addClass('not-animated').removeClass('modal-in').addClass('modal-out'); // Emit close

          modal.onClose();
          modal.onClosed();
        }

        if (modal.type === 'dialog') {
          clearDialogsQueue();
        }

        return modal;
      };

      _proto.destroy = function destroy() {
        var modal = this;
        if (modal.destroyed) return;
        modal.emit("local::beforeDestroy modalBeforeDestroy " + modal.type + "BeforeDestroy", modal);

        if (modal.$el) {
          modal.$el.trigger("modal:beforedestroy " + modal.type.toLowerCase() + ":beforedestroy");

          if (modal.$el.length && modal.$el[0].f7Modal) {
            delete modal.$el[0].f7Modal;
          }
        }

        deleteProps(modal);
        modal.destroyed = true;
      };

      return Modal;
    }(Framework7Class);

    var CustomModal = /*#__PURE__*/function (_Modal) {
      _inheritsLoose$1(CustomModal, _Modal);

      function CustomModal(app, params) {
        var _this;

        var extendedParams = extend$1({
          backdrop: true,
          closeByBackdropClick: true,
          on: {}
        }, params); // Extends with open/close Modal methods;

        _this = _Modal.call(this, app, extendedParams) || this;

        var customModal = _assertThisInitialized$1(_this);

        customModal.params = extendedParams; // Find Element

        var $el;

        if (!customModal.params.el) {
          $el = $$1(customModal.params.content);
        } else {
          $el = $$1(customModal.params.el);
        }

        if ($el && $el.length > 0 && $el[0].f7Modal) {
          return $el[0].f7Modal || _assertThisInitialized$1(_this);
        }

        if ($el.length === 0) {
          return customModal.destroy() || _assertThisInitialized$1(_this);
        }

        var $backdropEl;

        if (customModal.params.backdrop) {
          $backdropEl = app.$el.children('.custom-modal-backdrop');

          if ($backdropEl.length === 0) {
            $backdropEl = $$1('<div class="custom-modal-backdrop"></div>');
            app.$el.append($backdropEl);
          }
        }

        function handleClick(e) {
          if (!customModal || customModal.destroyed) return;

          if ($backdropEl && e.target === $backdropEl[0]) {
            customModal.close();
          }
        }

        customModal.on('customModalOpened', function () {
          if (customModal.params.closeByBackdropClick && customModal.params.backdrop) {
            app.on('click', handleClick);
          }
        });
        customModal.on('customModalClose', function () {
          if (customModal.params.closeByBackdropClick && customModal.params.backdrop) {
            app.off('click', handleClick);
          }
        });
        extend$1(customModal, {
          app: app,
          $el: $el,
          el: $el[0],
          $backdropEl: $backdropEl,
          backdropEl: $backdropEl && $backdropEl[0],
          type: 'customModal'
        });
        $el[0].f7Modal = customModal;
        return customModal || _assertThisInitialized$1(_this);
      }

      return CustomModal;
    }(Modal);

    var Modal$1 = {
      name: 'modal',
      static: {
        Modal: Modal,
        CustomModal: CustomModal
      },
      create: function create() {
        var app = this;
        app.customModal = {
          create: function create(params) {
            return new CustomModal(app, params);
          }
        };
      },
      params: {
        modal: {
          queueDialogs: true
        }
      }
    };

    if (typeof window !== 'undefined') {
      // Dom7
      if (!window.Dom7) window.Dom7 = $$1;
    } // UMD_ONLY_END


    Router.use([RouterComponentLoaderModule]);
    Framework7.use([DeviceModule, SupportModule, UtilsModule, ResizeModule, RequestModule, TouchModule, ClicksModule, RouterModule, HistoryModule, ComponentModule, ServiceWorkerModule, StoreModule, Statusbar$1, View$1, Navbar$1, Toolbar$1, Subnavbar, TouchRipple$1, Modal$1]);

    return Framework7;

})));
//# sourceMappingURL=framework7.js.map
