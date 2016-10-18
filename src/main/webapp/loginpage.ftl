<!DOCTYPE html>
<html>
<!-- 
	This page design goals are: 
	   1) Fast: 	This page has to be extremely fast (this is the first experience the user will have, so, has to be instant). 
								Consequently, this page will inline as much as possible and load the strick minimum to provide the intended functionalities 
	   						(login / register) at maximum speed. 
	   						(note: even the current bootstrap dependency could be removed)
	   2) Preload:	Since this page will be the first entry point, it is a good place to preload (after the page is displayed)
									resources needed once logged in (i.e., .js, .css, and font/incons). This will be done after the page is downloaded
									with a simple ajax loop. 
--> 
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Joker - Login Page</title>
</head>

<body>
	Login here
</body>

</html>