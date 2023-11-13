import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"

export default function LogoutButton() {
    const { logout } = useAuth0();

    return (
      <div className='btn-logout'>
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.href } })}>
          Log Out
        </button>
      </div>
    );
}
