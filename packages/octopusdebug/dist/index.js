"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _OctopusDebug_instance;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OctopusDebug = void 0;
class OctopusDebug {
    static get instance() {
        return __classPrivateFieldGet(this, _a, "f", _OctopusDebug_instance);
    }
    static getInstance(connection) {
        var _b;
        return (_b = __classPrivateFieldGet(this, _a, "f", _OctopusDebug_instance)) !== null && _b !== void 0 ? _b : (__classPrivateFieldSet(this, _a, new _a(connection), "f", _OctopusDebug_instance));
    }
    constructor(connection) {
        this.connection = connection;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.query(`
      CREATE TABLE IF NOT EXISTS OctopusDebug (
        timestamp  TIMESTAMP    NOT NULL,
        className  VARCHAR(255) NOT NULL,
        methodName VARCHAR(255) NOT NULL,
        data       TEXT         NOT NULL,

        PRIMARY KEY (timestamp)
      )
    `);
        });
    }
    log(executionClass, executionMethod, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.query(`
      INSERT INTO OctopusDebug (timestamp, className, methodName, data)
      VALUES (?, ?, ?, ?)
    `, [new Date, executionClass.constructor.name, executionMethod.name, JSON.stringify(data)]);
        });
    }
}
exports.OctopusDebug = OctopusDebug;
_a = OctopusDebug;
_OctopusDebug_instance = { value: void 0 };
//# sourceMappingURL=index.js.map