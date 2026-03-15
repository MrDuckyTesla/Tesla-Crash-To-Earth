# ====================================================================================================
# Program:  final_project_classes.py
# Author:  Nico Lamas
# Description:  Classes for final project
# Date Modified:  3/22/2022
# Version:  1.1.0
# ====================================================================================================
# Import Libraries
# from final_project_main import *
# from final_project_main import getMusic
from graphics import *
import simpleaudio
import random
# import time

# ====================================================================================================
# Global Variables
upgrade = False
damage = 1
upgradeAttack = False
tierAttack = 0
health = 500
lipHealth = 5
lazarHealth = 15
pythagoreanHealth = 25
vasinniHealth = 35
xScizorHealth = 45
player2Health = 55
tierHeal = 1
limitHeal = 3
upgradeCoins = 3
upgradeCoin = 0
# enemyTurn = False
blockBonus = 0
maxPlayer2 = 11
maxVasinni = 7
maxXScizor = 9
maxPythagorean = 5
maxLazar = 4
maxLip = 1
blockTier = 0
said = 0
death = False
saidDeath = False
block = False
musicFight = simpleaudio.WaveObject.from_wave_file("Assets/Music/Song_New/Song_New/Song_Fight_World1_short.wav")


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
        for i in range(6):
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

        self.vasinni5hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy1/Enemy10HP (1)/sprite_0.png")
        self.vasinni4hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy1/Enemy10HP (1)/sprite_1.png")
        self.vasinni3hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy1/Enemy10HP (1)/sprite_2.png")
        self.vasinni2hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy1/Enemy10HP (1)/sprite_3.png")
        self.vasinni1hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy1/Enemy10HP (1)/sprite_4.png")
        self.vasinni0hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy1/Enemy10HP (1)/sprite_5.png")
        self.vasinni = Image(Point(750, 375), "Assets/Characters/Enemy1/Battle Sprites/2xbig/Nitronion_All_4xbig.png")

        self.xScizor5hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy2/ezgif/sprite_5.png")
        self.xScizor4hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy2/ezgif/sprite_4.png")
        self.xScizor3hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy2/ezgif/sprite_3.png")
        self.xScizor2hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy2/ezgif/sprite_2.png")
        self.xScizor1hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy2/ezgif/sprite_1.png")
        self.xScizor0hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy2/ezgif/sprite_0.png")
        self.xScizor = Image(Point(750, 375), "Assets/Characters/Enemy2/Battle Sprites/xScizor.png")

        self.pythagorean5hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy4/sprite_0.png")
        self.pythagorean4hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy4/sprite_1.png")
        self.pythagorean3hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy4/sprite_2.png")
        self.pythagorean2hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy4/sprite_3.png")
        self.pythagorean1hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy4/sprite_4.png")
        self.pythagorean0hp = Image(Point(900, 650), "Assets/fightingMenu/Fighting Menu/Health Bars/Enemy4/sprite_5.png")
        self.pythagorean = Image(Point(750, 375), "Assets/Characters/Enemy3/enemy3-1.png.png")

        self.lip = Image(Point(750, 355), "Assets/Characters/Enemy6/enemy.png")
        self.lip5hp = Image(Point(900, 650), "Assets/Characters/Enemy6/sprite_0.png")
        self.lip4hp = Image(Point(900, 650), "Assets/Characters/Enemy6/sprite_1.png")
        self.lip3hp = Image(Point(900, 650), "Assets/Characters/Enemy6/sprite_2.png")
        self.lip2hp = Image(Point(900, 650), "Assets/Characters/Enemy6/sprite_3.png")
        self.lip1hp = Image(Point(900, 650), "Assets/Characters/Enemy6/sprite_4.png")
        self.lip0hp = Image(Point(900, 650), "Assets/Characters/Enemy6/sprite_5.png")

        self.lazar = Image(Point(750, 350), "Assets/Characters/Enemy5/enemy.png")
        self.lazar5hp = Image(Point(900, 650), "Assets/Characters/Enemy5/sprite_0.png")
        self.lazar4hp = Image(Point(900, 650), "Assets/Characters/Enemy5/sprite_1.png")
        self.lazar3hp = Image(Point(900, 650), "Assets/Characters/Enemy5/sprite_2.png")
        self.lazar2hp = Image(Point(900, 650), "Assets/Characters/Enemy5/sprite_3.png")
        self.lazar1hp = Image(Point(900, 650), "Assets/Characters/Enemy5/sprite_4.png")
        self.lazar0hp = Image(Point(900, 650), "Assets/Characters/Enemy5/sprite_5.png")

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
        self.upgradeBoxSelected = Image(Point(345, 598), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_15.png")
        self.attackBoxSelected = Image(Point(655, 598), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_03.png")
        self.blockBoxSelected = Image(Point(655, 718), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_09.png")
        self.healBoxSelected = Image(Point(345, 718), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_13.png")
        self.backBox = Image(Point(345, 598), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_04.png")
        self.attackPlusBox = Image(Point(655, 598), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_00.png")
        self.blockPlusBox = Image(Point(655, 718), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_06.png")
        self.healPlusBox = Image(Point(345, 718), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_10.png")
        self.backBoxSelected = Image(Point(345, 598), "Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_05.png")
        self.attackPlusBoxSelected = Image(Point(655, 598),"Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_01.png")
        self.blockPlusBoxSelected = Image(Point(655, 718),"Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_07.png")
        self.healPlusBoxSelected = Image(Point(345, 718),"Assets/fightingMenu/Fighting Menu/Buttons/working/sprite_11.png")

        self.firstClick = True
        self.startMenu = True

    def undoUndraw(self):
        """Undos the menu being undrawn"""
        if not self.startMenu:
            self.startMenu = True
            if self.enemy == 1:
                self.enemy = 2
            elif self.enemy == 2:
                self.enemy = 3
            elif self.enemy == 3:
                self.enemy = 4
            elif self.enemy == 4:
                self.enemy = 5
            elif self.enemy == 5:
                self.enemy = 6
            elif self.enemy == 6:
                self.enemy = 7

    def dead(self):
        """Determines of you are dead"""
        global death, health
        if health <= 0:
            return True
        # self.startMenu = False
        # death = True

    def checkIfLipDead(self):
        """Checks if the enemy is dead"""
        global upgradeCoins, upgradeCoin, said
        if lipHealth <= 0 and self.enemy == 1:
            global health
            # self.menu.undraw()
            # self.player.undraw()
            # self.menu.draw(self.window)
            # self.player.draw(self.window)
            self.startMenu = False
            # self.playerHP0.undraw()
            # self.playerHP1.undraw()
            # self.playerHP2.undraw()
            # self.playerHP3.undraw()
            # self.playerHP4.undraw()
            # self.playerHP5.undraw()
            # self.playerHP0.draw(self.window)
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
            self.lip0hp.undraw()
            self.lip1hp.undraw()
            self.lip2hp.undraw()
            self.lip3hp.undraw()
            self.lip4hp.undraw()
            self.lip5hp.undraw()
            self.lip.undraw()
            self.player.undraw()
            if upgradeCoin == 0:
                upgradeCoins += 4
                upgradeCoin = 1
            if said == 0:
                print("You killed the first enemy... five remain.")
                said = 1
            return True

    def checkIfLazarDead(self):
        """Checks if the enemy is dead"""
        global upgradeCoins, upgradeCoin, said
        if lazarHealth <= 0 and self.enemy == 2:
            # self.menu.undraw()
            # self.player.undraw()
            # self.menu.draw(self.window)
            # self.player.draw(self.window)
            self.startMenu = False
            # self.playerHP0.undraw()
            # self.playerHP1.undraw()
            # self.playerHP2.undraw()
            # self.playerHP3.undraw()
            # self.playerHP4.undraw()
            # self.playerHP5.undraw()
            # self.playerHP0.draw(self.window)
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
            self.lazar0hp.undraw()
            self.lazar1hp.undraw()
            self.lazar2hp.undraw()
            self.lazar3hp.undraw()
            self.lazar4hp.undraw()
            self.lazar5hp.undraw()
            self.lazar.undraw()
            self.player.undraw()
            if upgradeCoin == 1:
                upgradeCoins += 5
                upgradeCoin = 2
            if said == 1:
                print("You killed the second enemy... four remain.")
                said = 2
            return True

    def checkIfPythagoreanDead(self):
        """Checks if the enemy is dead"""
        global said, health, death, upgradeCoin, upgradeCoins
        if pythagoreanHealth <= 0 and self.enemy == 3:
            # self.menu.undraw()
            # self.player.undraw()
            # self.menu.draw(self.window)
            # self.player.draw(self.window)
            self.startMenu = False
            # self.playerHP0.undraw()
            # self.playerHP1.undraw()
            # self.playerHP2.undraw()
            # self.playerHP3.undraw()
            # self.playerHP4.undraw()
            # self.playerHP5.undraw()
            # self.playerHP0.draw(self.window)
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
            self.pythagorean.undraw()
            self.pythagorean5hp.undraw()
            self.pythagorean4hp.undraw()
            self.pythagorean3hp.undraw()
            self.pythagorean2hp.undraw()
            self.pythagorean1hp.undraw()
            self.pythagorean0hp.undraw()
            self.player.undraw()
            # death = True
            if upgradeCoin == 2:
                upgradeCoins += 6
                upgradeCoin = 3
            if said == 2:
                print("You killed the third enemy... three remain.")
                said = 3
            return True
        else:
            return False

    def checkIfVasinniDead(self):
        """Checks if the enemy is dead"""
        global said, health, death, upgradeCoins, upgradeCoin
        if vasinniHealth <= 0 and self.enemy == 4:
            # self.menu.undraw()
            # self.player.undraw()
            # self.menu.draw(self.window)
            # self.player.draw(self.window)
            self.startMenu = False
            # self.playerHP0.undraw()
            # self.playerHP1.undraw()
            # self.playerHP2.undraw()
            # self.playerHP3.undraw()
            # self.playerHP4.undraw()
            # self.playerHP5.undraw()
            # self.playerHP0.draw(self.window)
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
            self.vasinni0hp.undraw()
            self.vasinni1hp.undraw()
            self.vasinni2hp.undraw()
            self.vasinni3hp.undraw()
            self.vasinni4hp.undraw()
            self.vasinni5hp.undraw()
            self.vasinni.undraw()
            self.player.undraw()
            # death = True
            if upgradeCoin == 3:
                upgradeCoins += 7
                upgradeCoin = 4
            if said == 3:
                print("You killed the fourth enemy... two remain.")
                said = 4
            return True
        else:
            return False

    def checkIfXscizorDead(self):
        """Checks if the enemy is dead"""
        global said, health, death, upgradeCoin, upgradeCoins
        if xScizorHealth <= 0 and self.enemy == 5:
            # self.menu.undraw()
            # self.player.undraw()
            # self.menu.draw(self.window)
            # self.player.draw(self.window)
            self.startMenu = False
            # self.playerHP0.undraw()
            # self.playerHP1.undraw()
            # self.playerHP2.undraw()
            # self.playerHP3.undraw()
            # self.playerHP4.undraw()
            # self.playerHP5.undraw()
            # self.playerHP0.draw(self.window)
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
            self.xScizor0hp.undraw()
            self.xScizor1hp.undraw()
            self.xScizor2hp.undraw()
            self.xScizor3hp.undraw()
            self.xScizor4hp.undraw()
            self.xScizor5hp.undraw()
            self.xScizor.undraw()
            self.player.undraw()
            # death = True
            if upgradeCoin == 4:
                upgradeCoins += 8
                upgradeCoin = 5
            if said == 4:
                print("You killed the fifth enemy... one remains.")
                said = 5
            return True
        else:
            return False

    def checkIfPlayer2Dead(self):
        """Checks if the enemy is dead"""
        global said, health, death
        if player2Health <= 0 and self.enemy == 6:
            # self.menu.undraw()
            # self.player.undraw()
            # self.menu.draw(self.window)
            # self.player.draw(self.window)
            self.startMenu = False
            # self.playerHP0.undraw()
            # self.playerHP1.undraw()
            # self.playerHP2.undraw()
            # self.playerHP3.undraw()
            # self.playerHP4.undraw()
            # self.playerHP5.undraw()
            # self.playerHP0.draw(self.window)
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
            # death = True
            if said == 5:
                print("You killed the last enemy... none remain.")
                print("\n\n\n\n\n\n\n\n\n\nYou win!!!")
                said = 6
            return True
        else:
            return False

    def getHealth(self):
        """Gets the player health"""
        return health

    def updateMenu(self):
        """Updates the menu"""
        # print(bool(self.startMenu))
        # self.window.setBackground("white")
        mouseCoords = self.window.getCurrentMouseLocation()
        # If we want to draw the startMenu
        global lipHealth, lazarHealth, player2Health, health, tierHeal, limitHeal, death
        # print(death)
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
            elif 4 <= health <= 5:
                self.playerHP0.undraw()
                self.playerHP1.undraw()
                self.playerHP2.undraw()
                self.playerHP3.undraw()
                self.playerHP4.undraw()
                self.playerHP5.undraw()
                self.playerHP4.draw(self.window)
            elif 3 <= health <= 4:
                self.playerHP0.undraw()
                self.playerHP1.undraw()
                self.playerHP2.undraw()
                self.playerHP3.undraw()
                self.playerHP4.undraw()
                self.playerHP5.undraw()
                self.playerHP3.draw(self.window)
            elif 1 <= health <= 2:
                self.playerHP0.undraw()
                self.playerHP1.undraw()
                self.playerHP2.undraw()
                self.playerHP3.undraw()
                self.playerHP4.undraw()
                self.playerHP5.undraw()
                self.playerHP2.draw(self.window)
            elif 0 <= health <= 1:
                self.playerHP0.undraw()
                self.playerHP1.undraw()
                self.playerHP2.undraw()
                self.playerHP3.undraw()
                self.playerHP4.undraw()
                self.playerHP5.undraw()
                self.playerHP1.draw(self.window)
            elif health <= 0:
                death = True
                self.startMenu = False
                self.menu.undraw()
                self.player.undraw()
                self.player2HP0.undraw()
                self.player2HP1.undraw()
                self.player2HP2.undraw()
                self.player2HP3.undraw()
                self.player2HP4.undraw()
                self.player2HP5.undraw()
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
                self.player2HP0.undraw()
                self.player2HP1.undraw()
                self.player2HP2.undraw()
                self.player2HP3.undraw()
                self.player2HP4.undraw()
                self.player2HP5.undraw()
                self.player2.undraw()
                self.xScizor0hp.undraw()
                self.xScizor1hp.undraw()
                self.xScizor2hp.undraw()
                self.xScizor3hp.undraw()
                self.xScizor4hp.undraw()
                self.xScizor5hp.undraw()
                self.xScizor.undraw()
                self.player.undraw()
                self.vasinni0hp.undraw()
                self.vasinni1hp.undraw()
                self.vasinni2hp.undraw()
                self.vasinni3hp.undraw()
                self.vasinni4hp.undraw()
                self.vasinni5hp.undraw()
                self.vasinni.undraw()
                self.pythagorean0hp.undraw()
                self.pythagorean1hp.undraw()
                self.pythagorean2hp.undraw()
                self.pythagorean3hp.undraw()
                self.pythagorean4hp.undraw()
                self.pythagorean5hp.undraw()
                self.pythagorean.undraw()
                self.lazar0hp.undraw()
                self.lazar1hp.undraw()
                self.lazar2hp.undraw()
                self.lazar3hp.undraw()
                self.lazar4hp.undraw()
                self.lazar5hp.undraw()
                self.lazar.undraw()
                self.lip0hp.undraw()
                self.lip1hp.undraw()
                self.lip2hp.undraw()
                self.lip3hp.undraw()
                self.lip4hp.undraw()
                self.lip5hp.undraw()
                self.lip.undraw()
                self.menu.draw(self.window)
                self.player.draw(self.window)
                finalImage = Image(Point(self.window.getWidth() // 2, self.window.getHeight() // 2),
                                   "Assets/fightingMenu/Transition/Transition/New Piskel/sprite_25.png")
                deathImage = Image(Point(self.window.getWidth() // 2, self.window.getHeight() // 2), "Assets/deathScreen.png")
                self.startMenu = False
                # print(True)
                finalImage.undraw()
                deathImage.undraw()
                finalImage.draw(self.window)
                deathImage.draw(self.window)
                global saidDeath
                if not saidDeath:
                    print("You died.")
                    self.startMenu = False
                    death = True
                    # self.dead()
                    saidDeath = True
                    # finalImage.undraw()
                    # deathImage.undraw()
                    # finalImage.draw(self.window)
                    # deathImage.draw(self.window)

                    # from final_project_main import getMusic
                    # musicPlay4 = getMusic()
                    # if musicPlay4.is_playing():
                    #     musicPlay4.stop()
                    deathMusic = simpleaudio.WaveObject.from_wave_file("Assets/Music/Song_New/Song_New/loseSong.wav")
                    deathMusicPlay = deathMusic.play()
                # death = True
                # self.startMenu = False

            if self.enemy == 6 and self.startMenu:
                self.player2.undraw()
                self.player2.draw(self.window)
                if player2Health >= 55:
                    self.player2HP0.undraw()
                    self.player2HP1.undraw()
                    self.player2HP2.undraw()
                    self.player2HP3.undraw()
                    self.player2HP4.undraw()
                    self.player2HP5.undraw()
                    self.player2HP5.draw(self.window)
                elif 42 <= player2Health <= 55:
                    self.player2HP0.undraw()
                    self.player2HP1.undraw()
                    self.player2HP2.undraw()
                    self.player2HP3.undraw()
                    self.player2HP4.undraw()
                    self.player2HP5.undraw()
                    self.player2HP4.draw(self.window)
                elif 28 <= player2Health <= 42:
                    self.player2HP0.undraw()
                    self.player2HP1.undraw()
                    self.player2HP2.undraw()
                    self.player2HP3.undraw()
                    self.player2HP4.undraw()
                    self.player2HP5.undraw()
                    self.player2HP3.draw(self.window)
                elif 14 <= player2Health <= 28:
                    self.player2HP0.undraw()
                    self.player2HP1.undraw()
                    self.player2HP2.undraw()
                    self.player2HP3.undraw()
                    self.player2HP4.undraw()
                    self.player2HP5.undraw()
                    self.player2HP2.draw(self.window)
                elif 0 <= player2Health <= 14:
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

            if self.enemy == 5 and self.startMenu:
                self.xScizor.undraw()
                self.xScizor.draw(self.window)
                if xScizorHealth >= 45:
                    self.xScizor0hp.undraw()
                    self.xScizor1hp.undraw()
                    self.xScizor2hp.undraw()
                    self.xScizor3hp.undraw()
                    self.xScizor4hp.undraw()
                    self.xScizor5hp.undraw()
                    self.xScizor5hp.draw(self.window)
                elif 33 <= xScizorHealth <= 45:
                    self.xScizor0hp.undraw()
                    self.xScizor1hp.undraw()
                    self.xScizor2hp.undraw()
                    self.xScizor3hp.undraw()
                    self.xScizor4hp.undraw()
                    self.xScizor5hp.undraw()
                    self.xScizor4hp.draw(self.window)
                elif 22 <= xScizorHealth <= 33:
                    self.xScizor0hp.undraw()
                    self.xScizor1hp.undraw()
                    self.xScizor2hp.undraw()
                    self.xScizor3hp.undraw()
                    self.xScizor4hp.undraw()
                    self.xScizor5hp.undraw()
                    self.xScizor3hp.draw(self.window)
                elif 11 <= xScizorHealth <= 22:
                    self.xScizor0hp.undraw()
                    self.xScizor1hp.undraw()
                    self.xScizor2hp.undraw()
                    self.xScizor3hp.undraw()
                    self.xScizor4hp.undraw()
                    self.xScizor5hp.undraw()
                    self.xScizor2hp.draw(self.window)
                elif 0 <= xScizorHealth <= 11:
                    self.xScizor0hp.undraw()
                    self.xScizor1hp.undraw()
                    self.xScizor2hp.undraw()
                    self.xScizor3hp.undraw()
                    self.xScizor4hp.undraw()
                    self.xScizor5hp.undraw()
                    self.xScizor1hp.draw(self.window)
                elif xScizorHealth <= 0:
                    self.xScizor0hp.undraw()
                    self.xScizor1hp.undraw()
                    self.xScizor2hp.undraw()
                    self.xScizor3hp.undraw()
                    self.xScizor4hp.undraw()
                    self.xScizor5hp.undraw()
                    self.xScizor0hp.draw(self.window)

            # print(bool(self.startMenu))
            # print(self.enemy)
            if self.enemy == 4 and self.startMenu:
                # print("im retarded")
                self.vasinni.undraw()
                self.vasinni.draw(self.window)
                if vasinniHealth >= 35:
                    self.vasinni0hp.undraw()
                    self.vasinni1hp.undraw()
                    self.vasinni2hp.undraw()
                    self.vasinni3hp.undraw()
                    self.vasinni4hp.undraw()
                    self.vasinni5hp.undraw()
                    self.vasinni5hp.draw(self.window)
                elif 27 <= vasinniHealth <= 35:
                    self.vasinni0hp.undraw()
                    self.vasinni1hp.undraw()
                    self.vasinni2hp.undraw()
                    self.vasinni3hp.undraw()
                    self.vasinni4hp.undraw()
                    self.vasinni5hp.undraw()
                    self.vasinni4hp.draw(self.window)
                elif 18 <= vasinniHealth <= 27:
                    self.vasinni0hp.undraw()
                    self.vasinni1hp.undraw()
                    self.vasinni2hp.undraw()
                    self.vasinni3hp.undraw()
                    self.vasinni4hp.undraw()
                    self.vasinni5hp.undraw()
                    self.vasinni3hp.draw(self.window)
                elif 9 <= vasinniHealth <= 18:
                    self.vasinni0hp.undraw()
                    self.vasinni1hp.undraw()
                    self.vasinni2hp.undraw()
                    self.vasinni3hp.undraw()
                    self.vasinni4hp.undraw()
                    self.vasinni5hp.undraw()
                    self.vasinni2hp.draw(self.window)
                elif 0 <= vasinniHealth <= 9:
                    self.vasinni0hp.undraw()
                    self.vasinni1hp.undraw()
                    self.vasinni2hp.undraw()
                    self.vasinni3hp.undraw()
                    self.vasinni4hp.undraw()
                    self.vasinni5hp.undraw()
                    self.vasinni1hp.draw(self.window)
                elif vasinniHealth <= 0:
                    self.vasinni0hp.undraw()
                    self.vasinni1hp.undraw()
                    self.vasinni2hp.undraw()
                    self.vasinni3hp.undraw()
                    self.vasinni4hp.undraw()
                    self.vasinni5hp.undraw()
                    self.vasinni0hp.draw(self.window)

            if self.enemy == 3 and self.startMenu:
                self.pythagorean.undraw()
                self.pythagorean.draw(self.window)
                if pythagoreanHealth >= 25:
                    self.pythagorean0hp.undraw()
                    self.pythagorean1hp.undraw()
                    self.pythagorean2hp.undraw()
                    self.pythagorean3hp.undraw()
                    self.pythagorean4hp.undraw()
                    self.pythagorean5hp.undraw()
                    self.pythagorean5hp.draw(self.window)
                elif 18 <= pythagoreanHealth <= 25:
                    self.pythagorean0hp.undraw()
                    self.pythagorean1hp.undraw()
                    self.pythagorean2hp.undraw()
                    self.pythagorean3hp.undraw()
                    self.pythagorean4hp.undraw()
                    self.pythagorean5hp.undraw()
                    self.pythagorean4hp.draw(self.window)
                elif 12 <= pythagoreanHealth <= 18:
                    self.pythagorean0hp.undraw()
                    self.pythagorean1hp.undraw()
                    self.pythagorean2hp.undraw()
                    self.pythagorean3hp.undraw()
                    self.pythagorean4hp.undraw()
                    self.pythagorean5hp.undraw()
                    self.pythagorean3hp.draw(self.window)
                elif 6 <= pythagoreanHealth <= 12:
                    self.pythagorean0hp.undraw()
                    self.pythagorean1hp.undraw()
                    self.pythagorean2hp.undraw()
                    self.pythagorean3hp.undraw()
                    self.pythagorean4hp.undraw()
                    self.pythagorean5hp.undraw()
                    self.pythagorean2hp.draw(self.window)
                elif 0 <= pythagoreanHealth <= 6:
                    self.pythagorean0hp.undraw()
                    self.pythagorean1hp.undraw()
                    self.pythagorean2hp.undraw()
                    self.pythagorean3hp.undraw()
                    self.pythagorean4hp.undraw()
                    self.pythagorean5hp.undraw()
                    self.pythagorean1hp.draw(self.window)
                elif pythagoreanHealth <= 0:
                    self.pythagorean0hp.undraw()
                    self.pythagorean1hp.undraw()
                    self.pythagorean2hp.undraw()
                    self.pythagorean3hp.undraw()
                    self.pythagorean4hp.undraw()
                    self.pythagorean5hp.undraw()
                    self.pythagorean0hp.draw(self.window)

            if self.enemy == 2 and self.startMenu:
                self.lazar.undraw()
                self.lazar.draw(self.window)
                if lazarHealth >= 15:
                    self.lazar0hp.undraw()
                    self.lazar1hp.undraw()
                    self.lazar2hp.undraw()
                    self.lazar3hp.undraw()
                    self.lazar4hp.undraw()
                    self.lazar5hp.undraw()
                    self.lazar5hp.draw(self.window)
                elif 12 <= lazarHealth <= 15:
                    self.lazar0hp.undraw()
                    self.lazar1hp.undraw()
                    self.lazar2hp.undraw()
                    self.lazar3hp.undraw()
                    self.lazar4hp.undraw()
                    self.lazar5hp.undraw()
                    self.lazar4hp.draw(self.window)
                elif 8 <= lazarHealth <= 12:
                    self.lazar0hp.undraw()
                    self.lazar1hp.undraw()
                    self.lazar2hp.undraw()
                    self.lazar3hp.undraw()
                    self.lazar4hp.undraw()
                    self.lazar5hp.undraw()
                    self.lazar3hp.draw(self.window)
                elif 4 <= lazarHealth <= 8:
                    self.lazar0hp.undraw()
                    self.lazar1hp.undraw()
                    self.lazar2hp.undraw()
                    self.lazar3hp.undraw()
                    self.lazar4hp.undraw()
                    self.lazar5hp.undraw()
                    self.lazar2hp.draw(self.window)
                elif 0 <= lazarHealth <= 4:
                    self.lazar0hp.undraw()
                    self.lazar1hp.undraw()
                    self.lazar2hp.undraw()
                    self.lazar3hp.undraw()
                    self.lazar4hp.undraw()
                    self.lazar5hp.undraw()
                    self.lazar1hp.draw(self.window)
                elif lazarHealth <= 0:
                    self.lazar0hp.undraw()
                    self.lazar1hp.undraw()
                    self.lazar2hp.undraw()
                    self.lazar3hp.undraw()
                    self.lazar4hp.undraw()
                    self.lazar5hp.undraw()
                    self.lazar0hp.draw(self.window)

            if self.enemy == 1 and self.startMenu:
                self.lip.undraw()
                self.lip.draw(self.window)
                if lipHealth >= 5:
                    self.lip0hp.undraw()
                    self.lip1hp.undraw()
                    self.lip2hp.undraw()
                    self.lip3hp.undraw()
                    self.lip4hp.undraw()
                    self.lip5hp.undraw()
                    self.lip5hp.draw(self.window)
                elif 3.75 <= lipHealth <= 5:
                    self.lip0hp.undraw()
                    self.lip1hp.undraw()
                    self.lip2hp.undraw()
                    self.lip3hp.undraw()
                    self.lip4hp.undraw()
                    self.lip5hp.undraw()
                    self.lip4hp.draw(self.window)
                elif 2.5 <= lipHealth <= 3.75:
                    self.lip0hp.undraw()
                    self.lip1hp.undraw()
                    self.lip2hp.undraw()
                    self.lip3hp.undraw()
                    self.lip4hp.undraw()
                    self.lip5hp.undraw()
                    self.lip3hp.draw(self.window)
                elif 1.25 <= lipHealth <= 2.5:
                    self.lip0hp.undraw()
                    self.lip1hp.undraw()
                    self.lip2hp.undraw()
                    self.lip3hp.undraw()
                    self.lip4hp.undraw()
                    self.lip5hp.undraw()
                    self.lip2hp.draw(self.window)
                elif 0 <= lipHealth <= 1.25:
                    self.lip0hp.undraw()
                    self.lip1hp.undraw()
                    self.lip2hp.undraw()
                    self.lip3hp.undraw()
                    self.lip4hp.undraw()
                    self.lip5hp.undraw()
                    self.lip1hp.draw(self.window)
                elif lipHealth <= 0:
                    self.lip0hp.undraw()
                    self.lip1hp.undraw()
                    self.lip2hp.undraw()
                    self.lip3hp.undraw()
                    self.lip4hp.undraw()
                    self.lip5hp.undraw()
                    self.lip0hp.draw(self.window)

            if not upgrade and self.startMenu:
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
        global upgrade, upgradeAttack, tierAttack, lipHealth, lazarHealth, vasinniHealth, xScizorHealth, pythagoreanHealth, player2Health, damage, health, tierHeal, limitHeal, upgradeCoins, death, blockBonus

        if self.window.mousePressed and self.firstClick and not death:
            self.firstClick = False
            if self.startMenu:
                # global enemyTurn
                # If the mouse is colliding with the start button
                if not upgrade:
                    if Image.testCollision_ImageVsPoint(self.upgradeBox, mouse):  # Upgrade
                        print(f"You have {upgradeCoins} upgrades left.")
                        upgrade = True
                    elif Image.testCollision_ImageVsPoint(self.attackBox, mouse):  # Attack
                        if not upgradeAttack:
                            damageDone = 1
                            if self.enemy == 1:
                                lipHealth -= damageDone
                                print(f"You dealt {damageDone} damage to the first enemy")
                            elif self.enemy == 2:
                                lazarHealth -= damageDone
                                print(f"You dealt {damageDone} damage to the second enemy")
                            elif self.enemy == 3:
                                pythagoreanHealth -= damageDone
                                print(f"You dealt {damageDone} damage to the third enemy")
                            elif self.enemy == 4:
                                vasinniHealth -= damageDone
                                print(f"You dealt {damageDone} damage to the fourth enemy")
                            elif self.enemy == 5:
                                xScizorHealth -= damageDone
                                print(f"You dealt {damageDone} damage to the fifth enemy")
                            elif self.enemy == 6:
                                player2Health -= damageDone
                                print(f"You dealt {damageDone} damage to the player")
                        elif upgradeAttack:
                            damageDone = random.randrange(1, damage)
                            if self.enemy == 1:
                                lipHealth -= damageDone
                                print(f"You dealt {damageDone} damage to the first enemy")
                            elif self.enemy == 2:
                                lazarHealth -= damageDone
                                print(f"You dealt {damageDone} damage to the second enemy")
                            elif self.enemy == 3:
                                pythagoreanHealth -= damageDone
                                print(f"You dealt {damageDone} damage to the third enemy")
                            elif self.enemy == 4:
                                vasinniHealth -= damageDone
                                print(f"You dealt {damageDone} damage to the fourth enemy")
                            elif self.enemy == 5:
                                xScizorHealth -= damageDone
                                print(f"You dealt {damageDone} damage to the fifth enemy")
                            elif self.enemy == 6:
                                player2Health -= damageDone
                                print(f"You dealt {damageDone} damage to the player")
                        if self.enemy == 1 and lipHealth > 0:
                            damageDetermine = random.randrange(0, 3)
                            global blockTier
                            if damageDetermine == 0:
                                enemyDamage = .5
                            elif damageDetermine == 1:
                                enemyDamage = maxLip
                            elif damageDetermine == 2:
                                enemyDamage = 0
                            health -= (enemyDamage - blockBonus)
                            print(f"The first enemy dealt {enemyDamage} damage.")
                        elif self.enemy == 2 and lazarHealth > 0:
                            enemyDamage = random.randrange(1, maxLazar)
                            health -= enemyDamage
                            print(f"The second enemy dealt {enemyDamage} damage.")
                        elif self.enemy == 3 and pythagoreanHealth > 0:
                            enemyDamage = random.randrange(2, maxPythagorean)
                            health -= enemyDamage
                            print(f"The third enemy dealt {enemyDamage} damage.")
                        elif self.enemy == 4 and vasinniHealth > 0:
                            enemyDamage = random.randrange(3, maxVasinni)
                            health -= enemyDamage
                            print(f"The third enemy dealt {enemyDamage} damage.")
                        elif self.enemy == 5 and xScizorHealth > 0:
                            enemyDamage = random.randrange(4, maxXScizor)
                            health -= enemyDamage
                            print(f"The third dealt {enemyDamage} damage.")
                        elif self.enemy == 6 and player2Health > 0:
                            enemyDamage = random.randrange(5, maxPlayer2)
                            health -= enemyDamage
                            print(f"It dealt {enemyDamage} damage.")
                    elif Image.testCollision_ImageVsPoint(self.blockBox, mouse):  # Block
                        # global blockBonus
                        if self.enemy == 1 and lipHealth > 0:
                            damageDetermine = random.randrange(0, 3)
                            if damageDetermine == 0:
                                enemyDamage = .5
                            elif damageDetermine == 1:
                                enemyDamage = 1
                            elif damageDetermine == 2:
                                enemyDamage = 0
                            blockBonus += 0.1
                            health -= (enemyDamage - blockBonus)
                            print(f"The first enemy dealt {enemyDamage - blockBonus} damage.")
                        elif self.enemy == 2 and lazarHealth > 0:
                            enemyDamage = random.randrange(1, maxLazar)
                            health -= enemyDamage
                            print(f"The second enemy dealt {enemyDamage} damage.")
                        elif self.enemy == 3 and pythagoreanHealth > 0:
                            enemyDamage = random.randrange(2, maxPythagorean)
                            health -= enemyDamage
                            print(f"The third enemy dealt {enemyDamage} damage.")
                        elif self.enemy == 4 and vasinniHealth > 0:
                            enemyDamage = random.randrange(3, maxVasinni)
                            health -= enemyDamage
                            print(f"The third enemy dealt {enemyDamage} damage.")
                        elif self.enemy == 5 and xScizorHealth > 0:
                            enemyDamage = random.randrange(4, maxXScizor)
                            health -= enemyDamage
                            print(f"The third dealt {enemyDamage} damage.")
                        elif self.enemy == 6 and player2Health > 0:
                            enemyDamage = random.randrange(5, maxPlayer2)
                            health -= enemyDamage
                            print(f"It dealt {enemyDamage} damage.")
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
                                        f"You healed {randomHeal} health and now have {health} health, but you now have only {limitHeal} heals remaining.")

                            elif tierHeal == 1:
                                health += 1
                                limitHeal -= 1
                                print(
                                    f"You healed 1 health and now have {health} health, but you now have only {limitHeal} heals remaining.")
                            elif tierHeal > 1:
                                randomHeal = random.randrange(1, tierHeal)
                                health += randomHeal
                                limitHeal -= 1
                                print(
                                    f"You healed {randomHeal} health and now have {health} health, but now you have only {limitHeal} heals remaining.")
                        else:
                            print(f"Sorry, you are out of heals, but at least you have have {health} health")
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
                            global blockTier
                            upgradeCoins -= 1
                            blockBonus += .1
                            blockTier += 1
                            print(f"Block tier:  {blockTier}")
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
