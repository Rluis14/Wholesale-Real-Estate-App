import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Property {
  id: string;
  address: string;
  price: string;
  arv: string;
  profit: string;
  rehab: string;
  details: string;
}

interface PropertyContextType {
  properties: Property[];
  savedProperties: string[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  toggleSaved: (id: string) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      address: '123 Main St, Denver, CO',
      price: '$150,000',
      arv: '$220,000',
      profit: '$70,000',
      rehab: '$45,000',
      details: 'Fixer-upper with great potential. Needs roof repair and kitchen remodel.'
    },
    {
      id: '2',
      address: '456 Oak Ave, Boulder, CO',
      price: '$95,000',
      arv: '$180,000',
      profit: '$85,000',
      rehab: '$60,000',
      details: 'Vacant property in up-and-coming neighborhood. Great flip opportunity.'
    },
    
    {
      id: '3',
      address: '789 Pine Rd, Colorado Springs, CO',
      price: '$200,000',
      arv: '$300,000',
      profit: '$100,000',
      rehab: '$80,000',
      details: 'Large home with good bones. Needs cosmetic updates and landscaping.'
    },
    {
      id: '4',
      address: '321 Elm St, Fort Collins, CO',
      price: '$120,000',
      arv: '$210,000',
      profit: '$90,000',
      rehab: '$50,000',
      details: 'Investment property with long-term tenants. Minor repairs needed.'
    },
    {
        id: '5',
        address: '654 Maple Dr, Aurora, CO',
        price: '$180,000',
        arv: '$250,000',
        profit: '$70,000',
        rehab: '$40,000',
        details: 'Great location near schools and parks. Needs kitchen and bathroom updates.'
    },
    {
        id: '6',
        address: '987 Cedar Ln, Littleton, CO',
        price: '$160,000',
        arv: '$230,000',
        profit: '$70,000',
        rehab: '$50,000',
        details: 'Charming home with potential. Needs roof replacement and interior updates.'
    },
    {
        id: '7',
        address: '432 Birch St, Westminster, CO',
        price: '$140,000',
        arv: '$200,000',
        profit: '$60,000',
        rehab: '$30,000',
        details: 'Solid investment with minor repairs needed. Good rental potential.'
    },
    {
        id: '8',
        address: '876 Spruce Ave, Thornton, CO',
        price: '$110,000',
        arv: '$170,000',
        profit: '$60,000',
        rehab: '$20,000',
        details: 'Affordable property in a growing area. Needs cosmetic updates.'
    },
    {
      id: '9',
      address: '543 Willow Way, Arvada, CO',
      price: '$130,000',
      arv: '$190,000',
      profit: '$60,000',
      rehab: '$25,000',
      details: 'Investment opportunity with good cash flow. Minor repairs needed.'
    },
    {
      id: '10',
      address: '210 Aspen Blvd, Lakewood, CO',
      price: '$170,000',
      arv: '$240,000',
      profit: '$70,000',
      rehab: '$35,000',
      details: 'Spacious home with great potential. Needs kitchen and bathroom remodel.'
    },
    {
      id: '11',
      address: '111 Cherry St, Pueblo, CO',
      price: '$90,000',
      arv: '$150,000',
      profit: '$60,000',
      rehab: '$30,000',
      details: 'Affordable property with good rental potential. Needs cosmetic updates.'
    },
    {
      id: '12',
      address: '222 Fir Rd, Greeley, CO',
      price: '$125,000',
      arv: '$180,000',
      profit: '$55,000',
      rehab: '$20,000',
      details: 'Solid investment with minor repairs needed. Good cash flow.'
    },
    {
      id: '13',
      address: '333 Poplar Ln, Longmont, CO',
      price: '$145,000',
      arv: '$210,000',
      profit: '$65,000',
      rehab: '$30,000',
      details: 'Charming home with potential. Needs roof replacement and interior updates.'
    },
    {
      id: '14',
      address: '444 Redwood St, Broomfield, CO',
      price: '$155,000',
      arv: '$220,000',
      profit: '$65,000',
      rehab: '$40,000',
      details: 'Great location near schools and parks. Needs kitchen and bathroom updates.'
    },
    {
      id: '15',
      address: '555 Sequoia Ave, Castle Rock, CO',
      price: '$165,000',
      arv: '$240,000',
      profit: '$75,000',
      rehab: '$50,000',
      details: 'Large home with good bones. Needs cosmetic updates and landscaping.'
    },
    {
      id: '16',
      address: '666 Cypress Dr, Parker, CO',
      price: '$175,000',
      arv: '$250,000',
      profit: '$75,000',
      rehab: '$45,000',
      details: 'Fixer-upper with great potential. Needs roof repair and kitchen remodel.'
    },
    {
      id: '17',
      address: '777 Larch St, Highlands Ranch, CO',
      price: '$185,000',
      arv: '$260,000',
      profit: '$75,000',
      rehab: '$50,000',
      details: 'Vacant property in up-and-coming neighborhood. Great flip opportunity.'
    },
    {
      id: '18',
      address: '888 Hemlock Ave, Centennial, CO',
      price: '$195,000',
      arv: '$280,000',
      profit: '$85,000',
      rehab: '$60,000',
      details: 'Large home with good bones. Needs cosmetic updates and landscaping.'
    },
    {
        id: '19',
        address: '999 Magnolia Rd, Erie, CO',
        price: '$205,000',
        arv: '$290,000',
        profit: '$85,000',
        rehab: '$55,000',
        details: 'Investment property with long-term tenants. Minor repairs needed.'
    },
    {
        id: '20',
        address: '1010 Olive St, Louisville, CO',
        price: '$215,000',
        arv: '$300,000',
        profit: '$85,000',
        rehab: '$60,000',
        details: 'Great location near schools and parks. Needs kitchen and bathroom updates.'
    },
    {
      id: '21',
      address: '1212 Walnut Ave, Superior, CO',
      price: '$225,000',
      arv: '$310,000',
      profit: '$85,000',
      rehab: '$65,000',
      details: 'Charming home with potential. Needs roof replacement and interior updates.'
    },
    {
      id: '22',
      address: '1313 Chestnut St, Lafayette, CO',
      price: '$235,000',
      arv: '$320,000',
      profit: '$85,000',
      rehab: '$70,000',
      details: 'Solid investment with minor repairs needed. Good cash flow.'
    },
    {
      id: '23',
      address: '1414 Ash Rd, Longmont, CO',
      price: '$245,000',
      arv: '$330,000',
      profit: '$85,000',
      rehab: '$75,000',
      details: 'Spacious home with great potential. Needs kitchen and bathroom remodel.'
    },
    {
        id: '24',
        address: '1515 Birch Ln, Erie, CO',
        price: '$255,000',
        arv: '$340,000',
        profit: '$85,000',
        rehab: '$80,000',
        details: 'Large home with good bones. Needs cosmetic updates and landscaping.'
    },
    {
        id: '25',
        address: '1616 Cedar St, Louisville, CO',
        price: '$265,000',
        arv: '$350,000',
        profit: '$85,000',
        rehab: '$85,000',
        details: 'Fixer-upper with great potential. Needs roof repair and kitchen remodel.'
    },
  ]);

  const [savedProperties, setSavedProperties] = useState<string[]>([]);

  
  const addProperty = (property: Omit<Property, 'id'>) => {
    const newProperty = {
      ...property,
      id: Math.random().toString(36).substring(2, 9),
    };
    setProperties(prev => [newProperty, ...prev]);
  };

  const toggleSaved = (id: string) => {
    setSavedProperties(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <PropertyContext.Provider value={{ properties, savedProperties, addProperty, toggleSaved }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};

