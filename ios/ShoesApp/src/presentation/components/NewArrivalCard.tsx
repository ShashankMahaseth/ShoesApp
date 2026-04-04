import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useTheme } from "../../res/themes/useTheme";

const NewArrivalCard = () => {
    const theme = useTheme()
    return (
        <View style={{paddingHorizontal:moderateScale(12)}}>
        <TouchableOpacity style={[styles.container,{backgroundColor:theme.card}]}>

            <View>
                <Text style={[styles.bestSeller]}>
                    BEST CHOICE
                </Text>
                <Text style={[styles.title, { color: theme.text }]}>
                    Nike Air Jordan
                </Text>
                <Text style={[{
                    color: theme.text, marginTop: moderateScale(12),
                    fontSize: moderateScale(14)
                }]}>
                    $849.69
                </Text>
            </View>
            <Image
                style={[styles.img]}
                source={require('../../assets/onboarding1.png')}
            />

        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        maxWidth: 'auto',
        height: moderateScale(120),
      
        borderRadius: moderateScale(16),
        alignItems:'center',
        padding:moderateScale(12),
        justifyContent:'center',
        

    },
    img: {
        width: moderateScale(142),
        height: moderateScale(80),
        resizeMode: 'contain',


    },
    bestSeller: {
        fontSize: moderateScale(12),
        color: '#5B9EE1'
    },
    title: {
        fontSize: moderateScale(16),
        fontWeight: 'semibold',


    }
})

export default NewArrivalCard;