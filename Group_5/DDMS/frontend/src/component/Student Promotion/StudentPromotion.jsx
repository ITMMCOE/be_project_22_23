import React from "react";
import axios from "../../axiosConfig";
import { Button, Container, Group, NativeSelect } from "@mantine/core";
import { useState } from "react";
import Table from "./Table";
export default function StudentPromotion() {
  const [data, setData] = useState([]);
  const [promoteSem, setpromoteSem] = useState("0");
  const filterHandler = (e) => {
    axios.get(`/student/search?curr_sem=${e.target.value}`).then((res) => {
      setData(res.data.objects);
      console.log(res.data.objects);
    });
  };

  return (
    <>
      <Container>
        <Group position="center">
          <NativeSelect
            data={["Select Semester", "3", "4", "5", "6", "7", "8"]}
            label="Select semester"
            description="select semester to get student"
            radius="lg"
            size="md"
            withAsterisk
            onChange={filterHandler}
          />
        </Group>
        {data ? <Table data={data} /> : null}
      </Container>
    </>
  );
}
