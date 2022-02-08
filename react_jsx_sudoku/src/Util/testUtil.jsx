
const testUtil = {
    method1: () => {
        console.log('testUtil.method1()')
        
        console.log('testInt: ')
        console.log(parseInt(''))
        console.log(parseInt('') == 'NaN')
        console.log(Number.isNaN(parseInt('')))
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
    }
}

export default testUtil