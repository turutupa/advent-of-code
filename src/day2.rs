// --- Day 2: Rock Paper Scissors ---
// part1: https://adventofcode.com/2022/day/2
// part2: https://adventofcode.com/2022/day/2#part2

use crate::read_inputs::get_input_for_day;
use std::collections::HashMap;

pub fn run() -> Vec<i32> {
    let hands_by_line: Vec<String> = get_input_for_day(2);
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
    let mut score_b: i32 = 0;
    for line in hands_by_line {
        let hands: Vec<String> = line.split(" ").map(str::to_string).collect();
        if hands.len() != 2 {
            continue;
        }
        let opponent_hand: &String = &hands[0];
        let your_hand: &String = &hands[1];
        let opponent_score = opponent_options.get(opponent_hand).unwrap();
        let your_score = your_options.get(your_hand).unwrap();
        score_a = score_a + day2_a(*your_score, *opponent_score);
        score_b = score_b + day2_b(*your_score, *opponent_score);
    }

    return vec![score_a, score_b];
}

fn day2_a(your_score: i32, opponent_score: i32) -> i32 {
    let mut score: i32 = 0;
    /* check for winning hands */
    if (your_score == 1 && opponent_score == 3)
        || (your_score == 2 && opponent_score == 1)
        || (your_score == 3 && opponent_score == 2)
    {
        score = score + 6;
    }
    /* in case of draw */
    if your_score == opponent_score {
        score = score + 3;
    }
    /* add value of your hand */
    return score + your_score;
}

// X: lose; Y: draw; Z: win
// rock - paper - scissors
fn day2_b(your_score: i32, opponent_score: i32) -> i32 {
    let mut score: i32 = 0;
    /* points for draw/win */
    if your_score == 2 {
        score = score + 3;
    }
    if your_score == 3 {
        score = score + 6;
    }
    /* if lose, add points for losing hand */
    // opponent -> your_hand:
    //  1 -> 3;
    //  2 -> 1;
    //  3 -> 2;
    if your_score == 1 {
        let points: Vec<i32> = vec![0, 3, 1, 2];
        score = score + points[opponent_score as usize];
    }
    /* if draw, same points as opponent_hand */
    if your_score == 2 {
        score = score + opponent_score;
    }
    /* if win, add points for winning hand */
    // opponent -> your_hand:
    //  1 -> 2;
    //  2 -> 3;
    //  3 -> 1;
    if your_score == 3 {
        let points: Vec<i32> = vec![0, 2, 3, 1];
        score = score + points[opponent_score as usize];
    }
    return score;
}
