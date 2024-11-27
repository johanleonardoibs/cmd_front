import { RoutesProvider } from './router';
import { BrowserRouter } from 'react-router-dom';
import { RoleProvider } from './providers';

function App() {
  return (
    <BrowserRouter basename={'/'}>
      <RoleProvider>
        <RoutesProvider />
      </RoleProvider>
    </BrowserRouter>
  );
}

export default App;
