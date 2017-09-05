# twitchviewer
HTML, CSS, Bootstrap, CSS Grid, Vanilla JavaScript. This responsive web app uses the twitch.tv API to find details about streamers. Information includes the online/offline status of the user, channel information, and a drop down preview of live gameplay. There is also a function to add other streamers to the list. Created in CodePen.

I coded this in vanilla JavaScript as a challenge to improve my fundamentals and to better understand the code behind libraries such as jQuery. One challenge I had was retrieving the JSON asynchronously while ensuring that the resulting data was displayed correctly on the page. At first, I tried accomplishing this with arrays, but the data in the arrays would become scrambled because of the multiple API calls completing in different orders. I ended up using nested variables in each request that would create new HTML elements in complete chunks and then prepend or append them when they were completed.
