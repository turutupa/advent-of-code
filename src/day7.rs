use std::collections::HashMap;

const INPUT: &str = include_str!("../inputs/day7.txt");

pub fn run() -> Vec<i32> {
    return vec![part_a(), part_b()];
}

fn part_a() -> i32 {
    const MAX_SIZE: i32 = 100000;
    let dirs = get_dirs();
    return dirs.values().filter(|&&x| x <= MAX_SIZE).sum::<i32>();
}

fn part_b() -> i32 {
    const TOTAL_DISK_SPACE: i32 = 70000000;
    const REQ_FREE_SPACE: i32 = 30000000;
    let dirs = get_dirs();
    let needed = TOTAL_DISK_SPACE - REQ_FREE_SPACE;
    let used_space = dirs.get("/").unwrap_or(&0);
    let threshold = used_space - needed;
    return *dirs.values().filter(|&&v| v >= threshold).min().unwrap();
}

fn get_dirs() -> HashMap<String, i32> {
    let mut dirs: HashMap<String, i32> = HashMap::new();
    let mut path: Vec<String> = Vec::new();
    INPUT.lines().for_each(|line| {
        let head = get_first(line);
        if head == "$" {
            let command = get_second(line);
            let target_dir = get_third(line);
            if command == "cd" {
                if target_dir == ".." {
                    path.pop().unwrap();
                } else {
                    path.push(target_dir.clone().to_string());
                }
            }
        } else if head == "dir" {
        } else {
            let size: i32 = get_first(&line).parse().unwrap_or(0);
            for (i, _) in path.iter().enumerate() {
                let p = path[0..i + 1].join(" ");
                *dirs.entry(p.to_string()).or_insert(0) += size;
            }
        }
    });
    return dirs;
}

fn get_first(line: &str) -> &str {
    return line.split_whitespace().nth(0).unwrap_or("");
}

fn get_second(line: &str) -> &str {
    return line.split_whitespace().nth(1).unwrap_or("");
}

fn get_third(line: &str) -> &str {
    return line.split_whitespace().nth(2).unwrap_or("");
}
