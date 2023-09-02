import { Button, Grid, Text, Stack } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import { IconAlertTriangleFilled, IconUpload } from "@tabler/icons-react";
import axios from "../../axiosConfig";
import { useState } from "react";

export default function DropzoneButton({
  accept,
  uploadLink,
  onResponse,
  onError,
  icon,
  overlay,
}) {
  const [uploaded, setUploaded] = useState(undefined);
  const [dropzoneText, setdropzoneText] = useState(
    "Click here to upload files or drag and drop"
  );
  const upload = () => {
    if (uploaded == undefined) {
      showNotification({
        title: "Select a file",
        message: "You must select a file in order to proceed",
        color: "yellow",
        icon: <IconAlertTriangleFilled />,
        autoClose: 2000,
        radius: "xl",
      });
    }
    if (uploaded && overlay) {
      overlay(true);
    }
    /* Sending the file to the server. */
    const formData = new FormData();
    formData.append("file", uploaded[0]);
    axios
      .post(uploadLink, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => onResponse(res))
      .catch((err) => {
        onError(err);
      });
  };
  return (
    <>
      {/* A dropzone component that allows you to upload files.  */}
      <Dropzone
        onDrop={(files) => {
          setdropzoneText(files[0].name);
          setUploaded(files);
        }}
        onReject={(files) => console.log("rejected files", files)}
        accept={accept}
        sx={(theme) => ({
          minHeight: 120,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: 0,
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],

          "&[data-accept]": {
            color: theme.white,
            backgroundColor: theme.colors.blue[6],
          },

          "&[data-reject]": {
            color: theme.white,
            backgroundColor: theme.colors.red[6],
          },
        })}
      >
        <Stack align="center" spacing="sm">
          {icon}

          {dropzoneText}
          <Text size="sm" color="dimmed" inline mt={7}>
            Make sure the file is less than 5MB
          </Text>
        </Stack>
      </Dropzone>
      <Stack spacing="sm">
        <Button onClick={upload} mt={20} leftIcon={<IconUpload />}>
          Upload
        </Button>
      </Stack>
    </>
  );
}
