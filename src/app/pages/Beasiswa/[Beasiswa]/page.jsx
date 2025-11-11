import HalNew from "./Fie" 
export default async function Page({ params }) {
    const { Beasiswa } = await params
    return <HalNew seminarId={Beasiswa} />
}