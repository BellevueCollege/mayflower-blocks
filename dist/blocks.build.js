/******/ (function(modules) { // webpackBootstrap
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
/*!***********************!*\
  !*** ./src/blocks.js ***!
  \***********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__staff_block_js__ = __webpack_require__(/*! ./staff/block.js */ 4);\n/**\n * Gutenberg Blocks\n *\n * All blocks related JavaScript files should be imported here.\n * You can create a new block folder in this dir and include code\n * for that block here as well.\n *\n * All blocks should be included here since this is the file that\n * Webpack is compiling as the input file.\n */\n\n// import './block/block.js';\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9ibG9ja3MuanM/N2I1YiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEd1dGVuYmVyZyBCbG9ja3NcbiAqXG4gKiBBbGwgYmxvY2tzIHJlbGF0ZWQgSmF2YVNjcmlwdCBmaWxlcyBzaG91bGQgYmUgaW1wb3J0ZWQgaGVyZS5cbiAqIFlvdSBjYW4gY3JlYXRlIGEgbmV3IGJsb2NrIGZvbGRlciBpbiB0aGlzIGRpciBhbmQgaW5jbHVkZSBjb2RlXG4gKiBmb3IgdGhhdCBibG9jayBoZXJlIGFzIHdlbGwuXG4gKlxuICogQWxsIGJsb2NrcyBzaG91bGQgYmUgaW5jbHVkZWQgaGVyZSBzaW5jZSB0aGlzIGlzIHRoZSBmaWxlIHRoYXRcbiAqIFdlYnBhY2sgaXMgY29tcGlsaW5nIGFzIHRoZSBpbnB1dCBmaWxlLlxuICovXG5cbi8vIGltcG9ydCAnLi9ibG9jay9ibG9jay5qcyc7XG5pbXBvcnQgJy4vc3RhZmYvYmxvY2suanMnO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Jsb2Nrcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/*!****************************!*\
  !*** ./src/staff/block.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss__ = __webpack_require__(/*! ./style.scss */ 5);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_scss__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss__ = __webpack_require__(/*! ./editor.scss */ 6);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__editor_scss__);\n/**\n * BLOCK: Child Pages\n *\n * Registering a basic block with Gutenberg.\n * Simple block, renders and saves the same content without any interactivity.\n */\n\n//  Import CSS.\n\n\n\nvar __ = wp.i18n.__; // Import __() from wp.i18n\n\nvar registerBlockType = wp.blocks.registerBlockType; // Import registerBlockType() from wp.blocks\n\nvar InspectorControls = wp.editor.InspectorControls;\nvar _wp$components = wp.components,\n    ServerSideRender = _wp$components.ServerSideRender,\n    SelectControl = _wp$components.SelectControl,\n    CheckboxControl = _wp$components.CheckboxControl;\n\n/**\n * Register: aa Gutenberg Block.\n *\n * Registers a new block provided a unique name and an object defining its\n * behavior. Once registered, the block is made editor as an option to any\n * editor interface where blocks are implemented.\n *\n * @link https://wordpress.org/gutenberg/handbook/block-api/\n * @param  {string}   name     Block name.\n * @param  {Object}   settings Block settings.\n * @return {?WPBlock}          The block, if it has been successfully\n *                             registered; otherwise `undefined`.\n */\n\nregisterBlockType('mayflower-blocks/staff-list', {\n\t// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.\n\ttitle: __('Staff List'), // Block title.\n\ticon: 'admin-users', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.\n\tcategory: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.\n\n\tattributes: {\n\t\tstaffLayout: {\n\t\t\ttype: 'string'\n\t\t},\n\t\tstaffPictureToggle: {\n\t\t\ttype: 'boolean'\n\t\t},\n\t\tstaffPhoneToggle: {\n\t\t\ttype: 'boolean'\n\t\t},\n\t\tstaffLocationToggle: {\n\t\t\ttype: 'boolean'\n\t\t},\n\t\tstaffHoursToggle: {\n\t\t\ttype: 'boolean'\n\t\t},\n\t\tstaffBioToggle: {\n\t\t\ttype: 'boolean'\n\t\t},\n\t\tstaffMoreToggle: {\n\t\t\ttype: 'boolean'\n\t\t}\n\t},\n\n\tedit: function edit(_ref) {\n\t\tvar setAttributes = _ref.setAttributes,\n\t\t    attributes = _ref.attributes,\n\t\t    className = _ref.className;\n\n\t\t// ensure the block attributes matches this plugin's name\n\n\t\t// Selective display of options\n\t\tvar listElements = void 0,\n\t\t    moreLink = void 0;\n\n\t\t// Options specific to List View\n\t\tif (attributes.staffLayout === 'list-view') {\n\t\t\tlistElements = wp.element.createElement(\n\t\t\t\t'div',\n\t\t\t\tnull,\n\t\t\t\twp.element.createElement(CheckboxControl, {\n\t\t\t\t\tlabel: 'Phone Number (List View)',\n\t\t\t\t\tchecked: attributes.staffPhoneToggle,\n\t\t\t\t\tonChange: function onChange(staffPhoneToggle) {\n\t\t\t\t\t\treturn setAttributes({ staffPhoneToggle: staffPhoneToggle });\n\t\t\t\t\t}\n\t\t\t\t}),\n\t\t\t\twp.element.createElement(CheckboxControl, {\n\t\t\t\t\tlabel: 'Office Location (List View)',\n\t\t\t\t\tchecked: attributes.staffLocationToggle,\n\t\t\t\t\tonChange: function onChange(staffLocationToggle) {\n\t\t\t\t\t\treturn setAttributes({ staffLocationToggle: staffLocationToggle });\n\t\t\t\t\t}\n\t\t\t\t}),\n\t\t\t\twp.element.createElement(CheckboxControl, {\n\t\t\t\t\tlabel: 'Office Hours (List View)',\n\t\t\t\t\tchecked: attributes.staffHoursToggle,\n\t\t\t\t\tonChange: function onChange(staffHoursToggle) {\n\t\t\t\t\t\treturn setAttributes({ staffHoursToggle: staffHoursToggle });\n\t\t\t\t\t}\n\t\t\t\t}),\n\t\t\t\twp.element.createElement(CheckboxControl, {\n\t\t\t\t\tlabel: 'Biography (List View)',\n\t\t\t\t\tchecked: attributes.staffBioToggle,\n\t\t\t\t\tonChange: function onChange(staffBioToggle) {\n\t\t\t\t\t\treturn setAttributes({ staffBioToggle: staffBioToggle });\n\t\t\t\t\t}\n\t\t\t\t})\n\t\t\t);\n\t\t}\n\n\t\t// Display More Link in Grid View or when Bio is unchecked\n\t\tif (!attributes.staffBioToggle || attributes.staffLayout === 'grid-view') {\n\t\t\tmoreLink = wp.element.createElement(CheckboxControl, {\n\t\t\t\tlabel: '\\'More\\' Link',\n\t\t\t\tchecked: attributes.staffMoreToggle,\n\t\t\t\tonChange: function onChange(staffMoreToggle) {\n\t\t\t\t\treturn setAttributes({ staffMoreToggle: staffMoreToggle });\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\n\t\t// Build return\n\t\treturn [wp.element.createElement(\n\t\t\tInspectorControls,\n\t\t\tnull,\n\t\t\twp.element.createElement(SelectControl, {\n\t\t\t\tlabel: 'Staff Layout',\n\t\t\t\tvalue: attributes.staffLayout,\n\t\t\t\toptions: [{ label: 'Use Customizer Setting', value: '' }, { label: 'List Layout', value: 'list-view' }, { label: 'Grid Layout', value: 'grid-view' }],\n\t\t\t\tonChange: function onChange(staffLayout) {\n\t\t\t\t\treturn setAttributes({ staffLayout: staffLayout });\n\t\t\t\t}\n\t\t\t}),\n\t\t\twp.element.createElement(\n\t\t\t\t'fieldset',\n\t\t\t\tnull,\n\t\t\t\twp.element.createElement(\n\t\t\t\t\t'legend',\n\t\t\t\t\tnull,\n\t\t\t\t\t'Elements to Display'\n\t\t\t\t),\n\t\t\t\twp.element.createElement(CheckboxControl, {\n\t\t\t\t\tlabel: 'Staff Photos',\n\t\t\t\t\tchecked: attributes.staffPictureToggle,\n\t\t\t\t\tonChange: function onChange(staffPictureToggle) {\n\t\t\t\t\t\treturn setAttributes({ staffPictureToggle: staffPictureToggle });\n\t\t\t\t\t}\n\t\t\t\t}),\n\t\t\t\tlistElements,\n\t\t\t\tmoreLink\n\t\t\t)\n\t\t), wp.element.createElement(\n\t\t\t'div',\n\t\t\t{ 'class': className },\n\t\t\twp.element.createElement(ServerSideRender, {\n\t\t\t\tblock: 'mayflower-blocks/staff-list',\n\t\t\t\tattributes: attributes\n\t\t\t})\n\t\t)];\n\t},\n\n\tsave: function save() {\n\t\t// Rendering in block.php\n\t\treturn null;\n\t}\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zdGFmZi9ibG9jay5qcz81YzNmIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQkxPQ0s6IENoaWxkIFBhZ2VzXG4gKlxuICogUmVnaXN0ZXJpbmcgYSBiYXNpYyBibG9jayB3aXRoIEd1dGVuYmVyZy5cbiAqIFNpbXBsZSBibG9jaywgcmVuZGVycyBhbmQgc2F2ZXMgdGhlIHNhbWUgY29udGVudCB3aXRob3V0IGFueSBpbnRlcmFjdGl2aXR5LlxuICovXG5cbi8vICBJbXBvcnQgQ1NTLlxuaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0ICcuL2VkaXRvci5zY3NzJztcblxudmFyIF9fID0gd3AuaTE4bi5fXzsgLy8gSW1wb3J0IF9fKCkgZnJvbSB3cC5pMThuXG5cbnZhciByZWdpc3RlckJsb2NrVHlwZSA9IHdwLmJsb2Nrcy5yZWdpc3RlckJsb2NrVHlwZTsgLy8gSW1wb3J0IHJlZ2lzdGVyQmxvY2tUeXBlKCkgZnJvbSB3cC5ibG9ja3NcblxudmFyIEluc3BlY3RvckNvbnRyb2xzID0gd3AuZWRpdG9yLkluc3BlY3RvckNvbnRyb2xzO1xudmFyIF93cCRjb21wb25lbnRzID0gd3AuY29tcG9uZW50cyxcbiAgICBTZXJ2ZXJTaWRlUmVuZGVyID0gX3dwJGNvbXBvbmVudHMuU2VydmVyU2lkZVJlbmRlcixcbiAgICBTZWxlY3RDb250cm9sID0gX3dwJGNvbXBvbmVudHMuU2VsZWN0Q29udHJvbCxcbiAgICBDaGVja2JveENvbnRyb2wgPSBfd3AkY29tcG9uZW50cy5DaGVja2JveENvbnRyb2w7XG5cbi8qKlxuICogUmVnaXN0ZXI6IGFhIEd1dGVuYmVyZyBCbG9jay5cbiAqXG4gKiBSZWdpc3RlcnMgYSBuZXcgYmxvY2sgcHJvdmlkZWQgYSB1bmlxdWUgbmFtZSBhbmQgYW4gb2JqZWN0IGRlZmluaW5nIGl0c1xuICogYmVoYXZpb3IuIE9uY2UgcmVnaXN0ZXJlZCwgdGhlIGJsb2NrIGlzIG1hZGUgZWRpdG9yIGFzIGFuIG9wdGlvbiB0byBhbnlcbiAqIGVkaXRvciBpbnRlcmZhY2Ugd2hlcmUgYmxvY2tzIGFyZSBpbXBsZW1lbnRlZC5cbiAqXG4gKiBAbGluayBodHRwczovL3dvcmRwcmVzcy5vcmcvZ3V0ZW5iZXJnL2hhbmRib29rL2Jsb2NrLWFwaS9cbiAqIEBwYXJhbSAge3N0cmluZ30gICBuYW1lICAgICBCbG9jayBuYW1lLlxuICogQHBhcmFtICB7T2JqZWN0fSAgIHNldHRpbmdzIEJsb2NrIHNldHRpbmdzLlxuICogQHJldHVybiB7P1dQQmxvY2t9ICAgICAgICAgIFRoZSBibG9jaywgaWYgaXQgaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJlZDsgb3RoZXJ3aXNlIGB1bmRlZmluZWRgLlxuICovXG5cbnJlZ2lzdGVyQmxvY2tUeXBlKCdtYXlmbG93ZXItYmxvY2tzL3N0YWZmLWxpc3QnLCB7XG5cdC8vIEJsb2NrIG5hbWUuIEJsb2NrIG5hbWVzIG11c3QgYmUgc3RyaW5nIHRoYXQgY29udGFpbnMgYSBuYW1lc3BhY2UgcHJlZml4LiBFeGFtcGxlOiBteS1wbHVnaW4vbXktY3VzdG9tLWJsb2NrLlxuXHR0aXRsZTogX18oJ1N0YWZmIExpc3QnKSwgLy8gQmxvY2sgdGl0bGUuXG5cdGljb246ICdhZG1pbi11c2VycycsIC8vIEJsb2NrIGljb24gZnJvbSBEYXNoaWNvbnMg4oaSIGh0dHBzOi8vZGV2ZWxvcGVyLndvcmRwcmVzcy5vcmcvcmVzb3VyY2UvZGFzaGljb25zLy5cblx0Y2F0ZWdvcnk6ICdjb21tb24nLCAvLyBCbG9jayBjYXRlZ29yeSDigJQgR3JvdXAgYmxvY2tzIHRvZ2V0aGVyIGJhc2VkIG9uIGNvbW1vbiB0cmFpdHMgRS5nLiBjb21tb24sIGZvcm1hdHRpbmcsIGxheW91dCB3aWRnZXRzLCBlbWJlZC5cblxuXHRhdHRyaWJ1dGVzOiB7XG5cdFx0c3RhZmZMYXlvdXQ6IHtcblx0XHRcdHR5cGU6ICdzdHJpbmcnXG5cdFx0fSxcblx0XHRzdGFmZlBpY3R1cmVUb2dnbGU6IHtcblx0XHRcdHR5cGU6ICdib29sZWFuJ1xuXHRcdH0sXG5cdFx0c3RhZmZQaG9uZVRvZ2dsZToge1xuXHRcdFx0dHlwZTogJ2Jvb2xlYW4nXG5cdFx0fSxcblx0XHRzdGFmZkxvY2F0aW9uVG9nZ2xlOiB7XG5cdFx0XHR0eXBlOiAnYm9vbGVhbidcblx0XHR9LFxuXHRcdHN0YWZmSG91cnNUb2dnbGU6IHtcblx0XHRcdHR5cGU6ICdib29sZWFuJ1xuXHRcdH0sXG5cdFx0c3RhZmZCaW9Ub2dnbGU6IHtcblx0XHRcdHR5cGU6ICdib29sZWFuJ1xuXHRcdH0sXG5cdFx0c3RhZmZNb3JlVG9nZ2xlOiB7XG5cdFx0XHR0eXBlOiAnYm9vbGVhbidcblx0XHR9XG5cdH0sXG5cblx0ZWRpdDogZnVuY3Rpb24gZWRpdChfcmVmKSB7XG5cdFx0dmFyIHNldEF0dHJpYnV0ZXMgPSBfcmVmLnNldEF0dHJpYnV0ZXMsXG5cdFx0ICAgIGF0dHJpYnV0ZXMgPSBfcmVmLmF0dHJpYnV0ZXMsXG5cdFx0ICAgIGNsYXNzTmFtZSA9IF9yZWYuY2xhc3NOYW1lO1xuXG5cdFx0Ly8gZW5zdXJlIHRoZSBibG9jayBhdHRyaWJ1dGVzIG1hdGNoZXMgdGhpcyBwbHVnaW4ncyBuYW1lXG5cblx0XHQvLyBTZWxlY3RpdmUgZGlzcGxheSBvZiBvcHRpb25zXG5cdFx0dmFyIGxpc3RFbGVtZW50cyA9IHZvaWQgMCxcblx0XHQgICAgbW9yZUxpbmsgPSB2b2lkIDA7XG5cblx0XHQvLyBPcHRpb25zIHNwZWNpZmljIHRvIExpc3QgVmlld1xuXHRcdGlmIChhdHRyaWJ1dGVzLnN0YWZmTGF5b3V0ID09PSAnbGlzdC12aWV3Jykge1xuXHRcdFx0bGlzdEVsZW1lbnRzID0gd3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0d3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KENoZWNrYm94Q29udHJvbCwge1xuXHRcdFx0XHRcdGxhYmVsOiAnUGhvbmUgTnVtYmVyIChMaXN0IFZpZXcpJyxcblx0XHRcdFx0XHRjaGVja2VkOiBhdHRyaWJ1dGVzLnN0YWZmUGhvbmVUb2dnbGUsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uIG9uQ2hhbmdlKHN0YWZmUGhvbmVUb2dnbGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZXRBdHRyaWJ1dGVzKHsgc3RhZmZQaG9uZVRvZ2dsZTogc3RhZmZQaG9uZVRvZ2dsZSB9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLFxuXHRcdFx0XHR3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoQ2hlY2tib3hDb250cm9sLCB7XG5cdFx0XHRcdFx0bGFiZWw6ICdPZmZpY2UgTG9jYXRpb24gKExpc3QgVmlldyknLFxuXHRcdFx0XHRcdGNoZWNrZWQ6IGF0dHJpYnV0ZXMuc3RhZmZMb2NhdGlvblRvZ2dsZSxcblx0XHRcdFx0XHRvbkNoYW5nZTogZnVuY3Rpb24gb25DaGFuZ2Uoc3RhZmZMb2NhdGlvblRvZ2dsZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNldEF0dHJpYnV0ZXMoeyBzdGFmZkxvY2F0aW9uVG9nZ2xlOiBzdGFmZkxvY2F0aW9uVG9nZ2xlIH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSksXG5cdFx0XHRcdHdwLmVsZW1lbnQuY3JlYXRlRWxlbWVudChDaGVja2JveENvbnRyb2wsIHtcblx0XHRcdFx0XHRsYWJlbDogJ09mZmljZSBIb3VycyAoTGlzdCBWaWV3KScsXG5cdFx0XHRcdFx0Y2hlY2tlZDogYXR0cmlidXRlcy5zdGFmZkhvdXJzVG9nZ2xlLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbiBvbkNoYW5nZShzdGFmZkhvdXJzVG9nZ2xlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2V0QXR0cmlidXRlcyh7IHN0YWZmSG91cnNUb2dnbGU6IHN0YWZmSG91cnNUb2dnbGUgfSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSxcblx0XHRcdFx0d3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KENoZWNrYm94Q29udHJvbCwge1xuXHRcdFx0XHRcdGxhYmVsOiAnQmlvZ3JhcGh5IChMaXN0IFZpZXcpJyxcblx0XHRcdFx0XHRjaGVja2VkOiBhdHRyaWJ1dGVzLnN0YWZmQmlvVG9nZ2xlLFxuXHRcdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbiBvbkNoYW5nZShzdGFmZkJpb1RvZ2dsZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNldEF0dHJpYnV0ZXMoeyBzdGFmZkJpb1RvZ2dsZTogc3RhZmZCaW9Ub2dnbGUgfSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvLyBEaXNwbGF5IE1vcmUgTGluayBpbiBHcmlkIFZpZXcgb3Igd2hlbiBCaW8gaXMgdW5jaGVja2VkXG5cdFx0aWYgKCFhdHRyaWJ1dGVzLnN0YWZmQmlvVG9nZ2xlIHx8IGF0dHJpYnV0ZXMuc3RhZmZMYXlvdXQgPT09ICdncmlkLXZpZXcnKSB7XG5cdFx0XHRtb3JlTGluayA9IHdwLmVsZW1lbnQuY3JlYXRlRWxlbWVudChDaGVja2JveENvbnRyb2wsIHtcblx0XHRcdFx0bGFiZWw6ICdcXCdNb3JlXFwnIExpbmsnLFxuXHRcdFx0XHRjaGVja2VkOiBhdHRyaWJ1dGVzLnN0YWZmTW9yZVRvZ2dsZSxcblx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uIG9uQ2hhbmdlKHN0YWZmTW9yZVRvZ2dsZSkge1xuXHRcdFx0XHRcdHJldHVybiBzZXRBdHRyaWJ1dGVzKHsgc3RhZmZNb3JlVG9nZ2xlOiBzdGFmZk1vcmVUb2dnbGUgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIEJ1aWxkIHJldHVyblxuXHRcdHJldHVybiBbd3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0SW5zcGVjdG9yQ29udHJvbHMsXG5cdFx0XHRudWxsLFxuXHRcdFx0d3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KFNlbGVjdENvbnRyb2wsIHtcblx0XHRcdFx0bGFiZWw6ICdTdGFmZiBMYXlvdXQnLFxuXHRcdFx0XHR2YWx1ZTogYXR0cmlidXRlcy5zdGFmZkxheW91dCxcblx0XHRcdFx0b3B0aW9uczogW3sgbGFiZWw6ICdVc2UgQ3VzdG9taXplciBTZXR0aW5nJywgdmFsdWU6ICcnIH0sIHsgbGFiZWw6ICdMaXN0IExheW91dCcsIHZhbHVlOiAnbGlzdC12aWV3JyB9LCB7IGxhYmVsOiAnR3JpZCBMYXlvdXQnLCB2YWx1ZTogJ2dyaWQtdmlldycgfV0sXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbiBvbkNoYW5nZShzdGFmZkxheW91dCkge1xuXHRcdFx0XHRcdHJldHVybiBzZXRBdHRyaWJ1dGVzKHsgc3RhZmZMYXlvdXQ6IHN0YWZmTGF5b3V0IH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KSxcblx0XHRcdHdwLmVsZW1lbnQuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J2ZpZWxkc2V0Jyxcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0d3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdCdsZWdlbmQnLFxuXHRcdFx0XHRcdG51bGwsXG5cdFx0XHRcdFx0J0VsZW1lbnRzIHRvIERpc3BsYXknXG5cdFx0XHRcdCksXG5cdFx0XHRcdHdwLmVsZW1lbnQuY3JlYXRlRWxlbWVudChDaGVja2JveENvbnRyb2wsIHtcblx0XHRcdFx0XHRsYWJlbDogJ1N0YWZmIFBob3RvcycsXG5cdFx0XHRcdFx0Y2hlY2tlZDogYXR0cmlidXRlcy5zdGFmZlBpY3R1cmVUb2dnbGUsXG5cdFx0XHRcdFx0b25DaGFuZ2U6IGZ1bmN0aW9uIG9uQ2hhbmdlKHN0YWZmUGljdHVyZVRvZ2dsZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNldEF0dHJpYnV0ZXMoeyBzdGFmZlBpY3R1cmVUb2dnbGU6IHN0YWZmUGljdHVyZVRvZ2dsZSB9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLFxuXHRcdFx0XHRsaXN0RWxlbWVudHMsXG5cdFx0XHRcdG1vcmVMaW5rXG5cdFx0XHQpXG5cdFx0KSwgd3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0J2RpdicsXG5cdFx0XHR7ICdjbGFzcyc6IGNsYXNzTmFtZSB9LFxuXHRcdFx0d3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KFNlcnZlclNpZGVSZW5kZXIsIHtcblx0XHRcdFx0YmxvY2s6ICdtYXlmbG93ZXItYmxvY2tzL3N0YWZmLWxpc3QnLFxuXHRcdFx0XHRhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzXG5cdFx0XHR9KVxuXHRcdCldO1xuXHR9LFxuXG5cdHNhdmU6IGZ1bmN0aW9uIHNhdmUoKSB7XG5cdFx0Ly8gUmVuZGVyaW5nIGluIGJsb2NrLnBocFxuXHRcdHJldHVybiBudWxsO1xuXHR9XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdGFmZi9ibG9jay5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///4\n");

/***/ }),
/* 5 */
/*!******************************!*\
  !*** ./src/staff/style.scss ***!
  \******************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zdGFmZi9zdHlsZS5zY3NzPzczYTkiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdGFmZi9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///5\n");

/***/ }),
/* 6 */
/*!*******************************!*\
  !*** ./src/staff/editor.scss ***!
  \*******************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zdGFmZi9lZGl0b3Iuc2Nzcz9kMmNhIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3RhZmYvZWRpdG9yLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///6\n");

/***/ })
/******/ ]);