npm start
npm run-script build
--------------------------------------------------------------------------------




Some demo code included.

The patients link is the only one I'm really working on


Want to run 
1. From webpack-dev server.
2. From wildfly http under a certain context 'firstcup'
3. From wildfly https under a certain context 'firstcup'




When auth0 posts back to the application for a successful login
the post needs to be proxied across to the backend application

If that is not done then the webpack-dev-server gets the post and 
thinks 404, so redirect back to the index.html for the front end
to handle the navigation.  Then the front end says something like.

'cannot Post to /auth0callback' 


In the earlier code I had tried to use front end routing to catch the post
and redirect it but that does not work and is hard to debug.



When redirecting


Development which allows live updating the React Screens.

HTTPS React server, but HTTP JBoss hosted on 'http://localhost:8080/firstcup'

>npm run starthttps

The react server has a proxy setup.

        proxy: {
            '/firstcup': 'http://localhost:8080'
        }

rest calls need to hit that /firstcup/...



Development
Https React on https//:localhost:3000 proxing to non https Jboss running on a
http://localhost:8080/firstcup or similar URI.

Jboss redirects to the https://localhost:3000 port and Auth0 
callback is pointing to https://localhost:3000/firstcup/auth0callback
This way when the call back arrives at the webpack-dev-server it is proxied 
to the Jboss server, then JBoss processes it and then redirects back to the
React dev server again.
