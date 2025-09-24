
import { useFormContext, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { interests, Interest } from "./data"

export function Step3Interests() {
  const { control, setValue } = useFormContext()

  const handleTagClick = (interest: Interest, field: any) => {
    const currentSelection = field.value || {}
    let newSelection = { ...currentSelection }

    if (newSelection[interest.id]) {
      delete newSelection[interest.id]
    } else {
      newSelection[interest.id] = true
    }
    setValue(field.name, newSelection, { shouldValidate: true, shouldDirty: true })
  }

  const groupedInterests = interests.reduce((acc, interest) => {
    const category = interest.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(interest)
    return acc
  }, {} as Record<string, Interest[]>)

  return (
    <Controller
      name="interests"
      control={control}
      defaultValue={{}}
      render={({ field }) => (
        <div className="space-y-6">
          {Object.entries(groupedInterests).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((interest) => (
                  <Badge
                    key={interest.id}
                    variant={field.value?.[interest.id] ? "default" : "secondary"}
                    onClick={() => handleTagClick(interest, field)}
                    className="cursor-pointer px-3 py-1 text-xs hover:scale-105 transition-transform"
                  >
                    {interest.label}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    />
  )
}
