import { client } from "./client.js";
import { requestRefresh } from "./token.js";


const root = document.querySelector(".root");
let pages = 1;
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
                    <div class="row align-items-center justify-content-between">
                        <div class="form-group mb-3 col-6">
                            <label class="label-title mb-2">Tiêu đề:</label>
                            <input type="text" class="input-title form-control" placeholder="Title">
                        </div>
                        <div class="form-group form-group-calendar mb-3 col-6">
                            <label class="label-calendar mb-2">Ngày đăng:</label>
                            <input class="input-calendar form-control" placeholder="MM/DD/YYYY">
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label class="label-content mb-2">Nội dung:</label>
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
            this.renderCalendar();
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
                                <label class="label-email mb-1">Nhập email:</label>
                                <input type="email" class="input-email form-control" placeholder="Email...">
                            </div>

                            <div class="form-group mb-4">
                                <label class="label-password mb-1">Nhập password:</label>
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
                                <label class="label-name mb-1">Nhập tên:</label>
                                <input type="text" class="input-name form-control" placeholder="Name...">
                            </div>

                            <div class="form-group mb-4">
                                <label class="label-email mb-1">Nhập email:</label>
                                <input type="email" class="input-email form-control" placeholder="Email...">
                            </div>

                            <div class="form-group mb-4">
                                <label class="label-password mb-1">Nhập password:</label>
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

        let oldTokens = localStorage.getItem("login_tokens");
        if (!oldTokens) {
            this.handleLogout();
            return;
        }
        oldTokens = JSON.parse(oldTokens);
        const { accessToken, refreshToken } = oldTokens;
        client.setToken(accessToken);
        
        const { response, data } = await client.get("/users/profile");
        if (!response.ok) { 
            const newTokens = await requestRefresh(refreshToken);
            if (newTokens) {
                localStorage.setItem("login_tokens", JSON.stringify(newTokens.data.token));
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

        const posts = root.querySelector(".posts");
        const textLoading = root.querySelector(".text-loading");
        const { response, data: infoBlogs } = await client.get(`/blogs?page=${pages}`);
        loadingFlag = false;
        textLoading.style.display = "none";

        if (response.ok) {
            if (!infoBlogs.data[0].userId) {
                textLoading.innerText = "Hết bài viết!";
                done = true;
                return;
            }
            infoBlogs.data.forEach((blog) => {
                if (!blog.createdAt) return;
                const { date, time } = this.getDateAndTime(blog.createdAt);
    
                posts.innerHTML += `
                <div class="post-block">
                    <div class="post-content-wrap">
                        <p class="username">User: <span>${blog.userId.name}</span></p>
                        <h4 class="post-block-title">Title: ${blog.title}</h4>
                        <p class="post-block-content">Content: ${blog.content}</p>
                    </div>
    
                    <div class="post-time-wrap text-end">
                        <p class="post-date">${date}</p>
                        <p class="post-time">${time}</p>
                        <p class="post-time-passed">Đã đăng: ${this.calcTimePassed(date, time)}</p>
                    </div>
                </div>
                `;
            });
            pages++;
        }
    },

    getDateAndTime: function(data) {
        if (!data) return;
        const stringDate = new Date(data);
        const option = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
            timeZone: "Asia/Ho_Chi_Minh"
        };

        const formattedStringDate = stringDate.toLocaleString("en-US", option);
        let { date, time } = formattedStringDate;
        let amOrPm;
        date = formattedStringDate.slice(0, 10);
        time = formattedStringDate.slice(12);

        if (+time.slice(0, 2) === 24) {
            time = "0" + time.slice(2);
        }

        if (+time.match(/^([^:]+)/)[1] >= 0 && +time.match(/^([^:]+)/)[1] <=9) amOrPm = "Sáng";
        else if ((+time.match(/^([^:]+)/)[1] >= 10 && +time.match(/^([^:]+)/)[1] <= 11)) amOrPm = "Trưa";
        else if (+time.match(/^([^:]+)/)[1] >= 12 && +time.match(/^([^:]+)/)[1] <= 17) amOrPm = "Chiều";
        else if (+time.match(/^([^:]+)/)[1] >= 18 && +time.match(/^([^:]+)/)[1] <= 21) amOrPm = "Tối";
        else amOrPm = "Đêm";
        time = time.trim() + " " + amOrPm;

        return { date, time };
    },

    calcTimePassed: function (prevDate, prevTime) {
        const objectDate = new Date();
        const currentSecond = objectDate.getSeconds().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
        const currentMinute = objectDate.getMinutes().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
        const currentHour = objectDate.getHours().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
        const currentDate = objectDate.getDate().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
        const currentMonth = objectDate.getMonth().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
        let currentYear = objectDate.getFullYear().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
        currentYear = currentYear.slice(0, 1) + currentYear.slice(2);

        prevTime = prevTime.slice(0, 8);
        const seprateTime = prevTime.split(":");
        const seprateDate = prevDate.split("/");

        if (+currentDate === +seprateDate[1] && +currentMonth + 1 === +seprateDate[0] && +currentYear === +seprateDate[2]) {
            if (+currentSecond >= +seprateTime[2] && +currentMinute === +seprateTime[1] && +currentHour === +seprateTime[0]) return "Vừa xong.";
            else if (+currentMinute > +seprateTime[1] && +currentHour === +seprateTime[0]) return +currentMinute - +seprateTime[1] + " phút.";
            else if (+currentHour > +seprateTime[0]) return +currentHour - +seprateTime[0] + " tiếng.";
        }
        else if (+currentDate > +seprateDate[1] && +currentMonth + 1 === +seprateDate[0] && +currentYear === +seprateDate[2]) return +currentDate - +seprateDate[1] + " ngày.";
        else if (+currentMonth + 1 > +seprateDate[0] && +currentYear === +seprateDate[2]) return (+currentMonth + 1) - (+seprateDate[0]) + " tháng.";
        else if (+currentYear >= +seprateDate[2]) return +currentYear - +seprateDate[2] + " năm.";
    },

    loadMoreBlogs: function() {
        window.addEventListener("scroll", () => {
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
                const textLoading = root.querySelector(".text-loading");
                if (textLoading) textLoading.style.display = "block";
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
                    localStorage.setItem("login_tokens", JSON.stringify(newTokens.data.token));
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
                    this.handleLogout();
                }
            }
        });
    },

    add: function(mainData, postsElement) {
        if (!mainData.data.createdAt) return;
        const { date, time } = this.getDateAndTime(mainData.data.createdAt);

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

    renderCalendar: function() {
        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
        let day, current, calendarIcons;
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const inputCalendarElement = root.querySelector("input.input-calendar");
        const formGroup = inputCalendarElement.parentElement;

        inputCalendarElement.addEventListener("click", () => {
            if (!formGroup.lastElementChild.classList.contains("calendar-container")) {
                const calendarContainer = document.createElement("div");
                calendarContainer.classList.add("calendar-container");
                calendarContainer.innerHTML = `
                <header class="calendar-header">
                    <p class="calendar-current-date">
                        <span class="calendar-current-date-month"></span>
                        <span class="calendar-current-date-year"></span>
                    </p>
                    <div class="calendar-navigation">
                        <i class="calendar-icon calendar-prev fa-solid fa-chevron-left"></i>
                        <i class="calendar-icon calendar-next fa-solid fa-chevron-right"></i>
                    </div>
                </header>
        
                <div class="calendar-body">
                    <ul class="calendar-weekdays">
                        <li>Sun</li>    
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                    <ul class="calendar-dates"></ul>
                </div>
                `;
                formGroup.appendChild(calendarContainer);

                day = document.querySelector(".calendar-dates");
                current = document.querySelector(".calendar-current-date");
                calendarIcons = document.querySelectorAll(".calendar-icon");

                function createCalendar() {
                    let firstDay = new Date(year, month, 1).getDay();
                    let lastDate = new Date(year, month + 1, 0).getDate();
                    let lastDay = new Date(year, month, lastDate).getDay();
                    let monthLastDate = new Date(year, month, 0).getDate();
                    let storage = "";

                    for (let i = firstDay; i > 0; i--) {
                        storage += `<li class="inactive prev-month"}>${monthLastDate - i + 1}</li>`;
                    }
                    
                    for (let i = 1; i <= lastDate; i++) {
                        let isToday = i=== date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "active" : "";
                        storage += `<li class="${isToday}">${i}</li>`; 
                    }

                    for (let i = lastDay; i < 6; i++) {
                        storage += `<li class="inactive">${i - lastDay + 1}</li>`;
                    }

                    current.children[0].innerText = `${months[month]}`;
                    current.children[1].innerText = `${year}`;
                    day.innerHTML = storage;
                }
                createCalendar();

                function chooseDate() {
                    let dates = day.querySelectorAll("li");

                    dates.forEach((date) => {
                        date.addEventListener("click", function() {
                            for(let i = 0; i < dates.length; i++) {
                                if (dates[i].classList.contains("choose")) {
                                    dates[i].classList.remove("choose");
                                    break;
                                }
                            }
                            this.classList.add("choose");
                        });
                    });
                }
                chooseDate();

                calendarIcons.forEach((icon) => {
                    icon.addEventListener("click" ,() => {
                        if (icon.classList.contains("calendar-prev")) {
                            month -= 1;
                            if (month < new Date().getMonth() && year <= new Date().getFullYear()) month += 1;
                        } else month += 1;

                        if (month < 0 || month > 11) {
                            date = new Date(year, month, new Date().getDate());
                            year = date.getFullYear();
                            month = date.getMonth();
                        }
                        else {
                            date = new Date();
                        }
                        createCalendar();
                        chooseDate();
                    });
                });
            }
        });

        document.addEventListener("click", (e) => {
            if (e.target.closest(".calendar-container")) {
                if (e.target.closest(".calendar-dates")) {
                    const calendarContainer = root.querySelector(".calendar-container");
                    const activeDate = calendarContainer.querySelector(".active");
                    let chooseDate = calendarContainer.querySelector(".choose");
                    let chooseMonth = month + 1;
                    let chooseYear = year;

                    if (chooseDate) {
                        if (activeDate) {
                            if (chooseDate.classList.contains("inactive")) {
                                chooseMonth++;
                                if (chooseMonth > 12) {
                                    chooseMonth = 0;
                                    chooseYear++;
                                }
                            }
                            else if (chooseDate.classList.contains("prev-month") || +chooseDate.innerText < +activeDate.innerText) chooseDate = activeDate;
                        }
                        else if (!activeDate) {
                            if (chooseDate.classList.contains("prev-month")) chooseMonth--;
                            else if (chooseDate.classList.contains("inactive")) {
                                chooseMonth++;
                                if (chooseMonth > 12) chooseMonth = 1;
                            }
                        }

                        inputCalendarElement.value = `${chooseMonth}/${chooseDate.innerText}/${chooseYear}`;
                        formGroup.lastElementChild.remove();
                    }
                }
            }
            else if ( e.target.classList.contains("input-calendar")) return;
            else {
                if (formGroup.lastElementChild.classList.contains("calendar-container")) {
                    formGroup.lastElementChild.remove();
                }
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