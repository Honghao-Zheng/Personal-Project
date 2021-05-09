import numpy as np
import random
import time
from operator import itemgetter
T=0
R=1
indicator_W=0
indicator_B=0
t=0
initial_ChessBoard=[["WR","WN","WB","WQ","WK","WB","WN","WR"],
                    ["WP","WP","WP","WP","WP","WP","WP","WP"],
                    [".." for i in range(8)],
                    [".." for i in range(8)],
                    [".." for i in range(8)],
                    [".." for i in range(8)],
                    ["BP" for i in range(8)],
                    ["BR","BN","BB","BQ","BK","BB","BN","BR"]]

"""
function print_chess_board displays the chessboard in console by inputing 
the array which represents the chessboard
"""
def print_chess_board(input_Board):
    board=copy_of_board(input_Board)
    for i in range(8):
        board[i].insert(0,i+1)
    board.insert(0,["/","a ","b ","c ","d ","e ","f ","g ","h "])
    for j in range(9):
        if j % 1 == 0 :
            print("      ---------------------------------------------- ")

        for k in range(9):
            if k % 1 == 0 :
                print(" | ", end="")

            if k == 8:
                print(board[-(j+1)][k]+"|")
            else:
                print(str(board[-(j+1)][k]) + " ", end="")




"""
 function opponent_colour compute the colour of pieces the opponent possesses.
"""    
def opponent_colour(player_colour):
    if player_colour=="W":
        return ("B")
    elif player_colour=="B":
        return ("W")
    else: 
        return None
    
"""
this function occupying_colour could decide the status of a cell on 
whether it is occupied bya black chess piece or a white chess piece, 
or it is unoccupied. It was often used to computethe colour of a selected 
piece possessed by the player.
"""    
def occupying_colour(i,j,Board):
    in_that_cell=Board[i][j]
    #Since there are two characters representing the cells,  the 
    #following code can separate thecharacters, make them into a list 
    #containing each of the characters, and compute the firstcharacter.
    cell_colour=list(in_that_cell.strip())[0]
    return(cell_colour)

"""
This function occupying_chess(i,j,Board) could find the type of a 
selected chess piece occupying the cell.
"""
def occupying_chess(i,j,Board):
    in_that_cell=Board[i][j]
    cell_chess=list(in_that_cell.strip())[1]
    return(cell_chess)      
    

"""
chess-rule function of Knight computs legal moves of Knight assuming 
there are other friendly pieces presented on board.  
"""
def rule_Knight(chess_coord,Board):
    i,j=chess_coord
    colletion_of_Moves = []
# move to a cell where it is horizontally 1 space and vertically 2 space,
# or horizontally 2 space and vertically 1 space next to the knight    
    for a in range(-2,3):
        for b in range(-2,3):
            if a !=0 and b !=0:
                if abs(a) !=abs(b):
                  # and cannot move outside the cheseboard
                    if i+a>=0 and i+a<=7 and j+b>=0 and j+b<=7:
                    # append valid moves                   
                        colletion_of_Moves.append([i+a,j+b])
    return(colletion_of_Moves)

"""
chess-rule function of the Rook computs legal moves of Rook assuming 
there are other friendly pieces presented on board. 
"""
def rule_Rook(chess_coord, Board):
    colletion_of_Moves = []
    i,j=chess_coord
    i_L,j_B=i,j
    i_R,j_T=i,j
# append all horizontal moves that is possible within the chessboard width    
    while i_R<7:
        i_R+=1                        
        cell_occupation=occupying_colour(i_R,j,Board)      
        #check if it "hit" a chess piece, stop appending if it does
        if cell_occupation != ".":
            colletion_of_Moves.append([i_R,j])
            break
        else: 
            colletion_of_Moves.append([i_R,j])
    while i_L>0:
        i_L-=1       
        cell_occupation=occupying_colour(i_L,j,Board)
        if cell_occupation != ".":
            colletion_of_Moves.append([i_L,j])
            break
        else: 
            colletion_of_Moves.append([i_L,j])
# append all veritical moves that is possible within the chessboard height 
    while j_T<7:
        j_T+=1
        cell_occupation=occupying_colour(i,j_T,Board)
        if cell_occupation != ".":
            colletion_of_Moves.append([i,j_T])
            break
        else: 
            colletion_of_Moves.append([i,j_T])
    while j_B>0:
        j_B-=1
        cell_occupation=occupying_colour(i,j_B,Board) 
        if cell_occupation != ".":
            colletion_of_Moves.append([i,j_B])
            break
        else: 
            colletion_of_Moves.append([i,j_B])
    return(colletion_of_Moves)    

"""
chess-rule function of the Bishop computs legal moves of Bishop assuming 
there are other friendly pieces presented on board. 
"""
def rule_Bishop(chess_coord, Board):
    colletion_of_Moves = []
    i,j=chess_coord
    i_R,j_T=i,j
    # moves towards top-and-right direction     
    while i_R<7 and j_T<7:
        i_R+=1
        j_T+=1                 
        cell_occupation=occupying_colour(i_R,j_T,Board)
        # check if it "hit" a chess piece, stop appending if it does
        if cell_occupation != ".":
            colletion_of_Moves.append([i_R,j_T])
            break
        else: 
            colletion_of_Moves.append([i_R,j_T])
    i_L,j_T=i,j
    # moves towards top-and-left direction    
    while i_L>0 and j_T<7:
        i_L-=1
        j_T+=1
        cell_occupation=occupying_colour(i_L,j_T,Board)
        if cell_occupation != ".":
            colletion_of_Moves.append([i_L,j_T])
            break
        else: 
            colletion_of_Moves.append([i_L,j_T])
    i_R,j_B=i,j
    # moves towards right-and-bottom direction   
    while i_R<7 and j_B>0:
        i_R+=1
        j_B-=1 
        cell_occupation=occupying_colour(i_R,j_B,Board)
        if cell_occupation != ".":
            colletion_of_Moves.append([i_R,j_B])
            break
        else: 
            colletion_of_Moves.append([i_R,j_B])
    i_L,j_B=i,j
    # moves towards bottom-and-left direction   
    while i_L>0 and j_B>0:
        i_L-=1
        j_B-=1                
        cell_occupation=occupying_colour(i_L,j_B,Board)
        if cell_occupation != ".":
            colletion_of_Moves.append([i_L,j_B])
            break
        else: 
            colletion_of_Moves.append([i_L,j_B])
    return(colletion_of_Moves) 

