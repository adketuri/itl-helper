import { Heading, Box, Text, useColorModeValue, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { HeaderBoxProps } from "./header-box.props";

export const HeaderBox: FC<HeaderBoxProps> = ({
  title,
  titleRight,
  description,
  children,
}) => {
  return (
    <Box flex={1}>
      <Flex justify="space-between">
        <Heading size="lg" mb={4}>
          {title}
        </Heading>
        {titleRight}
      </Flex>
      {description && <Text>{description}</Text>}
      {children}
    </Box>
  );
};
