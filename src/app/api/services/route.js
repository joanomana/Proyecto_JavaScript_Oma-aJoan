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

export const fetchTypeArmor = async (classType) => {
  try {
      const response = await fetch(`${API_BASE_URL}classes/${classType}`);
      if (!response.ok) throw new Error('Error fetching class proficiencies');
      const data = await response.json();
      return data.proficiencies;
  } catch (error) {
      console.error('Error:', error);
      return [];
  }
};


export const fetchArmor = async (armorType) => {
  if (armorType === 'all-armor') {
    const response = await fetch(`${API_BASE_URL}equipment-categories/armor`);
    const data = await response.json();
    return data.equipment;
  } else {
    const response = await fetch(`${API_BASE_URL}equipment-categories/${armorType}`);
    const data = await response.json();
    return data.equipment;
  }
  
};


export const fetchWeapons = async (weaponType) => {
  const response = await fetch(`${API_BASE_URL}equipment-categories/${weaponType}`);
  const data = await response.json();
  return data.equipment;
};

const fetchFeatures = async () => {
  const response = await fetch(`${API_BASE_URL}features`);
  const data = await response.json();
  return data.results;
};

const fetchSpells = async () => {
  const response = await fetch(`${API_BASE_URL}spells`);
  const data = await response.json();
  return data.results;
};

export const fetchItems = async () => {
  const features = await fetchFeatures();
  const spells = await fetchSpells();
  return { features, spells };
};

export const fecthAccesories = async () => {
  const response = await fetch(`${API_BASE_URL}magic-items`);
  const data = await response.json();
  return data.results;
};