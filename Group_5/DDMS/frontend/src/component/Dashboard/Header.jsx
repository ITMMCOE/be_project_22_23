import {
  createStyles,
  Avatar,
  Menu,
  ActionIcon,
  Header,
  Container,
  Group,
  UnstyledButton,
  Burger,
  Text,
  TextInput,
  Anchor,
  Kbd,
  Autocomplete,
  Paper
} from "@mantine/core";
import { useDisclosure, useHotkeys, useFocusTrap } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import {
  IconArrowRight,
  IconSearch,
  IconSettings,
  IconCheck,
  IconX,
  IconLogout,
} from "@tabler/icons-react";
import axios from "../../axiosConfig";
import { showNotification } from "@mantine/notifications";
import { redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import data from "./Navigation.json";
import { useRef } from "react";
const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

export default function HeaderAction({ links }) {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();
  let user = JSON.parse(secureLocalStorage.getItem("user"));
  console.log(user);
  const logout = () => {
    axios
      .post("/users/logout", null)
      .then((res) => {
        navigate("/");
        secureLocalStorage.removeItem("user");
        user = undefined;
        showNotification({
          title: "Logged off successfully",
          message: "Bye bye!",
          icon: <IconCheck />,
          color: "teal",
          autoClose: 4000,
          radius: "xl",
        });
      })
      .catch((err) => {
        showNotification({
          title: "Something went wrong",
          message: "contact support, and promptly change your password",
          icon: <IconX />,
          color: "red",
          autoClose: 4000,
          radius: "xl",
        });
      });
  };
  const focusSearch = useRef(null);
  useHotkeys([
    [
      "ctrl+k",
      () => {
        console.log("focus search");
        focusSearch.current.focus();
      },
    ],
  ]);

  return (
    <Header height={HEADER_HEIGHT} >
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Anchor href="/dashboard" underline={false}>
            <Text fz="xl" fw={700}>
              DDMS
            </Text>
          </Anchor>
        </Group>
        {user && (
          <Group spacing={5} className={classes.links}>
            <Autocomplete
              ref={focusSearch}
              data={data}
              placeholder="Search the entire application"
              radius="xl"
              size="md"
              icon={<IconSearch size={18} stroke={1.5} />}
              filter={(value, item) =>
                item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.description
                  .toLowerCase()
                  .includes(value.toLowerCase().trim())
              }
              onItemSubmit={(item) => {
                navigate(item.link);
              }}
              limit={5}
              rightSectionWidth={90}
              rightSection={
                <>
                  <Kbd>Ctrl</Kbd>
                  <span>+</span>
                  <Kbd>K</Kbd>
                  {/* <ActionIcon
                    size={32}
                    radius="xl"
                    color="blue"
                    variant="filled"
                  >
                    <IconArrowRight size={18} stroke={1.5} />{" "}
                  </ActionIcon> */}
                </>
              }
            />
          </Group>
        )}
        {user && (
          <Group spacing={4}>
            <Menu
              shadow="md"
              width={200}
              trigger="hover"
              openDelay={100}
              closeDelay={400}
            >
              <Menu.Target>
                <UnstyledButton>
                  <Group>
                    <Avatar
                      size={40}
                      color={user.role === "admin" ? "red" : "yellow"}
                    >
                      {user.fullname.split(" ").length >= 2
                        ? user.fullname.split(" ")[0][0].toUpperCase() +
                          user.fullname.split(" ")[1][0].toUpperCase()
                        : user.fullname.split(" ")[0][0].toUpperCase() +
                          user.fullname.split(" ")[0][1].toUpperCase()}
                    </Avatar>
                    <div>
                      <Text>{user.fullname}</Text>
                      <Text size="xs" color="dimmed">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Text>
                    </div>
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Department data management system</Menu.Label>
                <Anchor href="/my-account" underline={false}>
                  <Menu.Item icon={<IconSettings size={14} />}>
                    Settings
                  </Menu.Item>
                </Anchor>

                <Menu.Item
                  color="red"
                  icon={<IconLogout size={14} />}
                  onClick={logout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        )}
      </Container>
    </Header>
  );
}
