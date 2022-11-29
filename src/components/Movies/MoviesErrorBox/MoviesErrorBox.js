import './MoviesErrorBox.css';

function MoviesErrorBox({error}) {

  return (
    <div className="movies__error-box">
      <p className="movies__error-text">{error}</p>
    </div>
  );
}

export default MoviesErrorBox;
