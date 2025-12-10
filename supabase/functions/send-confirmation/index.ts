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

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
            .container { background-color: #ffffff; border-radius: 12px; border: 1px solid #e6e6e6; padding: 32px; max-width: 600px; margin: 40px auto; }
            .header { text-align: center; margin-bottom: 20px; }
            .heading { color: #007bff; font-size: 24px; margin: 16px 0; }
            .content { font-size: 16px; color: #333; line-height: 1.6; }
            .vehicle-box { background-color: #f5f9ff; border-radius: 8px; padding: 12px 16px; margin: 16px 0; }
            .vehicle-name { margin: 0; font-size: 16px; font-weight: bold; color: #0056b3; }
            .button { background-color: #007bff; color: #fff; padding: 12px 28px; border-radius: 8px; font-size: 16px; text-decoration: none; font-weight: bold; display: inline-block; }
            .footer { text-align: center; font-size: 13px; color: #999; margin-top: 32px; }
            .divider { margin: 32px 0; border-top: 1px solid #e6e6e6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://servidor-estaticos-one-puce.vercel.app/fipe_logo_black.png" alt="FipeRadar" width="48" style="margin: 0 auto 16px;">
              <h1 class="heading">Confirme seu monitoramento FIPE</h1>
            </div>

            <div class="content">
              <p>Olá 👋,</p>
              <p>Você (ou alguém) solicitou receber monitoramentos de preço da FIPE para o veículo:</p>

              <div class="vehicle-box">
                <p class="vehicle-name">${record.brand_name || 'Veículo não especificado'}</p>
              </div>

              <p>Para confirmar que este e-mail realmente deseja receber as notificações, clique no botão abaixo:</p>

              <p>
                <a href="${confirmUrl}" class="button">Confirmar meu monitoramento</a>
              </p>

              <p style="font-size: 14px; color: #777; margin-top: 24px;">
                Caso você não tenha solicitado este monitoramento, basta ignorar este e-mail.
                Nenhuma ação será tomada.
              </p>
            </div>

            <div class="divider"></div>

            <div class="footer">
              <p>© ${new Date().getFullYear()} FipeRadar — Todos os direitos reservados.</p>
              <p>Este é um e-mail automático, não responda.</p>
            </div>
          </div>
        </body>
      </html>
    `

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
