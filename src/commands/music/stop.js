const { stopEmbed } = require("../utils/embeds");

module.exports = {
  name: "stop",
  description: "Stops the music player and removes all songs from the queue.",
  execute(message, args) {
    // Fetch globalqueue and serverqueue
    const globalQueue = message.client.queue;
    const serverQueue = globalQueue.get(message.guild.id);

    // Check that user is in the voice channel
    const userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) {
      return message.channel.send(
        "You have to be in a voice channel for me to stop the music!"
      );
    }

    // Check that bot is in the voice channel
    if (
      message.guild.voice == undefined ||
      userVoiceChannel !== message.guild.voice.channel
    ) {
      return message.channel.send("I'm not in your voice channel!");
    } else {
      // Check for song in queue
      if (!serverQueue) {
        message.channel.send(stopEmbed());
        message.guild.voice.setChannel(null);
        return;
      } else {
        if (serverQueue.connection.dispatcher) {
          // Remove songs from queue, stop connecting to voice channel
          serverQueue.songs = [];
          serverQueue.connection.dispatcher.end();
          message.guild.voice.channel.leave();
        } else {
          serverQueue.songs = [];
          message.channel.send(stopEmbed());
          message.guild.voice.channel.leave();
          return;
        }
      }
    }
  },
};