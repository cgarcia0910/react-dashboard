import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UsersPage } from './features/team-management/delivery/pages/UsersPage';
import { Route, Routes } from 'react-router-dom';
function App() {

  return (
    <>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
      </Routes>
      <Routes>
        <Route path="/" element={<UsersPage />} />
      </Routes>
    </>
  );
}

export default App;


