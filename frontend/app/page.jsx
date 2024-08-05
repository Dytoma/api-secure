import Link from "next/link"

const Page = () => {
  return (
    <div className='grid place-items-center h-screen'>
        <h2 className="font-dmSans font-medium text-2xl">Visit the <Link href="/login" className="text-lightBlue">login</Link> page</h2>
    </div>
  )
}

export default Page
