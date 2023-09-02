import { Button, MultiSelect } from "@mantine/core";
import axios from "../../axiosConfig";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import UnclaimSubjects from "./UnclaimSubjects";
import { IconCheck, IconX, IconTrash } from "@tabler/icons-react";
export default function ClaimSubjects(props) {
  const [ClaimSubjects, setClaimSubjects] = useState([]);
  const [alreadyClaimed, setAlreadyClaimed] = useState([]);

  const getClaimed = () => {
    axios.get("/faculty/").then((res) => {
      setAlreadyClaimed(res.data.objects);
      props.reqRefresh();
    });
  };
  useEffect(() => {
    getClaimed();
  }, []);

  const handleSubmit = () => {
    console.log(ClaimSubjects);
    axios
      .post(
        "/faculty/claimSubjects",
        { subIds: ClaimSubjects },
        { withCredentials: true }
      )
      .then((res) => {
        showNotification({
          title: "Success!",
          message: "Subject claimed successfully",
          icon: <IconCheck />,
          color: "teal",
          autoClose: 2000,
          radius: "xl",
        });
        setClaimSubjects([]);
        getClaimed();
      })
      .catch(function (err) {
        showNotification({
          title: "Failed!",
          message: "Something went wrong.",
          icon: <IconX />,
          color: "red",
          autoClose: 3500,
          radius: "xl",
        });
        console.log(err);
      });
  };
  return (
    <>
      <h2>Claim Subjects</h2>
      <MultiSelect
        // error="Pick atleast one subject"
        value={ClaimSubjects}
        onChange={setClaimSubjects}
        data={props.data}
        label="Select the subjects to claim"
        placeholder="Select the subjects"
        searchable
      />
      <Button
        mt={5}
        onClick={handleSubmit}
        disabled={ClaimSubjects.length == 0}
      >
        Claim
      </Button>

      <h2>Unclaim Subjects</h2>
      <UnclaimSubjects
        data={alreadyClaimed}
        reqRefresh={getClaimed}
      ></UnclaimSubjects>
    </>
  );
}
