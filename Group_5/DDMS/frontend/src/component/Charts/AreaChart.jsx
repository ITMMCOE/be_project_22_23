import React from "react";
import { Paper, Center, Text } from "@mantine/core";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

export default function AreaChart({ data, title }) {
  console.log("Area chart", data);
  const xAxis = data.map((obj) => new Date(obj.date).toLocaleDateString());
  console.log(xAxis);
  return (
    <>
      <Paper shadow="md" radius="xl" p="md">
        <Text size={"lg"}>{title}</Text>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryAxis tickValues={xAxis} tickFormat={xAxis} />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickValues={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            tickFormat={(x) => `${x}%`}
            minDomain={{ x: 0 }}
            // label={"Avg Attendance (%)"}
          />
          <VictoryLine
            interpolation="natural"
            data={data.map((obj) => ({
              date: new Date(obj.date).toLocaleDateString(),
              avg: (Math.round(Number(obj.avg)) * 100) / 100,
            }))}
            x={"date"}
            y={"avg"}
          />
        </VictoryChart>
        <Center>
          <Text size={"xl"} weight={"bold"}>
            {title}
          </Text>
        </Center>
      </Paper>
    </>
  );
}
