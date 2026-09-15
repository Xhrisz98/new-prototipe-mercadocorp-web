import fs from "fs";
import path from "path";

(async () => {
  const ogImgUrl = "http://ogenerate.panda.network/generate?imageUrl=https%3A%2F%2Fcdn.collectui.com%2Famplify_video%2F2095644810463895552%2Fvid%2Favc1%2F3482x2000%2F4VZzbjM9_yCStEv9-optimized-thumbnail.mp4&avatarUrl=https%3A%2F%2Fcdn.collectui.com%2Fcurators%2Fkaolti-avatar&name=Zsolt+Kacso&username=kaolti";
  const videoThumbUrl = "https://cdn.collectui.com/amplify_video/2095644810463895552/vid/avc1/3482x2000/4VZzbjM9_yCStEv9-optimized-thumbnail.mp4";

  console.log("Downloading OG image...");
  try {
    const res = await fetch(ogImgUrl);
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync("C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\5dd46513-c585-4df5-896e-734bb76565d2\\collectui-og-image.jpg", buf);
      console.log("Saved collectui-og-image.jpg!");
    } else {
      console.log("OG img res:", res.status);
    }
  } catch (e) {
    console.error(e);
  }

  // Also let's check the video / image asset
  try {
    const res2 = await fetch(videoThumbUrl);
    console.log("Video URL res:", res2.status, res2.headers.get("content-type"));
    if (res2.ok) {
      const buf2 = Buffer.from(await res2.arrayBuffer());
      fs.writeFileSync("C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\5dd46513-c585-4df5-896e-734bb76565d2\\collectui-design-asset.mp4", buf2);
      console.log("Saved collectui-design-asset.mp4!");
    }
  } catch (e) {
    console.error(e);
  }
})();
