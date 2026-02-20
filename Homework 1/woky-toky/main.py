import pyaudio
import socket
import sys

FORMAT = pyaudio.paInt8
CHANNELS = 1
RATE = 44100
MAX_FRAMES = 65000

def StartServer(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind(("0.0.0.0", port))
    audio = pyaudio.PyAudio()
    frame_size = audio.get_sample_size(FORMAT)
    stream = audio.open(
        format= FORMAT,
        channels=CHANNELS,
        rate=RATE,
        output=True
    )

    try:
        while True:
            print("escuchando")
            data , addr = sock.recvfrom(65535)

            total_bytes = len(data)
            frames_to_play = total_bytes // frame_size
            print(f"Bytes recibidos: {total_bytes}")
            print(f"Frames a reproducir: {frames_to_play}")
            stream.write(data)
    except KeyboardInterrupt:
        print("Servidor detenido")
    
    stream.stop_stream()
    stream.close()
    audio.terminate()
    sock.close()

def StartClient(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    server_ip = input("Ingrese IP del servidor: ")
    audio = pyaudio.PyAudio()
    frame_size = audio.get_sample_size(FORMAT)
    stream = audio.open(
        format=FORMAT,
        channels=CHANNELS,
        rate=RATE,
        input=True
    )

    print("Escuchando...")
    frames = []
    while len(frames) < MAX_FRAMES:
        remaining = MAX_FRAMES - len(frames)
        chunk_size = min(1024 , remaining)
        data = stream.read(chunk_size  ,exception_on_overflow=False)
        frames.extend(data)
        if(len(frames)) >= MAX_FRAMES:
            break
    stream.stop_stream()
    stream.close()
    audio.terminate()
    total_bytes = len(frames)
    print(f"total frames capturados: {total_bytes}")
    print(f"tamano de frame: {frame_size} bytes")
    print(f"total bytes a enviar: {total_bytes}")
    sock.sendto(bytes(frames), (server_ip, port))
    print("enviado")
    sock.close()
if len(sys.argv) != 3:
    print("Uso")
    print("  python main.py server <port>")
    print("  python main.py client <port>")
    sys.exit(1)
mode = sys.argv[1]
port = int(sys.argv[2])
if mode == "server":
    StartServer(port)
elif mode == "client":
    StartClient(port)
else:
    print("Formato incorrecto")