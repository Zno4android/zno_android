const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require('http');

const app = express();
const PORT = process.env.PORT || 4000;
const server = createServer(app);

mongoose.connect(
	'mongodb+srv://Vlad:Vlad123@mathtest-hz5qf.mongodb.net/mathtest?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
).then(() => console.log('MongoDb connected')).catch(err => console.log(err));

const UsersSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}
});

const Users = mongoose.model('Users', UsersSchema);


app.get('/', (req, res) => {
	res.send(`
	<div>
			<nav>
				<ul>
					<li>
						<a href="/">Main page</a>
					</li>
					<li>
						<a href="/allUsers">All users</a>
					</li>
				</ul>
			</nav>
		</div>
	`);
});

// TODO надо переделать
// app.get('/createUser', (req, res) => {
// 	Users.create({
// 		name: 'Racenna',
// 		email: 'Racenna@gmail.com'
// 	})
// 	.then(user => res.send(user))
// 	.catch(err => res.send(err));
// });

app.get('/allUsers', (req, res) => {
	Users.find()
	.then(users => res.send(users))
	.catch(err => res.send(err));
})

server.listen(PORT, () => console.log(`server is up on port: ${PORT}`));