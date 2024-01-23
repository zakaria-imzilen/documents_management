import { useContext } from 'react'
import userContext from '../context/user.context'
import { Navigate } from 'react-router-dom';
import Layout from './Layout';

const PrivateRoute = () => {
    const consumingUserContext = useContext(userContext);
    if (!consumingUserContext) throw new Error("User Context not provided");

    const { userState } = consumingUserContext;

    if (userState.isConnected) return <Layout />;
    return <Navigate to={"/login"} />
}

export default PrivateRoute