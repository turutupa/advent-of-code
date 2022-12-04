use std::collections::HashMap;
use std::env;
use std::process;

mod day1;
mod day2;
mod helpers;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() != 2 {
        println!("Please specify the day. Example: `cargo run -- day1`");
        process::exit(1);
    }
    let solution: Vec<i32> = run_mod(&args[1]);
    if solution.len() == 0 {
        print!("There is no solution for {}, sorry!", &args[1]);
        return;
    }
    /* print solution for each part */
    let mut i = 0;
    let chars: Vec<&str> = vec!["a", "b", "c", "d"]; // extend if a day has more than 4 problems
    println!("Solution for {}", args[1]);
    for n in solution {
        println!("({}) {}", &chars[i], n);
        i = i + 1;
    }
}

type Runnable = fn() -> Vec<i32>;

fn run_mod(day: &str) -> Vec<i32> {
    let days: HashMap<&str, Runnable> = HashMap::from([
        ("day1", day1::run as Runnable),
        ("day2", day2::run as Runnable),
    ]);
    let runnable = days.get(day);
    match runnable {
        Some(runnable) => return runnable(),
        None => return vec![],
    }
}
