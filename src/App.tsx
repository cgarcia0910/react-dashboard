import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UsersPage } from './features/team-management/delivery/pages/UsersPage';
import { Route, Routes } from 'react-router-dom';
import { KanbanPage } from './features/kanban/delivery/pages/KanbanPage';
import { AppProvider } from '@toolpad/core';
import DescriptionIcon from '@mui/icons-material/Description';
import { KPIProvider } from './core/application/context/kpi.provider';

function App() {

  return (
    <AppProvider
      navigation={[
        {
          segment: 'users',
          title: 'Users',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'kanban',
          title: 'Kanban',
          icon: <DescriptionIcon />,
        },
      ]}
    >
      <KPIProvider>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/kanban" element={<KanbanPage />} />
          <Route path="/" element={<UsersPage />} />
        </Routes>
      </KPIProvider>
    </AppProvider>
  );
}

export default App;


