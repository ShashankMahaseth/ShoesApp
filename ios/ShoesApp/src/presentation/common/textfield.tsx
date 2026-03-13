import { useEffect, useState } from "react";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
   
    View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useTheme } from "../../res/themes/useTheme";

type Props = {
    heading: string;
    value?: string;
    onChangeText?: (text: string) => void;
    isPassword?: boolean;
} & Pick<TextInputProps, "autoCapitalize" | "keyboardType" | "placeholder">;

const TextField = ({
    heading,
    value = "",
    onChangeText,
    isPassword = false,
    autoCapitalize = "none",
    keyboardType = "default",
    placeholder,
}: Props) => {
    const theme = useTheme();
    const [isSecureEntry, setIsSecureEntry] = useState(isPassword);

    useEffect(() => {
        setIsSecureEntry(isPassword);
    }, [isPassword]);

    return (
        <View>
            <Text style={[styles.email, { color: theme.text }]}>{heading}</Text>
            <View style={[styles.textfield, { backgroundColor: theme.card }]}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    style={[styles.textInput,{color: theme.text}]}
                    cursorColor={theme.primary}
                    autoCapitalize={autoCapitalize}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    placeholderTextColor={theme.borderColor}
                    secureTextEntry={isPassword && isSecureEntry}
                    autoCorrect={false}
                />
                {isPassword ? (
                    <Pressable
                        onPress={() => setIsSecureEntry((previousState) => !previousState)}
                        hitSlop={10}
                        style={styles.eyeToggle}
                    >
                        <Ionicons
                            name={isSecureEntry ? "eye-off-outline" : "eye-outline"}
                            size={moderateScale(20)}
                            color={theme.borderColor}
                        />
                    </Pressable>
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    email: {
        fontSize: moderateScale(16),
        fontWeight: "600",
        marginBottom: moderateScale(12),
        marginStart: moderateScale(4),
        marginTop: moderateScale(30),
    },
    textfield: {
        width: moderateScale(335),
        height: moderateScale(48),
        borderRadius: moderateScale(50),
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    textInput: {
        flex: 1,
        paddingHorizontal: moderateScale(16),
    },
    textInputDark: {
        color: "#FFFFFF",
    },
    textInputLight: {
        color: "#000000",
    },
    eyeToggle: {
        marginLeft:'auto',
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(8),
    },
});

export default TextField;
