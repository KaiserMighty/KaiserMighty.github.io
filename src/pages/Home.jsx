import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
        <h1>Home Page</h1>
        <h2 className='text-2xl py-8'>
            <Link to='/bootup'>Low Level</Link>
        </h2>
    </div>
  );
}

export default Home;