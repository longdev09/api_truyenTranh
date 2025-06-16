import express from "express";
import cors from "cors";
import axios from "axios";
import { Request, Response } from "express";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get("/api/v1/*", async (req: Request, res: Response) => {
  try {
    const endpoint = req.params[0];

    const fullUrl = `https://api.mangadex.org/${endpoint}`;

    console.log("👉 Gọi đến URL:", fullUrl);
    console.log("👉 Query params:", req.query);

    const response = await axios.get(`https://api.mangadex.org/${endpoint}`, {
      params: req.query,
    });
    res.json(response.data);
  } catch (error: any) {
    console.error(error.code || error.message);
    res
      .status(500)
      .json({ error: "Lỗi khi gọi MangaDex", message: error.code });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
