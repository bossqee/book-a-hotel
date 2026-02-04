import React from 'react'
import '../App.css';
import Nav_Home from '../components/ui/Nav_Home';

const Home = () => {
  return (
    <div className='absolute inset-0 bg-cover bg-center home-background'>
        <Nav_Home />
    </div>
  )
}

export default Home