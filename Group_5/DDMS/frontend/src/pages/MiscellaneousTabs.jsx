import React from "react";
import {
  Tabs,
  Container,
  Anchor,
  Box,
  Center,
  Badge,
  Table,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import Notifications from "../component/Notifications/Notifications";
import Mapseatno from "../component/SeatNos/Mapseatno";
import RollNoManagement from "../component/RollNoManagement/RollNoManagement";

import StudentPromotion from "../component/Student Promotion/StudentPromotion";
export default function MiscellaneousTabs() {
  const { tabValue } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Container>
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
          onTabChange={(value) => navigate(`/miscellaneous-mgmt/${value}`)}
        >
          <Tabs.List>
            <Tabs.Tab value="1">Student Promotion</Tabs.Tab>
            <Tabs.Tab value="2">Notification</Tabs.Tab>
            <Tabs.Tab value="3">Map Seatnos</Tabs.Tab>
            <Tabs.Tab value="4">Roll No Management</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="1" pt="xs">
            <StudentPromotion/>
          </Tabs.Panel>

          <Tabs.Panel value="2" pt="xs">
            <Notifications></Notifications>
          </Tabs.Panel>
          <Tabs.Panel value="3" pt="xs">
            <Mapseatno />
          </Tabs.Panel>
          <Tabs.Panel value="4" pt="xs">
            <RollNoManagement></RollNoManagement>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
}
