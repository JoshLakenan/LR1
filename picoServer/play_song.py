from tones import TONES
import time

def play_song(board, song, volume):
    for note, duration in song:
        if note == "P":
            # This is a "pause" note, so stop the motors
            board.play_silence()
        else:
            # Get the frequency of the note and play it
            board.play_tone(TONES[note])

        time.sleep(duration)

    board.stop_playing()