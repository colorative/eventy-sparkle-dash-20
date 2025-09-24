
import { useFormContext, Controller } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { ChevronsUpDown } from "lucide-react"
import { countries } from "./data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Step4Form() {
  const { control } = useFormContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const filteredCountries = Object.entries(countries).reduce((acc, [group, itemList]) => {
    const filtered = itemList.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
    if (filtered.length > 0) {
      acc[group] = filtered
    }
    return acc
  }, {} as Record<string, string[]>)

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Introduction Bio</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us a little bit about yourself"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <Controller
        name="countries"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Countries I/We Operate In</FormLabel>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className="truncate w-full text-left">
                    {field.value?.length > 0 ? field.value.join(', ') : "Select countries"}
                  </span>
                  <ChevronsUpDown className="h-4 w-4 opacity-50 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] max-h-80 z-50 bg-popover border border-border">
                <div className="p-2 border-b">
                  <Input
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-8"
                  />
                </div>
                <ScrollArea className="h-full">
                  {Object.entries(filteredCountries).map(([group, itemList]) => (
                    <DropdownMenuGroup key={group}>
                      <DropdownMenuLabel>{group}</DropdownMenuLabel>
                      {itemList.map((item) => (
                        <DropdownMenuCheckboxItem
                          key={item}
                          checked={field.value.includes(item)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, item]
                              : field.value.filter((c) => c !== item)
                            field.onChange(newValue)
                          }}
                          onSelect={(e) => e.preventDefault()}
                        >
                          {item}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuGroup>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
