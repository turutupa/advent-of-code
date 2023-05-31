use std::collections::{HashSet, VecDeque};

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
    x: i32,
    y: i32,
    visited: HashSet<String>,
}

impl Default for Snake {
    fn default() -> Self {
        return Snake {
            x: 0,
            y: 0,
            visited: HashSet::new(),
        };
    }
}

fn snake(moves: &mut Vec<String>, len: u32) -> i32 {
    let mut snake = VecDeque::new();
    for _ in 0..len {
        snake.push_back(Snake::default());
    }
    while !moves.is_empty() {
        let l = moves.remove(0);
        let mut line = l.split_whitespace();
        let direction = line.next().unwrap();
        let amount = line.next().unwrap();

        for _ in 0..amount.parse().unwrap() {
            let mut head = snake.front().as_deref().unwrap();
            match direction {
                "U" => head.y += 1,
                "D" => head.y -= 1,
                "R" => head.x += 1,
                "L" => head.x -= 1,
                _ => println!("Something went wrong, I shouldn't be here! :S"),
            }
            let mut prev = head;
            for i in 1..snake.len() {
                let mut next = snake[i];
                let (d_x, d_y): (i32, i32) = (prev.x - next.x, prev.y - next.y);
                if d_y.abs() > 1 {
                    next.y = prev.y - d_y.signum();
                    next.x = prev.x;
                }
                if d_x.abs() > 1 {
                    next.x = prev.x - d_x.signum();
                    next.y = prev.y;
                }
                next.visited.insert(format!("{}-{}", next.x, next.y));
                prev = &next;
            }
        }
    }
    return snake[snake.len() - 1].visited.len() as i32;
}
