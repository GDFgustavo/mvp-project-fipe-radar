import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

Deno.serve(async () => {
  const supabaseUrl = Deno.env.get("SUPA_URL")!
  const supabaseKey = Deno.env.get("SUPA_SERVICE_ROLE_KEY")!
  const supabase = createClient(supabaseUrl, supabaseKey)

  const { error } = await supabase
    .from("price_alerts")
    .delete()
    .lt("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .eq("is_confirmed", false)

  if (error) {
    console.error("Erro ao limpar monitoramentos antigos:", error)
    return new Response("Erro ao limpar monitoramentos", { status: 500 })
  }

  return new Response("Monitoramentos antigos removidos com sucesso!", { status: 200 })
})
