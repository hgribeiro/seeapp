interface FormataStringDataFormat {
  date: string
  time: string
}

export function FormataStringData(data: Date): FormataStringDataFormat {
  const dataAndTime = data.toString().split('T')
  const seconds = dataAndTime[1].split(':')
  const date =
    dataAndTime[0].split('-')[2] +
    '-' +
    dataAndTime[0].split('-')[1] +
    '-' +
    dataAndTime[0].split('-')[0]
  const time =
    dataAndTime[1].split(':')[0] +
    ':' +
    dataAndTime[1].split(':')[1] +
    ':' +
    seconds[2].split('.')[0]

  return { date, time }
}
