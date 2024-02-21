// eslint-disable-next-line import/prefer-default-export
export const formatArrayOptions = (
  data?: Record<string, string | number>[],
  valueField = 'id',
  labelField = 'title',
): { label: string; value: string }[] => {
  if (!data) return []
  return data.map((item) => ({
    value: item[valueField].toString(),
    label: item[labelField].toString(),
  }))
}
