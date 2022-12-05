use std::collections::HashMap;
use std::env;
use std::process;

mod day1;
mod day2;
mod day3;
mod helpers;

type Runnable = fn() -> Vec<i32>;

fn get_days<'a>() -> HashMap<&'a str, Runnable> {
    /* extend solutions here */
    return HashMap::from([
        ("day1", day1::run as Runnable),
        ("day2", day2::run as Runnable),
        ("day3", day3::run as Runnable),
    ]);
}

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() != 2 {
        println!("Please specify the day. Example: `cargo run -- day1`");
        process::exit(1);
    }

    /* Run specified day */
    let days: HashMap<&str, Runnable> = get_days();
    let solution: Vec<i32> = run_mod(days, &args[1]);

    /* Case no solution */
    if solution.len() == 0 {
        print!("There is no solution for {}, sorry!", &args[1]);
        return;
    }

    /* print solution for each part */
    let mut i = 0;
    let chars: Vec<&str> = vec!["a", "b", "c"]; // extend if a day has more than 4 problems
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
