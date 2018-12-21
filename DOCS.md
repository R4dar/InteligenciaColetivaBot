# Assistente

As an API framework, this telegram bot is treated lile a REST with many services:

  - `/bot`
  - `/users`
  - `/grupos`
  - `/servicos`
  - `/authentication`
  
### `/bot`

#### Methods

 - `GET`: parse a template message located in `/src/services/bot/commands/*.json` and return the parsed message;
 
 - `POST`: send a message. Require the following data:

   ```json
   {
     "type": "<'Message' || 'Photo' >",
	 "value": "<'string' or 'object' >"
   }
   ```
### `/users`

 - `GET`: get a user
 
 - `POST`: create a user

   ```json
   {
     "telegramId"
	 "hash",
	 "auth_date",
	 "first_name"
   }
   ```

### `/grupos`

### `/servicos`

### `/authentication`

