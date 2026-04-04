import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useTheme } from "../../res/themes/useTheme";
import { Image } from "react-native";



const GoogleAuth = () => {
    const theme = useTheme();

    return (
        <TouchableOpacity style={[styles.button, styles.shadow, { backgroundColor: theme.icon }]}>
            <Image 
            style={styles.googleIcon}
             source={require('../../assets/google.png')}
             />
            <Text style={[styles.text, { color: theme.text }]}>
                  Sign in with google
                </Text>
    
            </TouchableOpacity>
    );

};
const styles = StyleSheet.create({

    button: {
        flexDirection:'row',
        width: moderateScale(335),
        height: moderateScale(54),
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: moderateScale(50),
        marginTop: moderateScale(30),
        alignSelf: 'center',
        marginBottom:moderateScale(30)

    },
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: moderateScale(2) },
                shadowOpacity: 0.16,
                shadowRadius: moderateScale(8),
            },
            android: {
                
                elevation: moderateScale(3),
            },
        }),
    },
    text: {
        fontWeight: "600",
        fontSize: moderateScale(18),
    },
    googleIcon:{
        width:moderateScale(24),
        height:moderateScale(24),
        marginRight:moderateScale(8),
        alignSelf:'center'
    }

});
export default GoogleAuth;
