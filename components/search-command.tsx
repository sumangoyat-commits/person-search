'use client'

import * as React from "react"
import { useCallback, useState, useRef } from "react"
import { Check, Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface SearchCommandProps<T> {
  onSearch: (value: string) => Promise<T[]>
  onItemSelect: (item: T) => void
  getItemId: (item: T) => string
  getItemLabel: (item: T) => string
  placeholder?: string
  noResultsText?: string
}

// Change the export to be a named export
export const SearchCommand = <T,>({
  onSearch,
  onItemSelect,
  getItemId,
  getItemLabel,
  placeholder = "Search...",
  noResultsText = "No results found.",
}: SearchCommandProps<T>) => {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<T | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = useCallback(async (value: string) => {
    setSearchQuery(value)
    
    if (!value) {
      setItems([])
      setOpen(false)
      return
    }

    setLoading(true)
    setOpen(true)
    
    try {
      const results = await onSearch(value)
      setItems(results)
    } catch (error) {
      console.error('Error searching:', error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [onSearch])

  const handleSelect = useCallback((item: T) => {
    setSelectedItem(item)
    setOpen(false)
    setSearchQuery(getItemLabel(item))
    onItemSelect(item)
  }, [getItemLabel, onItemSelect])

  return (
    <div className="w-full relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div>
            <Command 
              className="rounded-lg border shadow-md"
              shouldFilter={false}
            >
              <CommandInput 
                ref={inputRef}
                placeholder={placeholder}
                value={searchQuery}
                onValueChange={handleSearch}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter') {
                    e.stopPropagation()
                  }
                }}
              />
            </Command>
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[--radix-popover-trigger-width] p-0" 
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {(items.length > 0 || loading) && (
            <Command shouldFilter={false}>
              <CommandList>
                <CommandGroup>
                  {loading ? (
                    <CommandItem disabled className="flex items-center gap-2 py-6 justify-center">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Searching...
                    </CommandItem>
                  ) : items.length === 0 ? (
                    <CommandItem disabled>{noResultsText}</CommandItem>
                  ) : (
                    items.map((item) => (
                      <CommandItem
                        key={getItemId(item)}
                        value={getItemId(item)}
                        onSelect={() => handleSelect(item)}
                        onMouseMove={() => inputRef.current?.focus()}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedItem && getItemId(selectedItem) === getItemId(item) ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {getItemLabel(item)}
                      </CommandItem>
                    ))
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

