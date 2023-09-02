import {
  LoadingOverlay,
  Center,
  Container,
  Title,
  Progress,
  Modal,
  Card,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import React, { useEffect } from "react";
import { PDF_MIME_TYPE } from "@mantine/dropzone";
import DropzoneButton from "../Drop zone/Dropzone";
import { IconPdf, IconCheck } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import { ImageWithRectangles } from "../ImageCrop/ImageCropper";
import MarkExtractExcel from "../Spreadsheets/MarkExtract";

export default function ExtractMarks() {
  const [active, setActive] = useState(0);
  const [imageSelectorProps, setImageSelectorProps] = useState(undefined);
  const [extractedData, setExtractedData] = useState(undefined);
  const [visible, toggle] = useState(false);
  const [secs, setSecs] = useState(0);
  const [mins, setMins] = useState(0);
  const [progress, setProgress] = useState(1);
  useEffect(() => {
    if (visible) {
      const interval = setInterval(() => {
        setProgress((prev) => prev + 10);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
      setSecs(0);
      setMins(0);
    }
  }, [visible]);
  useEffect(() => {
    if (progress >= 100) {
      const interval = setInterval(() => {
        setSecs((prev) => prev + 1);
        if (secs >= 59) {
          setSecs(0);
          setMins((prev) => prev + 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [progress]);
  const nextStep = () => {
    setActive((current) => (current < 3 ? current + 1 : current));
    toggle(false);
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const handleResponse = (res) => {
    console.log(res);
    setImageSelectorProps({ ...res.data.objects, overlay: toggle });
    nextStep();
  };
  const getExtractedData = (response) => {
    console.log(response);
    setExtractedData(response);
    nextStep();
  };
  return (
    <>
      {/* <LoadingOverlay visible={visible} overlayBlur={2} size={"xl"} /> */}
      <Modal
        opened={visible}
        title="Working on it!"
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <Card shadow={"xl"}>
          {progress <= 25 && <Text>Uploading ...</Text>}
          {25 <= progress && progress <= 50 && (
            <Text>Identifying Table Co-odinates ...</Text>
          )}
          {50 <= progress && progress <= 75 && (
            <Text>Queing Each Page for processing ...</Text>
          )}
          {75 <= progress && progress <= 100 && (
            <Text>Allocating Resources ...</Text>
          )}
          {progress >= 100 && (
            <Text>
              Extracting data(1-10 mins)/({mins <= 10 ? `0${mins}` : mins}:
              {secs <= 10 ? `0${secs}` : secs})...
            </Text>
          )}
          <Progress
            radius="xl"
            size="xl"
            color={
              progress <= 25
                ? "red"
                : progress <= 50
                ? "yellow"
                : progress <= 75
                ? "grape"
                : progress <= 100
                ? "teal"
                : "blue"
            }
            value={progress}
            striped={progress >= 100}
            animate={progress >= 100}
          />
        </Card>
      </Modal>
      <Center>
        <Title m={12} size={"h3"}>
          Follow these 3 simple steps
        </Title>
      </Center>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="Upload PDF" description="Upload pdf to convert">
          <Container>
            <Center>
              <Title m={12}>Upload the PDF To Extract Data</Title>
            </Center>
            <DropzoneButton
              overlay={toggle}
              uploadLink={"/marks/upload"}
              onResponse={handleResponse}
              icon={<IconPdf color="#1a7fdb" size={36} />}
              accept={PDF_MIME_TYPE}
            />
          </Container>
        </Stepper.Step>
        <Stepper.Step
          label="Mark sections"
          description="Mark sections to extract data"
        >
          <Center>
            <Title m={12}>Draw rectangle(s) over image to extract data</Title>
          </Center>
          {imageSelectorProps && (
            <ImageWithRectangles
              image={imageSelectorProps}
              response={getExtractedData}
              updateProgress={setProgress}
            />
          )}
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Extracted Data">
          Full extracted table
          <MarkExtractExcel data={extractedData} />
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}
