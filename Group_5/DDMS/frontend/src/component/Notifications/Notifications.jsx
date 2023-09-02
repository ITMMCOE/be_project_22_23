import { Grid } from "@mantine/core";
import {
  Container,
  NativeSelect,
  ScrollArea,
  Button,
  Checkbox,
  Table,
  SimpleGrid,
  Paper,
} from "@mantine/core";
import axios from "../../axiosConfig";
import { useEffect, useState } from "react";
import React from "react";
import { MantineProvider } from "@mantine/core";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

export default function Notifications() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ curryear: 2, curr_sem: 3 });
  const [selection, setSelection] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    //request
    axios.get("/student/search", { params: filter }).then((res) => {
      setData(res.data.objects);
      console.log(res.data.objects);
      console.log(data);
    });

    //setData
    //usestate second arg [data]
  }, [filter]);

  const result = [];
  const error = [];

  const handleSubmit = () => {
    // axios.post('localhost:5000/notify/sms')
    selection.forEach((selected) => {
      //   console.log({
      //     "phoneNumber":selected.parents_mob_no,
      //     "message": message.blocks[0].text
      // })
      axios
        .post("/notify/sms", {
          phoneNumber: "+91" + selected.Parent.phone,
          message: message.blocks[0].text,
        })
        .then((res) => result.push)
        .catch((res) => error.push);
    });
  };

  const toggleRow = (obj) => {
    setSelection((current) =>
      current.includes(obj)
        ? current.filter((item) => item !== obj)
        : [...current, obj]
    );
  };
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((obj) => obj)
    );
  return (
    <>
      <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
        <Grid.Col span={6}>
          <NativeSelect
            data={["2", "3", "4"]}
            label="Select year"
            radius="lg"
            withAsterisk
            value={filter.curryear}
            onChange={(e) => {
              setFilter({ ...filter, curryear: e.target.value });
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NativeSelect
            data={["3", "4", "5", "6", "7", "8"]}
            label="Select semester"
            radius="lg"
            withAsterisk
            value={filter.curr_sem}
            onChange={(e) => {
              setFilter({ ...filter, curr_sem: e.target.value });
            }}
          />
        </Grid.Col>
      </Grid>
      <Paper shadow="md" p="md" mt={3}>
        <ScrollArea h={500}>
          <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <Checkbox
                    onChange={toggleAll}
                    checked={selection.length === data.length}
                    indeterminate={
                      selection.length > 0 && selection.length !== data.length
                    }
                    transitionDuration={0}
                  />
                </th>
                <th>Name</th>
                <th>Roll No.</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => (
                <tr key={obj.User.id}>
                  <td>
                    <Checkbox
                      checked={selection.includes(obj)}
                      onChange={(e) => toggleRow(obj)}
                      transitionDuration={0}
                    />
                  </td>
                  <td>{obj.User.fullname}</td>
                  <td>{obj.rollno}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      </Paper>
      <div>
        <h3>Enter the message</h3>
        <RichTextEditor update={setMessage} />
      </div>

      <Button
        size="lg"
        mt={40}
        onClick={() => {
          handleSubmit();
        }}
      >
        Send Message
      </Button>
    </>
  );
}
