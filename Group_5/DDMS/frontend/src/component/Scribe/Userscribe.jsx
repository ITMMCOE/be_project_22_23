import React from 'react';
import { Accordion } from '@mantine/core';

function UserScribe() {
  return (
    <Accordion defaultValue="customization">
      <Accordion.Item value="Create Users">
        <Accordion.Control>Create Users</Accordion.Control>
        <Accordion.Panel><iframe src="https://scribehow.com/embed/How_to_Add_a_User_with_Name_and_Email__oo9I87-cQhep0jDSkyFrcA?as=scrollable" 
        width="100%" height="640" allowfullscreen frameborder="0"></iframe></Accordion.Panel>


        <Accordion.Panel><iframe src="https://scribehow.com/embed/Uploading_a_File_on_User_Management_1__bNz3eU8lRUu32poLsXe12w?as=scrollable" 
        width="100%" height="640" allowfullscreen frameborder="0"></iframe></Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="manage-faculty">
        <Accordion.Control>Manage Faculty</Accordion.Control>
        <Accordion.Panel><iframe src="https://scribehow.com/embed/Updating_a_Users_Email_Address__HxzMrCxDTu29VOqfBlVNBw" 
        width="100%" height="640" allowfullscreen frameborder="0"></iframe></Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="manage-students">
        <Accordion.Control>Manage Students</Accordion.Control>
        <Accordion.Panel><iframe src="https://scribehow.com/embed/How_to_Edit_and_Delete_User_Account_Information__saclmdD_TP6xQ77wZkzDGg" 
        width="100%" height="640" allowfullscreen frameborder="0"></iframe></Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="restore accounts">
        <Accordion.Control>Restore Deleted Accounts</Accordion.Control>
        <Accordion.Panel></Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}

export default UserScribe