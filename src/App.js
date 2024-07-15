import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FilmListPage from "./pages/filmList";
import FilmDetailPage from "./pages/filmDetail"; 
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<FilmListPage />} />
          <Route path="/filmDetail/:episode_id" element={<FilmDetailPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
