# ====================================================================================================
# Program:  final_project_main.py
# Author:  Nico Lamas
# Description:  Main program for final project
# Date Modified:  3/22/2022
# Version:  1
# ====================================================================================================
# Import Libraries
from final_project_classes import *

# ===================================================================================================
# Global Variables
window = GraphWin("Tesla:  Crash to Earth, V1", 1000, 800, autoflush=False)
window.setBackground("white")
level = Level(window)
speed = 15
kills = 0
fighting = False
didTransition = False
didTransitionASecondTime = False
didTransitionAThirdTime = False
enemy = 1
enemy1dead = False
enemy2dead = False
player2dead = False


# ====================================================================================================
# User Defined Functions


def changeBackground():
    """Checks to see if the player has advanced to the next section of the Level
    and changes the background image if necessary."""

    # If the player goes off to the right of the window  and  If we are currently not drawing the last image in the list
    if player.x + player.size > window.getWidth() and level.backgroundIndex != len(level.backgrounds) - 1:
        # Go to the next image in the images list
        level.changeBackgroundIndex(level.backgroundIndex + 1)
        # Position the player back onto the left side of the window
        player.repositionPlayer(0)

    # If the player goes off to the left of the window and If we are currently not drawing the first image in the list
    elif player.x < 0 and level.backgroundIndex != 0:
        # Go to the previous image in the images list
        level.changeBackgroundIndex(level.backgroundIndex - 1)
        # Position the player back onto the right side of the window
        player.repositionPlayer(window.getWidth() - player.size)


class Enemy(object):
    """Creates a enemy object"""
    def __init__(self, x, y, window, levelOn, spriteLocation):
        """Blueprints for enemy object"""
        self.enemy = Image(Point(x, y), spriteLocation)
        self.window = window
        self.x = x
        self.levelOn = levelOn

    def enemy1CheckForPlayer(self):
        """Checks if enemy is near player"""
        global level
        if enemy == 1 and not enemy1dead and level.backgroundIndex == 0:
            if player.x >= self.x - 100:
                if musicPlay1.is_playing():
                    musicPlay1.stop()
                elif musicPlay2.is_playing():
                    musicPlay2.stop()
                elif musicPlay3.is_playing():
                    musicPlay3.stop()
                return True
        else:
            return False

    def enemy2CheckForPlayer(self):
        """Checks if enemy is near player"""
        global level
        if enemy == 2 and not enemy2dead and level.backgroundIndex == 1:
            if player.x >= self.x - 100:
                if musicPlay1.is_playing():
                    musicPlay1.stop()
                elif musicPlay2.is_playing():
                    musicPlay2.stop()
                elif musicPlay3.is_playing():
                    musicPlay3.stop()
                return True
        else:
            return False

    def player2CheckForPlayer(self):
        """Checks if enemy is near player"""
        global level
        if enemy == "player" and not player2dead and level.backgroundIndex == 2:
            if player.x >= self.x - 100:
                if musicPlay1.is_playing():
                    musicPlay1.stop()
                elif musicPlay2.is_playing():
                    musicPlay2.stop()
                elif musicPlay3.is_playing():
                    musicPlay3.stop()
                return True
        else:
            return False

    def update(self):
        """Updates Enemy class"""
        if level.backgroundIndex == self.levelOn:
            self.enemy.undraw()
            self.enemy.draw(self.window)
        else:
            self.enemy.undraw()

    def undraw(self):
        """Undraws enemy"""
        self.enemy.undraw()


