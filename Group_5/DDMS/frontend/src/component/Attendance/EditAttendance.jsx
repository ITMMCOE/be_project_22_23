import React, { useState } from "react";
import { Badge, NativeSelect, Table } from "@mantine/core";
import axios from "../../axiosConfig";
import { IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";

export default function EditAttendance({ data, reqRefresh, filters }) {
  console.log(data);
  console.log("[RENDER]");
  const [isEdit, setIsEdit] = useState(undefined);
  const updatePresentee = (obj) => {
    console.log(obj);
    obj.presentee = obj.presentee == "Present" ? true : false;
    axios
      .put(
        "/attend",
        { ...obj }
      )
      .then((res) => {
        showNotification({
          title: "Success",
          message: "Information Updated Successfully",
          icon: <IconCheck />,
          color: "teal",
          autoClose: 2000,
          radius: "xl",
        });
        reqRefresh(Math.random());
      })
      .catch((res) => {
        console.log(res);
        showNotification({
          title: "Failed",
          message: res.data.err,
          icon: <IconX />,
          color: "red",
          autoClose: 3500,
          radius: "xl",
        });
      });
  };

  const rows = data.map((element) => (
    <tr key={element.StudentUserId}>
      <td>{element.Student.User.fullname}</td>
      <td>{element.Student.rollno}</td>
      <td>
        <NativeSelect
          data={["Present", "Absent"]}
          value={element.presentee ? "Present" : "Absent"}
          onFocus={(e) => {
            setIsEdit(element.StudentUserId);
          }}
          onChange={(e) => {
            updatePresentee({
              StudentUserId: element.StudentUserId,
              createdAt: element.createdAt,
              SubjectSubCode: element.SubjectSubCode,
              presentee: e.target.value,
            });
          }}
          variant={isEdit === element.StudentUserId ? "filled" : "unstyled"}
        ></NativeSelect>
      </td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Roll Number</th>
          <th>Attendance</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
