import { useState, useContext, useEffect } from "react";
import { VictoryPie, VictoryLabel } from "victory-native";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
} from "react-native";
import { AppContext } from "../../contexts/app/app-context";
import {
  capitalizeFirstLetter,
  getScreenName,
  parseData,
} from "../../util/utils";
import {
  EXPENSES_SCREEN_TYPE,
  INCOME_SCREEN_TYPE,
  SAVINGS_SCREEN_TYPE,
} from "../../../assets/static/constants";
import PALETTE from "../../util/palette";
import SegmentedControlTab from "react-native-segmented-control-tab";

const GraphScreen = () => {
  const { currentUser, getUserData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedTypeToDisplay, setselectedTypeToDisplay] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [legendData, setLegendData] = useState([]);
  const [isDataReturned, setIsDataReturned] = useState(true);

  useEffect(() => {
    fetchData(INCOME_SCREEN_TYPE);
  }, [currentUser.uid]);

  const handleTypeChange = (index) => {
    setselectedTypeToDisplay(index);
    switch (index) {
      case 0:
        fetchData(INCOME_SCREEN_TYPE);

        break;
      case 1:
        fetchData(SAVINGS_SCREEN_TYPE);

        break;
      case 2:
        fetchData(EXPENSES_SCREEN_TYPE);

        break;
    }
  };

  const fetchData = async (screenType) => {
    try {
      setIsLoading(true);
      const userData = await getUserData(currentUser.uid, screenType);
      setIsDataReturned(userData.length > 0);
      const { chartData, legendData } = parseData(userData);
      setChartData(chartData);
      setLegendData(legendData);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handlePiePress = (event, { index }) => {
    //console.log(`Segment pressed: ${index}`);
    setActiveIndex(index);
  };

  const RenderLabel = (props) => {
    const { index, datum } = props;
    const isActive = index === activeIndex;

    // Determine label content based on whether the segment is active
    let labelContent;
    if (isActive) {
      labelContent = `${capitalizeFirstLetter(datum.x)}:\n ${datum.y}%`; // Text and percentage for active
    } else if (activeIndex !== null) {
      labelContent = ""; // Only percentage for inactive when one is active
    } else {
      labelContent = `${datum.y}%`; // Text and percentage when none are active
    }

    const fontSize = isActive ? 16 : 12; // Larger font for active segment
    const color = isActive
      ? PALETTE.primary.darkBlue
      : PALETTE.neutral.darkGrey; // Different color for active segment

    return (
      <VictoryLabel
        {...props}
        text={labelContent}
        style={{ fontSize, fill: color }}
      />
    );
  };

  const renderLegend = () => (
    <View style={styles.legendContainer}>
      {legendData.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{item.name}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <SegmentedControlTab
        values={["Incomes", "Savings/Investments", "Expenses"]}
        selectedIndex={selectedTypeToDisplay}
        onTabPress={handleTypeChange}
        tabsContainerStyle={{
          backgroundColor: PALETTE.neutral.lightGrey,
        }}
        tabStyle={{
          borderColor: PALETTE.neutral.lightGrey,
          backgroundColor: PALETTE.neutral.lightGrey,
          borderRadius: 0,
        }}
        activeTabStyle={{
          backgroundColor: PALETTE.accent.warmOrange,
        }}
        tabTextStyle={{ color: PALETTE.neutral.darkGrey }}
        activeTabTextStyle={{ color: PALETTE.neutral.lightGrey }}
      />
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={PALETTE.accent.warmOrange} />
        </View>
      ) : isDataReturned == false ? (
        <View style={styles.container}>
          <Text style={styles.noDataText}>{`Please add some ${getScreenName(
            selectedTypeToDisplay
          )}`}</Text>
        </View>
      ) : (
        <ScrollView>
          <>
            <TouchableOpacity onPressIn={handlePiePress}>
              <VictoryPie
                data={chartData}
                labelRadius={({ innerRadius }) => innerRadius + 25}
                labelComponent={<RenderLabel />}
                style={{
                  data: {
                    fill: ({ datum }) => datum.color,
                    stroke: ({ index }) =>
                      index === activeIndex ? "black" : "none",
                    strokeWidth: ({ index }) => (index === activeIndex ? 3 : 0),
                  },
                  labels: { fill: "white", fontSize: 10, fontWeight: "bold" },
                }}
                events={[
                  {
                    target: "data",
                    eventHandlers: {
                      onPressIn: handlePiePress,
                    },
                  },
                ]}
                animate={{
                  duration: 500,
                }}
              />
            </TouchableOpacity>
            <Text style={styles.textBase}>Legend:</Text>
            {renderLegend()}
          </>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.neutral.darkGrey,
    alignItems: "center",
    justifyContent: "center",
  },

  chartContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  legendContainer: {
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 40,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  legendText: {
    color: PALETTE.neutral.lightGrey,
  },
  textBase: {
    color: PALETTE.neutral.lightGrey,
    marginBottom: 5,
    padding: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  noDataText: {
    color: PALETTE.neutral.lightGrey,
  },
});

export default GraphScreen;
