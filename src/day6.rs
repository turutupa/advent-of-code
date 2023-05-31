use std::collections::HashSet;

use crate::read_inputs::get_input_for_day;

pub fn run() -> Vec<i32> {
    let mut input_by_line: Vec<String> = get_input_for_day(6);
    let message = input_by_line.remove(0);
    let part_a = day_6(&message, 4);
    let part_b = day_6(&message, 14);
    return vec![part_a, part_b];
}

fn day_6(message: &String, num_distinct: usize) -> i32 {
    let mut i = 0;
    loop {
        let marker = i + num_distinct;
        let mut s = HashSet::new();
        let mut last = 0;
        for c in message.get(i..(i + num_distinct)).unwrap().chars() {
            last = marker;
            if s.contains(&c) {
                break;
            } else {
                s.insert(c);
            }
        }
        if s.len() == num_distinct {
            return last as i32;
        } else {
            i = i + 1;
        }
    }
}
