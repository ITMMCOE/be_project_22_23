import { Container } from "@mantine/core";
import React from "react";
import { PDF_MIME_TYPE } from "@mantine/dropzone";
import DropzoneButton from "../Drop zone/Dropzone";
import { IconPdf, IconCheck } from "@tabler/icons-react";
import { openModal } from "@mantine/modals";
import { ImageWithRectangles } from "../ImageCrop/ImageCropper";
export default function ExtractMarks() {
  const handleResponse = (res) => {
    console.log(res);
    openModal({
      title: "Draw Rectangles around data you need to extract",
      children: <ImageWithRectangles image={res.data.objects.imagePath} />,
      fullScreen: true,
      withCloseButton: false,
      closeOnEscape: false,
      closeOnClickOutside: false,
    });
  };
  return (
    <>
      <Container>
        <DropzoneButton
          uploadLink={"/marks/upload"}
          onResponse={handleResponse}
          icon={<IconPdf color="#1a7fdb" size={36} />}
          accept={PDF_MIME_TYPE}
        />
      </Container>
    </>
  );
}
