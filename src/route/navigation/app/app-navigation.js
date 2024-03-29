import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./../../../screens/home/home-screen";
import ExpensesScreen from "../../../screens/expenses/expenses-screen";
import IncomeScreen from "../../../screens/income/income-screen";
import SavingsScreen from "../../../screens/savings/savings-screen";
import GraphScreen from "../../../screens/graph/graph-screen";
import PALETTE from "../../../util/palette";
import CalendarScreen from "../../../screens/calendar/calendar-screen";

const AppStack = createStackNavigator();

export const AppStackNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName="home-screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: PALETTE.primary.darkBlue,
        },
        headerTintColor: PALETTE.neutral.white,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <AppStack.Screen
        name="home-screen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <AppStack.Screen
        name="expenses-screen"
        component={ExpensesScreen}
        options={{ title: "Expenses" }}
      />
      <AppStack.Screen
        name="income-screen"
        component={IncomeScreen}
        options={{ title: "Income" }}
      />
      <AppStack.Screen
        name="savings-screen"
        component={SavingsScreen}
        options={{ title: "Savings" }}
      />
      <AppStack.Screen
        name="graph-screen"
        component={GraphScreen}
        options={{ title: "Graph" }}
      />
      <AppStack.Screen
        name="calendar-screen"
        component={CalendarScreen}
        options={{ title: "Calendar" }}
      />
    </AppStack.Navigator>
  );
};
