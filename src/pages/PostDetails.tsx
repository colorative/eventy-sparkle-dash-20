
import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PostDetailsContent } from "@/components/forum/PostDetailsContent";

const PostDetails = () => {
  const { slug, postId } = useParams<{ slug: string; postId: string }>();
  
  return (
    <PageLayout>
      <PostDetailsContent categorySlug={slug || ""} />
    </PageLayout>
  );
};

export default PostDetails;
