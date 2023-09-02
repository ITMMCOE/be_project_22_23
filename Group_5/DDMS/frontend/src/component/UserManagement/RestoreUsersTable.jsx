import {
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import axios from "../../axiosConfig";
import { IconPencil, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";

export default function RestoreUsersTable({ data }) {
  console.log(data);
  const theme = useMantineTheme();
  const deleteUser = (id) => {
    axios
      .delete(`/users/${id}`, {
        data: { hardDelete: true },
        
      })
      .then((res) => {
        showNotification({
          title: "Success",
          message: "User Deleted successfully",
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
  const rows = data.map((item) => (
    // const rows = (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
          {/* <Avatar size={30} src={item.avatar} radius={30} /> */}
          <Text size="sm" weight={500}>
            {item.fullname}
          </Text>
        </Group>
      </td>

      <td>
        <Badge
          variant={theme.colorScheme === "dark" ? "light" : "outline"}
          color={item.role === "faculty" ? "cyan" : "yellow"}
        >
          {item.role}
        </Badge>
      </td>
      <td>
        <Anchor
          size="sm"
          href="#"
          onClick={(event) => event.preventDefault()}
          underline={false}
        >
          {item.email}
        </Anchor>
      </td>
      <td></td>
      <td>
        <Group>
          <ActionIcon>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => {
              deleteUser(item.userId);
            }}
          >
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table
        sx={{ minWidth: 800 }}
        verticalSpacing="sm"
        // striped
        highlightOnHover
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
