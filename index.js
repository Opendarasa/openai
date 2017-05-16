const express= require ('express')
const http=require('http')
const bodyParser= require('body-parser')
const request =require('request')
const apiaiApp= require('apiai')('90b3e04e3f5c46098831410ade6fcb8b')
const schedule =require('node-schedule')
 const  j=null;
const phpjob=null;
const cjob=null;
const cplusjob=null;
const androidJob=null;
const iosJob=null;
const rule = new schedule.RecurrenceRule(); 
const rule2 = new schedule.RecurrenceRule();
const ruleC = new schedule.RecurrenceRule();
const ruleCplus = new schedule.RecurrenceRule();
const ruleAndroid = new schedule.RecurrenceRule();
const ruleIos = new schedule.RecurrenceRule();
const cluster=require('cluster');
const worker=null;

const app=express()
const token= process.env.FB_VERIFY_TOKEN
const access= process.env.FB_ACCESS_TOKEN

app.set('port',(process.env.PORT||5000))

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())
/* ************************************
   *     roure heroku index            *              
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
    
    res.send('No Entry')
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
/* ************************************
   *     create workers             *              
   *************************************/
function start(){
    if(cluster.isMaster)
        {
           for(var i=0;i<6;i++)
               {
                   
                   worker=cluster.fork();
               }
            worker.on('death',function(){
               console.log('worker '+worker.pid+' died'); 
            });
        }
    else{
        http.Server(function(req,res){
            
           res.writeHead(200);
            res.end("hello word\n");
        }).listen(8000);
        
    }
    
    
}
/* ************************************
   *     HTml  scheduler              *              
   *************************************/
function scheduleHtml(senderId, message)
{
    
    start();
    
    rule.dayOfWeek=[0,new schedule.Range(0,6)];
    rule.hour=7;
    rule.minute=0;
    
    
        
    
    
    
        
           j= schedule.scheduleJob(rule, function(){
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
            text:message ,
            buttons: [{
              type: "postback",
              title: "J'ai fini",
              payload: "finihtml"
            },{
                type:"postback",
                title:"Annuler",
                payload:"Annulerhtml"
            }
        
              ]
          }
      }
    }
           
       };
        callSendAPI(messageData);
        
    });  

        
  
}
/* ************************************
   *     PHP  scheduler              *              
   *************************************/
function schedulePHP(senderId, message)
{
    
    
    
    rule2.dayOfWeek=[0,new schedule.Range(0,6)];
    rule2.hour=8;
    rule2.minute=0;
    
    
        
    
        
           phpjob= schedule.scheduleJob(rule2, function(){
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
            text:message ,
            buttons: [{
              type: "postback",
              title: "J'ai fini",
              payload: "finiphp"
            },{
                type:"postback",
                title:"Annuler",
                payload:"Annulerphp"
            }
        
              ]
          }
      }
    }
           
       };
        callSendAPI(messageData);
        
    });  

        
  
}
/* ************************************
   *     C scheduler   scheduler      *        *           *                                  *
   *************************************/
function scheduleC(senderId, message)
{
    
    
    
    ruleC.dayOfWeek=[0,new schedule.Range(0,6)];
    ruleC.hour=8;
    ruleC.minute=0;
    
    
        
    
        
           cjob= schedule.scheduleJob(ruleC, function(){
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
            text:message ,
            buttons: [{
              type: "postback",
              title: "J'ai fini",
              payload: "finiC"
            },{
                type:"postback",
                title:"Annuler",
                payload:"AnnulerC"
            }
        
              ]
          }
      }
    }
           
       };
        callSendAPI(messageData);
        
    });  

        
  
}
/* ************************************
   *     C++  scheduler              *              
   *************************************/
