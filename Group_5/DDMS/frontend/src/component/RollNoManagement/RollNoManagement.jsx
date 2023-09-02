import { Badge, Grid } from "@mantine/core";
import {
  Container,
  NativeSelect,
  ScrollArea,
  Button,
  Checkbox,
  Table,
  SimpleGrid,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import axios from "../../axiosConfig";
import { useRef, useEffect, useState } from "react";
import React from "react";
import { IconDownload } from "@tabler/icons-react";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import { HyperFormula } from "hyperformula";
import { registerAllModules } from "handsontable/registry";
import { showNotification } from "@mantine/notifications";
import { IconPencil, IconCheck, IconX } from "@tabler/icons-react";
import { openModal } from "@mantine/modals";

export default function RollNoManagement() {
  registerAllModules();
  HyperFormula.buildEmpty({
    licenseKey: "internal-use-in-handsontable",
  });
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ curryear: 2, curr_sem: 3 });
  const hotTableRef = useRef(null);

  useEffect(() => {
    axios
      .get("/student/search", {
        params: filter,
      })
      .then((res) => {
        setData(res.data.objects);
        console.log(res.data.objects);
      });
  }, [filter]);

  const handleDownloadCSV = () => {
    hotTableRef.current.hotInstance
      .getPlugin("exportFile")
      .downloadFile("csv", {
        bom: true,
        columnHeaders: true,
        columnDelimiter: ",",
        rowDelimiter: "\r\n",
        filename: "RollNumbers",
        mimeType: "text/csv",
        data: hotTableRef.current.hotInstance.getData(),
      });
  };

  const handleAfterColumnSort = (currentSortConfig, destinationSortConfigs) => {
    const hot = hotTableRef.current.hotInstance;
    const sortedRows = hot.getData();
    sortedRows.forEach((rowData, rowIndex) => {
      const rollno = rowIndex + 1;
      hot.setDataAtCell(rowIndex, 1, rollno); 
      
    });
  };

  const handleSubmit = async () => {
    let result = [];
    let err = [];
    const hot = hotTableRef.current.hotInstance;
    const sortedRows = hot.getData();

    for (let i = 0; i < sortedRows.length; i++) {
      const ele = sortedRows[i];
      const id = ele[2];
      await axios
        .put(
          `/student/${id}`,
          { student: { rollno: ele[1] } },
        )
        .then((res) => {
          result.push(res.data);
        })
        .catch((error) => {
          err.push({
            error: {
              rollno: ele[1],
              name: ele[0],
              err: error.response.data.err,
            },
          });
          console.log(err);
        });
    }
    showNotification({
      title: "Success",
      message: `Updated ${result.length} out of ${sortedRows.length}`,
      icon: <IconCheck />,
      color: "teal",
      autoClose: 2000,
      radius: "xl",
    });
    if (err.length > 0) {
      const rows = err.map((item) => (
        <tr>
          <td>{item.error.name}</td>
          <td>{item.error.rollno}</td>
          <td>
            <Badge color="red">{item.error.err}</Badge>
          </td>
        </tr>
      ));

      openModal({
        title: "The following errors were encountered",
        children: (
          <Table striped highlightOnHover withColumnBorders>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        ),
        size: "auto",
      });
    }
    console.log(result);
    console.log("result:", result.length);
  };

  return (
    <>
      <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
        <Grid.Col span={6}>
          <NativeSelect
            data={["2", "3", "4"]}
            label="Select year"
            description="This is anonymous"
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
            description="This is anonymous"
            radius="lg"
            withAsterisk
            value={filter.curr_sem}
            onChange={(e) => {
              setFilter({ ...filter, curr_sem: e.target.value });
            }}
          />
        </Grid.Col>
      </Grid>

      <Container mt={40}>
        <Paper shadow={"md"} p="md">
          <ScrollArea>
            <Title order={3}>Manage Roll Numbers</Title>

            <HotTable
              contextMenu
              manualColumnMove
              manualColumnResize
              manualRowMove
              manualRowResize
              allowInsertColumn
              allowInsertRow
              allowRemoveColumn
              allowRemoveRow
              ref={hotTableRef}
              formulas={{
                engine: HyperFormula,
              }}
              licenseKey="non-commercial-and-evaluation"
              dataSchema={{
                userId: null,
                rollno: null,
                User: {
                  fullname: null,
                },
              }}
              data={data}
              height="auto"
              width="100%"
              stretchH="all"
              dropdownMenu
              rowHeaders={true}
              multiplecolumnSorting={true}
              columnSorting={true}
              afterColumnSort={handleAfterColumnSort}
              colHeaders={["Student Name", "Roll number", "UserId"]}
              columns={[
                { data: "User.fullname", readOnly: true },
                { data: "rollno" },
                { data: "userId", readOnly: true },
              ]}
            />

            <SimpleGrid cols={2}>
              <div>
                <Button mt={12} fullWidth onClick={handleSubmit}>
                  Update roll numbers
                </Button>
              </div>
              <div>
                <Button
                  mt={12}
                  fullWidth
                  onClick={handleDownloadCSV}
                  leftIcon={<IconDownload />}
                >
                  Download as CSV
                </Button>
              </div>
            </SimpleGrid>
          </ScrollArea>
        </Paper>
      </Container>
    </>
  );
}
