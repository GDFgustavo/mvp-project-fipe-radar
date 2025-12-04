import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { Resend } from "https://esm.sh/resend@3.2.0"

const supabase = createClient(
  Deno.env.get("SUPA_URL")!,
  Deno.env.get("SUPA_SERVICE_ROLE_KEY")! // importante: precisa do service role
)

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!)

// 🔹 Função para consultar a FIPE
async function getFipePrice(
  vehicleType: string,
  brand: string,
  model: string,
  year: string
) {
  try {
    // exemplo de endpoint (ajuste conforme necessário)
    const url = `https://parallelum.com.br/fipe/api/v2/${vehicleType}/brands/${brand}/models/${model}/years/${year}`
    const response = await fetch(url)

    if (!response.ok) {
      console.error("❌ Erro na requisição FIPE:", response.status)
      return null
    }

    const data = await response.json()
    const valor = data.price

    if (!valor) {
      console.error("❌ Campo 'price' não encontrado no retorno da FIPE:", data)
      return null
    }

    const valorNumerico = parseFloat(
      valor.replace("R$ ", "").replace(/\./g, "").replace(",", ".")
    )

    console.log("✅ Valor FIPE retornado:", valorNumerico)
    return valorNumerico
  } catch (error) {
    console.error("❌ Erro ao buscar preço FIPE:", error)
    return null
  }
}

// 🔹 Função principal
Deno.serve(async () => {
  console.log("Verificando alertas de preço FIPE...")

  const { data: alerts, error } = await supabase
    .from("price_alerts")
    .select("*")
    .eq("email_sent", false)
    .eq("is_confirmed", true)

  if (error) {
    console.error("Erro ao buscar alertas:", error)
    return new Response("Erro ao buscar alertas", { status: 500 })
  }

  for (const alert of alerts) {
    try {
      const fipePrice = await getFipePrice(
        alert.vehicle_type,
        alert.brand,
        alert.model,
        alert.year
      )

      console.log(`FIPE atual: ${fipePrice} | alvo: ${alert.target_price}`)

      const emailHtml = ` <!DOCTYPE html>
<html>
  <body style="background-color:#ffffff; margin:0; padding:0;">

    <div style="background-color:#ffffff; border-radius:8px; padding:24px; border:1px solid #e1e1e1; max-width:600px; margin:0 auto; font-family:'Helvetica Neue', Arial, sans-serif;">

      <!-- Header -->
      <div style="text-align:center; background:linear-gradient(135deg, #0049e6 0%, #6797ff 100%); border-radius:12px; border:1px solid #e6e6e6; padding:32px;">
        <img src="https://servidor-estaticos-one-puce.vercel.app/fipe_logo_white.png" width="48" alt="FipeRadar" style="margin:0 auto 16px;" />
        <h1 style="margin:0; font-size:24px; color:white; line-height:1.3;">
          🎯 Alerta FIPE Ativado!
        </h1>
        <p style="margin:10px 0 0 0; font-size:16px; color:white; opacity:0.9;">
          Seu veículo atingiu o preço alvo desejado
        </p>
      </div>

      <!-- Intro Text -->
      <p style="color:#374151; font-size:18px; line-height:1.6; font-weight: bold; margin: 20px 0px 20px;" >
        O preço Fipe chegou ao valor que você esperava.
      </p>

      <!-- Vehicle info -->
      <div style="background-color:#f3f4f6; border-radius:6px; padding:12px 16px; margin:16px 0;">
        <p style="color:#374151; font-size:18px; font-weight: bold; margin:0 0 15px 0;">Veículo Monitorado</p>

        <p style="color:#374151; font-size:15px; margin:0 0 8px 0; word-break:break-word;">
          <strong>Marca:</strong> ${alert.brand_name}
        </p>

        <p style="color:#374151; font-size:15px; margin:0 0 8px 0; word-break:break-word;">
          <strong>Modelo:</strong> ${alert.model_name}
        </p>

        <p style="color:#374151; font-size:15px; margin:0; word-break:break-word;">
          <strong>Ano:</strong> ${alert.year_name}
        </p>
      </div>

      <!-- Price box -->
      <div style="text-align:center; background:linear-gradient(135deg, #0049e6 0%, #011f60 100%); color:white; padding:20px; border-radius:8px; margin:20px 0;">
        <p style="font-size:16px; margin:0;">Seu preço alvo era</p>
        <strong style="font-size:24px; word-break:break-word;">R$ ${alert.target_price}</strong>

        <p style="font-size:18px; margin:16px 0;">⬇️</p>
        <p style="font-size:18px; margin:0;">Preço Fipe atual</p>

        <strong style="font-size:32px; word-break:break-word;">R$ ${fipePrice}</strong>
      </div>

      <!-- Dica -->
      <div style="background:#fff3cd; padding:15px; border-radius:5px; margin:15px 0;">
        <h4 style="margin:0 0 10px 0; font-size:16px; color:#333;">💡 Dica Importante</h4>
        <p style="margin:0; font-size:14px; color:#333; line-height:1.5;">
          Lembre-se que o preço FIPE é uma referência. Os preços de mercado podem variar conforme o estado do veículo, localização e outros fatores.
        </p>
      </div>

      <!-- Suggestion -->
      <p style="color:#374151; font-size:15px; line-height:1.6;">
        Se quiser, você pode visitar o veículo pessoalmente e verificar as condições reais.
        Caso deseje acompanhar outro veículo, basta ativar um novo monitoramento na plataforma.
      </p>

      <!-- Button -->
      <a href="https://www.fiperadar.site/"
        style="background-color:#0049e6; color:white; font-size:16px; font-weight:bold; padding:12px 24px; border-radius:6px; text-decoration:none; display:inline-block; text-align:center; margin-top:10px;">
        Acessar Fipe Radar
      </a>

      <hr style="border-color:#e5e7eb; margin:24px 0;" />

      <!-- Footer -->
      <p style="color:#9ca3af; font-size:13px; text-align:center; line-height:1.5;">
        Este e-mail foi enviado automaticamente pelo sistema do
        <strong style="margin-left:8px;">FipeRadar</strong>.
        <br />Você está recebendo este alerta porque cadastrou um monitoramento de preço na plataforma.
      </p>

      <p style="font-size:13px; color:#9ca3af; text-align:center;">
        © 2025 FipeRadar — Todos os direitos reservados.<br />
        Este é um e-mail automático, não responda.
      </p>

    </div>
  </body>
</html>
 `


      if ((alert.price_trend === 'down' && fipePrice && fipePrice <= alert.target_price) ||
        (alert.price_trend === 'up' && fipePrice && fipePrice >= alert.target_price)) {
        await resend.emails.send({
          from: "Fipe Radar <alerts@fiperadar.site>",
          to: alert.email,
          subject: "🚗 Alerta de preço FIPE atingido!",
          html: emailHtml,
        })

        await supabase
          .from("price_alerts")
          .update({ email_sent: true })
          .eq("id", alert.id)

        console.log(`📩 Email enviado para ${alert.email}`)
      }
    } catch (err) {
      console.error("Erro ao processar alerta:", err)
    }
  }

  return new Response("Verificação concluída")
})
