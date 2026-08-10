import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#020617",
          color: "white",
        }}
      >
        <div style={{ fontSize: 80 }}>⚽</div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 20 }}>Sports App</div>
        <div style={{ fontSize: 28, color: "#94a3b8", marginTop: 16 }}>
          Track your favorite teams across 5 sports
        </div>
      </div>
    ),
    { ...size }
  );
}