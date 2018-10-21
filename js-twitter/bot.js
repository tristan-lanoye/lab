const Twit = require('twit')
const config = require('./config')

const T = new Twit(config)
const replyStream = T.stream('user')


const tweetEvent = (eventMessage) => {
    console.log('new message')
    const fs = require('fs')
    let json = JSON.stringify(eventMessage, null, 2)
    fs.writeFile('tweet.json', json)

    const name = eventMessage.user.name
    const screenName = eventMessage.user.screen_name
    const message = eventMessage.text
    const mentions = eventMessage.entities.user_mentions

    for (const mention of mentions) {
        console.log('mention : ' + mention.screen_name)
        if (mention.screen_name == 'BotNfl') {
            T.post('statuses/update', {
                status: `@${screenName} hello hooman (i\'m a bot)`
            }, function (err, data, response) {
                if(err) {
                    console.log('well shit') 
                } else {
                    console.log('doot doot')
                }
            })
        }
    }
}

replyStream.on('tweet', tweetEvent)
console.log('app is listening')

// T.get('search/tweets', {
//     q: '@aaronrodgers12 ‏ since:2017-07-11',
//     count: 5
// }, function (err, data, response) {
//     const tweets = data.statuses
//     for(const tweet of tweets) {
//         const mentions = tweet.entities.user_mentions
//         console.log('tweet : ' + tweet.text)
//         console.log('author : ' + tweet.user.screen_name)
//         for(const mention of mentions)
//         console.log('mention : ' + mention.screen_name)
//     }
// })

// T.post('statuses/update', {
//     status: 'NFL Stats'
// }, function (err, data, response) {
//     console.log(data)
// })