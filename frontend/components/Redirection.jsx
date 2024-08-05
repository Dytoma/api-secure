import Link from 'next/link'

const Redirection = ({question, linkText, linkRoute}) => {
  return (
      <div className="flex items-center gap-4">
          <p className="paragraph_text">{question}</p>
          <Link href={linkRoute} className="text-base font-dmSans text-lightBlue">{linkText}</Link>
      </div>
  )
}

export default Redirection