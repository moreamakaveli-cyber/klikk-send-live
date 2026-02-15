import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing Supabase environment variables',
          connection: {
            url: supabaseUrl ? 'Configured' : 'Missing NEXT_PUBLIC_SUPABASE_URL',
            anonKey: supabaseAnonKey ? 'Configured' : 'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY',
          },
          message: 'Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file'
        },
        { status: 400 }
      );
    }

    // Test connection by checking if we can access the database
    const { data: testData, error: testError } = await supabase
      .from('orders')
      .select('id')
      .limit(1);

    if (testError) {
      return NextResponse.json(
        { 
          success: false, 
          error: testError.message,
          details: testError,
          connection: {
            url: 'Configured',
            anonKey: 'Configured',
          },
          message: 'Connection established but unable to access orders table. Check table name and permissions.'
        },
        { status: 500 }
      );
    }

    // Insert a dummy order to test
    const dummyOrder = {
      name: 'Test User',
      phone: '12345678',
      pickup_address: 'Test Address 123, 0001 Oslo, Norway',
      delivery_address: 'Test Delivery 456, 0002 Oslo, Norway',
      package_size: 'medium',
    };

    const { data: insertData, error: insertError } = await supabase
      .from('orders')
      .insert(dummyOrder)
      .select();

    if (insertError) {
      return NextResponse.json(
        { 
          success: false, 
          error: insertError.message,
          details: insertError,
          connection: {
            url: 'Configured',
            anonKey: 'Configured',
          },
          message: 'Connection successful, but insert failed. Check table schema and RLS policies.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection verified and test order inserted successfully',
      connection: {
        url: 'Configured',
        anonKey: 'Configured',
      },
      testOrder: insertData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Unknown error',
        connection: {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Configured' : 'Missing',
          anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Configured' : 'Missing',
        }
      },
      { status: 500 }
    );
  }
}
