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
  Paper,
} from "@mantine/core";
import { IconCheck, IconX , IconSquareRoundedX } from "@tabler/icons-react";
import axios from "../../axiosConfig";
import { showNotification } from "@mantine/notifications";
import { closeAllModals, openConfirmModal } from "@mantine/modals";
export default function UnclaimSubjects({ data, reqRefresh }) {
  console.log(data);

  const unclaimsubject = (subCode) => {
    axios
      .delete(`/faculty/subject/${subCode}`)
      .then((res) => {
        showNotification({
          title: "Success!",
          message: "Subject unclaimed successfully",
          icon: <IconCheck />,
          color: "teal",
          autoClose: 2000,
          radius: "xl",
        });
        reqRefresh();
        console.log(res);
      })
      .catch(function (err) {
        showNotification({
          title: "Failed!",
          message: "Something went wrong.",
          icon: <IconX />,
          color: "red",
          autoClose: 3500,
          radius: "xl",
        });
        console.log(err);
      });
  };
  const theme = useMantineTheme();
  const rows = data.map((item) => (
    <tr key={item.Subject.subCode}>
      <td>
        <Group spacing="sm">
          {/* <Avatar size={30} src={item.avatar} radius={30} /> */}
          <Text size="sm" weight={500}>
            {item.Subject.subCode}
          </Text>
        </Group>
      </td>
      <td>
        <Text size="sm" color="dimmed">
          {item.Subject.subName}
        </Text>
      </td>
      <td>
        <ActionIcon
          onClick={() => {
            openDeleteModal(item.Subject.subName,item.Subject.subCode)
          }}
          color="red"
        >
          <IconSquareRoundedX  size={20} stroke={1.5} />
        </ActionIcon>
      </td>
    </tr>
  ));
  const openDeleteModal = (subName, subCode) =>
  openConfirmModal({
    title: `Delete ${subName}  profile`,
    centered: true,
    children: (
      <Text  >
        Are you sure you want to unclaim <Text span  fw={700}> {subName} </Text> subject?
      </Text>
    ),
    labels: { confirm: "Unclaim subject", cancel: "cancel" },
    confirmProps: { color: "red" },
    onCancel: () => closeAllModals,
    onConfirm: () => unclaimsubject(subCode),
  });
  return (
    <Paper shadow="md" p="md">
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Unclaim</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}
