import {
  FeedInvitation,
  FeedPhotoUpload,
  FeedSharedPost,
} from "@app/_components/feedItems";

const FeedComponents = {
  PROJECT_INVITATION: FeedInvitation,
  PHOTOS_UPLOADED: FeedPhotoUpload,
  SHARED_POST: FeedSharedPost,
};

const FeedItem = ({ feed }) => {
  const FeedComponent = FeedComponents[feed.type];
  return <FeedComponent feed={feed} />;
};

export { FeedItem };
