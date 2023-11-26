use crate::read_inputs::get_input_for_day;

pub fn run() -> Vec<i32> {
    let input_by_line: Vec<String> = get_input_for_day(10);
    return vec![
        part_a(&mut input_by_line.clone()),
        part_b(&mut input_by_line.clone()),
    ];
}

// Find the signal strength during the
// 20th, 60th, 100th, 140th, 180th, and 220th cycles.
// What is the sum of these six signal strengths?
fn part_a(signals: &mut Vec<String>) -> i32 {
    let mut cycle_counter = 0;
    let mut cycle_check = 20;
    let mut total = 0;
    let mut register_x = 1;
    for line in signals {
        cycle_counter += 1;
        if line.contains("addx") {
            cycle_counter += 1;
            if cycle_counter >= cycle_check {
                total += register_x * cycle_check;
                cycle_check += 40;
            }
            register_x += line
                .split_whitespace()
                .last()
                .unwrap()
                .parse::<i32>()
                .unwrap();
        }
    }
    return total;
}

fn part_b(signals: &mut Vec<String>) -> i32 {
    return 0;
}
