"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const path_1 = __importDefault(require("path"));
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
const publicPath = path_1.default.resolve(__dirname, "..", "dist_frontend");
app.use(express_1.default.static(publicPath));
// Indexroute für die Anwendung
app.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve(publicPath, "index.html"));
});
exports.default = app;
