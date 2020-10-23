# Project Sudoku
# Author Matthew Espiritu
# Date: June 3 2020

import random
from tkinter import messagebox
from tkinter import *

board1 = [6, 0, 0, 0, 1, 2, 0, 0, 7,
          0, 0, 8, 0, 0, 0, 6, 0, 1,
          5, 1, 7, 0, 0, 0, 8, 2, 4,
          5, 0, 0, 2, 6, 0, 0, 0, 3,
          9, 2, 0, 0, 0, 3, 0, 0, 5,
          6, 0, 3, 0, 4, 0, 2, 0, 0,
          1, 0, 0, 9, 0, 6, 0, 2, 0,
          4, 8, 0, 0, 5, 0, 0, 1, 0,
          7, 6, 2, 3, 0, 0, 0, 5, 0]

board2 = [6,9,4,8,1,2,3,5,7,2,3,8,5,4,7,6,9,1,5,1,7,9,3,6,8,2,4,5,8,1,2,6,9,4,7,3,9,2,4,8,7,3,1,6,5,6,7,3,1,4,5,2,9,8,1,3,5,9,4,6,7,2,8,4,8,9,7,5,2,3,1,6,7,6,2,3,8,1,4,5,9]

frame_group = []
entry_group = []


class SudokuGame:
    def __init__(self, master):
        self.master = master
        welcome_label = Label(window, text="Let's play Sudoku", font=("Arial", 30))
        welcome_label.pack()
        frame = Frame(master)
        frame.config(highlightbackground="grey", highlightthickness=6)

        a = 0
        for i in range(3):
            for j in range(3):
                frame_group.append([None, None, None])
                frame_group[i][j] = Frame(frame)
                frame_group[i][j].grid(row=i, column=j)
                frame_group[i][j].config(highlightbackground="black", highlightthickness=1)
                b = 0
                for k in range(3):
                    for p in range(3):
                        entry_group.append([None, None, None, None, None, None, None, None, None])
                        entry_group[a][b] = Entry(frame_group[i][j], width=2, font=("Arial", 20), justify="center",
                                                  fg='blue', state=DISABLED)
                        entry_group[a][b].grid(row=k, column=p, pady=5, padx=5)

                        b += 1
                a += 1
        start_button = Button(text="Start!", width=7, font=("Arial", 15), command=lambda: self.start_game(board1))
        start_button.pack()

        frame.pack()

        check_button = Button(text="Check Board", width=11, font=("Arial", 15), command=self.check_game)
        check_button.pack()

    def start_game(self, board):
        x = 0
        for y in range(9):
            for u in range(9):
                entry_group[y][u].config(state=NORMAL)
                if board[x] != 0:
                    entry_group[y][u].insert(0, str(board[x]))
                    entry_group[y][u].config(state=DISABLED ,disabledforeground='black')

                x += 1

    def check_game(self):
        messagebox.showinfo("Sudoku", self.check_board())

    def check_board(self):
        # Check Quadrant
        for i in range(9):
            quad = []
            for j in range(9):
                if entry_group[i][j].get() == "":
                    return "Board incomplete"
                quad.append(entry_group[i][j].get())

            if len(quad) != len(set(quad)):
                print(entry_group[0][1].get())
                return "Wrong, check the board again"

        # Check horizontal
        k = 0
        for p in range(3):
            j = 0
            for y in range(3):
                horz = []
                for x in range(k, k + 3):
                    for i in range(j, j + 3):
                        horz.append(entry_group[x][i].get())

                # print(len(horz), len(set(horz)))
                if len(horz) != len(set(horz)):
                    return "Wrong, check the board again"
                j += 3

            k += 3

        # Check vertical
        k = 0
        for p in range(3):
            j = 0
            for y in range(3):
                vert = []
                for x in range(k, k + 7, 3):
                    for i in range(j, j + 7, 3):
                        vert.append(entry_group[x][i].get())

                if len(vert) != len(set(vert)):
                    return "Wrong, check the board again"
                j += 1
            k += 1
        return "Nice!"

# GUI
window = Tk()
window.geometry("700x600")
my_game = SudokuGame(window)
window.mainloop()






