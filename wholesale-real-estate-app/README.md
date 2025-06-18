# Supabase configuration and table setup
-  wholesale-real-estate-app\assets\images\supabaseconf.jpg
-  wholesale-real-estate-app\assets\images\Tabelsupabase.jpg

# How React-Query is used
-  Data Fetching:
const { data: properties = [], isLoading, error } = useQuery({
  queryKey: ['properties'],
  queryFn: fetchProperties,
});
      -Fetches property data from Supabase-
      -Manages loading and error states automatically-

-  Query Caching:
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes cache
    },
  },
});
      -Caches data to avoid unnecessary network requests-
      -Configures default stale time for all queries-

-  Mutations (Data Updates):
const mutation = useMutation({
  mutationFn: addProperty,
  onSuccess: () => {
    queryClient.invalidateQueries(['properties']);
  }
});
         -Handles form submissions to add new properties-
         -Invalidates cache after successful mutation to trigger refetch-

# How AsyncStorage is implemented
-  AsyncStorage is first integrated as the storage layer for Supabase's authentication session:
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: AsyncStorage, // Uses AsyncStorage for session persistence
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    }
  }
);
- AsyncStorage is used to cache property data:
import AsyncStorage from '@react-native-async-storage/async-storage';

const PROPERTIES_CACHE_KEY = 'properties_cache';

export const fetchProperties = async () => {
  try {
    // 1. Check cache first
    const cachedData = await AsyncStorage.getItem(PROPERTIES_CACHE_KEY);
    if (cachedData) {
      return JSON.parse(cachedData); // Return cached data if available
    }

    // 2. Fetch from Supabase if no cache
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // 3. Cache the fresh data
    await AsyncStorage.setItem(
      PROPERTIES_CACHE_KEY, 
      JSON.stringify(data)
    );

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const addProperty = async (property) => {
  const { data, error } = await supabase
    .from('properties')
    .insert([property])
    .select();

  if (error) throw error;

  // 4. Invalidate cache on updates
  await AsyncStorage.removeItem(PROPERTIES_CACHE_KEY);
  
  return data[0];
};
- Cache invalidation
-  This work by read,wrtie, and update the code resulting in faster load, offline support and sync with supabase.
