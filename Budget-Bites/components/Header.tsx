import Colors from '@/constants/Colors';
import {
  BackHandler,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View
        style={{
          flexDirection: 'row',
          height: 70,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{
              uri: 'https://media.licdn.com/dms/image/v2/D4E03AQGR03aamGdGMg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1686529696292?e=2147483647&v=beta&t=BttlUTkMixJOA1v6UjhYUuD4QHt01a6QfkBKt5aYPgQ',
            }}
            style={{ height: 50, width: 50, borderRadius: 30 }}></Image>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: 'white', fontSize: 12 }}>Welcome Back</Text>
            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Your Budget</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={{ borderColor: '#666', borderWidth: 1, padding: 8, borderRadius: 10 }}>
          <Text style={{ color: Colors.white, fontSize: 12 }}> My Transactions</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Header;
const styles = StyleSheet.create({
  AndroidSafeArea: {
    backgroundColor: Colors.black,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
