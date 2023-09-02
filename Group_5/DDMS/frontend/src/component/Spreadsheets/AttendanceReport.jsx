import React, { useRef, useEffect } from "react";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import { HyperFormula } from "hyperformula";
import { registerAllModules } from "handsontable/registry";
import { Button, Container, Paper, Text, Title } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
export default function AttendanceReport({ data, filters }) {
  registerAllModules();
  HyperFormula.buildEmpty({
    licenseKey: "internal-use-in-handsontable",
  });
  data = data.map((element) => ({
    ...element,
    presentee: Number(element.presentee),
  }));
  data = [...data, [null], [null]];
  const hotRef = useRef(null);
  let buttonClickCallback;
  useEffect(() => {
    const hot = hotRef.current.hotInstance;
    hot.setDataAtCell([
      [data.length - 2, 0, "Total"],
      [data.length - 2, 1, "Count"],
      [data.length - 2, 2, "Percentage"],
      [data.length - 1, 0, `=COUNT(C1:C${data.length - 2})`],
      [data.length - 1, 1, `=SUM(C1:C${data.length - 2})`],
      [data.length - 1, 2, `=AVERAGE(C1:C${data.length - 2})*100`],
    ]);
    const exportPlugin = hot.getPlugin("exportFile");
    buttonClickCallback = () => {
      exportPlugin.downloadFile("csv", {
        bom: false,
        columnDelimiter: ",",
        columnHeaders: true,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: "csv",
        filename: `Attendance_report_${new Date(filters.date).toDateString()}`,
        mimeType: "text/csv",
        rowDelimiter: "\r\n",
        rowHeaders: true,
      });
    };
  });
  return (
    <Container mt={40}>
      <Paper shadow={"md"} p="md">
        <Title order={3}>Generated report:</Title>
        <Text td={"underline"}>
          NOTE: The below table supports full spreadsheets functionality, you
          can customize this report and download according to your needs.
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
            presentee: null,
            createdAt: null,
            StudentUserId: null,
            SubjectSubCode: null,
            Student: {
              rollno: null,
              User: {
                fullname: null,
              },
            },
          }}
          data={data}
          height="auto"
          width="100%"
          stretchH="all"
          dropdownMenu
          rowHeaders={true}
          columnSorting={{ indicator: true }}
          colHeaders={[
            "Student Name",
            "Roll number",
            `${new Date(filters.date).toDateString()}`,
          ]}
          columns={[
            { data: "Student.User.fullname" },
            { data: "Student.rollno" },
            { data: "presentee" },
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
