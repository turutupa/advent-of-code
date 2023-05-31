use std::collections::HashSet;

use crate::read_inputs::get_input_for_day;

pub fn run() -> Vec<i32> {
    let input_by_line: Vec<String> = get_input_for_day(9);
    return vec![
        part_a(&mut input_by_line.clone()),
        part_b(&mut input_by_line.clone()),
    ];
}

fn part_a(input_by_line: &mut Vec<String>) -> i32 {
    let snake_len = 1;
    return snake(input_by_line, snake_len);
}

fn part_b(input_by_line: &mut Vec<String>) -> i32 {
    let snake_len = 9;
    return snake(input_by_line, snake_len);
}

struct Snake {
    x: u32,
    y: u32,
    visited: HashSet<String>,
    next: Box<Snake>,
}

fn snake(moves: &mut Vec<String>, len: u32) -> i32 {
    let mut visited: HashSet<String> = HashSet::new();
    let mut h_x = 0;
    let mut h_y = 0;
    let mut t_x = 0;
    let mut t_y = 0;
    while !moves.is_empty() {
        let l = moves.remove(0);
        let mut line = l.split_whitespace();
        let direction = line.next().unwrap();
        let amount = line.next().unwrap();

        for _ in 0..amount.parse().unwrap() {
            match direction {
                "U" => h_y += 1,
                "D" => h_y -= 1,
                "L" => h_x -= 1,
                "R" => h_x += 1,
                _ => println!("Something went wrong, I shouldn't be here! :S"),
            }
            let (d_x, d_y): (i32, i32) = (h_x - t_x, h_y - t_y);
            if d_y.abs() > 1 {
                t_y = h_y - d_y.signum();
                t_x = h_x;
            }
            if d_x.abs() > 1 {
                t_x = h_x - d_x.signum();
                t_y = h_y;
            }
            visited.insert(format!("{t_x}-{t_y}"));
        }
    }
    return visited.len() as i32;
}
