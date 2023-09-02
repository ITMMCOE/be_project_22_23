import React, { useState, useEffect } from "react";
import { Container, NativeSelect } from "@mantine/core";
import axios from "../../axiosConfig";
export default function SubjectFilter({ onChange }) {
  const [subjectList, setSubjectList] = useState([]);
  const [selectData, setSelectData] = useState(["fetching data..."]);
  useEffect(() => {
    axios
      .get("/faculty")
      .then((res) => {
        const objects = res.data.objects;
        setSubjectList(objects);
        let temp = ["Select a subject"];
        objects.forEach((obj) => {
          temp.push(`${obj.Subject.subCode} ${obj.Subject.subName}`);
        });
        setSelectData(temp);
      });
  }, []);
  const fetchStudents = (e) => {
    let sem = -1;
    let SubCode = e.target.value.split(" ")[0].trim();
    subjectList.forEach((obj) => {
      let subcode = obj.Subject.subCode;
      if (subcode == SubCode) {
        sem = obj.Subject.sem;
      }
    });
    console.log(SubCode, sem);
    if (sem !== -1) {
      onChange(SubCode, sem);
    }
  };
  return (
    <Container>
      <NativeSelect
        data={selectData}
        label="Select Subject"
        description="This will display all the students for the subject"
        radius="lg"
        size="md"
        m={16}
        withAsterisk
        onChange={fetchStudents}
      />
    </Container>
  );
}
