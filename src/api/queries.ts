
import { supabase } from './client';

// This is just an example, adjust it to your actual table and data structure
export const getChatList = async () => {
  const { data, error } = await supabase.from('chats').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
