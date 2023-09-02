import { Divider, SimpleGrid } from "@mantine/core";
import React from "react";
import AnimatedProgressBarCircle from "../Charts/AnimatedProgressBarCircle";
import AreaChart from "../Charts/AreaChart";
import YearlyStats from "../Charts/YearlyStats";

export default function AttendanceDash({ data, currFilters, setFilters }) {
  console.log(data);
  return (
    <>
      {data && (
        <>
          <h1>Departmentwise Distribution</h1>
          <Divider mb={6} />
          <SimpleGrid
            cols={2}
            breakpoints={[{ maxWidth: 980, cols: 1, spacing: "md" }]}
          >
            <div>
              <AnimatedProgressBarCircle
                data={data.deptAvg[0].deptAvg}
                title={"Average Department Attendance"}
                dataDisplay={`${data.deptAvg[0].deptAvg}%`}
              />
            </div>

            <div>
              <AreaChart
                title={"Daily Average Attendance (Last 5 days)"}
                data={data.dailyAvg}
              />
            </div>
          </SimpleGrid>
          <h1>Classwise Distribution (SE, TE, BE)</h1>
          <Divider mb={6} />
          <SimpleGrid
            cols={1}
            breakpoints={[{ maxWidth: 980, cols: 1, spacing: "md" }]}
          >
            <YearlyStats
              data={data.classwise}
              currFilters={currFilters}
              setFilters={setFilters}
            ></YearlyStats>
          </SimpleGrid>
        </>
      )}
    </>
  );
}