"""
chess-rule function of the Queen (combination of Bishop and Rook) computs
 legal moves of Queen assuming there are other friendly pieces presented 
 on board. 
"""
def rule_Queen(chess_coord, Board):    
    diagonal_Moves=rule_Bishop(chess_coord,Board)
    straight_Moves=rule_Rook(chess_coord,Board)
    Collection_of_Moves=diagonal_Moves+straight_Moves
    return(Collection_of_Moves) 

"""
chess-rule function of the King computs legal moves of King assuming 
there are other friendly pieces presented on board(do not consider check)
"""
def rule_King(chess_coord, Board):
    colletion_of_Moves = []
    i,j=chess_coord  
    for a in range(-1,2):
        for b in range(-1,2):
            if a != 0 or b !=0:                
                if i+a>=0 and i+a <= 7 and j+b >=0 and j+b<=7:  
                    colletion_of_Moves.append([i+a,j+b])
    return(colletion_of_Moves) 

"""
function Pawn_AP(chess_coord,Board) computes the attacking and 
protecting range of a pawn
"""
def Pawn_AP(chess_coord,Board):
    AD_moves=[]
    row_coord,column_coord=chess_coord
    chess_colour=occupying_colour(row_coord,column_coord,Board)
    if chess_colour=="W":
        # as a white Pawn, it attacks/protects piece locate at its 
        # left-top and right-top 
        if row_coord<7:
            if column_coord>0:
                AD_moves.append([row_coord+1,column_coord-1])
            if column_coord<7:
                AD_moves.append([row_coord+1,column_coord+1])
                # as a black Pawn, it attacks/protects piece locate at its 
                # left-bottom and right-bottom
    if chess_colour=="B":
        if row_coord>0:
            if column_coord>0:
                AD_moves.append([row_coord-1,column_coord-1])
            if column_coord<7:
                AD_moves.append([row_coord-1,column_coord+1])
    return AD_moves

"""
Function selected_chess_Aura(chess_coord,Board) computes the attacking 
and protecting range of the selected piece.
"""
def selected_chess_Aura(chess_coord,Board):
    i,j=chess_coord
    which_chess=occupying_chess(i,j,Board)
    if which_chess == ("N"):
        all_Moves=list(rule_Knight(chess_coord,Board))
    if which_chess == ("R"):
        all_Moves=list(rule_Rook(chess_coord,Board))
    if which_chess == ("B"):
        all_Moves=list(rule_Bishop(chess_coord,Board)) 
    if which_chess == ("Q"):                                  
        all_Moves=list(rule_Queen(chess_coord,Board))      
    if which_chess == ("P"):
        all_Moves=list(Pawn_AP(chess_coord,Board))   
    if which_chess == ("K"):
        all_Moves=list(rule_King(chess_coord,Board))
    return(all_Moves)    

"""
 function be_aware(player,Board) could compute the attacking and 
 protecting range of all pieces of the given colour. Therefore, 
 the output of this function was alsoa list of coordinates of 
 cells that the king of opposite colour cannot move to.
"""   
def be_aware(player,Board):
    all_moves=[]
    for i in range(8):
        for j in range(8):
            # scan the chessboard and append the attacking and protecting  
            # rangeof every piece of selected colour into a list
            if occupying_colour(i,j,Board)== player:
                Moves=selected_chess_Aura([i,j],Board)
                if len(Moves) !=0:
                    for k in Moves:
                        all_moves.append(k)
    return all_moves

"""
this function, actual_moves(player_colour,Moves,Board)
compute the list of legal moves by inputting the list of moves obtained 
with chess-rule function 
"""
def actual_moves(player_colour,Moves,Board):
    legal_moves=[]
    for k in Moves:
        occupied_colour=occupying_colour(k[0],k[1],Board)
        # do not consider moves going towards cells occupied by friendly 
        # pieces 
        if occupied_colour != player_colour:
            legal_moves.append(k)
    return legal_moves  

"""
move-creating function of the Bishop computes the piece's legal moves
"""    
def moves_of_Bishop(chess_location, Board):
    i,j=chess_location
    colletion_of_Moves = rule_Bishop([i,j], Board)
    player_colour=occupying_colour(i,j,Board)
    # removes moves that have coordinates occupied by friendly pieces    
    return actual_moves(player_colour,colletion_of_Moves,Board)

"""
move-creating function of the Rook computes the piece's legal moves
"""  
def moves_of_Rook(chess_location, Board):
    i,j=chess_location
    colletion_of_Moves = rule_Rook([i,j], Board)
    player_colour=occupying_colour(i,j,Board)
    #r emoves moves that have coordinates occupied by friendly pieces     
    return actual_moves(player_colour,colletion_of_Moves,Board)

"""
move-creating function of the Knight computes the piece's legal moves
"""  
def moves_of_Knight(chess_location, Board):
    i,j=chess_location
    colletion_of_Moves = rule_Knight([i,j], Board)
    player_colour=occupying_colour(i,j,Board)
    # removes moves that have coordinates occupied by friendly pieces 
    return actual_moves(player_colour,colletion_of_Moves,Board)  

"""
move-creating function of the Queen computes the piece's legal moves
"""  
def moves_of_Queen(chess_location, Board):
    i,j=chess_location
    colletion_of_Moves = rule_Queen([i,j], Board)
    player_colour=occupying_colour(i,j,Board)
    # removes moves that have coordinates occupied by friendly pieces     
    return actual_moves(player_colour,colletion_of_Moves,Board)  
    
"""
move-creating function of the Pawn computes the piece's legal moves
"""
def moves_of_Pawn(chess_location, Board):
    i,j=chess_location
    player=occupying_colour(i,j,Board)
    colletion_of_Moves=[]    
    AP=Pawn_AP([i,j],Board)
    for k in AP:
        occupied_colour=occupying_colour(k[0],k[1],Board)
        # only consider attacking moves against exsisted enemy pieces 
        # as valid moves.
        if occupied_colour == opponent_colour(player):
            colletion_of_Moves.append(k)
    if player=="W":
        #if not moved already
        if i==1:
            if Board[i+1][j]=="..":
                # it can move forward one cell if the cell is unoccupied
                colletion_of_Moves.append([i+1,j])
    # it can move forward two cells if both cells ahead are unoccupied
            if Board[i+2][j]==".." and Board[i+1][j]=="..":
                colletion_of_Moves.append([i+2,j])
    #if moved already
        if i>1 and i<7:            
            if Board[i+1][j]=="..":                
                colletion_of_Moves.append([i+1,j])
    if player=="B":
        if i==6:
            if Board[i-1][j]=="..":
                colletion_of_Moves.append([i-1,j])
            if Board[i-2][j]==".." and Board[i-1][j]=="..":
                colletion_of_Moves.append([i-2,j])
        if i>1 and i<6:            
            if Board[i-1][j]=="..":                
                colletion_of_Moves.append([i-1,j])
    return colletion_of_Moves

