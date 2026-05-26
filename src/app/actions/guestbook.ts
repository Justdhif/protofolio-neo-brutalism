'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function addGuestbookMessage(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !message) {
    return { error: 'Name and message are required' };
  }

  const { error } = await supabase
    .from('guestbook')
    .insert([{ name, email: email || null, message }]);

  if (error) {
    console.error('Supabase error:', error);
    return { error: 'Failed to add message' };
  }

  revalidatePath('/');
  return { success: true };
}

export async function getGuestbookMessages() {
  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Supabase error:', error);
    return [];
  }

  return data;
}
