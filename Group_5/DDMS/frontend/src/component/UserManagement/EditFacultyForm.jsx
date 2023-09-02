import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { Button, Modal, NativeSelect, TextInput } from "@mantine/core";
import axios from "../../axiosConfig";
import { IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";

export default function EditFacultyForm({ data, onClose, opened, reqRefresh }) {
  const [formValue, setFormValue] = useState({
    fullname: data.fullname,
    email: data.email,
    role: data.role,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `/users/${data.id}`,
        { user: formValue },
       
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
        reqRefresh();
        onClose(undefined);
      })
      .catch((err) => {
        console.log(err.response.data.err);
        showNotification({
          title: "Failed",
          message: err.response.data.err,
          icon: <IconX />,
          color: "red",
          autoClose: false,
          //disallowClose: true,
          radius: "xl",
        });
      });
  };
  return (
    <Modal
      opened={opened}
      onClose={() => onClose(undefined)}
      title={"Edit Faculty Account"}
    >
      <form action="" onSubmit={handleSubmit}>
        <TextInput
          label={"Fullname"}
          required
          onChange={(e) => {
            setFormValue({ ...formValue, fullname: e.target.value });
          }}
          value={formValue.fullname}
        />
        <TextInput
          label={"email"}
          required
          onChange={(e) => {
            setFormValue({ ...formValue, email: e.target.value });
          }}
          value={formValue.email}
        />
        <NativeSelect
          label={"Role"}
          required
          data={["admin", "faculty"]}
          value={formValue.role}
          onChange={(e) => {
            setFormValue({ ...formValue, role: e.target.value });
          }}
        />
        <Button type="submit" radius="md" mt={12}>
          Update
        </Button>
      </form>
    </Modal>
  );
}
