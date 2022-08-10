/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/deprecated.js":
/*!***************************!*\
  !*** ./src/deprecated.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


const {
  __
} = wp.i18n;
const deprecated = [{
  attributes: {
    buttonText: {
      type: 'string',
      selector: 'a'
    },
    buttonLink: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'href'
    },
    buttonType: {
      type: 'string',
      default: 'default'
    },
    buttonAlign: {
      type: 'string'
    },
    buttonBlock: {
      type: 'boolean',
      default: false
    },
    buttonSize: {
      type: 'string',
      default: ''
    }
  },

  migrate(_ref) {
    let {
      buttonText,
      buttonLink,
      buttonType,
      buttonAlign,
      buttonSize,
      buttonBlock
    } = _ref;
    return {
      buttonType: buttonType = 'default' === buttonType ? 'light' : buttonType,
      buttonSize: buttonSize = 'btn-xs' === buttonType ? 'btn-sm' : buttonSize,
      buttonText: buttonText,
      buttonLink: buttonLink,
      buttonAlign: buttonAlign,
      buttonBlock: buttonBlock
    };
  },

  isEligible(attributes, innerBlocks) {
    if ('btn-xs' === attributes.buttonSize || 'default' === attributes.buttonType) {
      return true;
    }

    return false;
  },

  save: function (_ref2) {
    let {
      attributes
    } = _ref2;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
      tagName: "a",
      className: `btn btn-${attributes.buttonType} ${attributes.buttonBlock ? 'btn-block' : ''} ${attributes.buttonSize}`,
      href: attributes.buttonLink,
      value: attributes.buttonText
    });
  }
}, {
  attributes: {
    buttonText: {
      type: 'string',
      selector: 'a'
    },
    buttonLink: {
      type: 'string',
      source: 'attribute',
      selector: 'a',
      attribute: 'href'
    },
    buttonType: {
      type: 'string',
      default: 'default'
    },
    buttonAlign: {
      type: 'string'
    },
    buttonBlock: {
      type: 'boolean',
      default: false
    },
    buttonSize: {
      type: 'string',
      default: ''
    }
  },
  save: function (props) {
    const {
      attributes: {
        buttonText,
        buttonLink,
        buttonType,
        activeButtonType,
        buttonAlign,
        buttonBlock,
        buttonSize
      }
    } = props;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
      tagName: "a",
      className: `btn btn-${buttonType} ${buttonBlock ? 'btn-block' : ''} ${buttonSize}`,
      href: buttonLink,
      value: buttonText
    });
  }
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deprecated);

/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");







function Edit(props) {
  const ref = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const richTextRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
    ref
  });
  const {
    attributes: {
      buttonText,
      buttonLink,
      linkTarget,
      rel,
      buttonType,
      activeButtonType,
      buttonAlign,
      buttonBlock,
      buttonSize
    },
    setAttributes,
    isSelected
  } = props;
  /**
   * Link and Unlink Button
   *
   * Adapted from https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/button/edit.js
  */

  const [isEditingURL, setIsEditingURL] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  function onToggleOpenInNewTab(value) {
    const newLinkTarget = value ? '_blank' : undefined;
    let updatedRel = rel;

    if (newLinkTarget && !rel) {
      updatedRel = NEW_TAB_REL;
    } else if (!newLinkTarget && rel === NEW_TAB_REL) {
      updatedRel = undefined;
    }

    setAttributes({
      linkTarget: newLinkTarget,
      rel: updatedRel
    });
  }

  const isURLSet = !!buttonLink;
  const opensInNewTab = linkTarget === '_blank';
  const NEW_TAB_REL = 'noreferrer noopener';

  function startEditing(event) {
    event.preventDefault();
    setIsEditingURL(true);
  }

  function unlink() {
    setAttributes({
      buttonLink: undefined,
      linkTarget: undefined,
      rel: undefined
    });
    setIsEditingURL(false);
  }

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isSelected) {
      setIsEditingURL(false);
    }
  }, [isSelected]);
  /**
  	 * ButtonClassControl returns a Toolbar component with alert classes that changes via on click and updates the alert block's style.
  	 *
  	 * @return Toolbar component with alert classes
  	 * */

  const ButtonStyleControl = () => {
    function createClassControl(buttonClass) {
      //Switch checks the class control alertClass and returns the corresponding colorClass to update the SVG icon
      let colorClass = '';

      switch (buttonClass) {
        case 'primary':
          colorClass = '#003D79';
          break;

        case 'secondary':
          colorClass = '#6c757d';
          break;

        case 'info':
          colorClass = '#afd7ff';
          break;

        case 'success':
          colorClass = '#317131';
          break;

        case 'warning':
          colorClass = '#F2C01E';
          break;

        case 'danger':
          colorClass = '#C4122F';
          break;

        case 'light':
          colorClass = '#f8f9fa';
          break;

        case 'dark':
          colorClass = '#343a40';
          break;

        default:
          colorClass = '#31708f';
          break;
      }

      return {
        icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SVG, {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.G, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Path, {
          fill: colorClass,
          d: "M21.125,2H4.875C2.182,2,0,4.182,0,6.875v12.25C0,21.818,2.182,24,4.875,24h16.25,C23.818,24,26,21.818,26,19.125V6.875C26,4.182,23.818,2,21.125,2z"
        }))),
        title: buttonClass.charAt(0).toUpperCase() + buttonClass.slice(1),
        isActive: activeButtonType === buttonClass,
        onClick: () => setAttributes({
          buttonType: buttonClass,
          activeButtonType: buttonClass
        })
      };
    }

    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarDropdownMenu, {
      label: "Color",
      icon: "color-picker",
      controls: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'].map(createClassControl)
    });
  };

  const ButtonSizeControl = () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarDropdownMenu, {
      label: "Size",
      icon: "editor-expand",
      controls: [{
        title: 'Small',
        icon: 'editor-contract',
        onClick: () => setAttributes({
          buttonSize: 'btn-sm'
        }),
        isActive: buttonSize === 'btn-sm'
      }, {
        title: 'Medium',
        icon: 'button',
        onClick: () => setAttributes({
          buttonSize: ''
        }),
        isActive: buttonSize === ''
      }, {
        title: 'Large',
        icon: 'editor-expand',
        onClick: () => setAttributes({
          buttonSize: 'btn-lg'
        }),
        isActive: buttonSize === 'btn-lg'
      }]
    });
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonStyleControl, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonSizeControl, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
    name: "full-width",
    icon: "align-wide",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Display Full-Width'),
    isActive: buttonBlock !== null && buttonBlock !== void 0 ? buttonBlock : false,
    onClick: () => setAttributes({
      buttonBlock: !buttonBlock
    })
  }), !isURLSet && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
    name: "link",
    icon: "admin-links",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link') //shortcut={ displayShortcut.primary( 'k' ) }
    ,
    onClick: startEditing
  }), isURLSet && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
    name: "link",
    icon: "editor-unlink",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unlink') //shortcut={ displayShortcut.primaryShift( 'k' ) }
    ,
    onClick: unlink,
    isActive: true
  })), isSelected && (isEditingURL || isURLSet) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Popover, {
    position: "bottom center",
    onClose: () => {
      var _richTextRef$current;

      setIsEditingURL(false);
      (_richTextRef$current = richTextRef.current) === null || _richTextRef$current === void 0 ? void 0 : _richTextRef$current.focus();
    },
    anchorRef: ref === null || ref === void 0 ? void 0 : ref.current,
    focusOnMount: isEditingURL ? 'firstElement' : false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.__experimentalLinkControl, {
    className: "wp-block-navigation-link__inline-link-input",
    value: {
      url: buttonLink,
      opensInNewTab
    },
    onChange: _ref => {
      let {
        url: newButtonLink = '',
        opensInNewTab: newOpensInNewTab
      } = _ref;
      setAttributes({
        buttonLink: newButtonLink
      });

      if (opensInNewTab !== newOpensInNewTab) {
        onToggleOpenInNewTab(newOpensInNewTab);
      }
    },
    onRemove: () => {
      var _richTextRef$current2;

      unlink();
      (_richTextRef$current2 = richTextRef.current) === null || _richTextRef$current2 === void 0 ? void 0 : _richTextRef$current2.focus();
    },
    forceIsEditingLink: isEditingURL
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: "Button Style"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: "Button Style",
    value: buttonType,
    options: [{
      label: 'Primary (BC Blue)',
      value: 'primary'
    }, {
      label: 'Secondary (Gray)',
      value: 'secondary'
    }, {
      label: 'Info (Light Blue)',
      value: 'info'
    }, {
      label: 'Success (Green)',
      value: 'success'
    }, {
      label: 'Warning (Orange)',
      value: 'warning'
    }, {
      label: 'Danger (Red)',
      value: 'danger'
    }, {
      label: 'Light',
      value: 'light'
    }, {
      label: 'Dark',
      value: 'dark'
    }],
    onChange: buttonType => {
      setAttributes({
        buttonType
      });
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: "Button Size",
    value: buttonSize,
    options: [{
      label: 'Small',
      value: 'btn-sm'
    }, {
      label: 'Standard',
      value: ''
    }, {
      label: 'Large',
      value: 'btn-lg'
    }],
    onChange: buttonSize => {
      setAttributes({
        buttonSize
      });
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: "Display as Block (Full-Width)",
    checked: buttonBlock,
    onChange: buttonBlock => setAttributes({
      buttonBlock
    })
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
    ref: richTextRef,
    tagName: "span",
    className: `btn btn-${buttonType} ${buttonBlock ? 'btn-block' : ''} ${buttonSize}`,
    allowedFormats: ['bold', 'italic'],
    value: buttonText,
    onChange: buttonText => setAttributes({
      buttonText
    })
  }), !isSelected && !isEditingURL && !isURLSet && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Warning! This button has no link!"))));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _deprecated__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./deprecated */ "./src/deprecated.js");
/* harmony import */ var _transforms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transforms */ "./src/transforms.js");
/* harmony import */ var _transforms__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_transforms__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_6__);






 // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_6__.registerBlockType)('mayflower-blocks/button', {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  deprecated: _deprecated__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_5__["default"]
});

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);

