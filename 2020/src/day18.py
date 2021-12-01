lines = open("src/day18.txt", "r")

def evaluateSimpleExpression(values, ops):
    # print(values, ops)
    res = values[0]
    for idx, currOperator in enumerate(ops):
        if currOperator == "+":
            res += values[idx + 1]
        else:
            res *= values[idx + 1]
    return res

def evaluateExpressionAddBeforeMult(values, ops):
    valuesCopy = values.copy()
    valuesCopy.reverse()

    opsCopy = ops.copy()
    newValues = []

    index = 0
    currSum = 0
    while len(valuesCopy) > 0:
        if len(valuesCopy) == 1:
            if opsCopy[index - 1] == "+":
                currSum += valuesCopy.pop()
                newValues.append(currSum)
            else:
                newValues.append(valuesCopy.pop())
            continue

        currOperator = opsCopy[index]

        if currOperator == "+":
            currSum += valuesCopy.pop()
        else:
            if currSum == 0:
                newValues.append(valuesCopy.pop())
            else:
                newValues.append(currSum + valuesCopy.pop())
                currSum = 0

        index += 1

    prod = 1
    for a in newValues:
        prod *= a

    return prod

def part1():
    sum = 0
    for line in lines:
        line = line.replace('\n', '')
        numberStack = []
        operatorStack = []
        numberCountInParens = []
        for idx, char in enumerate(line):
            # print(char, numberStack, operatorStack, numberCountInParens)
            if idx == len(line) - 1:
                if char != ")":
                    numberStack.append(int(char))
                elif char == ")":
                    numOperands = numberCountInParens.pop()
                    numsToEval = numberStack[-numOperands:]
                    operatorsToEval = operatorStack[-(numOperands - 1):]
                    minRes = evaluateSimpleExpression(numsToEval, operatorsToEval)
                    del numberStack[-numOperands:]
                    numberStack.append(minRes)
                    del operatorStack[-(numOperands - 1):]

                    if len(numberCountInParens) == 0:
                        numberCountInParens.append(1)
                    else:
                        numberCountInParens[len(numberCountInParens) - 1] += 1


                # print(char, numberStack, operatorStack, numberCountInParens)
                res = evaluateSimpleExpression(numberStack, operatorStack)
                print(res)
                sum += res
            elif char == " ":
                continue
            elif char == "+" or char == "*":
                operatorStack.append(char)
            elif char == "(":
                numberCountInParens.append(0)
            elif char == ")":
                numOperands = numberCountInParens.pop()
                numsToEval = numberStack[-numOperands:]
                operatorsToEval = operatorStack[-(numOperands - 1):]

                res = evaluateSimpleExpression(numsToEval, operatorsToEval)
                # print(res, "!!!")

                del numberStack[-numOperands:]
                numberStack.append(res)
                del operatorStack[-(numOperands - 1):]

                if len(numberCountInParens) == 0:
                    numberCountInParens.append(1)
                else:
                    numberCountInParens[len(numberCountInParens) - 1] += 1
            else:
                numberStack.append(int(char))
                if len(numberCountInParens) == 0:
                    numberCountInParens.append(1)
                else:
                    numberCountInParens[len(numberCountInParens) - 1] += 1
    print(sum)

def part2():
    sum = 0
    for line in lines:
        line = line.replace('\n', '')
        numberStack = []
        operatorStack = []
        numberCountInParens = []
        print(line)
        for idx, char in enumerate(line):
            # print(char, numberStack, operatorStack, numberCountInParens)
            if idx == len(line ) - 1:
                if char != ")":
                    numberStack.append(int(char))
                elif char == ")":
                    numOperands = numberCountInParens.pop()
                    numsToEval = numberStack[-numOperands:]
                    operatorsToEval = operatorStack[-(numOperands - 1):]
                    # print(char, numberStack, operatorStack, numberCountInParens, "{")
                    minRes = evaluateExpressionAddBeforeMult(numsToEval, operatorsToEval)
                    del numberStack[-numOperands:]
                    numberStack.append(minRes)
                    del operatorStack[-(numOperands - 1):]

                    if len(numberCountInParens) == 0:
                        numberCountInParens.append(1)
                    else:
                        numberCountInParens[len(numberCountInParens) - 1] += 1


                # print(char, numberStack, operatorStack, numberCountInParens, "{")
                res = evaluateExpressionAddBeforeMult(numberStack, operatorStack)
                # print(res)
                sum += res
            elif char == " ":
                continue
            elif char == "+" or char == "*":
                operatorStack.append(char)
            elif char == "(":
                numberCountInParens.append(0)
            elif char == ")":
                numOperands = numberCountInParens.pop()
                numsToEval = numberStack[-numOperands:]
                operatorsToEval = operatorStack[-(numOperands - 1):]

                res = evaluateExpressionAddBeforeMult(numsToEval, operatorsToEval)
                # print(res, "!!!")

                del numberStack[-numOperands:]
                numberStack.append(res)
                del operatorStack[-(numOperands - 1):]

                if len(numberCountInParens) == 0:
                    numberCountInParens.append(1)
                else:
                    numberCountInParens[len(numberCountInParens) - 1] += 1
            else:
                numberStack.append(int(char))
                if len(numberCountInParens) == 0:
                    numberCountInParens.append(1)
                else:
                    numberCountInParens[len(numberCountInParens) - 1] += 1
    print(sum)

# part1()
part2()