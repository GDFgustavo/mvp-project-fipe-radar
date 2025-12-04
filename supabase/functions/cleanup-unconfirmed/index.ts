// Supabase Edge Function: cleanup-unconfirmed

import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

Deno.serve(async () => {
  const supabaseUrl = Deno.env.get("SUPA_URL")!
  const supabaseKey = Deno.env.get("SUPA_SERVICE_ROLE_KEY")!
  const supabase = createClient(supabaseUrl, supabaseKey)

  const { error } = await supabase
    .from("price_alerts")
    .delete()
    .lt("created_at", new Date(Date.now() - 15 * 1000).toISOString()) // 24h atrás
    .eq("is_confirmed", false)

  if (error) {
    console.error("Erro ao limpar alertas antigos:", error)
    return new Response("Erro ao limpar alertas", { status: 500 })
  }

  return new Response("Alertas antigos removidos com sucesso!", { status: 200 })
})
