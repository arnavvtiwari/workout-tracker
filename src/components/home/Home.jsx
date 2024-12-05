import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const button = document.getElementById('start-button');
        button.classList.add('animate__animated', 'animate__pulse');

        const interval = setInterval(() => {
            button.classList.toggle('animate__pulse');
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const checkNameAndRedirect = () => {
        let name = prompt("Please enter your name");

        if (name === "Pallavi" || name.toLowerCase() === "chotu don") {
            alert("Chotu Detected! Welcome to the Workout Tracker, Chotu!");
            setTimeout(() => {
                navigate('/food');
            }, 100);
        } else if (name && name.toLowerCase() === "arnav") {
            alert("Welcome Sir!");
            setTimeout(() => {
                navigate('/workout');
            }, 100);
        } else if (name) {
            alert(`Welcome to the Workout Tracker, ${name}!`);
            setTimeout(() => {
                navigate('/workout');
            }, 100);
        } else {
            alert("No name entered. Welcome to the Workout Tracker!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center text-center px-4">
            {/* Header */}
            <header className="text-4xl sm:text-5xl font-bold mb-6 transform transition duration-500 hover:scale-105 animate__animated animate__fadeInDown">
                Workout Tracker
            </header>

            {/* Description */}
            <p className="mb-8 text-sm sm:text-base transform transition duration-500 hover:scale-105 animate__animated animate__fadeInUp">
                Track your workouts and stay fit!
            </p>

            {/* Button */}
            <button
                onClick={checkNameAndRedirect}
                id="start-button"
                className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 text-sm sm:text-base rounded-full transition duration-200 transform active:scale-95 w-full max-w-xs"
            >
                Start
            </button>
        </div>
    );
};

export default Home;
