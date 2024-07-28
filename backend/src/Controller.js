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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Model_1 = __importDefault(require("./Model"));
const router = (0, express_1.Router)();
// Add the todo
router.post('/todo', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const newTodo = yield Model_1.default.create({ title, description });
        if (newTodo) {
            res.status(201).json(newTodo);
        }
        else {
            res.status(400).json({ message: 'Invalid todo data' });
        }
    }
    catch (error) {
        next(error);
    }
}));
// Get all todos
router.get('/todos', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Model_1.default.find();
        if (todos.length > 0) {
            res.json(todos);
        }
        else {
            res.status(404).json({ message: 'No todos found' });
        }
    }
    catch (error) {
        next(error);
    }
}));
// update the todo
router.put('/todo/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedTodo = yield Model_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedTodo) {
            res.json(updatedTodo);
        }
        else {
            res.status(404).json({ message: 'No todo found with that id' });
        }
    }
    catch (error) {
        next(error);
    }
}));
// delete the todo
router.delete('/todo/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTodo = yield Model_1.default.findByIdAndDelete(id);
        if (deletedTodo) {
            res.json(deletedTodo);
        }
        else {
            res.status(404).json({ message: 'No todo found with that id' });
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
