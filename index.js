const express= require ('express')
const bodyParser= require('body-parser')
const request =require('request')
const apiaiApp= require('apiai')('90b3e04e3f5c46098831410ade6fcb8b')
 

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
          sendApiMessage(event);
        }
          else if (event.postback)
              {
                  processPostback(event);
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



 //Handle Received Message Function start 
function receivedMessage(event) {
 var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;
    

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;
    var welcomeText="salut comment-allez que puis je faire pour vous ?";

  if (messageText) {

    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (messageText) {
      case 'generic':
        sendGenericMessage(senderID);
      
        break;
        case 'salut':
            sendwelcomeMessage(senderID,"salut comment ca va ?");
            break;

      default:
        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}
//Handle Received Message end 

//Send generic Message Function start 
function sendGenericMessage(recipientId, messageText) {
  // To be expanded in later sections
    
    var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
            text:" Cliquez sur Envoyer Pour faire un Transfer et Payer Facture pour payer vos Factures!",
            buttons: [{
              type: "postback",
              title: "Transfer d'argent",
              payload: "Taransfer"
            }, {
              type: "postback",
              title: "Payer vos Factures",
              payload: "Factures"
            }
        
              ]
          }
      }
    }
  };  

  callSendAPI(messageData);
}
//Send generic Message end 


//Send default Text messag e function  start//
function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}
// Send default Text Message end //
//####### Send a Welcome Message start#######//
function sendwelcomeMessage(recipientId, welcomeText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: welcomeText
    }
  };

  callSendAPI(messageData);
}
// Send Welcome Message End //

