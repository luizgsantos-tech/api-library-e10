import express from "express";
import type { Request, Response } from "express";
import livroRoutes from "./routes/livroRoutes.js"

const app = express();

//MIDDLEWARE
app.use(express.json());
app.set("json spaces", 2);

//ROTA BASE
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("BookStore - Smart Library");
});

//REGISTRAR AS ROTAS DE "lIVROS" NA APLICAÇÃO
app.use(livroRoutes);

export default app;