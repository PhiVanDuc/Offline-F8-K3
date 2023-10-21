import { client } from "./client.js";
import { requestRefresh } from "./token.js";


const root = document.querySelector(".root");
let pages = 1   ;
let loadingFlag = false;
let done = false;


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
                <p class="text-loading text-center fw-bold fs-2">Loading ...</p>
            </div>
            `;

            const textLoading = root.querySelector(".text-loading");
            textLoading.style.display = "none";

            this.getProfile();
            this.eventLogout();
            this.getBlogs();
            this.loadMoreBlogs();
            this.addBlog();
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
        const nameProfile = root.querySelector(".name");

        // Take old Tokens
        let oldTokens = localStorage.getItem("login_tokens");
        oldTokens = JSON.parse(oldTokens);
        const { accessToken, refreshToken } = oldTokens;
        client.setToken(accessToken);
        
        const { response, data } = await client.get("/users/profile");
        if (!response.ok) { 
            const newTokens = await requestRefresh(refreshToken);
            if (newTokens) {
                localStorage.setItem("login_tokens", JSON.stringify(newTokens.data.data.token));
                this.render();
            }
            else {
                this.handleLogout();
            }
        }
        else {
            nameProfile.innerText = data.data.name;
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
        if (localStorage.getItem("login_tokens")) localStorage.removeItem("login_tokens");
        this.render();
    },

    getBlogs: async function() {
        if (loadingFlag) return;
        loadingFlag = true;

        const textLoading = root.querySelector(".text-loading");
        textLoading.style.display = "none";
        const posts = root.querySelector(".posts");
        const { response, data: infoBlogs } = await client.get(`/blogs?page=${pages}`);
        loadingFlag = false;

        if (response.ok) {
            if (!infoBlogs.data) {
                done = true;
                textLoading.style.display = "block";
                textLoading.innerText = "Hết bài.";
                return;
            }

            infoBlogs.data.forEach((blog) => {
                if (!blog.createdAt) return;
                const dataTime = blog.createdAt;
                const date = dataTime.slice(0, 10);
                const time = dataTime.slice(11, 19);
    
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
            pages++;
        }
    },

    loadMoreBlogs: function() {
        window.addEventListener("scroll", () => {
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
                const textLoading = root.querySelector(".text-loading");
                textLoading.style.display = "block";
                if (done) return;
                this.getBlogs();
            }
        });
    },

    addBlog: function () {
        const formPost = root.querySelector(".form-post");

        const stripHtml = (html) => html.replace(/<([^>]+)>/gi, "");
        formPost.addEventListener("submit", async (e) => {
            e.preventDefault();
            const titleElement = formPost.querySelector(".input-title");
            const contentElement = formPost.querySelector(".textarea-content");
            const posts = root.querySelector(".posts");

            let loginTokens = localStorage.getItem("login_tokens");
            loginTokens = JSON.parse(loginTokens);
            const { accessToken, refreshToken } = loginTokens;
            client.setToken(accessToken);

            const { data, response } = await client.post("/blogs", {
                title: stripHtml(titleElement.value),
                content: stripHtml(contentElement.value),
            });

            if (response.ok) {
                this.add(data, posts);
            }
            else {
                const newTokens = await requestRefresh(refreshToken);
                if (newTokens) {
                    localStorage.setItem("login_tokens", JSON.stringify(newTokens.data.data.token));
                    console.log("Refresh lại Token");
                    loginTokens = localStorage.getItem("login_tokens");
                    loginTokens = JSON.parse(loginTokens);
                    const { accessToken } = loginTokens;
                    client.setToken(accessToken);

                    const { data } = await client.post("/blogs", {
                        title: stripHtml(titleElement.value),
                        content: stripHtml(contentElement.value),
                    });

                    this.add(data, posts);
                }
                else {
                    console.log("Refresh Token hết hạn");
                    this.handleLogout();
                }
            }
        });
    },

    add: function(mainData, postsElement) {
        console.log("Thành công!");
        if (!mainData.data.createdAt) return;
        const dataTime = mainData.data.createdAt;
        const date = dataTime.slice(0, 10);
        const time = dataTime.slice(11, 19);

        const postBlock = document.createElement("div");
        postBlock.classList.add("post-block");
        postBlock.innerHTML = `
        <div class="post-content-wrap">
            <p class="username">User: <span>${mainData.data.userId.name}</span></p>
            <h4 class="post-block-title">Title: ${mainData.data.title}</h4>
            <p class="post-block-content">Content: ${mainData.data.content}</p>
        </div>

        <div class="post-time-wrap">
            <p class="post-date">${date}</p>
            <p class="post-time">${time}</p>
            <p></p>
        </div>
        `;

        postsElement.prepend(postBlock);
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