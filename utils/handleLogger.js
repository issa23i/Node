/**
 * Objeto que envía los mensajes de registro al servicio Slack.
 * @param {string} message - El mensaje que se desea enviar a Slack.
*/
const {IncomingWebhook} = require('@slack/webhook')

const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK)


const loggerStream = {
    /**
    * Envía el mensaje de registro a Slack.
    * @param {string} message - El mensaje que se desea enviar a Slack.
    */
    write: message => {
        webHook.send({
            text:message
        })
    },
};

module.exports = loggerStream

