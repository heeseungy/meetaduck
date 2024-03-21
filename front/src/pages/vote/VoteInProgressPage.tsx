// import Button from '@/components/commons/Button';
import Card from '@/components/commons/Card';

// import VoteRadioButton from '@/components/vote/VoteRadioButton';

function VoteInProgressPage() {
  const children = (
    <div>
      <div>내 마니또는 누구?</div>
      {/* <div>{<VoteRadioButton />}</div> */}
      {/* <Button /> */}
    </div>
  );
  return (
    <div>
      <Card {...{ tag: 2, children: children }} />
    </div>
  );
}

export default VoteInProgressPage;
