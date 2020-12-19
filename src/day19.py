lines = open("src/day19.txt", "r")

generatedCases = {}

def generateMiniSet(ruleSubset, rules):
    if(len(ruleSubset) == 2):
        return generateMiniDoubleSet(ruleSubset[0], ruleSubset[1], rules)
    else:
        totalSet = {0}-{0}
        currFirstRuleCases = generateCases(ruleSubset[0], rules)
        otherCases = generateMiniSet(ruleSubset[1:], rules)
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

def generateMiniTripleSet(ruleNumOne, ruleNumTwo, ruleThree, rules):
    cc = {0}-{0}

    firstRuleCases = generateCases(ruleNumOne, rules)

    secondRuleCases = generateCases(ruleNumTwo, rules)

    thirdRuleCases = generateCases(ruleThree, rules)

    for givenFirstCase in firstRuleCases:
        for givenSecondCase in secondRuleCases:
            for givenThirdCase in thirdRuleCases:
                cc.add(givenFirstCase + givenSecondCase + givenThirdCase)

    return cc

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
        
        allCases = {0}-{0}

        if len(firstRules) != 1:
            newFirstRules = list(map(lambda x: int(x), firstRules))
            setOfAllFirstRuleCases = generateMiniSet(newFirstRules, rules)
        else:
            setOfAllFirstRuleCases = generateCases(int(firstRules[0]), rules)

        if len(secondRules) != 1:
            newSecondSet = list(map(lambda x: int(x), secondRules))
            setOfAllSecondRuleCases = generateMiniSet(newSecondSet, rules)
        else:
            setOfAllSecondRuleCases = generateCases(int(secondRules[0]), rules)

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
            totalCases = generateMiniSet(newOtherRules, rules)
            if ruleNum not in generatedCases: generatedCases[ruleNum] = totalCases

            return totalCases
        else:
            tct = generateMiniSet(newOtherRules, rules)
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