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
  NativeSelect,
  TextInput,
  Modal,
  Container,
  Stack,
} from "@mantine/core";
import axios from "../../axiosConfig";
// import { closeAllModals, openModal } from "@mantine/modals";
const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function PromotionTable({ data }) {
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);
  const [promoteSem, setpromoteSem] = useState("0");
  const [selection, setSelection] = useState([]);
  const [dataYear, setDataYear] = useState("0");
  let promotionList = [];
  /* This code is creating a new array `promotionList` by iterating over the `data` array and creating a
new object for each element. The new object contains a nested object `student` with three properties
`userId`, `curr_sem`, and `curryear`. These properties are assigned values from the corresponding
properties of the original `obj` element. Finally, the new object is pushed to the `promotionList`
array. The `console.log("promotionList")` statement is logging a message to the console for each
iteration. */
  data.forEach((obj) => {
    let promoteObj = { student: {} };
    promoteObj.student.userId = obj.userId;
    promoteObj.student.curr_sem = obj.curr_sem;
    promoteObj.student.curryear = obj.curryear;
    promotionList.push(promoteObj);
    console.log("promotionList");
  });

  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.userId)
    );

  /**
   * The function promotes students to the next semester and updates their current year.
   * returns The function `studentPromoter` returns a new array `promotedList` which is created by
   * mapping over the `students` array and returning a new object for each element. The new object
   * contains all the properties of the original `student` object, but with two additional properties
   * `curr_sem` and `curryear`.
   */
  const studentPromoter = (students) => {
    const promotedList = students.map((element) => {
      return {
        ...element.student,
        curr_sem: promoteSem,
        curryear: dataYear,
      };
    });
    return promotedList;
  };

  /**
   * The function maps a semester number to a corresponding year number.
   */
  const handleSemYear = (sem) => {
    if (sem === "3" || sem === "4") {
      setDataYear("2");
    }
    if (sem === "5" || sem === "6") {
      setDataYear("3");
    }
    if (sem === "7" || sem === "8") {
      setDataYear("4");
    }
    if (sem === "Select Semester") {
      setDataYear("0");
    }
  };

  /**
   * The function updates the state of a variable and calls another function with the updated value as
   * an argument.
   */
  const semesterHandler = (e) => {
    setpromoteSem(e.target.value);
    handleSemYear(e.target.value);
  };

  /**
   * The function handles promotions for selected students by sending a PUT request to update their
   * information on a server.
   */
  const count = [];
  const promotionHandler = () => {
    console.log(studentPromoter(promotionList));
    studentPromoter(promotionList).forEach((obj) => {
      if (selection.includes(obj.userId)) {
        count.push(obj.userId);
        axios
          .put(
            `/student/${obj.userId}`,
            { student: obj }
          )
          .then((res) => {
            console.log("then", res.data);
          })
          .catch((err) => {
            showNotification({
              title: "Failed",
              message: err.response.data.err,
              icon: <IconX />,
              color: "red",
              autoClose: false,
              radius: "xl",
            });
            console.log(err.data);
          });
      }
    });
    showNotification({
      title: "Success",
      message: `${count.length} out of ${promotionList.length}`,
      icon: <IconCheck />,
      color: "teal",
      autoClose: 2000,
      radius: "xl",
    });
  };

  const rows = data.map((item) => {
    const selected = selection.includes(item.userId);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.userId)}
            onChange={() => toggleRow(item.userId)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Avatar size={"md"} radius="xl" color="blue">
              {item.User.fullname.split(" ")[0][0] +
                item.User.fullname.split(" ")[1][0]}
            </Avatar>
            <Text size="sm" weight={500}>
              {item.User.fullname}
            </Text>
          </Group>
        </td>
        <td>{item.curr_sem}</td>
        <td>{item.curryear}</td>
      </tr>
    );
  });

  return (
    <>
      <Container fluid>
        <ScrollArea>
          <Table miw={800} verticalSpacing="sm">
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
                <th>Semester</th>
                <th>Academic year</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Select semester"
            centered
          >
            <Stack>
              <NativeSelect
                data={["Select Semester", "3", "4", "5", "6", "7", "8"]}
                label="Select semester"
                description="select semester to promote student"
                radius="lg"
                size="md"
                withAsterisk
                onChange={semesterHandler}
              />
              <TextInput label="Year" value={dataYear} disabled />
              <Button
                onClick={() => {
                  setOpened(false);
                  promotionHandler();
                }}
              >
                Submit
              </Button>
            </Stack>
          </Modal>
          <Group position="right" mt={6}>
            <Button onClick={() => setOpened(true)}>Promote</Button>
          </Group>
        </ScrollArea>
      </Container>
    </>
  );
}
