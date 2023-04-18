import React, { useEffect, useState } from 'react';

function ConferenceForm() {

    const [locations, setLocations] = useState([]);
    const [name, setName] = useState('');
    const [starts, setStarts] = useState('');
    const [ends, setEnds] = useState('');
    const [description, setDescription] = useState('');
    const [max_presentations, setMaxPresentations] = useState('');
    const [max_attendees, setMaxAtendees] = useState('');
    const [location, setLocation] = useState('')

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleStartsChange = (event) => {
        const value = event.target.value;
        setStarts(value);
    }

    const handleEndsChange = (event) => {
        const value = event.target.value;
        setEnds(value);
    }

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    }

    const handleMaxPresentationsChange = (event) => {
        const value = event.target.value;
        setMaxPresentations(value);
    }

    const handleMaxAttendeesChange = (event) => {
        const value = event.target.value;
        setMaxAtendees(value);
    }

    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.name = name;
        data.starts = starts;
        data.ends= ends;
        data.description = description;
        data.max_presentations = max_presentations;
        data.max_attendees = max_attendees;
        data.location = location;

        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };

// This clears the form after submitted:

        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            setName('');
            setStarts('');
            setEnds('');
            setDescription('');
            setMaxPresentations('');
            setMaxAtendees('');
            setLocation('');
        }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json()
            setLocations(data.locations)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new conference</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleStartsChange} value={starts} placeholder="Starts" required type="date" name="starts" id="starts" className="form-control" />
                            <label htmlFor="starts">Start Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEndsChange} value={ends} placeholder="Ends" required type="date" name="ends" id="ends" className="form-control" />
                            <label htmlFor="ends">End Date</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea onChange={handleDescriptionChange} value={description} name="description" id="description" className="form-control" rows="5"></textarea>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleMaxPresentationsChange} value={max_presentations} placeholder="Max Presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control" />
                            <label htmlFor="max_presentations">Maximum Presentations</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleMaxAttendeesChange} value={max_attendees} placeholder="Maximum Attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control" />
                            <label htmlFor="max_attendees">Maximum Attendees</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleLocationChange} value={location} required name="location" id="location" className="form-select">
                            <option value="">Choose a location</option>
                            {locations.map(location => {
                                return (
                                    <option key={location.href} value={location.id}>
                                        {location.name}
                                    </option>
                                )
                            })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ConferenceForm;
