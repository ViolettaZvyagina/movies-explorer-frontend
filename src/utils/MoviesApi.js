class MoviesApi {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getMovies() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse)
  }
}

const moviesApi = new MoviesApi({
  url:'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
  'Content-Type': 'application/json'
}
});

export default moviesApi;
