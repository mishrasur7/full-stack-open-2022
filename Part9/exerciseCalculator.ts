interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercise = (args: number[], target: number): Result => {
    const numOfDays = args.length
    let trainingDaysTotal = 0; 

    for(let i = 0; i < args.length; i++) {
        if(args[i] > 0) {
            trainingDaysTotal++
        }
    }

    const averageExercise = args.reduce((acc, cur) => acc + cur, 0)/args.length; 

    let exerciseSuccess = false; 
    let exerciseRating = 0;
    let exerciseRatingDescription = ''; 

    if(trainingDaysTotal < 3) {
        exerciseSuccess = false;
        exerciseRating += 1; 
        exerciseRatingDescription += 'Not well done!'
    } 
    if(trainingDaysTotal > 3 && trainingDaysTotal <= 5) {
        exerciseSuccess = false;
        exerciseRating += 2;
        exerciseRatingDescription += 'not too bad but could be better'
    } 
    if(trainingDaysTotal > 5) {
        exerciseSuccess = true;
        exerciseRating += 3;
        exerciseRatingDescription += 'well done, good job'
    }

    return {
        periodLength: numOfDays,
        trainingDays: trainingDaysTotal,
        success: exerciseSuccess,
        rating: exerciseRating,
        ratingDescription: exerciseRatingDescription,
        target: target,
        average: averageExercise
    }
}

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2))