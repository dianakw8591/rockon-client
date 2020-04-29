const API_ROOT = 'http://localhost:3000/api/v1'

const token = () => localStorage.getItem("token");

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token()
  };
};

//data must be nested objects ie {user: {id: ...}}

const login = data => {
  return fetch(`${API_ROOT}/login`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(resp => resp.json());
};

const newUser = data => {
  return fetch(`${API_ROOT}/users`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(resp => resp.json());
};

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/current_user`, {
    headers: headers()
  }).then(resp => resp.json());
};

const updateUser = data => {
  return fetch(`${API_ROOT}/users/${data.user.id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(resp => resp.json());
};

const deleteUser = user_id => {
  return fetch(`${API_ROOT}/users/${user_id}`, {
    method: "DELETE",
    headers: headers(),
  }).then(resp => resp.json());
};

const searchClimbs = (route) => {
  const url = new URL(`${API_ROOT}/climbs`);
  url.searchParams.append("q", route);
  return fetch(url, {
    headers: headers(),
  }).then(resp => resp.json());
};

const addEntry = (entry, user_id) => {
  return fetch(`${API_ROOT}/users/${user_id}/user_climbs`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(entry)
  }).then(resp => resp.json());
};

const getEntries = (user_id) => {
  return fetch(`${API_ROOT}/users/${user_id}/user_climbs`, {
    headers: headers(),
  }).then(resp => resp.json());
};

const deleteEntry = (entry_id, user_id) => {
  return fetch(`${API_ROOT}/users/${user_id}/user_climbs/${entry_id}`, {
    method: "DELETE",
    headers: headers(),
  }).then(resp => resp.json());
}
     
export const api = {
  auth: {
    login,
    getCurrentUser,
  },
  user: {
    newUser,
    updateUser,
    deleteUser,
  },
  climb: {
    searchClimbs,
  },
  entry: {
    getEntries,
    addEntry,
    deleteEntry,
  }
};
