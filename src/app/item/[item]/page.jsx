'use client';
import { useParams, useRouter } from "next/navigation";
import Classes  from "@/components/home/Classes";
import Monsters from "@/components/home/Monsters";
import Equipment from "@/components/home/Equipment";



export default function ItemDetail() {
    const {item} = useParams();
    const router = useRouter();


    const renderItemComponent = () => {
        switch (item){
            case 'classes':
                return <Classes />;
            case 'monsters':
                return <Monsters/>;
            case 'equipment':
                return <Equipment />;
            default:
                <Backgrounds/>;


        }
        
    }
    return(
        <div className="flex flex-col justify-center p-2 ">
            <button onClick={() => router.push("/")} className="bg-gray-500 px-4 py-2 rounded-lg hover:cursor-pointer w-20">Back</button>
                {renderItemComponent()}
        </div>
            

    )
}