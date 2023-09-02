import { Tabs, Container, Anchor, Box, Center } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import axios from "../axiosConfig";
import { useEffect, useState } from "react";
import AddUser from "../component/Add User/AddUser";
import FacultyManagementTable from "../component/UserManagement/FacultyManagementTable";
import RestoreUsersTable from "../component/UserManagement/RestoreUsersTable";
import StudentManagementTable from "../component/UserManagement/StudentManagementTable";
import { useNavigate, useParams } from "react-router-dom";
import Userscribe from "../component/Scribe/Userscribe";

export default function UserTabs() {
  const navigate = useNavigate();
  const { tabValue } = useParams();
  const [facultyData, setFacultyData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [trashedUsers, setTrashedUsers] = useState([]);
  const [refresh, setRefresh] = useState("first-render");
  const getFaculty = () => {
    axios
      .get("/faculty/all")
      .then((res) => {
        setFacultyData(res.data.objects);
      });
  };

  const getStudents = () => {
    axios
      .get("/student/search")
      .then((res) => {
        setStudentData(res.data.objects);
      });
  };

  const getTrash = () => {
    axios
      .get("/users/trash")
      .then((res) => {
        setTrashedUsers(res.data.objects);
      });
  };

  useEffect(() => {
    if (refresh === "first-render") {
      getFaculty();
      getStudents();
      getTrash();
    } else if (refresh === "faculty") {
      getFaculty();
      setRefresh(undefined);
    } else if (refresh === "students") {
      getStudents();
      setRefresh(undefined);
    } else if (refresh === "trash") {
      getTrash();
      setRefresh(undefined);
    }
  }, [refresh]);

  return (
    <Container size={"xl"}>
      <Anchor href="/dashboard" color={"gray"} mt={24}>
        <Center inline>
          {<IconArrowLeft size={24} stroke={1.5} />}
          <Box ml={5}>Back to Dashboard</Box>
        </Center>
      </Anchor>
      <Tabs
        variant="pills"
        radius="lg"
        defaultValue="1"
        value={tabValue}
        onTabChange={(value) => {
          navigate(`/user-mgmt/${value}`);
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="1">Create Users</Tabs.Tab>
          <Tabs.Tab value="2">Manage Faculty</Tabs.Tab>
          <Tabs.Tab value="3">Manage Students</Tabs.Tab>
          {/* <Tabs.Tab value="4">Restore Deleted accounts</Tabs.Tab> */}
          <Tabs.Tab value="5">How to use</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="1" pt="xs">
          Create new users
          <AddUser />
        </Tabs.Panel>

        <Tabs.Panel value="2" pt="xs">
          Manage all faculty accounts
          <FacultyManagementTable data={facultyData} reqRefresh={setRefresh} />
        </Tabs.Panel>

        <Tabs.Panel value="3" pt="xs">
          Manage all student accounts
          <StudentManagementTable data={studentData} reqRefresh={setRefresh} />
        </Tabs.Panel>
        <Tabs.Panel value="4" pt="xs">
          Restore or Permanently Delete, previously deleted, accounts.
          <RestoreUsersTable data={trashedUsers} reqRefresh={setRefresh} />
        </Tabs.Panel>

        <Tabs.Panel value="5" pt="xs">
          <Userscribe/>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
