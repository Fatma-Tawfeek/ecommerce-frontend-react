import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import cart from "../assets/cart.png";

const Navbar = () => {
    const linkClass = ({ isActive }) =>
        isActive ? "text-primary uppercase border-b-2 border-primary py-5" : "uppercase py-5";
    return (
        <nav className="font-raleway">
            <div className="container">
                <div className="flex items-center justify-between">
                    {/* <!-- Navigation --> */}
                    <div className="flex items-center justify-center gap-4">
                        <NavLink to="/" className={linkClass}>
                            All
                        </NavLink>
                        <NavLink to="/clothes" className={linkClass}>
                            Clothes
                        </NavLink>
                        <NavLink to="/tech" className={linkClass}>
                            Tech
                        </NavLink>
                    </div>
                    {/* <!-- Logo --> */}
                    <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
                        <img className="h-10 w-auto" src={logo} alt="logo" />
                    </NavLink>
                    {/* <!-- Cart --> */}
                    <div className="flex items-center justify-center gap-4">
                        <button to="/cart">
                            <img src={cart} alt="cart" className="w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
