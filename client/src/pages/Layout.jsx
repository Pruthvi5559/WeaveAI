import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Loading from '../components/Loading'

/*
 Job: Protects private pages (like your Account or Dashboard).
 Rule: If you are NOT logged in, it blocks you and sends you to 
  the Login page.
*/
export function AuthLayout(){
  const {user, loadingUser} = useAppContext()

  if(loadingUser) return <Loading />
  if(!user) return <Navigate to="/login" replace/>

  return <Outlet />
}

/*
 Job: Handles pages meant only for strangers (like Login or Signup).
 Rule: If you ARE already logged in, it blocks you from logging 
  in again and sends you straight inside the app.
*/
export function GuestLayout(){
  const {user, loadingUser} = useAppContext()

  if(loadingUser) return <Loading />
  if(user) return <Navigate to="/" replace/>

  return <Outlet />
}