import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type User } from '../data/schema'

type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete'

type UsersContextType = {
  open: UsersDialogType | null
  setOpen: (str: UsersDialogType | null) => void
  currentRow: User | null
  setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>
}

const ProductCategoryRowActionsContext = React.createContext<UsersContextType | null>(null)

export function ProductCategoryRowActionProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<User | null>(null)

  return (
    <ProductCategoryRowActionsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ProductCategoryRowActionsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCategoryRowActions = () => {
  const productCategoryRowActionsContext = React.useContext(ProductCategoryRowActionsContext)

  if (!productCategoryRowActionsContext) {
    throw new Error('useCategoryRowActions has to be used within <ProductCategoryRowActionsContext>')
  }

  return productCategoryRowActionsContext
}
