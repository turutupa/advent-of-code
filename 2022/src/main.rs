use std::collections::HashMap;
use std::env;
use std::process;

mod day1;
mod day10;
mod day2;
mod day3;
mod day4;
mod day5;
mod day6;
mod day7;
mod day8;
mod day9;
mod read_inputs;

/* extend solutions here */
fn get_days<'a>() -> HashMap<&'a str, Runnable> {
    return HashMap::from([
        ("day1", day1::run as Runnable),
        ("day2", day2::run as Runnable),
        ("day3", day3::run as Runnable),
        ("day4", day4::run as Runnable),
        ("day5", day5::run as Runnable),
        ("day6", day6::run as Runnable),
        ("day7", day7::run as Runnable),
        ("day8", day8::run as Runnable),
        ("day9", day9::run as Runnable),
        ("day10", day10::run as Runnable),
    ]);
}

type Runnable = fn() -> Vec<i32>;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() == 1 {
        let map = get_days();
        let mut keys: Vec<&str> = map.keys().cloned().collect();
        keys.sort();
        for label in keys {
            let runnable = get_days()[label];
            let solutions = runnable();
            let part_a: i32;
            let part_b: i32;
            if solutions.len() == 1 {
                part_a = solutions[0];
                println!("{}: (a) {}", label, part_a);
            } else if solutions.len() == 2 {
                part_a = solutions[0];
                part_b = solutions[1];
                println!("{}: (a) {}\n      (b) {}\n", label, part_a, part_b);
            }
        }
        return;
    }
    if args.len() != 2 {
        println!("Please specify the day. Example: `cargo run -- day1`");
        process::exit(1);
    }

    /* Run specified day */
    let days: HashMap<&str, Runnable> = get_days();
    let solution: Vec<i32> = run_mod(days, &args[1]);

    /* print solution for each part */
    let mut i = 0;
    let chars: Vec<&str> = vec!["a", "b"]; // extend if a day has more than 2 parts
    println!("Solution for {}", args[1]);
    for n in solution {
        println!("({}) {}", &chars[i], n);
        i = i + 1;
    }
}

fn run_mod(days: HashMap<&str, Runnable>, day: &str) -> Vec<i32> {
    let runnable = days.get(day);
    match runnable {
        Some(runnable) => return runnable(),
        None => return vec![],
    }
}
