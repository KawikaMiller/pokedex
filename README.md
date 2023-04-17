# Pokedex App

**Author**: Kawika Miller

**Version**: 1.0.6 

## Overview
This application will allow a user to query the PokeAPI and view the results in a kanto-pokedex-styled UI.

*There are weird scaling/sizing issues with the React-Bootstrap components that still need to be addressed. Therefore, this app works/looks best if your web browser window is at full size*

![Main Screen](./screenshots/mainscreen.JPG)

- When you first load the app you will be greeted with this screen. Go ahead and search for a pokemon and the result should load!
  - *Because of how the PokeAPI works, there are a few Pokemon that need to be searched with a hyphenated query. (e.g. Searching for "Giratina" will not return any search results, but searching for "Giratina-origin" will work. I am in the early stages of working on a fix for this but until then you can search for these edge cases using a hyphenated search OR using their pokedex number*)

![Main Screen Search Result](./screenshots/searchresult.JPG)
- After you've made your search you will see something similar to the screenshot above. 

- Some of these buttons aren't just for show!
  - Click on the grey circle button on the left to hear the pokemon's cry
  - The green button will toggle between the different forms a pokemon has if applicable (e.g. seasonal / regional / etc.)
    - There are a few edge cases where the PokeAPI is inconsistent with how they handle this information so you may run into some strange bugs depending on which pokemon you search. (search for 'Unown' for an example!)
    - I know it's actually supposed to be red but that makes it hard to see in its current state
  - The blue button will toggle between the shiny version of that pokemon and the normal version
  - The D-pad's left and right buttons will go back and forward by 1 pokedex number respectively.
  - The D-pad's up and down buttons will go forward and back by 1 generation. (e.g. if you're on Pikachu and you click up, it will take you to the Chikorita - the start of Gen 2. If you're on Pichu and you click down it will take you to Bulbasaur)
  - The `gen+` and `gen-` buttons cycle through each generation's pokedex entry for a given pokemon.
  - The `move+` and `move-` buttons cycle through each of the Pokemon's moves and gives a brief description of what the move does
  - The `ability+` and `ability-` buttons cycle through each of the Pokemon's abilities and gives a brief description of what the ability does.

![Moves and Abilities Tab](./screenshots/moves%26abilities.JPG)

If you click the `Moves and Abilities` tab on the right, you can view a more detailed breakdown of each of the Pokemon's moves and abilities.

![Team Builder](./screenshots/teambuilder.JPG)

If you click on the `Team Builder` tab on the right, you can create your own Pokemon team.

- The `Search Result` section allows you to modify the pokemon's IVs and EVs, their four moves you will use for battle, as well as their ability and held item before committing them to your team.

- You can always edit these values after they've been added to your team as well or remove them from the team completely.

- You can view your current team's defenseive type coverage with the `Type Coverage` button at the bottom

- The `New Team` button will clear your entire team

- The `Save Team` and `Load Team` button do work but the back end repo hasn't been pushed up to GitHub yet so they won't actually do anything if you run this locally.
  - Currently, they save everything to a database being hosted on MongoDB Atlas
  - There's also no separation of pokemon teams based on login credentials so all saved teams get thrown into one singular DB - I need to reconfigure this and set the backend up properly so that people can use Auth0 to login with their google accounts and only be able to access their own saved teams.
  - Also thinking of setting this up to use a PostgreSQL database instead of MongoDB

The `Items` tab is still being worked on.

## Getting Started
If you are running this locally all you need to do is run `npm start` in your terminal from the root of this directory.

*Deployed version of the app TBD*

## Architecture
This application utilizes JavaScript, React, and React-Bootstrap

## Change Log
2023-02-23 : Initialize project

2023-02-24 : Add search bar and show results

2023-03-01 : Moves refresh/rerender when a new pokemon is searched for

2023-03-02 : Add ability information to screen

2023-03-04 : Modularize move-lists and move-container.

2023-03-05 thru 19 : Add team builder
- Can add/remove a Pokemon to/from team of 6
- Can edit EVs/IVs, Level, and Nature
- Can select 4 Battle Moves, Ability, and Held Item
  - Held item functionality is there, but list of items does not exist
- Can save team to database
  - Server is not currently deployed, must be ran locally
- Can see type coverage chart

2023-03-21 : Able to load teams from database and render to screen
- Minor reworks to shape of the `team` object sent to database. `pokemon` is now a property of `team` whose value is an array of pokemon objects instead of the six individual properties (e.g. `slot1`, `slot2`, etc.)
  - This makes it easier for rendering the team back to the screen after the GET request (e.g. 'Load Team') has been made.

2023-03-22 : Able to delete a team from the database

## Credit and Collaborations

------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
