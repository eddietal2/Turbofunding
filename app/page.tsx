import dynamic from "next/dynamic"
import HomeLoading from "./loading"

const HomeClient = dynamic(() => import("./home-client"), {
  loading: () => <HomeLoading />,
})

export default function HomePage() {
  return <HomeClient />
}
