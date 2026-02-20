from SeabattleField import SeabattleField
from SeabattleAgent import SeabattleAgent
import socket
import sys

def StartServer(seed: int, port: int):
    field = SeabattleField()
    field.get_random_field(seed)
    agent = SeabattleAgent(field)
    
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind(('0.0.0.0', port))
        s.listen(1)
        print(f"Servidor iniciado. Esperando conexión en el puerto {port}...")
        conn, addr = s.accept()
        print(f"Cliente conectado desde {addr}")
        
        agent.set_connection(conn)
        agent.start_game(is_my_turn=False)

def StartClient(seed: int, server_ip: str, port: int):
    field = SeabattleField()
    field.get_random_field(seed)
    agent = SeabattleAgent(field)
    
    conn = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    print(f"Conectando al servidor {server_ip}:{port}...")
    conn.connect((server_ip, port))
    
    agent.set_connection(conn)
    agent.start_game(is_my_turn=True)

if len(sys.argv) < 3:
    print("Uso Servidor: python battleship.py <seed> <port> [cite: 35]")
    print("Uso Cliente:  python battleship.py <seed> <server_ip> <port> [cite: 38]")
    sys.exit(1)

seed_arg = int(sys.argv[1])

if len(sys.argv) == 3:
    port_arg = int(sys.argv[2])
    StartServer(seed_arg, port_arg)
elif len(sys.argv) == 4:
    server_ip_arg = sys.argv[2]
    port_arg = int(sys.argv[3])
    StartClient(seed_arg, server_ip_arg, port_arg)
else:
    print("Argumentos inválidos.")