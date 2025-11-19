import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



const Cari = () => {
    const [query, setQuery] = useState < string > ('')
    const router = useRouter()

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/Search/${query}`)
    }

    const handleKey = (f) => {
        if (f.key === "Enter") {
            f.preventDefault()
            router.push(`/Search/${query}`)
        }
    }


    return (
        <div>
            <input className="bg-coked text-white md:w-auto w-[20rem] h-[2.3rem] p-3 rounded-xl outline-none 
            transition-all hover:border-2 hover:border-red-700 absolute md:right-0 md:bottom-[-0.5rem] right-[-0.5rem] bottom-[-4rem] placeholder:text-white"
                type="text" onChange={(e) => { setQuery(e.target.value) }} placeholder="Search" onKeyDown={handleKey} />

            <button type="submit" onClick={handleSearch}>Cari</button>
        </div>
    )
}

export default Cari