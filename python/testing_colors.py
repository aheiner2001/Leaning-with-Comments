
#  This creates a board with three different rows

draw_board = [[0, 0, 0], [1, 1, 1], [2, 2, 2]]




# ANSI color codes

# we are creating a list with different colors
colors = [


    '\033[91m',  # Red
    '\033[92m',  # Green
    '\033[94m'   # Blue
]
#this is the default color
reset = '\033[0m'


# for i, and each row in draw_board. We use enumerate 
# enumerate will number each item in the list as we print it out. That is importnat for this because
# this is how we can use i. I is not auto incrementing so we can use enumerate to do this.

for i, row in enumerate(draw_board):
    color = colors[i % len(colors)]
    colored_row = " | ".join(f"{color}{cell}{reset}" for cell in row)
    print(colored_row)



