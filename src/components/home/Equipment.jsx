import React, { useEffect, useState } from 'react';

const EquipmentCard = ({ equipment }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-purple-600 mb-2">{equipment.name}</h3>
            <div className="text-gray-800 text-sm space-y-2">
                <p><strong>Category:</strong> {equipment.equipment_category?.name}</p>
                <p><strong>Gear Category:</strong> {equipment.gear_category?.name}</p>
                <p><strong>Cost:</strong> {equipment.cost?.quantity} {equipment.cost?.unit}</p>
                <p><strong>Weight:</strong> {equipment.weight} lbs</p>
                <p><strong>Details:</strong> {
                Array.isArray(equipment.desc) && equipment.desc.length > 0 
                ? equipment.desc.join(', ') 
                : 'No additional description'
                }</p>
            </div>
        </div>
    );
    };

    const EquipmentList = () => {
    const [equipmentData, setEquipmentData] = useState([]);
    const [equipmentDetails, setEquipmentDetails] = useState({});

    useEffect(() => {
        const fetchEquipment = async () => {
        try {
            const response = await fetch('https://www.dnd5eapi.co/api/2014/equipment');
            const data = await response.json();
            setEquipmentData(data.results);
        } catch (error) {
            console.error("Error fetching equipment:", error);
        }
        };
        fetchEquipment();
    }, []);

    useEffect(() => {
        const fetchAllEquipmentDetails = async () => {
        for (const item of equipmentData) {
            if (!equipmentDetails[item.index]) {
            try {
                const response = await fetch(`https://www.dnd5eapi.co${item.url}`);
                const data = await response.json();
                setEquipmentDetails(prev => ({ ...prev, [item.index]: data }));
            } catch (error) {
                console.error(`Error fetching equipment ${item.name}:`, error);
            }
            }
        }
        };
        if (equipmentData.length > 0) fetchAllEquipmentDetails();
    }, [equipmentData]);

    return (
        <div className="py-12 px-6 bg-slate-100 min-h-screen">
        <div className="max-w-5xl mx-auto text-center mb-10">
            <h1 className="text-4xl font-bold text-purple-700 mb-2">D&D Equipment</h1>
            <p className="text-gray-700">Discover all the available equipment in the game</p>
        </div>

        <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-purple-600 mb-6">Equipment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipmentData.map((item) => {
                const details = equipmentDetails[item.index];
                return (
                <EquipmentCard key={item.index} equipment={details || item} />
                );
            })}
            </div>
        </div>
        </div>
    );
};

export default EquipmentList;
