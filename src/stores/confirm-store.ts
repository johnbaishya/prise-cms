import { create } from "zustand"

export type ConfirmOptions = {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  destructive?:boolean
  singleOption?:boolean
}

type ConfirmState = {
  open: boolean
  options: ConfirmOptions | null
  resolver: ((value: boolean) => void) | null

  showConfirm: (options: ConfirmOptions) => Promise<boolean>
  close: () => void
  resolve: (value: boolean) => void
}

export const useConfirmStore = create<ConfirmState>((set, get) => ({
  open: false,
  options: null,
  resolver: null,

  showConfirm: (options) => {
    return new Promise<boolean>((resolve) => {
      set({
        open: true,
        options,
        resolver: resolve,
      })
    })
  },

  close: () => {
    set({
      open: false,
      options: null,
      resolver: null,
    })
  },

  resolve: (value) => {
    const resolver = get().resolver
    if (resolver) resolver(value)

    set({
      open: false,
      options: null,
      resolver: null,
    })
  },
}))