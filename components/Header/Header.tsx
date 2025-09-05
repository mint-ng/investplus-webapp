import Invest from "@/public/Mintynn.png"
import Image from "next/image"

export default function Header() {
  return (
      <div className="w-full h-[80px] bg-white flex justify-center items-center overflow-y-auto">
          <Image src={Invest} alt="Mintyn logo" width={135} height={53} />
    </div>
  )
}
