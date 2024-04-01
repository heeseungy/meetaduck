package com.ssafy.duck.common;

import java.time.*;
import java.time.temporal.ChronoUnit;

public class TimeUtil {

    // 1. 기간 계산 함수
    // String 예제형식 "2024-03-14T12:00:00Z"
    public static int calcDate(String start, String end) {

        // String -> Instant
        Instant startTime = Instant.parse(start);
        Instant endTime = Instant.parse(end);

        System.out.println("start " +start + "  end "  + end );
        System.out.println("startTime " +startTime + "  endTime "  + endTime );

        // ZoneOffset UTC를 사용하여 LocalDate로 변환
        LocalDate startDate = startTime.atZone(ZoneOffset.UTC).toLocalDate();
        LocalDate endDate = endTime.atZone(ZoneOffset.UTC).toLocalDate();

        System.out.println("startDate " +startDate + "  endDate "  + endDate );
        return (int) ChronoUnit.DAYS.between(startDate, endDate);

    }

    public static int compareDate(String start, String end, int type) {
        System.out.println("compare Date");
        // String -> Instant
        Instant startTime = Instant.parse(start);
        Instant endTime = Instant.parse(end);

        System.out.println("start " +start + "  end "  + end );
        System.out.println("startTime " +startTime + "  endTime "  + endTime );

        // ZoneOffset UTC를 사용하여 LocalDate로 변환
        LocalDateTime  startDate = LocalDateTime.ofInstant(startTime, ZoneOffset.UTC);
        LocalDateTime  endDate = LocalDateTime.ofInstant(endTime, ZoneOffset.UTC);

        System.out.println("startDate " +startDate + "  endDate "  + endDate );
        if(type == 1)
            return (int) ChronoUnit.SECONDS.between(startDate, endDate);
        else if (type == 2)
            return (int) ChronoUnit.MINUTES.between(startDate, endDate);
        else
            return (int) ChronoUnit.DAYS.between(startDate, endDate);

    }


    // 3. String -> Instant
    public static Instant stringToInstant(String inputTime) {
        return Instant.parse(inputTime);
    }

    // 4-1. 현재시간(KST) 리턴 (Instant Type)
    public static Instant convertToKST(Instant inputTime) {
        return inputTime.plus(Duration.ofHours(9));
    }

    // 4-2. 무조건 해당 날짜 00시 리턴 (Instant Type)
    public static Instant convertTo00(Instant inputTime) {
        ZonedDateTime zonedDateTime = inputTime.atZone(ZoneId.systemDefault());
        ZonedDateTime startOfDay = zonedDateTime.toLocalDate().atStartOfDay(ZoneId.systemDefault());
        return startOfDay.toInstant();
    }

    // 4-3. 현재시간(UTC) 리턴 (Instant Type)
    public static Instant convertToUTC(String inputTime) {
        return Instant.parse(inputTime).minus(Duration.ofHours(9));
    }

}
