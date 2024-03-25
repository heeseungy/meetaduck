import { useEffect, useRef } from 'react';

import pairChat from '@/assets/images/pairChat.png';
import { loginState } from '@/recoil/atom';
import { PARTYLIST } from '@/recoil/dummy';
import styles from '@/styles/chatting/ChatListArea.module.css';
import { MessageRes } from '@/types/chatMessage';
import { ListProfile } from '@/types/user.interface';
import { useRecoilValue } from 'recoil';

function ChatListArea({ tag, messages }: { tag: string; messages: MessageRes[] }) {
  //axios 요청으로 사람 목록 불러오기
  const partyList: ListProfile[] = PARTYLIST;
  const login = useRecoilValue(loginState);
  // 일자 추가하려면 sort 후 각 message.map((msg)=>(msg.map))
  // let sortedMessages = [[]];
  // const dates = messages.map((it) => it.createdTime);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    scrollRef.current!.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <div className={styles.chatListArea}>
        <ul className={styles.ChatGap}>
          {messages.map((msg) => {
            const createdTime = new Date(msg.createdTime);
            return (
              <li key={msg.id}>
                {partyList.filter((it) => msg.senderId === it.guestId).length ? (
                  login.guestId === msg.senderId ? (
                    // 내 메세지
                    <div className={`${styles.MyFlexHorizontal} ${styles.FlexHorizontal}`}>
                      <div className={`FontXS FontBasic`}>
                        ({createdTime.getHours()}:{createdTime.getMinutes()})
                      </div>
                      <div className={`FontS FontBasic ${styles.Message} ${styles.MyMessage}`}>{msg.content}</div>
                    </div>
                  ) : (
                    //남의 메세지
                    <div>
                      <div className={`${styles.TheirFlexHorizontal} ${styles.FlexHorizontal}`}>
                        {/* 마니또와 채팅 시에는 img고정 */}
                        {tag === 'manitoChat' ? (
                          <div className={styles.Thumbnail}>
                            <img className={styles.ManitoImage} src={pairChat} alt="" />
                          </div>
                        ) : (
                          <img
                            className={styles.Thumbnail}
                            src={partyList.filter((it) => msg.senderId === it.guestId)[0].thumbnailUrl}
                            alt=""
                          />
                        )}
                        <div className={`${styles.TheirFlexVertical} ${styles.FlexVertical}`}>
                          <div className={`FontXS FontBasic`}>
                            {tag === 'manitoChat'
                              ? '마니또'
                              : partyList.filter((it) => msg.senderId === it.guestId)[0].nickname}
                          </div>
                          <div className={`${styles.FlexHorizontal} ${styles.TheirFlexHorizontal}`}>
                            <div className={`FontS FontBasic ${styles.Message} ${styles.TheirMessage}`}>
                              {msg.content}
                            </div>
                            <div className={`FontXS FontBasic`}>
                              ({createdTime.getHours()}:{createdTime.getMinutes()})
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  // admin 메세지
                  // partyList에 없는 senderId면 admin class
                  <div className={`FontWhite BackgroundGreen ${styles.Admin}`}>
                    <div className={`FontXS`}>
                      {createdTime.getMonth()}월 {createdTime.getDate()}일의 대화 주제
                    </div>
                    <div className={`FontS`}>{msg.content}</div>
                  </div>
                )}
              </li>
            );
          })}
          <div ref={scrollRef}></div>
        </ul>
      </div>
    </>
  );
}

export default ChatListArea;
