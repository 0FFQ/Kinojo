import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styles from "./VideoPlayer.module.css";

export default function VideoPlayer() {
  const [scriptHtml, setScriptHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const dataUrl = encodeURIComponent(window.location.href);
    const url =
      "//js.espanplay.site/get_player?w=610&h=370&type=widget&kp_id=&players=videocdn,hdvb,bazon,alloha,ustore,kodik,trailer&r_id=videoplayers&vni=VIDEOCDN&vti=&vdi=&hni=HDVB&hti=&hdi=&bni=BAZON&bti=&bdi=&alni=ALLOHATV&alti=&aldi=&usni=USTOREBZ&usti=&usdi=&koni=KODIK&koti=&kodi=&tti=&ru=" +
      dataUrl;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка сети: ${res.status}`);
        return res.text();
      })
      .then((data) => {
        if (!isMounted) return;
        const matches = data.match(/<iframe.*?<\/iframe>/gm);
        if (matches && matches.length > 1) {
          setScriptHtml(matches[1]);
        } else if (matches && matches.length === 1) {
          setScriptHtml(matches[0]);
        } else {
          setError("Плеер недоступен для этого фильма");
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Ошибка загрузки плеера");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);


  if (error)
    return (
      <div
        className={classNames("uitools", styles.error)}
        id="videoplayers"
        style={{
          height: "370px",
          width: "610px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",  // строго по центру
          backgroundColor: "#fff",
          color: "black",
          fontWeight: 600,
          fontSize: 16,
          textAlign: "center",
          userSelect: "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ transform: "translateY(-15%)" }}>{error}</div>
      </div>
    );

  return (
    <div
      className={classNames("uitools", styles.video)}
      id="videoplayers"
      dangerouslySetInnerHTML={{ __html: scriptHtml }}
      style={{ width: "610px", height: "370px" }}
    />
  );
}
