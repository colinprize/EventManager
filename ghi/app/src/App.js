import "./App.css";
import Nav from "./Nav";
import AttendeesList from './AttendeesList';
import AttendConferenceForm from "./AttendConferenceForm";
import LocationForm from './LocationForm';
import ConferenceForm from "./ConferenceForm";
import PresentationForm from "./PresentationForm";
import MainPage from "./MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="locations">
          <Route path="new" element={<LocationForm />} />
        </Route>
        <Route path="conferences">
          <Route path="new" element={<ConferenceForm />} />
        </Route>
        <Route path="presentations">
          <Route path="new" element={<PresentationForm />} />
        </Route>
        <Route path="attendees">
          <Route path="new" element={<AttendConferenceForm />} />
          <Route path="" element={<AttendeesList attendees={props.attendees} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
