import React from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

interface DotIndicatorProps {
    currentIndex: number;
    total: number;
}

const DotIndicator: React.FC<DotIndicatorProps> = ({ currentIndex, total }) => {
    return (
        <View style={styles.container}>
            {Array.from({ length: total }).map((_, index) => (
                <View key={`dot-${index}`} style={[styles.dot, index === currentIndex && styles.activeDot]} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(10),
    },
    dot: {
        width: moderateScale(8),
        height: moderateScale(5),
        borderRadius: moderateScale(16),
        backgroundColor: '#E5EEF7',
    },
    activeDot: {
        backgroundColor: '#5B9EE1',
        height: moderateScale(5),
        width: moderateScale(38),
        borderRadius: moderateScale(16),
    },
});

export default DotIndicator;
