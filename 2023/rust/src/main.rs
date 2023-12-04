use std::fs;

fn main() {
    let filepath = "../inputs/day1.txt";
    let contents = fs::read_to_string(filepath).expect("should read day1.txt");
    println!("{}", contents);
    println!("I'm back baby")
}
