
import {
  Text,
  Paper,
  Space,
  Container,
  Switch,
  SegmentedControl,
  Stack,
} from "@mantine/core";
import { useState } from "react";
import { StudentForm } from "./StudentForm";
import { FacultyForm } from "./FacultyForm";
import ExtractUsers from "../ExtractUsers/ExtractUsers";

function Forms() {
  const [category, setCategory] = useState("faculty");
  return (
    <>
      <Stack align="center">
        <Space h="xs" />
        <SegmentedControl
          color="blue"
          value={category}
          size="md"
          radius={20}
          onChange={setCategory}
          data={[
            { value: "faculty", label: "Faculty" },
            { value: "ftudent", label: "Student" },
          ]}
        />
      </Stack>
      <div className="addUserForm">
        {category === "faculty" ? <FacultyForm /> : <StudentForm />}
      </div>
    </>
  );
}
export default function AddUser() {
  const [checked, setChecked] = useState(false);
  return (
    <Container>
      <Paper shadow="md" p="md" withBorder>
        <Text align="center" fz="xl" fw={700}>
          Add User
        </Text>
        {/* <Text align="center">
          Use it to create cards, dropdowns, modals and other components that
          require background with shadow
        </Text> */}
        <Stack align="center">
          <Space h="xs" />
          <Switch
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            size="md"
            label="Upload files"
          />
        </Stack>

        {checked ? <ExtractUsers /> : <Forms />}
      </Paper>
    </Container>
  );
}
