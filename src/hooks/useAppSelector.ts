import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState } from "../data";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
