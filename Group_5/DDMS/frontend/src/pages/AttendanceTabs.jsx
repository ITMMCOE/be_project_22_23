import { Tabs, Container, Anchor, Center, Box, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import AttendanceFilter from "../component/Attendance/AttendanceFilter";
import Attendance from "../component/Attendance/Layout";
import axios from "../axiosConfig";
import { useEffect, useState } from "react";
import AttendanceDash from "../component/Attendance/AttendanceDash";
import { useNavigate, useParams } from "react-router-dom";
import AttendanceReport from "../component/Spreadsheets/AttendanceReport";
import EditAttendance from "../component/Attendance/EditAttendance";
import Attendancescribe from "../component/Scribe/Attendancescribe";


export default function AttendanceTabs() {
  const navigate = useNavigate();
  const { tabValue } = useParams();
  const [subjectList, setSubjectList] = useState();
  const [stats, setStats] = useState();
  const [reqData, setreqData] = useState(false);
  const [attendData, setAttendData] = useState([]);
  const [filters, setFilters] = useState({
    date: new Date().toISOString().slice(0, 10),
  });
  const getSubjects = () => {
    axios
      .get("/faculty", { withCredentials: true })
      .then((res) => {
        const objects = res.data.objects;
        setSubjectList(objects);
      });
  };
  const getData = (data) => {
    console.log(data);
    setAttendData(data.objects);
  };

  useEffect(() => {
    axios
      .post(`/attend/stats?date=${filters.date}`, null, {
        withCredentials: true,
      })
      .then((res) => {
        setStats(res.data.objects);
      });
  }, [filters]);

  return (
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
        onTabChange={(value) => navigate(`/attend-mgmt/${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab value="1">Attendance Dashboard</Tabs.Tab>
          <Tabs.Tab value="2" onClick={getSubjects}>
            Mark Attendance
          </Tabs.Tab>
          <Tabs.Tab value="3">Edit Attendance</Tabs.Tab>
          <Tabs.Tab value="4">Report Generation</Tabs.Tab>
          <Tabs.Tab value="5">How to use</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="1" pt="xs">
          Attendance Dashboard
          {/* <AttendanceFilter onChange={getData}></AttendanceFilter> */}
          <AttendanceDash
            data={stats}
            currFilters={filters}
            setFilters={setFilters}
          ></AttendanceDash>
        </Tabs.Panel>

        <Tabs.Panel value="2" pt="xs">
          <Attendance></Attendance>
        </Tabs.Panel>

        <Tabs.Panel value="3" pt="xs">
          Edit Previous Attendance
          <AttendanceFilter
            onChange={getData}
            reqData={reqData}
          ></AttendanceFilter>
          <EditAttendance data={attendData} reqRefresh={setreqData} />
        </Tabs.Panel>

        <Tabs.Panel value="4" pt="xs">
          Generate Report
          <AttendanceFilter onChange={getData}></AttendanceFilter>
          <AttendanceReport
            data={attendData}
            filters={filters}
          ></AttendanceReport>
        </Tabs.Panel>

        <Tabs.Panel value="5" pt="xs">
          How to use
          <Attendancescribe/>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