function scheduleCplus(senderId, message)
{
    
    
    
    ruleCplus.dayOfWeek=[0,new schedule.Range(0,6)];
    ruleCplus.hour=8;
    ruleCplus.minute=0;
    
    
        
    
        
           cplusjob= schedule.scheduleJob(ruleCplus, function(){
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
            text:message ,
            buttons: [{
              type: "postback",
              title: "J'ai fini",
              payload: "finiCplus"
            },{
                type:"postback",
                title:"Annuler",
                payload:"AnnulerCplus"
            }
        
              ]
          }
      }
    }
           
       };
        callSendAPI(messageData);
        
    });  

        
  
}
/* ************************************
   *     Android scheduler              *              
   *************************************/
function scheduleAndroid(senderId, message)
{
    
    
    
    ruleAndroid.dayOfWeek=[0,new schedule.Range(0,6)];
    ruleAndroid.hour=8;
    ruleAndroid.minute=0;
    
    
        
    
        
           androidJob= schedule.scheduleJob(ruleAndroid, function(){
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
            text:message ,
            buttons: [{
              type: "postback",
              title: "J'ai fini",
              payload: "finiandroid"
            },{
                type:"postback",
                title:"Annuler",
                payload:"Annulerandroid"
            }
        
              ]
          }
      }
    }
           
       };
        callSendAPI(messageData);
        
    });  

        
  
}
/* ************************************
   *     IOS  scheduler              *              
   *************************************/
function scheduleIOS(senderId, message)
{
    
    
    
    ruleIos.dayOfWeek=[0,new schedule.Range(0,6)];
    ruleIos.hour=8;
    ruleIos.minute=0;
    
    
        
    
        
           iosJob= schedule.scheduleJob(ruleIos, function(){
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
            text:message ,
            buttons: [{
              type: "postback",
              title: "J'ai fini",
              payload: "finiIos"
            },{
                type:"postback",
                title:"Annuler",
                payload:"AnnulerIos"
            }
        
              ]
          }
      }
    }
           
       };
        callSendAPI(messageData);
        
    });  

        
  
}