const {
  __
} = wp.i18n; // Import __() from wp.i18n

const {
  registerBlockType,
  PlainText
} = wp.blocks; // Import registerBlockType() from wp.blocks
// const { RichText, BlockControls, InspectorControls, AlignmentToolbar } = wp.blockEditor;

const {
  getCurrentPostId
} = wp.data;
const {
  ServerSideRender,
  TextControl,
  SelectControl,
  ToggleControl,
  Toolbar,
  SVG,
  Path,
  G,
  PanelBody,
  PanelRow
} = wp.components;

function save(props) {
  const {
    attributes: {
      buttonText,
      buttonLink,
      linkTarget,
      rel,
      buttonType,
      activeButtonType,
      buttonAlign,
      buttonBlock,
      buttonSize
    }
  } = props;
  const disabled = buttonLink === undefined || buttonLink === '' ? true : false;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
    tagName: "a",
    className: `btn btn-${buttonType} ${buttonBlock ? 'btn-block' : ''} ${buttonSize} ${disabled ? 'disabled' : ''}`,
    target: linkTarget,
    rel: rel,
    href: buttonLink,
    value: buttonText,
    "aria-disabled": disabled
  });
}

/***/ }),

/***/ "./src/transforms.js":
/*!***************************!*\
  !*** ./src/transforms.js ***!
  \***************************/
/***/ (() => {

const transforms = {
  from: [{}]
};

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmayflower_blocks_button"] = self["webpackChunkmayflower_blocks_button"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map