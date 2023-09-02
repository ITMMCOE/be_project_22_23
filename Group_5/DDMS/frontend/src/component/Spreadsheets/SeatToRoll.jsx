import React, { useRef, useEffect } from "react";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import { HyperFormula } from "hyperformula";
import { registerAllModules } from "handsontable/registry";
import { Button, Container, Paper, Text, Title } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
export default function SeatToRoll({ data }) {
  registerAllModules();
  HyperFormula.buildEmpty({
    licenseKey: "internal-use-in-handsontable",
  });

  const hotRef = useRef(null);
  let buttonClickCallback;
  useEffect(() => {
    const hot = hotRef.current.hotInstance;
    const exportPlugin = hot.getPlugin("exportFile");
    buttonClickCallback = () => {
      exportPlugin.downloadFile("csv", {
        bom: false,
        columnDelimiter: ",",
        columnHeaders: true,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: "csv",
        filename: `SeatNumberMapping_${new Date().toDateString()}`,
        mimeType: "text/csv",
        rowDelimiter: "\r\n",
        rowHeaders: true,
      });
    };
  });
  return (
    <Container mt={40}>
      <Paper shadow={"md"} p="md">
        <Title order={3}>Generated Mapping:</Title>
        <Text td={"underline"}>
          NOTE: The below table supports full spreadsheets functionality, you
          can customize this Mapping and download according to your needs.
        </Text>
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
          ref={hotRef}
          formulas={{
            engine: HyperFormula,
          }}
          licenseKey="non-commercial-and-evaluation"
          dataSchema={{
            rollno: null,
            examseatno: null,
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
          columnSorting={{ indicator: true }}
          colHeaders={["Student Name", "Roll Number", "Exam Seat Number"]}
          columns={[
            { data: "User.fullname" },
            { data: "rollno" },
            { data: "examseatno" },
          ]}
        />
        <Button
          mt={12}
          fullWidth
          onClick={(...args) => buttonClickCallback(...args)}
          leftIcon={<IconDownload />}
        >
          Download as CSV
        </Button>
      </Paper>
    </Container>
  );
}