"""
function castling_condition computes the possible castling moves of the King 
if castling conditions are satisfied
"""
def castling_condition(King_coord,under_attack,Board):    
    legal_Moves=[]
    i,j=King_coord
    # check if the cells between the King and Rook on the right side 
    # of castling are unoccupied
    if Board[i][j+1] ==".." and Board[i][j+2]=="..": 
    # check if the castling path is under attacking range of an enemy piece
        if [i,j] not in under_attack:      
            if [i,j+1] not in under_attack:
                if [i,j+2] not in under_attack:            
                    legal_Moves.append([i,j+2])
    # check the same for the left side castling 
    if Board[i][j-1] ==".." and Board[i][j-2]==".." and Board[i][j-3]=="..":
        if [i,j] not in under_attack:
            if [i,j-1] not in under_attack:
                if [i,j-2] not in under_attack:
                    legal_Moves.append([i,j-2])
    return legal_Moves

"""
indicator_W was an indicator for white pieces to show whether or nota 
move had been  made to the white rooks or the white king in one game. 
indicator _B was an indicator for black pieces. These are castling indicators.
If the castling indicator of one side was zero, then a move had not been made 
to rook or king for that side. If the castling indicator was one, then 
rook or king had moved, and castling was forbidden for the player of the c
orrespondingside. This function could change the castling indicator to one 
if the piece selected was king or rook.
"""
def change_castling_indicator(chess,player):
    global indicator_W
    global indicator_B    
    if chess=="K" or chess=="R":
        if player=="W":
            indicator_W=1
        if player=="B":
            indicator_B=1

"""
function castling checking if King or Rook have moved by checking 
castling indicators and return possible castling moves of the King.
"""
def castling(player,chess_coord,under_attack,Board):    
   global indicator_W
   global indicator_B
   if player=="W":
       if indicator_W==0:
           return castling_condition(chess_coord,under_attack,Board)
   if player=="B":
       if indicator_B==0:
           return castling_condition(chess_coord,under_attack,Board)
   return []

"""
move-creating function of the King computes the piece's legal moves
"""
def moves_of_King(chess_location,Board):
    i,j=chess_location
    colletion_of_Moves = rule_King([i,j], Board)
    legal_Moves=[]    
    player=occupying_colour(i,j,Board)
    rival=opponent_colour(player)
    forbidden_Moves=be_aware(rival,Board)
    for k in colletion_of_Moves:
        occupied_colour=occupying_colour(k[0],k[1],Board)      
        # only consider moves that do not enter the enemy pieces' attacking and 
        # protecting range, and moves that do not enter cells occupied by friendly
        # pieces 
        if occupied_colour != player:
            if k not in forbidden_Moves:
                legal_Moves.append(k)
    # includes castling moves if there are any
    castling_Moves=castling(player,[i,j],forbidden_Moves,Board)
    if len(castling_Moves) !=0:
        for l in castling_Moves:
            legal_Moves.append(l)            
    return legal_Moves

"""
This function computes the legal moves of a selected piece
"""
def selected_chess_moves(i,j,Board):
    chess_pieces=occupying_chess(i,j,Board)
    if chess_pieces == ("N"):
        all_Moves=list(moves_of_Knight([i,j],Board))
    if chess_pieces == ("R"):
        all_Moves=list(moves_of_Rook([i,j],Board))
    if chess_pieces == ("B"):
        all_Moves=list(moves_of_Bishop([i,j],Board)) 
    if chess_pieces == ("Q"):                                  
        all_Moves=list(moves_of_Queen([i,j],Board))      
    if chess_pieces == ("P"):
        all_Moves=list(moves_of_Pawn([i,j],Board))   
    if chess_pieces == ("K"):
        all_Moves=list(moves_of_King([i,j],Board))
    return(all_Moves)

"""
function castling_rook_move allows the Rook to move correspondingly while
Kings makes the castling move
"""
def castling_rook_move(from_posi,to_position,Board):
    if from_posi==[0,4]:
        if to_position==[0,6]:                    
            Board[0][5]="WR"
            Board[0][7]=".."            
        if to_position==[0,2]:
            Board[0][3]="WR"
            Board[0][0]=".."            
    elif from_posi==[7,4]:
        if to_position==[7,6]:
            Board[7][5]="BR"
            Board[7][7]=".."            
        if to_position==[7,2]:
            Board[7][3]="BR"
            Board[7][0]=".."            
    else:
        return None

"""
function make_a_move allows player to make a move on chessboard by making 
changes to the array that represents the chessboard, if the intended move 
is illegal then string will be computed 
"""                   
def make_a_move(player,from_posi,to_position,Board):
    i,j=from_posi
# the player can only select the his/her chess piece 
    if occupying_colour(i,j,Board) == player:
        chess_pieces=occupying_chess(i,j,Board)        
        new_i,new_j=to_position
        legal_moves=selected_chess_moves(i,j,Board)
        new_coord=[new_i,new_j]
        # then check if the move made is legal
        if new_coord in legal_moves:
            # change the cell the piece move to into the chess piece
            Board[new_i][new_j]=(player+chess_pieces)
            # change the cells the piece move from into empty cell,".."
            Board[i][j]=".."
            # simutaneous move for Rook from castling
            castling_rook_move(from_posi,to_position,Board)
            # no more castling possible if moved chess is King or Rook
            change_castling_indicator(chess_pieces,player)           
            return Board
        else:
            return("illegal move")          
    else:
        return("Please select your chess pieces")  
        
"""
function possible_actions compute a three-dimension array containing all 
possible actions for all the pieces of that colour
"""
def possible_actions(player,Board):
    all_moves=[]
    for i in range(8):
        for j in range(8):
            if occupying_colour(i,j,Board)== player:             
                Moves=selected_chess_moves(i,j,Board)                
                if len(Moves) !=0:                    
                    for k in Moves:                
                        all_moves.append([[i,j],k])
    return all_moves

