import { FlatList, type ListRenderItem, StyleSheet, Text, View, Dimensions } from 'react-native';
import type { ExpenseType } from '@/types';
import Colors from '@/constants/Colors';

const { width } = Dimensions.get('window');

const VerticalExpenseList = ({ expenseList }: { expenseList: ExpenseType[] }) => {
  const renderItem: ListRenderItem<Partial<ExpenseType>> = ({ item }) => {
    return (
      <View
        style={[
          styles.expenseItem,
          { borderWidth: 1, borderColor: item.type === 'Grocery' ? Colors.tintColor : Colors.blue },
        ]}>
        <View style={styles.expenseDetails}>
          <Text style={styles.expenseName}>{item.name}</Text>
          <View style={styles.typeContainer}>
            <Text style={styles.expenseType}>{item.type}</Text>
          </View>
        </View>
        <Text style={styles.expenseAmount}>${item.amount}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expenseList}
        renderItem={renderItem}
        keyExtractor={(item, index) => `expense-${index}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default VerticalExpenseList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width - 70, // Full width minus padding
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
    backgroundColor: Colors.grey,
  },
  expenseDetails: {
    flex: 1,
    gap: 8,
  },
  expenseName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  expenseAmount: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  typeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  expenseType: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
  },
});
