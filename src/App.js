import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from "./components/other/MainContent";
import Footer from "./components/fragments/Footer";
import {Routes, Route } from 'react-router-dom';
import ConservatorList from './components/conservators/ConservatorList'
import ConservatorDetails from "./components/conservators/ConservatorDetails";
import ConservatorForm from "./components/conservators/ConservatorForm";
import ArtConservatorList from "./components/artConservators/ArtConservatorList";
import ArtConservatorDetails from "./components/artConservators/ArtConservatorDetails";
import ArtConservatorForm from "./components/artConservators/ArtConservatorForm";
import ArtworkList from "./components/artwork/ArtworkList";
import ArtworkDetails from "./components/artwork/ArtworkDetails";
import ArtworkForm from "./components/artwork/ArtworkForm";
import {useState} from "react";
import LoginForm from "./components/other/LoginForm";
import ArtConservatorDetailsData from "./components/artConservators/ArtConservatorDetailsData";
import ProtectedRoute from "./ProtectedRoute";



function App() {
    const [user, setUser] = useState()

    const handleLogin = (user) => {
        localStorage.setItem('user', user)
        setUser(user)
    }
    const handleLogout = () => {
        localStorage.removeItem('user')
        setUser(undefined)
    }
    return (
      <>
      <Header />
          <Navigation handleLogout={handleLogout} />

      <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="conservators">
                <Route index={true} element={<ConservatorList />} />
                <Route path="details/:consId" element={<ConservatorDetails />} />
                <Route path="add" element={<ProtectedRoute>
                    <ConservatorForm />
                </ProtectedRoute> } />} />
                <Route path="edit/:consId" element={<ConservatorForm />} />
              <Route path="delete/:consId" element={<ConservatorList />} />

          </Route>
          <Route path="artcons">
              <Route index={true} element={<ArtConservatorList />} />
              <Route path="details/:artConsId" element={
                  <ProtectedRoute>
                      <ArtConservatorDetails />
                  </ProtectedRoute> } />
              <Route path="add" element={<ArtConservatorForm />} />
              <Route path="edit/:artConsId" element={<ArtConservatorForm />} />
          </Route>
          <Route path="artworks">
              <Route index={true} element={<ArtworkList />} />
              <Route path="details/:artId" element={<ArtworkDetails />} />
              <Route path="add" element={<ArtworkForm />} />
              <Route path="edit/:artId" element={<ArtworkForm />} />
          </Route>
          <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />

      </Routes>
      <Footer />
          </>
  );
}

export default App;
