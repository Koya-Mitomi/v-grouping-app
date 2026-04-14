'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { EventInputs } from '@/types/event';

export async function addEvent(eventData: EventInputs) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  if (user) {
    const { error: addEventError } = await supabase.from('events').insert({
      user_id: user.id,
      title: eventData.title,
    });

    if (addEventError) {
      console.error('Error adding event:', addEventError);
      return false;
    }
  } else {
    console.error('No user found');
    return false;
  }

  return true;
}