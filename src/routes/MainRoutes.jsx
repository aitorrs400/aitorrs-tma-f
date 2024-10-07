import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage, ViewPage, DataPage } from '../pages';
import { MainLayout } from '../layout/MainLayout';

export const MainRoutes = () => {

    return (
        <>
            <MainLayout>
                <Routes>
                    <Route path='home' element={ <HomePage /> } />
                    <Route path='/view' element={ <ViewPage /> } />
                    <Route path='/data' element={ <DataPage /> } />
                    <Route path='/' element={ <Navigate to='home' /> } />
                </Routes>
            </MainLayout>
        </>
    )
}