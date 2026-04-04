import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { ActivityIndicator } from "react-native";

type AuthProps = {
    authState: string,
    onPress?:()=>void,
    loading?:boolean,
    disabled:boolean
}


const AuthButton = ({ authState ,onPress,disabled,loading=false}: AuthProps) => {
 const isDisabled = disabled || loading
    return (

        <TouchableOpacity style={styles.button}
        onPress={onPress}
        disabled ={isDisabled}

>
 {loading ? (
        <ActivityIndicator size='large' color="#fff" />
      ) : (
        <Text style={styles.text}>{authState}</Text>
      )}

        </TouchableOpacity>


    )
}

const styles = StyleSheet.create({

    button: {
        width: moderateScale(335),
        height: moderateScale(54),
        justifyContent: 'center',
        backgroundColor: '#5B9EE1',
        borderRadius: moderateScale(50),
        marginTop: moderateScale(30),
        alignSelf: 'center'

    },
    text: {
        alignSelf: 'center',
        fontWeight: "600",
        fontSize: moderateScale(18),
        color: "#FFFFFF",
    }

})

export default AuthButton;


