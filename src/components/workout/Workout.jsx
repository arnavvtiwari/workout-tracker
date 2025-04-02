import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipLoader } from 'react-spinners';

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
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(null);

    // Group workouts by their group name
    const groupedWorkouts = workouts.reduce((acc, workout) => {
        acc[workout.group] = acc[workout.group] || [];
        acc[workout.group].push(workout);
        return acc;
    }, {});

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://workout-backend-1-thud.onrender.com/workout');
                const data = await response.json();
                if (response.ok) {
                    setWorkouts(data.workouts || []);
                }
            } catch (error) {
                console.error('Error fetching workouts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    const handleAddOrUpdateWorkout = async (e) => {
        e.preventDefault();
        if (!workoutName || !weight || !repetitions || !sets || !groupName) return;

        setIsSubmitting(true);
        try {
            const workoutData = {
                name: workoutName,
                weight: Number(weight),
                repetitions: Number(repetitions),
                sets: Number(sets),
                group: groupName,
            };

            const url = isEditing 
                ? `https://workout-backend-1-thud.onrender.com/workout/${editingId}`
                : 'https://workout-backend-1-thud.onrender.com/workout';

            const method = isEditing ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(workoutData),
            });

            const data = await response.json();
            if (response.ok) {
                // Refresh the workout list
                const updatedResponse = await fetch('https://workout-backend-1-thud.onrender.com/workout');
                const updatedData = await updatedResponse.json();
                setWorkouts(updatedData.workouts || []);
                resetForm();
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error saving workout:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditWorkout = (workout) => {
        setWorkoutName(workout.name);
        setWeight(workout.weight);
        setRepetitions(workout.repetitions);
        setSets(workout.sets);
        setGroupName(workout.group);
        setIsEditing(true);
        setEditingId(workout._id);
        setIsModalOpen(true);
    };

    const handleDeleteWorkout = async (id) => {
        setIsDeleting(id);
        try {
            const response = await fetch(`https://workout-backend-1-thud.onrender.com/workout/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setWorkouts(workouts.filter(workout => workout._id !== id));
            } else {
                console.error('Failed to delete workout');
            }
        } catch (error) {
            console.error('Error deleting workout:', error);
        } finally {
            setIsDeleting(null);
        }
    };

    const resetForm = () => {
        setWorkoutName('');
        setWeight('');
        setRepetitions('');
        setSets('');
        setGroupName('');
        setIsEditing(false);
        setEditingId(null);
        setIsModalOpen(false);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white flex flex-col items-center py-10 px-4"
        >
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-green-500 tracking-wide drop-shadow-lg text-center"
            >
                Workout Tracker
            </motion.h1>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-md mb-8"
            >
                + Add Workout
            </motion.button>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4"
                    >
                        <motion.form
                            variants={modalVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            onSubmit={handleAddOrUpdateWorkout}
                            className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md"
                        >
                            <h2 className="text-2xl font-bold text-green-400 mb-4">
                                {isEditing ? 'Edit Workout' : 'Add Workout'}
                            </h2>
                            
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
                                    placeholder="Weight (kg)"
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

                            <div className="flex justify-between mt-6 gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-full flex-1 flex items-center justify-center gap-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <ClipLoader size={20} color="#fff" />
                                    ) : isEditing ? (
                                        'Update'
                                    ) : (
                                        'Add'
                                    )}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-full flex-1"
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>

            {isLoading ? (
                <div className="mt-10 flex flex-col items-center">
                    <ClipLoader size={50} color="#10B981" />
                    <p className="mt-4 text-gray-400">Loading workouts...</p>
                </div>
            ) : Object.keys(groupedWorkouts).length > 0 ? (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-4xl"
                >
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-green-400 border-b border-gray-700 pb-2">
                        Your Workouts
                    </h2>
                    {Object.entries(groupedWorkouts).map(([group, workouts]) => (
                        <div key={group} className="mb-8">
                            <motion.h3 
                                className="text-xl md:text-2xl font-bold text-green-300 mb-3"
                                variants={itemVariants}
                            >
                                {group}
                            </motion.h3>
                            <motion.ul className="space-y-4">
                                {workouts.map((workout) => (
                                    <motion.li
                                        key={workout._id}
                                        variants={itemVariants}
                                        className="p-4 bg-gray-700 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-gray-600 transition"
                                    >
                                        <div className="flex-1">
                                            <p className="font-semibold text-lg">{workout.name}</p>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                <span className="text-sm bg-gray-600 px-2 py-1 rounded">
                                                    {workout.weight} kg
                                                </span>
                                                <span className="text-sm bg-gray-600 px-2 py-1 rounded">
                                                    {workout.repetitions} reps
                                                </span>
                                                <span className="text-sm bg-gray-600 px-2 py-1 rounded">
                                                    {workout.sets} sets
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleEditWorkout(workout)}
                                                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full shadow"
                                                disabled={isDeleting === workout._id}
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
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDeleteWorkout(workout._id)}
                                                className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-full shadow"
                                                disabled={isDeleting === workout._id}
                                            >
                                                {isDeleting === workout._id ? (
                                                    <ClipLoader size={20} color="#fff" />
                                                ) : (
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
                                                )}
                                            </motion.button>
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-10"
                >
                    <p className="text-gray-400 text-lg mb-4">No workouts added yet.</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-full shadow-md"
                    >
                        Add Your First Workout
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Workout;