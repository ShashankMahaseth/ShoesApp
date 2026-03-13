
import {
  TypedUseSelectorHook,
  useSelector,
  useDispatch,
} from "react-redux"; //npm install react-redux @reduxjs/toolkit
import { AppDispatch, RootState } from "../store/store";

// Typed hooks recommended by RTK/React-Redux docs
export const useAppDispatch: () => AppDispatch = () =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
