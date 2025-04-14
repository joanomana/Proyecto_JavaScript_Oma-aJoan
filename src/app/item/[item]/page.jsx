'use client';
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Backgrounds  from "@/components/home/Background";
import Monsters from "@/components/home/Monsters";
import Equipment from "@/components/home/Equipment";
import MagicSchools from "@/components/home/Magic";
import Conditions from "@/components/home/Conditions";


export default function ItemDetail() {
    const {item} = useParams();
    const router = useRouter();
    const [details, setDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://www.dnd5eapi.co/api/2014/${item}`);
                const json = await res.json();
                const data = json.results;
    
                const detailedData = await Promise.all(
                    data.map(async (e) => {
                        const res = await fetch(`https://www.dnd5eapi.co/api/2014/${item}/${e.index}`);
                        return await res.json();
                    })
                );
    
                setDetails(detailedData); 
                
            } catch (error) {
                console.error("Error:", error);
            }
        };
    
        fetchData();
    }, [item]);

    const renderItemComponent = () => {
        switch (item){
            case 'backgrounds':
                return <Backgrounds data={details}/>;
            case 'monsters':
                return <Monsters data={details}/>;
            case 'equipment':
                return <Equipment data={details}/>;
            case 'magic-schools':
                return <MagicSchools data={details}/>;
            case 'conditions':
                return <Conditions data={details}/>;
            default:
                <Backgrounds data={details}/>;


        }
        
    }
    
    return(
        <div>
            <div className="p-2 bg-[url('/background-item.png')] bg-cover bg-no-repeat  bg-center  ">
                <button onClick={() => router.push("/")} className="bg-gray-500 px-4 py-2 rounded-lg hover:cursor-pointer">Back</button>
                <div className="flex flex-col items-center pt-20 hover:cursor-pointer">
                    <h1 className=" text-4xl text-white p-2 rounded-lg shadow-lg blackdrop-blur-md bg-black/30 ">{item.charAt(0).toUpperCase()+item.slice(1)}</h1>

                </div>
            </div>
            <div className="flex flex-col items-center justify-center p-2 ">
                {renderItemComponent()}
            </div>
            
        </div>
    )
}