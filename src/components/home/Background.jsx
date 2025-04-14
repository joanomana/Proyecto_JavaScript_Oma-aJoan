import Swal from 'sweetalert2';

export default function Backgrounds(data) {
    if (!data.data || data.data.length === 0) {
        return <div className="bg-red-200 p-3 rounded-lg">No data available</div>;
    }

    const info = data.data[0];

    const fetchInfo = async (endpoint) => {
        try {
            const res = await fetch(`https://www.dnd5eapi.co/api/2014/${endpoint}`);
            const json = await res.json();

            if (endpoint === "languages") {
                const languagesList = json.results
                    .map((lang) => `<li>${lang.name}</li>`)
                    .join("");

                Swal.fire({
                    title: 'Languages',
                    html: `<ul style="text-align: left; list-style-type: disc; margin-left: 20px;">${languagesList}</ul>`,
                    icon: 'info',
                    confirmButtonText: 'Close',
                    width: '400px',
                });
            } else if (endpoint === "equipment/clothes-common") {
                const { name, equipment_category, gear_category, cost, weight } = json;
            
                const equipmentDetails = `
                    <ul style="text-align: left; list-style-type: disc; margin-left: 20px;">
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Equipment Category:</strong> ${equipment_category.name}</li>
                        <li><strong>Gear Category:</strong> ${gear_category.name}</li>
                        <li><strong>Cost:</strong> ${cost.quantity} ${cost.unit}</li>
                        <li><strong>Weight:</strong> ${weight} lb</li>
                    </ul>
                `;
            
                Swal.fire({
                    title: 'Item Details',
                    html: equipmentDetails,
                    icon: 'info',
                    confirmButtonText: 'Close',
                    width: '450px',
                });
            } else if (endpoint==="equipment/pouch"){
                const { name, equipment_category, gear_category, cost, weight } = json;
            
                const equipmentDetails = `
                    <ul style="text-align: left; list-style-type: disc; margin-left: 20px;">
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Equipment Category:</strong> ${equipment_category.name}</li>
                        <li><strong>Gear Category:</strong> ${gear_category.name}</li>
                        <li><strong>Cost:</strong> ${cost.quantity} ${cost.unit}</li>
                        <li><strong>Weight:</strong> ${weight} lb</li>
                    </ul>
                `;
            
                Swal.fire({
                    title: 'Item Details',
                    html: equipmentDetails,
                    icon: 'info',
                    confirmButtonText: 'Close',
                    width: '450px',
                });
            }else if (endpoint === "equipment-categories/holy-symbols") {
                const object = json.equipment;
                const objects = object.map((object) => `
                    <div className="flex gap-3">
                        <h2 className="p-2 bg-blue-400 rounded-lg shadow-md transition"><strong>Name:</strong> ${object.name}</h2>
                    </div> `
                ).join("");

                Swal.fire({
                    title: 'Holy Simbols',
                    html: objects,
                    icon: 'info',
                    confirmButtonText: 'Close',
                    width: '450px',
                });
            }
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="bg-gray-300 p-3 rounded-lg shadow-md flex flex-col items-center gap-2">
            <h1 className='text-center text-8xl text-blue-400'>{info.name}</h1>
            <div className='flex gap-10'>
                <div>
                    <h2>Proficiencies:</h2>
                    <ul className="list-disc pl-10">
                        {info.starting_proficiencies.map((e, index) => (
                            <li key={index}>{e.name}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className='flex flex-col'>
                    Languages:
                    <button
                        className="bg-red-400 p-2 rounded-lg shadow hover:cursor-pointer hover:bg-yellow-500 transition"
                        onClick={() => fetchInfo("languages")}
                    >
                        See Languages
                    </button>
                    </h2>
                </div>
                <div>
                    <h2>Equipment:
                        <div className='gap-3 flex'>
                            <button className='bg-red-400 p-2 rounded-lg shadow-md hover:cursor-pointer hover:bg-yellow-500 transition' 
                            onClick={()=>fetchInfo("equipment/clothes-common")} 
                                >Clothes</button>
                            <button className='bg-red-400 p-2 rounded-lg shadow-md hover:cursor-pointer hover:bg-yellow-500 transition'
                            onClick={()=>fetchInfo("equipment/pouch")}
                                >Pouch</button>
                            
                        </div>
                    </h2>
                </div>
                <div>
                    <h2 className='flex flex-col'>Equipment Options:
                        <button className='bg-red-400 p-2 rounded-lg shadow-md hover:cursor-pointer hover:bg-yellow-500 transition'
                        onClick={()=>{
                            fetchInfo("equipment-categories/holy-symbols");
                        }}
                        >Holy Simbols</button>
                    </h2>
                </div>
            </div>
            <div className='flex flex-col items-center gap-2'>  
                <h2 className='text-2xl'>Description</h2>
                <p className=' max-w-3xl'>As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells. Those who share your religion will support you (but only you) at a modest lifestyle.",
                "You might also have ties to a specific temple dedicated to your chosen deity or pantheon, and you have a residence there. This could be the temple where you used to serve, if you remain on good terms with it, or a temple where you have found a new home. While near your temple, you can call upon the priests for assistance, provided the assistance you ask for is not hazardous and you remain in good standing with your temple."</p>
            </div>
        </div>
    );
}
