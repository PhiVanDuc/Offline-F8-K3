import { client } from "./client.js";
import { requestRefresh } from "./token.js";


const root = document.querySelector(".root");


const blog = {
    isLogin: function () {
        if (localStorage.getItem("login_tokens")) return true;
        else return false;
    },

    render: function () {
        if (!this.isLogin()) {
            root.innerHTML = `
            <div class="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
                <h2 class="heading text-center mb-5">Chào mừng bạn đến với blog</h2>
                <div class="action-btn w-100">
                    <div class="row">
                        <div class="btn-form-login col-6 d-grid">
                            <button class="btn btn-primary">Đăng nhập</button>
                        </div>
                        <div class="btn-form-register col-6 d-grid">
                            <button class="btn btn-primary">Đăng ký</button>
                        </div> 
                    </div>
                </div>
            </div>
            `;

            this.formLogin();
            this.formRegister();
        }
        else {
            root.innerHTML = `
            <div class="container py-3">
                <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
                <hr />
                <ul class="list-unstyled d-flex gap-3 profile">
                    <li>Chào bạn: <b class="name">Unknown Person</b></li>
                    <li><a href="#!" class="logout">Đăng xuất</a></li>
                </ul>
            </div>
            `;

            this.getProfile();
            this.eventLogout();
        }
    },

    formLogin: function () {
        const btnFormLogin = root.querySelector(".btn-form-login");
        btnFormLogin.addEventListener("click", () => {
            root.innerHTML = `
            <div class="container">
                <haeder class="header">
                    <div class="row mt-5 mb-5 justify-content-center">
                        <div class="col-7">
                            <div class="row">
                                <h2 class="login-heading col-6">Vui lòng đăng nhập.</h2>
                                <div class="btn-return col-6 text-end">
                                    <button class="btn btn-primary">Quay lại</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </haeder>

                <form class="form-login">
                    <div class="row justify-content-center">
                        <div class="col-7">
                            <div class="form-group mb-4">
                                <label for="" class="label-email mb-1">Nhập email:</label>
                                <input type="email" class="input-email form-control" placeholder="Email...">
                            </div>

                            <div class="form-group mb-4">
                                <label for="" class="label-password mb-1">Nhập password:</label>
                                <input type="password" class="input-password form-control" placeholder="Password...">
                            </div>

                            <div class="btn-login d-grid">
                                <button class="btn btn-primary">Đăng nhập</button>
                            </div>

                            <div class="msg text-danger"></div>
                        </div>
                    </div>
                </form>
            </div>
            `;

            const btnReturn = root.querySelector(".btn-return button");
            btnReturn.addEventListener("click", () => {
                this.render();
            });

            this.evenLogin();
        });
    },

    formRegister: function () {
        const btnFormRegister = root.querySelector(".btn-form-register");
        btnFormRegister.addEventListener("click", () => {
            root.innerHTML = `
            <div class="container">
                <haeder class="header">
                    <div class="row mt-5 mb-5 justify-content-center">
                        <div class="col-7">
                            <div class="row">
                                <h2 class="register-heading col-6">Vui lòng đăng ký.</h2>
                                <div class="btn-return col-6 text-end">
                                    <button class="btn btn-primary">Quay lại</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </haeder>

                <form class="form-register">
                    <div class="row justify-content-center">
                        <div class="col-7">
                            <div class="form-group mb-4">
                                <label for="" class="label-name mb-1">Nhập tên:</label>
                                <input type="text" class="input-name form-control" placeholder="Name...">
                            </div>

                            <div class="form-group mb-4">
                                <label for="" class="label-email mb-1">Nhập email:</label>
                                <input type="email" class="input-email form-control" placeholder="Email...">
                            </div>

                            <div class="form-group mb-4">
                                <label for="" class="label-password mb-1">Nhập password:</label>
                                <input type="password" class="input-password form-control" placeholder="Password...">
                            </div>

                            <div class="btn-register d-grid mb-5">
                                <button class="btn btn-primary">Đăng ký</button>
                            </div>
                            
                            <div class="alert" role="alert"></div>
                        </div>
                    </div>
                </form>
            </div>
            `;

            const btnReturn = root.querySelector(".btn-return button");
            btnReturn.addEventListener("click", () => {
                this.render();
            });

            this.evenRegister();
        });
    },

    evenRegister: function () {
        const formRegister = root.querySelector(".form-register");
        const alert = root.querySelector(".alert");

        formRegister.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameElement = formRegister.querySelector(".input-name");
            const emailElement = formRegister.querySelector(".input-email");
            const passwordElement = formRegister.querySelector(".input-password");
            const name = nameElement.value;
            const email = emailElement.value;
            const password = passwordElement.value;

            if (name && email && password) this.handleRegister({ name, email, password }, alert);
        });
    },

    handleRegister: async function (body, alert) {
        const btnRegister = root.querySelector(".btn-register button");

        this.addLoading(btnRegister);
        const { response, data } = await client.post("/auth/register", body);
        this.removeLoading(btnRegister);

        if (response.ok) {
            alert.classList.add("alert-success");
            alert.innerHTML = "Đăng ký thành công!";
            setTimeout(function () {
                alert.classList.remove("alert-success");
                alert.innerHTML = "";
            }, 4000);
        }
        else {
            alert.classList.add("alert-danger");
            alert.innerHTML = "Đăng ký thất bại!";
            setTimeout(function () {
                alert.classList.remove("alert-danger");
                alert.innerHTML = "";
            }, 4000);
        }
    },

    evenLogin: function () {
        const formLogin = root.querySelector(".form-login");
        const msg = root.querySelector(".msg");

        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();

            const emailElement = formLogin.querySelector(".input-email");
            const passwordElement = formLogin.querySelector(".input-password");
            const email = emailElement.value;
            const password = passwordElement.value;

            this.handleLogin({ email, password }, msg);
        });
    },

    handleLogin: async function (body, msg) {
        const btnLogin = root.querySelector(".btn-login button");

        this.addLoading(btnLogin);
        const { response, data } = await client.post("/auth/login", body);
        this.removeLoading(btnLogin);

        if (!response.ok) msg.innerHTML = "Đăng nhập thất bại!";
        else {
            const tokens = {
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken
            };
            localStorage.setItem("login_tokens", JSON.stringify(tokens));
            this.render();
        }
    },

    getProfile: async function () {
        const profileName = root.querySelector(".name");
        let loginTokens = localStorage.getItem('login_tokens');
        loginTokens = JSON.parse(loginTokens);
        const { accessToken, refreshToken } = loginTokens;
        client.setToken(accessToken);

        const { response, data: token } = await client.get("/users/profile");
        if (response.ok) {
            profileName.innerText = token.data.name;
        }
        else {
            const newAccessToken = requestRefresh(refreshToken);
            if (!newAccessToken) {
                this.handleLogout();
            }
            else {
                localStorage.setItem("login_tokens", JSON.stringify(newToken));
                this.render();
            }
        }
    },

    eventLogout: function () {
        const btnLogout = root.querySelector(".logout");
        btnLogout.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleLogout();
        });
    },

    handleLogout: async function () {
        const { response } = await client.post("/auth/logout");
        if (response.ok) {
            localStorage.removeItem("login_tokens");
            this.render();
        }
    },

    addLoading: function (btnElement) {
        btnElement.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading`;
    },

    removeLoading: function (btnElement) {
        if (btnElement.parentElement.classList.contains("btn-register")) btnElement.innerHTML = "Đăng ký";
        else btnElement.innerHTML = "Đăng nhập";
    },
}
blog.render();