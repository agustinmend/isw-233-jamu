class Ship:
    def __init__(self, length):
        self.length = length
        self.coords = set()
        self.hits = set()
    def add_coordinate(self, r , c):
        self.coords.add((r , c))
    def register_hit(self, r , c):
        if (r , c ) in self.coords:
            self.hits.add((r , c))
            return True
        return False
    def is_sunk(self):
        return len(self.hits) == self.length