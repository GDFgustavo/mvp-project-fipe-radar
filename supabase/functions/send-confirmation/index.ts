// Gera token de confirmação e envia e-mail de ativação

import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { Resend } from "https://esm.sh/resend@3.2.0"

Deno.serve(async (req) => {
  // Trata o preflight CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  }

  try {
    // Variáveis de ambiente
    const supabaseUrl = Deno.env.get("SUPA_URL")!
    const supabaseKey = Deno.env.get("SUPA_SERVICE_ROLE_KEY")!
    const resendKey = Deno.env.get("RESEND_API_KEY")!

    const supabase = createClient(supabaseUrl, supabaseKey)
    const resend = new Resend(resendKey)

    // Lê o corpo da requisição
    const { record } = await req.json()

    // Gera token (ou usa o do Supabase)
    const token = record.confirmation_token || crypto.randomUUID()

    // Atualiza o registro com o token
    await supabase
      .from("price_alerts")
      .update({ confirmation_token: token })
      .eq("id", record.id)

    // Cria URL de confirmação
    const confirmUrl = `https://www.fiperadar.site/confirm?token=${token}`

    const emailHtml = `<!DOCTYPE html>
<html>

<body>
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table width="600" bgColor="#fff" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="text-align: center; padding: 32px;">
                            <img src="https://servidor-estaticos-one-puce.vercel.app/fipe_logo_black.png"
                                alt="FipeRadar" style="margin: 0 auto 16px; width: 48px;">
                            <h1 style="color:#000; font-size: 24px; font-family:'Roboto', Arial, sans-serif; ">
                                Confirme seu monitoramento FIPE
                            </h1>
                        </td>
                    </tr>

                    <tr>
                        <td height="24" style="font-size:20px; line-height:24px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="padding: 16px;">
                            <p
                                style="font-size: 16px; font-family:'Roboto', Arial, sans-serif; color: #000; line-height: 1.6;">
                                Olá 👋,</p>
                            <p
                                style="font-size: 16px; font-family:'Roboto', Arial, sans-serif; color: #000; line-height: 1.6;">
                                Você (ou alguém) solicitou
                                receber monitoramentos de preço da FIPE para o veículo:</p>
                        </td>
                    </tr>

                    <tr>
                        <td height="24" style="font-size:20px; line-height:24px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="background-color: #f3f4f6; border-radius: 8px; padding: 12px 16px;">
                            <p
                                style="color:#000; font-size: 16px; font-family:'Roboto', Arial, sans-serif; font-weight: bold;">
                              ${record.brand_name || 'Marca não especificado'} ${record.model_name || 'Modelo não especificado'}
                              </p>
                        </td>
                    </tr>

                    <tr>
                        <td height="24" style="font-size:20px; line-height:24px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="padding: 16px;">
                            <p
                                style="font-size: 16px; font-family:'Roboto', Arial, sans-serif; color: #000; line-height: 1.6;">
                                Para confirmar que este e-mail
                                realmente deseja receber as notificações, clique no botão
                                abaixo:</p>
                        </td>
                    </tr>

                    <tr>
                        <td height="32" style="font-size:20px; line-height:32px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="padding: 16px; text-align: center;">
                            <a href="${confirmUrl}"
                                style="background-color: #0049e6; color: #fff; padding: 12px 28px; border-radius: 4px; font-size: 16px; font-family:'Roboto', Arial, sans-serif; font-weight: bold; text-decoration: none;">Confirmar
                                meu monitoramento</a>
                        </td>
                    </tr>

                    <tr>
                        <td height="40" style="font-size:20px; line-height:40px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="padding: 16px;">
                            <p style="font-size: 14px; font-family:'Roboto', Arial, sans-serif; color: #777;">
                                Caso você não tenha solicitado este monitoramento, basta ignorar este e-mail.
                                Nenhuma ação será tomada.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td height="32" style="font-size:20px; line-height:32px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="padding: 16px;">
                            <p
                                style="text-align: center;  font-size: 13px; font-family:'Roboto', Arial, sans-serif; color: #999;">
                                © ${new Date().getFullYear()} FipeRadar — Todos os direitos reservados.</p>
                            <p
                                style="text-align: center;  font-size: 13px; font-family:'Roboto', Arial, sans-serif; padding: 10px; color: #999;">
                                Este é um e-mail automático, não responda.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`

    // Envia o e-mail
    await resend.emails.send({
      from: "Fipe Radar <alerts@fiperadar.site>",
      to: record.email,
      subject: "🚗 Confirme seu alerta de preço FIPE",
      html: emailHtml,
    })

    // Retorna resposta OK + CORS
    return new Response("E-mail de confirmação enviado com sucesso.", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.error("Erro na função send-alert-email:", err)
    return new Response("Erro interno", {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    })
  }
})
