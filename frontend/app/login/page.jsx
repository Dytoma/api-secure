"use client"

import SideView from "@/components/SideView"
import LoginForm from "@/components/LoginForm"
import Redirection from "@/components/Redirection"
import { useUserContext } from "@/hooks/useUserContextHook"
import { useRouter } from "next/navigation"

const Page = () => {
  const { user } = useUserContext()
  const router = useRouter()

  if (user) {
    router.push(`/${user._id}`)
  }
  return (
    <div className="page_layout">
      <SideView viewText="Welcome Back!" sideWidth='w-screen lg:w-[47vw]' />
      <div className="form_view">
        <div className="w-full">
          <h2 className="form_title">Login</h2>
          <p className="paragraph_text mt-3 md:mt-7">Welcome back! Please login in your <br />account.</p>

          <LoginForm />
          <Redirection linkRoute="/register" linkText="Register" question="New user?" />
        </div>
      </div>
    </div>
  )
}

export default Page
