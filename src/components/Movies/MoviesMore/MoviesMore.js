import './MoviesMore.css';

function MoviesMore({moviesMore}) {
  return (
    <div className="movies-more">
      <button type='button' aria-label="Ещё" className="movies-more__button" name="movies-more" onClick={moviesMore}>Ещё</button>
    </div>
  );
}

export default MoviesMore;
