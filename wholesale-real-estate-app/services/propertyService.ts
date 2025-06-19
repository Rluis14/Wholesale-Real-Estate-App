import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Property {
  id: string;
  address: string;
  price: string;
  arv: string;
  profit: string;
  rehab: string;
  details: string;
  created_at?: string;
}

const PROPERTIES_CACHE_KEY = 'properties_cache';

export const fetchProperties = async (): Promise<Property[]> => {
  try {
    // Check cache first
    const cachedData = await AsyncStorage.getItem(PROPERTIES_CACHE_KEY);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // Fetch from Supabase
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Map data to ensure consistent types
    const mappedData: Property[] = (data || []).map((item: any) => ({
      id: String(item.id),
      address: String(item.address || ''),
      price: String(item.price || ''),
      arv: String(item.arv || ''),
      profit: String(item.profit || ''),
      rehab: String(item.rehab || ''),
      details: String(item.details || ''),
      created_at: item.created_at
    }));

    // Cache the mapped data
    await AsyncStorage.setItem(PROPERTIES_CACHE_KEY, JSON.stringify(mappedData));

    return mappedData;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const addProperty = async (property: Omit<Property, 'id' | 'created_at'>): Promise<Property> => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .insert([property])
      .select();

    if (error) throw error;

    // Invalidate cache
    await AsyncStorage.removeItem(PROPERTIES_CACHE_KEY);

    // Ensure consistent types for returned data
    const newProperty: Property = {
      id: String(data[0].id),
      address: String(data[0].address || ''),
      price: String(data[0].price || ''),
      arv: String(data[0].arv || ''),
      profit: String(data[0].profit || ''),
      rehab: String(data[0].rehab || ''),
      details: String(data[0].details || ''),
      created_at: data[0].created_at
    };

    return newProperty;
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};