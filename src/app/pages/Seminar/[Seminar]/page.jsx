import HalNew from "./asyncFie" 
export default async function Page({ params }) {
    const { Seminar } = await params
    return <HalNew seminarId={Seminar} />
}