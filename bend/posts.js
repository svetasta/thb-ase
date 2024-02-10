const  express = require ('express');
const  app = express();
const cors = require('cors'); 
const { v4: uuidv4 } = require('uuid');
const Post = require('../models/post'); 
const router = express.Router();
  
app.use(cors());




app.get('/', async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.find();

    res.json(posts); // Send the posts as JSON response
	
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error-on posts');
  }
});


/*app.put('/',(req,res)=>{
	res.send('Hi with put!')
}); 

app.get('/api/v1/users/:userid', (req, res)=> {
	let uid =req.params.userid;
	let user ={};
	user .vorname ="Anna";
	user.nachname = "Muster";
	user.userid = uid;
	return  res.send (user); 
});

const names = ['Steve', 'Jim', 'Darius', 'Anja', 'Lisa'];
const secondNames = ['Green', 'Blue', 'Black', 'Schwarz', 'Grey', 'Good', 'Israel', 'Love'];

const users = {};

function generateRandomUser() {
  const randomUserId = uuidv4();
  const randomFirstName = names[Math.floor(Math.random() * names.length)];
  const randomLastName = secondNames[Math.floor(Math.random() * secondNames.length)];

  const user = {
    id: randomUserId,
    firstName: randomFirstName,
    lastName: randomLastName,
  };

 if (users[randomUserId]) {
    // If the ID already exists, generate a new user recursively
    return generateRandomUser();
  } else {
    // Add the user to the users object
    users[randomUserId] = user;
    return user;
  }
}



app.get ('/api/v1/generate-user',(req,res)=>{
const user = generateRandomUser();
  res.json(user);
})


// Define the error handling middleware
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ error: 'Internal Server Error' });
  });

app.use(express.json());
//we save all created users here to check if the id exist
const listOfUsers ={};


function createUser (name, lastname){
	const newUserId = uuidv4();
console.log(name);
	const newUser= { 
		name,
		lastname,
		id: newUserId

		};

	if (listOfUsers [newUserId]){
		//if exist run the function from begining
		return createUser (name,lastname);
	}
	else{
		listOfUsers[newUserId]=newUser;
		return newUser;}
}

app.put('/api/v1/create-user',(req,res)=>{
	const {name, lastname}= req.query;
	console.log(req.body);

	console.log(name);	
	const newUser =  createUser (name, lastname);
	res.json(newUser);


})
app.get('/api/v1/created-users/:userid', (req, res, next)=> {
	const createdUser ={};
	let newUserId =req.params.userid;
	if (listOfUsers [newUserId]){
						createdUser ={
							name: listOfUsers[newUserId].name,
							lastname: listOfUsers[newUserId].lastname,
							id: newUserId

						}	
		return res.json(createdUser);
	}
	else{
		const err = new Error('Client not found');
    	next(err);
	}
});*/


//const server = app.listen(8080, function (){console.log("server runs")})

module.exports = {
	//posts: posts,
	app: app
	
  };