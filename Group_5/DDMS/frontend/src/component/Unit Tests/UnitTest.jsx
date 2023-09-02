import React, { useEffect, useState } from "react";
import { Table, NumberInput, Text, Paper } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import axios from "../../axiosConfig";

export default function UnitTest({ data, refresh, filters }) {
  console.log(data);
  const [focus, setfocus] = useState(undefined);
  const [currEdit, setCurrEdit] = useState(undefined);
  const [debounced] = useDebouncedValue(currEdit, 200);
  useEffect(() => {
    if (debounced) {
      axios
        .put(
          "/unitTest",
          { unitTest: { ...debounced } },
          { withCredentials: true }
        )
        .then((res) => {
          showNotification({
            title: "Changes commited",
            message: "Information Updated Successfully",
            icon: <IconCheck />,
            color: "teal",
            autoClose: 2000,
            radius: "xl",
          });
          refresh(filters.subcode, filters.sem);
          // console.log(res);
        })
        .catch((res) => {
          showNotification({
            title: "Failed",
            message: res.response.data.err,
            icon: <IconX />,
            color: "red",
            autoClose: 3500,
            radius: "xl",
          });
          // console.log(res);
        });
      setCurrEdit(undefined);
    }
  }, [debounced]);
  const rows = data.map((element) => (
    <tr key={element.id}>
      <td>{element.Student.User.fullname}</td>
      <td>{element.Student.rollno}</td>
      <td>
        <NumberInput
          defaultValue={element.UT1}
          variant={focus === "ut1" ? "filled" : "unstyled"}
          onFocus={() => {
            setfocus("ut1");
          }}
          max={50}
          min={0}
          step={1}
          onChange={(e) => {
            setCurrEdit({
              SubjectSubCode: element.SubjectSubCode,
              StudentUserId: element.StudentUserId,
              UT1: e ? e : null,
              UT2: element.UT2,
              UT3: element.UT3,
              UT4: element.UT4,
              UT5: element.UT5,
              UT6: element.UT6,
            });
          }}
        />
      </td>
      <td>
        <NumberInput
          defaultValue={element.UT2}
          variant={focus === "ut2" ? "filled" : "unstyled"}
          onFocus={() => {
            setfocus("ut2");
          }}
          max={50}
          min={0}
          step={1}
          onChange={(e) => {
            setCurrEdit({
              SubjectSubCode: element.SubjectSubCode,
              StudentUserId: element.StudentUserId,
              UT1: element.UT1,
              UT2: e ? e : null,
              UT3: element.UT3,
              UT4: element.UT4,
              UT5: element.UT5,
              UT6: element.UT6,
            });
          }}
        />
      </td>
      <td>
        <NumberInput
          defaultValue={element.UT3}
          variant={focus === "ut3" ? "filled" : "unstyled"}
          onFocus={() => {
            setfocus("ut3");
          }}
          max={50}
          min={0}
          step={1}
          onChange={(e) => {
            setCurrEdit({
              SubjectSubCode: element.SubjectSubCode,
              StudentUserId: element.StudentUserId,
              UT1: element.UT1,
              UT2: element.UT2,
              UT3: e ? e : null,
              UT4: element.UT4,
              UT5: element.UT5,
              UT6: element.UT6,
            });
          }}
        />
      </td>
      <td>
        <NumberInput
          defaultValue={element.UT4}
          variant={focus === "ut4" ? "filled" : "unstyled"}
          onFocus={() => {
            setfocus("ut4");
          }}
          max={50}
          min={0}
          step={1}
          onChange={(e) => {
            setCurrEdit({
              SubjectSubCode: element.SubjectSubCode,
              StudentUserId: element.StudentUserId,
              UT1: element.UT1,
              UT2: element.UT2,
              UT3: element.UT3,
              UT4: e ? e : null,
              UT5: element.UT5,
              UT6: element.UT6,
            });
          }}
        />
      </td>
      <td>
        <NumberInput
          defaultValue={element.UT5}
          variant={focus === "ut5" ? "filled" : "unstyled"}
          onFocus={() => {
            setfocus("ut5");
          }}
          max={50}
          min={0}
          step={1}
          onChange={(e) => {
            setCurrEdit({
              SubjectSubCode: element.SubjectSubCode,
              StudentUserId: element.StudentUserId,
              UT1: element.UT1,
              UT2: element.UT2,
              UT3: element.UT3,
              UT4: element.UT4,
              UT5: e ? e : null,
              UT6: element.UT6,
            });
          }}
        />
      </td>
      <td>
        <NumberInput
          defaultValue={element.UT6}
          variant={focus === "ut6" ? "filled" : "unstyled"}
          onFocus={() => {
            setfocus("ut6");
          }}
          max={50}
          min={0}
          step={1}
          onChange={(e) => {
            setCurrEdit({
              SubjectSubCode: element.SubjectSubCode,
              StudentUserId: element.StudentUserId,
              UT1: element.UT1,
              UT2: element.UT2,
              UT3: element.UT3,
              UT4: element.UT4,
              UT5: element.UT5,
              UT6: e ? e : null,
            });
          }}
        />
      </td>
    </tr>
  ));
  return (
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
            <th>Unit test 1</th>
            <th>Unit test 2</th>
            <th>Unit test 3</th>
            <th>Unit test 4</th>
            <th>Unit test 5</th>
            <th>Unit test 6</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Paper>
  );
}
