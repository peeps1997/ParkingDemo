const fs = require('fs')
const readline = require('readline')
const parking = []

async function commandRunner() {
  const fileStream = fs.createReadStream(process.argv[2])
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  let maxSize = 0
  for await (const line of rl) {
    const command = line.split(' ')[0]
    const value = line.split(' ').splice(1)
    switch (command.toUpperCase()) {
        case 'CREATE':
            if (maxSize < value[0]) {
                maxSize = value[0]
                console.log(`Created parking lot with ${maxSize} slots`)
            } else {
                console.log(`Parking lot with larger size already present - ${maxSize}`) // Extra Condition added if you want to increase parking lot size, just type 'create <VALUE GREATER THAN PREVIOUS SIZE>
            }

          break
        case 'PARK':
            let isCarParked = false
            for (let slot = 0; slot < maxSize; slot++) {
                if (parking[slot] === value[0]) {
                    console.log(`Car already present ${value}`)
                    break
                }
                if (typeof parking[slot] === 'undefined') {
                    parking[slot] = value[0]
                    console.log(`Allocated slot number: ${slot + 1} - ${parking[slot] === undefined ? 'Empty' : parking[slot]}`)
                    isCarParked = true
                    break
                }
            }
            if (!isCarParked) {
                console.log('Sorry, parking lot is full')
            }
          break
        case 'LEAVE':
            let charge = 0
            let leaveSlot = 0
            for (; leaveSlot < maxSize; leaveSlot++) {
                if (parking[leaveSlot] === value[0]) {
                    charge = (value[1] > 2 ? (value[1] - 2) * 10 : 0) + 10
                    console.log(`Registration Number ${parking[leaveSlot]} from Slot ${leaveSlot + 1} has left with Charge ${charge}`)
                    delete parking[leaveSlot]
                    break
                }
            }
            if (charge === 0) {
                console.log(`Registration Number  ${value[0]} not found`)
            }
          break
        case 'STATUS':
            console.log('Slot No. Registration No')
            for (let slot = 0; slot < maxSize; slot++) { if (parking[slot] !== undefined) console.log(`${slot + 1} \t ${parking[slot]}`) }
          break
      }
  }
}

commandRunner()
