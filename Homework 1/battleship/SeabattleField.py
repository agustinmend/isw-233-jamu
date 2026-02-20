from Ship import Ship
from CellState import CellState
import random
from ShotResult import ShotResult
class SeabattleField:
    def __init__(self):
        self.size = 8
        self.own_grid = [[CellState.EMPTY for _ in range(self.size)] for _ in range(self.size)]
        self.opponent_grid = [[CellState.UNKNOWN for _ in range(self.size)] for _ in range(self.size)]
        self.ships = []

    def get_random_field(self, seed):
        random.seed(seed)
        ship_lengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
        for _ in range(1000):
            self.own_grid = [[CellState.EMPTY for _ in range(self.size)] for _ in range(self.size)]
            self.ships = []
            success = True
            
            for length in ship_lengths:
                if not self._place_single_ship(length):
                    success = False
                    break
            if success:
                return
                
        raise RuntimeError("Error crítico: Imposible posicionar la flota con esta semilla.")

    def _place_single_ship(self, length: int) -> bool:
        for _ in range(100):
            horizontal = random.choice([True, False])
            r = random.randint(0, self.size - 1)
            c = random.randint(0, self.size - 1)
            
            if horizontal and c + length > self.size: continue
            if not horizontal and r + length > self.size: continue
            
            if self._can_place_ship(r, c, length, horizontal):
                ship = Ship(length)
                for i in range(length):
                    nr, nc = (r, c + i) if horizontal else (r + i, c)
                    self.own_grid[nr][nc] = CellState.SHIP
                    ship.add_coordinate(nr, nc)
                self.ships.append(ship)
                return True
        return False

    def _can_place_ship(self, r, c, length, horizontal):
        for i in range(length):
            nr, nc = (r, c + i) if horizontal else (r + i, c)
            for dr in [-1, 0, 1]:
                for dc in [-1, 0, 1]:
                    chk_r, chk_c = nr + dr, nc + dc
                    if 0 <= chk_r < self.size and 0 <= chk_c < self.size:
                        if self.own_grid[chk_r][chk_c] == CellState.SHIP:
                            return False
        return True
    def shoot(self, x, y):
        r , c = y , x
        if self.own_grid[r][c] == CellState.SHIP:
            self.own_grid[r][c] = CellState.HIT
            for ship in self.ships:
                if ship.register_hit(r, c):
                    if ship.is_sunk():
                        for sr, sc in ship.coords:
                            self.own_grid[sr][sc] = CellState.KILL
                        return ShotResult.KILL
            return ShotResult.HIT
            
        elif self.own_grid[r][c] == CellState.EMPTY:
            self.own_grid[r][c] = CellState.EMPTY
            return ShotResult.MISS
            
        return ShotResult.MISS
    
    def mark_miss(self, x: int, y: int):
        self.opponent_grid[y][x] = CellState.EMPTY

    def mark_hit(self, x: int, y: int):
        self.opponent_grid[y][x] = CellState.HIT

    def mark_kill(self, x: int, y: int):
        self.opponent_grid[y][x] = CellState.KILL
    
    def is_ship_destroyed(self, x, y):
        for ship in self.ships:
            if (x,y) in ship:
                for cx, cy in ship:
                    if self.grid[cy][cx] == CellState.SHIP:
                        return False
                return True
        return False
    def isloser(self):
        return all(ship.is_sunk() for ship in self.ships)
        