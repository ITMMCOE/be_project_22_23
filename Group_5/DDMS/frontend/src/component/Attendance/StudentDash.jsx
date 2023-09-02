import { Divider, Grid } from "@mantine/core";
import React, { useEffect, useState } from "react";
import AnimatedProgressBarCircle from "../Charts/AnimatedProgressBarCircle";
import AreaChart from "../Charts/AreaChart";
import axios from "../../axiosConfig";
import BarChart from "../Charts/BarChart";

export default function StudentDash() {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    axios
      .get("/attend/stud-stats")
      .then((res) => {
        setData(res.data.objects);
      });
  }, []);
  return (
    <>
      <h1>Welcome back! here are your Statistics!</h1>
      <Divider></Divider>
      {data && (
        <>
          <Grid mt={12}>
            <Grid.Col span={4}>
              <AnimatedProgressBarCircle
                data={data.totalAvg[0].avg}
                title={"Your Total Attendance"}
                dataDisplay={`${data.totalAvg[0].avg}%`}
              ></AnimatedProgressBarCircle>
            </Grid.Col>
            <Grid.Col span={8}>
              <BarChart
                title={"Your Subjectwise total Attendance"}
                data={data.subwise.map((element) => ({
                  ...element,
                  avg: Math.round(Number(element.avg) * 100) / 100,
                }))}
                x={"SubjectSubCode"}
                y={"avg"}
              ></BarChart>
            </Grid.Col>
          </Grid>
        </>
      )}
    </>
  );
}
