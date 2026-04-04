import React, { useCallback, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    ListRenderItem,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    useWindowDimensions,
    View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { OnBoardingData, OnBoardingItem } from '../../constants/onBoardingData';
import { useTheme } from '../../res/themes/useTheme';
import DotIndicator from '../components/DotIndicator';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootParamList } from '../navigation/types/RootStackParamList';
import { sessionUseCases } from '../../core/session/sessionModule';

const OnBoardingScreen = () => {
    const colorScheme = useColorScheme();
    const theme = useTheme();
    const { width } = useWindowDimensions();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCompleting, setIsCompleting] = useState(false);
    const lastIndex = OnBoardingData.length - 1;
    const buttonLabel = currentIndex >= lastIndex ? 'Continue' : currentIndex === 0 ? 'Get Started' : 'Next';
    const pagerRef = useRef<FlatList<OnBoardingItem>>(null);
    type OnboardingNavigationProp = NativeStackNavigationProp<
        RootParamList,
        'OnBoarding'
    >;
    const navigation = useNavigation<OnboardingNavigationProp>();

    const handleScrollEnd = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(nextIndex);
        },
        [width],
    );

    const handleButtonPress = useCallback(async () => {
        if (currentIndex >= lastIndex) {
            if (isCompleting) return;
            setIsCompleting(true);
            sessionUseCases.markFirstTimeDone.execute();
            sessionUseCases.setLoggedIn.execute(false);
            navigation.reset({
                index: 0,
                routes: [{ name: 'AuthScreen' }],
            });
            return;
        }

        const nextIndex = currentIndex + 1;
        pagerRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);

    }, [currentIndex, isCompleting, lastIndex, navigation]);

    const renderItem: ListRenderItem<OnBoardingItem> = ({ item }) => (
        <View style={[styles.slide, { width }]}>
            <View style={styles.nikeContent}>
                <Image source={item.image} style={styles.shoes} resizeMode="contain" />
                <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
                <Text style={[styles.title2, { color: theme.text }]}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.ellipse}>
                <Image
                    source={require('../../assets/ellipse.png')}
                    style={[{ tintColor: colorScheme === 'dark' ? theme.card : undefined }]}
                />
            </View>
            <View style={styles.pagerWrapper}>
                <Image
                    source={require('../../assets/NIKE1.png')}
                    style={[styles.nikeStatic, { tintColor: colorScheme === 'dark' ? theme.card : undefined }]}
                />
                <FlatList
                    ref={pagerRef}
                    data={OnBoardingData}
                    renderItem={renderItem}
                    horizontal
                    pagingEnabled
                    keyExtractor={(item) => item.id}
                    getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    decelerationRate='normal'
                    onMomentumScrollEnd={handleScrollEnd}
                />
                <View style={styles.fixedControls}>
                    <DotIndicator currentIndex={currentIndex} total={OnBoardingData.length} />
                    <TouchableOpacity style={styles.button} activeOpacity={isCompleting ? 1 : 0.8} disabled={isCompleting} onPress={
                        handleButtonPress

                    }>
                        <Text style={styles.buttonText}>{buttonLabel}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        flex: 1,
    },
    pagerWrapper: {
        flex: 1,
    },
    ellipse: {
        flexDirection: 'row-reverse',
    },
    nikeStatic: {
        position: 'absolute',
        top: 0,
        left: moderateScale(20),
        width: moderateScale(335),
        height: moderateScale(116),
    },
    nikeContent: {
        width: moderateScale(335),
        height: moderateScale(116),
        marginLeft: moderateScale(20),
    },
    shoes: {
        width: moderateScale(325),
        height: moderateScale(200),
        marginBottom: moderateScale(98),
    },
    title: {
        fontSize: moderateScale(40),
        fontWeight: '500',
    },
    title2: {
        fontSize: moderateScale(20),
        fontWeight: '300',
        marginBottom: moderateScale(20),
    },
    fixedControls: {
        position: 'absolute',
        left: moderateScale(20),
        right: moderateScale(20),
        bottom: moderateScale(30),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        height: 54,
        paddingHorizontal: moderateScale(24),
        backgroundColor: '#5B9EE1',
        borderRadius: moderateScale(50),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: moderateScale(18),
    },
});

export default OnBoardingScreen;
