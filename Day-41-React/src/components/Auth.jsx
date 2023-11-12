import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import LoginButton from './LoginButton'
import Profile from './Profile'
import Loading from './Loading';

export default function Auth() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <>
        {
            isLoading && <Loading />
        }
        {
            isAuthenticated ? <Profile /> : <LoginButton />
        }
    </>
  )
}
