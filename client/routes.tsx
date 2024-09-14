import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
// import ProtectedComponent from './components/ProtectedComponent'
import App from './components/App'
import LandingPage from './pages/LandingPage'
import ChoresList from './components/ChoresList'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<LandingPage />} />
    <Route path="/chores/:id" element={<ChoresList />} />
  </Route>,
)

export const router = createBrowserRouter(routes)

//template for if you're adding a protected-route
//<Route
//path="my-path"
//element={<ProtectedComponent component={componentGoesHere} />}
//handle={'page name goes here'}
///>
