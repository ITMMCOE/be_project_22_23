import {
  createStyles,
  Center,
  Avatar,
  BackgroundImage,
  Container,
  Text,
  Divider,
  Badge,
  Card,
  TextInput,
  Button,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPencil, IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import axios from "../../axiosConfig";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

export default function NonStudentAccount({ data }) {
  const initialValues = {
    fullname: data.fullname,
    email: data.email,
    role: data.role,
  };
  const [isNotEdit, setIsNotEdit] = useState(true);
  const form = useForm({ initialValues });
  const { classes, theme } = useStyles();
  console.log("inside component", data);
  const updatedata = (event, id) => {
    event.preventDefault();
    axios
      .put(
        `/datas/${id}`,
        { data: form.values },
        { withCredentials: true }
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
        window.location.reload();
      })
      .catch((res) => {
        showNotification({
          title: "Failed",
          message: "Something went wrong",
          icon: <IconX />,
          color: "red",
          autoClose: 3500,
          radius: "xl",
        });
      });
  };

  return (
    <>
      <Center mt={20}>
        <Avatar
          size={"xl"}
          radius="xl"
          color={data.role === "admin" ? "red" : "yellow"}
        >
          {data.fullname.split(" ").length >= 2
                        ? data.fullname.split(" ")[0][0].toUpperCase() +
                          data.fullname.split(" ")[1][0].toUpperCase()
                        : data.fullname.split(" ")[0][0].toUpperCase() +
                          data.fullname.split(" ")[0][1].toUpperCase()}
        </Avatar>
         
      </Center>
      <Divider
        my={"sm"}
        label={
          <>
            <h1>{data.fullname}</h1>
          </>
        }
        labelPosition={"center"}
      ></Divider>
      <Container>
        <Center>
          <Text>{data.email}</Text>
          <Badge
            color={data.role === "admin" ? "red" : "yellow"}
            size="lg"
            variant="outline"
            mx={16}
          >
            {data.role}
          </Badge>
        </Center>
        <Card>
          <ActionIcon
            ml={900}
            onClick={() => {
              setIsNotEdit(!isNotEdit);
            }}
          >
            <IconPencil></IconPencil>
          </ActionIcon>
          <form
            onSubmit={(e) => {
              updatedata(e, data.id);
            }}
          >
            <TextInput
              disabled={isNotEdit}
              label="Fullname"
              defaultValue={data.fullname}
              withAsterisk
              {...form.getInputProps("fullname")}
              description="Your name in firstname<space>lastname format"
            />
            <TextInput
              disabled={isNotEdit}
              label="Email"
              defaultValue={data.email}
              withAsterisk
              {...form.getInputProps("email")}
              description="email associated with your account"
            />
            <Button mt={12} type="submit" disabled={isNotEdit}>
              Edit
            </Button>
          </form>
        </Card>
      </Container>
    </>
  );
}
