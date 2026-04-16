'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Event } from '@/types/event';

export async function findAllEvents() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  const events: Event[] = [];

  if (user) {
    const { data, error: findAllEventsError } = await supabase.from('events').select('*').eq('user_id', user.id);

    if (findAllEventsError) {
      console.error('Error finding event:', findAllEventsError);
      return events;
    }

    data.forEach((event_raw) => {

      events.push({
        id: event_raw.id,
        title: event_raw.title
      });
    });

  } else {
    console.error('No user found');
    return events;
  }

  return events;
}

export async function findEventById(id: number) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  if (user) {
    const { data, error: findEventByIdError } = await supabase.from('events').select('*').eq('id', id).eq('user_id', user.id).single();

    if (findEventByIdError) {
      console.error('Error finding event:', findEventByIdError);
      return null;
    }

    if (!data) {
      console.error('Event not found');
      return null;
    }

    return {
      id: data.id,
      title: data.title
    };
  } else {
    console.error('No user found');
    return null;
  }
}