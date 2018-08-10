const express = require('express');
const hbs =require('hbs');
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
  var now =  new Date().toString();
  console.log(`${now}:${req.method} ${req.url}`);

  next();
});
hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurretYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (str)=>{
  return str.toUpperCase();
});
app.set('view engine','hbs');

app.get('/',(request,response)=>{
//  response.send('<h1>hello Express</h1>');
/**response.send({
  name: 'TA',
  likes: [
    'bikings',
    'Cities'
  ]
});**/
response.render('index.html');
});

app.get('/about',(req,res)=>{
//  res.send('<h1>About Page</h1>')
res.render('about.hbs',{
  pagetitle: 'About Page',
  //currentYear: new Date().getFullYear()
});
});

app.get('/bad',(req,res)=>{
  res.send({
    error:'page not found'
  });
});

app.listen(port,()=>{
  console.log(`server is runing at port :${port}`);
});
