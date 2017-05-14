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
/*function receivedMessage(event) {
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
  }*/
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
/*function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}*/
// Send default Text Message end //
//####### Send a Welcome Message start#######//
/*function sendwelcomeMessage(recipientId, welcomeText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: welcomeText
    }
  };

  callSendAPI(messageData);
}*/
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
              title: "Cours",
              payload: "Cours"
            }, {
              type: "postback",
              title: "Juste Causer",
              payload: "Causer"
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
    else if(payload==="Cours")
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
      var message = "Quel Cours désirez-vous suivre "+firstname+"?";
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
              title: "Maths",
              payload: "Maths"
            }, {
              type: "postback",
              title: "Physique",
              payload: "Physique"
            },
            {
                type:"postback",
                title:"Informatique",
                payload:"Informatique"
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
    else if(payload==="Causer")
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
      var message = "Causons alors  "+firstname+"! dis mois quelque chose";
      //sendMessage(senderId, {text: message});
        //sendGenericMessage(senderId);
          var Data = {
    recipient: {
      id: senderId
    },
    message: {
    text:message
    }
  };
        callSendAPI(Data);
    }); 
            
        }
    //Transfer Local
    else if(payload==="Maths")
        {
   var messageData=
       {
           recipient:
           {
               id:senderId
           },
            message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
            text:"que désirez vous ?",
            buttons: [{
              type: "postback",
              title: "Formules",
              payload: "Formules"
            }, {
              type: "postback",
              title: "énoncés",
              payload: "énoncés"
            }
        
              ]
          }
      }
    }
           
       };
            callSendAPI(messageData)
        
        }
    //Transfer international
    
    else if (payload==="Physique")
        {
            
             var messageData=
       {
           recipient:
           {
               id:senderId
           },
            message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
            text:"que désirez vous ?",
            buttons: [{
              type: "postback",
              title: "Formules",
              payload: "Formules"
            }, {
              type: "postback",
              title: "énoncés",
              payload: "énoncés"
            }
        
              ]
          }
      }
    }
           
       };
            

  callSendAPI(messageData);
        
        }
    // Onatel payload 
    
    else if (payload==="Formules")
        {
            var messageData=
                {
                    recipient:
                    {
                      id:senderId  
                    },
                    message:
                    {
                        text:"Quelle formule cherchez-vous?"
                    }
                };
            callSendAPI(messageData);
            
        }
    else if (payload==="énoncés")
        {
            var messageData=
                {
                    recipient:
                    {
                      id:senderId  
                    },
                    message:
                    {
                        text:"Quelle énoncés cherchez-vous?"
                    }
                };
            callSendAPI(messageData);
            
        }
    else if(payload==="Informatique")
        {
            var messageData=
       {
           recipient:
           {
               id:senderId
           },
            message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
            text:"quel  désirez vous ?",
            buttons: [{
              type: "postback",
              title: "Cours en Ligne",
              payload: "Online"
            }, {
              type: "postback",
              title: "Algorithmes",
              payload: "Algos"
            }
        
              ]
          }
      }
    }
           
       };
            callSendAPI(messageData)
            
        }
    else if (payload==="Online")
        {
              var messageData=
       {
           recipient:
           {
               id:senderId
           },
            message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
            text:"quel cours désirez vous ?",
            buttons: [{
              type: "postback",
              title: "C",
              payload: "Clanguage"
            }, {
              type: "postback",
              title: "C++",
              payload: "Cplus"
            },
              {
                  type:"postback",
                  title:"Web",
                  payload:"Web"
              },
                {
                    type:"postback",
                    title:"Appli",
                    payload:"mobile"
                }
        
              ]
          }
      }
    }
           
       };
            callSendAPI(messageData) 
            
        }
    else if (payload==="Algos")
        {
            var messageData=
                {
                    recipient:
                    {
                      id:senderId  
                    },
                    message:
                    {
                        text:"Entrez  le nom de l'Algo que vous  cherchez-vous plus le language de programation  ex : prime numbers c++."
                    }
                };
            callSendAPI(messageData);
            
        }
    else if (payload==="Clanguage")
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
              title:"Programation C pour débuteur",
              subtitle:"Apprenenz la Programation c de zero à hero ",
            item_url: "https://openclassrooms.com/courses/apprenez-a-programmer-en-c",               
            image_url: "https://ieee-link.org/wplink/wp-content/uploads/2015/08/C-program-logo-techseventy.jpg",
            buttons: [{
              type: "web_url",
              url: "https://openclassrooms.com/courses/apprenez-a-programmer-en-c",
              title: "C débutant",
            webview_height_ratio:"full",
            messenger_extensions:true,
                fallback_url:"https://openclassrooms.com/courses/apprenez-a-programmer-en-c" 
            },
            {
                type:"postback",
                title:"Souscrire",
                payload:"Cdebutant"
                
            }
                     
            ],
          }, {
            
            title: "Programation C avancé",
            subtitle: "renforcer votre niveau de programation C",
            item_url: "http://emmanuel-delahaye.developpez.com/tutoriels/c/posix-threads-c/",               
            image_url: "http://www.interskill.com.au/wp-content/uploads/2014/01/c-programming-introduction-540x272.jpg",
            buttons: [{
              type: "web_url",
              url: "http://emmanuel-delahaye.developpez.com/tutoriels/c/posix-threads-c/",
              title: "C Avancé",
                 webview_height_ratio:"full",
            messenger_extensions:true
            },
             {
                type:"postback",
                title:"Souscrire",
                payload:"Cavance"
                
            }
             ]
          }]
        }
      }
    }
  };
            
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