/* ************************************
   *     postback   payload handler              *              
   *************************************/
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
      var message = greeting + "Mon nom c'est izipay , je suis ton pote si tu vveux causer , je peux aussi t'offrir tes formules de Maths , Physique , des cours d'informatiques en ligne gratuitement! mais je peux aussi t'offrir les Algos des langage C,C++, des functions PHP et les commande Linux ";
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
              title:"Programation C/C++ pour débutant",
              subtitle:"Apprenenz les  Programations c/c++ de zero à hero ",
            item_url: "https://openclassrooms.com/courses/apprenez-a-programmer-en-c",               
            image_url: "http://2.bp.blogspot.com/-JO-VAcnATwE/VbOAMB7r17I/AAAAAAAAAb4/0rBOkiUESrU/s640/C%2BC%252B%252B%2BLogo.png",
            buttons: [{
              type: "postback",
              title:"Langage C",
              payload: "LanguageC"
            },
            {
                type:"postback",
                title:"Langage C++",
                payload:"Cplus"
                
            }
                     
            ]
          }, {
            
            title: "Développement Web/Mobile",
            subtitle: "Apprenez à développer des sites web et des Applications Mobiles",
            item_url: "https://openclassrooms.com/courses?q=&idx=prod_v2_COURSES_fr&p=0&fR[certificate][0]=true&fR[isWeb][0]=true&hFR[category.name][0]=D%C3%A9veloppement%20web",               
            image_url: "http://www.aninex.com/images/srvc/mobile-application1.png",
            buttons: [{
              type: "postback",
              title:"Web",
              payload: "Web"     
            },
             {
                type:"postback",
                title:"Mobile",
                payload:"Mobile"
                
            }
             ]
          }
          
            ]
        }
      }
    }
  };
            callSendAPI(messageData);
            
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
    else if (payload==="Web")
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
              title:"HTML5/CSS3",
              subtitle:"Apprenez  la conception de sites Web avec HTML5 et CSS3  de zero à hero ",
            item_url: "https://openclassrooms.com/courses/apprenez-a-creer-votre-site-web-avec-html5-et-css3",               
            image_url: "https://camo.githubusercontent.com/6f25253cff34279c570339208c75a3690547a796/68747470733a2f2f73332d75732d776573742d322e616d617a6f6e6177732e636f6d2f7465737464726976656e6c6561726e696e676275636b65742f68746d6c637373626c61636b2e6a7067",
            buttons: [{
              type: "web_url",
              url: "https://openclassrooms.com/courses/apprenez-a-creer-votre-site-web-avec-html5-et-css3",
              title: "HTML5/CSS3",
            webview_height_ratio:"full",
            messenger_extensions:true,
                fallback_url:"https://openclassrooms.com/courses/apprenez-a-creer-votre-site-web-avec-html5-et-css3" 
            },
            {
                type:"postback",
                title:"Souscrire",
                payload:"HTML"
                
            }
                     
            ],
          }, {
            
            title: "PHP/Mysql",
            subtitle: "renforcer votre niveau de développement Web avec PHP et Mysql",
            item_url: "https://openclassrooms.com/courses/concevez-votre-site-web-avec-php-et-mysql",               
            image_url: "http://inventorstech.in/live-project-training/wp-content/uploads/2015/03/PHP-MySQL_logo.png",
            buttons: [{
              type: "web_url",
              url: "https://openclassrooms.com/courses/concevez-votre-site-web-avec-php-et-mysql",
              title: "PHP/Mysql",
                 webview_height_ratio:"full",
            messenger_extensions:true
            },
             {
                type:"postback",
                title:"Souscrire",
                payload:"PHP"
                
            }
             ]
          }]
        }
      }
    }
  };
            callSendAPI(messageData);
            
        }
    else if(payload==="LanguageC")
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
              title:"Programmation C",
              subtitle:"Apprenez  la conception de sites de jeux vidéos de zero à hero avec C ",
            item_url: "https://openclassrooms.com/courses/apprenez-a-programmer-en-c",               
            image_url: "http://mosaically.com/~/photo/600/2015/10/20/13/b4b8ad89-1bb1-4f75-b225-7c2e51c26834.jpg",
            buttons: [{
              type: "web_url",
              url: "https://openclassrooms.com/courses/apprenez-a-programmer-en-c",
              title: "Voir le cours",
            webview_height_ratio:"full",
            messenger_extensions:true,
                fallback_url:"https://openclassrooms.com/courses/apprenez-a-programmer-en-c" 
            },
            {
                type:"postback",
                title:"Souscrire",
                payload:"Csouscrire"
                
            }
                     
            ]
          }]
        }
      }
    }
  };
            callSendAPI(messageData);
            
        }
    else if (payload==="Cplus")
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
              title:"Programmation C++",
              subtitle:"Apprenez  la Programmation orienté avec C++ ",
            item_url: "https://openclassrooms.com/courses/programmez-avec-le-langage-c",               
            image_url: "http://www.technewsable.com/wp-content/uploads/2015/07/c-logo.png",
            buttons: [{
              type: "web_url",
              url: "https://openclassrooms.com/courses/programmez-avec-le-langage-c",
              title: "Voir le cours",
            webview_height_ratio:"full",
            messenger_extensions:true,
                fallback_url:"https://openclassrooms.com/courses/programmez-avec-le-langage-c" 
            },
            {
                type:"postback",
                title:"Souscrire",
                payload:"Cplussouscrire"
                
            }
                     
            ]
          }]
        }
      }
    }
  };
            callSendAPI(messageData);
            

            
        }
    else if (payload==="Mobile")
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
              title:"Android",
              subtitle:"Apprenez  la conception d'applications mobile android avec java  de zero à hero ",
            item_url: "https://openclassrooms.com/courses/developpez-une-application-pour-android",               
            image_url: "https://image.freepik.com/free-vector/android-boot-logo_634639.jpg",
            buttons: [{
              type: "web_url",
              url: "https://openclassrooms.com/courses/developpez-une-application-pour-android",
              title: "Android",
            webview_height_ratio:"full",
            messenger_extensions:true,
                fallback_url:"https://openclassrooms.com/courses/developpez-une-application-pour-android" 
            },
            {
                type:"postback",
                title:"Souscrire",
                payload:"Android"
                
            }
                     
            ],
          }, {
            
            title: "IOS",
            subtitle: "Apprenez le developpement d'applications mobile IOS avec swift, de zero à héro ",
            item_url: "https://openclassrooms.com/courses/decouvrez-le-langage-swift",               
            image_url: "https://developer.apple.com/swift/images/swift-og.png",
            buttons: [{
              type: "web_url",
              url: "https://openclassrooms.com/courses/decouvrez-le-langage-swift",
              title: "IOS",
                 webview_height_ratio:"full",
            messenger_extensions:true
            },
             {
                type:"postback",
                title:"Souscrire",
                payload:"IOS"
                
            }
             ]
          }]
        }
      }
    }
  };
            callSendAPI(messageData);
         
            
        }
    else if (payload==="HTML")
        {
            
            var message="N'oubliez pas de suivre votre cours de HTML aujourd'hui ! Cela ne prends que 15H , En 15heures vous aurez un savoir qui peut vous Valoir 500 000F CfA par contrat ! Ne laissez pas tombé Toute suite , juste un jour de plus ";
            var messageDatahtml=
       {
           recipient:
           {
               id:senderId
           },
            message: {
    
            text:"Bienvenue au Cours HTML5/ccs3 je vais vous envoyer des Messages tous les jours à 8h00 pour vous rappeler de suivre le cours!saviez  vous 80% de ceux qui ont pris ce cours ont tous un salaire minimum de 500000F par mois? le cours est gratuit et ne prends que 15heures. Je Laissez pas tomber en coours de route s'il vous plaît!"
          }
      };
            
              callSendAPI(messageDatahtml);  
            
            
        scheduleHtml(senderId,message);
        
        }
    else if(payload==="PHP")
        {
                
            var message="N'oubliez pas de suivre votre cours de PHP/Mysql aujourd'hui ! Cela ne prends que 15H , En 15heures vous aurez un savoir qui peut vous Valoir 500 000F CfA par contrat ! Ne laissez pas tombé Toute suite , juste un jour de plus ";
            var messageDataPhp=
       {
           recipient:
           {
               id:senderId
           },
            message: {
      
            text:"Bienvenue au Cours PHP/Mysql je vais vous envoyer des Messages tous les jours à 8h00 pour vous rappeler de suivre le cours!saviez  vous 80% de ceux qui ont pris ce cours ont tous un salaire minimum de 500000F par mois? le cours est gratuit et ne prends que 15heures. Je Laissez pas tomber en coours de route s'il vous plaît!",
            
          }
      
    
           
       };callSendAPI(messageDataPhp);
            
    schedulePHP(senderId,message);
        
        }
    else if(payload==="Csouscrire")
        {
            
                    
            var message="N'oubliez pas de suivre votre cours de Programmation C aujourd'hui ! Cela ne prends que 15H , En 15heures vous aurez un savoir qui peut vous Valoir 500 000F CfA par contrat ! Ne laissez pas tombé Toute suite , juste un jour de plus ";
           
            var messageDataC=
       {
           recipient:
           {
               id:senderId
           },
            message: {
      
            text:"Bienvenue au Cours de Programmation C je vais vous envoyer des Messages tous les jours à 8h00 pour vous rappeler de suivre le cours!saviez  vous 80% de ceux qui ont pris ce cours ont tous un salaire minimum de 500000F par mois? le cours est gratuit et ne prends que 15heures. Je Laissez pas tomber en coours de route s'il vous plaît!",
            
          }
       };
        callSendAPI(messageDataC);
             scheduleC(senderId,message);
            
        
        }
    else if(payload==="Cplussouscrire")
        {
            
                    
            var message="N'oubliez pas de suivre votre cours de C++ aujourd'hui ! Cela ne prends que 15H , En 15heures vous aurez un savoir qui peut vous Valoir 500 000F CfA par contrat ! Ne laissez pas tombé Toute suite , juste un jour de plus ";
            var messageData10=
       {
           recipient:
           {
               id:senderId
           },
            message: {
      
            text:"Bienvenue au Cours C++ je vais vous envoyer des Messages tous les jours à 8h00 pour vous rappeler de suivre le cours!saviez  vous 80% de ceux qui ont pris ce cours ont tous un salaire minimum de 500000F par mois? le cours est gratuit et ne prends que 15heures. Je Laissez pas tomber en coours de route s'il vous plaît!",
            
          }
      };
            callSendAPI(messageData10);
            scheduleCplus(senderId,message);
        
        }
    else if(payload==="Android")
        {
                
                    
            var message="N'oubliez pas de suivre votre cours de developpement Android aujourd'hui ! Cela ne prends que 15H , En 15heures vous aurez un savoir qui peut vous Valoir au minimum 5000 dollars américains au minimum par contrat ! Ne laissez pas tombé Toute suite , juste un jour de plus ";
            var messageData3=
       {
           recipient:
           {
               id:senderId
           },
            message: {
      
            text:"Bienvenue au Cours de développement Android je vais vous envoyer des Messages tous les jours à 8h00 pour vous rappeler de suivre le cours!saviez  vous 80% de ceux qui ont pris ce cours ont tous un salaire minimum de 5000 dollars américains par contrat? le cours est gratuit et ne prends que 15heures. Je Laissez pas tomber en coours de route s'il vous plaît!",
            
          }
      };callSendAPI(messageData3);
            
        scheduleAndroid(senderId,message);
        
        }
    else if(payload==="IOS")
        {
                    
                    
            var message="N'oubliez pas de suivre votre cours de developpement IOS aujourd'hui ! Cela ne prends que 15H , En 15heures vous aurez un savoir qui peut vous Valoir au minimum 5000 dollars américains au minimum par contrat ! Ne laissez pas tombé Toute suite , juste un jour de plus ";
            var messageDataios=
       {
           recipient:
           {
               id:senderId
           },
            message: {
      
            text:"Bienvenue au Cours de développement IOS je vais vous envoyer des Messages tous les jours à 8h00 pour vous rappeler de suivre le cours!saviez  vous 80% de ceux qui ont pris ce cours ont tous un salaire minimum de 5000 dollars américains par contrat? le cours est gratuit et ne prends que 15heures. Je Laissez pas tomber en coours de route s'il vous plaît!",
            
          }
      };
            callSendAPI(messageDataios);
            scheduleIOS(senderId,message);
        
        }
    else if(payload==="Annulerhtml")
        {
            var messageDataannulerhtml=
                {
                    recipient:
                    {
                        id:senderId
                    },
                    message:{
                        text:"Domage que tu quitte si tô ! on au aurai pu développer des sites en HTML ensemble dans le futur !Portes-toi bien !"
                    }
                };
            callSendAPI(messageDataannulerhtml);
            j.cancel();
            
        }
    else if(payload==="finihtml")
        {
            var mail="ouedmenga@gmail.com";
            var messageDatafinihtml={
                
                recipient:{
                    id:senderId
                },
                message:{
                    text:"Très bien Joué , Reste à l'écoute ! je te reviendra avec de gros contrat mais avant envois moi un mail au "+mail+" avec ton certicat en fichier attaché."
                }
            };
            callSendAPI(messageDatafinihtml);
            
            j.cancel();
        }
    else if(payload==="Annulerphp")
        {
            var messageDataannulerphp=
                {
                    recipient:
                    {
                        id:senderId
                    },
                    message:{
                        text:"Domage que tu quitte si tô ! on au aurai pu développer des sites Web en PHP/Mysql ensemble dans le futur !Portes-toi bien !"
                    }
                };
            callSendAPI(messageDataannulerphp);
            phpjob.cancel();
        }
    else if(payload==="finiphp")
        {
             var mail="ouedmenga@gmail.com";
            var messageDatafiniphp={
                
                recipient:{
                    id:senderId
                },
                message:{
                    text:"Très bien Joué , Reste à l'écoute ! je te reviendra avec de gros contrat mais avant envois moi un mail au "+mail+" avec ton certicat en fichier attaché."
                }
            };
            callSendAPI(messageDatafiniphp);
            
            phpjob.cancel();
            
        }
    else if(payload=="AnnulerC")
        {
           var messageDataannulerC=
                {
                    recipient:
                    {
                        id:senderId
                    },
                    message:{
                        text:"Domage que tu quitte si tô ! on au aurai pu développer des logiciels en C  ensemble dans le futur !Portes-toi bien !"
                    }
                };
            callSendAPI(messageDataannulerC);
            cjob.cancel(); 
            
        }
    else if(payload==="finiC")
        {
            
            var mail="ouedmenga@gmail.com";
            var messageDatafinic={
                
                recipient:{
                    id:senderId
                },
                message:{
                    text:"Très bien Joué , Reste à l'écoute ! je te reviendra avec de gros contrat mais avant envois moi un mail au "+mail+" avec ton certicat en fichier attaché."
                }
            };
            callSendAPI(messageDatafinic);
            
            cjob.cancel();
        }
    else if(payload==="AnnulerCplus")
        {
           var messageDataannulerCplus=
                {
                    recipient:
                    {
                        id:senderId
                    },
                    message:{
                        text:"Domage que tu quitte si tô ! on au aurai pu développer logiciels en C++ ensemble dans le futur !Portes-toi bien !"
                    }
                };
            callSendAPI(messageDataannulerCplus);
            cplusjob.cancel(); 
            
        }
    else if(payload==="finiCplus")
        {
            
            var mail="ouedmenga@gmail.com";
            var messageDatafinicplus={
                
                recipient:{
                    id:senderId
                },
                message:{
                    text:"Très bien Joué , Reste à l'écoute ! je te reviendra avec de gros contrat mais avant envois moi un mail au "+mail+" avec ton certicat en fichier attaché."
                }
            };
            callSendAPI(messageDatafinicplus);
            
            cplusjob.cancel();
        }
    else if(payload==="Annulerandroid")
        {
            var messageDataannulerAndroid=
                {
                    recipient:
                    {
                        id:senderId
                    },
                    message:{
                        text:"Domage que tu quitte si tô ! on au aurai pu développer des Applications Android  ensemble dans le futur !Portes-toi bien !"
                    }
                };
            callSendAPI(messageDataannulerAndroid);
            androidJob.cancel(); 
            
            
        }
    else if(payload==="finiandroid")
        {
            var mail="ouedmenga@gmail.com";
            var messageDatafiniAndroid={
                
                recipient:{
                    id:senderId
                },
                message:{
                    text:"Très bien Joué , Reste à l'écoute ! je te reviendra avec de gros contrat mais avant envois moi un mail au "+mail+" avec ton certicat en fichier attaché."
                }
            };
            callSendAPI(messageDatafiniAndroid);
            
            androidJob.cancel(); 
        }
    else if(payload==="AnnulerIos")
        {
            var messageDataannulerIOS=
                {
                    recipient:
                    {
                        id:senderId
                    },
                    message:{
                        text:"Domage que tu quitte si tô ! on au aurai pu développer des Applications IOS  ensemble dans le futur !Portes-toi bien !"
                    }
                };
            callSendAPI(messageDataannulerIOS);
            iosJob.cancel();
        }
    else if(payload==="finiIos")
        {
              var mail="ouedmenga@gmail.com";
            var messageDatafiniIos={
                
                recipient:{
                    id:senderId
                },
                message:{
                    text:"Très bien Joué , Reste à l'écoute ! je te reviendra avec de gros contrat mais avant envois moi un mail au "+mail+" avec ton certicat en fichier attaché."
                }
            };
            callSendAPI(messageDatafiniIos);
            
            iosJob.cancel();
            
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


