import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { TextInput, Button, Box, Code, NativeSelect } from "@mantine/core";
import axios from "../../axiosConfig";
import { IconUserPlus, IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";

export default function CreateSubject() {
  const form = useForm({
    initialValues: {
      subCode: "",
      subName: "",
      termWork: "50",
      pract: "0",
      oral: "0",
      sem: "",
    },
    validate: {
      subCode: isNotEmpty("Subject code cannot be empty"),
      subName: isNotEmpty("Subject name cannot be empty"),
      sem: isNotEmpty("Select semester"),
    },
  });

  const handleSubmitSubject = (evevt, values) => {
    console.log(form.values);
    axios
      .post(
        "/subjects/create",
        { subject: form.values },
    
      )
      .then(function (response) {
        if (response.data.status === "success") {
          showNotification({
            title: "Success",
            message: "Subject created successfully",
            icon: <IconCheck />,
            color: "teal",
            autoClose: 2000,
            radius: "xl",
          });
        } 
      })
      .catch(function (error) {
        showNotification({
          title: "Fail",
          message: error.response.data,
          icon: <IconX />,
          color: "red",
          autoClose: 2000,
          radius: "xl",
        });
        //console.log(response);
      });
  };

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmitSubject)}>
        <TextInput
          label="SubjectCode"
          placeholder="Subject Code"
          {...form.getInputProps("subCode")}
          withAsterisk
        />
        <TextInput
          label="Subject Name"
          placeholder="Subject name"
          mt="md"
          withAsterisk
          {...form.getInputProps("subName")}
        />
        <TextInput
          type="number"
          label="Practical"
          placeholder="Practical"
          mt="md"
          withAsterisk
          {...form.getInputProps("pract")}
        />
        <TextInput
          type="number"
          label="Oral"
          placeholder="Oral"
          mt="md"
          withAsterisk
          {...form.getInputProps("oral")}
        />
        {/* <TextInput
          type="number"
          label="Sem"
          placeholder="Sem"
          mt="md"
          {...form.getInputProps('sem')}
        /> */}
        <NativeSelect
          mt="md"
          data={["2", "3", "4", "5", "6", "7", "8"]}
          label="Semester"
          {...form.getInputProps("sem")}
          withAsterisk
        />

        <TextInput
          type="number"
          label="Termwork"
          placeholder="Termwork"
          mt="md"
          withAsterisk
          {...form.getInputProps("termWork")}
        />
        <Button
          onClick={() => {
            console.log();
          }}
          type="submit"
          mt="md"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}
