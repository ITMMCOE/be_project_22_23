import React from "react";
import { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Modal,
  TextInput,
  Button,
  Paper,
} from "@mantine/core";
import { IconPencil, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import axios from "../../axiosConfig";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import EditSubjectForm from "./EditSubjectForm";
import { closeAllModals, openConfirmModal } from "@mantine/modals";
function Editsubject() {
  const [result, setResult] = useState([]);
  const [opened, setOpened] = useState(undefined);
  const [tempState, setTempState] = useState({});
  const [refresh, setRefresh] = useState("first-render");

  // const form=useForm({
  //     initialValues: {
  //       subName: tempState['name'],
  //       subCode: tempState['code'],
  //       pract:tempState['pract'],
  //       oral: tempState['oral'],
  //       sem: tempState['sem']
  //     },
  //   });

  console.log(tempState);
  const getSubjects = () => {
    axios
      .get("/subjects/all")
      .then((res) => {
        setResult(res.data.objects);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (refresh === "first-render") {
      getSubjects();
    } else if (refresh === "subjects") {
      getSubjects();
      setRefresh(undefined);
    }
  }, [refresh]);

  const deleteUser = (id) => {
    axios
      .delete(` /subjects/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setRefresh("subjects");
        showNotification({
          title: "Success",
          message: "Subject Deleted successfully",
          icon: <IconCheck />,
          color: "teal",
          autoClose: 2000,
          radius: "xl",
        });
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
      });
  };
  const rows = result.map((item, id) => (
    <tr key={id}>
      <td>
        <Text size="sm" weight={500}>
          {item.subName}
        </Text>
      </td>

      <td>
        <Text size="sm" weight={500}>
          {item.subCode}
        </Text>
      </td>

      <td>
        <Text size="sm" weight={500}>
          {item.pract}
        </Text>
      </td>

      <td>
        <Text size="sm" weight={500}>
          {item.oral}
        </Text>
      </td>

      <td>
        <Text size="sm" weight={500}>
          {item.sem}
        </Text>
      </td>

      <td>
        <Text size="sm" weight={500}>
          {item.termWork === null ? 0 : item.termWork}
        </Text>
      </td>

      <td>
        <ActionIcon
          onClick={() => {
            setOpened({ ...item });
            console.log(opened);
          }}
        >
          <IconPencil size={16} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          onClick={() => {
            openDeleteModal(item.subName, item.subCode);
          }}
          color="red"
        >
          <IconTrash size={16} stroke={1.5} />
        </ActionIcon>
      </td>
    </tr>
  ));
  const openDeleteModal = (subName, subCode) =>
    openConfirmModal({
      title: `Delete ${subName}  subject`,
      centered: true,
      children: (
        <Text>
          Are you sure you want to delete{" "}
          <Text span fw={700}>
            {" "}
            {subName}{" "}
          </Text>{" "}
          subject? This action is destructive.
        </Text>
      ),
      labels: { confirm: "Delete subject", cancel: "cancel" },
      confirmProps: { color: "red" },
      onCancel: () => closeAllModals,
      onConfirm: () => deleteUser(subCode),
    });
  return (
    <>
      <Paper shadow="md" p="md">
        <ScrollArea h={700}>
          {opened && (
            <EditSubjectForm
              opened={opened != undefined}
              onClose={setOpened}
              data={opened}
              reqRefresh={setRefresh}
            />
          )}
          <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>Practical</th>
                <th>Oral</th>
                <th>Semester</th>
                <th>Term Work</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </>
  );
}

export default Editsubject;