def transition():
    """the transition"""
    transitionMusic = simpleaudio.WaveObject.from_wave_file(
        "Assets/fightingMenu/Transition/Transition/BeepBox-Song9999.wav")
    global didTransition, didTransitionASecondTime, didTransitionAThirdTime, menu
    if enemy1dead and not didTransitionASecondTime:
        didTransition = False
        didTransitionASecondTime = True
    if enemy2dead and not didTransitionAThirdTime:
        didTransition = False
        didTransitionAThirdTime = True
    if not didTransition:
        player.update()
        enemy1.update()
        enemy2.update()
        player2.update()
        transitionPlay = transitionMusic.play()
        for i in range(26):
            image = Image(Point(window.getWidth() // 2, window.getHeight() // 2),
                          f"Assets/fightingMenu/Transition/Transition/New Piskel/sprite_{i}.png")
            image.undraw()
            image.draw(window)
            window.update()
        didTransition = True
    else:
        pass


def updateAll():
    """Updates everything"""
    player.update()
    if not enemy1dead:
        enemy1.update()
    else:
        enemy1.undraw()
    if not enemy2dead:
        enemy2.update()
    else:
        enemy2.undraw()
    if not player2dead:
        player2.update()
    else:
        player2.undraw()
    time.sleep(0.1)
    window.update()
    window.setBackground("white")
    level.update()
    changeBackground()


# ====================================================================================================
# Main Function
def main():
    """Main function of the program"""
    # Ok so maybe i have a few globals...
    global player, enemy1, enemy2, player2, fighting, musicPlay1, musicPlay2, musicPlay3, musicPlay4, musicFight, enemy, kills, menu, playerHealth

    # Variables
    menu = Menu(window, enemy)
    playerHealth = menu.getHealth()
    player = Player(0, 630, speed, 0, window)
    enemy1 = Enemy(800, 630, window, 0, "Assets/Characters/Enemy1/Overworld Sprites/Left 2xBig/image (24)-1.png.png")
    enemy2 = Enemy(801, 630, window, 1,
                   "Assets/Characters/Enemy2/XScizorSprites/XScizorSprites/unorganized sprites/Walk Left/idleLeftside0_2x_big.png")
    player2 = Enemy(802, 630, window, 2,
                   "Assets/Characters/Player/Overworld Sprites/unorganized sprites/Walk Left 2x Big/idleLeftside0_2xbig.png")
    musicMain1 = simpleaudio.WaveObject.from_wave_file("Assets/Music/Song_New/Song_New/Song_Main_World1_short.wav")
    musicMain2 = simpleaudio.WaveObject.from_wave_file("Assets/Music/Song_New/Song_New/Song_Main_world2_short.wav")
    musicMain3 = simpleaudio.WaveObject.from_wave_file("Assets/Music/Song_New/Song_New/Song_Main_world3_short.wav")
    musicFight = simpleaudio.WaveObject.from_wave_file("Assets/Music/Song_New/Song_New/Song_Fight_World1_short.wav")
    # clickPoint = window.getMouse()
    musicPlay1 = musicMain1.play()
    musicPlay1.stop()
    musicPlay2 = musicMain2.play()
    musicPlay2.stop()
    musicPlay3 = musicMain3.play()
    musicPlay3.stop()
    musicPlay4 = musicFight.play()
    musicPlay4.stop()

    # print(clickPoint)

    while not window.closed:
        window.setBackground("white")
        # if menu.getHealth() <= 0:
        #     finalImage = Image(Point(window.getWidth() // 2, window.getHeight() // 2), "Assets/fightingMenu/Transition/Transition/New Piskel/sprite_25.png")
            # finalImage.undraw()
            # finalImage.draw(window)
            # print("You died.")
            # time.sleep(999999)
        if level.backgroundIndex == 0 and player.x <= 40:
            player.x += speed
        elif level.backgroundIndex == 2 and player.x >= 960:
            player.x -= speed

        if kills == 0:
            if musicPlay2.is_playing():
                musicPlay2.stop()
            elif musicPlay3.is_playing():
                musicPlay3.stop()
            if not musicPlay1.is_playing():
                if fighting:
                    pass
                else:
                    musicPlay1 = musicMain1.play()

        elif kills == 1:
            if musicPlay1.is_playing():
                musicPlay1.stop()
            elif musicPlay3.is_playing():
                musicPlay3.stop()
            if not musicPlay2.is_playing():
                if fighting:
                    pass
                else:
                    musicPlay2 = musicMain2.play()

        elif kills == 2:
            if musicPlay1.is_playing():
                musicPlay1.stop()
            elif musicPlay2.is_playing():
                musicPlay2.stop()
            if not musicPlay3.is_playing():
                if fighting:
                    pass
                else:
                    musicPlay3 = musicMain3.play()

        elif kills == 3:
            if musicPlay1.is_playing():
                musicPlay1.stop()
            elif musicPlay2.is_playing():
                musicPlay2.stop()
            elif musicPlay3.is_playing():
                musicPlay3.stop()

        # Updates
        if not fighting:
            player.update()
            if enemy == 1:
                enemy1.update()
            elif enemy == 2:
                enemy2.update()
            elif enemy == "player":
                player2.update()
            time.sleep(0.1)
            window.update()
            level.update()
            changeBackground()

        global enemy1dead, enemy2dead
        if enemy1.enemy1CheckForPlayer():
            fighting = True
            transition()
            if not menu.checkIfEnemyDead():
                menu.updateMenu()
                window.update()
                if not musicPlay4.is_playing():
                    musicPlay4 = musicFight.play()
            elif menu.checkIfEnemyDead():
                fighting = False
                enemy1dead = True
                enemy = 2
                kills = 1
                updateAll()

        elif not enemy1.enemy1CheckForPlayer() and enemy == 1:
            if musicPlay4.is_playing():
                musicPlay4.stop()
        elif not enemy2.enemy2CheckForPlayer() and enemy == 2:
            if musicPlay4.is_playing():
                musicPlay4.stop()
        elif not player2.player2CheckForPlayer() and enemy == "player":
            if musicPlay4.is_playing():
                musicPlay4.stop()

        if enemy2.enemy2CheckForPlayer():
            fighting = True
            transition()
            menu.undoUndraw()
            if not menu.checkIfEnemy2Dead():
                menu.updateMenu()
                window.update()
                if not musicPlay4.is_playing():
                    musicPlay4 = musicFight.play()
            elif menu.checkIfEnemy2Dead():
                fighting = False
                enemy2dead = True
                enemy = "player"
                kills = 2
                updateAll()

        elif not enemy1.enemy1CheckForPlayer() and enemy == 1:
            if musicPlay4.is_playing():
                musicPlay4.stop()
        elif not enemy2.enemy2CheckForPlayer() and enemy == 2:
            if musicPlay4.is_playing():
                musicPlay4.stop()
        elif not player2.player2CheckForPlayer() and enemy == "player":
            if musicPlay4.is_playing():
                musicPlay4.stop()

        if player2.player2CheckForPlayer():
            fighting = True
            transition()
            menu.undoUndraw2()
            if not menu.checkIfPlayer2Dead():
                menu.updateMenu()
                window.update()
                if not musicPlay4.is_playing():
                    musicPlay4 = musicFight.play()
            elif menu.checkIfPlayer2Dead():
                fighting = False
                enemy2dead = True
                enemy = "﷽"
                kills = 3
                updateAll()

        elif not enemy1.enemy1CheckForPlayer() and enemy == 1:
            if musicPlay4.is_playing():
                musicPlay4.stop()
        elif not enemy2.enemy2CheckForPlayer() and enemy == 2:
            if musicPlay4.is_playing():
                musicPlay4.stop()
        elif not player2.player2CheckForPlayer() and enemy == "﷽":
            if musicPlay4.is_playing():
                musicPlay4.stop()


# ====================================================================================================
# Call the Main Function
main()
