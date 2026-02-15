import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cddmrhlenmgzfqfmdixb.supabase.co';
const supabaseKey = 'sb_publishable_ugMfwrDhHbgHBOkOoojoDw_A8aUN8ew';

export const supabase = createClient(supabaseUrl, supabaseKey);
