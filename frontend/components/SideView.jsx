"use client"

import React from 'react'
import Image from 'next/image'
import { useUserContext } from '@/hooks/useUserContextHook'
import { useLogout } from '@/hooks/useLogout'
import { usePathname } from 'next/navigation'
import UserLinks from './UserLinks'

const SideView = ({ viewText, sideWidth }) => {
  const { user } = useUserContext()
  const pathname = usePathname()

  const checkPathname = () => {
    if (pathname !== "/login" && pathname !== "/register") {
      return true
    } else {
      return false
    }
  }

  return (
    <div className={`side h-[20vh] ${checkPathname() ? 'md:h-screen' : 'md:h-[25vh]'} lg:h-screen ${sideWidth}`}>
      <Image src='/logo.svg' width={34} height={53} className='absolute left-5 md:left-7 top-7 w-5 h-auto lg:w-auto cursor-pointer' alt='Logo' title='Strateg In' />
      <h1 className='font-bold font-dmSans text-white text-4xl lg:text-[4rem] lg:max-w-80 md:leading-normal'>{viewText}</h1>
      {user && <UserLinks path={user._id} />}
    </div>
  )
}

export default SideView
