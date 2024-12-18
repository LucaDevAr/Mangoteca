"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=F%3A%5Cproyects-2024%5Cmangoteca%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cproyects-2024%5Cmangoteca%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=F%3A%5Cproyects-2024%5Cmangoteca%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cproyects-2024%5Cmangoteca%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var F_proyects_2024_mangoteca_frontend_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"F:\\\\proyects-2024\\\\mangoteca\\\\frontend\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: F_proyects_2024_mangoteca_frontend_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1GJTNBJTVDcHJveWVjdHMtMjAyNCU1Q21hbmdvdGVjYSU1Q2Zyb250ZW5kJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1GJTNBJTVDcHJveWVjdHMtMjAyNCU1Q21hbmdvdGVjYSU1Q2Zyb250ZW5kJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUMrQjtBQUM1RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL21hbmdvdGVjYS8/NTQyNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJGOlxcXFxwcm95ZWN0cy0yMDI0XFxcXG1hbmdvdGVjYVxcXFxmcm9udGVuZFxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJGOlxcXFxwcm95ZWN0cy0yMDI0XFxcXG1hbmdvdGVjYVxcXFxmcm9udGVuZFxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=F%3A%5Cproyects-2024%5Cmangoteca%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cproyects-2024%5Cmangoteca%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _next_auth_mongodb_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @next-auth/mongodb-adapter */ \"(rsc)/./node_modules/@next-auth/mongodb-adapter/dist/index.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nconst authOptions = {\n    adapter: (0,_next_auth_mongodb_adapter__WEBPACK_IMPORTED_MODULE_2__.MongoDBAdapter)(_lib_mongodb__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                const user = await _models_User__WEBPACK_IMPORTED_MODULE_4__[\"default\"].findOne({\n                    email: credentials.email\n                });\n                if (!user || !user.password) {\n                    return null;\n                }\n                const isPasswordCorrect = await bcryptjs__WEBPACK_IMPORTED_MODULE_5___default().compare(credentials.password, user.password);\n                if (!isPasswordCorrect) {\n                    return null;\n                }\n                return {\n                    id: user._id.toString(),\n                    email: user.email,\n                    name: user.username,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/auth/login\"\n    }\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFxRDtBQUNZO0FBQ047QUFDbEI7QUFDVDtBQUNIO0FBRXRCLE1BQU1NLGNBQStCO0lBQzFDQyxTQUFTTCwwRUFBY0EsQ0FBQ0Msb0RBQWFBO0lBQ3JDSyxXQUFXO1FBQ1RQLDJFQUFtQkEsQ0FBQztZQUNsQlEsTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFPO2dCQUN0Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVO29CQUNqRCxPQUFPO2dCQUNUO2dCQUVBLE1BQU1FLE9BQU8sTUFBTVosb0RBQUlBLENBQUNhLE9BQU8sQ0FBQztvQkFBRU4sT0FBT0QsWUFBWUMsS0FBSztnQkFBQztnQkFFM0QsSUFBSSxDQUFDSyxRQUFRLENBQUNBLEtBQUtGLFFBQVEsRUFBRTtvQkFDM0IsT0FBTztnQkFDVDtnQkFFQSxNQUFNSSxvQkFBb0IsTUFBTWIsdURBQWMsQ0FBQ0ssWUFBWUksUUFBUSxFQUFFRSxLQUFLRixRQUFRO2dCQUVsRixJQUFJLENBQUNJLG1CQUFtQjtvQkFDdEIsT0FBTztnQkFDVDtnQkFFQSxPQUFPO29CQUNMRSxJQUFJSixLQUFLSyxHQUFHLENBQUNDLFFBQVE7b0JBQ3JCWCxPQUFPSyxLQUFLTCxLQUFLO29CQUNqQkYsTUFBTU8sS0FBS08sUUFBUTtvQkFDbkJDLE1BQU1SLEtBQUtRLElBQUk7Z0JBQ2pCO1lBQ0Y7UUFDRjtLQUNEO0lBQ0RDLFNBQVM7UUFDUEMsVUFBVTtJQUNaO0lBQ0FDLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRWIsSUFBSSxFQUFFO1lBQ3ZCLElBQUlBLE1BQU07Z0JBQ1JhLE1BQU1ULEVBQUUsR0FBR0osS0FBS0ksRUFBRTtnQkFDbEJTLE1BQU1MLElBQUksR0FBR1IsS0FBS1EsSUFBSTtZQUN4QjtZQUNBLE9BQU9LO1FBQ1Q7UUFDQSxNQUFNSixTQUFRLEVBQUVBLE9BQU8sRUFBRUksS0FBSyxFQUFFO1lBQzlCLElBQUlKLFFBQVFULElBQUksRUFBRTtnQkFDaEJTLFFBQVFULElBQUksQ0FBQ0ksRUFBRSxHQUFHUyxNQUFNVCxFQUFFO2dCQUMxQkssUUFBUVQsSUFBSSxDQUFDUSxJQUFJLEdBQUdLLE1BQU1MLElBQUk7WUFDaEM7WUFDQSxPQUFPQztRQUNUO0lBQ0Y7SUFDQUssT0FBTztRQUNMQyxRQUFRO0lBQ1Y7QUFDRixFQUFDO0FBRUQsTUFBTUMsVUFBVWhDLGdEQUFRQSxDQUFDTTtBQUVpQiIsInNvdXJjZXMiOlsid2VicGFjazovL21hbmdvdGVjYS8uL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzP2M4YTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoLCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gJ25leHQtYXV0aCdcclxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscydcclxuaW1wb3J0IHsgTW9uZ29EQkFkYXB0ZXIgfSBmcm9tICdAbmV4dC1hdXRoL21vbmdvZGItYWRhcHRlcidcclxuaW1wb3J0IGNsaWVudFByb21pc2UgZnJvbSAnQC9saWIvbW9uZ29kYidcclxuaW1wb3J0IFVzZXIgZnJvbSAnQC9tb2RlbHMvVXNlcidcclxuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcydcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xyXG4gIGFkYXB0ZXI6IE1vbmdvREJBZGFwdGVyKGNsaWVudFByb21pc2UpLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XHJcbiAgICAgIG5hbWU6ICdDcmVkZW50aWFscycsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJ0ZXh0XCIgfSxcclxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfVxyXG4gICAgICB9LFxyXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcclxuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9KVxyXG5cclxuICAgICAgICBpZiAoIXVzZXIgfHwgIXVzZXIucGFzc3dvcmQpIHtcclxuICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpc1Bhc3N3b3JkQ29ycmVjdCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKVxyXG5cclxuICAgICAgICBpZiAoIWlzUGFzc3dvcmRDb3JyZWN0KSB7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGlkOiB1c2VyLl9pZC50b1N0cmluZygpLFxyXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICBuYW1lOiB1c2VyLnVzZXJuYW1lLFxyXG4gICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICBdLFxyXG4gIHNlc3Npb246IHtcclxuICAgIHN0cmF0ZWd5OiAnand0JyxcclxuICB9LFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZFxyXG4gICAgICAgIHRva2VuLnJvbGUgPSB1c2VyLnJvbGVcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG9rZW5cclxuICAgIH0sXHJcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xyXG4gICAgICBpZiAoc2Vzc2lvbi51c2VyKSB7XHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uaWQgYXMgc3RyaW5nXHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLnJvbGUgPSB0b2tlbi5yb2xlIGFzIHN0cmluZ1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZXNzaW9uXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogJy9hdXRoL2xvZ2luJyxcclxuICB9LFxyXG59XHJcblxyXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpXHJcblxyXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH0iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiTW9uZ29EQkFkYXB0ZXIiLCJjbGllbnRQcm9taXNlIiwiVXNlciIsImJjcnlwdCIsImF1dGhPcHRpb25zIiwiYWRhcHRlciIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZE9uZSIsImlzUGFzc3dvcmRDb3JyZWN0IiwiY29tcGFyZSIsImlkIiwiX2lkIiwidG9TdHJpbmciLCJ1c2VybmFtZSIsInJvbGUiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInBhZ2VzIiwic2lnbkluIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nif (false) {}\nconst uri = \"mongodb+srv://LucaDevArg:LUkQGTwbBU4GDRW9@twitterclonecluster.2sleo.mongodb.net/mangoteca?retryWrites=true&w=majority\";\nconst options = {};\nlet client;\nlet clientPromise;\nif (true) {\n    // In development mode, use a global variable so that the value\n    // is preserved across module reloads caused by HMR (Hot Module Replacement).\n    if (!global._mongoClientPromise) {\n        client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri, options);\n        global._mongoClientPromise = client.connect();\n    }\n    clientPromise = global._mongoClientPromise;\n} else {}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clientPromise);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBcUM7QUFFckMsSUFBSSxLQUF3QixFQUFFLEVBRTdCO0FBRUQsTUFBTUssTUFBTUosdUhBQXVCO0FBQ25DLE1BQU1LLFVBQVUsQ0FBQztBQUVqQixJQUFJQztBQUNKLElBQUlDO0FBRUosSUFBSVAsSUFBeUIsRUFBZTtJQUMxQywrREFBK0Q7SUFDL0QsNkVBQTZFO0lBQzdFLElBQUksQ0FBQ1EsT0FBT0MsbUJBQW1CLEVBQUU7UUFDL0JILFNBQVMsSUFBSVAsZ0RBQVdBLENBQUNLLEtBQUtDO1FBQzlCRyxPQUFPQyxtQkFBbUIsR0FBR0gsT0FBT0ksT0FBTztJQUM3QztJQUNBSCxnQkFBZ0JDLE9BQU9DLG1CQUFtQjtBQUM1QyxPQUFPLEVBSU47QUFFRCxpRUFBZUYsYUFBYUEsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL21hbmdvdGVjYS8uL2xpYi9tb25nb2RiLnRzPzA1YmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uZ29DbGllbnQgfSBmcm9tICdtb25nb2RiJ1xyXG5cclxuaWYgKCFwcm9jZXNzLmVudi5NT05HT0RCX1VSSSkge1xyXG4gIHRocm93IG5ldyBFcnJvcignSW52YWxpZC9NaXNzaW5nIGVudmlyb25tZW50IHZhcmlhYmxlOiBcIk1PTkdPREJfVVJJXCInKVxyXG59XHJcblxyXG5jb25zdCB1cmkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSVxyXG5jb25zdCBvcHRpb25zID0ge31cclxuXHJcbmxldCBjbGllbnRcclxubGV0IGNsaWVudFByb21pc2U6IFByb21pc2U8TW9uZ29DbGllbnQ+XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAvLyBJbiBkZXZlbG9wbWVudCBtb2RlLCB1c2UgYSBnbG9iYWwgdmFyaWFibGUgc28gdGhhdCB0aGUgdmFsdWVcclxuICAvLyBpcyBwcmVzZXJ2ZWQgYWNyb3NzIG1vZHVsZSByZWxvYWRzIGNhdXNlZCBieSBITVIgKEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQpLlxyXG4gIGlmICghZ2xvYmFsLl9tb25nb0NsaWVudFByb21pc2UpIHtcclxuICAgIGNsaWVudCA9IG5ldyBNb25nb0NsaWVudCh1cmksIG9wdGlvbnMpXHJcbiAgICBnbG9iYWwuX21vbmdvQ2xpZW50UHJvbWlzZSA9IGNsaWVudC5jb25uZWN0KClcclxuICB9XHJcbiAgY2xpZW50UHJvbWlzZSA9IGdsb2JhbC5fbW9uZ29DbGllbnRQcm9taXNlXHJcbn0gZWxzZSB7XHJcbiAgLy8gSW4gcHJvZHVjdGlvbiBtb2RlLCBpdCdzIGJlc3QgdG8gbm90IHVzZSBhIGdsb2JhbCB2YXJpYWJsZS5cclxuICBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpLCBvcHRpb25zKVxyXG4gIGNsaWVudFByb21pc2UgPSBjbGllbnQuY29ubmVjdCgpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsaWVudFByb21pc2UiXSwibmFtZXMiOlsiTW9uZ29DbGllbnQiLCJwcm9jZXNzIiwiZW52IiwiTU9OR09EQl9VUkkiLCJFcnJvciIsInVyaSIsIm9wdGlvbnMiLCJjbGllbnQiLCJjbGllbnRQcm9taXNlIiwiZ2xvYmFsIiwiX21vbmdvQ2xpZW50UHJvbWlzZSIsImNvbm5lY3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./models/User.ts":
/*!************************!*\
  !*** ./models/User.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst readingProgressSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    manga: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId,\n        ref: \"Manga\"\n    },\n    lastReadChapter: {\n        type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId,\n        ref: \"Chapter\"\n    },\n    chaptersRead: [\n        {\n            type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId,\n            ref: \"Chapter\"\n        }\n    ],\n    lastReadPage: {\n        type: Number,\n        default: 1\n    },\n    readingStatus: {\n        type: String,\n        enum: [\n            \"planning\",\n            \"reading\",\n            \"completed\",\n            \"dropped\"\n        ],\n        default: \"reading\"\n    }\n});\nconst listSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: String,\n        required: true\n    },\n    description: {\n        type: String\n    },\n    isPublic: {\n        type: Boolean,\n        default: true\n    },\n    mangas: [\n        {\n            type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId,\n            ref: \"Manga\"\n        }\n    ]\n}, {\n    timestamps: true\n});\nconst userSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    username: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    email: {\n        type: String,\n        required: true,\n        unique: true\n    },\n    password: {\n        type: String,\n        required: true\n    },\n    profileImage: {\n        type: String\n    },\n    role: {\n        type: String,\n        enum: [\n            \"user\",\n            \"moderator\",\n            \"admin\"\n        ],\n        default: \"user\"\n    },\n    readingProgress: [\n        readingProgressSchema\n    ],\n    bookmarks: [\n        {\n            type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId,\n            ref: \"Manga\"\n        }\n    ],\n    lists: [\n        listSchema\n    ],\n    preferences: {\n        contentFilter: {\n            type: String,\n            enum: [\n                \"safe\",\n                \"suggestive\",\n                \"erotica\",\n                \"pornographic\"\n            ],\n            default: \"safe\"\n        },\n        notificationSettings: {\n            newChapters: {\n                type: Boolean,\n                default: true\n            },\n            comments: {\n                type: Boolean,\n                default: true\n            },\n            messages: {\n                type: Boolean,\n                default: true\n            }\n        }\n    },\n    activityLog: [\n        {\n            action: {\n                type: String,\n                enum: [\n                    \"read\",\n                    \"rate\",\n                    \"comment\",\n                    \"bookmark\"\n                ],\n                required: true\n            },\n            manga: {\n                type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId,\n                ref: \"Manga\"\n            },\n            chapter: {\n                type: mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema.Types.ObjectId,\n                ref: \"Chapter\"\n            },\n            timestamp: {\n                type: Date,\n                default: Date.now\n            }\n        }\n    ]\n}, {\n    timestamps: true\n});\nuserSchema.index({\n    username: \"text\",\n    email: \"text\"\n});\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", userSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksSUFBSS9DLHFEQUFjLENBQVEsUUFBUXdCO0FBRWpGLGlFQUFldUIsSUFBSUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hbmdvdGVjYS8uL21vZGVscy9Vc2VyLnRzPzZkYzYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7IERvY3VtZW50LCBNb2RlbCwgU2NoZW1hIH0gZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuaW50ZXJmYWNlIElSZWFkaW5nUHJvZ3Jlc3Mge1xyXG4gIG1hbmdhOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZDtcclxuICBsYXN0UmVhZENoYXB0ZXI6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkO1xyXG4gIGNoYXB0ZXJzUmVhZDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWRbXTtcclxuICBsYXN0UmVhZFBhZ2U6IG51bWJlcjtcclxuICByZWFkaW5nU3RhdHVzOiAncGxhbm5pbmcnIHwgJ3JlYWRpbmcnIHwgJ2NvbXBsZXRlZCcgfCAnZHJvcHBlZCc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJTGlzdCB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xyXG4gIGlzUHVibGljOiBib29sZWFuO1xyXG4gIG1hbmdhczogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWRbXTtcclxufVxyXG5cclxuaW50ZXJmYWNlIElBY3Rpdml0eUxvZyB7XHJcbiAgYWN0aW9uOiAncmVhZCcgfCAncmF0ZScgfCAnY29tbWVudCcgfCAnYm9va21hcmsnO1xyXG4gIG1hbmdhOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZDtcclxuICBjaGFwdGVyPzogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQ7XHJcbiAgdGltZXN0YW1wOiBEYXRlO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSVVzZXIgZXh0ZW5kcyBEb2N1bWVudCB7XHJcbiAgdXNlcm5hbWU6IHN0cmluZztcclxuICBlbWFpbDogc3RyaW5nO1xyXG4gIHBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgcHJvZmlsZUltYWdlPzogc3RyaW5nO1xyXG4gIHJvbGU6ICd1c2VyJyB8ICdtb2RlcmF0b3InIHwgJ2FkbWluJztcclxuICByZWFkaW5nUHJvZ3Jlc3M6IElSZWFkaW5nUHJvZ3Jlc3NbXTtcclxuICBib29rbWFya3M6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkW107XHJcbiAgbGlzdHM6IElMaXN0W107XHJcbiAgcHJlZmVyZW5jZXM6IHtcclxuICAgIGNvbnRlbnRGaWx0ZXI6ICdzYWZlJyB8ICdzdWdnZXN0aXZlJyB8ICdlcm90aWNhJyB8ICdwb3Jub2dyYXBoaWMnO1xyXG4gICAgbm90aWZpY2F0aW9uU2V0dGluZ3M6IHtcclxuICAgICAgbmV3Q2hhcHRlcnM6IGJvb2xlYW47XHJcbiAgICAgIGNvbW1lbnRzOiBib29sZWFuO1xyXG4gICAgICBtZXNzYWdlczogYm9vbGVhbjtcclxuICAgIH07XHJcbiAgfTtcclxuICBhY3Rpdml0eUxvZzogSUFjdGl2aXR5TG9nW107XHJcbn1cclxuXHJcbmNvbnN0IHJlYWRpbmdQcm9ncmVzc1NjaGVtYSA9IG5ldyBTY2hlbWE8SVJlYWRpbmdQcm9ncmVzcz4oe1xyXG4gIG1hbmdhOiB7IHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiAnTWFuZ2EnIH0sXHJcbiAgbGFzdFJlYWRDaGFwdGVyOiB7IHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiAnQ2hhcHRlcicgfSxcclxuICBjaGFwdGVyc1JlYWQ6IFt7IHR5cGU6IFNjaGVtYS5UeXBlcy5PYmplY3RJZCwgcmVmOiAnQ2hhcHRlcicgfV0sXHJcbiAgbGFzdFJlYWRQYWdlOiB7IHR5cGU6IE51bWJlciwgZGVmYXVsdDogMSB9LFxyXG4gIHJlYWRpbmdTdGF0dXM6IHsgdHlwZTogU3RyaW5nLCBlbnVtOiBbJ3BsYW5uaW5nJywgJ3JlYWRpbmcnLCAnY29tcGxldGVkJywgJ2Ryb3BwZWQnXSwgZGVmYXVsdDogJ3JlYWRpbmcnIH0sXHJcbn0pO1xyXG5cclxuY29uc3QgbGlzdFNjaGVtYSA9IG5ldyBTY2hlbWE8SUxpc3Q+KHtcclxuICBuYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcclxuICBkZXNjcmlwdGlvbjogeyB0eXBlOiBTdHJpbmcgfSxcclxuICBpc1B1YmxpYzogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiB0cnVlIH0sXHJcbiAgbWFuZ2FzOiBbeyB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogJ01hbmdhJyB9XSxcclxufSwge1xyXG4gIHRpbWVzdGFtcHM6IHRydWUsXHJcbn0pO1xyXG5cclxuY29uc3QgdXNlclNjaGVtYSA9IG5ldyBTY2hlbWE8SVVzZXI+KHtcclxuICB1c2VybmFtZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCB1bmlxdWU6IHRydWUgfSxcclxuICBlbWFpbDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlLCB1bmlxdWU6IHRydWUgfSxcclxuICBwYXNzd29yZDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgcHJvZmlsZUltYWdlOiB7IHR5cGU6IFN0cmluZyB9LFxyXG4gIHJvbGU6IHsgdHlwZTogU3RyaW5nLCBlbnVtOiBbJ3VzZXInLCAnbW9kZXJhdG9yJywgJ2FkbWluJ10sIGRlZmF1bHQ6ICd1c2VyJyB9LFxyXG4gIHJlYWRpbmdQcm9ncmVzczogW3JlYWRpbmdQcm9ncmVzc1NjaGVtYV0sXHJcbiAgYm9va21hcmtzOiBbeyB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SWQsIHJlZjogJ01hbmdhJyB9XSxcclxuICBsaXN0czogW2xpc3RTY2hlbWFdLFxyXG4gIHByZWZlcmVuY2VzOiB7XHJcbiAgICBjb250ZW50RmlsdGVyOiB7IHR5cGU6IFN0cmluZywgZW51bTogWydzYWZlJywgJ3N1Z2dlc3RpdmUnLCAnZXJvdGljYScsICdwb3Jub2dyYXBoaWMnXSwgZGVmYXVsdDogJ3NhZmUnIH0sXHJcbiAgICBub3RpZmljYXRpb25TZXR0aW5nczoge1xyXG4gICAgICBuZXdDaGFwdGVyczogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiB0cnVlIH0sXHJcbiAgICAgIGNvbW1lbnRzOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IHRydWUgfSxcclxuICAgICAgbWVzc2FnZXM6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogdHJ1ZSB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGFjdGl2aXR5TG9nOiBbe1xyXG4gICAgYWN0aW9uOiB7IHR5cGU6IFN0cmluZywgZW51bTogWydyZWFkJywgJ3JhdGUnLCAnY29tbWVudCcsICdib29rbWFyayddLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gICAgbWFuZ2E6IHsgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLCByZWY6ICdNYW5nYScgfSxcclxuICAgIGNoYXB0ZXI6IHsgdHlwZTogU2NoZW1hLlR5cGVzLk9iamVjdElkLCByZWY6ICdDaGFwdGVyJyB9LFxyXG4gICAgdGltZXN0YW1wOiB7IHR5cGU6IERhdGUsIGRlZmF1bHQ6IERhdGUubm93IH0sXHJcbiAgfV0sXHJcbn0sIHtcclxuICB0aW1lc3RhbXBzOiB0cnVlLFxyXG59KTtcclxuXHJcbnVzZXJTY2hlbWEuaW5kZXgoeyB1c2VybmFtZTogJ3RleHQnLCBlbWFpbDogJ3RleHQnIH0pO1xyXG5cclxuY29uc3QgVXNlcjogTW9kZWw8SVVzZXI+ID0gbW9uZ29vc2UubW9kZWxzLlVzZXIgfHwgbW9uZ29vc2UubW9kZWw8SVVzZXI+KCdVc2VyJywgdXNlclNjaGVtYSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVc2VyOyJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlNjaGVtYSIsInJlYWRpbmdQcm9ncmVzc1NjaGVtYSIsIm1hbmdhIiwidHlwZSIsIlR5cGVzIiwiT2JqZWN0SWQiLCJyZWYiLCJsYXN0UmVhZENoYXB0ZXIiLCJjaGFwdGVyc1JlYWQiLCJsYXN0UmVhZFBhZ2UiLCJOdW1iZXIiLCJkZWZhdWx0IiwicmVhZGluZ1N0YXR1cyIsIlN0cmluZyIsImVudW0iLCJsaXN0U2NoZW1hIiwibmFtZSIsInJlcXVpcmVkIiwiZGVzY3JpcHRpb24iLCJpc1B1YmxpYyIsIkJvb2xlYW4iLCJtYW5nYXMiLCJ0aW1lc3RhbXBzIiwidXNlclNjaGVtYSIsInVzZXJuYW1lIiwidW5pcXVlIiwiZW1haWwiLCJwYXNzd29yZCIsInByb2ZpbGVJbWFnZSIsInJvbGUiLCJyZWFkaW5nUHJvZ3Jlc3MiLCJib29rbWFya3MiLCJsaXN0cyIsInByZWZlcmVuY2VzIiwiY29udGVudEZpbHRlciIsIm5vdGlmaWNhdGlvblNldHRpbmdzIiwibmV3Q2hhcHRlcnMiLCJjb21tZW50cyIsIm1lc3NhZ2VzIiwiYWN0aXZpdHlMb2ciLCJhY3Rpb24iLCJjaGFwdGVyIiwidGltZXN0YW1wIiwiRGF0ZSIsIm5vdyIsImluZGV4IiwiVXNlciIsIm1vZGVscyIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/User.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/oidc-token-hash","vendor-chunks/bcryptjs","vendor-chunks/preact","vendor-chunks/cookie","vendor-chunks/@next-auth"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=F%3A%5Cproyects-2024%5Cmangoteca%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=F%3A%5Cproyects-2024%5Cmangoteca%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();