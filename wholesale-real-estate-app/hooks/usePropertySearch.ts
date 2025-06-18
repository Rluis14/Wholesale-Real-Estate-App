import { useState, useCallback } from 'react';
import { Property } from '../context/PropertyContext';

export const usePropertySearch = (properties: Property[]) => {
  const [searchText, setSearchText] = useState('');
  
  const filteredProperties = properties.filter(property => 
    property.address.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  return {
    searchText,
    handleSearch,
    filteredProperties
  };
};