import { useEffect, useState } from "react";

const SpellCard = ({ spell }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-2">{spell.name}</h3>
            <div className="text-gray-800 text-sm space-y-2">
                <p><strong>Level:</strong> {spell.level}</p>
                <p><strong>Range:</strong> {spell.range}</p>
                <p><strong>Duration:</strong> {spell.duration}</p>
                <p><strong>Casting Time:</strong> {spell.casting_time}</p>
                <p><strong>Components:</strong> {spell.components && spell.components.length > 0 ? spell.components.join(", ") : 'None'}</p>
                <p><strong>Material:</strong> {spell.material || 'None'}</p>
                <p><strong>Attack Type:</strong> {spell.attack_type || 'N/A'}</p>
                <p><strong>Ritual:</strong> {spell.ritual ? "Yes" : "No"}</p>

                <p><strong>Description:</strong></p>
                <ul className="list-disc pl-5">
                    {spell.desc && spell.desc.length > 0 ? (
                        <li>{spell.desc[0]}</li> 
                    ) : (
                        <li>No description available</li>
                    )}
                </ul>

                {spell.higher_level && (
                    <>
                        <p><strong>Higher Level Effects:</strong></p>
                        <ul className="list-disc pl-5">
                            {spell.higher_level.map((effect, index) => (
                                <li key={index}>{effect}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

const SpellsList = () => {
    const [spellsData, setSpellsData] = useState([]);
    const [spellsDetails, setSpellsDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSpells = async () => {
            try {
                const response = await fetch('https://www.dnd5eapi.co/api/2014/spells');
                const data = await response.json();
                setSpellsData(data.results); 
                setLoading(false); 
            } catch (error) {
                console.error("Error fetching spells:", error);
                setLoading(false);
            }
        };
        fetchSpells();
    }, []);

    useEffect(() => {
        const fetchSpellDetails = async () => {
            const spellDetailsPromises = spellsData.map(spell => 
                fetch(`https://www.dnd5eapi.co${spell.url}`)
                    .then(response => response.json())
                    .catch(error => {
                        console.error(`Error fetching spell ${spell.name}:`, error);
                        return null; 
                    })
            );

            const fetchedDetails = await Promise.all(spellDetailsPromises);

            setSpellsDetails(fetchedDetails.filter(spell => spell !== null)); 
        };

        if (spellsData.length > 0) {
            fetchSpellDetails();
        }
    }, [spellsData]);

    if (loading) {
        return (
            <div className="py-12 px-6 bg-slate-100 min-h-screen">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-indigo-700 mb-2">Loading D&D Spells...</h1>
                    <p className="text-gray-700">Please wait while the spells are being loaded.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 px-6 bg-slate-100 min-h-screen">
            <div className="max-w-5xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-bold text-indigo-700 mb-2">D&D Spells</h1>
                <p className="text-gray-700">Explore all the available spells in Dungeons & Dragons</p>
            </div>

            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-indigo-700 mb-6">Spells</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {spellsDetails.length > 0 ? (
                        spellsDetails.map((spell) => (
                            <SpellCard key={spell.index} spell={spell} />
                        ))
                    ) : (
                        <p>No spells found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpellsList;
