import React, { useState} from 'react'
import LogoutButton from './LogoutButton'
import Loading from './Loading'
import notify from '../utilities/notify'
import { useAuth0 } from "@auth0/auth0-react"
import { ToastContainer } from 'react-toastify'
import emailjs from '@emailjs/browser'

export default function Profile() {
    const { user, isLoading } = useAuth0();
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState({
      email: user.email,
      support: "Tôi cần trợ giúp một vài vấn đề!"
    });

    const handleOnChange = (e) => {
      setContent({
        ...content,
        [e.target.name]: e.target.value,
      })
    }

    const handleBlur = (e) => {
      if (e.target.name === "email") {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) notify("warn", "Invalid Email");
      }
      else if (e.target.name === "support") {
        if (e.target.value.trim() === "") notify("warn", "Please do not leave it blank!");
      }
    }

    const sendEmail = (e) => {
      e.preventDefault();
      setLoading(true);

      const info = {
        from_name: "Phí Văn Đức",
        to_name: user.name,
        message: content.support,
      }

      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(content.email) && content.support.trim() !== "") {
        emailjs.send('service_ufasi8f', 'template_402vh2n', info, 'kpB-ZhiQNbQMAeBnw')
          .then(() => {
              notify("success", "Success send!");
          })
          .catch(() => {
            notify("error", "Failed send!");
          })
          .finally(() => {
            setLoading(false);
          })
      }
      else notify("error", "Some fields are not correct!");
    };

    return (
      <>
        {
          !isLoading && (
            <div className='profile'>
              <form className='profile-info' onSubmit={sendEmail}>
                <img src={user.picture} alt={user.name} className='profile-image' />
                <h2 className='profile-welcome'>Xin chào {user.name}!</h2>
                <p className='profile-location'>Vị trí: {user.locale === "vi" ? "Việt Nam" : "Nước Ngoài"}</p>
                <p className='profile-email'>Email: <a href={`mailto:${user.email}`}>{user.email}</a></p>

                <div className="form-group">
                  <input type="email" name="email" className='input-email' id="input-email" placeholder=" " onChange={handleOnChange} onBlur={handleBlur} value={content.email} />
                  <label htmlFor="input-email">Email của bạn *</label>
                </div>

                <div className="form-group">
                  <textarea name="support" className='textarea-message' id="textarea-message" placeholder=" " onChange={handleOnChange} onBlur={handleBlur} value={content.support}></textarea>
                  <label htmlFor="textarea-message">Tin nhắn *</label>
                </div>

                <button className='btn-support'>Yêu cầu hỗ trợ!</button>
              </form>

              <LogoutButton />
            </div>
          )
        }
        <ToastContainer />
        {
          loading && <Loading />
        }
      </>
    );
}