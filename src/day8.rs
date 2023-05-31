use std::cmp;

use crate::read_inputs::get_input_for_day;

const INPUT: &str = include_str!("../inputs/day8.txt");

pub fn run() -> Vec<i32> {
    let input_by_line: Vec<String> = get_input_for_day(8);
    let matrix = parse_matrix(input_by_line);
    let (part_a, part_b) = solutions(&matrix);
    return vec![part_a, part_b];
}

fn parse_matrix(input_by_line: Vec<String>) -> Vec<Vec<String>> {
    let mut matrix: Vec<Vec<String>> = Vec::new();
    for line in input_by_line {
        let mut row = Vec::new();
        for char in line.chars() {
            row.push(char.to_string());
        }
        matrix.push(row);
    }
    return matrix;
}

fn solutions(matrix: &Vec<Vec<String>>) -> (i32, i32) {
    let mut visibles = 0;
    let mut max_scenic_score = 0;
    for (row, line) in INPUT.lines().enumerate() {
        for (col, _) in line.chars().enumerate() {
            if is_visible(matrix, row, col) {
                visibles += 1;
            }
            max_scenic_score = cmp::max(max_scenic_score, compute_scenic_score(matrix, row, col));
        }
    }
    return (visibles, max_scenic_score);
}

/**
* Disgusting solution - ashamed of myself!
*/
fn is_visible(matrix: &Vec<Vec<String>>, row: usize, col: usize) -> bool {
    let num_rows = matrix.len();
    let num_cols = matrix[0].len();
    if row == 0 || col == 0 || col == num_cols - 1 || row == num_rows - 1 {
        return true;
    }
    let target_tree = matrix[row][col].clone();
    // above
    let mut visible_from_top = true;
    for i in 0..row {
        if matrix[i][col] >= target_tree {
            visible_from_top = false;
            break;
        }
    }
    // below
    let mut visible_from_below = true;
    for i in row + 1..num_rows {
        if matrix[i][col] >= target_tree {
            visible_from_below = false;
            break;
        }
    }
    // left
    let mut visible_from_left = true;
    for j in 0..col {
        if matrix[row][j] >= target_tree {
            visible_from_left = false;
            break;
        }
    }
    // right
    let mut visible_from_right = true;
    for j in col + 1..num_cols {
        if matrix[row][j] >= target_tree {
            visible_from_right = false;
            break;
        }
    }
    return visible_from_top || visible_from_below || visible_from_left || visible_from_right;
}

fn compute_scenic_score(matrix: &Vec<Vec<String>>, row: usize, col: usize) -> i32 {
    let num_rows = matrix.len();
    let num_cols = matrix[0].len();
    let target_tree = matrix[row][col].clone();
    // above
    let mut visible_from_top = 0;
    for i in (0..row).rev() {
        visible_from_top += 1;
        if matrix[i][col] >= target_tree {
            break;
        }
    }
    // below
    let mut visible_from_below = 0;
    for i in row + 1..num_rows {
        visible_from_below += 1;
        if matrix[i][col] >= target_tree {
            break;
        }
    }
    // left
    let mut visible_from_left = 0;
    for j in (0..col).rev() {
        visible_from_left += 1;
        if matrix[row][j] >= target_tree {
            break;
        }
    }
    // right
    let mut visible_from_right = 0;
    for j in col + 1..num_cols {
        visible_from_right += 1;
        if matrix[row][j] >= target_tree {
            break;
        }
    }
    return visible_from_top * visible_from_below * visible_from_left * visible_from_right;
}
