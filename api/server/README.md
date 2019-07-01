## Ukiyo Forum API

### Routes

[Collection]
[Request] [URL] [desc] [[args: { key : \<TYPE\>}]]

**_ARCHIVING OR Permanently DELETING a higher hierarchy structure, will also ARCHIVE/Permanently DELETE it's children_**

\- *example: Archiving a thread, will archive all it's posts. Archiving a subforum will archive all it's threads, then all it's posts.*


```
Auth	[POST]	'auth/'			- User login			PARAM: { username: <String>, password: <String>}
					- Creates and sends a JWT 
					  token to client.
User
	[GET]	'user/' 		- Gets all users	
	[GET]	'user/:userId' 		- Gets a user			PARAM: { userId: <ObjectId> }
	[POST]	'user/'			- Register/Creates user		BODY: { username: <String>, password: <String> }
	[DEL]	'user/:userId'		- Permanently delete user	BODY: { userId: <ObjectId> }
	
Thread
	[GET]	'thread/' 		- Gets all threads
	[GET]	'thread/:threadId' 	- Gets a thread			PARAM: { threadId: <ObjectId> }
	[POST]	'thread/'		- Creates thread resource	BODY: { userId: <ObjectId>, subject: <String> }
	[PATCH]	'thread/'		- Archives thread (Recommended)	BODY: { threadId: <ObjectId> }
	[DEL]	'thread/'		- Permanently delete thread	BODY: { threadId: <ObjectId> }
	
Post		
	[GET]	'post/:threadId' 	- Gets all post from thread	PARAM: { threadId: <ObjectId> }			
	[POST]	'post/'			- Creates a post		BODY: { threadId: <ObjectId>, userId: <ObjectId>, content: <String> }
	[PATCH]	'post/'			- Archives post (Recommended)	BODY: { postId: <ObjectId> }
	[DEL]	'post/:postId'		- Permanently delete post	BODY: { postId: <ObjectId> }
```
