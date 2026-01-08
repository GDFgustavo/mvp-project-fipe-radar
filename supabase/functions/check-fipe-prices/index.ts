import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { Resend } from "https://esm.sh/resend@3.2.0"

const supabase = createClient(
  Deno.env.get("SUPA_URL")!,
  Deno.env.get("SUPA_SERVICE_ROLE_KEY")!
)

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!)

//  Função para consultar a FIPE
async function getFipePrice(
  vehicleType: string,
  brand: string,
  model: string,
  year: string
) {
  try {
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

//  Função principal
Deno.serve(async () => {
  console.log("Verificando monitoramento de preço FIPE...")

  const { data: alerts, error } = await supabase
    .from("price_alerts")
    .select("*")
    .eq("email_sent", false)
    .eq("is_confirmed", true)

  if (error) {
    console.error("Erro ao buscar monitoramentos:", error)
    return new Response("Erro ao buscar monitoramentos", { status: 500 })
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

      const emailHtml = `<!DOCTYPE html>
<html>

<body>
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table width="600" bgColor="#fff" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="text-align:center; padding:32px; background-color: #0049e6; border-radius:8px;">
                            <img src="https://servidor-estaticos-one-puce.vercel.app/fipe_logo_white.png" width="48"
                                alt="FipeRadar" style="margin:0 auto 16px;" />
                            <h1
                                style="margin:0; font-size:24px; font-family:'Roboto', Arial, sans-serif; color:white; line-height:1.3;">
                                🎯 Monitoramento FIPE Ativado!
                            </h1>
                            <p
                                style="margin:10px 0 0 0; font-size:16px; font-family:'Roboto', Arial, sans-serif; color:white; opacity:0.9;">
                                Seu veículo atingiu o preço alvo desejado
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td height="24" style="font-size:20px; line-height:24px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td>
                            <p
                                style="color:#374151; font-size:18px; font-family:'Roboto', Arial, sans-serif; line-height:1.6; font-weight: bold; padding:0px 16px; margin: 0;">
                                O preço Fipe chegou ao valor que você esperava.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td height="24" style="font-size:20px; line-height:24px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="background-color:#f3f4f6; padding:12px 16px; border-radius:8px;">
                            <p
                                style="color:#374151; font-size:18px; font-family:'Roboto', Arial, sans-serif; font-weight: bold; margin:0 0 15px 0;">
                                Veículo
                                Monitorado
                            </p>
                            <p
                                style="color:#374151; font-size:15px; font-family:'Roboto', Arial, sans-serif; margin:0 0 8px 0;">
                                <strong>Marca:</strong> ${alert.brand_name}
                            </p>
                            <p
                                style="color:#374151; font-size:15px; font-family:'Roboto', Arial, sans-serif; margin:0 0 8px 0;">
                                <strong>Modelo:</strong> ${alert.model_name}
                            </p>
                            <p
                                style="color:#374151; font-size:15px; font-family:'Roboto', Arial, sans-serif; margin:0;">
                                <strong>Ano:</strong> ${alert.year_name}
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td height="32" style="font-size:20px; line-height:32px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td
                            style="text-align:center; background-color:#011f60; color:white; padding:20px; border-radius:8px;">
                            <p style="font-size:16px; font-family:'Roboto', Arial, sans-serif; margin:0;">Seu preço alvo
                                era</p>
                            <strong
                                style="font-size:20px; font-family:'Roboto', Arial, sans-serif;">R$
                                ${alert.target_price}</strong>
                            <p style="font-size:18px; margin:16px 0;">⬇️</p>
                            <p style="font-size:16px; font-family:'Roboto', Arial, sans-serif; margin:0;">Preço Fipe
                                atual</p>
                            <strong
                                style="font-size:20px; font-family:'Roboto', Arial, sans-serif;">R$
                                ${fipePrice}</strong>
                        </td>
                    </tr>

                    <tr>
                        <td height="32" style="font-size:20px; line-height:32px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="background:#fff3cd; padding:15px; border-radius:8px;">
                            <h4
                                style="margin:0 0 10px 0; font-size:16px; font-family:'Roboto', Arial, sans-serif; color:#333;">
                                💡 Dica Importante</h4>
                            <p
                                style="margin:0; font-size:14px; font-family:'Roboto', Arial, sans-serif; color:#333; line-height:1.5;">
                                Lembre-se que o preço FIPE é uma referência. Os preços de mercado podem variar conforme
                                o estado do veículo, localização e outros fatores.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td height="32" style="font-size:20px; line-height:32px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="padding:0px 16px;">
                            <p
                                style="color:#374151; font-size:15px; font-family:'Roboto', Arial, sans-serif; line-height:1.6; margin: 0;">
                                Se quiser, você pode visitar o veículo pessoalmente e verificar as condições reais.
                                Caso deseje acompanhar outro veículo, basta ativar um novo monitoramento na plataforma.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td height="40" style="font-size:20px; line-height:40px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="text-align:center;">
                            <a href="https://www.fiperadar.site/"
                                style="background-color:#0049e6; color:white; font-size:16px; font-family:'Roboto', Arial, sans-serif; font-weight:bold; text-decoration: none; border-radius:4px; padding:12px 24px; text-align:center;">
                                Acessar Fipe Radar
                            </a>
                        </td>
                    </tr>

                    <tr>
                        <td height="40" style="font-size:20px; line-height:40px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="padding: 16px;">
                            <p
                                style="color:#9ca3af; font-size:13px; font-family:'Roboto', Arial, sans-serif; text-align:center; line-height:1.5;">
                                Este e-mail foi enviado automaticamente pelo sistema do
                                <strong>FipeRadar</strong>.
                                <br />Você está recebendo este alerta porque cadastrou um monitoramento de preço na
                                plataforma.
                            </p>
                            <p
                                style="font-size:13px; font-family:'Roboto', Arial, sans-serif; color:#9ca3af; text-align:center; padding-top: 10px;">
                                © 2025 FipeRadar — Todos os direitos reservados.<br />
                                Este é um e-mail automático, não responda.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`


      if ((alert.price_trend === 'down' && fipePrice && fipePrice <= alert.target_price) ||
        (alert.price_trend === 'up' && fipePrice && fipePrice >= alert.target_price)) {
        await resend.emails.send({
          from: "Fipe Radar <monitoring@fiperadar.site>",
          to: alert.email,
          subject: "🚗 Monitoramento de preço FIPE atingido!",
          html: emailHtml,
        })

        await supabase
          .from("price_alerts")
          .update({ email_sent: true })
          .eq("id", alert.id)

        console.log(`📩 Email enviado para ${alert.email}`)
      }
    } catch (err) {
      console.error("Erro ao processar monitoramento:", err)
    }
  }

  return new Response("Verificação concluída")
})
