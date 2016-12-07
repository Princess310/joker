package org.joker.util;

import org.apache.commons.lang.StringUtils;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.Temporal;
import java.util.Locale;

public class LocalDateUtils {
    public static LocalDateTime newDateTime(){
        return LocalDateTime.now(ZoneId.of("UTC"));
    }

    public static LocalDate newDate(){
        return LocalDate.now(ZoneId.of("UTC"));
    }

    public static LocalTime newTime(){
        return LocalTime.now(ZoneId.of("UTC"));
    }

    public static LocalDateTime change(LocalDateTime now, String fromTimezoneId, String toTimeZoneId){
        if(now == null){
            return null;
        }
        if(StringUtils.isEmpty(fromTimezoneId) || StringUtils.isEmpty(toTimeZoneId)){
            return now;
        }
        try{
            ZonedDateTime zonedDateTime = now.atZone(ZoneId.of(fromTimezoneId));
            ZonedDateTime changedZonedDateTime = zonedDateTime.withZoneSameInstant(ZoneId.of(toTimeZoneId));
            return changedZonedDateTime.toLocalDateTime();
        }catch (Exception e){
            e.printStackTrace();
        }
        return now;
    }

    public static LocalDateTime parseDateTimeString(String dateStr, String pattern){
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern).withLocale(Locale.getDefault());
            return LocalDateTime.parse(dateStr, formatter);
        } catch (Exception e) {
        }
        return null;
    }

    public static LocalDate parseDateString(String dateStr, String pattern){
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern).withLocale(Locale.getDefault());
            return LocalDate.parse(dateStr, formatter);
        } catch (Exception e) {
        }
        return null;
    }

    public static LocalTime parseTimeString(String timeStr, String pattern){
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern).withLocale(Locale.getDefault());
            return LocalTime.parse(timeStr, formatter);
        } catch (Exception e) {
        }
        return null;
    }


    public static String formatDateTimeString(Temporal dateOrTime, String pattern){
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern).withLocale(Locale.getDefault());
            return formatter.format(dateOrTime);
        } catch (Exception e) {
        }
        return null;
    }
}
