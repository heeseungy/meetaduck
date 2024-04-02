import Card from '@/components/commons/Card';

type MissionTodayProps = {
  nickname: string;
};

function MissionTodayPage(props: MissionTodayProps) {
  const children = (
    <div>
      <div className={`FontXL`}>{props.nickname}님의 오늘의 미션은...</div>
    </div>
  );
  return <Card {...{ tag: 2, children: children }}></Card>;
}

export default MissionTodayPage;
