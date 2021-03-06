const imgurSearchRequests = require("../../utils/imgurSearchRequests");
const SearchParameter = require("../../utils/searchParameterConstructor");
const imageEmbed = require("../../utils/imageEmbed");
const prefix = process.env.PREFIX;

module.exports = {
  name: "kiss",
  category: "fun",
  description: "Fetches kiss (anime) animations off Imgur.",
  usage: `\`${prefix}kiss\``,

  async execute(message, args) {
    const searchParameters = new SearchParameter("kiss", "anime", "anigif");
    const results = await imgurSearchRequests(searchParameters);

    const randomAlbum = results[Math.floor(Math.random() * results.length)];

    try {
      if (!randomAlbum.hasOwnProperty("images")) {
        const embed = imageEmbed(randomAlbum.link);
        embed.description =
          message.mentions.members.size == 0
            ? `${message.author} kisses`
            : `${message.author} kisses ${message.mentions.members.first()}`;
        return message.channel.send(embed);
      } else {
        const randomImageLink =
          randomAlbum.images[
            Math.floor(Math.random() * randomAlbum.images.length)
          ].link;
        const embed = imageEmbed(randomImageLink);
        embed.description =
          message.mentions.members.size == 0
            ? `${message.author} kisses`
            : `${message.author} kisses ${message.mentions.members.first()}`;
        return message.channel.send(embed);
      }
    } catch (error) {
      console.error(error);
      console.log(randomAlbum);
    }
  },
};
