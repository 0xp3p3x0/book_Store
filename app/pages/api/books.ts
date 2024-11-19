import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const backendUrl = "http://localhost:8000";  // URL to your FastAPI server

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { data } = await axios.get(`${backendUrl}/books`, {
        params: req.query,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch books" });
    }
  } else if (req.method === "POST") {
    try {
      const { data } = await axios.post(`${backendUrl}/books`, req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to create book" });
    }
  }
}
