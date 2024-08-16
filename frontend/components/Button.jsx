import Image from "next/image"

const Button = ({ style, file, altText, handleClick }) => {
  return (
    <button title={altText} className={style} onClick={handleClick}>
      <Image src={file} width={34} height={53} alt={altText} className="w-auto h-auto" />
    </button>
  )
}

export default Button
