
const testUtil = {
    method1: () => {
        console.log('testUtil.method1()')
        
        console.log('testInt: ')
        console.log(parseInt(''))
        console.log(parseInt('') == 'NaN')
        console.log(Number.isNaN(parseInt('')))
    },
    testAddingToObj: () => {
        console.log(`before: ${JSON.stringify(this.errors)}`)
        this.errors["newError"] = 'added new error'
        this.errors.newError2 = 'added new error2'
        console.log(`after: ${JSON.stringify(this.errors)}`)
    },
    note1: () => {
        /*
        features:
            1. 
            ...it should have a checkList of features on how customer wants to play
                'independent'
                    lets you fill any numbers, has button to check if needed
                    also leaves the possibility to give a error grid on 'Reveal answer'
                        so need to make Error to disable button until fix
                'hold your hand feature'
                    will let you know about when you have a number in the wrong place
        */
       /*
       errors:
            random generator will make scenarios where when trying to generate the answer will get a empty validNums List early and terminate
       */
    },
    testSplice: () => {
        let list1 = [0,1,2,3,3,4,5,6,7]
        let storedValue = list1.splice(3 , 2)

        console.log(`storedValue: ${storedValue}`)
        console.log(`storedValue[0]: ${storedValue[0]}`)
    }
}

export default testUtil