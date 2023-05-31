use std::cmp;

use crate::read_inputs::get_input_for_day;

/* is it better than _get_input_for_day_? */
/* const INPUT: &str = include_str!("../inputs/day5.txt"); */

/**
 * Horrible solution overall - this was I think the first time I played
 * with traits, impl and so on. Tried to do something fancy and turnt out
 * to be the opposite
 */

pub fn run() -> Vec<i32> {
    let input_by_line: Vec<String> = get_input_for_day(5);
    let solutions = day5(input_by_line);
    println!("day5: (a) {}\n      (b) {}", solutions.0, solutions.1);
    println!();
    return vec![];
}

fn day5(input_by_line: Vec<String>) -> (String, String) {
    let mut containers_a = Containers::default();
    let mut containers_b = Containers::default();
    parse_containers(&mut containers_a, &input_by_line);
    parse_containers(&mut containers_b, &input_by_line);
    let mut i: usize = 0;
    for line in &input_by_line {
        i = i + 1;
        // +2 because we adding X axis and empty line
        // after containers so to start reading the moves
        if i <= containers_a.num_rows + 2 {
            continue;
        }
        let [quantity, from, to] = containers_a.parse_line(line);
        containers_a
            ._move(&quantity)
            ._from(&from)
            ._to(&to)
            .run(crate_mover_9000);

        containers_b
            ._move(&quantity)
            ._from(&from)
            ._to(&to)
            .run(crate_mover_9001);
    }
    return (parse_solution(containers_a), parse_solution(containers_b));
}

fn parse_solution(containers: Containers) -> String {
    let mut sol: String = "".to_string();
    for mut row in containers.matrix {
        sol = sol + &row.pop().unwrap().to_string();
    }
    return sol;
}

fn parse_containers(containers: &mut impl IContainers, input_by_line: &Vec<String>) {
    containers.get_matrix_dimensions(&input_by_line);
    for _ in 0..containers.num_cols() {
        containers.add_row();
    }
    let mut row_num: usize = 0;
    for line in input_by_line {
        if row_num == containers.num_rows() {
            break;
        }
        let mut col_num: usize = 0;
        for (i, c) in line.chars().enumerate() {
            if i > 0 && (i == 1 || (i - 1) % 4 == 0) {
                if c == ' ' {
                } else {
                    containers.unshift_at(col_num, c.to_string());
                }
                col_num = col_num + 1;
            }
        }
        row_num = row_num + 1;
    }
}

type Crane = fn(&mut Vec<Vec<String>>, &usize, &usize, &usize);

trait IContainers {
    fn get_matrix_dimensions(&mut self, input_by_line: &Vec<String>);
    fn add_row(&mut self);
    fn num_rows(&self) -> usize;
    fn num_cols(&self) -> usize;
    fn unshift_at(&mut self, col_num: usize, el: String);
    fn _move(&mut self, _move: &usize) -> &mut Containers;
    fn _from(&mut self, _move: &usize) -> &mut Containers;
    fn _to(&mut self, _move: &usize) -> &mut Containers;
    fn run(&mut self, crane: Crane);
}

#[derive(Default)]
struct Containers {
    num_rows: usize,
    num_cols: usize,
    matrix: Vec<Vec<String>>,
    _move: usize,
    _from: usize,
    _to: usize,
}

impl Containers {
    fn parse_line(&mut self, line: &String) -> [usize; 3] {
        let mut result = [0, 0, 0];
        let mut index = 0;
        for word in line.split_whitespace() {
            if index % 2 != 0 {
                result[index / 2] = word.parse::<usize>().unwrap();
            }
            index += 1;
        }
        return result;
    }
}

impl IContainers for Containers {
    fn get_matrix_dimensions(&mut self, input_by_line: &Vec<String>) {
        for line in input_by_line {
            if !line.contains("[") {
                break;
            }
            self.num_rows += 1;
            let mut running_counter: usize = 0;
            for (_, c) in line.chars().enumerate() {
                if c == '[' {
                    running_counter = running_counter + 1;
                    self.num_cols = cmp::max(self.num_cols, running_counter);
                }
            }
        }
    }

    fn num_cols(&self) -> usize {
        self.num_cols
    }

    fn num_rows(&self) -> usize {
        self.num_rows
    }

    fn add_row(&mut self) {
        self.matrix.push(vec![]);
    }

    fn unshift_at(&mut self, col_num: usize, el: String) {
        self.matrix[col_num].insert(0, el);
    }

    fn _move(&mut self, _move: &usize) -> &mut Containers {
        self._move = *_move;
        self
    }

    fn _from(&mut self, _from: &usize) -> &mut Containers {
        self._from = *_from;
        self
    }

    fn _to(&mut self, _to: &usize) -> &mut Containers {
        self._to = *_to;
        self
    }

    fn run(&mut self, crane: fn(&mut Vec<Vec<String>>, &usize, &usize, &usize)) {
        return crane(&mut self.matrix, &self._move, &self._from, &self._to);
    }
}

fn crate_mover_9000(matrix: &mut Vec<Vec<String>>, _move: &usize, _from: &usize, _to: &usize) {
    for _ in 0..*_move {
        let container: String = matrix[_from - 1].pop().unwrap();
        matrix[_to - 1].push(container);
    }
}

fn crate_mover_9001(_matrix: &mut Vec<Vec<String>>, _move: &usize, _from: &usize, _to: &usize) {
    let mut containers: Vec<String> = vec![];
    for _ in 0..*_move {
        containers.insert(0, _matrix[_from - 1].pop().unwrap_or("_ERROR_".to_string()));
    }
    for c in containers {
        _matrix[_to - 1].push(c);
    }
}
