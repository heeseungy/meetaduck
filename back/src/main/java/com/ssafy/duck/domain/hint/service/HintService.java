package com.ssafy.duck.domain.hint.service;

import com.ssafy.duck.domain.hint.dto.response.HintRes;
import com.ssafy.duck.domain.hint.dto.response.HintStatusRes;
import com.ssafy.duck.domain.hint.entity.Hint;
import com.ssafy.duck.domain.hint.exception.HintErrorCode;
import com.ssafy.duck.domain.hint.exception.HintException;
import com.ssafy.duck.domain.hint.repository.HintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class HintService {
    @Autowired
    private final HintRepository hintRepository;

    // 힌트 질문 가져오기
    public List<HintRes> getHintQuestion(List<Long> indexList){
        List<Hint> hintList = hintRepository.findAllById(indexList);
//        if(hintList.isEmpty()){
//            throw new HintException("no hint", HintErrorCode.HINT_QUESTION_NOT_FOUND);
//        }

        List<HintRes> hintResList = hintList.stream().map(HintRes::toDto)
                .collect(Collectors.toList());

        return hintResList;

    }

    //종료시간과 현재시간 비교해서 날짜개수만큼 랜덤으로 힌트 가져오기
    public List<Long> fetch(Instant endTime){
        Instant current = Instant.now();
        System.out.println("current "+ LocalDateTime.ofInstant(current, ZoneId.systemDefault()));
        System.out.println("endTime " +LocalDateTime.ofInstant(endTime, ZoneId.systemDefault()));

        //day 수 구하기
        int curLocalTime = LocalDateTime.ofInstant(current, ZoneId.systemDefault()).getDayOfMonth();
        int endLocalTime = LocalDateTime.ofInstant(endTime, ZoneId.systemDefault()).getDayOfMonth();
        int period = endLocalTime - curLocalTime;
        System.out.println(curLocalTime +"/" + endLocalTime + " period " + period);

        //힌트 개수 가져오기
        int totalCount = (int) hintRepository.count();
        System.out.println("total count " + totalCount);

        List<Long> totalIndex = new ArrayList<>();
        for (long i = 0; i < totalCount; i++) {
             totalIndex.add(i);
        }

        List<Long> selectedList = new ArrayList<>();
        for (long i = 0; i < period; i++) {
             int random = ThreadLocalRandom.current().nextInt(totalIndex.size());
             selectedList.add(totalIndex.remove(random));
        }

        System.out.println("---selected");
        for (Long l : selectedList) {
            System.out.print(l + " ");
        }

        return selectedList;
    }



    /*
    * 1. guest id 조회해서 answer있는지 확인
    * 없으면 answer쓸 수 있도록 리스트 가져오기
    *
    * 2. guest 에서 마니또 아이디 찾기
    * 3. party의 종료시간과 현재 시간 비교하기
    * -> 종료시간 이전이라면 마니또가 힌트를 수행하지 않은 개수 찾기
         마니또가 힌트를 수행하지 않은만큼 hint_status에서 가져오기
    *-> 종료시간 이후라면 마니또희 힌트 답변 모두 가져오기
    *
    * */

    /*       Group newGroup = Group.builder()
                .name(request.getGroup().getName())
                .isDeleted(false)
                .teacher(Teacher.builder()
                        .id(teacherId)
                        .build()
                )
                .build();
   public static List<StudentDto> toDtoList(List<Student> studentList) {
        return studentList.stream().map(StudentMapper::toDto)
                .collect(Collectors.toList());
    }

        @Override
    public List<ArtworkDto> getAll() {
        List<Artwork> artworkList = artworkRepository.findAll();
        return ArtworkMapper.toDtoList(artworkList);
    }

    * */

}
