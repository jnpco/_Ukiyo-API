## Ukiyo Forum API

### Routes

[Collection]
[Request] [URL] [desc] [[args: { key : <TYPE>}]]
*req params collectionId refers to mongoose Type ObjectId*

**_ARCHIVING OR DELETING a higher hierarchy structure, will also do the same operation to it's children_**

\- *example: Archiving a thread, will archive all it's posts. Archiving a subforum will archive all it's threads, then posts.*


```
User
	[GET]	'user/' 		- Gets all users	
	[GET]	'user/:userId' 		- Gets a user			PARAM: { userId: <ObjectId> }
	[POST]	'user/'			- Creates user resource		BODY: { username: <String>, "password": <String> }
	[DEL]	'user/:userId'		- Permanently delete user	BODY: { userId: <ObjectId> }
	
Thread
	[GET]	'thread/' 		- Gets all threads
	[GET]	'thread/:threadId' 	- Gets a thread			PARAM: { threadId: <ObjectId> }
	[POST]	'thread/'		- Creates thread resource	BODY: { userId: <ObjectId>, subject: <String> }
	[PATCH]	'thread/'		- Archives thread (Recommended)	BODY: { threadId: <ObjectId> }
	[DEL]	'thread/'		- Permanently delete thread	BODY: { threadId: <ObjectId> }
	
Post		
	[GET]	'post/:threadId' 	- Gets all post from thread	PARAM: { threadId: <ObjectId> }			
	[POST]	'post/'			- Creates a post		BODY: { threadId: <ObjectId>, userId: <ObjectId>, content: <String> 
	[PATCH]	'post/'			- Archives post (Recommended)	BODY: { postId: <ObjectId> }
	[DEL]	'post/:postId'		- Permanently delete post	BODY: { postId: <ObjectId> }
```
