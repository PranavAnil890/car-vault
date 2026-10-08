import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {

    const [profile, setProfile] = useState(null);
    const [edit, setEdit] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    // Get profile
    useEffect(() => {

        axios.get('http://localhost:3000/service-centers')
            .then((response) => {

                const data = response.data.find(
                    (center) =>
                        center.userId === user.id ||
                        center.userId?._id === user.id
                );

                setProfile(data);

            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    // Change input
    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };

    // Save profile
    const saveProfile = async () => {

        try {

            const response = await axios.put(
                `http://localhost:3000/service-centers/${profile._id}`,
                profile
            );

            // Get updated profile from backend
            setProfile(response.data);

            alert('Profile updated');
            setEdit(false);

        } catch (error) {

            console.log(error);
            alert('Update failed');

        }
    };

    if (!profile) {

        return (
            <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">
                Loading...
            </div>
        );

    }

    const fields = [
        'email',
        'phone',
        'address',
        'city',
        'state',
        'pincode'
    ];

    return (

        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">

            <div className="max-w-4xl mx-auto">

                {/* Heading */}

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold">
                        SERVICE CENTER PROFILE
                    </h1>

                    <h2 className="text-2xl font-semibold mt-5">
                        🏢 {profile.name}
                    </h2>

                    <p className="text-yellow-400 mt-2">
                        ⭐ {profile.rating || '0.0'}
                    </p>

                </div>

                {/* Profile */}

                <div className="bg-[#0f172a] p-6 rounded-xl border border-blue-900/30">

                    {edit ? (

                        <div className="grid md:grid-cols-2 gap-5">

                            {fields.map((field) => (

                                <div key={field}>

                                    <label className="text-slate-400 capitalize">
                                        {field}
                                    </label>

                                    <input
                                        name={field}
                                        value={profile[field] || ''}
                                        onChange={handleChange}
                                        className="input input-bordered w-full mt-2 bg-[#020617] text-white"
                                    />

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="grid md:grid-cols-2 gap-6">

                            {fields.map((field) => (

                                <div key={field}>

                                    <p className="text-slate-400 capitalize">
                                        {field}
                                    </p>

                                    <p className="mt-1">
                                        {profile[field]}
                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

                {/* Buttons */}

                <div className="text-center mt-6">

                    {edit ? (

                        <>
                            <button
                                onClick={saveProfile}
                                className="btn btn-primary mr-3"
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setEdit(false)}
                                className="btn btn-outline"
                            >
                                Cancel
                            </button>
                        </>

                    ) : (

                        <button
                            onClick={() => setEdit(true)}
                            className="btn btn-primary"
                        >
                            Edit Profile
                        </button>

                    )}

                </div>

            </div>

        </div>

    );
};

export default Profile;