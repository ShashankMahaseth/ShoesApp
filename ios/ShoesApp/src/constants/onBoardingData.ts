import { ImageSourcePropType } from 'react-native';

export type OnBoardingItem = {
    id: string;
    image: ImageSourcePropType;
    title: string;
    description: string;
};

export const OnBoardingData: OnBoardingItem[] = [
    {
        id: '1',
        image: require('../assets/onboarding1.png'),
        title: 'Start Journey\nWith Nike',
        description: 'Smart, Gorgeous & Fashionable\nCollection',
    },
    {
        id: '2',
        image: require('../assets/onboarding2.png'),
        title: 'Follow Latest\nStyle Shoes',
        description: 'There Are Many Beautiful And\nAttractive Plants To Your Room',
    },
    {
        id: '3',
        image: require('../assets/onboarding3.png'),
        title: 'Summer Shoes\nNike 2026',
        description: 'Amet Minim Lit Nodeseru Saku\nNandu sit Alique Dolor',
    },
];
