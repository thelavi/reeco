import{ useDispatch } from "react-redux";
import{ AppDispatch } from "../data";

const useAppDispatch=()=> useDispatch<AppDispatch>();

export default useAppDispatch;

