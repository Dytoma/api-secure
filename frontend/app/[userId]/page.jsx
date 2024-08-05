"use client"

import SideView from "@/components/SideView"
import Link from "next/link"
import { useUserContext } from "@/hooks/useUserContextHook"
import { useRouter } from "next/navigation"


const Page = () => {
  const { user } = useUserContext();
  const router = useRouter()

  if (!user) {
    return router.push('/login')
  }
  return (
    <div className="responsive_flex">
      <SideView viewText='' sideWidth='w-full md:w-24' />
      <div className="px-8 md:px-20 lg:px-64 pt-20 lg:pt-44 w-full">
        <div className="responsive_flex md:justify-between items-center gap-20 md:gap-0">
          <div className="text-center md:text-start">
            <h2 className="headline">Hello</h2>
            <h2 className="headline mt-3 md:mt-0">{`${user?.firstName} ${user?.lastName}`}</h2>
            <p className="paragraph_text mt-4">Nice to have you back!</p>
          </div>
          <div className="grid place-items-center">
            <Link href='/users' className="px-5 lg:px-20 py-5 rounded-lg text-white font-dmSans font-bold text-2xl md:text-4xl lg:text-[2.5rem] lg:leading-normal cursor-pointer bg-lightBlue w-fit btn_hover">See users</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page