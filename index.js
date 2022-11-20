const fs = require('fs')
const readline = require('readline')
const arr = []
const _ = require('lodash')
// also works: var arr = [];
async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt')

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
let maxSize = 0
  for await (const line of rl) {
    const command = line.split(' ')[0]
    const value = _.tail(line.split(' '))
    switch (command) {
        case 'create':
            if (maxSize < value[0]) {
                maxSize = value[0]
                console.log(`Created parking lot with ${maxSize} slots`)
            } else {
                console.log(`Parking lot with larger size already present - ${maxSize}`)
            }

          break
        case 'park':
            let isCarParked = false
            let slot = 0
            for (; slot < maxSize; slot++) {
                if (arr[slot] === value[0]) {
                    console.log(`Car already present ${value}`)
                    break
                }
                if (_.isEqual(typeof arr[slot], 'undefined')) {
                    arr[slot] = value[0]
                    console.log(`Allocated slot number: ${slot + 1} - ${arr[slot] === undefined ? 'Empty' : arr[slot]}`)
                    isCarParked = true
                    break
                }
            }
            if (!isCarParked) {
                console.log('Sorry, parking lot is full')
            }
          break
        case 'leave':
            let charge = 0
            let leaveSlot = 0
            for (; leaveSlot < maxSize; leaveSlot++) {
                if (_.isEqual(arr[leaveSlot], value[0])) {
                    charge = (value[1] > 2 ? (value[1] - 2) * 10 : 0) + 10
                    console.log(`Registration Number ${arr[leaveSlot]} from Slot ${leaveSlot + 1} has left with Charge ${charge}`)
                    delete arr[leaveSlot]
                    break
                }
            }
            if (charge === 0) {
                console.log(`Registration Number  ${value[0]} not found`)
            }
          break
        case 'status':
            console.log('Slot No. Registration No')
            for (let j = 0; j < maxSize; j++) { if (arr[j] !== undefined) console.log(`${j + 1} \t ${arr[j]}`) }
          break
      }
  }
}

processLineByLine()
