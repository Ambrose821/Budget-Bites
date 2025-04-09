import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Meal } from '@/scripts/getAIRecipe';
import Meals from '@/data/meal.json';
import Expenses from '@/data/expenses.json';
import { ExpenseType } from '@/types';
import Colors from '@/constants/Colors';
const BudgetAppContext = createContext<any | undefined>(undefined);
export const BudgetAppProvider = ({ children }: { children: ReactNode }) => {
  const [meals, setMeals] = useState<Meal[] | null>(Meals);
  const [expenses, setExpenses] = useState<ExpenseType[] | null>(Expenses);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [eatingOutTotal, setEatingOutTotal] = useState<number>(0);
  const [groceryTotal, setGroceryTotal] = useState<number>(0);
  const [pieData, setPieData] = useState<any[]>([]);
  const [percent, setPercent] = useState<number>(0);
  useEffect(() => {
    const cost = expenses
      ? expenses.reduce((accumulator, expense) => accumulator + Number(expense.amount), 0)
      : 0;
    setTotalCost(cost);

    const newEatingOutTotal = expenses
      ? expenses
          .filter((expense: ExpenseType) => expense.type === 'Eat out')
          .reduce((accumulator, expense) => accumulator + Number(expense.amount), 0)
      : 0;
    setEatingOutTotal(newEatingOutTotal);

    const newGroceryTotal = expenses
      ? expenses
          .filter((expense: ExpenseType) => expense.type === 'Grocery')
          .reduce((accumulator, expense) => accumulator + Number(expense.amount), 0)
      : 0;
    setGroceryTotal(newGroceryTotal);

    setPieData([
      { value: newEatingOutTotal, color: Colors.tintColor, focused: true },
      { value: newGroceryTotal, color: Colors.blue, focused: true },
    ]);

    setPercent(Math.round((newEatingOutTotal / cost) * 100) as number);
  }, [expenses]);
  return (
    <BudgetAppContext.Provider
      value={{ meals, setMeals, expenses, setExpenses, totalCost, setTotalCost, percent, pieData }}>
      {children}
    </BudgetAppContext.Provider>
  );
};

export const useBudgetProvider = () => {
  const context = useContext(BudgetAppContext);
  if (!context) {
    throw new Error('useBudeget is being called outside of provider');
  }
  return context;
};