"""
 function defend_the_king computes a list of actions a player could take to 
 protect the piece under attack.
"""
def defend_the_king(player,threat_location,chess_coord,Board):
    i,j=threat_location    
    k,l=chess_coord
    block_path=[]
    consider_action=[]
    attacking_chess=occupying_chess(i,j,Board)
    threating_chess=["Q","R","B"]
    strategy=possible_actions(player,Board)
    # protect the chess by firstly identify the threantening chess's 
    # attacking path
    if attacking_chess in threating_chess:
        if i==k:
            while l<j-1:               
                j-=1
                block_path.append([i,j])
            while j<l-1:
                j+=1
                block_path.append([i,j])
        if j==l:
            while i<k-1:
                i+=1
                block_path.append([i,j])
            while k<i-1:
                i-=1
                block_path.append([i,j])
        if i !=k and j !=l:
            
            while i<k-1 and j<l-1:
                i+=1
                j+=1
                block_path.append([i,j])
            while i<k-1 and l<j-1:
                i+=1
                j-=1
                block_path.append([i,j])        
            while k<i-1 and j<l-1:
                i-=1
                j+=1
                block_path.append([i,j])
            while k<i-1 and l<j-1:
                i-=1
                j-=1
                block_path.append([i,j])            
    #for all possible moves of each piece of player's side, append the moves 
    #that eliminate the threatening chess   
    for n in strategy:
        i,j=threat_location
        if [i,j] == n[1]:
            if n[0] !=chess_coord:                
                consider_action.append([n[0],threat_location])
        # the piece threatened can be defended by blocking the attacking 
        # path of the rival's pieces, append such actions        
        if len(block_path) !=0:               
            for b in block_path:                                                    
                if b == n[1]:
                    from_posistion=n[0]
                    if from_posistion !=chess_coord:
                        to_position=n[1]
                        consider_action.append([from_posistion,to_position])
    return consider_action

"""
function copy_of_board makes a copy of array of the chessboard which can be
modified without affecting the original chessboard
"""
def copy_of_board(board):
    copy = []
    for i in range(len(board)):
        sub_copy = board[i][:]
        copy.append(sub_copy)
    return copy

"""
function attacking_range_line computes the attacking range of all straight 
line attacking pieces (Rook, Queen, Bishop) for one player. 
"""
def attacking_range_line(player,Board):
    all_moves=[]
    Moves=[]
    for i in range(8):
        for j in range(8):
            if occupying_colour(i,j,Board)== player:
                which_chess=occupying_chess(i,j,Board)
                print(which_chess)
                if which_chess=="R":
                    Moves=moves_of_Rook([i,j],Board)
                if which_chess=="Q":
                    Moves=moves_of_Queen([i,j],Board)
                if which_chess=="B":
                    Moves=moves_of_Bishop([i,j],Board)
                if len(Moves) !=0:
                    for k in Moves:
                        all_moves.append(k)
    return all_moves

"""
function response_to_check computes all the possible actions a play can take
to get out of checck
"""
def response_to_check(player,attacked_from,king_coord,Board):
    legal_action=[]
    rival=opponent_colour(player)
    King_move=moves_of_King(king_coord,Board)
    # King can make moves to avoid the check            
    if len(King_move) !=0:
        for k in King_move:
            legal_action.append([king_coord,k])
    # use other pieces to defend the King
    defend=defend_the_king(player,attacked_from,king_coord,Board)
    if len(defend) !=0:
        # make a copy of the array of actions that defend the King              
        defend_2=copy_of_board(defend)
        for d in defend:
            # the copy of chessboard is used to be made an assuming move  on
            imaginary_board=copy_of_board(Board)
            # assuming the move has made to defend the King 
            make_a_move(player,d[0],d[1],imaginary_board)
            # check if such move leave the King under check from other enemy
            # pieces
            potential_threats=attacking_range_line(rival,imaginary_board)
            for pt in potential_threats:
                        if imaginary_board[pt[0]][pt[1]]==player+"K":
                            # remove such defending action from the list if  
                            # it still leave King under check
                            defend_2.remove(d)
        # if there are still defending actions avalible after above process,
        # such actions can be considered.
        if len(defend_2) !=0:                    
            for d2 in defend_2:
                legal_action.append(d2)
    return legal_action
          
"""
After the player make a move, function check(player,Board) can be used which 
have three possible outputs: nothing which means opponent's King is not under 
check, empty list which means the player checkmate the opponent, a list of 
restricted actions the opponent can take to get out of check. 
"""                       
def check(player,Board):
    rival=opponent_colour(player)
    attacks=possible_actions(player,Board)  
    for A in attacks:
        cell_attacked=[A[1][0],A[1][1]]
        a_i,a_j=cell_attacked
        # check if the King are under the attacking range of the 
        # player's pieces
        if Board[a_i][a_j] == rival+"K":
            attacked_from=[A[0][0],A[0][1]]
            response=response_to_check(rival,attacked_from,cell_attacked,Board)
            return response

#table of coordinate conversion                                            
maping_letter_to_number = {"a":1,"b":2,"c":3,"d":4,"e":5,"f":6,"g":7,"h":8}
maping_number_to_letter = {1:"a",2:"b",3:"c",4:"d",5:"e",6:"f",7:"g",8:"h"}

"""
function convert the cell position usedby chess players into coordinates 
used by the program
"""
def change_position_to_coord(chess_location):
    letter_coor, number_coor = list(chess_location.strip())
    i = int(number_coor)-1
    j = maping_letter_to_number[letter_coor]-1
    return [i,j]

"""
function convert coordinates to conventional expression for the position on 
chessboard
"""
def change_coord_to_position(coord):
    i,j=coord
    row_position=str(i + 1)
    col_position=maping_number_to_letter[j+1]
    chess_location="".join([col_position, row_position])
    return chess_location

"""
this function allowed the players to input their choice of moves Under 
the console panel of python, 
"""
def input_move():
    from_posi=input("pick a chess from location:")
    to_position=input("move the chess to location:")
    # If a playerwanted to resign, he/she could do so
    # by typing in “I" and “resign”
    if from_posi=="I" and to_position=="resign":
        return None
    #convert traditional chess position input to coordinate in a array
    move_from=change_position_to_coord(from_posi)
    move_to=change_position_to_coord(to_position)
    return [move_from,move_to]

"""
this function could allow the player to only make a legal move and computes 
the move made.If the player resigned,  this function would compute nothing 
and make no change to the chessboard.
"""
def input_man_move(player,limited_actions,Board):
    ok_input=input_move()
    if ok_input==None:
        return None
    # repeating the loop to ensure the player only make the certained 
    # restricted moves if the King is under check
    while limited_actions != None:
        if [ok_input[0],ok_input[1]] not in limited_actions:
            print("illegal move")
            print("be aware, in check")
        else:
            result=make_a_move(player,ok_input[0],ok_input[1],Board)
            return ok_input[1]
        ok_input=input_move()
        if ok_input==None:
            return None
        
    result=make_a_move(player,ok_input[0],ok_input[1],Board) 
    # repeating the loop until a legal move was made (untill the result 
    # computes the array/list of represent the chessboard), illegal move 
    # return result as string which has text stating what is the mistake. 
    while type(result) !=list:
        print(result)
        ok_input=input_move()
        if ok_input==None:
            return None  
        result=make_a_move(player,ok_input[0],ok_input[1],Board)
    return ("no resign")

