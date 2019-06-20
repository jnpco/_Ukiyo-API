## Ukiyo Forum API

### Routes

[Collection]
[Request] [URL] [desc] [params]
*req params collectionId refers to mongoose Type ObjectId*

```
User
	[GET]	'user/' 		- getAllUsers
	[GET]	'user/:userId' 		- getUser
	[POST]	'user/'			- registerUser		{username, password}
	[DEL]	'user/:userId'		- deleteUser
	
Thread
	[GET]	'thread/' 		- getAllThreads
	[GET]	'thread/:threadId' 	- getThread	
	[POST]	'thread/'		- createThread		{user: <user _id val>, subject}
	[DEL]	'thread/:threadId'	- deleteThread
	
Post
	[GET]	'post/' 		- getAllPost		
	[GET]	'post/:postId' 		- getPost			
	[POST]	'post/'			- createPost		{thread: <thread _id val>, user: <user _id val>, content}
	[DEL]	'post/:postId'		- deletePost
```
