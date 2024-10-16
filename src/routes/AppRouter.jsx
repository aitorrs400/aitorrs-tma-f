import { Route, Routes } from 'react-router-dom';
import { PublicRoute, PrivateRoute, MainRoutes } from '.';
import { LoginPage } from '../pages';

export const AppRouter = () => {

    // Enrutador principal. El "LoginPage" tiene su propio layout, y en el caso de tener la sesión iniciada
    // Se cargará el enrutador principal con su Layout compartido entre las demás páginas
    return (
        <>
            <Routes>

                {/* Ruta pública, ruta para inicio de sesión */}
                <Route path='/login/*' element={
                    <PublicRoute>
                        <Routes>
                            <Route path='/*' element={ <LoginPage /> } />
                        </Routes>
                    </PublicRoute>
                } />

                {/* Ruta privada, rutas protegidas */}
                <Route path='/*' element={
                    <PrivateRoute>
                        <MainRoutes />
                    </PrivateRoute>
                } />

            </Routes>
        </>
    )
}
