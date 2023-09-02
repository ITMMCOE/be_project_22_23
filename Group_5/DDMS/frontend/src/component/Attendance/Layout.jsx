import React, { useEffect, useState } from "react";
import { Container, NativeSelect, Grid } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCalendarEvent } from "@tabler/icons-react";
import axios from "../../axiosConfig";

import Table from "./Table";

export default function Attendance({ reqRefresh }) {
  const [studentList, setStudentList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [selectData, setSelectData] = useState(["fetching data..."]);
  const [subjectSubCode, setSubjectSubCode] = useState(undefined);
  const [createdAt, setCreatedAt] = useState(new Date());

  /* Fetching data from the server and setting the state of the component. */
  useEffect(() => {
    axios.get("/faculty").then((res) => {
      const objects = res.data.objects;
      setSubjectList(objects);
    });
  }, []);
  useEffect(() => {}, [selectData, createdAt]); // to re-render table on dropdown value change
  useEffect(() => {
    let temp = ["Select a subject"];
    subjectList.forEach((obj) => {
      temp.push(`${obj.Subject.subCode} ${obj.Subject.subName}`);
    });
    setSelectData(temp);
  }, [subjectList]);

  /**
   * It fetches students from the database based on the subject code.
   */
  const fetchStudents = (e) => {
    let sem = -1;
    let SubCode = e.target.value.split(" ")[0];
    subjectList.forEach((obj) => {
      let subcode = obj.Subject.subCode;
      if (subcode === SubCode) {
        sem = obj.Subject.sem;
      }
    });
    if (sem !== -1) {
      axios
        .get(`/student/search?curr_sem=${sem}`, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res.data.objects);
          setStudentList(res.data.objects);
          setSubjectSubCode(SubCode);
        });
    }
  };
  return (
    /* A fragment. It is used to group a list of children without adding extra nodes to the DOM. */
    <>
      <Container>
        <h1>Mark Attendance</h1>
        <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
          <Grid.Col span={6}>
            <NativeSelect
              data={selectData}
              label="Select Subject"
              description="This will display all the students for the subject"
              radius="lg"
              size="md"
              withAsterisk
              onChange={fetchStudents}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DatePicker
              placeholder="Pick date"
              label="Lecture Date "
              description="Choose the date for which you want to mark attendance."
              radius="lg"
              size="md"
              icon={<IconCalendarEvent size={16} />}
              name="createdAt"
              value={createdAt}
              onChange={(e) => setCreatedAt(e)}
              withAsterisk
            />
          </Grid.Col>
        </Grid>
        {
          <Table
            data={studentList}
            subCode={subjectSubCode}
            createdAt={createdAt}
            reqRefresh={reqRefresh}
          />
        }
      </Container>
    </>
  );
}
