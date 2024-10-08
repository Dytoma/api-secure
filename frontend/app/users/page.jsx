"use client"

import SideView from "@/components/SideView"
import { useUserContext } from "@/hooks/useUserContextHook"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useLogout } from "@/hooks/useLogout"

const Page = () => {
  const { user } = useUserContext()
  const router = useRouter()
  const [users, setUsers] = useState(null)
  const { logout } = useLogout()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/users`, {
        headers: {
          'authorization': `Dytoma ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        setUsers(json)
      } else {
        logout()
      }
    }
    if (user) {
      fetchUsers()
    }
  }, [user, users])


  return (
    <div className="responsive_flex items-center">
      <SideView sideWidth="w-full md:w-24" />
      <div className="grow w-full md:w-auto md:h-screen pt-10 md:pt-20 pl-10 md:pl-28">
        <div>
          <Link href={`/${user?._id}`} className="primary_btn">Back</Link>
        </div>
        <div className="mt-10 md:mt-24 flex flex-col gap-6 md:gap-10 overflow-y-scroll max-h-[60vh] md:max-h-[75vh]">
          {
            users ? users.map((registeredUser) => (
              <div className="flex items-center gap-6 md:gap-10" key={registeredUser._id}>
                <div className="p-5 md:p-7 rounded-full bg-slate-300">
                  <Image src='/icon.svg' width={28} height={28} alt="User Icon" />
                </div>
                <h2 className="font-dmSans text-2xl md:text-3xl lg:text-5xl">{`${registeredUser?.firstName} ${registeredUser?.lastName}`}</h2>
              </div>
            )) :
              <h3 className="font-dmSans text-xl">Loading Users..</h3>
          }
        </div>
      </div>
    </div>
  )
}

export default Page