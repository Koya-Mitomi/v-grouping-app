'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { EventInputs } from '@/types/event';

export async function addEvent(eventData: EventInputs) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  let eventId: number | null = null;

  if (user) {
    const { data, error: addEventError } = await supabase.from('events').insert({
      user_id: user.id,
      title: eventData.title,
    }).select().single();

    if (addEventError) {
      console.error('Error adding event:', addEventError);
      return null;
    }
    if (!data) {
      console.error('Error adding event: No data returned');
      return null;
    }

    eventId = data.id;
  } else {
    console.error('No user found');
    return null;
  }

  return eventId;
}
