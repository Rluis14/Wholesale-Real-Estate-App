import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Property {
  id: number;
  created_at: string;
}

const PROPERTIES_CACHE_KEY = 'properties_cache';

export const fetchProperties = async () => {
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

    // Cache the data
    await AsyncStorage.setItem(PROPERTIES_CACHE_KEY, JSON.stringify(data));

    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const addProperty = async (property: Omit<Property, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .insert([property])
      .select();

    if (error) throw error;

    // Invalidate cache
    await AsyncStorage.removeItem(PROPERTIES_CACHE_KEY);

    return data[0];
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};