//postback handling function start
function processPostback(event) {
  var senderId = event.sender.id;
  var payload = event.postback.payload;
// Salutation payload 
  if (payload === "Greeting") {
    // Get user's first name from the User Profile API
    // and include it in the greeting
    request({
      url: "https://graph.facebook.com/v2.6/" + senderId,
      qs: {
        access_token: access,
        fields: "first_name"
      },
      method: "GET"
    }, function(error, response, body) {
      var greeting = "";
      if (error) {
        console.log("Error getting user's name: " +  error);
      } else {
        var bodyObj = JSON.parse(body);
        name = bodyObj.first_name;
        greeting = "Salut M. " + name + ". ";
          
      }
      var message = greeting + "Mon nom c'est izipay , je suis a vos services pour tous vos tranfer d'argent et vos paiement de factures.Que direz vous faire aujourd'hui ?";
      //sendMessage(senderId, {text: message});
        //sendGenericMessage(senderId);
          var messageData = {
    recipient: {
      id: senderId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
            text:message,
            buttons: [{
              type: "postback",
              title: "Transfer d'argent",
              payload: "Transfer"
            }, {
              type: "postback",
              title: "Payer vos Factures",
              payload: "Factures"
            }
        
              ]
          }
      }
    }
  };
        callSendAPI(messageData);
    });
  
  }
    // Transfer d'argent payload 
    else if(payload==="Transfer")
        {
              request({
      url: "https://graph.facebook.com/v2.6/" + senderId,
      qs: {
        access_token: access,
        fields: "first_name"
      },
      method: "GET"
    }, function(error, response, body) {
      
      if (error) {
        console.log("Error getting user's name: " +  error);
      } else {
        var bodyObject = JSON.parse(body);
        firstname = bodyObject.first_name;
        
          
      }
      var message = "Quel transfer Désirez vous Faire "+firstname+"?";
      //sendMessage(senderId, {text: message});
        //sendGenericMessage(senderId);
          var Data = {
    recipient: {
      id: senderId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
            text:message,
            buttons: [{
              type: "postback",
              title: "local",
              payload: "local"
            }, {
              type: "postback",
              title: "International",
              payload: "International"
            }
        
              ]
          }
      }
    }
  };
        callSendAPI(Data);
    });
            

        
        }
    //Factures Payloads 
    else if(payload==="Factures")
        {
                     request({
      url: "https://graph.facebook.com/v2.6/" + senderId,
      qs: {
        access_token: access,
        fields: "first_name"
      },
      method: "GET"
    }, function(error, response, body) {
      
      if (error) {
        console.log("Error getting user's name: " +  error);
      } else {
        var bodyObject = JSON.parse(body);
        firstname = bodyObject.first_name;
        
          
      }
      var message = "Quelle factures désirez vous payer "+firstname+"?";
      //sendMessage(senderId, {text: message});
        //sendGenericMessage(senderId);
          var Data = {
    recipient: {
      id: senderId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
            text:message,
            buttons: [{
              type: "postback",
              title: "Onatel",
              payload: "Onatel"
            }, {
              type: "postback",
              title: "Sonabel",
              payload: "Sonabel"
            },
            {
                type:"postback",
                title:"Onea",
                payload:"Onea"
            }
        
              ]
          }
      }
    }
  };
        callSendAPI(Data);
    }); 
            
        }
    //Transfer Local
    else if(payload==="local")
        {
   var messageData=
       {
           recipient:
           {
               id:senderId
           },
           message:{
               text:"Entrez le numéro de téléphone du receveur"
           }
           
       };
            callSendAPI(messageData)
        
        }
    //Transfer international
    
    else if (payload==="International")
        {
           var messageData = {
    recipient: {
      id: senderId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
              title:"Envoyer de l'argent vers le Burkina",
              subtitle:"Utilisez Western Union ",
            item_url: "https://www.westernunion.com/us/en/send-money/app/start",               
            image_url: "https://seeklogo.com/images/W/western-union-logo-4A698A21BE-seeklogo.com.gif",
            buttons: [{
              type: "web_url",
              url: "https://www.westernunion.com/us/en/send-money/app/start",
              title: "Wester Union",
            webview_height_ratio:"full",
            messenger_extensions:true,
                fallback_url:"https://www.westernunion.com/us/en/price-estimator/continue.html" 
            }],
          }, {
            
            title: "MoneyGram",
            subtitle: "Envoyer Par MoneyGram",
            item_url: "https://secure.moneygram.com/send",               
            image_url: "http://logosolusa.com/wp-content/uploads/parser/MoneyGram-Logo-1.jpg",
            buttons: [{
              type: "web_url",
              url: "https://secure.moneygram.com/send",
              title: "Moneygram",
                 webview_height_ratio:"full",
            messenger_extensions:true
            }]
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
        
        }
    // Onatel payload 
    
    else if (payload==="Onatel")
        {
            var messageData=
                {
                    recipient:
                    {
                      id:senderId  
                    },
                    message:
                    {
                        text:"Veuillez Entrez votre nom et Prénom et le numero de facture"
                    }
                };
            callSendAPI(messageData);
            
        }
}

// sends message to user


//post handling function ends 

//Call send Message API Function start//
function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: access },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}
function sendApiMessage(event)
{
 let sender =event.sender.id;
    let text= event.message.text;
    let apiai= apiaiApp.textRequest(text,{
        
       sessionId:'izipay_cat' 
    });
    
    apiai.on('response',(response)=>{
        
        let aitext=response.result.fulfillment.speech;
        
        request({
            
            url:'https://graph.facebook.com/v2.6/me/messages',
            qs:{access_token:access},
            method:'POST',
            json:{
                recipient:{id:sender},
                message:{text:aitext}
            }
        }, (error,response)=>{
            
            if(error)
                {
                    console.log('Error seding message:',error);
                }
            else if(response.body.error)
                {
                    console.log('Error:',response.body.error);
                }
        });
        
    });
    apiai.on('error',(error)=>{
       console.log(error); 
    });
    
    apiai.end();

}
// Call Send Message ApO End 

app.listen(app.get('port'),function()
{

    console.log('running on port',app.get('port'))
})


