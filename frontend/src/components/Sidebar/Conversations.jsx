import React, { useEffect } from "react";
import Conversation from "./Conversation";
import { toast } from "react-toastify";
import { useGetSidebarConversationQuery } from "../../redux/action/apiSlice";
import { getRandomEmoji } from "../../utils/emoji";

const Conversations = () => {
  const {
    data: conversations,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSidebarConversationQuery();

  let content;
  if (isLoading) {
    content = <span className="loading loading-spinner mx-auto" />;
  } else if (isSuccess) {
    content = conversations.map((conversation, idx) => {
      return (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversation.length - 1}
        />
      );
    });
  } else if (isError) {
    content = toast.error(error?.data?.message || error.error);
  }

  return (
    <>
      <div className="py-2 flex flex-col overflow-auto">
        {/* {isLoading ? (
          <span className="loading loading-spinner mx-auto "></span>
        ) : (
          conversations.map((conversation, idx) => {
            return (
              <Conversation
                key={conversation._id}
                conversation={conversation}
                emoji={getRandomEmoji()}
                lastIdx={idx === conversations.length - 1}
              />
            );
          })
        )} */}
        {content}
      </div>
    </>
  );
};

export default Conversations;
