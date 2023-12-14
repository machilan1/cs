"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DrizzleService = void 0;
var postgres_js_1 = require("drizzle-orm/postgres-js");
var postgres_1 = require("postgres");
var common_1 = require("@nestjs/common");
var schema = require("./schema");
var DrizzleService = /** @class */ (function () {
    function DrizzleService() {
    }
    DrizzleService.prototype.createDbClient = function () {
        if (this.db) {
            return this.db;
        }
        var conn = process.env['DB_URL'];
        console.log({ conn: conn });
        this.assertConnectionStringIsProvided(conn);
        var queryClient = (0, postgres_1["default"])(conn !== null && conn !== void 0 ? conn : 'postgres://postgres:123456@localhost:5433/db');
        return (0, postgres_js_1.drizzle)(queryClient, { logger: true, schema: schema });
    };
    DrizzleService.prototype.assertConnectionStringIsProvided = function (conn) {
        if (!conn) {
            throw new Error('Conn not provided');
        }
    };
    DrizzleService = __decorate([
        (0, common_1.Injectable)()
    ], DrizzleService);
    return DrizzleService;
}());
exports.DrizzleService = DrizzleService;
