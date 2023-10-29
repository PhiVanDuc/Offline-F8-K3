import moment from "moment/moment";
import "./assets/style.css";
import "./assets/style.scss";
import config from "./config.json";
import img01 from "./assets/images/img01.jpg";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const App = () => {
    const { SERVER_API, PAGE_LIMIT } = config;
    console.log(process.env.SERVER_API);
    console.log(process.env.MAIL_SERVER);
    console.log(process.env.NODE_ENV);
    return `
    ${Header()}
    <h1>Trang chủ</h1>
    <h2>${moment().format("DD/MM/YYYY hh:mm:ss")}</h2>
    <h2>${SERVER_API} - ${PAGE_LIMIT}</h2>
    <div class="content">
        <h2>Học JS không khó!</h2>
        <a href="#!">Đăng kí khóa học</a>
    </div>
    ${Footer()}
    `;
}