import { useEffect, useRef, useState } from 'react';

import pairChat from '@/assets/images/pairChat.png';
import { loginState, partyState } from '@/recoil/atom';
import { partyListAll } from '@/services/voteService';
import styles from '@/styles/chatting/ChatListArea.module.css';
import { MessageRes } from '@/types/chatMessage';
import { ListProfile } from '@/types/user.interface';
import { useRecoilValue } from 'recoil';

function ChatListArea({ tag, messages }: { tag: string; messages: MessageRes[] }) {
  //axios 요청으로 사람 목록 불러오기
  const [partyList, setPartyList] = useState<ListProfile[]>([]);
  const party = useRecoilValue(partyState);
  const login = useRecoilValue(loginState);
  // 일자 추가하려면 sort 후 각 message.map((msg)=>(msg.map))
  // let sortedMessages = [[]];
  // const dates = messages.map((it) => it.createdTime);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    partyListAll(party.partyId).then((data: ListProfile[]) => {
      console.log(data);
      console.log(messages);
      setPartyList(data);
      console.log(tag);
    });
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
                        (
                        {`${createdTime.getUTCHours() < 12 ? '오전' : '오후'} 
                        ${
                          createdTime.getUTCHours() < 12
                            ? `0${createdTime.getUTCHours()}`
                            : createdTime.getUTCHours() < 22
                              ? `0${createdTime.getUTCHours() - 12}`
                              : createdTime.getUTCHours() - 12
                        }
                        :${createdTime.getUTCMinutes()<10? `0${createdTime.getUTCMinutes()}`:createdTime.getUTCMinutes()}`}
                        )
                      </div>
                      <div className={`FontS FontBasic ${styles.Message} ${styles.MyMessage}`}>
                        {msg.messageType ? <img src={msg.content} alt="" /> : msg.content}
                      </div>
                    </div>
                  ) : (
                    //남의 메세지
                    <div>
                      <div className={`${styles.TheirFlexHorizontal} ${styles.FlexHorizontal}`}>
                        {/* 마니또와 채팅 시에는 img고정 */}
                        {tag === 'manitoChat' ? (
                          <div className={`${styles.Thumbnail}`}>
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
                              {msg.messageType ? <img src={msg.content} alt="" /> : msg.content}
                            </div>
                            
                            <div className={`FontXS FontBasic ${styles.timeDown}`}>
                              (
                              {`${createdTime.getUTCHours() < 12 ? '오전' : '오후'} 
                        ${
                          createdTime.getUTCHours() < 12
                            ? `0${createdTime.getUTCHours()}`
                            : createdTime.getUTCHours() < 22
                              ? `0${createdTime.getUTCHours() - 12}`
                              : createdTime.getUTCHours() - 12
                        }
                        :${createdTime.getUTCMinutes()<10? `0${createdTime.getUTCMinutes()}`:createdTime.getUTCMinutes()}`}
                              )
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
                      {createdTime.getMonth()+1}월 {createdTime.getDate()}일의 대화 주제
                    </div>
                    <div className={`${styles.FlexHorizontal} ${styles.Gap}`}>
                      <div className={`FontS ${styles.Admin1}`}>{msg.content.split(' VS ')[0]}</div>
                      <div className="FontSBold">VS</div>
                      <div className={`FontS ${styles.Admin1}`}>{msg.content.split(' VS ')[1]}</div>
                    </div>
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
