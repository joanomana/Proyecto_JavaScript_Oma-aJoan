import { useRouter } from "next/navigation";

const items = [
    { name: "Classes", endpoint: "classes", image: "🧑‍🎓" },
    { name: "Monsters", endpoint: "monsters", image: "🐉" },
    { name: "Equipment", endpoint: "equipment", image: "🛡️" },
];

export default function Content() {
    const router = useRouter();

    const navigateToItemDetail = (item) => {
        const formattedItem = item.toLowerCase().replace(/\s+/g, '-');
        router.push(`/item/${formattedItem}`);
    };

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
                <p className="text-gray-600 mb-4">
                    Choose a race and class, gather equipment, and face dangerous quests. D&D is about storytelling, teamwork, and adventure. Every decision shapes your destiny.
                </p>

                <div className="text-left text-gray-600">
                    <h3 className="text-xl font-semibold mb-2">🔍 Basic Steps:</h3>
                    <ul className="list-inside list-disc mb-4">
                        <li><strong>Create Your Character:</strong> Choose a race and class to build your hero, each with unique abilities and traits.</li>
                        <li><strong>Gather Equipment:</strong> Equip your character with weapons, armor, and magical items to enhance your chances in combat.</li>
                        <li><strong>Roll for Success:</strong> Dungeons & Dragons uses a variety of dice to determine outcomes, such as success in combat or passing challenges.</li>
                        <li><strong>Teamwork is Key:</strong> Work together with your party to overcome obstacles and defeat monsters. Every decision has consequences.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-2">⚔️ Game Phases:</h3>
                    <p className="mb-4">
                        The game typically follows these phases:
                    </p>
                    <ul className="list-inside list-decimal">
                        <li><strong>Exploration:</strong> Your party moves through the world, interacting with NPCs, solving puzzles, and searching for treasure.</li>
                        <li><strong>Combat:</strong> You may encounter hostile creatures where you take turns rolling dice to determine actions like attacking or defending.</li>
                        <li><strong>Roleplaying:</strong> You can engage with the world by talking to NPCs, making decisions that affect your adventure’s outcome.</li>
                    </ul>

                    <p className="mt-4">
                        As the Dungeon Master (DM), the storyteller and guide, leads you through the adventure, you and your team will make crucial decisions that determine your path. Will you be a hero, or will you fall victim to the dangers of the world?
                    </p>
                </div>
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
