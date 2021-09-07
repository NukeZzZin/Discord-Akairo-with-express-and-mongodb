import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const app = express();

dotenv.config();
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json({ inflate: true, limit: 1024000 }));
app.use(bodyParser.urlencoded({ extended: true }));

for(const routes of fs.readdirSync(path.resolve(__dirname, "./routes/")).filter(routes => routes.endsWith(".ts"))) {
    app.use(require(path.resolve(__dirname, `./routes/${routes}`)));
}

export default app;