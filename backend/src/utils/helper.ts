export const getAssetUrl = (
  filename: string,
  type: "photos" | "thumbnails"
) => {
  const appUrl =
    process.env.APP_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  const url = `${appUrl}/uploads/${type}/${filename}`;
  console.log(`Helper generated URL for ${type}:`, url);
  return url;
};
