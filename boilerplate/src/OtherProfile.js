import React from "react";
import { useParams } from "react-router-dom";

export const OtherProfile = () => {
  const { profileId } = useParams();
  return (
    <div>
      <h2>{profileId} Profile</h2>
    </div>
  );
};
