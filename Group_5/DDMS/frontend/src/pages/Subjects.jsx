import { Tabs, Container, Anchor, Box, Center } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import CreateSubject from "../component/Create Subject/CreateSubject";
import ClaimSubjects from "../component/Claim Subjects/ClaimSubjects";
import axios from "../axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Subjectscribe from "../component/Scribe/Subjectscribe";

import Editsubject from "../component/Edit Subject/Editsubject";
export default function Subjects() {
  const [subjectData, setSubjectData] = useState([]);
  const navigate = useNavigate();
  const { tabValue } = useParams();

  const getSubjects = () => {
    axios
      .get("/faculty/UnclaimedSubjects")
      .then((res) => {
        console.log(res.data.objects);
        const objects = res.data.objects;
        let temp = [];
        objects.forEach((object) => {
          temp.push({
            value: `${object.subCode}`,
            label: `${object.subCode} ${object.subName}`,
          });
        });
        setSubjectData(temp);
      });
  };

  const handleClick = () => {
    getSubjects();
  }

  useEffect(() => {
    getSubjects();
  }, []);
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
        onTabChange={(value) => navigate(`/subject-mgmt/${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab value="1">Create Subject</Tabs.Tab>
          <Tabs.Tab value="2">Edit Subject</Tabs.Tab>
          <Tabs.Tab value="3" onClick={handleClick}>Claim/Unclaim Subject</Tabs.Tab>
          <Tabs.Tab value="4">How to use</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="1" pt="xs">
          <CreateSubject></CreateSubject>
        </Tabs.Panel>

        <Tabs.Panel value="2" pt="xs">
          <Editsubject></Editsubject>
        </Tabs.Panel>

        <Tabs.Panel value="3" pt="xs">
          <ClaimSubjects
            data={subjectData}
            reqRefresh={getSubjects}
          ></ClaimSubjects>
        </Tabs.Panel>
          
        <Tabs.Panel value="4" pt="xs">
        <Subjectscribe/>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
