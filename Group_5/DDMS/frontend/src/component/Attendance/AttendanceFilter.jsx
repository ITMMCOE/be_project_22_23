import React, { useEffect, useState } from "react";
import { Container, NativeSelect, Grid } from "@mantine/core";
import axios from "../../axiosConfig";
import { DatePicker } from "@mantine/dates";
import { IconCalendarEvent, IconBooks, IconSchool } from "@tabler/icons-react";

export default function AttendanceFilter({ children, onChange, reqData }) {
  const [selectData, setSelectData] = useState(["fetching data..."]);
  const [date, setDate] = useState(new Date());
  const [filters, setFilters] = useState({
    for: new Date(),
    subject: "",
  });
  const getData = (filters) => {
    if (filters.subject !== "Select") {
      console.log({ filters: { ...filters } });
      axios.post("/attend", { filters: { ...filters } }).then((res) => {
        console.log(res);
        onChange(res.data);
      });
    }
  };
  useEffect(() => {
    getData(filters);
  }, [filters, reqData]);
  useEffect(() => {
    axios.get("/faculty", { withCredentials: true }).then((res) => {
      const objects = res.data.objects;
      let temp = ["Select a subject"];
      objects.forEach((object) => {
        temp.push(`${object.Subject.subCode} ${object.Subject.subName}`);
      });
      setSelectData(temp);
    });
  }, []);
  return (
    <Container>
      <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
        <Grid.Col span={6}>
          <NativeSelect
            data={selectData}
            label="Select Subject"
            description="This will display all the students for the subject"
            radius="lg"
            size="md"
            withAsterisk
            onChange={(e) => {
              setFilters({ ...filters, subject: e.target.value.split(" ")[0] });
            }}
            icon={<IconBooks size={24} />}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <DatePicker
            label="Select Date"
            description="Choose the date you wish to see attendance for"
            radius="lg"
            size="md"
            withAsterisk
            value={date}
            onChange={(e) => {
              setDate(e);
              setFilters({ ...filters, for: e });
            }}
            icon={<IconCalendarEvent size={16} />}
            placeholder="select a range"
          />
        </Grid.Col>
      </Grid>
      {children}
    </Container>
  );
}
