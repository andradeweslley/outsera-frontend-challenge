import React from "react";

import Layout from "../components/Layout";
import MoviesList from "../components/MoviesList";

const MoviesPage: React.FC = () => {
  return (
    <Layout>
      <MoviesList />
    </Layout>
  );
};

export default MoviesPage;
