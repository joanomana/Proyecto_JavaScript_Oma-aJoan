const API_BASE_URL = 'https://www.dnd5eapi.co/api/';

export const fetchRaces = async () => {
  const response = await fetch(`${API_BASE_URL}races`);
  const data = await response.json();
  return data.results;
};

export const fetchClasses = async () => {
  const response = await fetch(`${API_BASE_URL}classes`);
  const data = await response.json();
  return data.results;
};

export const fetchItems = async () => {
  const response = await fetch(`${API_BASE_URL}feats`); {/* Falta corregir */}
  const data = await response.json();
  return data;
};

export const fetchArmor = async () => {
  const response = await fetch(`${API_BASE_URL}equipment-categories/armor`);
  const data = await response.equipment.json();
  console.log(data);
  
  return data.results;
}
