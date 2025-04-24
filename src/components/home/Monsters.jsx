import { useEffect, useState } from "react";

export default function Monsters() {
    const [monsters, setMonsters] = useState([]);
    const [monsterDetails, setMonsterDetails] = useState({});

    useEffect(() => {
        const fetchMonsters = async () => {
            try {
                const response = await fetch("https://www.dnd5eapi.co/api/2014/monsters");
                const data = await response.json();
                setMonsters(data.results);
            } catch (error) {
                console.error("Error fetching monsters:", error);
            }
        };
        fetchMonsters();
    }, []);

    useEffect(() => {
        const fetchAllMonsterDetails = async () => {
            for (const monster of monsters) {
                if (!monsterDetails[monster.index]) {
                    try {
                        const response = await fetch(`https://www.dnd5eapi.co${monster.url}`);
                        const data = await response.json();
                        setMonsterDetails(prev => ({ ...prev, [monster.index]: data }));
                    } catch (error) {
                        console.error(`Error fetching monster ${monster.name}:`, error);
                    }
                }
            }
        };
        if (monsters.length > 0) fetchAllMonsterDetails();
    }, [monsters]);

    return (
        <div className="py-12 px-6 bg-slate-100 min-h-screen">
            <div className="max-w-5xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-bold text-purple-700 mb-2">D&D Monsters</h1>
                <p className="text-gray-700">Discover all the available monsters in the game</p>
            </div>

            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-purple-600 mb-6">Monsters</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {monsters.map((monster) => {
                        const details = monsterDetails[monster.index];
                        return (
                            <div key={monster.index} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
                                <h3 className="text-2xl font-semibold text-purple-600 mb-2">{monster.name}</h3>
                                <div className="text-gray-800 text-sm space-y-2">
                                    <p><strong>Hit Points:</strong> {details?.hit_points || 'N/A'}</p>
                                    <p><strong>Armor Class:</strong> {
                                        details?.armor_class?.value || 'N/A'
                                    }</p>
                                    <p><strong>Challenge Rating:</strong> {details?.challenge_rating || 'N/A'}</p>
                                    <p><strong>Actions:</strong> {
                                        details?.actions?.length > 0
                                            ? details.actions.map(a => a.name).join(', ')
                                            : 'None'
                                    }</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
