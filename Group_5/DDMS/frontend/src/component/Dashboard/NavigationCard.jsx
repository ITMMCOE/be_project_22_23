import {
  createStyles,
  Card,
  Image,
  Text,
  Group,
  SimpleGrid,
  Anchor,
} from "@mantine/core";


const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

export default function NavigationCard(props) {
  const { classes } = useStyles();


  return (
    <Anchor href={props.link} underline={false}>
      <Card withBorder shadow="sm" p="lg" radius="md" className={classes.card} mt={10}>
        <Card.Section>
          <Image
            src={props.image}
            alt={props.title}
            height={300}
            fit="contain"
          />
        </Card.Section>

        <Group position="apart" mt="xl">
          <Text size="sm" weight={700} ta="center" className={classes.title}>
            {props.title}
          </Text>
        </Group>
        <Text mt="sm" mb="md" color="dimmed" size="xs">
          {props.description}
        </Text>
      </Card>
    </Anchor>
  );
}
