import React from "react";
import { Paper, Center, Text, Title } from "@mantine/core";
import { VictoryPie } from "victory";
import { IconBan } from "@tabler/icons-react";

export default function AnimatedProgressBarCircle({
  data,
  title,
  color,
  dataDisplay,
}) {
  console.log(data);
  if (data == null) {
    data = 0;
  }
  // const value = Number(data[0].deptAvg) * 100;
  return (
    <>
      <Paper shadow="md" radius="xl" p="md">
        <Text size={"lg"}>
          {`${title}`}
          <strong> {dataDisplay}</strong>
        </Text>
        {!isNaN(data) && (
          <VictoryPie
            data={[
              { x: Math.round(Number(data) * 100) / 100, y: Number(data) },
              {
                x: Math.round((100 - data) * 100) / 100,
                y: 100 - Number(data),
              },
            ]}
            colorScale={
              color ? [color, "whitesmoke"] : ["tomato", "whitesmoke"]
            }
            innerRadius={100}
          />
        )}
        {isNaN(data) && (
          <>
            <Center m={"xl"}>
              <IconBan size={"xl"} color={"gray"} />
              {/* <Title m={"xl"}>No Data</Title> */}
            </Center>
            <Center>
              <Title order={3} color={"gray"}>
                No Data
              </Title>
            </Center>
          </>
        )}
        <Center>
          <Text size={"xl"} weight={"bold"}>
            {title}
          </Text>
        </Center>
      </Paper>
    </>
  );
}
