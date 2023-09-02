import React from "react";
import { Container, SimpleGrid, createStyles  } from "@mantine/core";
import NavigationCard from "./NavigationCard";
import user from "../../assets/Images/new-entries-animate.svg";
import attendance from "../../assets/Images/confirmed-attendance-animate.svg";
import subjects from "../../assets/Images/thesis-animate.svg";
import marks from "../../assets/Images/grades-animate.svg"
import miscellaneous from "../../assets/Images/wireframing-animate.svg"
import StudentDash from "../Attendance/StudentDash";
import secureLocalStorage from "react-secure-storage";
import backgroundImage from "../../assets/Images/ttten1.svg";

const useStyles = createStyles((theme) => ({
  background: {
    position: 'relative',
    backgroundImage:
        `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

}))
export default function Dashboard() {
  const { role } = JSON.parse(secureLocalStorage.getItem("user"));
  const { classes } = useStyles();
  return (
    <>
      {/* <Header/> */}
      <div  className={classes.background}>
        <Container >
          <SimpleGrid
            cols={2}
            breakpoints={[{ maxWidth: 980, cols: 1, spacing: "md" }]}
          >
            {role === "admin" && (
              <NavigationCard
                title={"User"}
                link={"/user-mgmt/1"}
                image={user}
              />
            )}
            {role !== "student" && (
              <NavigationCard
                title={"Attendance"}
                link={"/attend-mgmt/1"}
                image={attendance}
              />
            )}
            {role !== "student" && (
              <NavigationCard
                title={"Subjects"}
                link={"/subject-mgmt/1"}
                image={subjects}
              />
            )}
            {role !== "student" && (
              <NavigationCard
                title={"Marks"}
                link={"/marks-mgmt/1"}
                image={marks}
              />
            )}
            {role !== "student" && (
              <NavigationCard
                title={"Miscellaneous"}
                link={"/miscellaneous-mgmt/1"}
                image={miscellaneous}
              />
            )}
          </SimpleGrid>
          {role === "student" && <StudentDash/>}
        </Container>
      </div>
    </>
  );
}