"""
this function is uesd to start/continue a chess game
"""
def continue_man_vs_man_game(Board,rounds):
    print(print_chess_board(Board))
    global T
    global R
    action_to_check = None
    # R was used to count which round it was           
    while R<=rounds:
        print("---------------------------------------------------------")
        print("round"+str(R))
        # When T was even number, it was a white chess player’s turn. When  
        # T was an odd number, it was a black chess player’sturn
        who_s_turn=T-T//2*2
        if who_s_turn==0:
            player="W"
            rival="B"
            print("White chess player's move")
        if who_s_turn==1:
            player="B"
            rival="W"
            print("Black chess player's move")       
        result=input_man_move(player,action_to_check,Board)
        #player resign
        if result==None:
            return(rival+" chess player win")
        #check if there is check or checkmate
        action_to_check=check(player,Board)
        # if it is None,then there is no check
        if action_to_check !=None:
        # under check, but the list of actions is empty, result in checkmate
            if len(action_to_check) ==0:
                print("checkmate")
                return(player+" player Wins")
        print(print_chess_board(Board))
        # increase turn by 1
        T+=1
        R=T//2+1
    return ("draw")                  
            
def AD_pawn_score(chess_coord,Board):
    score=0
    i,j=chess_coord
    AP_range=Pawn_AP(chess_coord,Board)
    for a in AP_range:
        if occupying_colour(a[0],a[1],Board) !="..":
            if occupying_chess=="N":
                score+=10        
    return score        
    
def knight_mobility(chess_coord,Board):
    score=len(moves_of_Knight(chess_coord,Board))*5
    return score

def isolated_pawn(chess_coord,Board):
    score=0
    chess=0
    i,j=chess_coord
    player=occupying_colour(i,j,Board)
    surounding=rule_King(chess_coord,Board)
    for s in surounding:
        if occupying_colour(s[0],s[1],Board) == player:
            chess+=1
        if chess==1:
            return score
    if chess==0:
        score+=10
        return score
        
def double_rook_score(chess_coord,Board):
    score=0
    i,j=chess_coord
    player=occupying_colour(i,j,Board)
    AP_range=rule_Rook(chess_coord,Board)
    for i in AP_range:       
        if Board[i[0]][i[1]]==player+"R":
            score+=20   
    return score 
               
def bishop_pawn_score(chess_coord,Board):
    score=0
    i,j=chess_coord
    player=occupying_colour(i,j,Board)
    AP_range=rule_Bishop(chess_coord,Board)
    for a in AP_range:
        if Board[a[0]][a[1]]==player+"P":
            score+=10   
    return score  

#table of chess value
chess_values={"P":50,"B":130,"N":150,"R":250,"Q":500,"K":4000}

def Pawn_value(chess_coord,Board):
    score=chess_values["P"]
    score+=AD_pawn_score(chess_coord,Board)
    score+=isolated_pawn(chess_coord,Board)
    return score

def Knight_value(chess_coord,Board):
    score=chess_values["N"]
    free_movement_score=knight_mobility(chess_coord,Board)
    score+=free_movement_score    
    return score

def Bishop_value(chess_coord,Board):
    score=chess_values["B"]
    score+=bishop_pawn_score(chess_coord,Board) 
    return score

def Rook_value(chess_coord,Board):
    score=chess_values["R"]
    score+=double_rook_score(chess_coord,Board)
    return score

def Queen_value(chess_coord,Board):
    score=chess_values["Q"]
    return score

def King_value(chess_coord,Board):
    score=chess_values["K"]
    return score

"""
this function, evaluate_the_Board, computethe scores of the chessboard with 
respect to the player who plays the pieces of the inputted colour.
"""
def evaluate_the_Board(player,Board):
    score=0
    for i in range(8):
        for j in range(8):
            if Board[i][j] != "..":
                side=occupying_colour(i,j,Board)
                chess=occupying_chess(i,j,Board)
                chess_coord=[i,j]
                if chess=="P":
                    if side==player:
                        score+=Pawn_value(chess_coord,Board)
                    else:
                        score-=Pawn_value(chess_coord,Board)
                if chess=="R":
                    if side==player:
                        score+=Rook_value(chess_coord,Board)
                    else:
                        score-=Rook_value(chess_coord,Board)
                if chess=="N":
                    if side==player:
                        score+=Knight_value(chess_coord,Board)
                    else:
                        score-=Knight_value(chess_coord,Board)
                if chess=="B":
                    if side==player:
                        score+=Bishop_value(chess_coord,Board)
                    else:
                        score-=Bishop_value(chess_coord,Board)
                if chess=="Q":
                    if side==player:
                        score+=Queen_value(chess_coord,Board)
                    else:
                        score-=Queen_value(chess_coord,Board)                       
                if chess=="K":
                    if side==player:
                        score+=King_value(chess_coord,Board)
                    else:
                        score-=King_value(chess_coord,Board)                        
    return score

def two_move_thinking(player,Board):
    choose_from=[]
    rival=opponent_colour(player)
    consider_moves=possible_actions(player,Board)
    for i in consider_moves:
        Board11=copy_of_board(Board)
        # each possible imaginary move is made in a replicated board
        Board2=make_a_move(player,i[0],i[1],Board11)
        j_score_list=[]
        avalible_moves_2=possible_actions(rival,Board2)
        # repeat above process for oppentent who can try different 
        # counter moves on the replicated board which the player made 
        # imaginary move on
        for j in avalible_moves_2:
            Board22=copy_of_board(Board2)
            Board3=make_a_move(rival,j[0],j[1],Board22)
            # evaluation function for the final score can be swapped with a 
            # two-moves thinking process to make the function a four-move
            # thinking process
            j_score=-evaluate_the_Board(rival,Board3)
            j_score_list.append(j_score)
        # the oppoent will take a move that is most unfavoured to the player,
        # therefore he will choose the move that results in the lowest score,
        # which is the score the player can have for each of his imaginary 
        # moves        
        i_score=min(j_score_list)
        choose_from.append([i_score,i])
        # player can choose the best score out of the list of worst scores. 
        if len(choose_from)==2:
            comparing_1=choose_from[0][0]
            comparing_2=choose_from[1][0]
            if comparing_1>comparing_2:
                choose_from.remove(choose_from[1])
            elif comparing_1<comparing_2:
                choose_from.remove(choose_from[0])
            else:
                choose_from.remove(random.choice(choose_from))  
    # the best choice, [best_score,best_move], can therefore be chosen
    choose_from=choose_from[0]
    return choose_from

