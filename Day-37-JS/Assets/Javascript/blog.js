import { client } from "./client.js";
import { requestRefresh } from "./token.js";


const root = document.querySelector(".root");
let pages = 1;


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

                <form class="form-post">
                    <h3 class="post-heading mb-3 mt-4">Đăng bài viết mới</h3>
                    <div class="form-group mb-3">
                        <label for="" class="label-title mb-2">Tiêu đề:</label>
                        <input type="text" class="input-title form-control" placeholder="Title">
                    </div>

                    <div class="form-group mb-3">
                        <label for="" class="label-content mb-2">Nội dung:</label>
                        <textarea class="textarea-content form-control" style="resize: none; height: 150px;" placeholder="Content"></textarea>
                    </div>

                    <div class="btn-post">
                        <button class="btn btn-primary">Đăng bài</button>
                    </div>
                </form>

                <hr />

                <h3 class="posts-heading mb-4">Các bài viết</h3>
                <div class="posts"></div>
            </div>
            `;

            this.getProfile();
            this.eventLogout();
            this.getBlogs(pages);
            this.addBlog();
            this.loadMoreBlogs();
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

        const emailElement = formLogin.querySelector(".input-email");
        const passwordElement = formLogin.querySelector(".input-password");
        emailElement.value = "phivanduc@gmail.com";
        passwordElement.value = "phivanduc";

        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
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

        const { data, response } = await client.get("/users/profile");
        if (response.ok) {
            profileName.innerText = data.data.name;
        }
        else {
            const newToken = requestRefresh(refreshToken);
            if (newToken) {
                localStorage.setItem("login_tokens", JSON.stringify(newToken));
                // this.render();
            }
            else {
                this.handleLogout();
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
        localStorage.removeItem("login_tokens");
        this.render();
    },

    getBlogs: async function (pages) {
        const { data: blogs, response } = await client.get(`/blogs?page=${pages}`);

        if (response.ok) {
            const posts = root.querySelector(".posts");
            const listBlog = blogs.data.map((blog) => {
                return blog;
            });

            listBlog.forEach((blog) => {
                const { date, time } = this.handleTime(blog.timeUp);

                posts.innerHTML += `
                    <div class="post-block">
                        <div class="post-content-wrap">
                            <p class="username">User: <span>${blog.userId.name}</span></p>
                            <h4 class="post-block-title">Title: ${blog.title}</h4>
                            <p class="post-block-content">Content: ${blog.content}</p>
                        </div>

                        <div class="post-time-wrap">
                            <p class="post-date">${date}</p>
                            <p class="post-time">${time}</p>
                            <p></p>
                        </div>
                    </div>
                    `;
            });
        }
        else {
            console.log("=(");
        }
    },

    addBlog: function () {
        const formPost = root.querySelector(".form-post");

        const stripHtml = (html) => html.replace(/<([^>]+)>/gi, "");
        formPost.addEventListener("submit", async (e) => {
            e.preventDefault();
            const titleElement = formPost.querySelector(".input-title");
            const contentElement = formPost.querySelector(".textarea-content");
            const posts = root.querySelector(".posts");

            const { data, response } = await client.post("/blogs", {
                title: stripHtml(titleElement.value),
                content: stripHtml(contentElement.value),
            });
            console.log(data);

            if (response.ok) {
                const { date, time } = this.handleTime(data.data.timeUp);

                const postBlock = document.createElement("div");
                postBlock.classList.add("post-block");
                postBlock.innerHTML = `
                <div class="post-content-wrap">
                    <p class="username">User: <span>${data.data.userId.name}</span></p>
                    <h4 class="post-block-title">Title: ${data.data.title}</h4>
                    <p class="post-block-content">Content: ${data.data.content}</p>
                </div>

                <div class="post-time-wrap">
                    <p class="post-date">${date}</p>
                    <p class="post-time">${time}</p>
                    <p></p>
                </div>
                `;

                posts.prepend(postBlock);
            }
        });
    },

    handleTime: function (string) {
        const dateAndTime = string;
        const date = dateAndTime.slice(0, 10);
        const time = dateAndTime.slice(11, 19);

        return { date, time };
    },

    loadMoreBlogs: function () {
        window.addEventListener("scroll", () => {
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
                this.getBlogs(pages);
                ++pages;
            }
        });
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