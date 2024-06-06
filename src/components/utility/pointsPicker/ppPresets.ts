export const presetNames: string[] = ["Tight Arse", "Default", "F1", "Moto GP", "Abundant"]

export const nivoColours = (fillAmount: number): string[] => {
  const scheme = ["#FFE800", "#C0C0C0", "#CD7F32"]

  for (let i = 0; i < fillAmount; i++) {
    scheme.push("#bbcedf")
  }

  return scheme
}

type nivoDataType = {
  presetName: string
  id: string
  label: string
  result: number
  value: number
}

export const presetArrays = (preset: number): nivoDataType[] => {
  const nivoDataArr = (presetName: string, points: number[]) => {
    return points.map((p: number, i: number): nivoDataType => {
      const pos = i + 1

      return {
        presetName,
        id: `P${pos}`,
        label: `P${pos}`,
        result: pos,
        value: p,
      }
    })
  }
  // prettier-ignore
  switch (preset) {
    case 0: return nivoDataArr(presetNames[0], [2, 1])
    case 1: return nivoDataArr(presetNames[1], [16, 12, 8, 6, 5, 4, 3, 2])
    case 2: return nivoDataArr(presetNames[2], [25, 18, 15, 12, 10, 8, 6, 4, 2, 1])
    case 3: return nivoDataArr(presetNames[3], [25, 20, 15, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
    case 4: return nivoDataArr(presetNames[4], [48, 36, 24, 22, 20, 18, 16, 14, 12, 10, 8, 7, 6, 5, 4, 3, 2, 1])
    default: return nivoDataArr(presetNames[1], [16, 12, 8, 6, 5, 4, 3, 2])
  }
}
