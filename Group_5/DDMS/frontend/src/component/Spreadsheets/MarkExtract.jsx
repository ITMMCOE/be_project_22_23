import React, { useRef, useEffect, useState } from "react";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import { HyperFormula } from "hyperformula";
import { registerAllModules } from "handsontable/registry";
import { Button, Container, Paper, Text, Title } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

export default function MarkExtractExcel({ data }) {
  console.log(data);
  registerAllModules();
  const [subHeaders, setSubHeaders] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [tabData, setTabData] = useState([]);
  useEffect(() => {
    let temp = [];
    let tempData = [];
    data.forEach((student) => {
      let row = [];
      row.push(student.examseatno);
      row.push(student.User.fullname);
      student.Marks.forEach((sub) => {
        temp.push({
          label: `${sub.Subject.subName} (${sub.SubjectSubCode})`,
          colspan: 13,
        });
        Object.keys(sub).forEach((key) => {
          if (
            key != "Subject" &&
            key != "SubjectSubCode" &&
            key != "createdAt" &&
            key != "updatedAt" &&
            key != "StudentUserId"
          ) {
            row.push(sub[key]);
          }
        });
      });
      tempData.push(row);
    });
    setHeaders(temp);

    setTabData(tempData);
  }, []);

  useEffect(() => {
    let tmpSubs = [];
    for (let i = 0; i < headers.length; i++) {
      tmpSubs.push(
        "Insem",
        "Endsem",
        "TOTAL",
        "TW",
        "PR",
        "OR",
        "Tot%",
        "Crd",
        "Grd",
        "GP",
        "CP",
        "P&R",
        "ORD"
      );
    }
    setSubHeaders(tmpSubs);
  }, [headers]);

  // console.log(JSON.stringify(tabData));
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
        nestedHeaders: true,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: "csv",
        filename: `Mark_report_${new Date().toDateString()}`,
        mimeType: "text/csv",
        rowDelimiter: "\r\n",
        rowHeaders: true,
      });
    };
  });
  return (
    <Container mt={40} fluid>
      <Paper shadow={"md"} p="md">
        <Title order={3}>Extracted Data:</Title>
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
          className="htCenter"
          columnSorting={true}
          ref={hotRef}
          formulas={{
            engine: HyperFormula,
          }}
          data={tabData}
          colHeaders={true}
          rowHeaders={true}
          fixedColumnsStart={2}
          height="auto"
          colWidths={[100, 100, 50]}
          rowHeights={50}
          nestedHeaders={[
            [{ label: " ", colspan: 2 }, ...headers],
            ["Seat No.", "Name Of Student", ...subHeaders],
          ]}
          licenseKey="non-commercial-and-evaluation"
        ></HotTable>
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
