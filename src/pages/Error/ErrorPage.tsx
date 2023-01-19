import React from 'react';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <section>
      <h2> 404 </h2>
      <p> page not found</p>
      <Link to="/page/1"> Go back home</Link>
    </section>
  );
};
