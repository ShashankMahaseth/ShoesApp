import { useColorScheme } from "react-native"
import { darkTheme, lightTheme, ThemesColor } from "./themes";

export const useTheme = ():ThemesColor =>{
    const scheme  = useColorScheme();
    return scheme ==='dark'? darkTheme : lightTheme;
};