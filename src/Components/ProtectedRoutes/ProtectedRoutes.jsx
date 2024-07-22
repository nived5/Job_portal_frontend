import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProctedRoute = ({ children }) => {
const user = useSelector((state) => state.user);
console.log(user);
  if (user.account_type == "Employer") {
   return children
  } else {
    return <Navigate to={"/"} />
  }
};

export default ProctedRoute;
