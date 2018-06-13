(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VMark"] = factory();
	else
		root["VMark"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VMark = undefined;

var _sliceDetails = __webpack_require__(1);

var _convertTokens = __webpack_require__(3);

var _vtokenize = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VMark = exports.VMark = function VMark(str) {
  _classCallCheck(this, VMark);

  var tokens = (0, _vtokenize.vTokenize)(str, (0, _sliceDetails.getMaxTokenLength)(), _sliceDetails.getSliceDetails);

  var convertedTokens = (0, _convertTokens.convertTokens)(tokens);

  return convertedTokens.join('');
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMaxTokenLength = exports.getSliceDetails = undefined;

var _sliceList = __webpack_require__(2);

var getSliceDetails = exports.getSliceDetails = function getSliceDetails(slice) {

  var sliceDetails = _sliceList.sliceList[slice];

  if (sliceDetails) {

    return Object.assign({}, sliceDetails, {
      slice: slice,
      type: 'marker'
    });
  }

  return {
    role: 'none',
    slice: slice,
    type: 'unknown'
  };
};

var getMaxTokenLength = exports.getMaxTokenLength = function getMaxTokenLength() {

  var minTokenLength = 1;
  var tokenLengths = [minTokenLength];

  Object.keys(_sliceList.sliceList).forEach(function (key) {
    return tokenLengths.push(key.length);
  });

  return Math.max.apply(Math, tokenLengths);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sliceList = exports.sliceList = _defineProperty({

  '#': {
    role: 'heading1'
  },

  '##': {
    role: 'heading2'
  },

  '###': {
    role: 'heading3'
  },

  '####': {
    role: 'heading4'
  },

  '#####': {
    role: 'heading5'
  },

  '######': {
    role: 'heading6'
  }

}, '######', {
  role: 'heading6'
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertTokens = undefined;

var _utils = __webpack_require__(4);

var HtmlTagList = {

  heading1: {
    closeTag: '</h1>',
    openTag: '<h1>'
  },

  heading2: {
    closeTag: '</h2>',
    openTag: '<h2>'
  },

  paragraph: {
    closeTag: '</p>',
    openTag: '<p>'
  }

};

/* eslint-disable complexity */
var convertTokens = exports.convertTokens = function convertTokens(tokens) {

  var convertedTokens = [];

  var openedTag = '';

  (0, _utils.foreach)(tokens, function (token) {

    if (token.type === 'marker') {

      var tag = HtmlTagList[token.role];

      if (tag) {

        if (openedTag) {

          convertedTokens.push(HtmlTagList[openedTag].closeTag);
          openedTag = '';
        }

        convertedTokens.push(tag.openTag);
        openedTag = token.role;
      }
    } else {

      if (token.slice === '\n' && openedTag && openedTag !== 'paragraph') {

        convertedTokens.push(HtmlTagList[openedTag].closeTag);
        openedTag = '';
      }

      if (!openedTag) {

        convertedTokens.push(HtmlTagList.paragraph.openTag);
        openedTag = 'paragraph';
      }

      if (token.slice !== '\n') {

        convertedTokens.push(token.slice);
      }
    }
  });

  convertedTokens.push(HtmlTagList[openedTag].closeTag);
  openedTag = '';

  return convertedTokens;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var foreach = exports.foreach = function foreach(array, cb) {

  for (var i = 0, length = array.length; i < length; i += 1) {

    cb(array[i], array);
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vTokenize"] = factory();
	else
		root["vTokenize"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var cannotSeek = function cannotSeek(seeked, maxSeek, inStr, i) {
  return seeked === maxSeek || i === inStr.length - 1;
};

var getTokenDetails = function getTokenDetails(tempSliceDetails, foundIndex) {
  return foundIndex > -1 ? {

    foundIndex: foundIndex,
    token: tempSliceDetails[foundIndex]

  } : {

    foundIndex: 0,
    token: tempSliceDetails[0]

  };
};

var isTokenFound = function isTokenFound(sliceDetails) {
  return sliceDetails.type !== 'unknown' ? true : false;
};

var vTokenize = exports.vTokenize = function vTokenize(str, maxTokenLength, getSliceDetails) {

  var inStr = str.slice(0, str.length);
  var maxSeek = maxTokenLength;

  var tokens = [];

  var seeked = 0,
      strSlice = '',
      tempSliceDetails = [],
      tokenFound = [];

  for (var i = 0, l = inStr.length; i < l; i += 1) {

    seeked += 1;

    strSlice += inStr[i];

    var sliceDetails = getSliceDetails(strSlice);

    tempSliceDetails.push(sliceDetails);

    tokenFound.push(isTokenFound(sliceDetails));

    if (cannotSeek(seeked, maxSeek, inStr, i)) {

      var foundIndex = tokenFound.lastIndexOf(true);

      var tokenDetails = getTokenDetails(tempSliceDetails, foundIndex);

      foundIndex = tokenDetails.foundIndex;

      tokens.push(tokenDetails.token);

      // resetting the 'i' to pick up the next untokenized char.
      i -= seeked - 1 - foundIndex;

      // reset variables
      seeked = 0;
      strSlice = '';
      tempSliceDetails = [];
      tokenFound = [];
    }
  }

  return tokens;
};

/***/ })
/******/ ]);
});

/***/ })
/******/ ]);
});