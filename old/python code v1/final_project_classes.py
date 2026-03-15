# ====================================================================================================
# Program:  final_project_classes.py
# Author:  Nico Lamas
# Description:  Classes for final project
# Date Modified:  3/22/2022
# Version:  1.1.1
# ====================================================================================================
# Import Libraries
import time
import random
from graphics import *
import simpleaudio

# ====================================================================================================
# Global Variables
upgrade = False
damage = 1
upgradeAttack = False
tierAttack = 0
health = 5
enemy1Health = 5
enemy2Health = 15
player2Health = 50
tierHeal = 1
limitHeal = 3
upgradeCoins = 3
upgradeCoin = 0
enemyTurn = False
blockBonus = 0
maxPlayer2 = 7
maxEnemy2 = 4
maxEnemy1 = 1
said = 0
death = False


# ====================================================================================================

class Player(object):
    """Main object that the player can control."""

    def __init__(self, x, y, speed, size, window):
        """Blueprints for Player class"""
        self.x = x
        self.y = y
        self.window = window
        self.facingLeft = False  # If True facing left and if False facing right
        self.idle = False  # If True then idle and if False then running
        self.imageIndex = 0
        self.runLeftImages = []
        self.runRightImages = []
        self.idleLeftImages = []
        self.idleRightImages = []
        self.__loadImages()
        self.x = x
        self.y = y
        self.size = size
        self.window = window
        self.__speed = speed

    def __loadImages(self):
        """Loads all the images for the animation"""

        for i in range(4):
            image = Image(Point(self.x, self.y),
                          f"Assets/Characters/Player/Overworld Sprites/unorganized sprites/Walk Left 2x Big/left{i}_2xbig.png")
            self.runLeftImages.append(image)
        for i in range(4):
            image = Image(Point(self.x, self.y),
                          f"Assets/Characters/Player/Overworld Sprites/unorganized sprites/Walk Right 2x Big/right{i}_2xbig.png")
            self.runRightImages.append(image)
        for i in range(4):
            image = Image(Point(self.x, self.y),
                          f"Assets/Characters/Player/Overworld Sprites/unorganized sprites/Walk Right 2x Big/idleRightside{i}_2xbig.png")
            self.idleRightImages.append(image)
        for i in range(4):
            image = Image(Point(self.x, self.y),
                          f"Assets/Characters/Player/Overworld Sprites/unorganized sprites/Walk Left 2x Big/idleLeftside{i}_2xbig.png")
            self.idleLeftImages.append(image)

    def undrawImage(self):
        """Undraws the Image based on the direction the Player is facing as well as if the player is idle or running."""
        if self.facingLeft:  # If the player is facing left
            if self.idle:  # If the player is idle
                self.idleLeftImages[int(self.imageIndex)].undraw()
            else:  # If the player is moving
                self.runLeftImages[int(self.imageIndex)].undraw()
        else:  # If the player is facing right
            if self.idle:  # If the player is idle
                self.idleRightImages[int(self.imageIndex)].undraw()
            else:  # If the player is moving
                self.runRightImages[int(self.imageIndex)].undraw()

    def drawImage(self):
        """Draws the Image based on the direction the Player is facing as well as if the player is idle or running."""
        if self.facingLeft:  # If the player is facing left
            if self.idle:  # If the player is idle
                self.idleLeftImages[int(self.imageIndex)].draw(self.window)
            else:  # If the player is moving
                self.runLeftImages[int(self.imageIndex)].draw(self.window)
        else:  # If the player is facing right
            if self.idle:  # If the player is idle
                self.idleRightImages[int(self.imageIndex)].draw(self.window)
            else:  # If the player is moving
                self.runRightImages[int(self.imageIndex)].draw(self.window)

    def movePlayer(self):
        """Moves the player based off of keyboard input."""
        keys = self.window.checkKeys()
        speed = self.__speed

        # If the image index ever goes over four reset it to zero since there are only four images in each list.
        if self.imageIndex >= 3:
            self.imageIndex = 0

        # if "space" in keys:
        #     speed *= 2

        # Trying to go left
        if "a" in keys or "Left" in keys:
            # If currently facing left
            if self.facingLeft:
                self.imageIndex += 1
            # If currently facing right
            else:
                self.facingLeft = True
                self.imageIndex = 0
            self.x -= speed
            self.idle = False
            self.runLeftImages[int(self.imageIndex)].anchor.x = self.x

        # Trying to go right
        elif "d" in keys or "Right" in keys:
            if self.facingLeft:
                self.imageIndex = 0
                self.facingLeft = False
            else:
                self.imageIndex += 1
            self.x += speed
            self.idle = False
            self.runRightImages[int(self.imageIndex)].anchor.x = self.x

        # Not trying to run in either direction
        else:
            self.idle = True
            if self.facingLeft:
                self.idleLeftImages[int(self.imageIndex)].anchor.x = self.x
            else:
                self.idleRightImages[int(self.imageIndex)].anchor.x = self.x

    def update(self):
        """Updates the Player object."""
        self.undrawImage()
        self.movePlayer()
        self.drawImage()

    def repositionPlayer(self, newX):
        """Repositions the Player object."""
        # Changing the x coordinate of our Player object
        self.x = newX


