import React from "react";
import { matchPath } from "react-router-dom";

import { Box, Text } from "grommet";
import RoutedButton from "./RoutedButton";

const MenuButton = ({ active, Icon, label, path, ...rest }) => {
  const { router } = React.createContext();
  return (
    <RoutedButton
      active={
        active ||
        (router && !!matchPath(router.route.location.pathname, { path }))
      }
      hoverIndicator="dark-4"
      path={path}
      {...rest}
    >
      <Box
        pad={{ vertical: "small" }}
        gap="xsmall"
        align="center"
        justify="center"
      >
        <Icon color="light-5" />
        <Text size="xsmall" color="white">
          {label}
        </Text>
      </Box>
    </RoutedButton>
  );
};

export default MenuButton;
