const TeleBot = require('../');
const bot = new TeleBot('410634008:AAHeCljq1fdI4ZRHvkB4MUGx3mQ-Yz8qCIc');

photoUrl = "https://drive.google.com/open?id=0B2kSTkTZoo99RVlZbklELXFId2s";

bot.on('/time', msg => {

    return bot.sendMessage(msg.from.id, 'Getting time...').then(re => {
        // Start updating message
        updateTime(msg.from.id, re.result.message_id);
    });

});

function updateTime(chatId, messageId) {

    // Update every second
    setInterval(() => {
        bot.editMessageText(
            {chatId, messageId}, `<b>Current time:</b> ${ time() }`,
            {parseMode: 'html'}
        ).catch(error => console.log('Error:', error));
    }, 1000);

}

// Griaule Command
bot.on('/griaule', msg => {
    //bot.sendMessage(msg.from.id, 'Big Data Pergolados');
    return bot.sendPhoto(
        msg.from.id, photoUrl, {caption: 'Big Data Pergolados'}
    )
});

// Horários Circular UNICAMP
bot.on('/circular', msg => {
    
        let replyMarkup = bot.inlineKeyboard([
            [
                bot.inlineButton("Circular 1",{url: 'http://www.prefeitura.unicamp.br/documentos/HORARIO%20CIRCULAR%20I'})
            ],
            [
                bot.inlineButton("Circular 2",{url: 'http://www.prefeitura.unicamp.br/documentos/HORARIO%20CIRCULAR%20II'})
            ],
            [
                bot.inlineButton("Circular Noturno",{url: 'http://www.prefeitura.unicamp.br/documentos/HORARIO%20CIRCULAR%20NOTURNO'})
            ],
        ]);
    
        return bot.sendMessage(msg.from.id, 'Qual circular?', {replyMarkup});
    
    });

bot.start();

// Get current time
function time() {
    return new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}


