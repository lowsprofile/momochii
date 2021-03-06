const { Message, RichEmbed } = require('discord.js');
const isSameChannel = require('../utils/isSameChannel');

module.exports = {
  name: 'skip',
  description: 'Melanjutkan ke lagu berikutnya.',
  execute(message = new Message) {
    if (!isSameChannel(message)) return;
    if (
      message.member.voiceChannel.connection
      && message.member.voiceChannel.connection.dispatcher
    ) {
      const song = message.client.queue.get(message.guild.id)[0];
      message.channel.send(
        new RichEmbed()
          .setTitle(`:track_next: Berhenti memutar lagu "${song.title} - ${song.artist}" dan melanjutkan ke lagu berikutnya`)
          .setFooter(
            `Diminta oleh ${message.author.username}`,
            message.author.displayAvatarURL
          )
      )
        .then(() => {
          message.member.voiceChannel.connection.dispatcher.end();
        });
    }
  },
};