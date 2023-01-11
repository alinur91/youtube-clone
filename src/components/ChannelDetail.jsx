import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, ChannelCard } from "./";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setchannelDetail] = useState(null);
  const [videos, setvideos] = useState([]);
  console.log(channelDetail);
  console.log(videos);

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => {
      setchannelDetail(data?.items[0]);
    });

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => {
        setvideos(data?.items);
      }
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            zIndex: 10,
            height: "300px",
            background:
              "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
          }}
        />
        <ChannelCard marginTop="-110px" channelDetail={channelDetail} />
        <Box p="2" display="flex"> 
          <Box sx={{ mr: { sm: "100px" } }} />
          <Videos videos={videos} />
        </Box> 
      </Box>
    </Box>
  );
};

export default ChannelDetail;
