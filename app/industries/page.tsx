import dynamic from "next/dynamic"
import IndustriesLoading from "./loading"

const IndustriesClient = dynamic(() => import("./industries-client"), {
  loading: () => <IndustriesLoading />,
})

export default function IndustriesPage() {
  return <IndustriesClient />
}
