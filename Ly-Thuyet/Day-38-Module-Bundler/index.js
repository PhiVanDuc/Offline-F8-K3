import dotenv from "dotenv";
import { App } from "./src/App";

dotenv.config();
const root = document.querySelector("#root");
root.innerHTML = App();