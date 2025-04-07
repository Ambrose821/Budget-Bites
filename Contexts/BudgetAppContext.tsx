import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Meal } from '@/scripts/getAIRecipe';
import Meals from '@/data/meal.json';
import { set } from 'zod';

const BudgetAppContext = createContext<any | undefined>(undefined);
export const BudgetAppProvider = ({ children }: { children: ReactNode }) => {
  const [meals, setMeals] = useState(Meals);
  return (
    <BudgetAppContext.Provider value={{ meals, setMeals }}>{children}</BudgetAppContext.Provider>
  );
};

export const useBudgetProvider = () => {
  const context = useContext(BudgetAppContext);
  if (!context) {
    throw new Error('useBudeget is being called outside of provider');
  }
  return context;
};
