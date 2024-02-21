import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { FieldValues } from 'react-hook-form'
import { ObjectSchema } from 'yup'

import { getCurrentLocale } from '@/libs/helpers/locale'

const useSchema = <TFieldValues extends FieldValues>(
  getSchema: () => ObjectSchema<TFieldValues>,
  dependencies?: unknown[],
) => {
  const locale = getCurrentLocale()
  const resolver = useMemo(getSchema, [locale, ...(dependencies || [])])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return yupResolver(resolver as any)
}

export default useSchema
