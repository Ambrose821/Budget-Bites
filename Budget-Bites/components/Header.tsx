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
        <Image
          source={{ uri: 'https://i.pravatar.cc/250?u=12' }}
          style={{ height: 50, width: 50, borderRadius: 30 }}></Image>
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