def four_move_thinking(player,Board):
    choose_from=[]
    rival=opponent_colour(player)
    consider_moves=possible_actions(player,Board)
    for i in consider_moves:
        Board11=copy_of_board(Board)
        Board2=make_a_move(player,i[0],i[1],Board11)
        j_score_list=[]
        avalible_moves_2=possible_actions(rival,Board2)
        for j in avalible_moves_2:
            Board22=copy_of_board(Board2)
            Board3=make_a_move(rival,j[0],j[1],Board22)
 #the following is the two-move thing process replacing the evaluation function
            k_score_list=[]
            avalible_moves_3=possible_actions(player,Board3)
            for k in avalible_moves_3:
                Board33=copy_of_board(Board3)
                Board4=make_a_move(player,k[0],k[1],Board33)
                l_score_list=[]
                avalible_moves_4=possible_actions(rival,Board4)
                for l in avalible_moves_4:
                    Board44=copy_of_board(Board4)
                    Board5=make_a_move(rival,l[0],l[1],Board44)
                    l_score=-evaluate_the_Board(rival,Board5)
                    l_score_list.append(l_score)                
                k_score=min(l_score_list)
                k_score_list.append(k_score)
            j_score=max(k_score_list)
#above is the two-move thinking process
            j_score_list.append(j_score)
        i_score=min(j_score_list)
        choose_from.append([i_score,i])                  
        if len(choose_from)==2:
            comparing_1=choose_from[0][0]
            comparing_2=choose_from[1][0]
            if comparing_1>comparing_2:
                choose_from.remove(choose_from[1])
            elif comparing_1<comparing_2:
                choose_from.remove(choose_from[0])
            else:
                choose_from.remove(random.choice(choose_from))            
    choose_from=choose_from[0]
    return choose_from

def multi_moves_process(player,Board,depth):
    global t
    t+=1
    choose_from=[]
    rival=opponent_colour(player)
    consider_moves=possible_actions(player,Board)
    for i in consider_moves:
        Board11=copy_of_board(Board)
        Board2=make_a_move(player,i[0],i[1],Board11)
        j_score_list=[]
        avalible_moves_2=possible_actions(rival,Board2)
        for j in avalible_moves_2:
            Board22=copy_of_board(Board2)
            Board3=make_a_move(rival,j[0],j[1],Board22)                   
            if t==depth:                
                j_score=-evaluate_the_Board(rival,Board3)
                j_score_list.append(j_score)
            else:
                j_score=multi_moves_process(player,Board,depth)
                j_score_list.append(j_score)      
        i_score=min(j_score_list)
        if t>1:
            choose_from.append(i_score)                  
            if len(choose_from)==2:
                comparing_1=choose_from[0]
                comparing_2=choose_from[1]
                if comparing_1>comparing_2:
                    choose_from.remove(choose_from[1])
                elif comparing_1<comparing_2:
                    choose_from.remove(choose_from[0])
                else:
                    choose_from.remove(random.choice(choose_from))
        else:
            choose_from.append([i_score,i])                  
            if len(choose_from)==2:
                comparing_1=choose_from[0][0]
                comparing_2=choose_from[1][0]
                if comparing_1>comparing_2:
                    choose_from.remove(choose_from[1])
                elif comparing_1<comparing_2:
                    choose_from.remove(choose_from[0])
                else:
                    choose_from.remove(random.choice(choose_from))            
    choose_from=choose_from[0]
    t-=1
    return choose_from


### start1=time.clock()
### multi_moves_process("W",Game_Board,1)
### end1=time.clock()
### start2=time.clock()
### multi_moves_process("W",Game_Board,2)
### end2=time.clock()
### print(end1-start1)
### print(end2-start2)


"""
This function computes the actions of defending the attacked piece
"""
def defend_the_chess(player,threat_location,chess_coord,Board):
    i,j=threat_location    
    k,l=chess_coord
    block_path=[]
    consider_action=[]
    attacking_chess=occupying_chess(i,j,Board)
    threating_chess=["Q","R","B"]
    strategy=possible_actions(player,Board)
    if attacking_chess in threating_chess:
        if i==k:
            while l<j-1:               
                j-=1
                block_path.append([i,j])
            while j<l-1:
                j+=1
                block_path.append([i,j])
        if j==l:
            while i<k-1:
                i+=1
                block_path.append([i,j])
            while k<i-1:
                i-=1
                block_path.append([i,j])
        if i !=k and j !=l:
            while i<k-1 and j<l-1:
                i+=1
                j+=1
                block_path.append([i,j])
            while i<k-1 and l<j-1:
                i+=1
                j-=1
                block_path.append([i,j])        
            while k<i-1 and j<l-1:
                i-=1
                j+=1
                block_path.append([i,j])
            while k<i-1 and l<j-1:
                i-=1
                j-=1
                block_path.append([i,j])            
    for n in strategy:
        i,j=threat_location
        if [i,j] == n[1]:
            if n[0] !=chess_coord:                
                consider_action.append([n[0],threat_location])   
        if len(block_path) !=0:            
            d_chess_coor=n[0]
            # this function is same as the function defend_the_king, except
            # the following part was added to ensure  that the value of the 
            # piece used to block the attacking path was smaller than or equal
            # to the value of the attacking piece.
            defending_chess=occupying_chess(d_chess_coor[0],d_chess_coor[1],Board)
            if chess_values[defending_chess]<= chess_values[attacking_chess]:
               #above added part 
                for b in block_path:                           
                    if b == n[1]:
                        if d_chess_coor !=chess_coord:
                            to_position=n[1]
                            consider_action.append([d_chess_coor,to_position])
    return consider_action

"""
This function computes a list of actions that can be taken to respond to 
attacks done by a piece of smaller value. Action include defending the piece
and moving away from the threat.
"""
def attacked_by_low_chess(player,attacked_from,cell_attacked,Board):
    consider=[]
    defending=defend_the_chess(player,attacked_from,cell_attacked,Board)
    avoiding=selected_chess_moves(cell_attacked[0],cell_attacked[1],Board)
    if len(defending)!=0:
        for i in defending:
            consider.append(i)
    if len(avoiding)!=0:
        for j in avoiding:
            consider.append([cell_attacked,j])
    return consider

