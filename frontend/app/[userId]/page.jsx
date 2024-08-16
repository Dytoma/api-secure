"use client"

import Link from "next/link"
import { useUserContext } from "@/hooks/useUserContextHook"
import { useTaskContext } from "@/hooks/useTaskContext"
import dynamic from "next/dynamic"

const GanttChart = dynamic(() => import('../../components/Gantt/Gantt'), { ssr: false })

const Page = () => {
  const { user } = useUserContext();
  const { tasks } = useTaskContext()

  return (
    <div className="px-8 md:px-20 lg:px-64 pt-10 lg:pt-12 w-full">
      <div className="responsive_flex md:justify-between items-center gap-20 md:gap-0">
        <div className="text-center md:text-start">
          <h2 className="headline">Hello</h2>
          <h2 className="headline mt-3 md:mt-0">{`${user?.firstName} ${user?.lastName}`}</h2>
          <p className="paragraph_text mt-4">Nice to have you back!</p>
        </div>
        <div className="grid place-items-center">
          <Link href='/users' className="px-5 lg:px-10 py-5 rounded-lg text-white font-dmSans font-medium text-2xl md:text-3xl lg:text-[2.5rem] lg:leading-normal cursor-pointer bg-lightBlue w-fit btn_hover">See users</Link>
        </div>
      </div>
      <h3 className="chart_title mt-9">Gantt chart for tasks</h3>
      <GanttChart tasks={tasks} />
    </div>
  )
}

export default Page