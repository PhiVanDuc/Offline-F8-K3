import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../assets/style.scss"

export const defaultLayout = function(body) {
    return `
    <header class="mb-3">
        <div class="container">
            <h1><a href="/" data-navigate>HEADER</a></h1>
        </div>
    </header>
    
    <main>
        <div class="container">
            <div class="row">
                <div class="col-3">
                    <h2>MENU</h2>
                    <ul>
                        <li><a href="/" data-navigate>Trang chủ</a></li>
                        <li><a href="/gioi-thieu" data-navigate>Giới thiệu</a></li>
                        <li><a href="/san-pham" data-navigate>Sản phẩm</a></li>
                    </ul>
                </div>
    
                <div class="col-9">
                    ${body}
                </div>
            </div>
        </div>
    </main>
    
    <footer class="mt-3">
        <div class="container">
            <h1>FOOTER</h1>
        </div>
    </footer>
    `;
}