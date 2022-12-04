use std::fs;

pub fn get_input_by_line(file_path: &str) -> Vec<String> {
    let input: String = fs::read_to_string(file_path).expect("Should read day1_input.txt");
    return input.split("\n").map(str::to_string).collect();
}
