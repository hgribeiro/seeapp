export default function celciusToF(degree: number): number {
  const Celcius = degree

  const Fahrenheit = ((Celcius * 9) / 5) * 32

  return Fahrenheit
}
