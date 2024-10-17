import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    useEffect(() => {
        const button = document.getElementById('start-button');
        button.classList.add('animate__animated', 'animate__pulse');
        
        // Start a pulse animation when the component mounts
        const interval = setInterval(() => {
            button.classList.toggle('animate__pulse');
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center text-center">
            <header className="text-5xl font-bold mb-4 transform transition duration-500 hover:scale-105 animate__animated animate__fadeInDown">
                Workout Tracker
            </header>
            <p className="mb-6 transform transition duration-500 hover:scale-105 animate__animated animate__fadeInUp">
                Track your workouts and stay fit!
            </p>
            <Link
                to="/workout"
                id="start-button"
                className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded transition duration-200 transform active:scale-95"
            >
                Get Started
            </Link>

        </div>
    );
}

export default Home