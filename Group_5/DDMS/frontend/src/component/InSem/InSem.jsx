import React, { useEffect, useState } from "react";
import { Table, NumberInput, Text, Paper, Container, ScrollArea } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import axios from "../../axiosConfig";

export default function InSem({data, refresh, insemFilters}){
  console.log(data);
  const [currEdit, setCurrEdit] = useState(undefined);
  const [debounced] = useDebouncedValue(currEdit, 200);

  useEffect(()=>{
    if(debounced){
      axios.put("/marks",{mark: {...debounced}})
      .then((res)=>{
        console.log(res)
        showNotification({
          title: "Changes commited",
          message: "Marks Updated Successfully",
          icon: <IconCheck />,
          color: "teal",
          autoClose: 2000,
          radius: "xl",
        });
        refresh(insemFilters.subcode, insemFilters.sem);

        console.log(res);
      })
      .catch((err)=>{
        showNotification({
          title: "Failed",
          message: err.response.data.err,
          icon: <IconX />,
          color: "red",
          autoClose: 3500,
          radius: "xl",
        });
        console.log(err);
      })
      setCurrEdit(undefined);
    }
  },[debounced]);
  console.log(data)

  const rows = data.map((element)=> {
    return(
      <tr key={element.StudentUserId}>
      <td>{element.Student.User.fullname}</td>
      <td>{element.Student.rollno}</td>
      <td>
        <NumberInput
        defaultValue={element.Insem}
        onChange={(e)=>{
          setCurrEdit({
            SubjectSubCode: element.SubjectSubCode,
            StudentUserId: element.StudentUserId,
            Insem: e ? e:null,
          })
        }}
        />
      </td>
    </tr>
    );
    
  });

    return(
        <Container>
            <ScrollArea>
        <Paper shadow={"md"} p={"md"}>
      <Text td={"underline"} m={8}>
        NOTE: All Entered Data is saved to Database automatically, no need to
        submit
      </Text>
      <Table highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>Student</th>
            <th>Roll no.</th>
            <th>Insem Marks</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Paper>
    </ScrollArea>
    </Container>
    );
}