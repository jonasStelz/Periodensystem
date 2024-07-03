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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const path_1 = __importDefault(require("path"));
const User_1 = __importDefault(require("./models/User"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", userRoutes_1.default);
const mongoURI = "mongodb://localhost:27017/mydatabase";
mongoose_1.default;
mongoose_1.default
    .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
// Statische Dateien (z.B. index.html) bereitstellen
const publicPath = path_1.default.resolve(__dirname, "dist_frontend");
app.use(express_1.default.static(publicPath));
// Indexroute für die Anwendung
app.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve(publicPath, "index.html"));
});
app.post("/api/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("hallo");
        const newUser = new User_1.default(req.body);
        yield newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.default = app;
