import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useTheme } from "../../res/themes/useTheme";

const AuthScreen =() =>{
    const theme = useTheme();
    return(
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
     <Text style={{ color: theme.text }}>
        Hello
     </Text>

    </View>
    )

   

}
 const styles= StyleSheet.create({
        container:{
            flex:1,
            padding:moderateScale(16)
        }
    })

export default AuthScreen;
