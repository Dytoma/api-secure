"use client"

import SideView from "@/components/SideView"
import Redirection from "@/components/Redirection"
import RegisterForm from "@/components/RegisterForm"
import { useUserContext } from "@/context/useUserContextHook"
import { useRouter } from "next/navigation"

const Page = () => {
  const { user } = useUserContext()
  const router = useRouter()

  if (user) {
    router.push(`/${user._id}`)
  }
  return (
    <div className="page_layout">
      <SideView viewText="Register Now!" sideWidth='w-screen lg:w-[47vw]' />
      <div className="form_view">
        <div className="w-full">
          <h2 className="form_title">Let's get you in!</h2>


          <RegisterForm />
          <Redirection linkRoute="/login" linkText="Login" question="Already registered?" />
        </div>
      </div>
    </div>
  )
}

export default Page
