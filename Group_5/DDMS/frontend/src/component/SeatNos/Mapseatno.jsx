import { IconPdf, IconFileText, IconCheck, IconX } from "@tabler/icons-react";
import { openModal } from "@mantine/modals";
import React, { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { Badge, Center, Table, Title } from "@mantine/core";
import DropzoneButton from "../Drop zone/Dropzone";
import { PDF_MIME_TYPE } from "@mantine/dropzone";
import SeatToRoll from "../Spreadsheets/SeatToRoll";

export default function Mapseatno() {
  const [spreadSheetData, setSpreadSheetData] = useState([]);
  const handleResponse = (res) => {
    console.log(res);
    const { data } = res;
    setSpreadSheetData(data.objects);
    if (data.status === "success") {
      showNotification({
        title: "Success!",
        message: "seat numbers mapped to students",
        color: "teal",
        icon: <IconCheck />,
        autoClose: 2000,
        radius: "xl",
      });
    } else {
      const rows = data.err.map((user) => (
        <tr key={Math.random()}>
          <td>{user.examseatno}</td>
          <td>{user.fullname}</td>
          <td>{user.prn}</td>
          <td>
            <Badge color="red">{user.errmsg}</Badge>
          </td>
        </tr>
      ));
      showNotification({
        title: "Failed!",
        message: "we encountered few errors",
        color: "red",
        icon: <IconX />,
        disallowClose: false,
      });
      openModal({
        title: "The following errors were encountered",
        children: (
          <Table striped highlightOnHover withColumnBorders>
            <thead>
              <tr>
                <th>Seat Number</th>
                <th>Full Name</th>
                <th>PRN</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        ),
        size: "auto",
      });
    }
  };
  return (
    <>
      {spreadSheetData.length === 0 ? (
        <>
          <Title>
            <Center>Upload The Name List file</Center>{" "}
            <Center>then download the Generated Mappings</Center>
          </Title>
          <DropzoneButton
            uploadLink={"/student/mapSeatnos"}
            onResponse={handleResponse}
            icon={<IconPdf color="#1a7fdb" size={36} />}
            accept={PDF_MIME_TYPE}
          />
        </>
      ) : (
        <SeatToRoll data={spreadSheetData} />
      )}
    </>
  );
}
