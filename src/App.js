import './App.css';
import Router from './Routes/Router';
import {BrowserRouter} from "react-router-dom";
import UserProvider from './Users/Providers/UserProvider';
import CustomThemeProvider from './Providers/CustomThemeProvider';
import SnackbarProvider from './Providers/SnackbarProvider';
import AxiosProvider from './Providers/AxiosProvider';
import Layout from './Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CustomThemeProvider>
          <SnackbarProvider>
            <AxiosProvider>
              <Layout>
                <Router />
              </Layout>
            </AxiosProvider>
          </SnackbarProvider>
        </CustomThemeProvider>
      </UserProvider>
    </BrowserRouter>
  ); 
}

export default App;
