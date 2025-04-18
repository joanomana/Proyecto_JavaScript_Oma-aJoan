import React, { useEffect, useState } from 'react';
import { fetchRaces, fetchClasses, fetchItems, fetchArmor, fetchWeapons, fecthAccesories } from '@/app/api/services/route';
import Swal from 'sweetalert2';

export default function CharacterForm  ( username ){
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [classType, setClassType] = useState('');
    const [gender, setGender] = useState('male');
    const [armorType, setArmorType] = useState('');
    const [weapon, setWeapon] = useState('');
    const [stats, setStats] = useState({  charisma:8,  constitution:8,  dexterity: 8, intelligence: 8, strength: 8,  wisdom:8 });
    const [selectedFeature, setSelectedFeature] = useState('');
    const [selectedSpell, setSelectedSpell] = useState('');
    const[accessorie1, setAccessorie1] = useState('');
    const[accessorie2, setAccessorie2] = useState('');


    const [races, setRaces] = useState([]);
    const [classes, setClasses] = useState([]);
    const [armor, setArmor] = useState([]);
    const [weapons, setWeapons] = useState([]);
    const [items, setItems] = useState({
        features: [],
        spells: [],
    });
    const [accessories, setAccessories] = useState([]);
    

    useEffect(() => {
        fetchRaces().then(setRaces);
        fetchClasses().then(setClasses);
        fetchArmor().then(setArmor);
        fetchItems().then(setItems);
        fetchWeapons().then(setWeapons);
        fetchItems().then(setItems);
        fecthAccesories().then(setAccessories);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const character = {
            username: username?.username || "",
            name,
            race,
            classType,
            gender,
            armorType,
            weapon,
            stats,
            feature: selectedFeature,
            spell: selectedSpell,
            one: accessorie1,
            two: accessorie2,
        };
    
        try {
            const response = await fetch(
                "https://67ca4ce8102d684575c4f5f1.mockapi.io/api/v1/users/characters",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(character),
                }
            );
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            Swal.fire({
                icon: "success",
                title: "Character Created",
                text: "Your character has been created successfully!",
            });
            setName("");
            setRace("");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "Failed to create character",
            });
            console.error("Error details:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg m-5">
            <h2 className="text-2xl font-bold mb-4">Create Character</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Character Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="race" className="block text-sm font-medium">Race</label>
                    <select
                        id="race"
                        value={race}
                        onChange={(e) => setRace(e.target.value)}
                        className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select a race</option>
                        {races.map((race) => (
                            <option key={race.index} value={race.index}>
                                {race.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="classType" className="block text-sm font-medium">Class</label>
                    <select
                        id="classType"
                        value={classType}
                        onChange={(e) => setClassType(e.target.value)}
                        className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select a class</option>
                        {classes.map((cls) => (
                            <option key={cls.index} value={cls.index}>
                                {cls.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="armor" className="block text-sm font-medium">Armor</label>
                    <select
                        id="armor"
                        value={armorType}
                        onChange={(e) => setArmorType(e.target.value)}
                        className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select an armor</option>
                        {armor.map((arm) => (
                            <option key={arm.index} value={arm.index}>
                                {arm.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="weapon" className="block text-sm font-medium">Weapon</label>
                    <select
                        id="weapon"
                        value={weapon}
                        onChange={(e) => setWeapon(e.target.value)}
                        className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Select a weapon</option>
                        {weapons.map((wea) => (
                            <option key={wea.index} value={wea.index}>
                                {wea.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="charisma" className="block text-sm font-medium">Charisma</label>
                        <input
                            id="charisma"
                            type="number"
                            value={stats.charisma}
                            onChange={(e) => setStats({ ...stats, charisma: e.target.value })}
                            className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="constitution" className="block text-sm font-medium">Constitution</label>
                        <input
                            id="constitution"
                            type="number"
                            value={stats.constitution}
                            onChange={(e) => setStats({ ...stats, constitution: e.target.value })}
                            className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="dexterity" className="block text-sm font-medium">Dexterity</label>
                        <input
                            id="dexterity"
                            type="number"
                            value={stats.dexterity}
                            onChange={(e) => setStats({ ...stats, dexterity: e.target.value })}
                            className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="intelligence" className="block text-sm font-medium">Intelligence</label>
                        <input
                            id="intelligence"
                            type="number"
                            value={stats.intelligence}
                            onChange={(e) => setStats({ ...stats, intelligence: e.target.value })}
                            className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="strength" className="block text-sm font-medium">Strength</label>
                        <input
                            id="strength"
                            type="number"
                            value={stats.strength}
                            onChange={(e) => setStats({ ...stats, strength: e.target.value })}
                            className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="wisdom" className="block text-sm font-medium">Wisdom</label>
                        <input
                            id="wisdom"
                            type="number"
                            value={stats.wisdom}
                            onChange={(e) => setStats({ ...stats, wisdom: e.target.value })}
                            className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    
                </div>

                <div>
                    <label htmlFor="abilities" className="block text-sm font-medium mb-2">Special Abilities</label>
                    
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="features" className="block text-xs text-gray-300 mb-1">Feature</label>
                            <select
                                id="features"
                                value={selectedFeature}
                                onChange={(e) => setSelectedFeature(e.target.value)}
                                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select a feature</option>
                                {items.features?.map((feature) => (
                                    <option key={feature.index} value={feature.index}>
                                        {feature.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-1/2">
                            <label htmlFor="spells" className="block text-xs text-gray-300 mb-1">Spell</label>
                            <select
                                id="spells"
                                value={selectedSpell}
                                onChange={(e) => setSelectedSpell(e.target.value)}
                                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select a spell</option>
                                {items.spells?.map((spell) => (
                                    <option key={spell.index} value={spell.index}>
                                        {spell.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="accesories" className="block text-sm font-medium mb-2">Accesories</label>
                    <p>You can choose two accesories</p>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="one" className="block text-xs text-gray-300 mb-1">1</label>
                            <select
                                id="one"
                                value={accessorie1}
                                onChange={(e) => setAccessorie1(e.target.value)}
                                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select a Accesorie</option>
                                {accessories.map((i) => (
                                    <option key={i.index} value={i.index}>
                                        {i.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-1/2">
                            <label htmlFor="two" className="block text-xs text-gray-300 mb-1">2</label>
                            <select
                                id="two"
                                value={accessorie2}
                                onChange={(e) => setAccessorie2(e.target.value)}
                                className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select a Accesorie</option>
                                {accessories.map((i) => (
                                    <option key={i.index} value={i.index}>
                                        {i.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full p-2 mt-4 bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                >
                    Create Character
                </button>
            </form>
        </div>
    );
}

