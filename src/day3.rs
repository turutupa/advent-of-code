use std::collections::{HashMap, HashSet};

use crate::read_inputs::get_input_for_day;

const LOWERCASE_OFFSET: u32 = 96;
const UPPERCASE_OFFSET: u32 = 38;

pub fn run() -> Vec<i32> {
    let rucksacks: Vec<String> = get_input_for_day(3);
    let groups_of_n: i32 = 3;
    return vec![day3_a(&rucksacks), day3_b(&rucksacks, groups_of_n)];
}

fn day3_a(rucksacks_by_line: &Vec<String>) -> i32 {
    let mut score: i32 = 0;
    for n in rucksacks_by_line {
        let mut set: HashSet<char> = HashSet::new();
        for (i, c) in n.chars().enumerate() {
            if i < n.len() / 2 {
                set.insert(c);
            } else {
                let has_c: bool = set.contains(&c);
                if has_c {
                    score = score + get_char_val(c);
                    break;
                }
            }
        }
    }
    return score;
}

fn day3_b(rucksacks_by_line: &Vec<String>, groups_of_n: i32) -> i32 {
    let mut score: i32 = 0;
    let mut map: HashMap<char, i32> = HashMap::new();
    let mut i: i32 = 0;
    for line in rucksacks_by_line {
        if i == groups_of_n - 1 {
            for (_, c) in line.chars().enumerate() {
                if map.contains_key(&c) {
                    score = score + get_char_val(c);
                    map.clear();
                }
            }
            i = 0;
        } else {
            for (_, c) in line.chars().enumerate() {
                map.insert(c, 1);
            }
            i = i + 1;
        }
    }
    return score;
}

fn get_char_val(c: char) -> i32 {
    let val: i32;
    if c.is_lowercase() {
        val = (c as u32 - LOWERCASE_OFFSET) as i32;
    } else {
        val = (c as u32 - UPPERCASE_OFFSET) as i32;
    }
    return val;
}
