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
  ActionIcon,
  Button,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import axios from "../../axiosConfig";
import { IconPencil, IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";

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

export default function StudentAccount({ data }) {
  const [isNotEdit, setIsNotEdit] = useState(true);
  const { classes, theme } = useStyles();
  console.log(data);
  console.log(data.student.Parent.email, data.student.Parent.phone);

  const initialValues = {
    prn: data.student.prn,
    rollno: data.student.rollno,
    examseatno: data.student.examseatno,
    curr_sem: data.student.curr_sem,
    curryear: data.student.curryear,
    // phone: data.Parent.phone,
    // email : data.Parent.email,
  };



  const form = useForm({ initialValues });
  console.log(initialValues);
  const updateStudent = (event, id) => {
    event.preventDefault();
    axios
      .put(
        `/student/${id}`,
        { student: form.values },
       
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
        console.log(res);
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
    console.log(form.values);
  };
  

  return (
    <>
      <Center mt={20}>
        {/* <Avatar size={"xl"} radius="xl" color="cyan">
          {data.student.User.fullname.split(" ")[0][0] +
            data.student.User.fullname.split(" ")[1][0]}
        </Avatar> */}
        <Avatar size={"xl"} radius="xl" color="cyan">
          {data.student.User.fullname.split(" ")[0][0] +
            data.student.User.fullname.split(" ")[1][0]}
        </Avatar>
      </Center>
      <Divider
        my={"sm"}
        label={
          <>
            <h1>{data.student.User.fullname}</h1>
          </>
        }
        labelPosition={"center"}
      ></Divider>
      <Container>
        <Center>
          <Text>{data.student.User.email}</Text>
          <Badge color="cyan" size="lg" variant="outline" mx={16}>
            Student
          </Badge>
        </Center>
        <h1>Student Informaton</h1>
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
              updateStudent(e, data.student.userId);
              window.location.reload();
            }}
          >
            {/* <TextInput disabled={isNotEdit} label="Fullname" 
            defaultValue={data.student.User.fullname} withAsterisk 
            {...form.getInputProps("fullname")} description="Your name in firstname<space>lastname format"/> */}
            {/* <TextInput disabled={isNotEdit}label="Email" 
            defaultValue={data.student.User.email} withAsterisk 
            {...form.getInputProps("email")} description="email associated with your account"/> */}
            <TextInput
              type={Number}
              mt="md"
              disabled={isNotEdit}
              label="PRN"
              defaultValue={data.student.prn}
              withAsterisk
              {...form.getInputProps("prn")}
            />
            <TextInput
              type={Number}
              mt="md"
              disabled={isNotEdit}
              label="Roll No"
              defaultValue={data.student.rollno}
              withAsterisk
              {...form.getInputProps("rollno")}
            />
            <TextInput
              type={Number}
              mt="md"
              disabled={isNotEdit}
              label="Exam Seat No"
              defaultValue={data.student.examseatno}
              withAsterisk
              {...form.getInputProps("examseatno")}
            />
            <TextInput
              type={Number}
              mt="md"
              disabled={true}
              label="Current Semester"
              defaultValue={data.student.curr_sem}
            />
            <TextInput
              type={Number}
              mt="md"
              disabled={true}
              label="Current Year"
              defaultValue={data.student.curryear}
            />
            <TextInput
              label="Parent Email"
              mt="md"
              disabled={true}
              defaultValue={data.student.Parent.email}
            />
            <TextInput
              label="Parent Mobile Number"
              mt="md"
              disabled={true}
              defaultValue={data.student.Parent.phone}
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
