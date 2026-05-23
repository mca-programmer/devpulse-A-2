import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import "./app/config/db";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 DevPulse Server running on port ${PORT}`);
});