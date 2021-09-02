import React from "react";
import { matchPath } from "react-router-dom";

import { Box, Text } from "grommet";
import RoutedButton from "./RoutedButton";

import  MenuButton  from "./MenuButton";

const Sidebar = ({ appIcon, appName, items = [], userSession, ...rest }) => {
    const { router } =  React.createContext();

    return (
      <Box
        style={{top: 0, bottom: 0,position: 'fixed'}}
        width="sidebar"
        background="dark-2"
        elevation="medium"
        {...rest}
      >
        <RoutedButton
          path="/"
          hoverIndicator="dark-4"
          active={
            router &&
            !!matchPath(router.route.location.pathname, {
              path: "/",
              exact: true
            })
          }
        >
          <Box
            flex={false}
            align="center"
            gap="xsmall"
            pad={{ vertical: "small" }}
          >
            {appIcon}
            <Text size="xsmall">{appName}</Text>
          </Box>
        </RoutedButton>
        <Box flex overflow="auto">
          {items.map(({ active, Icon, label, path }) => (
            <MenuButton
              active={active}
              Icon={Icon}
              path={path}
              label={label}
              key={label}
            />
          ))}
        </Box>
      </Box>
    );
};
export default Sidebar;
