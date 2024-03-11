package com.ssafy.duck.domain.hint.service;

import com.ssafy.duck.domain.hint.dto.response.HintRes;
import com.ssafy.duck.domain.hint.dto.response.HintStatusRes;
import com.ssafy.duck.domain.hint.entity.Hint;
import com.ssafy.duck.domain.hint.repository.HintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class HintService {
    @Autowired
    private final HintRepository hintRepository;

    public List<HintRes> getHintQuestion(List<Long> indexList){
        Optional<Hint> hintList = hintRepository.findById(Long.valueOf(1));
        System.out.println("aaaabbbb");
        List<HintRes> hintResList = hintList.stream().map(HintRes::toDto)
                .collect(Collectors.toList());

        return hintResList;

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
