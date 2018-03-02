
/*
 Initialsization of variable 
*/
const express= require ('express')
const http=require('http')
const bodyParser= require('body-parser')
const request =require('request')



const app=express()
const token= 'FB_token'
const access= 'FB_access'

app.set('port',(process.env.PORT||5000))

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())
/* ************************************
   *     route to heroku index            *              
   *************************************/

app.get('/',function(req,res)
{
    
    
    res.send('Hello Youtube')
})

/* ************************************
   *     route to get  webhouk        *              
   *************************************/

app.get('/webhook/',function(req,res)
{
    if(req.query['hub.verify_token']===token)
    {
        res.send(req.query['hub.challenge'])
    }
    scheduledJobs(senderId);
    res.send('No Entry');
})
 
/* ************************************
   *     route to handle webhook post *              
   *************************************/

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
          var senderId= event.sender.id;
          
        if (event.message) {
          sendApiMessage(event);
        }
          else if (event.postback)
              {
                // handle your postback here
                 console.log('webhook received  postback event')
              }
              else {
                  
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

// sends message to user




//Call send Message API Function start//
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token":access},
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}
function sendApiMessage(event)
{
 let sender =event.sender.id;
    let text= event.message.text;
    let aitext='';
    switch(text)
    {
       case "welcome message":
         aitext="response to welcome";
        callSendAPI(sender,aitext);
        break;

        case "start conversation":
         aitext="response to start conversation";
          callSendAPI(sender,aitext);
        break;
        case " continue conversation":
          aitext="response to continue conversation";
          callSendAPI(sender,aitext);
        break;
        // insert more conversation here //

        default:
        aitext='hey wazzup!!!';
        callSendAPI(sender,aitext);
        break;

    }
        
        
   

}
// Call Send Message ApO End 

// start server 

app.listen(app.get('port'),function()
{

    console.log('running on port',app.get('port'))
})


