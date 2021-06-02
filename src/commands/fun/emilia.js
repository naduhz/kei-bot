const imgurSearchRequests = require("../utils/imgurSearchRequests");
const SearchParameter = require("../utils/searchParameterConstructor");
const imageEmbed = require("../utils/imageEmbed");

module.exports = {
  name: "emilia",
  description: "Fetches Emilia animations off imgur",

  async execute(message, args) {
    const searchParameters = new SearchParameter("emilia", "anime", "gif");
    const results = await imgurSearchRequests(searchParameters);

    const randomAlbum = results[Math.floor(Math.random() * results.length)];

    try {
      if (!randomAlbum.hasOwnProperty("images")) {
        const embed = imageEmbed(randomAlbum.link);
        embed.description = `EMT!! (Emilia-tan Maji Tenshi!!)`;
        return message.channel.send(embed);
      } else {
        const randomImageLink =
          randomAlbum.images[
            Math.floor(Math.random() * randomAlbum.images.length)
          ].link;
        const embed = imageEmbed(randomImageLink);
        embed.description = `EMT!! (Emilia-tan Maji Tenshi!!)`;
        return message.channel.send(embed);
      }
    } catch (error) {
      console.error(error);
      console.log(randomAlbum);
    }
  },
};