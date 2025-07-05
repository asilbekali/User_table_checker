// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TablePage from './pages/TablePage';
import AnotherPage from './pages/AnotherPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TablePage />} />
        <Route path="/another-page" element={<AnotherPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
