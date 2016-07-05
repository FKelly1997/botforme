

RssReader = function (url,callback) {

var FeedParser = require('feedparser')
  , request = require('request');

  //var req = request(process.argv[1])
  var req = request(url)
  , feedparser = new FeedParser([]);

  req.on('error', function (error) {
  // handle any request errors
});
req.on('response', function (res) {
  var stream = this;

  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

  stream.pipe(feedparser);
});
feedparser.on('error', function(error) {
  // always handle errors
});
feedparser.on('readable', function() {
  // This is where the action is!
  var stream = this
    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
    , item;

var list = []
  while (item = stream.read()) {
    list.push(item.link);
    }

    callback(list);

  });
}

module.exports = RssReader