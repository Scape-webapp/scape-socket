"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneGroup = exports.createGroup = void 0;
const group_schema_1 = __importDefault(require("../models/group.schema"));
const createGroup = (data) => {
    return group_schema_1.default.create(data);
};
exports.createGroup = createGroup;
const findOneGroup = (id) => {
    return group_schema_1.default.findById(id);
};
exports.findOneGroup = findOneGroup;
