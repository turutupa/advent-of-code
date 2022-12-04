// --- Day 1: Calorie Counting ---
// part1: https://adventofcode.com/2022/day/1
// part1: https://adventofcode.com/2022/day/1#part2

use crate::helpers::get_input_by_line;
use std::cmp;
use std::collections::HashSet;
use std::string::String;

pub fn run() -> Vec<String> {
    let file_path = "./inputs/day1_input.txt";
    let calories_by_line = get_input_by_line(file_path);
    let num_top_candy_accrued_elves = 3;
    return vec![
        day1_a(&calories_by_line),
        day1_b(&calories_by_line, num_top_candy_accrued_elves),
    ];
}

fn day1_a(calories_by_line: &Vec<String>) -> String {
    let mut max = 0;
    let mut counter = 0;
    for calories in calories_by_line {
        if calories == "" {
            max = cmp::max(max, counter);
            counter = 0;
        } else {
            let num: i32 = calories.trim().parse().unwrap();
            counter = counter + num;
        }
    }

    return max.to_string();
}

fn day1_b(calories_by_line: &Vec<String>, n: i32) -> String {
    let mut calories_sums: HashSet<i32> = HashSet::new();
    let mut counter = 0;
    for calories in calories_by_line {
        if calories == "" {
            calories_sums.insert(counter);
            counter = 0;
        } else {
            let num: i32 = calories.trim().parse().unwrap();
            counter = counter + num;
        }
    }
    let mut sum_top_n = 0;
    let mut max: i32 = 0;
    for _ in 0..n {
        for x in calories_sums.iter() {
            if x > &max {
                max = *x;
            }
        }
        sum_top_n = sum_top_n + max;
        calories_sums.remove(&max);
        max = 0;
    }
    return sum_top_n.to_string();
}
