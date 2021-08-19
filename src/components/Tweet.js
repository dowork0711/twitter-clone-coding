import React, { useState } from "react";
import { dbService, storageService } from "fbInstance";

const Tweet = ({ tweetObj, isOwner }) => {
  const [edit, setEdit] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const okay = window.confirm("이 트윗을 삭제하시겠습니까? (삭제를 완료하면 복구할 수 없습니다.)");
    if (okay) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.attachmentUrl).delete();
    }
  };
  const toggleEdit = () => setEdit((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEdit(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewTweet(value);
  };
  return (
    <div>
      {edit ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="트윗을 편집하세요"
              value={newTweet}
              onChange={onChange}
              required
              autoFocus
            />
            <input type="submit" value="업데이트 하기" />
          </form>
          <button onClick={toggleEdit}>닫기</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} width="50px" heigh="50px" alt="upload" />}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>이 트윗 삭제</button>
              <button onClick={toggleEdit}>이 트윗 편집</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
