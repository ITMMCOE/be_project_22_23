import {
  Space,
  Container,
  SimpleGrid,
  TextInput,
  NumberInput,
  Button,
  NativeSelect,
} from "@mantine/core";
import { IconUserPlus, IconCheck, IconX } from "@tabler/icons-react";
import axios from "../../axiosConfig";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";

export function StudentForm() {
  const form = useForm({
    initialValues: {
      user: {
        email: "",
        fullname: "",
        role: "student",
      },
      student: {
        rollno: null,
        examseatno: "",
        curr_sem: "3",
        prn: "",
        curryear: "2",
      },
      parent: {
        email: "undefined",
        phone: "0",
      },
    },

    // functions will be used to validate values at corresponding key
    validate: {
      // user: {
      //   phone: (value) => String(value).length === 10 ? null : "Invalid phone number",
      //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      //   fullname: (value) => typeof value === "string" ? null : "Invalid name",
      // },
    },
  });
  const handleSubmitStudent = (event, values) => {
    console.log(form.values);
    axios
      .post("/users/studentRegister", form.values)
      .then(function (response) {
        if (response.data.status === "success") {
          showNotification({
            title: "Success",
            message: "User added successfully",
            icon: <IconCheck />,
            color: "teal",
            autoClose: 2000,
            radius: "xl",
          });
        } else {
          showNotification({
            title: "Fail",
            message: response.data.err,
            icon: <IconX />,
            color: "red",
            autoClose: 3500,
            radius: "xl",
          });
        }
      })
      .catch(function (res) {
        showNotification({
          title: "Fail",
          message: res.response.data.err,
          icon: <IconX />,
          color: "red",
          autoClose: 3500,
          radius: "xl",
        });
      });
  };
  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmitStudent)}>
        <Container>
          <Space h="xs" />
          <SimpleGrid
            cols={2}
            breakpoints={[{ maxWidth: 980, cols: 1, spacing: "md" }]}
          >
            <div>
              <TextInput
                placeholder="Your name"
                label="Name"
                withAsterisk
                {...form.getInputProps("user.fullname")}
              />
            </div>
            <div>
              <TextInput
                placeholder="dev@mmcoe.edu.in"
                label="Email"
                {...form.getInputProps("user.email")}
              />
            </div>
            <div>
              <TextInput
                placeholder="parent@email.com"
                label="Parent's Email"
                {...form.getInputProps("parent.email")}
              />
            </div>
            <div>
              <NumberInput
                placeholder="0000000000"
                label="Parent's Phone number"
                hideControls
                {...form.getInputProps("parent.phone")}
              />
            </div>
            <div>
              <TextInput
                placeholder="7xxxxxxxxx"
                label="Exam Seat number"
                {...form.getInputProps("student.examseatno")}
              />
            </div>
            <div>
              <NumberInput
                placeholder="1"
                label="Roll number"
                hideControls
                {...form.getInputProps("student.rollno")}
              />
            </div>
            <div>
              <TextInput
                placeholder="xxxxxxxx"
                label="PRN number"
                {...form.getInputProps("student.prn")}
              />
            </div>
            <div>
              <NativeSelect
                placeholder="3"
                label="Current semester"
                data={["3", "4", "5", "6", "7", "8"]}
                {...form.getInputProps("student.curr_sem")}
              />
            </div>
            <div>
              <NativeSelect
                placeholder="3"
                label="Current academic year"
                data={["2", "3", "4"]}
                {...form.getInputProps("student.curr  year")}
              />
            </div>
          </SimpleGrid>
          <Space h="md" />
          <Container size={500} px={0}>
            <Button fullWidth type="submit" leftIcon={<IconUserPlus />}>
              Add User
            </Button>
          </Container>
        </Container>
      </form>
    </>
  );
}
