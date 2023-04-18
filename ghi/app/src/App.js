import "./App.css";
import Nav from "./Nav";
// import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
// import ConferenceForm from "./ConferenceForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="locations">
          <Route path="new" element={<LocationForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
