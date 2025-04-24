import { useEffect, useState } from "react";

export default function Classes() {
    const [classes, setClasses] = useState([]);
    const [classDetails, setClassDetails] = useState({});

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch("https://www.dnd5eapi.co/api/2014/classes");
                const data = await response.json();
                setClasses(data.results);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        };
        fetchClasses();
    }, []);

    useEffect(() => {
        const fetchAllClassDetails = async () => {
            for (const dndClass of classes) {
                if (!classDetails[dndClass.index]) {
                    try {
                        const response = await fetch(`https://www.dnd5eapi.co${dndClass.url}`);
                        const data = await response.json();
                        setClassDetails(prev => ({ ...prev, [dndClass.index]: data }));
                    } catch (error) {
                        console.error(`Error fetching class ${dndClass.name}:`, error);
                    }
                }
            }
        };
        if (classes.length > 0) fetchAllClassDetails();
    }, [classes]);

    return (
        <div className="py-12 px-6 bg-slate-100 min-h-screen">
            <div className="max-w-5xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-bold text-purple-700 mb-2">D&D Classes</h1>
                <p className="text-gray-700">Discover all the available character classes in the game</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {classes.map((dndClass) => {
                    const details = classDetails[dndClass.index];
                    return (
                        <div key={dndClass.index} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
                            <h2 className="text-2xl font-semibold text-purple-600 mb-2">{dndClass.name}</h2>
                            {details ? (
                                <div className="text-gray-800 text-sm space-y-2">
                                    <p><strong>Hit Die:</strong> d{details.hit_die}</p>
                                    <p><strong>Proficiencies:</strong> {
                                        details.proficiencies.length > 0
                                            ? details.proficiencies.map(p => p.name).join(', ')
                                            : 'None'
                                    }</p>
                                    <p><strong>Saving Throws:</strong> {
                                        details.saving_throws.map(t => t.name).join(', ')
                                    }</p>
                                    <p><strong>Starting Equipment:</strong> {
                                        details.starting_equipment?.map(eq => `${eq.equipment.name} x${eq.quantity}`).join(', ') || 'None'
                                    }</p>
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">Loading details...</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
