import React, { useEffect, useState } from 'react';

function PresentationForm() {
const [presenter_name, setPresenterName] = useState('');
const [presenter_email, setPresenterEmail] = useState('');
const [company_name, setCompanyName] = useState('');
const [title, setTitle] = useState('');
const [synopsis, setSynopsis] = useState('');
const [conferences, setConferences] = useState([]);
const [conference, setConference] = useState('');

const handlePresenterNameChange = (event) => {
    const value = event.target.value;
    setPresenterName(value);
}

const handlePresenterEmailChange = (event) => {
    const value = event.target.value;
    setPresenterEmail(value);
}

const handleCompanyNameChange = (event) => {
    const value = event.target.value;
    setCompanyName(value);
}

const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
}

const handleSynopsisChange = (event) => {
    const value = event.target.value;
    setSynopsis(value);
}

const handleConferenceChange = (event) => {
    const value = event.target.value;
    setConference(value);
}

const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};

    data.presenter_name = presenter_name;
    data.presenter_email = presenter_email;
    data.company_name = company_name;
    data.title = title;
    data.synopsis = synopsis;
    data.conference = conference;

    console.log(data);

    const presentationUrl = `http://localhost:8000${data.conference}presentations/`;
    const fetchConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };

    const response = await fetch(presentationUrl, fetchConfig);
    if (response.ok) {
        const newPresentation = await response.json();
        console.log(newPresentation);

        setPresenterName('');
        setPresenterEmail('');
        setCompanyName('');
        setTitle('');
        setSynopsis('');
        setConference('');
    }

}

const fetchData = async () => {
    const url = 'http://localhost:8000/api/conferences/';

    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        setConferences(data.conferences)
    }
}

useEffect(() => {
    fetchData();
}, []);


return (
    <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input onChange={handlePresenterNameChange} value={presenter_name} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control" />
                <label htmlFor="presenter_name">Presenter name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePresenterEmailChange} value={presenter_email} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control" />
                <label htmlFor="presenter_email">Presenter email</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleCompanyNameChange} value={company_name} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control" />
                <label htmlFor="company_name">Company name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleTitleChange} value={title} placeholder="Title" required type="text" name="title" id="title" className="form-control" />
                <label htmlFor="title">Title</label>
              </div>
              <div className="mb-3">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea onChange={handleSynopsisChange} value={synopsis} className="form-control" id="synopsis" rows="3" name="synopsis" className="form-control"></textarea>
              </div>
              <div className="mb-3">
              <select onChange={handleConferenceChange} value={conference} required name="conference" id="conference" className="form-select">
                    <option value="">Choose a conference</option>
                        {conferences.map(conference => {
                            return (
                                <option key={conference.href} value={conference.href}>
                                            {conference.name}
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

export default PresentationForm
