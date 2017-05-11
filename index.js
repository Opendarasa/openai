const expresss= require ('express')
const bodyParser= require('body-parser')
const request =require('request')

const app=express

app.set('port',(process.env.PORT||500))

app.use(bodyParser.urlenconded({extended:false}))

app.use(bodyParser.json())

app.get('/',function(req,res)
{
    
    res.send('Hello Youtube')
})

app.get('/webhook/',function(req,res)
{
    if(req.query['hub.verify_token']==='my_voice_is_my_password_verify_me')
    {
        res.send(req.query['hub.challenge'])
    }
    res.send('No Entry')
})
app.listen(app.get('port'),function()
{
    console.log('running on port',app.get('port'))
})


