const express= require ('express')
const bodyParser= require('body-parser')
const request =require('request')

const app=express()
const token= process.env.FB_VERIFY_TOKEN
const access= process.env.FB_ACCESS_TOKEN

app.set('port',(process.env.PORT||5000))

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.get('/',function(req,res)
{
    
    res.send('Hello Youtube')
})

app.get('/webhook/',function(req,res)
{
    if(req.query['hub.verify_token']===token)
    {
        res.send(req.query['hub.challenge'])
    }
    res.send('No Entry')
})
app.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});
  
function receivedMessage(event) {
  // Putting a stub for now, we'll expand it in the following steps
  console.log("Message data: ", event.message);
}
app.listen(app.get('port'),function()
{
    console.log('running on port',app.get('port'))
})


