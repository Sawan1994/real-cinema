import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/index.module.scss";
import { fetchMoviesList } from "../../apis/getMoviesList";

const DEBOUNCED_TIME = 300; // in ms

function MoviesList({ query }) {
  const [movies, setMovies] = useState([]);

  // debounce to reduce number of network calls to fetch movies
  const debounce = (callback, debounceTime) => {
    let timer;

    return (newValue) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(newValue);
      }, debounceTime);
    };
  };

  // fetch movies based on search query and set result into state
  const getMovies = (query) => {
    fetchMoviesList(query).then(
      (res) => {
        console.log(res?.results);
        setMovies(res?.results);
      },
      (error) => {
        console.log(error);
        setMovies([]);
      }
    );
  };

  const debouncedGetMovies = useCallback(
    debounce(getMovies, DEBOUNCED_TIME),
    []
  );

  useEffect(() => {
    debouncedGetMovies(query);
  }, [query]);

  return (
    <div className={styles.container}>
      {movies?.map(({ id, title, vote_average, vote_count, backdrop_path }) => {
        return (
          <Link href={`/details/${id}`}>
            <a>
              <div>
                <Image
                  src={`https://image.tmdb.org/t/p/original${backdrop_path}?api_key=4cb1eeab94f45affe2536f2c684a5c9e`}
                  alt={title}
                  width="300"
                  height="300"
                />
                <p>
                  {title} - {vote_average} - {vote_count}
                </p>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
}

export default MoviesList;
