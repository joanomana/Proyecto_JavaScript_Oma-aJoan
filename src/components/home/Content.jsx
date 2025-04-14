import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const items = [
    { name: "Backgrounds", endpoint: "backgrounds", image: "🧑‍🎓" },
    { name: "Monsters", endpoint: "monsters", image: "🐉" },
    { name: "Equipment", endpoint: "equipment", image: "🛡️" },
    { name: "Magic Schools", endpoint: "magic-schools", image: "📚" },
    { name: "Conditions", endpoint: "conditions", image: "⚠️" },
    ];

export default function Content() {

    const [data, setData] = useState({});
    const router = useRouter();


    const navigateToItemDetail = (item) => {
        const formattedItem = item.toLowerCase().replace(/\s+/g, '-');
        router.push(`/item/${formattedItem}`);
    };

    useEffect(() => {
        items.forEach(async (item) => {
        const res = await fetch(`https://www.dnd5eapi.co/api/2014/${item.endpoint}`);
        const json = await res.json();
        setData(prev => ({ ...prev, [item.name]: json.results }));
        });
    }, []);

    return (
        <div className="px-6 py-10 max-w-6xl mx-auto">
        <section className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">⚔️ Welcome to GameCampus: D&D World</h1>
            <p className="text-lg text-gray-700">
            Dive into the rich world of Dungeons & Dragons — a legendary tabletop role-playing game where you create epic stories, fight fearsome creatures, and explore magical lands.
            </p>
        </section>

        <section className="text-center mb-14">
            <h2 className="text-2xl font-semibold mb-2">🎮 How to Play</h2>
            <p className="text-gray-600">
            Choose a race and class, gather equipment, and face dangerous quests. D&D is about storytelling, teamwork, and adventure. Every decision shapes your destiny.
            </p>
        </section>

        <section>
            <h2 className="text-2xl font-semibold mb-6 text-center">🌍 What’s in the Game?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map(item => (
                <div
                key={item.name}
                className="bg-white shadow-md rounded-2xl p-4 text-center cursor-pointer hover:shadow-lg transition"
                onClick={() => {
                    navigateToItemDetail(item.name);
                }}
                >
                <div className="text-4xl mb-2">{item.image}</div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">Click to learn more</p>
                </div>
            ))}
            </div>
        </section>
        </div>
    );
}
