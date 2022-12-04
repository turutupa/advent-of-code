use std::env;
use std::process;

mod day1;
mod day2;
mod helpers;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() != 2 {
        println!("Please specify the day");
        process::exit(1);
    } else {
        let chars: Vec<&str> = vec!["a", "b", "c", "d"]; // extend if a day has more than 4 problems
        let mut i = 0;
        let solution: Vec<String> = run_mod(&args[1]);
        if solution.len() == 0 {
            print!("There is no solution for {}", &args[1]);
            return;
        }
        println!("Solution for {}", args[1]);
        for n in solution {
            println!("({}) {}", &chars[i], n);
            i = i + 1;
        }
    }
}

fn run_mod(day: &String) -> Vec<String> {
    if day == "day1" {
        return day1::run();
    } else if day == "day2" {
        return day2::run();
    }
    return vec![];
}
