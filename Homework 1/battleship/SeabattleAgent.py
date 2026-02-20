from CellState import CellState
from ShotResult import ShotResult
class SeabattleAgent:
    def __init__(self, field, conn=None):
        self.field = field
        self.conn = conn
    
    def set_connection(self, conn):
        self.conn = conn

    def start_game(self):
        pass
    def parse_move(self, text):
        if len(text) != 2: return None
        col_char = text[0].upper()
        row_char = text[1]
        
        if not ('A' <= col_char <= 'H') or not ('1' <= row_char <= '8'):
            return None
            
        x = ord(col_char) - 65
        y = int(row_char) - 1
        return (x, y)

    def move_to_string(self, x, y):
        return f"{chr(x + 65)}{y + 1}"
    
    def print_fields(self):
        """Muestra ambos campos[cite: 56]."""
        print("\n--- TU FLOTA ---" + " " * 15 + "--- FLOTA ENEMIGA ---")
        print("  A B C D E F G H          A B C D E F G H")
        symbols = {
            CellState.UNKNOWN: 'U', 
            CellState.EMPTY: 'E', 
            CellState.HIT: 'H', 
            CellState.KILL: 'K', 
            CellState.SHIP: 'S'
        }
        
        for r in range(self.field.size):
            own_row = " ".join(symbols[self.field.own_grid[r][c]] for c in range(self.field.size))
            opp_row = " ".join(symbols[self.field.opponent_grid[r][c]] for c in range(self.field.size))
            print(f"{r+1} {own_row}        {r+1} {opp_row}")
        print()
    
    def is_game_ended(self):
        return self.field.isloser()
    
    def recv_exact(self, count: int) -> bytes:
        buf = b''
        while len(buf) < count:
            data = self.conn.recv(count - len(buf))
            if not data:
                raise ConnectionError("Conexión cerrada por el oponente.")
            buf += data
        return buf
    
    def start_game(self, is_my_turn: bool):
        try:
            while not self.is_game_ended():
                self.print_fields()
                
                if is_my_turn:
                    print("¡Es tu turno!")
                    move_coords = None
                    move_str = ""
                    while not move_coords:
                        move_str = input("Ingresa tu disparo (ej. C7): ").strip()
                        move_coords = self.parse_move(move_str)
                        if not move_coords:
                            print("Coordenada inválida. Usa formato A-H y 1-8.")
                    
                    x, y = move_coords
                    self.conn.sendall(move_str.upper().encode('ascii'))
                    
                    result_byte = self.recv_exact(1)
                    result = result_byte[0]
                    
                    if result == ShotResult.MISS:
                        print(f"Resultado: ¡Agua! Cambio de turno.")
                        self.field.mark_miss(x, y)
                        is_my_turn = False
                    elif result == ShotResult.HIT:
                        print(f"Resultado: ¡Impacto! Tiras de nuevo.")
                        self.field.mark_hit(x, y)
                        if all(cell in [CellState.HIT, CellState.KILL, CellState.EMPTY] for row in self.field.opponent_grid for cell in row):
                            print("\nVICTORIA: Has destruido la flota enemiga. ¡Fin del juego!")
                            break
                    elif result == ShotResult.KILL:
                        print(f"Resultado: ¡Hundido! Tiras de nuevo.")
                        self.field.mark_kill(x, y)
                        if all(cell in [CellState.HIT, CellState.KILL, CellState.EMPTY] for row in self.field.opponent_grid for cell in row):
                            print("\nVICTORIA: Has destruido la flota enemiga. ¡Fin del juego!")
                            break
                        
                else:
                    print("Esperando el tiro del oponente...")
                    move_bytes = self.recv_exact(2)
                    move_str = move_bytes.decode('ascii')
                    x, y = self.parse_move(move_str)
                    
                    print(f"\nEl oponente dispara en: {move_str}")
                    result = self.field.shoot(x, y)
                    
                    self.conn.sendall(bytes([result]))
                    
                    if result == ShotResult.MISS:
                        print("El oponente falló. ¡Tu turno!")
                        is_my_turn = True
                    else:
                        print("El oponente acertó. Vuelve a tirar.")
                        if self.is_game_ended():
                            break

            self.print_fields()
            if self.field.isloser():
                print("\nDERROTA: Todos tus barcos fueron destruidos.")
            else:
                print("\nVICTORIA: Has destruido la flota enemiga. ¡Fin del juego!")

        except ConnectionError as e:
            print(f"\nFin de la partida/Error de red: {e}")
        finally:
            self.conn.close()

