import {
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Tooltip,
  Paper,
} from "@mantine/core";
import axios from "../../axiosConfig";
import { IconPencil, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { closeAllModals, openModal, openConfirmModal } from "@mantine/modals";
import React, { useState } from "react";
import EditStudentForm from "./EditStudentForm";

export default function StudentManagementTable({ data, reqRefresh }) {
  const theme = useMantineTheme();
  console.log(data);
  const [studentData, setStudentData] = useState(undefined);
  const deleteUser = (id) => {
    axios
      .delete(`/users/${id}`)
      .then((res) => {
        showNotification({
          title: "Success",
          message: "User Deleted successfully",
          icon: <IconCheck />,
          color: "teal",
          autoClose: 2000,
          radius: "xl",
        });
        reqRefresh("students");
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

  const rows = data.map((item) => (
    // const rows = (
    <tr key={item.userId}>
      <td>
        <Group spacing="sm">
          {/* <Avatar size={30} src={item.avatar} radius={30} /> */}
          <Text size="sm" weight={500}>
            {item.User.fullname}
          </Text>
        </Group>
      </td>

      <td>
        <Badge
          variant={theme.colorScheme === "dark" ? "light" : "outline"}
          color="yellow"
        >
          Student
        </Badge>
      </td>
      <td>
        <Anchor
          size="sm"
          href="#"
          onClick={(event) => event.preventDefault()}
          underline={false}
        >
          {item.User.email}
        </Anchor>
      </td>
      <td>
        <Text size="sm">{item.rollno}</Text>
      </td>
      <td>
        <Text size="sm">{item.examseatno}</Text>
      </td>
      <td>
        <Text size="sm">{item.prn}</Text>
      </td>
      <td>
        <Text size="sm">{item.curr_sem}</Text>
      </td>
      <td>
        <Text size="sm">{item.curryear}</Text>
      </td>
      <td>
        <Text size="sm">{item.Parent.phone}</Text>
      </td>
      <td>
        <Text size="sm">{item.Parent.email}</Text>
      </td>
      <td>
        <Group>
          <Tooltip label="Edit user" color="dark" withArrow>
            <ActionIcon
              onClick={() => {
                setStudentData(item);
              }}
            >
              <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete user" color="dark" withArrow>
          <ActionIcon
            color="red"
            onClick={() => {
              openDeleteModal(item.User.fullname, item.userId);
            }}
          >
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
          </Tooltip >
        </Group>
      </td>
    </tr>
  ));
  const openDeleteModal = (fullname, id) =>
    openConfirmModal({
      title: `Delete ${fullname}  profile`,
      centered: true,
      children: (
        <Text>
          Are you sure you want to delete{" "}
          <Text span fw={700}>
            {" "}
            {fullname}'s{" "}
          </Text>{" "}
          profile? This action is destructive.
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "cancel" },
      confirmProps: { color: "red" },
      onCancel: () => closeAllModals,
      onConfirm: () => deleteUser(id),
    });
  return (
    <Paper shadow="md" p="md">
      <ScrollArea h={700}>
        {studentData && (
          <EditStudentForm
            opened={studentData != undefined}
            onClose={setStudentData}
            data={studentData}
            reqRefresh={reqRefresh}
          />
        )}
        <Table
          sx={{ minWidth: 800 }}
          verticalSpacing="sm"
          // striped
          highlightOnHover
          withColumnBorders
        >
          <thead>
            <tr>
              <th>Student</th>
              <th>Role</th>
              <th>Email</th>
              <th>Roll no.</th>
              <th>Exam seat no.</th>
              <th>PRN</th>
              <th>Semester</th>
              <th>Year</th>
              <th>Parent's Mobile Number</th>
              <th>Parent's Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}
