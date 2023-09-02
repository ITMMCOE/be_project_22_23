import { Center, Paper, SimpleGrid, Title, Divider,Space } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React from "react";
import AnimatedProgressBarCircle from "./AnimatedProgressBarCircle";
import BarChart from "../Charts/BarChart";
import { IconCalendarEvent } from "@tabler/icons-react";

export default function YearlyStats({ data, currFilters, setFilters }) {
  console.log("yearly", data);
  return (
    <Paper shadow="md" radius="xl" p="md">
      <Center>
        <Title m={24} order={3}>
          Daily Count:
        </Title>
        <DatePicker
          //   label="Select Date"
          //   description="Choose the date you wish to see attendance for"
          radius="lg"
          size="md"
          withAsterisk
          value={new Date(currFilters.date)}
          onChange={(e) => {
            let date = new Date();
            date.setDate(e.getDate());
            setFilters({
              ...currFilters,
              date: date.toISOString().slice(0, 10),
            });
          }}
          icon={<IconCalendarEvent size={16} />}
          placeholder="dd-mm-yy"
        />
      </Center>
      <SimpleGrid cols={3}>
        <AnimatedProgressBarCircle
          title={"SE Attendance"}
          color="cyan"
          data={Number(data[0].avg[0].deptAvg)}
          dataDisplay={`${Number(data[0].avg[0].deptAvg)}%`}
        />
        <AnimatedProgressBarCircle
          title={"TE Attendance"}
          color="yellow"
          data={Number(data[1].avg[0].deptAvg)}
          dataDisplay={`${Number(data[1].avg[0].deptAvg)}%`}
        />
        <AnimatedProgressBarCircle
          title={"BE Attendance"}
          color="brown"
          data={Number(data[2].avg[0].deptAvg)}
          dataDisplay={`${Number(data[1].avg[0].deptAvg)}%`}
        />
      </SimpleGrid>
      <Space h="lg" />
      <h1 >Subjectwise Distribution (SE, TE, BE)</h1>
      <Divider mb={6} />
      <SimpleGrid cols={2}>
        <BarChart
          title={"SE Subjectwise Average Attendance for the day"}
          data={data[0].subwise.map((element) => ({
            ...element,
            avg: Math.round(Number(element.avg) * 100) / 100,
          }))}
          x={"SubjectSubCode"}
          y={"avg"}
          color="cyan"
        />
        <BarChart
          title={"TE Subjectwise Average Attendance for the day"}
          data={data[1].subwise.map((element) => ({
            ...element,
            avg: Math.round(Number(element.avg) * 100) / 100,
          }))}
          x={"SubjectSubCode"}
          y={"avg"}
          color="yellow"
        />
        <BarChart
          title={"BE Subjectwise Average Attendance for the day"}
          data={data[2].subwise.map((element) => ({
            ...element,
            avg: Math.round(Number(element.avg) * 100) / 100,
          }))}
          x={"SubjectSubCode"}
          y={"avg"}
          color="brown"
        />
      </SimpleGrid>
    </Paper>
  );
}