class Level(object):
    """Level object"""
    def __init__(self, window):
        """Blueprints for Level object"""
        self.window = window
        self.backgrounds = []  # List that will contain all the background images (in order) for the level
        self.backgroundIndex = 0  # The index of the background image we are currently drawing from the list
        self.loadBackgrounds()

    def loadBackgrounds(self):
        """Loads all the backrounds for the level object"""
        for i in range(3):
            #                   Centering the background image in the window            Names of the files in the Folder
            bg = Image(Point(self.window.getWidth() // 2, self.window.getHeight() // 2),
                       f"Assets/Background/Background{i}.png")
            self.backgrounds.append(bg)  # Appending each of the images to the list

    def changeBackgroundIndex(self, newIndex):
        """Changes the backround index for Level object"""
        self.backgrounds[self.backgroundIndex].undraw()
        self.backgroundIndex = newIndex

    def update(self):
        """Updates level object"""
        self.backgrounds[self.backgroundIndex].undraw()
        self.backgrounds[self.backgroundIndex].draw(self.window)

    # def saveInformation(self):
    #     """Saves information to your computer"""
    #     info = open("coordinates.txt", "w")
    #     # info.write(f"info = [x = {}, y = {}, direction = {}, health = {}]")
    #     info.close()
    #
    # def loadInformation(self):
    #     """Loads information from your computer"""
    #     info = open("coordinates.txt", "r")
    #     info.close()


# class FightingPortionOfGameFinallyYay(object):
#     def __init__(self, window):
#         self.window = window
#         self.transitionImages = []
#         self.transitionMusic = simpleaudio.WaveObject.from_wave_file("Assets/fightingMenu/Transition/Transition/BeepBox-Song9999.wav")
#         self.didTransition = 0
# self.transitionPlay = self.transitionMusic.play()

# def loadImages(self):
#     if self.didTransition == 0:
#         for i in range(25):
#             image = Image(Point(self.window.getWidth() // 2, self.window.getHeight() // 2), f"Assets/fightingMenu/Transition/Transition/New Piskel/sprite_{i}.png")
#             self.transitionImages.append(image)  # Appending each of the images to the list
#     else:
#         pass
#
# def transition(self):
#     if self.didTransition == 0:
#         transitionPlay = self.transitionMusic.play()
#         for i in range(25):
#             self.transitionImages[i].undraw()
#             self.transitionImages[i].draw(self.window)
#             time.sleep(.1)
#             self.didTransition += 1
#             print(self.didTransition)
#     else:
#         pass

class Menu:
    """The menu class creates the actual menu"""
    def __init__(self, window, enemy):
        """Blucprints for Menu class"""
        self.window = window
        self.enemy = enemy
        # Store all the images for the Menu in a list
        self.menu = Image(Point(self.window.getWidth() // 2, self.window.getHeight() // 2),
                          "Assets/fightingMenu/Fighting Menu/Actual Menu/fightingMenu_4xbig-1.png (1).png")
        self.playerHP5 = Image(Point(100, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Player/player0HP (1)/sprite_0.png")
        self.playerHP4 = Image(Point(100, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Player/player0HP (1)/sprite_1.png")
        self.playerHP3 = Image(Point(100, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Player/player0HP (1)/sprite_2.png")
        self.playerHP2 = Image(Point(100, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Player/player0HP (1)/sprite_3.png")
        self.playerHP1 = Image(Point(100, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Player/player0HP (1)/sprite_4.png")
        self.playerHP0 = Image(Point(100, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Player/player0HP (1)/sprite_5.png")
        self.player = Image(Point(250, 375), "Assets/Characters/Player/Battle Sprites/4xBig/Tesla_All_4xbig.png")

        # if self.enemy == 1:
        self.enemy1HP5 = Image(Point(900, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy1/Enemy10HP (1)/sprite_0.png")
        self.enemy1HP4 = Image(Point(900, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy1/Enemy10HP (1)/sprite_1.png")
        self.enemy1HP3 = Image(Point(900, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy1/Enemy10HP (1)/sprite_2.png")
        self.enemy1HP2 = Image(Point(900, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy1/Enemy10HP (1)/sprite_3.png")
        self.enemy1HP1 = Image(Point(900, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy1/Enemy10HP (1)/sprite_4.png")
        self.enemy1HP0 = Image(Point(900, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy1/Enemy10HP (1)/sprite_5.png")
        self.enemy1 = Image(Point(750, 375), "Assets/Characters/Enemy1/Battle Sprites/2xbig/Nitronion_All_4xbig.png")
        # elif self.enemy == 2:
        self.enemy2HP5 = Image(Point(900, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy2/ezgif/sprite_5.png")
        self.enemy2HP4 = Image(Point(900, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy2/ezgif/sprite_4.png")
        self.enemy2HP3 = Image(Point(900, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy2/ezgif/sprite_3.png")
        self.enemy2HP2 = Image(Point(900, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy2/ezgif/sprite_2.png")
        self.enemy2HP1 = Image(Point(900, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy2/ezgif/sprite_1.png")
        self.enemy2HP0 = Image(Point(900, 650),
                               "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy2/ezgif/sprite_0.png")
        self.enemy2 = Image(Point(750, 375), "Assets/Characters/Enemy2/Battle Sprites/xScizor.png")
        # elif self.enemy == "player":
        self.player2HP5 = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Player2/sprite_5.png")
        self.player2HP4 = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Player2/sprite_4.png")
        self.player2HP3 = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Player2/sprite_3.png")
        self.player2HP2 = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Player2/sprite_2.png")
        self.player2HP1 = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Player2/sprite_1.png")
        self.player2HP0 = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Player2/sprite_0.png")
        self.player2 = Image(Point(750, 375), "Assets/Characters/Player/Battle Sprites/4xBig/player2.png")
        self.upgradeBox = Image(Point(345, 598), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_14.png")
        self.attackBox = Image(Point(655, 598), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_02.png")
        self.blockBox = Image(Point(655, 718), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_08.png")
        self.healBox = Image(Point(345, 718), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_12.png")

        self.upgradeBoxSelected = Image(Point(345, 598),
                                        "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_15.png")
        self.attackBoxSelected = Image(Point(655, 598),
                                       "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_03.png")
        self.blockBoxSelected = Image(Point(655, 718),
                                      "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_09.png")
        self.healBoxSelected = Image(Point(345, 718), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_13.png")

        self.backBox = Image(Point(345, 598), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_04.png")
        self.attackPlusBox = Image(Point(655, 598), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_00.png")
        self.blockPlusBox = Image(Point(655, 718), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_06.png")
        self.healPlusBox = Image(Point(345, 718), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_10.png")

        self.backBoxSelected = Image(Point(345, 598), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_05.png")
        self.attackPlusBoxSelected = Image(Point(655, 598),
                                           "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_01.png")
        self.blockPlusBoxSelected = Image(Point(655, 718),
                                          "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_07.png")
        self.healPlusBoxSelected = Image(Point(345, 718),
                                         "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_11.png")

        self.firstClick = True
        self.startMenu = True

    def undoUndraw(self):
        """Undos the menu being undrawn"""
        self.startMenu = True
        if self.enemy == 1:
            self.enemy = 2

    def undoUndraw2(self):
        """Undos the menu being undrawn again"""
        self.startMenu = True
        if self.enemy == 2:
            self.enemy = "player"

    def dead(self):
        """Determines of you are dead"""
        self.startMenu = False
        death = True

    def checkIfEnemyDead(self):
        """Checks if the enemy is dead"""
        global upgradeCoins, upgradeCoin, said
        if enemy1Health <= 0 and self.enemy == 1:
            global health
            self.menu.undraw()
            self.player.undraw()
            self.menu.draw(self.window)
            self.player.draw(self.window)
            self.startMenu = False
            self.playerHP0.undraw()
            self.playerHP1.undraw()
            self.playerHP2.undraw()
            self.playerHP3.undraw()
            self.playerHP4.undraw()
            self.playerHP5.undraw()
            self.playerHP0.draw(self.window)
            self.menu.undraw()
            self.healBox.undraw()
            self.blockBox.undraw()
            self.upgradeBox.undraw()
            self.attackBox.undraw()
            self.backBox.undraw()
            self.attackPlusBox.undraw()
            self.blockPlusBox.undraw()
            self.healPlusBox.undraw()
            self.healBoxSelected.undraw()
            self.blockBoxSelected.undraw()
            self.upgradeBoxSelected.undraw()
            self.attackBoxSelected.undraw()
            self.healPlusBoxSelected.undraw()
            self.blockPlusBoxSelected.undraw()
            self.backBoxSelected.undraw()
            self.attackPlusBoxSelected.undraw()
            self.playerHP0.undraw()
            self.playerHP1.undraw()
            self.playerHP2.undraw()
            self.playerHP3.undraw()
            self.playerHP4.undraw()
            self.playerHP5.undraw()
            self.enemy1HP0.undraw()
            self.enemy1HP1.undraw()
            self.enemy1HP2.undraw()
            self.enemy1HP3.undraw()
            self.enemy1HP4.undraw()
            self.enemy1HP5.undraw()
            self.enemy1.undraw()
            self.player.undraw()
            if upgradeCoin == 0:
                upgradeCoins += 4
                upgradeCoin = 1
            if said == 0:
                print("You killed the first enemy... two remain.")
                said = 1
            return True

    def checkIfEnemy2Dead(self):
        """Checks if the enemy is dead"""
        global upgradeCoins, upgradeCoin, said
        if enemy2Health <= 0 and self.enemy == 2:
            self.menu.undraw()
            self.player.undraw()
            self.menu.draw(self.window)
            self.player.draw(self.window)
            self.startMenu = False
            self.playerHP0.undraw()
            self.playerHP1.undraw()
            self.playerHP2.undraw()
            self.playerHP3.undraw()
            self.playerHP4.undraw()
            self.playerHP5.undraw()
            self.playerHP0.draw(self.window)
            self.menu.undraw()
            self.healBox.undraw()
            self.blockBox.undraw()
            self.upgradeBox.undraw()
            self.attackBox.undraw()
            self.backBox.undraw()
            self.attackPlusBox.undraw()
            self.blockPlusBox.undraw()
            self.healPlusBox.undraw()
            self.healBoxSelected.undraw()
            self.blockBoxSelected.undraw()
            self.upgradeBoxSelected.undraw()
            self.attackBoxSelected.undraw()
            self.healPlusBoxSelected.undraw()
            self.blockPlusBoxSelected.undraw()
            self.backBoxSelected.undraw()
            self.attackPlusBoxSelected.undraw()
            self.playerHP0.undraw()
            self.playerHP1.undraw()
            self.playerHP2.undraw()
            self.playerHP3.undraw()
            self.playerHP4.undraw()
            self.playerHP5.undraw()
            self.enemy2HP0.undraw()
            self.enemy2HP1.undraw()
            self.enemy2HP2.undraw()
            self.enemy2HP3.undraw()
            self.enemy2HP4.undraw()
            self.enemy2HP5.undraw()
            self.enemy2.undraw()
            self.player.undraw()
            if upgradeCoin == 1:
                upgradeCoins += 5
                upgradeCoin = 2
            if said == 1:
                print("You killed the second enemy... one remains.")
                said = 2
            return True

    def checkIfPlayer2Dead(self):
        """Checks if the enemy is dead"""
        global said, health
        if player2Health <= 0 and self.enemy == "player":
            self.menu.undraw()
            self.player.undraw()
            self.menu.draw(self.window)
            self.player.draw(self.window)
            self.startMenu = False
            self.playerHP0.undraw()
            self.playerHP1.undraw()
            self.playerHP2.undraw()
            self.playerHP3.undraw()
            self.playerHP4.undraw()
            self.playerHP5.undraw()
            self.playerHP0.draw(self.window)
            self.menu.undraw()
            self.healBox.undraw()
            self.blockBox.undraw()
            self.upgradeBox.undraw()
            self.attackBox.undraw()
            self.backBox.undraw()
            self.attackPlusBox.undraw()
            self.blockPlusBox.undraw()
            self.healPlusBox.undraw()
            self.healBoxSelected.undraw()
            self.blockBoxSelected.undraw()
            self.upgradeBoxSelected.undraw()
            self.attackBoxSelected.undraw()
            self.healPlusBoxSelected.undraw()
            self.blockPlusBoxSelected.undraw()
            self.backBoxSelected.undraw()
            self.attackPlusBoxSelected.undraw()
            self.playerHP0.undraw()
            self.playerHP1.undraw()
            self.playerHP2.undraw()
            self.playerHP3.undraw()
            self.playerHP4.undraw()
            self.playerHP5.undraw()
            self.player2HP0.undraw()
            self.player2HP1.undraw()
            self.player2HP2.undraw()
            self.player2HP3.undraw()
            self.player2HP4.undraw()
            self.player2HP5.undraw()
            self.player2.undraw()
            self.player.undraw()
            if said == 2:
                print("You killed the last enemy... none remain.")
                print("\n\n\n\n\n\n\n\n\n\nYou win!!!")
                said = "﷽"
            return True
        else:
            return False

    def getHealth(self):
        """Gets the player health"""
        return health

    def updateMenu(self):
        """Updates the menu"""
        self.window.setBackground("white")
        mouseCoords = self.window.getCurrentMouseLocation()
        # If we want to draw the startMenu
        global enemy1Health, enemy2Health, player2Health, health, tierHeal, limitHeal, death
        if self.startMenu and not death:
            # Undraw and draw the startMenu image
            self.menu.undraw()
            self.player.undraw()
            self.menu.draw(self.window)
            self.player.draw(self.window)
            if health >= 5:
                self.playerHP0.undraw()
                self.playerHP1.undraw()
                self.playerHP2.undraw()
                self.playerHP3.undraw()
                self.playerHP4.undraw()
                self.playerHP5.undraw()
                self.playerHP5.draw(self.window)
            elif health == 4:
                self.playerHP0.undraw()
                self.playerHP1.undraw()
                self.playerHP2.undraw()
                self.playerHP3.undraw()
                self.playerHP4.undraw()
                self.playerHP5.undraw()
                self.playerHP4.draw(self.window)
            elif health == 3:
                self.playerHP0.undraw()
                self.playerHP1.undraw()
                self.playerHP2.undraw()
                self.playerHP3.undraw()
                self.playerHP4.undraw()
                self.playerHP5.undraw()
                self.playerHP3.draw(self.window)
            elif health == 2:
                self.playerHP0.undraw()
                self.playerHP1.undraw()
                self.playerHP2.undraw()
                self.playerHP3.undraw()
                self.playerHP4.undraw()
                self.playerHP5.undraw()
                self.playerHP2.draw(self.window)
            elif health == 1:
                self.playerHP0.undraw()
                self.playerHP1.undraw()
                self.playerHP2.undraw()
                self.playerHP3.undraw()
                self.playerHP4.undraw()
                self.playerHP5.undraw()
                self.playerHP1.draw(self.window)
            elif health <= 0:
                self.startMenu = False
                self.menu.undraw()
                self.player.undraw()
                self.menu.draw(self.window)
                self.player.draw(self.window)
                finalImage = Image(Point(self.window.getWidth() // 2, self.window.getHeight() // 2), "Assets/fightingMenu/Transition/Transition/New Piskel/sprite_25.png")
                finalImage.draw(self.window)
                print("You died.")
                death = True
                time.sleep(999999)
            if self.enemy == "player":
                self.player2.undraw()
                self.player2.draw(self.window)
                if player2Health >= 41:
                    self.player2HP0.undraw()
                    self.player2HP1.undraw()
                    self.player2HP2.undraw()
                    self.player2HP3.undraw()
                    self.player2HP4.undraw()
                    self.player2HP5.undraw()
                    self.player2HP5.draw(self.window)
                elif player2Health == 31 or player2Health == 32 or player2Health == 33 or player2Health == 34 or player2Health == 35 or player2Health == 36 or player2Health == 37 or player2Health == 38 or player2Health == 39 or player2Health == 40:
                    self.player2HP0.undraw()
                    self.player2HP1.undraw()
                    self.player2HP2.undraw()
                    self.player2HP3.undraw()
                    self.player2HP4.undraw()
                    self.player2HP5.undraw()
                    self.player2HP4.draw(self.window)
                elif player2Health == 21 or player2Health == 22 or player2Health == 23 or player2Health == 24 or player2Health == 25 or player2Health == 26 or player2Health == 27 or player2Health == 28 or player2Health == 29 or player2Health == 30:
                    self.player2HP0.undraw()
                    self.player2HP1.undraw()
                    self.player2HP2.undraw()
                    self.player2HP3.undraw()
                    self.player2HP4.undraw()
                    self.player2HP5.undraw()
                    self.player2HP3.draw(self.window)
                elif player2Health == 11 or player2Health == 12 or player2Health == 13 or player2Health == 14 or player2Health == 15 or player2Health == 16 or player2Health == 17 or player2Health == 18 or player2Health == 19 or player2Health == 20:
                    self.player2HP0.undraw()
                    self.player2HP1.undraw()
                    self.player2HP2.undraw()
                    self.player2HP3.undraw()
                    self.player2HP4.undraw()
                    self.player2HP5.undraw()
                    self.player2HP2.draw(self.window)
                elif player2Health == 1 or player2Health == 2 or player2Health == 3 or player2Health == 4 or player2Health == 5 or player2Health == 6 or player2Health == 7 or player2Health == 8 or player2Health == 9 or player2Health == 10:
                    self.player2HP0.undraw()
                    self.player2HP1.undraw()
                    self.player2HP2.undraw()
                    self.player2HP3.undraw()
                    self.player2HP4.undraw()
                    self.player2HP5.undraw()
                    self.player2HP1.draw(self.window)
                elif player2Health <= 0:
                    self.player2HP0.undraw()
                    self.player2HP1.undraw()
                    self.player2HP2.undraw()
                    self.player2HP3.undraw()
                    self.player2HP4.undraw()
                    self.player2HP5.undraw()
                    self.player2HP0.draw(self.window)
            if self.enemy == 2:
                self.enemy2.undraw()
                self.enemy2.draw(self.window)
                if enemy2Health > 12:
                    self.enemy2HP0.undraw()
                    self.enemy2HP1.undraw()
                    self.enemy2HP2.undraw()
                    self.enemy2HP3.undraw()
                    self.enemy2HP4.undraw()
                    self.enemy2HP5.undraw()
                    self.enemy2HP5.draw(self.window)
                elif enemy2Health == 10 or enemy2Health == 11 or enemy2Health == 12:
                    self.enemy2HP0.undraw()
                    self.enemy2HP1.undraw()
                    self.enemy2HP2.undraw()
                    self.enemy2HP3.undraw()
                    self.enemy2HP4.undraw()
                    self.enemy2HP5.undraw()
                    self.enemy2HP4.draw(self.window)
                elif enemy2Health == 7 or enemy2Health == 8 or enemy2Health == 9:
                    self.enemy2HP0.undraw()
                    self.enemy2HP1.undraw()
                    self.enemy2HP2.undraw()
                    self.enemy2HP3.undraw()
                    self.enemy2HP4.undraw()
                    self.enemy2HP5.undraw()
                    self.enemy2HP3.draw(self.window)
                elif enemy2Health == 4 or enemy2Health == 5 or enemy2Health == 6:
                    self.enemy2HP0.undraw()
                    self.enemy2HP1.undraw()
                    self.enemy2HP2.undraw()
                    self.enemy2HP3.undraw()
                    self.enemy2HP4.undraw()
                    self.enemy2HP5.undraw()
                    self.enemy2HP2.draw(self.window)
                elif enemy2Health == 1 or enemy2Health == 2 or enemy2Health == 3:
                    self.enemy2HP0.undraw()
                    self.enemy2HP1.undraw()
                    self.enemy2HP2.undraw()
                    self.enemy2HP3.undraw()
                    self.enemy2HP4.undraw()
                    self.enemy2HP5.undraw()
                    self.enemy2HP1.draw(self.window)
                elif enemy2Health <= 0:
                    self.enemy2HP0.undraw()
                    self.enemy2HP1.undraw()
                    self.enemy2HP2.undraw()
                    self.enemy2HP3.undraw()
                    self.enemy2HP4.undraw()
                    self.enemy2HP5.undraw()
                    self.enemy2HP0.draw(self.window)

            if self.enemy == 1:
                self.enemy1.undraw()
                self.enemy1.draw(self.window)
                if enemy1Health >= 5:
                    self.enemy1HP0.undraw()
                    self.enemy1HP1.undraw()
                    self.enemy1HP2.undraw()
                    self.enemy1HP3.undraw()
                    self.enemy1HP4.undraw()
                    self.enemy1HP5.undraw()
                    self.enemy1HP5.draw(self.window)
                elif enemy1Health == 4:
                    self.enemy1HP0.undraw()
                    self.enemy1HP1.undraw()
                    self.enemy1HP2.undraw()
                    self.enemy1HP3.undraw()
                    self.enemy1HP4.undraw()
                    self.enemy1HP5.undraw()
                    self.enemy1HP4.draw(self.window)
                elif enemy1Health == 3:
                    self.enemy1HP0.undraw()
                    self.enemy1HP1.undraw()
                    self.enemy1HP2.undraw()
                    self.enemy1HP3.undraw()
                    self.enemy1HP4.undraw()
                    self.enemy1HP5.undraw()
                    self.enemy1HP3.draw(self.window)
                elif enemy1Health == 2:
                    self.enemy1HP0.undraw()
                    self.enemy1HP1.undraw()
                    self.enemy1HP2.undraw()
                    self.enemy1HP3.undraw()
                    self.enemy1HP4.undraw()
                    self.enemy1HP5.undraw()
                    self.enemy1HP2.draw(self.window)
                elif enemy1Health == 1:
                    self.enemy1HP0.undraw()
                    self.enemy1HP1.undraw()
                    self.enemy1HP2.undraw()
                    self.enemy1HP3.undraw()
                    self.enemy1HP4.undraw()
                    self.enemy1HP5.undraw()
                    self.enemy1HP1.draw(self.window)
                elif enemy1Health <= 0:
                    self.enemy1HP0.undraw()
                    self.enemy1HP1.undraw()
                    self.enemy1HP2.undraw()
                    self.enemy1HP3.undraw()
                    self.enemy1HP4.undraw()
                    self.enemy1HP5.undraw()
                    self.enemy1HP0.draw(self.window)

            if not upgrade:
                # Undraw old image
                self.backBox.undraw()
                self.attackPlusBox.undraw()
                self.blockPlusBox.undraw()
                self.healPlusBox.undraw()
                # Undraw pesky mouse effect
                self.healPlusBoxSelected.undraw()
                self.blockPlusBoxSelected.undraw()
                self.backBoxSelected.undraw()
                self.attackPlusBoxSelected.undraw()
                # Undraw the image
                self.upgradeBox.undraw()
                self.attackBox.undraw()
                self.blockBox.undraw()
                self.healBox.undraw()
                # Undraw Mouse collision image
                if Image.testCollision_ImageVsPoint(self.upgradeBox, mouseCoords):
                    self.upgradeBoxSelected.undraw()
                if Image.testCollision_ImageVsPoint(self.attackBox, mouseCoords):
                    self.attackBoxSelected.undraw()
                if Image.testCollision_ImageVsPoint(self.blockBox, mouseCoords):
                    self.blockBoxSelected.undraw()
                if Image.testCollision_ImageVsPoint(self.healBox, mouseCoords):
                    self.healBoxSelected.undraw()
                # Undraw Mouse collision image if mouse is not on it
                if not Image.testCollision_ImageVsPoint(self.upgradeBox, mouseCoords) or upgrade:
                    self.upgradeBoxSelected.undraw()
                if not Image.testCollision_ImageVsPoint(self.attackBox, mouseCoords) or upgrade:
                    self.attackBoxSelected.undraw()
                if not Image.testCollision_ImageVsPoint(self.blockBox, mouseCoords) or upgrade:
                    self.blockBoxSelected.undraw()
                if not Image.testCollision_ImageVsPoint(self.healBox, mouseCoords) or upgrade:
                    self.healBoxSelected.undraw()
                # Draw the image
                self.upgradeBox.draw(self.window)
                self.attackBox.draw(self.window)
                self.blockBox.draw(self.window)
                self.healBox.draw(self.window)
                # Draw Mouse collision
                if Image.testCollision_ImageVsPoint(self.upgradeBox, mouseCoords) or upgrade:
                    self.upgradeBoxSelected.draw(self.window)
                if Image.testCollision_ImageVsPoint(self.attackBox, mouseCoords) or upgrade:
                    self.attackBoxSelected.draw(self.window)
                if Image.testCollision_ImageVsPoint(self.blockBox, mouseCoords) or upgrade:
                    self.blockBoxSelected.draw(self.window)
                if Image.testCollision_ImageVsPoint(self.healBox, mouseCoords) or upgrade:
                    self.healBoxSelected.draw(self.window)
            if upgrade:
                # Undraw old image
                self.healBox.undraw()
                self.blockBox.undraw()
                self.upgradeBox.undraw()
                self.attackBox.undraw()
                # Undraw pesky mouse effect
                self.healBoxSelected.undraw()
                self.blockBoxSelected.undraw()
                self.upgradeBoxSelected.undraw()
                self.attackBoxSelected.undraw()
                # Undraw the image
                self.backBox.undraw()
                self.attackPlusBox.undraw()
                self.blockPlusBox.undraw()
                self.healPlusBox.undraw()
                # Undraw Mouse collision image
                if Image.testCollision_ImageVsPoint(self.backBox, mouseCoords):
                    self.backBoxSelected.undraw()
                if Image.testCollision_ImageVsPoint(self.attackPlusBox, mouseCoords):
                    self.attackPlusBoxSelected.undraw()
                if Image.testCollision_ImageVsPoint(self.blockPlusBox, mouseCoords):
                    self.blockPlusBoxSelected.undraw()
                if Image.testCollision_ImageVsPoint(self.healPlusBox, mouseCoords):
                    self.healPlusBoxSelected.undraw()
                # Undraw Mouse collision image if mouse is not on it
                if not Image.testCollision_ImageVsPoint(self.backBox, mouseCoords) or not upgrade:
                    self.backBoxSelected.undraw()
                if not Image.testCollision_ImageVsPoint(self.attackPlusBox, mouseCoords) or not upgrade:
                    self.attackPlusBoxSelected.undraw()
                if not Image.testCollision_ImageVsPoint(self.blockPlusBox, mouseCoords) or not upgrade:
                    self.blockPlusBoxSelected.undraw()
                if not Image.testCollision_ImageVsPoint(self.healPlusBox, mouseCoords) or not upgrade:
                    self.healPlusBoxSelected.undraw()
                # Draw the image
                self.backBox.draw(self.window)
                self.attackPlusBox.draw(self.window)
                self.blockPlusBox.draw(self.window)
                self.healPlusBox.draw(self.window)
                # Draw Mouse collision
                if Image.testCollision_ImageVsPoint(self.backBox, mouseCoords) or not upgrade:
                    self.backBoxSelected.draw(self.window)
                if Image.testCollision_ImageVsPoint(self.attackPlusBox, mouseCoords) or not upgrade:
                    self.attackPlusBoxSelected.draw(self.window)
                if Image.testCollision_ImageVsPoint(self.blockPlusBox, mouseCoords) or not upgrade:
                    self.blockPlusBoxSelected.draw(self.window)
                if Image.testCollision_ImageVsPoint(self.healPlusBox, mouseCoords) or not upgrade:
                    self.healPlusBoxSelected.draw(self.window)

        self.testCollision()

    def testCollision(self):
        """Test is mouse is over button"""
        mouse = self.window.getCurrentMouseLocation()
        global upgrade, upgradeAttack, tierAttack, enemy1Health, enemy2Health, player2Health, damage, health, tierHeal, limitHeal, upgradeCoins, death

        if self.window.mousePressed and self.firstClick and not death:
            self.firstClick = False
            if self.startMenu:
                global enemyTurn
                # If the mouse is colliding with the start button
                if not upgrade:
                    if Image.testCollision_ImageVsPoint(self.upgradeBox, mouse):  # Upgrade
                        print(f"You have {upgradeCoins} upgrades left.")
                        upgrade = True
                    elif Image.testCollision_ImageVsPoint(self.attackBox, mouse):  # Attack
                        if not upgradeAttack:
                            damageDone = 1
                            if self.enemy == 1:
                                enemy1Health -= damageDone
                            elif self.enemy == 2:
                                enemy2Health -= damageDone
                            elif self.enemy == "player":
                                player2Health -= damageDone
                            print(f"You dealt {damageDone} damage")
                            if self.enemy == 1 and enemy1Health > 0:
                                enemyTurn = True
                            elif self.enemy == 2 and enemy2Health > 0:
                                enemyTurn = True
                            elif self.enemy == "player" and player2Health > 0:
                                enemyTurn = True
                            else:
                                enemyTurn = False
                        elif upgradeAttack:
                            damageDone = random.randrange(1, damage)
                            if self.enemy == 1:
                                enemy1Health -= damageDone
                            elif self.enemy == 2:
                                enemy2Health -= damageDone
                            elif self.enemy == "player":
                                player2Health -= damageDone
                            print(f"You dealt {damageDone} damage")
                            if self.enemy == 1 and enemy1Health > 0:
                                enemyTurn = True
                            elif self.enemy == 2 and enemy2Health > 0:
                                enemyTurn = True
                            elif self.enemy == "player" and player2Health > 0:
                                enemyTurn = True
                            else:
                                enemyTurn = False
                    elif Image.testCollision_ImageVsPoint(self.blockBox, mouse):  # Block
                        global blockBonus
                        blockBonus += 1
                        print(
                            f"You block, and will now reduce damage every turn, but beware the enemy will increase his attack if its not successful.")
                        if self.enemy == 1 and enemy1Health > 0:
                            enemyTurn = True
                        elif self.enemy == 2 and enemy2Health > 0:
                            enemyTurn = True
                        elif self.enemy == "player" and player2Health > 0:
                            enemyTurn = True
                        else:
                            enemyTurn = False
                    elif Image.testCollision_ImageVsPoint(self.healBox, mouse):  # Heal
                        if limitHeal > 0:
                            if health >= 5:
                                if tierHeal == 1:
                                    limitHeal -= 1
                                    health += 1
                                    print(
                                        f"You healed 1 health, you now have {health} health, and you now have {limitHeal} heals remaining.")
                                elif tierHeal > 1:
                                    limitHeal -= 1
                                    randomHeal = random.randrange(1, tierHeal)
                                    health += randomHeal
                                    print(
                                        f"You healed {randomHeal} health, you now have {health} health, and you now have {limitHeal} heals remaining.")

                            elif tierHeal == 1:
                                health += 1
                                limitHeal -= 1
                                print(
                                    f"You healed 1 health, you now have {health} health, and you now have {limitHeal} heals remaining.")
                            elif tierHeal > 1:
                                randomHeal = random.randrange(1, tierHeal)
                                health += randomHeal
                                limitHeal -= 1
                                print(
                                    f"You healed {randomHeal} health, you now have {health} health, and you now have {limitHeal} heals remaining.")
                        else:
                            print(f"Sorry, you are out of heals, but at least you have have {health} health")
                            enemyTurn = False

                    if enemyTurn:
                        global enemyDamageDone, maxPlayer2, maxEnemy2, maxEnemy1
                        if self.enemy == "player":
                            enemyDamageDone = random.randrange(3, maxPlayer2)
                        if self.enemy == 2:
                            enemyDamageDone = random.randrange(1, maxEnemy2)
                        if self.enemy == maxEnemy1:
                            enemyDamageDone = 1
                        if enemyDamageDone - blockBonus <= 0:  # Block bonus is the amount of damage reduced
                            if self.enemy == "player" and player2Health > 0:
                                player2Health -= 1
                                enemyDamageDone = 0
                                maxPlayer2 += 3
                                print(
                                    f"The enemy takes a swing at you and does damage to himself, you take no damage, but the enemy is smarter that that...")
                            if self.enemy == 2 and enemy2Health > 0:
                                enemy2Health -= 1
                                enemyDamageDone = 0
                                maxEnemy2 += 2
                                print(
                                    f"The enemy takes a swing at you and does damage to himself, you take no damage, but the enemy is smarter that that...")
                            if self.enemy == 1 and enemy1Health > 0:
                                enemy1Health -= 1
                                enemyDamageDone = 0
                                maxEnemy1 += 1
                                print(
                                    f"The enemy takes a swing at you and does damage to himself, you take no damage, but the enemy is smarter that that...")
                        else:
                            print(f"The enemy takes a swing at you and does {enemyDamageDone} damage!")
                        health -= enemyDamageDone  # The health minus the enemys attack
                        if health <= 0:
                            self.startMenu = False
                            self.menu.undraw()
                            self.player.undraw()
                            self.menu.draw(self.window)
                            self.player.draw(self.window)
                            finalImage = Image(Point(self.window.getWidth() // 2, self.window.getHeight() // 2), "Assets/fightingMenu/Transition/Transition/New Piskel/sprite_25.png")
                            finalImage.draw(self.window)
                            print("You died.")
                            death = True
                            # time.sleep(999999)
                elif upgrade:  # If upgrade button clicked
                    if Image.testCollision_ImageVsPoint(self.backBox, mouse):  # Back
                        print(f"You have {upgradeCoins} upgrades left.")
                        upgrade = False
                    elif Image.testCollision_ImageVsPoint(self.attackPlusBox, mouse):  # Attack+
                        if upgradeCoins == 0:
                            print("You have no coins, try again later.")
                        else:
                            damage += 1
                            tierAttack += 1
                            upgradeAttack = True
                            upgradeCoins -= 1
                            print(f"Damage tier: {tierAttack + 1}")
                    elif Image.testCollision_ImageVsPoint(self.blockPlusBox, mouse):  # Block+
                        if upgradeCoins == 0:
                            print("You have no coins, try again later.")
                        else:
                            upgradeCoins -= 1
                            blockBonus += 1
                            print(f"Block tier:  {blockBonus}")
                    elif Image.testCollision_ImageVsPoint(self.healPlusBox, mouse):  # Heal+
                        if upgradeCoins == 0:
                            print("You have no coins, try again later.")
                        else:
                            upgradeCoins -= 1
                            tierHeal += 1
                            limitHeal += 1
                            print(f"Healing tier: {tierHeal}")

        elif not self.window.mousePressed and not self.firstClick:
            self.firstClick = True
