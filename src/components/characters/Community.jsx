import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Community() {
    const [characters, setCharacters] = useState([]);
    
    const fetchCharacters = async () => {
        const response = await fetch('https://67ca4ce8102d684575c4f5f1.mockapi.io/api/v1/users/characters');
        const data = await response.json();
        setCharacters(data);
    };
    
    const SeeMore = (index) => {
        const character = characters[index];
        Swal.fire({
            title: "Character Details",
            html: `
                <div class="p-3 flex flex-col items-start gap-2">
                    <p><strong>Created By:</strong> ${character.username}</p>
                    <p><strong>Name:</strong> ${character.name}</p>
                    <p><strong>Race:</strong> ${character.race}</p>
                    <p><strong>Class:</strong> ${character.classType}</p>
                    <p><strong>Gender:</strong> ${character.gender}</p>
                    <p><strong>Armor Type:</strong> ${character.armorType}</p>
                    <p><strong>Armor:</strong> ${character.armor}</p>
                    <p><strong>Weapon Type:</strong> ${character.weaponType}</p>
                    <p><strong>Weapon:</strong> ${character.weapon}</p>
                    <ul> 
                        <h1 class="text-2xl font-bold text-start">Stats:</h1>
                        <div class="grid grid-cols-2 gap-2">
                        ${
                            character.stats
                            ? Object.entries(character.stats).map(
                                ([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`
                                ).join('')
                            : '<li><em>No stats available</em></li>'
                        }
                        </div>
                    </ul>
                    <p><strong>Feature:</strong> ${character.feature}</p>
                    <p><strong>Spell:</strong> ${character.spell}</p>
                    <h1 class="text-2xl font-bold text-start">Accesories:</h1>
                    <div class="grid grid-cols-2 gap-2">
                        <p>*${character.one}</p>
                        <p>*${character.two}</p>
                    </div>                
                </div>
            `
        });
    };

    useEffect(() => {
        const fetchAndSortCharacters = async () => {
            await fetchCharacters();
            setCharacters(prevCharacters => 
                [...prevCharacters].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            );
        };
        fetchAndSortCharacters();
    }, []);

    return (
        <div className="py-20 px-10 flex flex-col gap-10 bg-gray-200 md:h-screen"> 
            <div className="flex flex-col items-center justify-center mb-10 px-3 py-4 bg-purple-700 rounded-lg shadow-xl transition text-4xl text-white font-bold hover:bg-purple-600">
                <h1>Welcome! Check out the characters created by the community</h1>
            </div> 
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {characters.map((char, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-lg mb-6 hover:bg-gray-200 hover:text-black transition duration-300 ease-in-out">
                        <h1 className="text-center text-xl font-semibold">Character {index + 1}</h1>
                        <p><strong>Created By:</strong> {char.username}</p>
                        <p><strong>Name:</strong> {char.name}</p>
                        <p><strong>Race:</strong> {char.race}</p>
                        <p><strong>Class:</strong> {char.classType}</p>
                        <p><strong>Created on:</strong> {new Date(char.createdAt).toLocaleDateString()}</p>
                        <div className="flex flex-col gap-3 mt-4">
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-500"
                                onClick={() => SeeMore(index)}
                            >See More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
