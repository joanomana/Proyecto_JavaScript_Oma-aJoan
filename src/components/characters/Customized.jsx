import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Customized({username}) {
    const [characters, setCharacters] = useState([]);
    const fetchCharacters = async () => {
        const response = await fetch('https://67ca4ce8102d684575c4f5f1.mockapi.io/api/v1/users/characters');
        const data = await response.json();
        const filteredCharacters = data.filter(element => element.username === username);
        setCharacters(filteredCharacters);
    };

    const SeeMore = (index) => {
        const character = characters[index];
        Swal.fire({
            title: "Character Details",
            html: `
                <div class="p-3 flex flex-col items-start gap-2">
                    <p><strong>Name:</strong> ${character.name}</p>
                    <p><strong>Race:</strong> ${character.race}</p>
                    <p><strong>Class:</strong> ${character.classType}</p>
                    <p><strong>Gender:</strong> ${character.gender}</p>
                    <p><strong>Armor Type:</strong> ${character.armorType}</p>
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
    })};
    const handleDelete = async (index) => {
        const character = characters[index];
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to delete ${character.name}. This action cannot be undone.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch(`https://67ca4ce8102d684575c4f5f1.mockapi.io/api/v1/users/characters/${character.id}`, {
                    method: "DELETE"
                });
                setCharacters(prevCharacters => prevCharacters.filter((_, i) => i !== index));
                Swal.fire("Deleted!", `${character.name} has been deleted.`, "success");
            }
    })};
    const handleEdit = async (index) => {
        const character = characters[index];
        const [races, classes, weapons, armors] = await Promise.all([
            fetch('https://www.dnd5eapi.co/api/races').then(res => res.json()).then(data => data.results),
            fetch('https://www.dnd5eapi.co/api/classes').then(res => res.json()).then(data => data.results),
            fetch('https://www.dnd5eapi.co/api/equipment-categories/weapon').then(res => res.json()).then(data => data.equipment),
            fetch('https://www.dnd5eapi.co/api/equipment-categories/armor').then(res => res.json()).then(data => data.equipment)
        ]);
        const getOptions = (list, currentValue) =>
            list.map(item => 
                `<option value="${item.index}" ${item.index === currentValue ? 'selected' : ''}>${item.name}</option>`
            ).join('');
    
        Swal.fire({
            title: "Edit Character",
            html: `
            <div class="p-3 flex flex-col items-start gap-2">
                <div class="flex justify-center items-center gap-2">
                    <label for="name">Name:</label>
                    <input id="name" type="text" class="swal2-input" value="${character.name}" placeholder="Enter new name"> 
                </div> 
                <div class="flex justify-center items-center gap-2">
                    <label for="race">Race:</label>
                    <select id="race" class="swal2-select">${getOptions(races, character.race)}</select>
                </div>
                <div class="flex justify-center items-center gap-2">
                    <label for="classType">Class:</label>
                    <select id="classType" class="swal2-select">${getOptions(classes, character.classType)}</select>
                </div>
                <div class="flex justify-center items-center gap-5">
                    <label for="gender">Select a Gender:</label>
                    <select id="gender" class="swal2-select">
                        <option value="male" ${character.gender === 'male' ? 'selected' : ''}>Male</option>
                        <option value="female" ${character.gender === 'female' ? 'selected' : ''}>Female</option>
                        <option value="other" ${character.gender === 'other' ? 'selected' : ''}>Other</option>
                    </select>
                </div>
                <div class="flex justify-center items-center gap-2">
                    <label for="armorType">Armor Type:</label>
                    <select id="armorType" class="swal2-select">${getOptions(armors, character.armorType)}</select>
                </div>
                <div class="flex justify-center items-center gap-2">
                    <label for="weapon">Weapon:</label>
                    <select id="weapon" class="swal2-select">${getOptions(weapons, character.weapon)}</select>
                </div>
                    <div class="flex justify-center items-center gap-2>
                        <label for="charisma">Charisma</label>
                        <input id="charisma" type="number" class="swal2-input" value="${character.stats.charisma}">
                    </div>
                    <div class="flex justify-center items-center gap-2>
                        <label for="constitution">Constitution</label>
                        <input id="constitution" type="number" class="swal2-input" value="${character.stats.constitution}">
                    </div>
                    <div class="flex justify-center items-center gap-2>
                        <label for="dexterity">Dexterity</label>
                        <input id="dexterity" type="number" class="swal2-input" value="${character.stats.dexterity}">
                    </div>
                    <div class="flex justify-center items-center gap-2>
                        <label for="intelligence">Intelligence</label>
                        <input id="intelligence" type="number" class="swal2-input" value="${character.stats.intelligence}">
                    </div>
                    <div class="flex justify-center items-center gap-2>
                        <label for="strength">Strength</label>
                        <input id="strength" type="number" class="swal2-input" value="${character.stats.strength}">
                    </div>
                    <div class="flex justify-center items-center gap-2>
                        <label for="wisdom">Wisdom</label>
                        <input id="wisdom" type="number" class="swal2-input" value="${character.stats.wisdom}">
                    </div>
            </div>
            `,
            showCancelButton: true,
            confirmButtonText: "Save",
            preConfirm: () => {
            const name = Swal.getPopup().querySelector('#name').value;
            const race = Swal.getPopup().querySelector('#race').value;
            const classType = Swal.getPopup().querySelector('#classType').value;
            const gender = Swal.getPopup().querySelector('#gender').value;
            const armorType = Swal.getPopup().querySelector('#armorType').value;
            const weapon = Swal.getPopup().querySelector('#weapon').value;
            const stats = {
                charisma: parseInt(Swal.getPopup().querySelector('#charisma').value, 10),
                constitution: parseInt(Swal.getPopup().querySelector('#constitution').value, 10),
                dexterity: parseInt(Swal.getPopup().querySelector('#dexterity').value, 10),
                intelligence: parseInt(Swal.getPopup().querySelector('#intelligence').value, 10),
                strength: parseInt(Swal.getPopup().querySelector('#strength').value, 10),
                wisdom: parseInt(Swal.getPopup().querySelector('#wisdom').value, 10)
            };

            if (!name || !race || !classType || !gender || !armorType || !weapon) {
                Swal.showValidationMessage('Please fill out all fields');
            }

            return { name, race, classType, gender, armorType, weapon, stats };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
            const updatedCharacter = {
                ...character,
                ...result.value
            };

            await fetch(`https://67ca4ce8102d684575c4f5f1.mockapi.io/api/v1/users/characters/${character.id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCharacter)
            });

            setCharacters(prev => {
                const updated = [...prev];
                updated[index] = updatedCharacter;
                return updated;
            });

            Swal.fire('Updated!', `${updatedCharacter.name} has been updated.`, 'success');
            }
        });
    };
    
    useEffect(() => {
        const fetchAndSortCharacters = async () => {
            await fetchCharacters();
            setCharacters(prevCharacters => 
                [...prevCharacters].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            );
        };
        console.log("Fetching and sorting characters...");
        fetchAndSortCharacters();
    }, []);
    return (
        <div className="py-20 px-10 flex flex-col gap-10 bg-gray-200 md:h-screen"> 
            <div className="flex flex-col items-center justify-center mb-10 px-3 py-4 bg-yellow-600 rounded-lg shadow-md transition text-4xl text-white font-bold hover:bg-yellow-500">
                <h1>Hi {username.charAt(0).toUpperCase() +username.slice(1)} ! These are the characters you have created </h1>
            </div>  
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {characters.map((char, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg shadow-md mb-4 hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out">
                        <h1 className="text-center">Character {index}</h1>
                        <p>Name: {char.name}</p>
                        <p>Race: {char.race}</p>
                        <p>Class: {char.classType}</p>
                        <p>Created date: {new Date(char.createdAt).toLocaleDateString()}</p>
                        <div className="flex flex-col gap-2 mt-4">
                            <button className="bg-green-600 text-white px-2 py-3 rounded-lg shadow-md hover:cursor-pointer hover:bg-green-300"
                            onClick={() => SeeMore(index)}
                            >See more</button>
                            <button className="bg-blue-500 px-2 py-3 text-white rounded-lg shadow-md hover:cursor-pointer hover:bg-blue-300"
                            onClick={() => handleEdit(index)}
                            >Edit</button>
                            <button className="bg-red-600 text-white px-2 py-3 rounded-lg shadow-md hover:cursor-pointer hover:bg-red-400"
                            onClick={() => handleDelete(index)}
                            >Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}