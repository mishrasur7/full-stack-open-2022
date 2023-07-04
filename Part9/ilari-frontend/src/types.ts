enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Windy = 'windy',
    Stromy = 'stromy'
}

enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor'
}

export interface Diary {
    id: number,
    date: string,
    weather: Weather,
    visibility: Visibility,
    comment: string
}

