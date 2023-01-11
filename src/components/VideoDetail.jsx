import { CheckCircle } from "@mui/icons-material";
import { Typography, Box, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Video, Videos } from "./";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setvideoDetail] = useState(null);
  const [videos, setvideos] = useState(null);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setvideoDetail(data.items[0]);
    });

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => {
        console.log(data);
        setvideos(data.items);
      }
    );
  }, [id]);

  if (!videoDetail?.snippet) return "Loading...";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              className="react-player"
              controls
              url={`https://www.youtube.com/watch?v=${id}`}
            />
            <Typography p={2} variant="h5" fontWeight="bold" color="#fff">
              {title}
            </Typography>
            <Stack
              py={1}
              px={2}
              sx={{ color: "#fff" }}
              direction="row"
              justifyContent="space-between"
            >
              <Link to={`/channel/${channelId}`}>
                <Typography color="#fff" varint={{ sm: "subtitle1", md: "h6" }}>
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack alignItems="center" gap="20px" direction="row">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          alignItems="center"
          justifyContent="center"
          px={2}
          py={{ md: 1, xs: 5 }}
        >
          <Videos direction="column" videos={videos} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
