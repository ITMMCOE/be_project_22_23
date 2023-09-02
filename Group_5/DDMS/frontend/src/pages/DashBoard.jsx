import UserTabs from "./UserTabs";
import { Container } from "@mantine/core";
import Subjects from "./Subjects";
import AttendanceTabs from "./AttendanceTabs";

export default function Dashboard() {
  return (
    <>
      <Container>
        {/* <UserTabs></UserTabs> */}
        {/* <Subjects></Subjects> */}
        <AttendanceTabs></AttendanceTabs>
      </Container>
    </>
  );
}
