import * as Font from 'expo-font';


const fonts = async () => {
  await Font.loadAsync({
    'Roboto-Light': require('./Fonts/Roboto-Light.ttf'),
    'Roboto-Med': require('./Fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./Fonts/Roboto-Bold.ttf'),
  });
};

export default fonts;