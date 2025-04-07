import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ExpenseType } from '@/types';
import Colors from '@/constants/Colors';

const ExpenseBlock = ({ expenseList }: { expenseList: ExpenseType[] }) => {
  const renderItem: ListRenderItem<Partial<ExpenseType>> = ({ item }) => {
    return (
      <View
        style={[
          styles.expenseBlock,
          { backgroundColor: item.type === 'Grocery' ? Colors.tintColor : Colors.blue },
        ]}>
        <Text style={styles.expenseBlockTxt1}>{item.name}</Text>
        <Text style={styles.expenseBlockTxt2}>${item.amount}</Text>
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 10,
            justifyContent: 'center',
          }}>
          <Text style={styles.expenseBlockTxt3}>{item.type}</Text>
        </View>
      </View>
    );
  };
  return (
    <View>
      <FlatList data={expenseList} renderItem={renderItem} horizontal></FlatList>
    </View>
  );
};
export default ExpenseBlock;

const styles = StyleSheet.create({
  expenseBlock: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: Colors.tintColor,
    width: 120,
    padding: 15,
    borderRadius: 15,
    marginRight: 20,
    marginTop: 15,
    gap: 8,
  },
  expenseBlockTxt1: { color: 'white', fontSize: 14 },

  expenseBlockTxt2: { color: 'white', fontSize: 16, fontWeight: 600 },
  expenseBlockTxt3: { color: 'white', fontSize: 12, fontWeight: 400 },
});
