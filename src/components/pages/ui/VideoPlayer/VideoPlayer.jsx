import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styles from "./VideoPlayer.module.css";

export default function VideoPlayer() {
  const [scriptHtml, setScriptHtml] = useState("");

  useEffect(() => {
    const encodedUrl = encodeURIComponent(window.location.href);
    const url =
      "//js.espanplay.site/get_player?w=610&h=370&type=widget&players=apicollaps,videocdn,hdvb,bazon,alloha,ustore,kodik,trailer&r_id=videoplayers&ani=COLLAPS&ati=&adi=&vni=VIDEOCDN&vti=&vdi=&hni=HDVB&hti=&hdi=&bni=BAZON&bti=&bdi=&alni=ALLOHATV&alti=&aldi=&usni=USTOREBZ&usti=&usdi=&koni=KODIK&koti=&kodi=&tti=&ru=" +
      encodedUrl;
  
    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        const match = data.match(/<iframe.*?<\/iframe>/gm);
        if (match && match[0]) {
          setScriptHtml(match[0]);
        }
      })
      .catch((err) => {
        console.error("Ошибка загрузки плеера:", err);
      });
  }, []);

  return (
    <div
      className={classNames("uitools", styles.video)}
      id="videoplayers"
      dangerouslySetInnerHTML={{ __html: scriptHtml }}
    ></div>
  );
}
