import { Export } from "iconsax-react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");
export const WIDTH = width
export const END_WIDTH = -width * 0.87
export const INITIAL_WIDTH = 0
export const START_WIDTH = width * 0.87

export const LIMIT_MESSAGES = 20