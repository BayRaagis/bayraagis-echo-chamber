
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get admin activities with user emails
    const { data, error } = await supabaseAdmin.from('admin_activity')
      .select(`
        id,
        admin_id,
        action_type,
        entity_type,
        entity_id,
        details,
        created_at,
        profiles!admin_activity_admin_id_fkey(email)
      `)
      .order('created_at', { ascending: false })
      .limit(50);
      
    if (error) {
      console.error("Error fetching admin activity:", error);
      return new Response(
        JSON.stringify({ error: "Failed to fetch admin activity" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }
    
    // Format the response to include admin email
    const formattedActivities = data.map(activity => ({
      ...activity,
      admin_email: activity.profiles?.email || 'Unknown'
    }));
    
    return new Response(
      JSON.stringify(formattedActivities),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error:", error);
    
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
