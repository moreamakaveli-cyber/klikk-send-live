import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and Anon Key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
}

// Create Supabase client
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Function to save order to Supabase
export async function saveOrder(orderData: {
  name: string;
  phone: string;
  pickup_address: string;
  delivery_address: string;
  package_size: string;
}) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are not configured');
  }

  const { data, error } = await supabase
    .from('orders')
    .insert({
      name: orderData.name,
      phone: orderData.phone,
      pickup_address: orderData.pickup_address,
      delivery_address: orderData.delivery_address,
      package_size: orderData.package_size,
    })
    .select();

  if (error) {
    throw new Error(`Failed to save order: ${error.message}`);
  }

  return data;
}
