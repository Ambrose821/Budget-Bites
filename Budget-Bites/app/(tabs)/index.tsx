import Colors from '@/constants/Colors';
import {
  BackHandler,
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Touchable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Stack } from 'expo-router';

import Header from '@/components/Header';

import { PieChart } from 'react-native-gifted-charts';
import ExpenseBlock from '@/components/ExpenseBlock';
import ExpenseList from '@/data/expenses.json';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { BlurView } from '@react-native-community/blur';
export default function Index() {
  const [totalCost, setTotalCost] = useState<Number>(0);

  useEffect(() => {
    const cost = ExpenseList.reduce(
      (accumulator, expense) => accumulator + Number(expense.amount),
      0
    );
    setTotalCost(cost);
  }, [totalCost]);

  const [showForm, setShowForm] = useState<Boolean>(false);

  const [purchaseName, setPurchaseName] = useState('');
  const [purchaseType, setPurchaseType] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');

  const handleSubmit = () => {};
  const pieData = [
    {
      value: 47,
      color: Colors.tintColor,
      focused: true,
      text: '47%',
    },
    {
      value: 40,
      color: Colors.blue,
      text: '40%',
    },
    {
      value: 16,
      color: Colors.white,
      text: '16%',
    },
  ];
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.black} // Android only
      />
      <Stack.Screen
        options={{
          header: () => <Header />,
        }}
      />

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{ color: 'white', fontSize: 16 }}>
                My<Text style={{ color: 'white', fontWeight: 'bold' }}> Expenses</Text>
              </Text>
              <Text style={{ color: 'white', fontSize: 36, fontWeight: 700 }}>
                $ {Number(totalCost || 0).toFixed(2)}
              </Text>
            </View>
            <View>
              <PieChart
                data={pieData}
                donut
                showGradient
                sectionAutoFocus
                focusOnPress
                semiCircle
                radius={70}
                innerRadius={55}
                innerCircleColor={Colors.black}
                centerLabelComponent={() => {
                  return (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>47%</Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <ExpenseBlock expenseList={ExpenseList}></ExpenseBlock>
          <TouchableOpacity
            onPress={() => {
              setShowForm(!showForm);
              console.log(showForm);
            }}
            style={{
              marginTop: 20,
              padding: 6,
              marginHorizontal: 1,
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
        </ScrollView>
      </View>

      {showForm && (
        <View
          style={{
            position: 'absolute',
            marginTop: 20,
            backgroundColor: Colors.grey,
            padding: 16,
            borderRadius: 10,
            alignSelf: 'center',
            gap: 4,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: Colors.blue, fontSize: 20, fontWeight: 'bold' }}>Add</Text>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}> Purchase</Text>
          </View>

          {/* Text Input */}
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

          {/* Dropdown / Picker */}
          <Text style={{ color: 'white', marginBottom: 4 }}>Category</Text>
          <Picker
            selectedValue={purchaseType}
            onValueChange={(itemValue) => setPurchaseType(itemValue)}
            style={{
              backgroundColor: 'white',
              marginBottom: 12,
            }}>
            <Picker.Item label="Select category" value="" />
            <Picker.Item label="Grocery" value="food" />
            <Picker.Item label="Eat Out" value="eat out" />
          </Picker>

          {/* Submit Button */}
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
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  formText: {
    color: 'white',
  },
});
