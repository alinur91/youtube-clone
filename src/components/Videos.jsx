import { Stack, Box } from "@mui/material";
import { ChannelCard, VideoCard } from "./";

const Videos = ({ videos, direction }) => {
  if (!videos?.length) return "...Loading";
  return (
    <Stack
      gap={2}
      justifyContent="start"
      flexWrap="wrap"
      direction={direction || "row"}
    >
      {videos.map((item, idx) => {
        return (
          <Box key={idx}>
            {item.id.videoId && <VideoCard video={item} />}
            {item.id.channelId && <ChannelCard channelDetail={item} />}
          </Box>
        );
      })}
    </Stack>
  );
};

export default Videos;
