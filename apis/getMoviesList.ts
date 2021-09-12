import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/3/search/movie`;

export async function fetchMoviesList(query) {
  const URL = `${BASE_URL}?api_key=${API_KEY}&query=${query}`;

  try {
    const { data } = await axios.get(URL);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error;
    } else {
      throw new Error(error);
    }
  }
}
