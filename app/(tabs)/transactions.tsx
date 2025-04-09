import Colors from '@/constants/Colors';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { Stack } from 'expo-router';
import { LineChart, PieChart } from 'react-native-gifted-charts';
import { useBudgetProvider } from '@/Contexts/BudgetAppContext';
import VerticalExpenseList from '@/components/VerticalExpenseList';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
export default function Transactions() {
  const [showForm, setShowForm] = useState<Boolean>(false);

  const [purchaseName, setPurchaseName] = useState('');
  const [purchaseType, setPurchaseType] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const { meals, setMeals, expenses, setExpenses, pieData, totalCost, percent } =
    useBudgetProvider();

  const handleSubmit = () => {
    setShowForm(!showForm);
    const newExpense = {
      id: String(Date.now()),
      name: purchaseName,
      type: purchaseType,
      amount: purchaseAmount,
      percentage: '8',
    };
    console.log(newExpense);
    setExpenses((prev) => [newExpense, ...prev]);
    setPurchaseAmount('');
    setPurchaseType('');
    setPurchaseName('');
  };

  const renderDot = (color) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 150,
              marginRight: 20,
            }}>
            {renderDot(Colors.tintColor)}
            <Text style={{ color: 'white', fontSize: 14 }}>
              Take Out Spending: {String(percent)}%
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: 150 }}>
            {renderDot(Colors.blue)}
            <Text style={{ color: 'white' }}>Grocery Spending: {String(100 - percent)}%</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.statsContainer}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 30,
              marginBottom: 10,
            }}>
            My <Text style={{ color: Colors.tintColor }}>Expense</Text>
          </Text>

          <View
            style={{
              margin: 20,
              padding: 16,
              borderRadius: 20,
              backgroundColor: Colors.grey,
            }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Food Spending Habits
            </Text>
            <View style={{ padding: 20, alignItems: 'center' }}>
              <PieChart
                key={pieData.map((item) => item.value).join('-')} // 👈 force re-render if values change
                data={pieData}
                donut
                isAnimated={true}
                animationDuration={10}
                showGradient
                sectionAutoFocus
                radius={100}
                innerRadius={70}
                innerCircleColor={Colors.grey}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
                        {String(percent)}%{' '}
                      </Text>
                      <Text style={{ fontSize: 14, color: 'white', fontWeight: '500' }}>
                        Take Out
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
            {renderLegendComponent()}
          </View>

          <TouchableOpacity
            onPress={() => {
              setShowForm(!showForm);
              console.log(showForm);
            }}
            style={{
              position: 'relative',
              marginTop: 10,
              padding: 6,
              marginHorizontal: 13,
              marginBottom: 20,
              backgroundColor: Colors.blue,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 8,
            }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>Add Purchase</Text>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>+</Text>
          </TouchableOpacity>
          <View
            style={{
              alignSelf: 'center',
              height: 1,
              width: '90%',
              backgroundColor: Colors.white,
              marginBottom: 15,
            }}></View>
        </View>
        <VerticalExpenseList expenseList={expenses}></VerticalExpenseList>
      </View>

      {showForm && (
        <>
          <TouchableWithoutFeedback onPress={() => setShowForm(!showForm)}>
            <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={80} />
          </TouchableWithoutFeedback>
          <View
            style={{
              position: 'absolute',
              marginTop: 200,
              width: 300,
              backgroundColor: Colors.grey,
              padding: 16,
              borderRadius: 10,
              alignSelf: 'center',
              gap: 4,
              zIndex: 10,
            }}>
            <TouchableOpacity
              onPress={() => setShowForm(!showForm)}
              style={{
                position: 'absolute',
                right: 18,
                top: 18,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: Colors.tintColor,
              }}>
              <FontAwesome name="close" size={18} color="white" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: Colors.blue, fontSize: 20, fontWeight: 'bold' }}>Add</Text>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}> Purchase</Text>
            </View>

            <Text style={{ color: 'white', marginBottom: 4 }}>Purchase Title</Text>
            <TextInput
              value={purchaseName}
              onChangeText={setPurchaseName}
              placeholder="Enter purchase title"
              placeholderTextColor="#ccc"
              style={{
                backgroundColor: 'white',
                padding: 8,
                borderRadius: 5,
                marginBottom: 12,
              }}
            />

            <Text style={{ color: 'white', marginBottom: 4 }}>Amount</Text>
            <TextInput
              value={purchaseAmount}
              onChangeText={setPurchaseAmount}
              placeholder="Enter amount"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              style={{
                backgroundColor: 'white',
                padding: 8,
                borderRadius: 5,
                marginBottom: 12,
              }}
            />

            <Text style={{ color: 'white', marginBottom: 4 }}>Category</Text>
            <Picker
              selectedValue={purchaseType}
              onValueChange={(itemValue) => setPurchaseType(itemValue)}
              style={{
                backgroundColor: 'white',
                marginBottom: 12,
              }}>
              <Picker.Item label="Select category" value="" />
              <Picker.Item label="Grocery" value="Grocery" />
              <Picker.Item label="Eat Out" value="Eat out" />
            </Picker>

            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={{
                backgroundColor: Colors.tintColor,
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Expense</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    color: Colors.white,
  },
  text: { color: Colors.white },
  statsContainer: {
    width: '90%',
    marginHorizontal: 200,
  },
});
