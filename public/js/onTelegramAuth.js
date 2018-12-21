// Create a Feathers application
const window.app = feathers();

// Initialize a REST connection
const rest = feathers.rest('http://localhost:3030');

// Configure the REST client to use 'window.fetch'
app.configure(rest.fetch(window.fetch));

app.service('users').on('created', message => {
    console.log(message);
});

async function createUse(user){
    return app.service('users').create({telegramId: user.chatId}).then(function(res){
	console.log(res)
	return res.data[0]
    })
})

function onTelegramAuth(user) {
    create(user)
}
