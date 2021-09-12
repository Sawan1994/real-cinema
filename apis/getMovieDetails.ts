import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/3/movie`;

export async function fetchMovieDetails(id) {
  const URL = `${BASE_URL}/${id}?api_key=${API_KEY}`;

  console.log(`URL : ${URL}`)
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
