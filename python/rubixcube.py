#!/usr/bin/env python3
import os
import sys
import random
import time
from typing import List, Tuple




class RubiksCube:
    def __init__(self):
        # Define colors using ANSI escape codes


        self.colors = {
            'W': '\033[47m  \033[0m',  # White
            'R': '\033[41m  \033[0m',  # Red
            'B': '\033[44m  \033[0m',  # Blue
            'O': '\033[43m  \033[0m',  # Orange (using yellow background)
            'G': '\033[42m  \033[0m',  # Green
            'Y': '\033[103m  \033[0m'  # Yellow
        }
        
        # Initialize cube faces (3x3 each)
        # Front, Right, Back, Left, Up, Down
        self.faces = {
            'F': [['R'] * 3 for _ in range(3)],  # Front - Red
            'R': [['B'] * 3 for _ in range(3)],  # Right - Blue
            'B': [['O'] * 3 for _ in range(3)],  # Back - Orange
            'L': [['G'] * 3 for _ in range(3)],  # Left - Green
            'U': [['W'] * 3 for _ in range(3)],  # Up - White
            'D': [['Y'] * 3 for _ in range(3)]   # Down - Yellow
        }
        
        self.scramble_cube()
    
    def clear_screen(self):
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def rotate_face_clockwise(self, face: List[List[str]]) -> List[List[str]]:
        """Rotate a 3x3 face 90 degrees clockwise"""
        return [[face[2-j][i] for j in range(3)] for i in range(3)]
    
    def rotate_face_counterclockwise(self, face: List[List[str]]) -> List[List[str]]:
        """Rotate a 3x3 face 90 degrees counterclockwise"""
        return [[face[j][2-i] for j in range(3)] for i in range(3)]
    
    def move_F(self):
        """Front face clockwise"""
        # Rotate front face
        self.faces['F'] = self.rotate_face_clockwise(self.faces['F'])
        
        # Rotate adjacent edges
        temp = [self.faces['U'][2][i] for i in range(3)]
        for i in range(3):
            self.faces['U'][2][i] = self.faces['L'][2-i][2]
            self.faces['L'][2-i][2] = self.faces['D'][0][2-i]
            self.faces['D'][0][2-i] = self.faces['R'][i][0]
            self.faces['R'][i][0] = temp[i]
    
    def move_R(self):
        """Right face clockwise"""
        self.faces['R'] = self.rotate_face_clockwise(self.faces['R'])
        
        temp = [self.faces['U'][i][2] for i in range(3)]
        for i in range(3):
            self.faces['U'][i][2] = self.faces['F'][i][2]
            self.faces['F'][i][2] = self.faces['D'][i][2]
            self.faces['D'][i][2] = self.faces['B'][2-i][0]
            self.faces['B'][2-i][0] = temp[i]
    
    def move_U(self):
        """Up face clockwise"""
        self.faces['U'] = self.rotate_face_clockwise(self.faces['U'])
        
        temp = self.faces['F'][0][:]
        self.faces['F'][0] = self.faces['R'][0][:]
        self.faces['R'][0] = self.faces['B'][0][:]
        self.faces['B'][0] = self.faces['L'][0][:]
        self.faces['L'][0] = temp
    
    def move_L(self):
        """Left face clockwise"""
        self.faces['L'] = self.rotate_face_clockwise(self.faces['L'])
        
        temp = [self.faces['U'][i][0] for i in range(3)]
        for i in range(3):
            self.faces['U'][i][0] = self.faces['B'][2-i][2]
            self.faces['B'][2-i][2] = self.faces['D'][i][0]
            self.faces['D'][i][0] = self.faces['F'][i][0]
            self.faces['F'][i][0] = temp[i]
    
    def move_D(self):
        """Down face clockwise"""
        self.faces['D'] = self.rotate_face_clockwise(self.faces['D'])
        
        temp = self.faces['F'][2][:]
        self.faces['F'][2] = self.faces['L'][2][:]
        self.faces['L'][2] = self.faces['B'][2][:]
        self.faces['B'][2] = self.faces['R'][2][:]
        self.faces['R'][2] = temp
    
    def move_B(self):
        """Back face clockwise"""
        self.faces['B'] = self.rotate_face_clockwise(self.faces['B'])
        
        temp = [self.faces['U'][0][i] for i in range(3)]
        for i in range(3):
            self.faces['U'][0][i] = self.faces['R'][2-i][2]
            self.faces['R'][2-i][2] = self.faces['D'][2][2-i]
            self.faces['D'][2][2-i] = self.faces['L'][i][0]
            self.faces['L'][i][0] = temp[i]
    
    def scramble_cube(self, moves=20):
        """Scramble the cube with random moves"""
        move_methods = [self.move_F, self.move_R, self.move_U, self.move_L, self.move_D, self.move_B]
        for _ in range(moves):
            random.choice(move_methods)()
    
    def display_cube(self):
        """Display the 3D cube in terminal"""
        print("\n" + "="*50)
        print("           3D RUBIK'S CUBE")
        print("="*50)
        
        # Display UP face
        print("\n           UP FACE")
        for row in self.faces['U']:
            print("        ", end="")
            for cell in row:
                print(self.colors[cell], end="")
            print()
        
        # Display middle row (LEFT, FRONT, RIGHT, BACK)
        print("\n   LEFT     FRONT    RIGHT     BACK")
        for i in range(3):
            # Left face
            for cell in self.faces['L'][i]:
                print(self.colors[cell], end="")
            print("  ", end="")
            
            # Front face
            for cell in self.faces['F'][i]:
                print(self.colors[cell], end="")
            print("  ", end="")
            
            # Right face
            for cell in self.faces['R'][i]:
                print(self.colors[cell], end="")
            print("  ", end="")
            
            # Back face
            for cell in self.faces['B'][i]:
                print(self.colors[cell], end="")
            print()
        
        # Display DOWN face
        print("\n          DOWN FACE")
        for row in self.faces['D']:
            print("        ", end="")
            for cell in row:
                print(self.colors[cell], end="")
            print()
        
        print("\n" + "="*50)
    
    def display_controls(self):
        """Display control instructions"""
        print("\nCONTROLS:")
        print("F - Front face clockwise     B - Back face clockwise")
        print("R - Right face clockwise     L - Left face clockwise")
        print("U - Up face clockwise        D - Down face clockwise")
        print("S - Scramble cube           Q - Quit")
        print("="*50)

def main():
    
    cube = RubiksCube()
    
    while True:
        cube.clear_screen()
        cube.display_cube()
        cube.display_controls()
        
        try:
            move = input("\nEnter move: ").upper().strip()
            
            if move == 'Q':
                print("\nThanks for playing!")
                break
            elif move == 'F':
                cube.move_F()
            elif move == 'R':
                cube.move_R()
            elif move == 'U':
                cube.move_U()
            elif move == 'L':
                cube.move_L()
            elif move == 'D':
                cube.move_D()
            elif move == 'B':
                cube.move_B()
            elif move == 'S':
                print("Scrambling cube...")
                cube.scramble_cube()
                time.sleep(1)
            else:
                print("Invalid move! Press Enter to continue...")
                input()
        
        except KeyboardInterrupt:
            print("\n\nThanks for playing!")
            break
        except Exception as e:
            print(f"Error: {e}")
            input("Press Enter to continue...")

if __name__ == "__main__":
    main()