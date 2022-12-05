use std::fs;

pub fn get_input_for_day(day: i32) -> Vec<String> {
    let file_path = format!("./inputs/day{day}_input.txt", day = day.to_string());
    let input: String = fs::read_to_string(file_path).expect(
        &format!(
            "get_input_for_day: Make sure input for day {day} exists",
            day = day.to_string()
        )[..],
    );
    return input.split("\n").map(str::to_string).collect();
}
