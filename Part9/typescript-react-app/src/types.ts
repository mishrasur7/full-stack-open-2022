export interface MainHeader {
    courseName: string
}

interface Exercise {
    name: string,
    exerciseCount: number
}

export interface Contents {
    content: Exercise []
}

export interface TotalExercise {
    total: number
}