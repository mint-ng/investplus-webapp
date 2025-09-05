import Header from "@/components/Header/Header"
import SuppportForm from "@/components/SupportForm/SupportForm"
export default function page() {
  return (
      <div className="min-h-screen bg-main">
          <Header />
          <div className=" w-full h-full flex justify-center items-center mt-[64px] px-3 sm:px-0">
              <div className="max-w-[497px]">
                  <h2 className="sm:text-3xl text-lg font-semibold mb-[20px] text-center">Get in touch with us</h2>
          <p className="text-center text-base mb-3">We'd love to hear from you. Please fill this form and let us know any issues you might have.</p>
          <SuppportForm />
              </div>
        </div>
    </div>
  )
}
