import { useContext } from "react";
import FreshCoffeContext from "../context/FreshCoffeProvider";

const useFreshCoffe = () => { 
    return useContext(FreshCoffeContext)
}

export default useFreshCoffe