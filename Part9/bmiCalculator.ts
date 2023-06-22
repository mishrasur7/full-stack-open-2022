const calculateBmi = (height: number, weight: number) => {
    const heightInMeters = height/100
    const bmi = weight/(heightInMeters * heightInMeters)
    if(bmi < 80) return 'Normal (healthy weight)'
    if(bmi > 80) return 'Overweight (unhealthy)'
}

console.log(calculateBmi(180, 74))