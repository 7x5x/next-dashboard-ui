"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { IPaidImpressions } from "@/backend/modules/PaidImpressions";
import { IGenderData } from "@/backend/modules/Gender";
import { IInterest } from "@/backend/modules/Interest";

// Define the schema for validation
const FormSchema = z.object({
  name: z.string().min(0, "Interest must be a positive number."),
  value: z.number().min(0, "value must be a positive number."),
  date: z.date({
    required_error: "A date is required.",
  }),
});

export default function InterestForm() {
  return <CardWrapper />;
}

const CardWrapper = () => {
  // Set up form with react-hook-form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Function to handle form submission
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const requestData: IInterest = {
        name: data.name, // Convert to number
        value: Number(data.value), // Convert to number
        date: data.date,
      };

      const response = await fetch("/api/Interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        toast({
          title: "Data saved successfully",
        });
        form.reset({
          name: "", // Reset name to 0 or any default value you want
          value: 0, // Reset value to 0 or any default value you want
        });
      } else {
        toast({
          title: "Error saving data",
        });
      }
    } catch (error) {
      console.error("Network error:", error);
      toast({
        title: "Network error",
        description: "Failed to save data. Please try again.",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <h1>Interest Data</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-7 place-content-center gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col col-span-2">
                    <FormLabel>Interest</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Interest" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="flex flex-col col-span-2">
                    <FormLabel>value</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter value (Number)"
                        type="number"
                        onChange={(e) => {
                          field.onChange(e); // Capture the change event
                          field.onChange(Number(e.target.value)); // Convert to number
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col col-span-2">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange} // Correctly bind the date selection
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className=" col-span-1 mt-5 hover:scale-[1.02]  duration-[200] transition-transform  ease-in-out"
                type="submit"
              >
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
