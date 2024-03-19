import Slides from '@/components/commons/Slides';
import A2401 from '@/pages/result/A2401';
import A2402 from '@/pages/result/A2402';
import { ResultListItemProps, ResultListProps } from '@/types/result';
import { PairRank } from '@/types/user.interface';

function ResultPage() {
  /////////Recoil에 저장해야함/////////////////////////////////////////
  const me: PairRank = {
    guestId: 1,
    nickname: '가철수',
    profileUrl: 'https://image.yes24.com/goods/104804448/XL',
    thumbnailUrl: 'https://image.yes24.com/goods/104804448/XL',
    manitiId: 2,
    votedId: 2,
    manitoFavorability: 70,
  };

  ////////////////////////////////////////////////////////////////////
  /////axios 요청//////////////////////////////////////////////////////
  const pairList: ResultListProps = {
    pairList: [
      {
        manito: {
          guestId: 3,
          nickname: '다철수',
          profileUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqq_j6k9-8tSG6E7nBFktW0Yu7hTawMozcA&usqp=CAU',
          thumbnailUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqq_j6k9-8tSG6E7nBFktW0Yu7hTawMozcA&usqp=CAU',
          manitiId: 5,
          votedId: 5,
          manitoFavorability: 80,
        },
        maniti: {
          guestId: 5,
          nickname: '바철수',
          profileUrl:
            'https://i.namu.wiki/i/geGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp',
          thumbnailUrl:
            'https://i.namu.wiki/i/geGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp',
          manitiId: 1,
          votedId: 2,
          manitoFavorability: 60,
        },
      },
      {
        manito: {
          guestId: 5,
          nickname: '바철수',
          profileUrl:
            'https://i.namu.wiki/i/geGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp',
          thumbnailUrl:
            'https://i.namu.wiki/i/geGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp',
          manitiId: 1,
          votedId: 2,
          manitoFavorability: 60,
        },
        maniti: {
          guestId: 1,
          nickname: '가철수',
          profileUrl: 'https://image.yes24.com/goods/104804448/XL',
          thumbnailUrl: 'https://image.yes24.com/goods/104804448/XL',
          manitiId: 2,
          votedId: 2,
          manitoFavorability: 70,
        },
      },
      {
        manito: {
          guestId: 1,
          nickname: '가철수',
          profileUrl: 'https://image.yes24.com/goods/104804448/XL',
          thumbnailUrl: 'https://image.yes24.com/goods/104804448/XL',
          manitiId: 2,
          votedId: 2,
          manitoFavorability: 70,
        },
        maniti: {
          guestId: 2,
          nickname: '나철수',
          profileUrl: 'https://www.ccbk.co.kr/m/static/images/brand/img_cokeIcon6.png',
          thumbnailUrl: 'https://www.ccbk.co.kr/m/static/images/brand/img_cokeIcon6.png',
          manitiId: 3,
          votedId: 1,
          manitoFavorability: 100,
        },
      },
      {
        manito: {
          guestId: 2,
          nickname: '나철수',
          profileUrl: 'https://www.ccbk.co.kr/m/static/images/brand/img_cokeIcon6.png',
          thumbnailUrl: 'https://www.ccbk.co.kr/m/static/images/brand/img_cokeIcon6.png',
          manitiId: 3,
          votedId: 1,
          manitoFavorability: 100,
        },
        maniti: {
          guestId: 3,
          nickname: '다철수',
          profileUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqq_j6k9-8tSG6E7nBFktW0Yu7hTawMozcA&usqp=CAU',
          thumbnailUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqq_j6k9-8tSG6E7nBFktW0Yu7hTawMozcA&usqp=CAU',
          manitiId: 5,
          votedId: 5,
          manitoFavorability: 80,
        },
      },
    ].sort(
      (a: ResultListItemProps, b: ResultListItemProps) => b.maniti.manitoFavorability - a.maniti.manitoFavorability,
    ),
  };
  ////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////

  enum Role {
    Manito = 2, //내가 마니또일때
    Maniti = 1, //내가 마니띠일때
  }
  ///////////////////////////////////////////////////////
  const children1 = <A2401 {...{ me: me, pairList: pairList }} />;
  const children2 = <A2402 {...{ tag: Role.Maniti, me: me, pairList: pairList }} />;
  const children3 = <A2402 {...{ tag: Role.Manito, me: me, pairList: pairList }} />;

  return <Slides {...{ children: [children1, children2, children3], className: 'Slides' }}></Slides>;
}

export default ResultPage;
