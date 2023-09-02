import React from 'react';
import { Accordion } from '@mantine/core';

function Attendancescribe() {
  return (
    <Accordion defaultValue="customization">
    <Accordion.Item value="Attendance Dashboard">
      <Accordion.Control>Attendance  Dashboard</Accordion.Control>
      <Accordion.Panel><iframe src="https://scribehow.com/embed/Workflow__Y3M157ztSbWJIhIhyzRPwA"
       width="100%" height="640" allowfullscreen frameborder="0"></iframe></Accordion.Panel>
    </Accordion.Item>

    <Accordion.Item value="Mark Attendance">
      <Accordion.Control>Mark Attendance</Accordion.Control>
      <Accordion.Panel><iframe src="https://scribehow.com/embed/Mark_attendance_for_event__NdepXuboR_O-XBqEdJawaA" width="100%" height="640" allowfullscreen frameborder="0"></iframe></Accordion.Panel>
    </Accordion.Item>

    <Accordion.Item value="Edit Attendance">
      <Accordion.Control>Edit Attendance</Accordion.Control>
      <Accordion.Panel><iframe src="https://scribehow.com/embed/How_to_Claim_and_Unclaim_a_Subject__mpfkYUsVRVWBT82qKGnNUw" 
      width="100%" height="640" allowfullscreen frameborder="0"></iframe></Accordion.Panel>
    </Accordion.Item>


    <Accordion.Item value="Report Generation">
      <Accordion.Control>Report Generation</Accordion.Control>
      <Accordion.Panel><iframe src="https://scribehow.com/embed/How_to_Claim_and_Unclaim_a_Subject__mpfkYUsVRVWBT82qKGnNUw" 
      width="100%" height="640" allowfullscreen frameborder="0"></iframe></Accordion.Panel>
    </Accordion.Item>
    
  </Accordion>
  )
}

export default Attendancescribe