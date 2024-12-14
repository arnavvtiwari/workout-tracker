import React, { useState, useEffect } from 'react';

const Workout = () => {
    const [workoutName, setWorkoutName] = useState('');
    const [weight, setWeight] = useState('');
    const [repetitions, setRepetitions] = useState('');
    const [sets, setSets] = useState('');
    const [groupName, setGroupName] = useState('');
    const [workouts, setWorkouts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch workouts from DB on component mount
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch('https://workout-backend-1-thud.onrender.com/workout'); 
                const data = await response.json();
                if (response.ok) {
                    setWorkouts(data.workouts); 
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };

        fetchWorkouts();
    }, []);

    const handleAddOrUpdateWorkout = async (e) => {
        
        e.preventDefault();
        if (workoutName && weight && repetitions && sets && groupName) {
            const newWorkout = {
                name: workoutName,
                weight: Number(weight),
                repetitions: Number(repetitions),
                sets: Number(sets),
                group: groupName,
            };
    
            try {
                let response;
                if (isEditing) {
                    // Update workout in DB using its unique _id
                    response = await fetch(`https://workout-backend-1-thud.onrender.com/workout/${editingId}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newWorkout),
                    });
                } else {
                    // Add new workout to DB
                    response = await fetch('https://workout-backend-1-thud.onrender.com/workout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newWorkout),
                    });
                }
    
                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    const updatedWorkouts = await fetchWorkoutsFromDb(); // Fetch updated workouts from DB
                    setWorkouts(updatedWorkouts);
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error('Error saving workout:', error);
            }
    
            // Reset form fields
            resetForm();
        }
    };
    

    const fetchWorkoutsFromDb = async () => {
        try {
            const response = await fetch('https://workout-backend-1-thud.onrender.com/workout');
            const data = await response.json();
            return response.ok ? data.workouts : workouts;
        } catch (error) {
            console.error('Error fetching workouts:', error);
            return workouts;
        }
    };

    const handleEditWorkout = (workout) => {
        setWorkoutName(workout.name);
        setWeight(workout.weight);
        setRepetitions(workout.repetitions);
        setSets(workout.sets);
        setGroupName(workout.group);
        setIsEditing(true);
        setEditingId(workout._id);// Set the unique _id of the workout being edited
        setIsModalOpen(true);
    };
    
    

    const handleDeleteWorkout = async (id) => {
        try {
            const response = await fetch(`https://workout-backend-1-thud.onrender.com/workout/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            alert(data.message);
    
            // Update the UI by filtering out the deleted workout
            setWorkouts(workouts.filter((workout) => workout._id !== id));
        } catch (error) {
            console.error('Error deleting workout:', error);
            alert('Error deleting workout. Please try again.');
        }
    };
    

    const resetForm = () => {
        setWorkoutName('');
        setWeight('');
        setRepetitions('');
        setSets('');
        setGroupName('');
        setEditingId(null);
        setIsEditing(false)
        setIsModalOpen(false);
    };
    

    const groupedWorkouts = workouts.reduce((acc, workout) => {
        acc[workout.group] = acc[workout.group] || [];
        acc[workout.group].push(workout);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white flex flex-col items-center py-10 px-4">
    <h1 className="text-5xl font-extrabold mb-6 text-green-500 tracking-wide drop-shadow-lg">
        Workout Tracker
    </h1>

    <button 
        onClick={() => setIsModalOpen(true)} 
        className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105 mb-8"
    >
        + Add Workout
    </button>



    {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <form 
                onSubmit={handleAddOrUpdateWorkout} 
                className="bg-gray-800 p-8 rounded-xl shadow-2xl w-96"
            >
                <h2 className="text-2xl font-bold text-green-400 mb-4">{isEditing ? 'Edit Workout' : 'Add Workout'}</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        placeholder="Workout Name"
                        className="bg-gray-700 text-white p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Weight (in kg)"
                        className="bg-gray-700 text-white p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="number"
                        value={repetitions}
                        onChange={(e) => setRepetitions(e.target.value)}
                        placeholder="Repetitions"
                        className="bg-gray-700 text-white p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="number"
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                        placeholder="Sets"
                        className="bg-gray-700 text-white p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Group Name"
                        className="bg-gray-700 text-white p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="flex justify-between mt-6">
                    <button 
                        type="submit"
                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105"
                    >
                        {isEditing ? 'Update' : 'Add'}
                    </button>
                    <button 
                        type="button"
                        onClick={resetForm}
                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )}

    {Object.keys(groupedWorkouts).length > 0 ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-4xl">
            <h2 className="text-3xl font-semibold mb-4 text-green-400 border-b border-gray-700 pb-2">
                Added Workouts
            </h2>
            {Object.entries(groupedWorkouts).map(([group, workouts]) => (
                <div key={group} className="mb-6">
                    <h3 className="text-2xl font-bold text-green-300 mb-2">{group}</h3>
                    <ul className="space-y-4">
                        {workouts.map((workout) => (
                            <li 
                                key={workout._id} 
                                className="p-4 bg-gray-700 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-600 transition"
                            >
                                <div>
                                    <p className="font-semibold text-lg">{workout.name}</p>
                                    <p className="text-sm text-gray-300">
                                        Weight: {workout.weight} kg, Reps: {workout.repetitions}, Sets: {workout.sets}
                                    </p>
                                </div>
                                <div className="flex space-x-4">
                                    <button 
                                        onClick={() => handleEditWorkout(workout)} 
                                        className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full shadow transition-transform transform hover:scale-105"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth="1.5" 
                                            stroke="currentColor" 
                                            className="w-5 h-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 011.591 3.855l-10.8 10.8a4.5 4.5 0 01-1.59 1.06l-3.32.973.973-3.319a4.5 4.5 0 011.06-1.591l10.8-10.8a2.25 2.25 0 013.856-1.591z" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteWorkout(workout._id)}
                                        className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-full shadow transition-transform transform hover:scale-105"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth="1.5" 
                                            stroke="currentColor" 
                                            className="w-5 h-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    ) : (
        <p className="text-gray-400 text-lg mt-10">No workouts added yet. Start tracking your progress!</p>
    )}
</div>
    )
};

export default Workout;
