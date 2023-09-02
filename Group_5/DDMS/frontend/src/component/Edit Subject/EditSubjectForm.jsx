import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { Button, Modal, NativeSelect, TextInput } from "@mantine/core";
import axios from "../../axiosConfig";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function EditSubjectForm({ data, onClose, opened, reqRefresh }) {
  console.log(data);
  const [formValue, setFormValue] = useState({
    subCode: data.subCode,
    subName: data.subName,
    pract: data.pract,
    oral: data.oral,
    // termWork: data.termWork,
    sem: data.sem,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `/subjects/${data.subCode}`,
        { subject: formValue },
        
      )
      .then((res) => {
        showNotification({
          title: "Success",
          message: "Information Updated Successfully",
          icon: <IconCheck />,
          color: "teal",
          autoClose: 2000,
          radius: "xl",
        });
        reqRefresh("subjects");
        onClose(undefined);
      })
      .catch((res) => {
        showNotification({
          title: "Failed",
          message: res.data.err,
          icon: <IconX />,
          color: "red",
          autoClose: 3500,
          radius: "xl",
        });
      });
  };
  return (
    <Modal
      opened={opened}
      onClose={() => onClose(undefined)}
      title={"Edit Subject"}
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          label="SubjectCode"
          placeholder="Subject Code"
          type={Number}
          required
          value={formValue.subCode}
          onChange={(e) => {
            setFormValue({ ...formValue, subCode: e.target.value });
          }}
          withAsterisk
        />
        <TextInput
          label="Subject Name"
          placeholder="Subject name"
          mt="md"
          withAsterisk
          required
          value={formValue.subName}
          onChange={(e) => {
            setFormValue({ ...formValue, subName: e.target.value });
          }}
        />
        <TextInput
          type="number"
          label="Practical"
          placeholder="Practical"
          mt="md"
          withAsterisk
          required
          min={0}
          max={100}
          value={formValue.pract}
          onChange={(e) => {
            setFormValue({ ...formValue, pract: e.target.value });
          }}
        />
        <TextInput
          type="number"
          label="Oral"
          placeholder="Oral"
          mt="md"
          withAsterisk
          required
          min={0}
          max={50}
          value={formValue.oral}
          onChange={(e) => {
            setFormValue({ ...formValue, oral: e.target.value });
          }}
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
          value={formValue.sem}
          required
          onChange={(e) => {
            setFormValue({ ...formValue, sem: e.target.value });
          }}
          withAsterisk
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
    </Modal>
  );
}
