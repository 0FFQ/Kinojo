import React, { useEffect, useState } from "react";

export default function VideoPlayer() {
  const [videoHtml, setVideoHtml] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const targetUrl = "http://player.videoplayers.club/get_player?w=610&h=370&type=widget&kp_id=&players=videocd,dvd,bazon,aloha,store,kodiak,trailer,torrent&r_id=videoplayers&vni=VIDEOCDN&vti=&vdi=&hni=HDVB&hti=&hd=&bni=BAZON&bti=&bdi=&alni=ALLOHATV&alti=&alti=&unit=USTOREBZ&usti=&usdi=&koni=KODIAK&kodi=&kodi=&tti=&ru=http://localhost:5173/movie/7527789";

    const proxyUrl = `http://localhost:4000/proxy?url=${encodeURIComponent(targetUrl)}`;

    fetch(proxyUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.text();
      })
      .then((html) => {
        setVideoHtml(html);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) return <div>Ошибка загрузки видео: {error}</div>;
  if (!videoHtml) return <div>Загрузка видео...</div>;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: videoHtml }}
      style={{ width: 610, height: 370 }}
    />
  );
}