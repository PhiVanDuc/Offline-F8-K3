import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import LogoutButton from './LogoutButton'

export default function Profile() {
    const { user, isLoading } = useAuth0();
    const [content, setContent] = useState({
      email: "",
      support: ""
    });

    const handleOnChange = (e) => {
      setContent({
        ...content,
        [e.target.name]: e.target.value,
      })
    }

    return (
      <>
        {
          !isLoading && (
            <div className='profile'>
              <div className='profile-info'>
                <img src={user.picture} alt={user.name} className='profile-image' />
                <h2 className='profile-welcome'>Xin chào {user.name}!</h2>
                <p className='profile-location'>Vị trí: {user.locale === "vi" ? "Việt Nam" : "Nước Ngoài"}</p>
                <p className='profile-email'>Email: <a href={`mailto:${user.email}`}>{user.email}</a></p>

                <div className="form-group">
                  <input type="email" name="email" className='input-email' id="input-email" placeholder=" " onChange={handleOnChange}/>
                  <label htmlFor="input-email">Email của bạn *</label>
                </div>

                <div className="form-group">
                  <textarea name="support" className='textarea-message' id="textarea-message" placeholder=" " onChange={handleOnChange}></textarea>
                  <label htmlFor="textarea-message">Tin nhắn *</label>
                </div>

                <button className='btn-support'>Yêu cầu hỗ trợ!</button>
              </div>

              <LogoutButton />
            </div>
          )
        }
      </>
    );
}