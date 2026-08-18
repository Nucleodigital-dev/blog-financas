import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function requireAdminUser() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user }, error } = await supabase.auth.getUser();
  return { supabase, user: error ? null : user };
}
