import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, ViewPage, DataPage, ServicesPage, ServicesAddPage, ServicesViewEditPage, LinesPage, LinesAddPage, LinesViewEditPage } from '../pages';
import { MainLayout } from '../layout/MainLayout';

export const MainRoutes = () => {

    return (
        <>
            <MainLayout>
                <Routes>
                    <Route path='/home' element={ <HomePage /> } />
                    <Route path='/services' element={ <ServicesPage /> } />
                    <Route path='/services/add' element={ <ServicesAddPage /> } />
                    <Route path='/services/view/:id' element={ <ServicesViewEditPage edit={ false } /> } />
                    <Route path='/services/edit/:id' element={ <ServicesViewEditPage edit={ true } /> } />
                    <Route path='/lines' element={ <LinesPage /> } />
                    <Route path='lines/add' element={ <LinesAddPage /> } />
                    <Route path='/lines/view/:id' element={ <LinesViewEditPage edit={ false } /> } />
                    <Route path='/lines/edit/:id' element={ <LinesViewEditPage edit={ true } /> } />
                    <Route path='/view' element={ <ViewPage /> } />
                    <Route path='/data' element={ <DataPage /> } />
                    <Route path='/' element={ <Navigate to='home' /> } />
                </Routes>
            </MainLayout>
        </>
    )
}