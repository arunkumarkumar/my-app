
import './App.css';


import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './components/theme';

import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div style={{ backgroundColor: '#9a58e0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <RegisterForm />
    </div>
  </ThemeProvider>
  );
}

export default App;
