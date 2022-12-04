// --- Day 2: Rock Paper Scissors ---
// part1: https://adventofcode.com/2022/day/2
// part2: https://adventofcode.com/2022/day/2#part2

use crate::helpers::get_input_by_line;
use std::collections::HashMap;

pub fn run() -> Vec<String> {
    let hands_by_line: Vec<String> = get_input_by_line("./inputs/day2_input.txt");
    let opponent_options: HashMap<String, i32> = HashMap::from([
        ("A".to_string(), 1),
        ("B".to_string(), 2),
        ("C".to_string(), 3),
    ]);
    let your_options: HashMap<String, i32> = HashMap::from([
        ("X".to_string(), 1),
        ("Y".to_string(), 2),
        ("Z".to_string(), 3),
    ]);

    let mut score_a: i32 = 0;
    // let mut score_b: i32 = 0;
    for line in hands_by_line {
        let hands: Vec<String> = line.split(" ").map(str::to_string).collect();
        if hands.len() != 2 {
            continue;
        }
        let opponent_hand: &String = &hands[0];
        let your_hand: &String = &hands[1];
        let opponent_score = opponent_options.get(opponent_hand).unwrap();
        let your_score = your_options.get(your_hand).unwrap();
        score_a = score_a + day2_a(&opponent_hand, &your_hand, *your_score, *opponent_score);
    }

    return vec![score_a.to_string()];
}

fn day2_a(opponent_hand: &String, your_hand: &String, your_score: i32, opponent_score: i32) -> i32 {
    let mut score: i32 = 0;
    if (your_hand == "X" && opponent_hand == "C")
        || (your_hand == "Y" && opponent_hand == "A")
        || (your_hand == "Z" && opponent_hand == "B")
    {
        score = score + 6;
    }
    if your_score == opponent_score {
        score = score + 3;
    }
    return score + your_score;
}

fn day2_b(
    hand_by_lines: &Vec<String>,
    opponent_options: &HashMap<String, i32>,
    your_options: &HashMap<String, i32>,
) -> String {
    return "b".to_string();
}
