import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage'
import ProfilePage from './pages/ProfilePage'
import RepositoryPage from './pages/RepositoryPage';
import SearchPage from './pages/SearchPage';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage/>}>
            <Route path="" element={<SearchPage/>}/>
            
          </Route> 
          <Route path="profile" element={<ProfilePage/>}/>
            <Route path="repository" element={<RepositoryPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
