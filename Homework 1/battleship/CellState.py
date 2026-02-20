from enum import IntEnum
class CellState(IntEnum):
    UNKNOWN = 0
    EMPTY = 1
    HIT = 2
    KILL = 3
    SHIP = 4