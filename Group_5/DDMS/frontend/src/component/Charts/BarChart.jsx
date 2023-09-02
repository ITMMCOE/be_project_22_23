import React from "react";
import { Paper, Center, Text } from "@mantine/core";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory";

export default function BarChart({ data, title, x, y, y_tickValues, color }) {
  console.log(data);
  // const value = Number(data[0].deptAvg) * 100;
  return (
    <>
      <Paper shadow="md" radius="xl" p="md">
        <Text size={"lg"}>{`${title}`}</Text>
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            tickFormat={(y) => `${y}`}
            maxDomain={{ y: 100 }}
            // label={"Subject co"}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickValues={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            tickFormat={(x) => `${x}%`}
            minDomain={{ x: 0 }}
            // label={"Avg Attendance (%)"}
          />
          <VictoryBar
            data={data}
            x={x}
            y={y}
            style={{ data: { fill: color } }}
          />
          {/* <VictoryAxis dependentAxis tickValues={y_tickValues} /> */}
        </VictoryChart>
        {/* <Center>
          <Text size={"xl"} weight={"bold"}>
            {title}
          </Text>
        </Center> */}
      </Paper>
    </>
  );
}
