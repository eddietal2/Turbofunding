import dynamic from "next/dynamic"
import ApplyLoading from "./loading"

const ApplyClient = dynamic(() => import("./apply-client"), {
  loading: () => <ApplyLoading />,
})

export default function ApplyPage() {
  return <ApplyClient />
}
