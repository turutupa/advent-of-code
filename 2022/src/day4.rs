use crate::read_inputs::get_input_for_day;

pub fn run() -> Vec<i32> {
    let pairs_by_line: Vec<String> = get_input_for_day(4);
    return vec![day4_a(&pairs_by_line), day4_b(&pairs_by_line)];
}

fn day4_a(pairs_by_line: &Vec<String>) -> i32 {
    let mut overlapping_intervals: i32 = 0;
    for line in pairs_by_line {
        /* for some reaon it was picking an empty line */
        if line == "" {
            break;
        }
        let pairs: [[i32; 2]; 2] = get_pairs(line);
        let x = pairs[0];
        let y = pairs[1];
        if y[0] <= x[0] || y[1] == x[1] {
            overlapping_intervals = overlapping_intervals + 1;
        }
    }
    return overlapping_intervals;
}

fn day4_b(pairs_by_line: &Vec<String>) -> i32 {
    let mut overlapping_intervals: i32 = 0;
    for line in pairs_by_line {
        if line == "" {
            break;
        }
        let pairs: [[i32; 2]; 2] = get_pairs(line);
        let x = pairs[0];
        let y = pairs[1];
        if y[0] <= x[1] || y[1] == x[1] {
            overlapping_intervals = overlapping_intervals + 1;
        }
    }
    return overlapping_intervals;
}

/* Most likely exists a more elegant way of splitting lines */
fn get_pairs<'a>(line: &str) -> [[i32; 2]; 2] {
    let pairs: Vec<&str> = line.split(",").collect();
    let first_pair: Vec<&str> = pairs[0 as usize].split("-").collect();
    let second_pair: Vec<&str> = pairs[1 as usize].split("-").collect();
    let mut sorted_pairs = [
        [first_pair[0], first_pair[1]],
        [second_pair[0], second_pair[1]],
    ]
    .map(|x| x.map(|y| y.parse::<i32>().unwrap()));
    sorted_pairs.sort_by(|a, b| a[1].cmp(&b[1]));
    return sorted_pairs;
}
