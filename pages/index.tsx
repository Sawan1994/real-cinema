import { useState } from "react";
import styles from "../styles/Home.module.scss";
import Input from "../components/Input";
import MoviesList from "../components/MoviesList";

export default function Home() {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.search__container}>
        <Input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter movie to search for..."
        />
      </div>
      <MoviesList query={query} />
    </div>
  );
}
