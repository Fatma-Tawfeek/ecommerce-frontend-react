import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import cart from "../assets/cart.png";
import { GET_CATEGORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const Navbar = () => {
    const linkClass = ({ isActive }) =>
        isActive ? "text-primary uppercase border-b-2 border-primary py-5" : "uppercase py-5";
    const { loading, error, data } = useQuery(GET_CATEGORIES);
    return (
        <nav className="font-raleway">
            <div className="container">
                <div className="flex items-center justify-between">
                    {/* <!-- Navigation --> */}
                    <div className="flex items-center justify-center gap-4">
                        <NavLink to="/" className={linkClass}>
                            All
                        </NavLink>
                        {loading
                            ? "Loading..."
                            : data.categories.map((category) => (
                                  <NavLink
                                      to={`/category/${category.id}`}
                                      className={linkClass}
                                      key={category.id}
                                  >
                                      {category.name}
                                  </NavLink>
                              ))}
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
