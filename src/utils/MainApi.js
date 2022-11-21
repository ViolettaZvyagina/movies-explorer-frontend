class MainApi {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  };

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials: "include",
    })
    .then(this._handleResponse);
  };

  handleSavedMovies(data, isMovieSaved) {
    if (!isMovieSaved) {
      return fetch (`${this._url}/movies`, {
        method: 'POST',
        headers: this._headers,
        credentials: "include",
        body: JSON.stringify({
          country: data.country,
          director: data.director,
          duration: data.duration,
          year: data.year,
          description: data.description,
          image: `https://api.nomoreparties.co${data.image.url}`,
          trailerLink: data.trailerLink,
          thumbnail: `https://api.nomoreparties.co${data.image.url}`,
          movieId: data.id,
          nameRU: data.nameRU,
          nameEN: data.nameEN,
        }),
      })
      .then((res) => {
        return this._handleResponse(res)
      })
    } else {
      const movieId = data.id
      return fetch (`${this._url}/movies/${movieId}`, {
        method: 'DELETE',
        headers: this._headers,
        credentials: "include",
      })
      .then((res) => {
        return this._handleResponse(res)
      })
    }
  }

  deleteMovies(data) {
    const movieId = data.movieId
    return fetch (`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: "include",
    })
    .then((res) => {
      return this._handleResponse(res)
    })
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: "include",
    })
    .then(this._handleResponse);
  }

  register = ({name, email, password}) => {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({name, email, password})
    })
    .then(this._handleResponse);
  }

  authorize = ({email, password}) => {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({email, password})
    })
    .then(this._handleResponse);
  }

  updateProfile = ({name, email}) => {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        credentials: "include",
        body: JSON.stringify ({name, email})
      })
      .then(this._handleResponse);
    }

    logOut = () => {
      return fetch(`${this._url}/signout`, {
        method: 'POST',
        headers: this._headers,
        credentials: "include",
      })
      .then(this._handleResponse);
    }
};

const mainApi = new MainApi({
  url:'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;