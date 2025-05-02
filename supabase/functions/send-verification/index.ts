
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
    
    const { phoneNumber, email, password } = await req.json();
    
    if (!phoneNumber || !email || !password) {
      return new Response(
        JSON.stringify({ error: "Phone number, email, and password are required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }
    
    // Check if phone number exists in our admin_users table
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('phone_number', phoneNumber)
      .single();
    
    if (adminError || !adminData) {
      console.error("Error checking admin user:", adminError);
      return new Response(
        JSON.stringify({ error: "Unauthorized phone number" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 403 }
      );
    }
    
    // Generate verification code (6 digits)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // Code expires in 15 minutes
    
    // First create or update the auth.user
    let userId = adminData.id;
    
    // Check if user exists with this email
    const { data: existingUser, error: userError } = await supabaseAdmin.auth.admin.getUserByEmail(email);
    
    if (!existingUser) {
      // Create new user
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        phone: phoneNumber
      });
      
      if (createError) {
        console.error("Error creating user:", createError);
        return new Response(
          JSON.stringify({ error: "Failed to create admin user" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
        );
      }
      
      userId = newUser.user.id;
      
      // Update the admin_users table with the new user id
      await supabaseAdmin
        .from('admin_users')
        .update({ id: userId })
        .eq('phone_number', phoneNumber);
    } else {
      userId = existingUser.user.id;
    }
    
    // Save verification code
    await supabaseAdmin
      .from('verification_codes')
      .insert({
        admin_id: userId,
        code: verificationCode,
        expires_at: expiresAt.toISOString(),
      });
    
    // In a real-world scenario, we would send an SMS here
    console.log(`Would send verification code ${verificationCode} to ${phoneNumber}`);
    
    // For development purposes, return the code in the response
    return new Response(
      JSON.stringify({ 
        message: "Verification code sent",
        // Only include code in development
        code: verificationCode
      }),
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
