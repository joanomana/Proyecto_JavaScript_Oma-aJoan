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
    
        const [races, classes] = await Promise.all([
            fetch('https://www.dnd5eapi.co/api/2014/races').then(res => res.json()).then(data => data.results),
            fetch('https://www.dnd5eapi.co/api/2014/classes').then(res => res.json()).then(data => data.results)
        ]);
    
        const fetchClassProficiencies = async (classType) => {
            if (!classType) return [];
            try {
                const response = await fetch(`https://www.dnd5eapi.co/api/2014/classes/${classType}`);
                const data = await response.json();
                return data.proficiencies || [];
            } catch (error) {
                console.error("Error fetching proficiencies:", error);
                return [];
            }
        };
    
        const getOptions = (list, currentValue) =>
            list.map(item =>
                `<option value="${item.index}" ${item.index === currentValue ? 'selected' : ''}>${item.name}</option>`
            ).join('');
    
        const initialProficiencies = await fetchClassProficiencies(character.classType);
    
        const extractTypes = (proficiencies, keyword) => {
            const filteredTypes = proficiencies
                .filter(p => p.index.includes(keyword))
                .map(p => ({ index: p.index, name: p.name }));
    

            if (filteredTypes.length === 0) {
                return [{ index: 'no-option', name: 'No available proficiencies' }];
            }
    
            return filteredTypes;
        };
    
        const armorTypes = extractTypes(initialProficiencies, 'armor');
        const weaponTypes = extractTypes(initialProficiencies, 'weapon');
    
        const fetchEquipmentOptions = async (categoryIndex, selectedValue) => {
            if (categoryIndex === 'no-option') {
                return '<option value="no-option">No option available</option>';
            }
    
            const endpoint = categoryIndex === 'all-armor' ? 'equipment-categories/armor' : `equipment-categories/${categoryIndex}`;
    
            try {
                const res = await fetch(`https://www.dnd5eapi.co/api/2014/${endpoint}`);
                const data = await res.json();
                return getOptions(data.equipment, selectedValue);
            } catch (err) {
                console.error("Error fetching equipment:", err);
                return '<option value="no-option">Error loading</option>';
            }
        };
    
        const armorOptions = character.armorType
            ? await fetchEquipmentOptions(character.armorType, character.armor)
            : '<option value="no-option">No armor available</option>';
    
        const weaponOptions = character.weaponType
            ? await fetchEquipmentOptions(character.weaponType, character.weapon)
            : '<option value="no-option">No weapon available</option>';
    
        const { value: formValues } = await Swal.fire({
            title: "Edit Character",
            html: `
            <div class="grid grid-cols-1 gap-4 p-2">
                <div>
                        <label for="name" class="block font-medium">Name:</label>
                        <input id="name" type="text" class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-50" value="${character.name}">
                </div>
                <div>
                        <label for="gender" class="block font-medium">Gender:</label>
                        <select id="gender" class="border border-gray-300 p-2 rounded-md max-w-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="male" ${character.gender === 'male' ? 'selected' : ''}>Male</option>
                            <option value="female" ${character.gender === 'female' ? 'selected' : ''}>Female</option>
                            <option value="other" ${character.gender === 'other' ? 'selected' : ''}>Other</option>
                        </select>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="race" class="block font-medium">Race:</label>
                        <select id="race" class="border border-gray-300 p-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-30">${getOptions(races, character.race)}</select>
                    </div>
                    <div>
                        <label for="classType" class="block font-medium">Class:</label>
                        <select id="classType" class="border border-gray-300 p-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-30">${getOptions(classes, character.classType)}</select>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="armorType" class="block font-medium">Armor Type:</label>
                        <select id="armorType" class="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-30">
                            <option value="">Select armor type</option>
                            ${getOptions(armorTypes, character.armorType)}
                        </select>
                    </div>
                    <div>
                        <label for="armor" class="block font-medium">Armor:</label>
                        <select id="armor" class="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-30">
                            ${armorOptions}
                        </select>
                    </div>
                </div>
    
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="weaponType" class="block font-medium">Weapon Type:</label>
                        <select id="weaponType" class="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-30">
                            <option value="">Select weapon type</option>
                            ${getOptions(weaponTypes, character.weaponType)}
                        </select>
                    </div>
                    <div>
                        <label for="weapon" class="block font-medium">Weapon:</label>
                        <select id="weapon" class="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-30">
                            ${weaponOptions}
                        </select>
                    </div>
                </div>
    
                <div class="grid grid-cols-2 gap-3 mt-2">
                    ${Object.entries(character.stats).map(([stat, value]) => `
                        <div>
                            <label for="${stat}" class="block font-medium capitalize">${stat}:</label>
                            <input id="${stat}" type="number" class="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-20" value="${value}">
                        </div>
                    `).join('')}
                </div>
            </div>
            `,
            showCancelButton: true,
            confirmButtonText: "Save",
            preConfirm: () => {
                const getValue = (id) => Swal.getPopup().querySelector(`#${id}`).value;
                const getNumberValue = (id) => parseInt(getValue(id), 10) || 0;
    
                return {
                    name: getValue('name'),
                    race: getValue('race'),
                    classType: getValue('classType'),
                    gender: getValue('gender'),
                    armorType: getValue('armorType'),
                    armor: getValue('armor'),
                    weaponType: getValue('weaponType'),
                    weapon: getValue('weapon'),
                    stats: {
                        charisma: getNumberValue('charisma'),
                        constitution: getNumberValue('constitution'),
                        dexterity: getNumberValue('dexterity'),
                        intelligence: getNumberValue('intelligence'),
                        strength: getNumberValue('strength'),
                        wisdom: getNumberValue('wisdom')
                    }
                };
            },
            didOpen: () => {
                const armorTypeEl = Swal.getPopup().querySelector('#armorType');
                const armorEl = Swal.getPopup().querySelector('#armor');
                armorTypeEl.addEventListener('change', async (e) => {
                    armorEl.innerHTML = await fetchEquipmentOptions(e.target.value, '');
                });
    
                const weaponTypeEl = Swal.getPopup().querySelector('#weaponType');
                const weaponEl = Swal.getPopup().querySelector('#weapon');
                weaponTypeEl.addEventListener('change', async (e) => {
                    weaponEl.innerHTML = await fetchEquipmentOptions(e.target.value, '');
                });
    
                Swal.getPopup().querySelector('#classType').addEventListener('change', async (e) => {
                    const profs = await fetchClassProficiencies(e.target.value);
                    const newArmorTypes = extractTypes(profs, 'armor');
                    const newWeaponTypes = extractTypes(profs, 'weapon');
    
                    armorTypeEl.innerHTML = `<option value="">Select armor type</option>${getOptions(newArmorTypes, '')}`;
                    weaponTypeEl.innerHTML = `<option value="">Select weapon type</option>${getOptions(newWeaponTypes, '')}`;
                    armorEl.innerHTML = '<option value="no-option">No armor available</option>';
                    weaponEl.innerHTML = '<option value="no-option">No weapon available</option>';
                });
            }
        });
    
        if (formValues) {
            try {
                const updatedCharacter = {
                    ...character,
                    ...formValues,
                    feature: character.feature,
                    spell: character.spell,
                    one: character.one,
                    two: character.two
                };
    
                await fetch(`https://67ca4ce8102d684575c4f5f1.mockapi.io/api/v1/users/characters/${character.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedCharacter)
                });
    
                setCharacters(prev => prev.map((char, i) => i === index ? updatedCharacter : char));
                Swal.fire('Updated!', `${updatedCharacter.name} has been updated.`, 'success');
            } catch (error) {
                console.error('Update error:', error);
                Swal.fire('Error!', 'Failed to update character', 'error');
            }
        }
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
            <div className="flex flex-col items-center justify-center mb-10 px-3 py-4 bg-yellow-600 rounded-lg shadow-md transition text-4xl text-white font-bold hover:bg-yellow-500">
                <h1>Hi {username.charAt(0).toUpperCase() +username.slice(1)} ! These are the characters you have created </h1>
            </div>  
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {characters.map((char, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-lg mb-6 hover:bg-gray-200 hover:text-black transition duration-300 ease-in-out">
                        <h1 className="text-center text-xl font-semibold">Character {index +1}</h1>
                        <p><strong>Name:</strong> {char.name}</p>
                        <p><strong>Race:</strong> {char.race}</p>
                        <p><strong>Class:</strong> {char.classType}</p>
                        <p><strong>Created on:</strong> {new Date(char.createdAt).toLocaleDateString()}</p>
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