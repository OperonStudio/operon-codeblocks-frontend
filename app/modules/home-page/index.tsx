import { APP_NAME, PRODUCT_NAME } from "#/common/constants";
import { Rocket } from "@operon/icons";
import { Box, Button, Card } from "@operon/ui";
import { Link } from "@tanstack/react-router";
import * as classes from "./style";

export const HomePage = () => {
  return (
    <Box
      display="flex"
      direction="column"
      align="center"
      justify="center"
      {...classes.homeBoxStyle}
    >
      <Card {...classes.cardStyle}>
        <Box display="flex" direction="column" align="center" gap="16px">
          <Rocket size={48} {...classes.rocketStyle} />
          <h1 {...classes.headingStyle}>Hello {APP_NAME}</h1>
          <p {...classes.subHeadingStyle}>
            Welcome to the new {PRODUCT_NAME} frontend, powered by TanStack
            Start, MorphCSS, and Operon UI!
          </p>
          <Button {...classes.buttonStyle} variant="link">
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
