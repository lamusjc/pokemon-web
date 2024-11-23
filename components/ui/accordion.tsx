import React, { useState, createContext, useContext } from 'react'

interface AccordionContextType {
  openItems: string[]
  toggleItem: (value: string) => void
  type: 'single' | 'multiple'
  collapsible: boolean
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined)

interface AccordionProps {
  children: React.ReactNode
  type?: 'single' | 'multiple'
  collapsible?: boolean
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  type = 'single',
  collapsible = false
}) => {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (value: string) => {
    setOpenItems(prev => {
      if (type === 'single') {
        if (prev.includes(value)) {
          return collapsible ? [] : prev
        }
        return [value]
      } else {
        if (prev.includes(value)) {
          return prev.filter(item => item !== value)
        }
        return [...prev, value]
      }
    })
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type, collapsible }}>
      <div className="divide-y divide-gray-200">
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  children: React.ReactNode
  value: string
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  value
}) => {
  const context = useContext(AccordionContext)
  if (!context) throw new Error('AccordionItem must be used within an Accordion')

  const isOpen = context.openItems.includes(value)

  return (
    <div className="py-2">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { isOpen, value } as Partial<AccordionTriggerProps | AccordionContentProps>)
        }
        return child
      })}
    </div>
  )
}

interface AccordionTriggerProps {
  children: React.ReactNode
  isOpen?: boolean
  value?: string
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  isOpen,
  value
}) => {
  const context = useContext(AccordionContext)
  if (!context) throw new Error('AccordionTrigger must be used within an Accordion')

  return (
    <button
      className="flex justify-between items-center w-full text-left font-medium focus:outline-none"
      onClick={() => value && context.toggleItem(value)}
    >
      {children}
      <svg
        className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}

interface AccordionContentProps {
  children: React.ReactNode
  isOpen?: boolean
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  isOpen
}) => {
  if (!isOpen) return null

  return (
    <div className="mt-2">
      {children}
    </div>
  )
}