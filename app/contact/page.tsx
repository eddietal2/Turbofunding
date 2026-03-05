import dynamic from "next/dynamic"
import ContactLoading from "./loading"

const ContactClient = dynamic(() => import("./contact-client"), {
  loading: () => <ContactLoading />,
})

export default function ContactPage() {
  return <ContactClient />
}
