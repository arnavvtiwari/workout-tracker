import React, { useState, useEffect } from 'react';

const Workout = () => {
    const [workoutName, setWorkoutName] = useState('');
    const [weight, setWeight] = useState('');
    const [repetitions, setRepetitions] = useState('');
    const [sets, setSets] = useState('');
    const [groupName, setGroupName] = useState('');
    const [workouts, setWorkouts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch workouts from DB on component mount
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch('https://workout-backend-1-thud.onrender.com/workout'); // Replace with your actual endpoint
                const data = await response.json();
                if (response.ok) {
                    setWorkouts(data.workouts); // Assuming the API returns workouts in `data.workouts`
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
            console.log(newWorkout);

            try {
                let response;
                if (isEditing) {
                    // Update workout in DB
                    const workoutId = workouts[editingIndex]._id; // Assuming `_id` is provided by the database
                    response = await fetch(`https://workout-backend-1-thud.onrender.com/workout/${workoutId}`, {
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
                    setWorkouts(await fetchWorkoutsFromDb());
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error('Error saving workout:', error);
            }

            // Clear form fields and close modal
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

    const handleEditWorkout = (index) => {
        const workout = workouts[index];
        setWorkoutName(workout.name);
        setWeight(workout.weight);
        setRepetitions(workout.repetitions);
        setSets(workout.sets);
        setGroupName(workout.group);
        setIsEditing(true);
        setEditingIndex(index);
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
        setIsEditing(false);
        setEditingIndex(null);
        setIsModalOpen(false);
    };

    const groupedWorkouts = workouts.reduce((acc, workout) => {
        acc[workout.group] = acc[workout.group] || [];
        acc[workout.group].push(workout);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-6 sm:p-8 lg:p-12">
    <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">Workout Tracker</h1>

    <button 
        onClick={() => setIsModalOpen(true)} 
        className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded mb-6 w-full max-w-md transition duration-200 text-lg sm:text-xl"
    >
        Add Workout
    </button>

    {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
            <form 
                onSubmit={handleAddOrUpdateWorkout} 
                className="bg-gray-900 p-8 rounded w-full max-w-lg sm:max-w-xl lg:max-w-2xl"
            >
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">{isEditing ? 'Edit Workout' : 'Add Workout'}</h2>
                <input
                    type="text"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    placeholder="Workout Name"
                    className="bg-gray-700 text-white p-3 rounded mb-4 w-full text-lg sm:text-xl"
                    required
                />
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Weight (kg)"
                    className="bg-gray-700 text-white p-3 rounded mb-4 w-full text-lg sm:text-xl"
                    required
                />
                <input
                    type="number"
                    value={repetitions}
                    onChange={(e) => setRepetitions(e.target.value)}
                    placeholder="Reps"
                    className="bg-gray-700 text-white p-3 rounded mb-4 w-full text-lg sm:text-xl"
                    required
                />
                <input
                    type="number"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    placeholder="Sets"
                    className="bg-gray-700 text-white p-3 rounded mb-4 w-full text-lg sm:text-xl"
                    required
                />
                <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Group Name"
                    className="bg-gray-700 text-white p-3 rounded mb-6 w-full text-lg sm:text-xl"
                    required
                />
                <div className="flex justify-between">
                    <button 
                        type="submit"
                        className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded text-lg sm:text-xl"
                    >
                        {isEditing ? 'Update' : 'Add'}
                    </button>
                    <button 
                        type="button"
                        onClick={resetForm}
                        className="bg-red-600 hover:bg-red-500 text-white font-semibold py-3 px-6 rounded text-lg sm:text-xl"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )}

    {Object.keys(groupedWorkouts).length > 0 && (
        <div className="w-full max-w-4xl mt-8">
            <h2 className="text-3xl font-semibold mb-4 text-center sm:text-left">Workouts</h2>
            {Object.entries(groupedWorkouts).map(([group, workouts]) => (
                <div key={group} className="mb-6">
                    <h3 className="text-2xl font-bold bg-gray-700 p-4 rounded mb-4">{group}</h3>
                    <ul className="space-y-4">
                        {workouts.map((workout, index) => (
                            <li key={workout._id} className="p-4 bg-gray-600 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <span className="text-lg sm:text-xl">
                                    <strong>{workout.name}</strong> | {workout.weight}kg, {workout.repetitions} reps, {workout.sets} sets
                                </span>
                                <div className="flex space-x-4 mt-4 sm:mt-0">
                                    <button 
                                        onClick={() => handleEditWorkout(index)}
                                        className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded text-lg"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteWorkout(workout._id)}
                                        className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded text-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )}
</div>

    );
};

export default Workout;
