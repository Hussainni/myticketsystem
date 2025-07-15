import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
export const authUser = {
  email: "fuck",
  name: "hussain",
  profile_pic: getAssetPath(`${ASSET_AVATARS}/avatar10.jpg`, `60x60`),
  handle: "fuck",
  job_title: "Creative Head",
};
