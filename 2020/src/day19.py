lines = open("src/day19.txt", "r")

generatedCases = {}

def generateMiniSet(ruleSubset, rules, originalRule):
    originalInSet = originalRule in ruleSubset

    if(len(ruleSubset) == 2):
        if originalInSet:
            ruleSubset.remove(originalRule)
            onlyRuleCases = generateCases(ruleSubset[0], rules)

            newSet = { str(originalRule)  }
            for x in onlyRuleCases:
                newSet.add(x)
            return newSet
        else:
            return generateMiniDoubleSet(ruleSubset[0], ruleSubset[1], rules)
    else:
        totalSet = {0}-{0}
        if originalInSet:
            ruleSubset.remove(originalRule)
            totalSet = { str(originalRule) }

        if len(ruleSubset) == 2:
            return generateMiniSet(ruleSubset, rules, originalRule)

        currFirstRuleCases = generateCases(ruleSubset[0], rules)
        otherCases = generateMiniSet(ruleSubset[1:], rules, originalRule)
        for curr in currFirstRuleCases:
            for other in otherCases:
                totalSet.add(curr + other)

def generateMiniDoubleSet(ruleNumOne, ruleNumTwo, rules):
    allCurrentCases = {0}-{0}

    firstRuleCases = generateCases(ruleNumOne, rules)

    secondRuleCases = generateCases(ruleNumTwo, rules)

    for givenFirstCase in firstRuleCases:
        for givenSecondCase in secondRuleCases:
            allCurrentCases.add(givenFirstCase + givenSecondCase)

    return allCurrentCases

def getCasesForRules(ruleSet, rules, ogRule):
    if len(ruleSet) != 1:
        newFirstRules = list(map(lambda x: int(x), ruleSet))
        return generateMiniSet(newFirstRules, rules, ogRule)
    else:
        return generateCases(int(ruleSet[0]), rules)

def generateCases(ruleNum, rules):
    # print(ruleNum, generatedCases)

    currRule = rules[ruleNum]
    if ruleNum in generatedCases:
        return generatedCases[ruleNum]
    elif "a" in currRule or "b" in currRule:
        currRule = currRule.replace("\"", "")
        simpleSet = { currRule }
        if ruleNum not in generatedCases: generatedCases[ruleNum] = simpleSet

        return simpleSet
    elif "|" in currRule:
        halves = currRule.split(" | ")
        firstRules = halves[0].split(" ")
        secondRules = halves[1].split(" ")

        setOfAllSecondRuleCases = getCasesForRules(secondRules, rules, ruleNum)
        
        allCases = {0}-{0}

        setOfAllFirstRuleCases = getCasesForRules(firstRules, rules, ruleNum)

        for currFirstCase in setOfAllFirstRuleCases:
            allCases.add(currFirstCase)

        for currSecondCase in setOfAllSecondRuleCases:
            allCases.add(currSecondCase)
        
        generatedCases[ruleNum] = allCases
        return allCases
    else:
        otherRules = currRule.split(" ")
        newOtherRules = list(map(lambda x: int(x), otherRules))

        if len(otherRules) == 1:
            result = generateCases(int(otherRules[0]), rules)
            if ruleNum not in generatedCases: generatedCases[ruleNum] = result
            
            return result
        elif len(otherRules) == 2:
            totalCases = generateMiniSet(newOtherRules, rules, ruleNum)
            if ruleNum not in generatedCases: generatedCases[ruleNum] = totalCases

            return totalCases
        else:
            print(newOtherRules, " 7 ")
            tct = generateMiniSet(newOtherRules, rules, ruleNum)
            if ruleNum not in generatedCases: generatedCases[ruleNum] = tct

            return tct

def part1():
    rules = {}
    cases = []
    for linenum, line in enumerate(lines):
        line = line.replace('\n', '')
        if linenum < 132:
            parts = line.split(': ')
            ruleNum = int(parts[0])
            ruleToFollow = parts[1]
            rules[ruleNum] = ruleToFollow
        else:
            cases.append(line)
    
    generateCases(0, rules)

    acc = 0
    for case in cases:
        if case in generatedCases[0]:
            acc += 1

    print(acc)

part1()
for i in generatedCases[0]:
    if "8" in i:
        print(i)
        break
print(len(generatedCases[0]))