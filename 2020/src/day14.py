lines = open("src/day14.txt", "r")

def part1():
    memory = {}
    currentMask = ""
    for line in lines:
        if "mem" in line:
            parts = line.split(" = ")
            memoryValue = str(bin(int(parts[1])))[2:].zfill(36)
            memoryAddress = parts[0].replace("[", "").replace("]", "").replace("mem", "")

            for idx, char in enumerate(currentMask):
                if(char != "X"):
                    memoryValue = memoryValue[:idx] + char + memoryValue[idx + 1:]

            memory[memoryAddress]= memoryValue
        elif "mask" in line:
            parts = line.split(" = ")
            currentMask = parts[1].replace("\n", '')

    sum = 0
    for key, val in memory.items():
        sum += int(val, 2)

    print(sum)

def part2():
    memory = {}
    currentMask = ""
    for line in lines:
        if "mem" in line:
            parts = line.split(" = ")
            memoryValue = str(bin(int(parts[1])))[2:].zfill(36)
            memoryAddress = str(bin(int(parts[0].replace("[", "").replace("]", "").replace("mem", ""))))[2:].zfill(36)

            for idx, char in enumerate(currentMask):
                if(char == "1" or char == "X"):
                    memoryAddress = memoryAddress[:idx] + char + memoryAddress[idx + 1:]

            xcount = memoryAddress.count("X")
            numReplacements = 2 ** xcount
            replacements = []
            for i in range(numReplacements):
                currBin = str(bin(i))[2:].zfill(xcount)
                bitCount = 0
                alternateMemAddress = memoryAddress
                for index, currBit in enumerate(alternateMemAddress):
                    if currBit == "X":
                        alternateMemAddress = alternateMemAddress[:index] + currBin[bitCount] + alternateMemAddress[index + 1:]
                        bitCount += 1
                replacements.append(alternateMemAddress)

            for newAddress in replacements:
                # print("Value " + memoryValue + " is being written to address " + newAddress)
                memory[newAddress] = memoryValue

                sum = 0
            for key, val in memory.items():
                sum += int(val, 2)
            if str(int(memoryValue, 2)) == "18926":
                for foo in replacements:
                    print(foo)
            # print("CURRENT SUM: " + str(sum) + " "  + str(int(memoryValue, 2)))

        elif "mask" in line:
            parts = line.split(" = ")
            currentMask = parts[1].replace("\n", '')

    sum = 0
    for key, val in memory.items():
        sum += int(val, 2)

    print(sum)

# part1()
part2()
lines.close()