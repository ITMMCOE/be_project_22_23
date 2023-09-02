import {
  Space,
  Container,
  SimpleGrid,
  TextInput,
  Button
} from "@mantine/core";
import { IconUserPlus, IconCheck, IconX } from "@tabler/icons-react";
import axios from "../../axiosConfig";
import { showNotification } from "@mantine/notifications";
import { useForm, isEmail, isNotEmpty } from "@mantine/form";

// import useradd from "../../assets/Images/person-plus-fill.svg";
export function FacultyForm() {
  const form = useForm({
    initialValues: {
      user: {
        email: "",
        fullname: "",
        // phone: 0,
        // facultyid: "",
        role: "faculty",
      },
    },

    // functions will be used to validate values at corresponding key
    validate: {
      user: {
        // phone: (value) =>
        //   String(value).length === 10 ? null : "Invalid phone number",
        // 
        email: isEmail('Invalid email'),
        fullname: isNotEmpty("Enter the name")
      },
    },
  });
  const handleSubmitFaculty = (event, values) => {
    // form.setFieldValue('role',"faculty")
    console.log(form.values);
    axios
      .post("/users/facultyRegister", form.values)
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
            autoClose: 2000,
            radius: "xl",
          });
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmitFaculty)}>
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
                
                {...form.getInputProps("user.fullname")} />
            </div>
            <div>
              <TextInput
                placeholder="dev@mmcoe.edu.in"
                label="Email"
                withAsterisk
                {...form.getInputProps("user.email")} />
            </div>
            {/* <div>
              <TextInput
                placeholder="Faculty Id"
                label="Faculty Id"
                {...form.getInputProps("user.facultyid")}
                // withAsterisk
              />
            </div> */}

            {/* <div>
              <NumberInput
                placeholder="00000000000"
                label="Phone"
                hideControls
                {...form.getInputProps("user.phone")}
              />
            </div> */}
          </SimpleGrid>
          <Space h="md" />
          <Container size={500} px={0}>
            <Button
              fullWidth
              // variant="outline"
              type="submit"
              leftIcon={<IconUserPlus />}
            >
              Add User
            </Button>
          </Container>
        </Container>
      </form>
    </>
  );
}
