const express = require('express');
const app = express();
const bparser = require('body-parser');
const knex = require('knex');
const cors = require('cors');





const db1 =  knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
  });

/** LOCALHOST CONNECTION
const db2 = knex({
  client:'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'hotboyz7777',
    database : 'test'
  }
})




app.use(bparser.urlencoded({extended: false}))
 
*/






//console.log(postgres.select('*').from('test2'));

/**
db2.select('*').from('user').then(data => {
  console.log("Data from DB2: ")
  console.log(data)
})

*/
app.use(cors());
app.use(bparser.json())



const tempbase = {
  currentProject: 'none'
}







app.post('/signin', (req, res, next) => {
  const {name, age, birthday, id} = req.body;
  res.send(`Thank you for sending your information ${name}`);
  console.log(req.body)
})


app.post('/add-project', (req, res, next) => {
  const {title, description, categories, date} = req.body;
  console.log(req.body)
  db1('projects').insert({
    title: title,
    description: description,
    categories: categories,
    started: new Date()
  }).then(console.log)
  res.json(`Your project ${title} has been added.`);
})




app.post('/add-skill', (req, res, next) => {
  const {categories} = req.body;
  console.log(req.body)
  db1('skills').insert({
    categories: categories
  }).then(console.log)
  res.json(`Your skill ${categories} has been added.`);
})







app.post('/current-project', (req, res, next) => {
  const {currentProject} = req.body;
  tempbase.currentProject = currentProject
  console.log("The new current project is " + tempbase.currentProject.title  + " Post request")
  res.json(["The current project has been added to the server"])
})

app.get('/current-project', (req, res, next) => {
  console.log(" Get request" + tempbase.currentProject)

  setTimeout(() =>{
    res.json(tempbase.currentProject);
  }, 20 );
})





app.get('/projects', (req, res, next) => {

  db1.select('*').from('skills').then(skills => {
    db1.select('*').from('projects').then(projects => {
      //console.log("Data from DB2: ")
     // console.log(projects);
      const all = [skills, projects];
      res.json(all)
      res.end();

    })
  })
})





app.get('/', (req, res, next) => {
  console.log("You are connected to the root.");
  res.json("Welcome home Barry")
})





app.listen(process.env.PORT || 3001, () => {
  console.log("App is running on port " + process.env.PORT)
});