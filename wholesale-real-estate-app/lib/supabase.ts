import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://jqghmelxcfxptdqndglc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZ2htZWx4Y2Z4cHRkcW5kZ2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNzEwNjAsImV4cCI6MjA2NTg0NzA2MH0.XCH-85zL1WKRVXaxFnVWoa5ZgPBBmDNMaZmlvo2pSpI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});