import { createServerClient} from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
      supabaseUrl,
      supabasePublishableKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll().map(cookie => ({ name: cookie.name, value: cookie.value }));
          },
          setAll(cookies) {
            cookies.forEach(cookie => {
              try {
                cookieStore.set({ name: cookie.name, value: cookie.value, ...cookie.options });
              } catch (error) {
              }
            });
          }
        },
      }
    );
}