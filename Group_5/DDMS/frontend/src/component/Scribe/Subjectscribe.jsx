import React from 'react';
import { Accordion } from '@mantine/core';

function Subjectscribe() {
  return (
    <Accordion defaultValue="customization">
    <Accordion.Item value="Create Subjects">
      <Accordion.Control>Create Subjects</Accordion.Control>
      <Accordion.Panel><iframe src="https://scribehow.com/embed/Workflow__Y3M157ztSbWJIhIhyzRPwA"
       width="100%" height="640" allowfullscreen frameborder="0"></iframe></Accordion.Panel>
    </Accordion.Item>

    <Accordion.Item value="Edit-subject">
      <Accordion.Control>Edit Subjects</Accordion.Control>
      <Accordion.Panel><iframe src="https://scribehow.com/embed/How_to_Update_and_Delete_a_Subject__xRT0cRVTRkiG7mJXs4bxxw" 
      width="100%" height="640" allowfullscreen frameborder="0"></iframe></Accordion.Panel>
    </Accordion.Item>

    <Accordion.Item value="Claim-Unclaim Subjects">
      <Accordion.Control>Clain-Unclaim Subjects</Accordion.Control>
      <Accordion.Panel><iframe src="https://scribehow.com/embed/How_to_Claim_and_Unclaim_a_Subject__mpfkYUsVRVWBT82qKGnNUw" 
      width="100%" height="640" allowfullscreen frameborder="0"></iframe></Accordion.Panel>
    </Accordion.Item>

    
  </Accordion>
  )
}

export default Subjectscribe