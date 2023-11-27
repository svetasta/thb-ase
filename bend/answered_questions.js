const  express = require ('express');
const  app = express();
const cors = require('cors'); 
const { v4: uuidv4 } = require('uuid');
const answeredQuestions = [
	{id: 1, text: 'Wie richte ich das WLAN ein? ', answer:'Für Gäste muss der Antrag auf WLAN mindestens einen Tag vor der Nutzung eingereicht werden. (Bitte wenden Sie sich hierzu an die IT-Administratoren in Ihrem Bereich.) Mitglieder akademischer Einrichtungen haben kostenlosen Zugang zum eduroam WLAN. Eine Anleitung zur Nutzung finden Sie unter folgendem Link.https://it.th-brandenburg.de/it-dienste/dienste-rz/wlan/'},
	{id: 2, text: 'string2', answer:''},
	{id: 3, text: 'string3', answer:''},
	{id: 4, text: 'string4', answer:''},
	{id: 5, text: 'string5', answer:''},
	{id: 6, text: 'string6', answer:''}
  ];
  
app.use(cors());
app.get('/', function (req, res)
{
	res.setHeader('Content-Type', 'application/json');

    res.json({id: 6, text: 'string6', answer:''});
})





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
	answeredQuestions: answeredQuestions,
	app: app
  };