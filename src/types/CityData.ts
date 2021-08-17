export interface cityData {
  weather: [
    {
      main: string
      description: string
      icon: string
    },
  ]
  main: {
    temp: number
    temp_min: number
    temp_max: number
  }
  sys: {
    country: string
  }
  name: string
  id: number
}

export interface WeatherHistoryDate extends cityData {
  date: Date
}
