import { readFileFromDay } from "../utils/index";

const areAllMarkerUniq = (marker: string) => {
  const isUniq = new Set(marker);
  return isUniq.size === marker.length;
};

const part1 = (data: string, packetSize: number) => {
  let startOfPacketMarker = "";

  for (let index = 0; index < data.length - packetSize - 1; index += 1) {
    const packet = data.substring(index, index + packetSize);
    if (!areAllMarkerUniq(packet)) {
      startOfPacketMarker += data[index];
    } else {
      break;
    }
  }

  return `First marker after ${packetSize} distinct characters: ${
    startOfPacketMarker.length + packetSize
  }`;
};

export default (day: string) => {
  try {
    const data: string = readFileFromDay(day);

    return {
      part1: part1(data, 4),
      part2: part1(data, 14),
    };
  } catch (error) {
    console.error(`Error on day ${day}: `, error);
  }
};
