import { IconArrowLeft } from '@tabler/icons-react';
import {
    createStyles,
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
  } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from "../../axiosConfig";
import { showNotification } from "@mantine/notifications";
  
  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 26,
      fontWeight: 900,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  
    controls: {
      [theme.fn.smallerThan('xs')]: {
        flexDirection: 'column-reverse',
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        width: '100%',
        textAlign: 'center',
      },
    },
  }));
  
  export function ForgotPassword() {
    const { classes } = useStyles();
    const form = useForm({
      initialValues: {email:""},
      validate:{
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email")
      }
    })

    const handleSubmit = (event, values) =>{
      axios.post("/users/forgotPassword", form.values)
      .then(
        function(response){
          showNotification({
            title: "Success!",
            message: "Mail sent successfully",
            color: "teal",
            disallowClose: false,
          })
          console.log(response);
        }
      )
      .catch(function(error){
        showNotification({
          title: "Failed!",
          message: "Something went wrong.",
          color: "red",
        })
        console.log(error.response.data);
      })
    }

    return (
      <Container size={460} my={30}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title className={classes.title} align="center">
          Forgot your password?
        </Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your email to get a reset link
        </Text>
  
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput label="Your email" placeholder="xyz@gmail.com" {...form.getInputProps("email")} required />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor href="/" color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                {<IconArrowLeft size={12} stroke={1.5} />}
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
            <Button type='submit' className={classes.control} 
            onClick={() => console.log("hit")}
            >Reset password</Button>
          </Group>
        </Paper>
        </form>
      </Container>
    );
  }