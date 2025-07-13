import React from 'react'
import ROUTES from './routesModel'
import { Route, Routes} from 'react-router-dom'
import SignupPage from '../Users/Pages/SignupPage'
import LoginPage from '../Users/Pages/LoginPage';
import HomePage from '../Layout/Main/HomePage';
import ExpenseForm from '../Forms/Components/ExpenseForm';
import IncomeForm from '../Forms/Components/IncomeForm';
import SummaryPage from '../PieChart/Pages/SummaryPage';
import AboutPage from '../Component/AboutPage';
import ExpenseDetails from '../PieChart/Components/ExpenseDetails';
import IncomeDetails from '../PieChart/Components/IncomeDetails';
import EditAccount from '../Users/Pages/EditAccount';
import Profile from '../Users/Pages/Profile';
import PreviousMonthPage from '../PieChart/Pages/PreviousMonthPage';
import ProtectedRoute from './ProtectedRoute';
export default function Router() {
  return (
    
      <div>
        <Routes>
           <Route path={ROUTES.ROOT} element={<HomePage/>} />
           <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
           <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
           <Route path={ROUTES.ABOUT} element={<AboutPage/>}/>

          
           <Route path={ROUTES.CREATE_EXPENSE}element={<ProtectedRoute><ExpenseForm /></ProtectedRoute>}/>
           <Route path={ROUTES.CREATE_INCOME} element={<ProtectedRoute><IncomeForm/></ProtectedRoute>}/>
           <Route path={ROUTES.SUMMARY_PAGE} element={<ProtectedRoute><SummaryPage/></ProtectedRoute>}/>
           <Route path={ROUTES.EXPENSE_DETAILS} element={<ProtectedRoute><ExpenseDetails/></ProtectedRoute>}/>
           <Route path={ROUTES.INCOME_DETAILS} element ={<ProtectedRoute><IncomeDetails/></ProtectedRoute>}/>
           <Route path={ROUTES.EDIT_USER} element ={<ProtectedRoute><EditAccount/></ProtectedRoute>}/>
           <Route path={ROUTES.USER_PROFILE} element= {<ProtectedRoute><Profile/></ProtectedRoute>}/>
           <Route path={ROUTES.PREVIOUS_MONTH} element={<ProtectedRoute><PreviousMonthPage /></ProtectedRoute>} />
        </Routes>
      </div>
   
  );
}