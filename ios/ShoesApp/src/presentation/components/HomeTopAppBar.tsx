import { Image, Pressable, StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useTheme } from "../../res/themes/useTheme";
import { Text } from "react-native";

const HomeTopAppBar = () => {
    const theme = useTheme()
    return (
        <View style={[styles.container]}>


            <Pressable style={[styles.listRadius, { backgroundColor: theme.icon }]}>
                <Image
                    style={styles.list}
                    source={require('../../assets/list.png')}
                    tintColor={theme.text}
                />
            </Pressable>

            <View style={styles.text}>
                <Text style={{ alignSelf: 'center', fontSize: moderateScale(12), fontWeight: '300', color: theme.text }}>
                    Store location
                </Text>

                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={[styles.list, { marginRight: moderateScale(4) }]}
                        source={require('../../assets/location.png')}


                    />
                    <Text style={{ alignSelf: 'center', fontSize: moderateScale(14), fontWeight: 'bold', color: theme.text }}>
                        Mondolibug, Sylhet
                    </Text>
                </View>

            </View>

            <Pressable style={[styles.listRadius, { backgroundColor: theme.icon }]}>
                <View style={[styles.badge, { borderColor: theme.icon }]} />
                <Image
                    style={styles.cart}
                    source={require('../../assets/cart.png')}
                    tintColor={theme.text}
                />
            </Pressable>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: moderateScale(24),
        paddingVertical: moderateScale(20)
    },

    list: {
        width: moderateScale(15),
        height: moderateScale(14),
        alignSelf: 'center'

    },
    cart: {
        width: moderateScale(24),
        height: moderateScale(24),

    },
    listRadius: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(100),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        shadowColor: '#534f4f',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: moderateScale(8),
        elevation: 4
    },
    badge: {
        position: 'absolute',
        top: moderateScale(1),
        right: moderateScale(-1),
        width: moderateScale(12),
        height: moderateScale(12),
        borderRadius: moderateScale(12),
        backgroundColor: '#ff3b30',
        borderWidth: moderateScale(2)
    },
    text: {
        flexDirection: 'column',
        justifyContent: 'center'
    }
})

export default HomeTopAppBar;
