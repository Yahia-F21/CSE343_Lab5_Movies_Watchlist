import { useState } from "react";

const startingMovies = [
  {
    id: 1,
    title: "Interstellar",
    review: "Beautiful story and amazing soundtrack.",
    rating: 5
  },
  {
    id: 2,
    title: "The Batman",
    review: "Dark atmosphere and a great detective story.",
    rating: 4
  }
];

function MovieCard({ movie, onRemove, onUpdate }) {
  const stars = "⭐".repeat(movie.rating) || "No stars yet";

  return (
    <article className="movie-card">
      <div className="movie-card-top">
        <div>
          <h3>{movie.title}</h3>
          <p className="rating-label">Your rating: {stars}</p>
        </div>
        <button className="remove-button" onClick={() => onRemove(movie.id)}>
          Remove
        </button>
      </div>

      <label className="field-label" htmlFor={`review-${movie.id}`}>
        Your review
      </label>
      <textarea
        id={`review-${movie.id}`}
        value={movie.review}
        placeholder="Write what you thought about this movie..."
        onChange={(event) => onUpdate(movie.id, "review", event.target.value)}
        rows="3"
      />

      <label className="field-label" htmlFor={`rating-${movie.id}`}>
        Change rating
      </label>
      <select
        id={`rating-${movie.id}`}
        value={movie.rating}
        onChange={(event) => onUpdate(movie.id, "rating", Number(event.target.value))}
      >
        <option value={1}>1 star</option>
        <option value={2}>2 stars</option>
        <option value={3}>3 stars</option>
        <option value={4}>4 stars</option>
        <option value={5}>5 stars</option>
      </select>
    </article>
  );
}

export default function App() {
  const [movies, setMovies] = useState(startingMovies);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("5");
  const [review, setReview] = useState("");

  function addMovie(event) {
    event.preventDefault();
    const cleanedTitle = title.trim();

    if (!cleanedTitle) {
      alert("Please enter a movie title.");
      return;
    }

    const newMovie = {
      id: Date.now(),
      title: cleanedTitle,
      review: review.trim(),
      rating: Number(rating)
    };

    setMovies((currentMovies) => [newMovie, ...currentMovies]);
    setTitle("");
    setRating("5");
    setReview("");
  }

  function removeMovie(id) {
    setMovies((currentMovies) => currentMovies.filter((movie) => movie.id !== id));
  }

  function updateMovie(id, field, value) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === id ? { ...movie, [field]: value } : movie
      )
    );
  }

  const averageRating = movies.length
    ? (movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1)
    : "—";

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">YOUR PERSONAL CINEMA</p>
        <h1>My Movie Watchlist <span>🎬</span></h1>
        <p className="subtitle">Keep the films you watch, your reviews, and your ratings in one place.</p>
        <div className="stats">
          <div className="stat"><strong>{movies.length}</strong><span>Movies</span></div>
          <div className="stat"><strong>{averageRating}</strong><span>Average rating</span></div>
        </div>
      </header>

      <section className="panel">
        <h2>Add a movie</h2>
        <form onSubmit={addMovie}>
          <label className="field-label" htmlFor="movie-title">Movie title</label>
          <input
            id="movie-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Inception"
          />

          <label className="field-label" htmlFor="movie-review">Review / comment</label>
          <textarea
            id="movie-review"
            value={review}
            onChange={(event) => setReview(event.target.value)}
            placeholder="What did you think of it?"
            rows="3"
          />

          <label className="field-label" htmlFor="movie-rating">Your rating</label>
          <select id="movie-rating" value={rating} onChange={(event) => setRating(event.target.value)}>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>

          <button className="primary-button" type="submit">+ Add to watchlist</button>
        </form>
      </section>

      <section className="watchlist">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR COLLECTION</p>
            <h2>Watched movies</h2>
          </div>
          <span className="count-badge">{movies.length} total</span>
        </div>

        {movies.length === 0 ? (
          <div className="empty-state">
            <span>🍿</span>
            <h3>Your list is empty</h3>
            <p>Add your first movie using the form above.</p>
          </div>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onRemove={removeMovie}
                onUpdate={updateMovie}
              />
            ))}
          </div>
        )}
      </section>

      <footer>Made with React · Your next favourite film is waiting.</footer>
    </main>
  );
}