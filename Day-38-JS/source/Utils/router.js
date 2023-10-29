import Navigo from "navigo";
import {error} from "../error";

export const router = (array, layout) => {
    const objRouter = new Navigo("https://phivanduc.github.io/Offline-F8-K3/", {linksSelector: "a"});
    const app = document.querySelector("#app");
    
    array.forEach((obj) => {
        objRouter.on(obj.path, (data) => {
            // console.log(data);
            app.innerHTML = layout(obj.component(data));
            const button = app.querySelector("button");
            if (button) button.onclick = () =>{ objRouter.navigate("/san-pham"); }
        });
    });

    objRouter.notFound(() => {
        document.body.innerHTML = error();
    });

    objRouter.resolve();
}