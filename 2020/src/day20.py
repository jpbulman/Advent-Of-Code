lines = open("src/day20.txt", "r")

def getColumn(tile, columnIdx):
    tmp = ""
    for line in tile:
        tmp += line[columnIdx]

    return tmp

def part1():
    idToImageTileMap = {}

    currImageTile = []
    currId = -1
    for line in lines:
        if "T" in line:
            currId = line.split(" ")[1][0:4]
        elif "." in line or "#" in line:
            currImageTile.append(line.replace('\n', ''))
        else:
            idToImageTileMap[currId] = currImageTile.copy()
            currImageTile = []

    tileEdges = {''} - {''}
    for id in idToImageTileMap:
        currTile = idToImageTileMap[id]
        tileEdges.add(currTile[0])
        tileEdges.add(currTile[-1])
        tileEdges.add(getColumn(currTile, 0))
        tileEdges.add(getColumn(currTile, -1))

    edgeCountMap = {}
    for currIdx, currEdge in enumerate(tileEdges):
        for otherIdx, otherEdge in enumerate(tileEdges):
            if currIdx != otherIdx and (currEdge == otherEdge or currEdge == otherEdge[::-1]):
                if currEdge in edgeCountMap:
                    edgeCountMap[currEdge] = edgeCountMap[currEdge] + 1
                else:
                    edgeCountMap[currEdge] = 1

    for key in edgeCountMap:
        currCount = edgeCountMap[key]
        if currCount < 1:
            print(edgeCountMap)
part1()