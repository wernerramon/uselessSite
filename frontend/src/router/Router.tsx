import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import FactsPage from '../pages/FactsPage/FactsPage';
import Header from '../components/header/header';

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/facts" element={<FactsPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;