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
import { IconArrowLeft } from '@tabler/icons-react';
import axios from "../../axiosConfig";
import { useSearchParams } from 'react-router-dom';
import { PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
//import { IconEyeCheck, IconEyeOff } from '@tabler/icons';

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

export function ResetPassword() {
  const { classes } = useStyles();
  //const { token, email } = useParams();
  const form = useForm({
    initialValues:{
      password1:'',
      password2:''
    },
    validate: {
      password2: (value, values) =>
        value !== values.password1 ? 'Passwords did not match' : null,
    },
  })

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("email"))
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const handleSubmit = (event, values) => {
    axios.post("/users/reset-password", {email: email, token: token,...form.values}
  ).then(
    function(res){
      showNotification({
        title: "Success!",
        message: "Password reset successful",
        color: "teal",
        disallowClose: false,
      })
      console.log(res);
    }
  ).catch(
    function(err){
      showNotification({
        title: "Failed!",
        message: "Something went wrong.",
        color: "red",
      })
      console.log(err)
    }
  )

  }

  return (
    <Container size={460} my={30}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
      <Title className={classes.title} align="center">
        Reset Password
      </Title>
      {/* <Text color="dimmed" size="sm" align="center">
        Enter new password
      </Text> */}
      
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
      <PasswordInput
      label="Change visibility toggle icon"
      placeholder="Enter New Password"
      defaultValue="secret"
      {...form.getInputProps('password1')}
      // visibilityToggleIcon={({ reveal, size }) =>
      //   // reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
      // }
    />
    <PasswordInput
      label="Change visibility toggle icon"
      placeholder="Confirm New Password"
      defaultValue="secret"
      {...form.getInputProps('password2')}
      // visibilityToggleIcon={({ reveal, size }) =>
      //   // reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
      // }
    />
        <Group position="apart" mt="lg" className={classes.controls}>
          <Anchor color="dimmed" size="sm" className={classes.control}>
            <Center inline>
              {/* <IconArrowLeft size={12} stroke={1.5} /> */}
              {/* <Box ml={5}>Back to login page</Box> */}
            </Center>
          </Anchor>
          <Button type='submit' className={classes.control}
          >Reset password</Button>
        </Group>
      </Paper>
      <Anchor href="/" color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                {<IconArrowLeft size={12} stroke={1.5} />}
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
      </form>
    </Container>
  );
}