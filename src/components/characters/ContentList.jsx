import React, { useEffect, useState } from 'react';
import { fetchRaces, fetchClasses, fetchItems } from '@/app/api/services/route';

const CharacterForm = ({ username, onCharacterCreate }) => {
    const [name, setName] = useState('');
    const [race, setRace] = useState('');
    const [classType, setClassType] = useState('');
    const [gender, setGender] = useState('male');
    const [armor, setArmor] = useState('');
    const [weapon, setWeapon] = useState('');
    const [stats, setStats] = useState({ strength: 10, dexterity: 10, intelligence: 10 });
    const [abilities, setAbilities] = useState([]);
    const [accessories, setAccessories] = useState([]);

    const [races, setRaces] = useState([]);
    const [classes, setClasses] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchRaces().then(setRaces);
        fetchClasses().then(setClasses);
        fetchItems().then(setItems);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const character = {
            username,
            name,
            race,
            classType,
            gender,
            armor,
            weapon,
            stats,
            abilities,
            accessories
        };
        onCharacterCreate(character);
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
                    <input
                        id="armor"
                        type="text"
                        placeholder="Armor"
                        value={armor}
                        onChange={(e) => setArmor(e.target.value)}
                        className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="weapon" className="block text-sm font-medium">Weapon</label>
                    <input
                        id="weapon"
                        type="text"
                        placeholder="Weapon"
                        value={weapon}
                        onChange={(e) => setWeapon(e.target.value)}
                        className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
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
                </div>

                <div>
                    <label htmlFor="abilities" className="block text-sm font-medium">Special Abilities</label>
                    <select
                        id="abilities"
                        multiple
                        value={abilities}
                        onChange={(e) => setAbilities([...e.target.selectedOptions].map(o => o.value))}
                        className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {items.abilities?.map((ability) => (
                            <option key={ability.index} value={ability.index}>
                                {ability.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="accessories" className="block text-sm font-medium">Accessories</label>
                    <select
                        id="accessories"
                        multiple
                        value={accessories}
                        onChange={(e) => setAccessories([...e.target.selectedOptions].map(o => o.value))}
                        className="w-full p-2 mt-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {items.accessories?.map((item) => (
                            <option key={item.index} value={item.index}>
                                {item.name}
                            </option>
                        ))}
                    </select>
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
};

export default CharacterForm;
