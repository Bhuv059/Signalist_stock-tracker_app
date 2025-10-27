"use client"

import * as React from "react"
import countryList from "react-select-country-list"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {Label} from "@/components/ui/label";
import {FieldError} from "react-hook-form";

interface CountrySelectProps {
	name: string
	label: string
	error?:FieldError
	required: boolean
	value?: string
	onChange?: (value: string) => void
	placeholder?: string
	className?: string
}

export function CountrySelectField({ name,
									label,
									error,
									required = false,
									value,
									onChange,
									placeholder = "Select a country...",
									className,
								}: CountrySelectProps) {
	const [open, setOpen] = React.useState(false)
	const countries = React.useMemo(() => countryList().getData(), [])
	const selected = countries.find((c) => c.value === value)

	return (
		<div className="space-y-2">
			<Popover open={open} onOpenChange={setOpen} >
			<Label htmlFor={name} className="form-label">{label}</Label>
				<PopoverTrigger asChild >
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={cn("w-[250px] justify-between", className)}
					>
						{selected ? (
							<span className="flex items-center gap-2">
				  <Image
					  src={`https://flagcdn.com/w40/${selected.value.toLowerCase()}.png`}
					  alt={selected.label}
					  width={25}
					  height={18}
					  className="rounded-sm object-cover"
				  />
								{selected.label}
				</span>
						) : (
							<span className="text-muted-foreground">{placeholder}</span>
						)}
						<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
					</Button>
				</PopoverTrigger>

				<PopoverContent  className="w-[250px] p-0">
					<Command  >
						<CommandInput name={name} placeholder="Search a country..." />
						<CommandList>
							<CommandEmpty>No country found.</CommandEmpty>
							<CommandGroup >
								{countries.map((country) => (
									<CommandItem
										key={country.value}
										onSelect={() => {
											onChange?.(country.value)
											setOpen(false)
										}}
									>
										<div className="flex items-center justify-between w-full">
											<div className="flex items-center gap-2">
												<Image
													src={`https://flagcdn.com/w40/${country.value.toLowerCase()}.png`}
													alt={country.label}
													width={25}
													height={18}
													className="rounded-sm object-cover"
												/>
												<span>{country.label}</span>
											</div>
											<Check
												className={cn(
													"h-4 w-4 text-primary transition-opacity",
													value === country.value
														? "opacity-100"
														: "opacity-0"
												)}
											/>
										</div>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{error && <p className="text-sm text-red-500">{error.message}</p>}
		</div>
	)
}
