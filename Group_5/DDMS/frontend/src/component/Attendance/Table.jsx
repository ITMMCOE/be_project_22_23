import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  Button,
} from "@mantine/core";
import axios from "../../axiosConfig";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function TableSelection({
  data,
  subCode,
  createdAt,
  reqRefresh,
}) {
  let presenteeList = [];
  console.log(data);
  data.forEach((obj) => {
    let attendObj = {};
    attendObj.StudentUserId = obj.userId;
    attendObj.presentee = false;
    attendObj.SubjectSubCode = subCode;
    attendObj.createdAt = createdAt;
    presenteeList.push(attendObj);
  });
  console.log(presenteeList);
  const { classes, cx } = useStyles();
  const [btnState, setBtnState] = useState(false);
  const [selection, setSelection] = useState([]);

  const toggleRow = (id) => {
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.userId)
    );

  const markAttendance = () => {
    if (presenteeList.length === 0) {
      setBtnState(false);
      return;
    }
    setBtnState(true);
    // showNotification({
    //   title: "Updating Attendance",
    //   message: "Commiting your Changes to Database...",
    //   disallowClose: true,
    //   loading: true,
    // });
    presenteeList.forEach((obj) => {
      if (selection.includes(obj.StudentUserId)) {
        obj.presentee = true;
      } else {
        obj.presentee = false;
      }
    });
    axios
      .post("/attend/multiple", presenteeList)
      .then((res) => {
        showNotification({
          title: "Success!",
          message: "Attendance marked.",
          color: "teal",
          icon: <IconCheck />,
          disallowClose: false,
          autoClose: 2000,
          radius: "xl",
        });
        reqRefresh("stats");
      })
      .catch((err) =>
        showNotification({
          title: "Failed!",
          message: err.response.data.err,
          icon: <IconX />,
          color: "red",
          autoClose: 2000,
          radius: "xl",
        })
      );
    setBtnState(false);
  };

  const rows = data.map((item) => {
    const selected = selection.includes(item.userId);
    return (
      <tr key={item.userId} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.userId)}
            onChange={(e) => toggleRow(item.userId)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" weight={500}>
              {item.User.fullname}
            </Text>
          </Group>
        </td>
        <td>{item.rollno}</td>
        {/* <td>{currdate}</td> */}
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
                transitionDuration={0}
              />
            </th>
            <th>Name</th>
            <th>Roll No.</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Button
        size="lg"
        mt={40}
        onClick={markAttendance}
        loading={btnState}
        disabled={createdAt === null || subCode === undefined}
      >
        Mark Attendance
      </Button>
    </ScrollArea>
  );
}
