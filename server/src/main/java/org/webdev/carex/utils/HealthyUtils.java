package org.webdev.carex.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class HealthyUtils {
    public static Double calculateBmi(Double weight, Double height) {
        return weight / Math.pow(height / 100, 2);
    }

    public static Double calculateBmr(Double weight, Double height, Integer age,
                                      boolean male) {
        if (male) {
            return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
    }
}
