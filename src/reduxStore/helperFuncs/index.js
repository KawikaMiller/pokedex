import axios from "axios";

export const fetchTeamsFromServer = () => async () => {
  let allTeams;
  try {
    allTeams = await axios.get(`${process.env.REACT_APP_SERVER}/teams`, {
      withCredentials: true,
      credentials: 'include'
    });
    // console.log(allTeams);
  } catch(error) {
    console.log(error, ` | error getting teams from database`)
  }

  return allTeams;
}

export const loadTeamToClient = (teamId) => async () => {
  let foundTeam;
  try {
    foundTeam = await axios.get(`${process.env.REACT_APP_SERVER}/team?id=${teamId}`, {
      withCredentials: true,
      credentials: 'include'
    })
  } catch (err) {
    console.error(err, ' | error loading team from database')
  }
  return foundTeam;
}

export const saveTeamToServer = (teamName, roster, teamId, username) => async () => {
  let request = {
    teamName: teamName,
    pokemon: roster,
    trainer: username
  };

  let res = 'test';

  if(teamId){
    res = axios
      .put(`${process.env.REACT_APP_SERVER}/teams/${teamId}`, request, {
        withCredentials: true,
        credentials: 'include'
      })
      .catch(err => console.error('Could not overwrite team: ', err))
  } else {
    res = axios
      .post(`${process.env.REACT_APP_SERVER}/teams`, request, {
        withCredentials: true,
        credentials: 'include'
      })
      .catch(err => {console.log('Could not save new team', err)})      
  }

  return res;

}

export const deleteTeamInServer = (teamId) => async () => {
  let response;

  console.log('DELETE REQUEST FOR TEAM: ', teamId)
  response = axios
    .delete(`${process.env.REACT_APP_SERVER}/teams/${teamId}`, {
      withCredentials: true,
      credentials: 'include'
    })
    .then(() => axios.get(`${process.env.REACT_APP_SERVER}/teams`, {
      withCredentials: true,
      credentials: 'include'
    }))
    .catch(err => console.log(err))

  return response;
  
}