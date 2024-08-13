import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const handleClick = () => {
        logout()
    }
    return ( 
    <header>
       <div className="Nav">
                <h1>Workout Hub</h1>
                
                <nav>
                    { user && (
                        <div>
                            <span> User : {user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <button><Link to="/login">Login</Link></button>
                            <button>  <Link to="/signup">Signup</Link></button>
                           
                        </div>
                    )}
                    
                </nav>
            </div>
    </header> );
}
 
export default Navbar;