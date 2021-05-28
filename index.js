var express = require('express');

var app = express();

var exphbs  = require('express-handlebars');

app.use(express.static('public')); 

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('port', 5009);

app.get('/', function(req, res){
    res.render('index', {layout:false});
});
app.get('/teachers', function(req,res){
  res.render('teachers', {layout:false});
});
app.get('/students', function(req,res){
  res.render('students', {layout:false});
});
app.get('/departments', function(req,res){
  res.render('departments', {layout:false});
});
app.get('/majors', function(req,res){
  res.render('majors', {layout:false});
});
app.get('/graduationPlan', function(req, res){
  res.render('graduationPlan', {layout:false});
});
app.get('/index', function(req,res){
  res.render('index', {layout:false});
});



app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
  });
  
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});
  
app.listen(app.get('port'),function(){
    console.log(`Express started on https:flip2.engr.oregonstate:${app.get('port')}, press Ctrl-C to terminate.`);
    
});