"""
this function computes the possible actions that can give one more 
protection to a piece attacked by more than it is protected
"""
def attacked_by_more_chess(player,chess_attacked,Board):
    consider=[]
    chesses_protected=[]
    #computing the attacking and protecting range of every friendly piece
    AP_range=be_aware(player,Board)
    count=-1
    for ap in AP_range:
        # obatin a list of coordinates of friendly pieces under protect, the
        # same piece can be repeated.
        friend_or_enemy=occupying_colour(ap[0],ap[1],Board)
        if friend_or_enemy == player:
            chesses_protected.append(ap)
    for c in chess_attacked:
        #the varible count was used so that the piece that was examined would
        #not be examined agained. because in the list of attacked piece, there
        #could be multiple coordinates of the same piece.
        count+=1
        # count the numberof pieces attacking the piece of interest
        N_At=chess_attacked.count(c)
        # count the number of friendly pieces protecting the piece of interest
        N_Pt=chesses_protected.count(c)
        if N_At>N_Pt:
            first_c_coord=chess_attacked.index(c)
            # only consider the attacking piece once
            if first_c_coord==count:
                # scan the chessboard to select each friendly piece to find 
                # the one that is not protecting the attacked piece 
                # (the one that is "free to use").
                for i in range(8):
                    for j in range(8):
                        if occupying_colour(i,j,Board)== player:
                            already_protecting=False
                            chess_coor=[i,j]
                            # protecting range of the selected piece
                            AP=selected_chess_Aura(chess_coor,Board)
                            for p in AP:
                                # ignore the friendly pieces tht is already   
                                # protecting the attacked piece as it cannot
                                # provide more protection
                                if p==c:
                                    already_protecting==True
                                    break
                            if already_protecting==False:
                                # check what move the free piece can make 
                                Moves=selected_chess_moves(i,j,Board)
                                for m in Moves:
                                    copy=copy_of_board(Board)
                                    # and make the move to see if such move 
                                    # can protect the attacked pieces
                                    make_a_move(player,chess_coor,m,copy)
                                    prot=selected_chess_Aura(m,copy)
                                    for pr in prot:
                                        # consider the move that results in 
                                        # the attacked piece covered under the
                                        # protecting range of moved piece
                                        if pr==c:
                                            consider.append([chess_coor,m])
    return consider

def response_if_attacked(player,Board):
    rival=opponent_colour(player)
    threats=possible_actions(rival,Board)
    chess_attacked=[]    
    consider_action=[]
    # find all possible attacks from enemy pieces
    for A in threats:
        cell_attacked=[A[1][0],A[1][1]]
        a_i,a_j=cell_attacked
        which=occupying_colour(a_i,a_j,Board)
        chess_under_attack=occupying_chess(a_i,a_j,Board)
        if which==player:
            # work out the corresponding actions against each type of attacks
            attacked_from=[A[0][0],A[0][1]]
            if chess_under_attack == "K":
                consider_action=attacked_by_low_chess(player,attacked_from,
                                                      cell_attacked,Board)
                return consider_action
            else:
                attacking_chess=occupying_chess(attacked_from[0],attacked_from
                                                [1],Board)
                attacking_chess_value=chess_values[attacking_chess]
                attacked_chess_value=chess_values[chess_under_attack]
                if attacking_chess_value<=attacked_chess_value:
                    response=attacked_by_low_chess(player,attacked_from,
                                                   cell_attacked,Board)
                    if len(response) !=0:
                        for r in response:
                            consider_action.append(r)                
                chess_attacked.append(cell_attacked)
        if len(chess_attacked) !=0:            
            rep=attacked_by_more_chess(player,chess_attacked,Board)
            if len(rep) !=0:
                for k in rep:
                    consider_action.append(k)
    return consider_action

def prioritized_actions(player,Board):
    consider_Moves=response_if_attacked(player,Board)
    if len(consider_Moves) ==0:
        consider_Moves=possible_actions(player,Board)        
    return consider_Moves

def multi_move_sensible(player,Board,depth):
    global t
    t+=1
    choose_from=[]
    rival=opponent_colour(player)
    consider_moves=prioritized_actions(player,Board)
    for i in consider_moves:
        Board11=copy_of_board(Board)
        Board2=make_a_move(player,i[0],i[1],Board11)
        j_score_list=[]
        avalible_moves_2=prioritized_actions(rival,Board2)
        for j in avalible_moves_2:
            Board22=copy_of_board(Board2)
            Board3=make_a_move(rival,j[0],j[1],Board22)                   
            if t==depth:                
                j_score=-evaluate_the_Board(rival,Board3)
                j_score_list.append(j_score)
            else:
                j_score=a_sensible_move(player,Board3,depth)
                j_score_list.append(j_score)      
        i_score=min(j_score_list)
        if t>1:
            choose_from.append(i_score)                  
            if len(choose_from)==2:
                comparing_1=choose_from[0]
                comparing_2=choose_from[1]
                if comparing_1>comparing_2:
                    choose_from.remove(choose_from[1])
                elif comparing_1<comparing_2:
                    choose_from.remove(choose_from[0])
                else:
                    choose_from.remove(random.choice(choose_from))
        else:
            choose_from.append([i_score,i])                  
            if len(choose_from)==2:
                comparing_1=choose_from[0][0]
                comparing_2=choose_from[1][0]
                if comparing_1>comparing_2:
                    choose_from.remove(choose_from[1])
                elif comparing_1<comparing_2:
                    choose_from.remove(choose_from[0])
                else:
                    choose_from.remove(random.choice(choose_from))            
    choose_from=choose_from[0]
    t-=1
    return choose_from

"""
alpha-beta pruning applied on top of four-move thinking process
"""
def four_move_AB(player,Board):    
    rival=opponent_colour(player)
    #beta2 set as nothing
    beta2=None
    choose_from=[]
    consider_moves=possible_actions(player,Board)
    for i in consider_moves:
        Board11=copy_of_board(Board)
        Board2=make_a_move(player,i[0],i[1],Board11)
        #alpha not yet updated
        alpha=None
        j_score_list=[]
        avalible_moves_2=possible_actions(rival,Board2)
        for j in avalible_moves_2:
            Board22=copy_of_board(Board2)
            Board3=make_a_move(rival,j[0],j[1],Board22)
            #beta not yet updated       
            beta=None
            k_score_list=[]
            avalible_moves_3=possible_actions(player,Board3)
            for k in avalible_moves_3:
                Board33=copy_of_board(Board3)
                Board4=make_a_move(player,k[0],k[1],Board33)
                l_score_list=[]
                avalible_moves_4=possible_actions(rival,Board4)
                for l in avalible_moves_4:
                    Board44=copy_of_board(Board4)
                    Board5=make_a_move(rival,l[0],l[1],Board44)
                    l_score=-evaluate_the_Board(rival,Board5)
                #above unchanged   
                # below alpha-beta pruning used
                # compare with beta    
                    if beta !=None:
                        if l_score <=beta:
                            k_score=l_score
                            l_score_list=[]
                            # this save computational power
                            break     
                    # The score is appended into the list if there is no beta 
                    # or the score is greater than the value of beta
                    l_score_list.append(l_score)
                # updating beta 
                # after the above loop, if the list is non-empty, it means no
                # score is smaller than beta, and a maximumcan be computed 
                # from the list to become the current beta
                if len(l_score_list) !=0:
                    k_score=min(l_score_list)
                    beta=k_score                    
                    #compare with alpha everytime beta is updated   
                    if alpha !=None:
                        if alpha <=beta:
                            j_score=beta
                            k_score_list=[]
                            break
                k_score_list.append(k_score)
            #updating alpha
            if len(k_score_list) !=0:
                j_score=beta
                alpha=j_score
            #compare with beta2 everytime alpha is updated     
                if beta2 !=None:
                    if alpha<=beta2:
                        i_score=alpha
                        j_score_list=[]
                        break   
            j_score_list.append(j_score)
        #update beta2          
        if len(j_score_list) !=0:
            i_score=alpha
            beta2=i_score
        # alpha-beta pruning stop here
        # following unchanged
        choose_from.append([i_score,i])                  
        if len(choose_from)==2:
            comparing_1=choose_from[0][0]
            comparing_2=choose_from[1][0]
            if comparing_1>comparing_2:
                choose_from.remove(choose_from[1])
            elif comparing_1<comparing_2:
                choose_from.remove(choose_from[0])
            else:
                choose_from.remove(random.choice(choose_from))            
    choose_from=choose_from[0]
    return choose_from


