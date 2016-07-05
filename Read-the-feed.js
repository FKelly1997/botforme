var Botkit = require('botkit');
var rss = require("./RSSmodule")
var controller = Botkit.slackbot({
  debug: false
});

controller.spawn({
  token: "xoxb-56647282739-jl72kuBtnOo14OgBVHbJ9A1R",
}).startRTM()

controller.hears('what is in the news',['direct_message','direct_mention','mention'],function(bot,message) {

  rss("http://feeds.bbci.co.uk/news/science_and_environment/rss.xml?edition=uk#", function (list) {
    for (var i in list) {
      bot.reply(message, list[i]);
    }

  });
});

controller.hears('what is in reddit (.*)',['direct_message','direct_mention','mention'],function(bot,message) {

  rss("https://www.reddit.com/r/" + message.match[1] + ".rss", function (list) {
    for (var i in list) {
      bot.reply(message, list[i]);
    }

  });
});