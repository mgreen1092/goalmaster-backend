# GoalMaster Backend

### Description
Node/Express/Mongo Backend for GoalMaster, an app to measure quantifiable, achievable goals.

The best way to accomplish goals to quantify them and make them as specific as possible. GoalMaster is a user friendly application which allows users to make an individual account to document goal progress. It provides information on your goal, a description to make further speficiations, a quatifiable value, and the occurence of how often you will be completing this goal.

[Deployed App](goalmaster-frontend-jooky6v5q-mgreen1092.vercel.app)

[Front End Repository](https://github.com/mgreen1092/goalmaster-frontend.git)

### Diagrams
[ERD](https://drive.google.com/file/d/1wWpyE8zzN7v-kJCC8sSNciyJMQvb3BHY/view?usp=sharing)

### Req Res Cycle
- GET
    - Get user
        - Route: /users/email
    - All goals by user
        -Route: /goals/
- POST
    - New user
        - Route: /users/
    - New goal
        - Route: /goals/
- PUT
    - Edit goals
        - Route: /goals/id
- DELETE
    - Remove goals
        - Route: /goals/id


### Problems Encountered + Their Solutions

- Issue: Description key in goal model was set to type string and required to false, but whenever I would try to change the value, the server would come back with the following error: Error: listen EADDRINUSE: address already in use :::8080
    - Resolution: I originally thought it was because of the requirements of the description value. After reading mongoose documentation, the key default requirement value is set to false. I tried various commands to see if there were other terminals open using the existing port 8080. The terminal was reading that there was an existing port open, but all terminals had been shut down. I ended up changing the port value in the index file. In summary, the connection to port 8080 was working sometimes, but not all the time because there was another nodemon open to that port.



- Issue: Tracker data was not showing up when seeding the data. There was an error in the console with findOneAndUpdate.
    - Resolution: In the seed.js file when adding data points to goals, I input console logs to see what was being returned with found, dataPoint, and dataForGoal. I realized there was an undefined value for what I was trying to filter for with the findOneAndUpdate and was then able to find the value I was initially trying to filter.

### Future Improvements

- I will utlize the data tracker in the future, this will help create data visualization on users progress to achieving goals.
- I would like to include additional ways for users to sign in. Right now, users can only sign in through google. I would like to include facebook and github as well as a username and password option.