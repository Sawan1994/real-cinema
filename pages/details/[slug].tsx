import Image from "next/image";
import Error from "next/error";
import { fetchMovieDetails } from "../../apis/getMovieDetails";

export default function MovieDetails({ data, errorCode, message }) {
  if (errorCode) {
    return <Error statusCode={errorCode} message={message} />;
  }
  
  return (
    <div>
      <div>
        <Image
          src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}?api_key=4cb1eeab94f45affe2536f2c684a5c9e`}
          alt={data?.title}
          width="300"
          height="300"
        />
        <div>
          <h1>{data?.title}</h1>
          <h3>{data?.tagline}</h3>
          <p>{data?.overview}</p>
          <p>{data?.release_date}</p>
          <p>{data?.status}</p>
          <p>Vote Average: {data?.vote_average}</p>
          <p>Vote Count : {data?.vote_count}</p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const slug = context?.params?.slug;

  let details;

  try {
    const data = await fetchMovieDetails(slug);
    details = data;
  } catch (err) {
    console.log(err);
    context.response.status = 500;
    return {
      props: {
        errorCode: 500,
        message: "Something wen wrong",
      },
    };
  }

  return {
    props: {
      data: details,
    },
  };
}
