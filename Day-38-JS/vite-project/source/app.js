import { router } from "./Utils/router";
import { home } from "./components/home";
import { about } from "./components/about";
import { products } from "./components/products";
import { productDetail } from "./components/productDetail";
import { defaultLayout } from "./layouts/defaultLayout";

export const App = () => {
    return router(
        [
            {
                path: "/",
                component: home
            },
            {
                path: "/gioi-thieu",
                component: about
            },
            {
                path: "/san-pham",
                component: products
            },
            {
                path: "/san-pham/:id",
                component: productDetail
            }
        ],
        defaultLayout
    );
};