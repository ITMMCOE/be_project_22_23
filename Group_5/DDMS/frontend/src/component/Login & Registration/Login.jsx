import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Image,
  createStyles,
  SimpleGrid,
  Space,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import loginImg from "../../assets/Images/computer-login-animate.svg";
import { useForm , isEmail} from "@mantine/form";
import React, { useState } from "react";
import axios from "../../axiosConfig";
import { IconCheck, IconX } from "@tabler/icons-react";
import secureLocalStorage from "react-secure-storage";
const useStyles = createStyles((theme) => ({
  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}));
export default function AuthenticationTitle() {
  const { classes } = useStyles();
  const navigate = useNavigate();
 
  const form = useForm({
    initialValues: { password: "", email: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      password: (value) =>
        value.length < 2 ? "Password should be atleast 8 characters long" : null,
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      email: isEmail('Invalid email')
    },
  });
  // const initialValues = { email: "", password: "" };
  //   const [formValues, setFormValues] = useState(initialValues);
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     console.log(e.target);
  //     setFormValues({ ...formValues, [name]: value });
  //     console.log(formValues);
  //   };
  const handleSubmit = (event, values) => {
    axios
      .post("/users/login", form.values)
      // .then(function (response) {
      //   console.log(response.status);
      //   // auth.login(response.data.user);
      //   // console.log(Cookies.get())
      //   // navigate(redirectPath, { replace: true });

      // })
      .then((response) => {
        console.log(response);
        const { user } = response.data.objects;
        secureLocalStorage.setItem("user", JSON.stringify(user));
        if (response.status === 200) {
          navigate("/dashboard");
          showNotification({
            title: "Logged in successfully",
            message: "Welcome to DDMS",
            icon: <IconCheck />,
            color: "teal",
            autoClose: 4000,
            radius: "xl",
          });
        }
      })
      .catch(function (error) {
        showNotification({
          title: "Failed",
          message: "Incorrect email or password",
          icon: <IconX />,
          color: "red",
          autoClose: 3500,
          radius: "xl",
        });
        console.log(error.response.data);
      });
  };

  return (
    <Container my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Marathwada Mitra Mandal's College of Engineering
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor href="#" size="sm" onClick={(event) => event.preventDefault()}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={20} mt={30} radius="md">
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: 980, cols: 1, spacing: "md" }]}
        >
          <div>
            <Image
              className={classes.image}
              fit="contain"
              height={400}
              src={loginImg}
              alt="Login Illustration"
            />
          </div>
          <div>
            <Space h="md" />
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label="Email"
                placeholder="Email"
                withAsterisk
                {...form.getInputProps("email")}
              />

              <PasswordInput
                label="Password"
                mt="md"
                placeholder="Password"
                withAsterisk
                error="Please enter correct password"

                {...form.getInputProps("password")}
              />

              <Group position="apart" mt="lg">
                <Anchor
                  // onClick={(event) => event.preventDefault()}
                  href="http://localhost:3000/forgot-password"
                  size="sm"
                >
                  Forgot password?
                </Anchor>
              </Group>
              <Button fullWidth mt="xl" type="submit">
                Sign in
              </Button>
            </form>
          </div>
        </SimpleGrid>
      </Paper>
    </Container>
  );
}