"""
start3=time.clock()
four_move_AB("W",Game_Board)
end3=time.clock()
print(end3-start3)
"""
def a_sensible_move(player,Board):  
    rival=opponent_colour(player)
    #beta2 set as nothing
    beta=None
    choose_from=[]
    consider_moves=possible_actions(player,Board)
    for i in consider_moves:
        Board11=copy_of_board(Board)
        Board2=make_a_move(player,i[0],i[1],Board11)
        #alpha not yet updated
        alpha=None
        j_score_list=[]
        avalible_moves_2=possible_actions(rival,Board2)
        for j in avalible_moves_2:
            Board22=copy_of_board(Board2)
            Board3=make_a_move(rival,j[0],j[1],Board22)
            j_score=-evaluate_the_Board(rival,Board3)  
            if beta !=None:
                if j_score <=beta:
                    i_score=j_score
                    j_score_list=[]
                    break                    
            j_score_list.append(j_score)       
        if len(j_score_list) !=0:
            i_score=min(j_score_list)
            beta=i_score
        #following unchanged
        choose_from.append([i_score,i])                  
        if len(choose_from)==2:
            comparing_1=choose_from[0][0]
            comparing_2=choose_from[1][0]
            if comparing_1>comparing_2:
                choose_from.remove(choose_from[1])
            elif comparing_1<comparing_2:
                choose_from.remove(choose_from[0])
            else:
                choose_from.remove(random.choice(choose_from))            
    choose_from=choose_from[0]
    return choose_from

def AI_move(player,Board):
    AI_move=a_sensible_move(player,Board)[1]
    i,j=AI_move[0]
    chess=occupying_chess(i,j,Board)
    print("move from",chess+change_coord_to_position(AI_move[0]))
    print("move to",chess+change_coord_to_position(AI_move[1]))
    make_a_move(player,AI_move[0],AI_move[1],Board)
    return AI_move[1]

def continue_man_vs_AI(Board,rounds):
    print(print_chess_board(Board))
    global T
    global R
    action_to_check = None           
    while R<=rounds:
        print("---------------------------------------------------------")
        print("round"+str(R))
        who_s_turn=T-T//2*2
        if who_s_turn==0:
            player="W"
            rival="B"
            print("White chess player's move")       
            input_man_move(player,action_to_check,Board)     
        if who_s_turn==1:
            player="B"
            rival="W"
            print("Black chess player's move")
            AI_move(player,Board)     
        action_to_check=check(player,Board)
        if action_to_check !=None:
            if len(action_to_check) ==0:
                print("checkmate")
                return(player+" player Wins")                
        print(print_chess_board(Board))
        T+=1
        R=T//2+1
    return ("draw") 

def test_AI_vs_AI(Board,rounds):
    print(print_chess_board(Board))
    global T
    global R           
    while R<=rounds:
        print("---------------------------------------------------------")
        print("round"+str(R))
        who_s_turn=T-T//2*2
        if who_s_turn==0:
            player="W"
            rival="B"
            print("White chess player's move")       
            AI_move(player,Board)      
        if who_s_turn==1:
            player="B"
            rival="W"
            print("Black chess player's move")
            AI_move(player,Board)       
        action_to_check=check(player,Board)
        if action_to_check !=None:
            if len(action_to_check) ==0:
                print("checkmate")
                return(player+" player Wins")                
        print(print_chess_board(Board))
        T+=1
        R=T//2+1
    return ("draw")

def continue_game(Board,mode,rounds):
    if mode=="1":   
        return continue_man_vs_man_game(Board,rounds)
    if mode=="2":
        return continue_man_vs_AI(Board,rounds)
    if mode=="3":
        return test_AI_vs_AI(Board,rounds)
    
Game_Board=copy_of_board(initial_ChessBoard)      
def start():
    print("if you wish to continue an interrupted game, input c() after")
    print("the game stopped")
    print("...............................................................")
    print("please input the number of the corresponding game mode ")
    print("1 : Two-player game")
    print("2 : Play with computer")
    print("3 : two computers play (testing mode)")
    mode=input("choose a game mode:")
    print("set the number of rounds wished to be played")
    rounds=input("set rounds: ")
    print("start the game !")
    rounds=int(rounds)
    global T
    global R
    global indicator_W
    global indicator_B
    global Game_Board
    #set everything into default
    T=0
    R=1
    indicator_W=0
    indicator_B=0
    Game_Board=copy_of_board(initial_ChessBoard)
    return continue_game(Game_Board,mode,rounds)    
    
def c():
    print("1 : Two-players game")
    print("2 : Play with computer")
    print("3 : two computers play (testing mode)")
    mode=input("continue from game mode:")
    rounds=input("set rounds: ")
    rounds=int(rounds)
    return continue_game(Game_Board,mode,rounds)
    
start()



#use the following to satrt and continue a game or make a drawn game continue to play by setting more rounds

#improve AI evaluation AD, depth and breadth
#making castling if AI can
#choose the two most forceful moves, if only one means that it is one step deep 
#bug: castling bug, response to attack may choose to doing nothing
#while being attacked consider 1 more action that gives maximum value 
#not allow to make the move that leave the king on check
#attacked by more chesses not consider a chess behind