import os 

def read_input(file_path):
    with open(file_path, 'r') as f:
        return f.read().split('\n')

def get_most_and_least_used_bits(rows, column):
    amount = 0
    for row in range(len(rows)):
        if rows[row][column] == '0':
            amount -= 1
        else:
            amount += 1
    most = '0' if amount < 0 else '1'
    return most, '0' if most == '1' else '1'


# solution to the first problem of the day
def power_consumption(rows):
    gamma, epsilon = '', ''
    for column in range(len(rows[0])):
        most, least = get_most_and_least_used_bits(rows, column)
        gamma += most
        epsilon += least
    return int(gamma, 2) * int(epsilon, 2)


# solution to the second problem of the day
def life_support_rating(rows):
    rows_oxygen = rows
    rows_co2 = rows
    for column in range(len(rows[0])):
        if len(rows_oxygen) > 1:
            most, _ = get_most_and_least_used_bits(rows_oxygen, column)
            rows_oxygen = list(filter(lambda b: b[column] == most, rows_oxygen))
        if len(rows_co2) > 1:
            _, least = get_most_and_least_used_bits(rows_co2, column)
            rows_co2 = list(filter(lambda b: b[column] == least, rows_co2))
    
    return int(rows_oxygen[0], 2) * int(rows_co2[0], 2)

dir_path = os.path.dirname(os.path.realpath(__file__))
input_rows = read_input(dir_path + '/input.txt')
print(f"Power Consumption = {power_consumption(input_rows)}")
print(f"Life Support Rating = {life_support_rating(input_rows)}")