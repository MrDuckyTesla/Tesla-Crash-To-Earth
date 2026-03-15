# ====================================================================================================
# Program:  final_project_main.py
# Author:  Nico Lamas
# Description:  Main program for final project
# Date Modified:  3/22/2022
# Version:  1.1.0
# ====================================================================================================
# Import Libraries
from final_project_classes import *
# from graphics import *

# ===================================================================================================
# Global Variables
window = GraphWin("Tesla:  Crash to Earth, V1.1.0", 1000, 800, autoflush=False)
window.setBackground("black")
window.setWindowIcon("Assets/icon.png")
level = Level(window)
speed = 15
kills = 0
fighting = False
didTransition = False
didTransitionASecondTime = False
didTransitionAThirdTime = False
didTransitionAFourthTime = False
didTransitionAFifthTime = False
didTransitionASixthTime = False
enemy = 1
lipDead = False
lazarDead = False
pythagoreanDead = False
vasinniDead = False
xScizorDead = False
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

    def lipCheckForPlayer(self):
        """Checks if enemy is near player"""
        global level, fighting  # , musicPlay1, musicPlay2, musicPlay3, musicPlay4, musicPlay5
        if enemy == 1 and not lipDead and level.backgroundIndex == 0:
            if player.x >= self.x - 100:
                if musicPlay1.is_playing():
                    musicPlay1.stop()
                elif musicPlay2.is_playing():
                    musicPlay2.stop()
                elif musicPlay3.is_playing():
                    musicPlay3.stop()
                elif musicPlay4.is_playing():
                    musicPlay4.stop()
                elif musicPlay5.is_playing():
                    musicPlay5.stop()
                return True
        else:
            return False

    def lazarCheckForPlayer(self):
        """Checks if enemy is near player"""
        global level  # , musicPlay1, musicPlay2, musicPlay3, musicPlay4, musicPlay5
        if enemy == 2 and not lazarDead and level.backgroundIndex == 1:
            if player.x >= self.x - 100:
                if musicPlay1.is_playing():
                    musicPlay1.stop()
                elif musicPlay2.is_playing():
                    musicPlay2.stop()
                elif musicPlay3.is_playing():
                    musicPlay3.stop()
                elif musicPlay4.is_playing():
                    musicPlay4.stop()
                elif musicPlay5.is_playing():
                    musicPlay5.stop()
                return True
        else:
            return False

    def pythagoreanCheckForPlayer(self):
        """Checks if enemy is near player"""
        global level  # , musicPlay1, musicPlay2, musicPlay3, musicPlay4, musicPlay5
        if enemy == 3 and not pythagoreanDead and level.backgroundIndex == 2:
            if player.x >= self.x - 100:
                if musicPlay1.is_playing():
                    musicPlay1.stop()
                elif musicPlay2.is_playing():
                    musicPlay2.stop()
                elif musicPlay3.is_playing():
                    musicPlay3.stop()
                elif musicPlay4.is_playing():
                    musicPlay4.stop()
                elif musicPlay5.is_playing():
                    musicPlay5.stop()
                return True
        else:
            return False

    def vasinniCheckForPlayer(self):
        """Checks if enemy is near player"""
        global level  # , musicPlay1, musicPlay2, musicPlay3, musicPlay4, musicPlay5
        if enemy == 4 and not vasinniDead and level.backgroundIndex == 3:
            if player.x >= self.x - 100:
                if musicPlay1.is_playing():
                    musicPlay1.stop()
                elif musicPlay2.is_playing():
                    musicPlay2.stop()
                elif musicPlay3.is_playing():
                    musicPlay3.stop()
                elif musicPlay4.is_playing():
                    musicPlay4.stop()
                elif musicPlay5.is_playing():
                    musicPlay5.stop()
                return True
        else:
            return False

    def xScizorCheckForPlayer(self):
        """Checks if enemy is near player"""
        global level  # , musicPlay1, musicPlay2, musicPlay3, musicPlay4, musicPlay5
        if enemy == 5 and not xScizorDead and level.backgroundIndex == 4:
            if player.x >= self.x - 100:
                if musicPlay1.is_playing():
                    musicPlay1.stop()
                elif musicPlay2.is_playing():
                    musicPlay2.stop()
                elif musicPlay3.is_playing():
                    musicPlay3.stop()
                elif musicPlay4.is_playing():
                    musicPlay4.stop()
                elif musicPlay5.is_playing():
                    musicPlay5.stop()
                return True
        else:
            return False

    def player2CheckForPlayer(self):
        """Checks if enemy is near player"""
        global level  # , musicPlay1, musicPlay2, musicPlay3, musicPlay4, musicPlay5
        if enemy == 6 and not player2dead and level.backgroundIndex == 5:
            if player.x >= self.x - 100:
                if musicPlay1.is_playing():
                    musicPlay1.stop()
                elif musicPlay2.is_playing():
                    musicPlay2.stop()
                elif musicPlay3.is_playing():
                    musicPlay3.stop()
                elif musicPlay4.is_playing():
                    musicPlay4.stop()
                elif musicPlay5.is_playing():
                    musicPlay5.stop()
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
    global didTransition, didTransitionASecondTime, didTransitionAThirdTime, didTransitionAFourthTime, didTransitionAFifthTime, didTransitionASixthTime, menu
    if lipDead and not didTransitionASecondTime:
        didTransition = False
        didTransitionASecondTime = True
    if lazarDead and not didTransitionAThirdTime:
        didTransition = False
        didTransitionAThirdTime = True
    if pythagoreanDead and not didTransitionAFourthTime:
        didTransition = False
        didTransitionAFourthTime = True
    if vasinniDead and not didTransitionAFifthTime:
        didTransition = False
        didTransitionAFifthTime = True
    if xScizorDead and not didTransitionASixthTime:
        didTransition = False
        didTransitionASixthTime = True
    if not didTransition:
        player.update()

        lip.update()
        lazar.update()
        pythagorean.update()
        vasinni.update()
        xScixor.update()
        player2.update()
        transitionPlay = transitionMusic.play()
        for i in range(26):
            global image
            image = Image(Point(window.getWidth() // 2, window.getHeight() // 2),
                          f"Assets/fightingMenu/Transition/Transition/New Piskel/sprite_{i}.png")
            image.undraw()
            image.draw(window)
            window.update()
        # menu.startMenu = True
        didTransition = True
    else:
        pass


def updateAll():
    """Updates everything"""
    player.update()
    if not lipDead:
        lip.update()
    else:
        lip.undraw()
    if not lazarDead:
        lazar.update()
    else:
        lazar.undraw()
    if not pythagoreanDead:
        pythagorean.update()
    else:
        pythagorean.undraw()
    if not vasinniDead:
        vasinni.update()
    else:
        vasinni.undraw()
    if not xScizorDead:
        xScixor.update()
    else:
        xScixor.undraw()
    if not player2dead:
        player2.update()
    else:
        player2.undraw()
    time.sleep(0.1)
    window.update()
    level.update()
    changeBackground()


def getMusic():
    """Returns music"""
    return musicFight


# ====================================================================================================
# Main Function
def main():
    """Main function of the program"""
    # Ok so maybe i have a few globals...
    global player, lip, lazar, pythagorean, vasinni, xScixor, player2, fighting, musicPlay1, musicPlay2, musicPlay3, musicPlay4, musicPlay5, fightPlay, musicFight, enemy, kills, menu, playerHealth

    # Variables
    menu = Menu(window, enemy)
    playerHealth = menu.getHealth()
    player = Player(0, 630, speed, 0, window)
    lip = Enemy(800, 630, window, 0, "Assets/Characters/Enemy6/overworld.png")
    lazar = Enemy(801, 630, window, 1, "Assets/Characters/Enemy5/overworld.png")
    pythagorean = Enemy(802, 630, window, 2, "Assets/Characters/Enemy3/overworld.png")
    vasinni = Enemy(803, 630, window, 3, "Assets/Characters/Enemy1/Overworld Sprites/Left 2xBig/image (24)-1.png.png")
    xScixor = Enemy(804, 630, window, 4, "Assets/Characters/Enemy2/XScizorSprites/XScizorSprites/unorganized sprites/Walk Left/idleLeftside0_2x_big.png")
    player2 = Enemy(805, 630, window, 5, "Assets/Characters/Player/Overworld Sprites/unorganized sprites/Walk Left 2x Big/idleLeftside0_2xbig.png")
    musicMain1 = simpleaudio.WaveObject.from_wave_file("Assets/Music/Song_New/Song_New/Song_Main_World1_short.wav")
    musicMain2 = simpleaudio.WaveObject.from_wave_file("Assets/Music/Song_New/Song_New/song125tempo.wav")
    musicMain3 = simpleaudio.WaveObject.from_wave_file("Assets/Music/Song_New/Song_New/song100tempo.wav")
    musicMain4 = simpleaudio.WaveObject.from_wave_file("Assets/Music/Song_New/Song_New/song75tempo.wav")
    musicMain5 = simpleaudio.WaveObject.from_wave_file("Assets/Music/Song_New/Song_New/song50tempo.wav")
    musicFight = simpleaudio.WaveObject.from_wave_file("Assets/Music/Song_New/Song_New/Song_Fight_World1_short.wav")
    finalImage = Image(Point(window.getWidth() // 2, window.getHeight() // 2),
                       "Assets/fightingMenu/Transition/Transition/New Piskel/sprite_25.png")
    deathImage = Image(Point(window.getWidth() // 2, window.getHeight() // 2), "Assets/deathScreen.png")
    # spinIcon = Image(Point(500, 550), "Assets/spinIcon.png")
    startScreen = Image(Point(window.getWidth() // 2, window.getHeight() // 2), "Assets/startScreen.png")
    # angle = .5
    # size = 1
    while window.getMouse:
        #     # angle = 1
        #     # spinIcon.undraw()
        #     spinIcon.transform(size, angle)
        startScreen.undraw()
        #     spinIcon.undraw()
        startScreen.draw(window)
        #     spinIcon.draw(window)
        #     angle -= .5
        if window.checkMouse():
            # clickPoint = window.getMouse()
            # print(clickPoint)
            break
    startScreen.undraw()
    musicPlay1 = musicMain1.play()
    musicPlay1.stop()
    musicPlay2 = musicMain2.play()
    musicPlay2.stop()
    musicPlay3 = musicMain3.play()
    musicPlay3.stop()
    musicPlay4 = musicMain4.play()
    musicPlay4.stop()
    musicPlay5 = musicMain5.play()
    musicPlay5.stop()
    fightPlay = musicFight.play()
    fightPlay.stop()

    while not window.closed:
        if menu.getHealth() <= 0:
            finalImage.undraw()
            deathImage.undraw()
            finalImage.draw(window)
            deathImage.draw(window)
            # if time.sleep(5):
            #     window.close()
            # time.sleep(10)
            # window.close()
        if level.backgroundIndex == 0 and player.x <= 40:
            player.x += speed
        elif level.backgroundIndex == 5 and player.x >= 960:
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
            if musicPlay3.is_playing():
                musicPlay3.stop()
            if musicPlay4.is_playing():
                musicPlay4.stop()
            if musicPlay5.is_playing():
                musicPlay5.stop()
            if not musicPlay2.is_playing():
                if fighting:
                    pass
                else:
                    musicPlay2 = musicMain2.play()

        elif kills == 2:
            if musicPlay1.is_playing():
                musicPlay1.stop()
            if musicPlay2.is_playing():
                musicPlay2.stop()
            if musicPlay4.is_playing():
                musicPlay4.stop()
            if musicPlay5.is_playing():
                musicPlay5.stop()
            if not musicPlay3.is_playing():
                if fighting:
                    pass
                else:
                    musicPlay3 = musicMain3.play()

        elif kills == 3:
            if musicPlay1.is_playing():
                musicPlay1.stop()
            if musicPlay2.is_playing():
                musicPlay2.stop()
            if musicPlay3.is_playing():
                musicPlay3.stop()
            if musicPlay5.is_playing():
                musicPlay5.stop()
            if not musicPlay4.is_playing():
                if fighting:
                    pass
                else:
                    musicPlay4 = musicMain4.play()

        elif kills == 4:
            if musicPlay1.is_playing():
                musicPlay1.stop()
            if musicPlay2.is_playing():
                musicPlay2.stop()
            if musicPlay3.is_playing():
                musicPlay3.stop()
            if musicPlay4.is_playing():
                musicPlay4.stop()
            if not musicPlay5.is_playing():
                if fighting:
                    pass
                else:
                    musicPlay5 = musicMain5.play()

        elif kills == 5:
            if musicPlay1.is_playing():
                musicPlay1.stop()
            if musicPlay2.is_playing():
                musicPlay2.stop()
            if musicPlay3.is_playing():
                musicPlay3.stop()
            if musicPlay4.is_playing():
                musicPlay4.stop()
            if musicPlay5.is_playing():
                musicPlay5.stop()

        # Updates
        if not fighting:
            global lipDead, lazarDead, pythagoreanDead, vasinniDead, xScizorDead, player2dead
            player.update()
            if enemy == 1 and not lipDead:
                lip.update()
            elif enemy == 2 and not lazarDead:
                lazar.update()
            elif enemy == 3 and not pythagoreanDead:
                pythagorean.update()
            elif enemy == 4 and not vasinniDead:
                vasinni.update()
            elif enemy == 5 and not xScizorDead:
                xScixor.update()
            elif enemy == 6 and not player2dead:
                player2.update()
            menu.startMenu = False
            time.sleep(0.1)
            window.update()
            level.update()
            changeBackground()

        # global enemy1dead, enemy2dead, enemy3dead, enemy4dead, enemy5dead
        if lip.lipCheckForPlayer():
            fighting = True
            transition()
            menu.startMenu = True
            if not menu.checkIfLipDead():
                menu.updateMenu()
                window.update()
            if menu.dead():
                if fightPlay.is_playing():
                    fightPlay.stop()
            if not fightPlay.is_playing() and not menu.dead():
                fightPlay = musicFight.play()
            if menu.checkIfLipDead():
                fighting = False
                lipDead = True
                enemy = 2
                kills = 1
                updateAll()

        elif not lip.lipCheckForPlayer() and enemy == 1:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not lazar.lazarCheckForPlayer() and enemy == 2:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not pythagorean.pythagoreanCheckForPlayer() and enemy == 3:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not vasinni.vasinniCheckForPlayer() and enemy == 4:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not xScixor.xScizorCheckForPlayer() and enemy == 5:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not player2.player2CheckForPlayer() and enemy == 6:
            if fightPlay.is_playing():
                fightPlay.stop()

        if lazar.lazarCheckForPlayer():
            fighting = True
            transition()
            menu.undoUndraw()
            # menu.startMenu = True
            if not menu.checkIfLazarDead():
                menu.updateMenu()
                window.update()
            if menu.dead():
                if fightPlay.is_playing():
                    fightPlay.stop()
            if not fightPlay.is_playing() and not menu.dead():
                fightPlay = musicFight.play()
            if menu.checkIfLazarDead():
                fighting = False
                lazarDead = True
                enemy = 3
                kills = 2
                updateAll()

        elif not lip.lipCheckForPlayer() and enemy == 1:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not lazar.lazarCheckForPlayer() and enemy == 2:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not pythagorean.pythagoreanCheckForPlayer() and enemy == 3:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not vasinni.vasinniCheckForPlayer() and enemy == 4:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not xScixor.xScizorCheckForPlayer() and enemy == 5:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not player2.player2CheckForPlayer() and enemy == 6:
            if fightPlay.is_playing():
                fightPlay.stop()

        if pythagorean.pythagoreanCheckForPlayer():
            fighting = True
            transition()
            menu.undoUndraw()
            if not menu.checkIfPythagoreanDead():
                menu.updateMenu()
                window.update()
            if menu.dead():
                if fightPlay.is_playing():
                    fightPlay.stop()
            if not fightPlay.is_playing() and not menu.dead():
                fightPlay = musicFight.play()
            if menu.checkIfPythagoreanDead():
                fighting = False
                pythagoreanDead = True
                enemy = 4
                kills = 3
                updateAll()

        elif not lip.lipCheckForPlayer() and enemy == 1:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not lazar.lazarCheckForPlayer() and enemy == 2:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not pythagorean.pythagoreanCheckForPlayer() and enemy == 3:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not vasinni.vasinniCheckForPlayer() and enemy == 4:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not xScixor.xScizorCheckForPlayer() and enemy == 5:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not player2.player2CheckForPlayer() and enemy == 6:
            if fightPlay.is_playing():
                fightPlay.stop()

        if vasinni.vasinniCheckForPlayer():
            # bool1 = menu.startMenu
            # print(bool1)
            fighting = True
            transition()
            menu.undoUndraw()
            # menu.startMenu = True
            if not menu.checkIfVasinniDead():
                menu.updateMenu()
                window.update()
            if menu.dead():
                if fightPlay.is_playing():
                    fightPlay.stop()
            if not fightPlay.is_playing() and not menu.dead():
                fightPlay = musicFight.play()
            if menu.checkIfVasinniDead():
                fighting = False
                vasinniDead = True
                enemy = 5
                kills = 4
                updateAll()

        elif not lip.lipCheckForPlayer() and enemy == 1:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not lazar.lazarCheckForPlayer() and enemy == 2:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not pythagorean.pythagoreanCheckForPlayer() and enemy == 3:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not vasinni.vasinniCheckForPlayer() and enemy == 4:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not xScixor.xScizorCheckForPlayer() and enemy == 5:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not player2.player2CheckForPlayer() and enemy == 6:
            if fightPlay.is_playing():
                fightPlay.stop()

        if xScixor.xScizorCheckForPlayer():
            fighting = True
            transition()
            menu.undoUndraw()
            if not menu.checkIfXscizorDead():
                menu.updateMenu()
                window.update()
            if menu.dead():
                if fightPlay.is_playing():
                    fightPlay.stop()
            if not fightPlay.is_playing() and not menu.dead():
                fightPlay = musicFight.play()
            if menu.checkIfXscizorDead():
                fighting = False
                xScizorDead = True
                enemy = 6
                kills = 5
                updateAll()

        elif not lip.lipCheckForPlayer() and enemy == 1:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not lazar.lazarCheckForPlayer() and enemy == 2:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not pythagorean.pythagoreanCheckForPlayer() and enemy == 3:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not vasinni.vasinniCheckForPlayer() and enemy == 4:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not xScixor.xScizorCheckForPlayer() and enemy == 5:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not player2.player2CheckForPlayer() and enemy == 6:
            if fightPlay.is_playing():
                fightPlay.stop()

        if player2.player2CheckForPlayer():
            fighting = True
            transition()
            menu.undoUndraw()
            if not menu.checkIfPlayer2Dead():
                menu.updateMenu()
                window.update()
                if menu.dead():
                    if fightPlay.is_playing():
                        fightPlay.stop()
                if not fightPlay.is_playing() and not menu.dead():
                    fightPlay = musicFight.play()
            elif menu.checkIfPlayer2Dead():
                fighting = False
                player2dead = True
                enemy = ""
                kills = 6
                updateAll()

        elif not lip.lipCheckForPlayer() and enemy == 1:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not lazar.lazarCheckForPlayer() and enemy == 2:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not pythagorean.pythagoreanCheckForPlayer() and enemy == 3:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not vasinni.vasinniCheckForPlayer() and enemy == 4:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not xScixor.xScizorCheckForPlayer() and enemy == 5:
            if fightPlay.is_playing():
                fightPlay.stop()
        elif not player2.player2CheckForPlayer() and enemy == 6:
            if fightPlay.is_playing():
                fightPlay.stop()


# ====================================================================================================
# Call the Main Function
main()
