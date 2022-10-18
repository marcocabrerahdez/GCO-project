"use strict";
(() => {
var exports = {};
exports.id = 510;
exports.ids = [510];
exports.modules = {

/***/ 303:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(854);
/* harmony import */ var _cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(575);



const AvoDetail = async (req, res) => {
  try {
    // Generally, you would not want this in your apps.
    // See more in 'cors.js'
    await (0,_cors__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z)(req, res);
    const db = new _database__WEBPACK_IMPORTED_MODULE_0__/* .default */ .Z();
    const avoId = req.query.id;
    const avo = await db.getById(avoId); // Notice: We're using Next.JS response helpers here :)
    // https://nextjs.org/docs/api-routes/response-helpers

    res.status(200).json(avo);
  } catch (e) {
    console.error(e);
    res.status(404).end();
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AvoDetail);

/***/ }),

/***/ 479:
/***/ ((module) => {

module.exports = require("cors");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [651], () => (__webpack_exec__(303)));
module.exports = __webpack_exports__;

})();