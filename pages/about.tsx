import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  import { Card } from "@/components/ui/card"
   

export default function About() {

    return (
        <div className="container mx-auto px-4">
        <Accordion type="single" collapsible className="w-half">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is this tool?</AccordionTrigger>
          <AccordionContent>
            This tool provides a dashboard for Fantasy Premier League mini-leagues. 
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I use it?</AccordionTrigger>
          <AccordionContent>
            You will need to provide your mini-league ID for the app to analyse the league. You can find it by navigating to your league in the official FPL website.
            Once there the URL bar will be of the form https://fantasy.premierleague.com/leagues/*leagueId*/standings/c. Take note of the numerica value in *leagueId*.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How was the tool built?</AccordionTrigger>
          <AccordionContent>
            This tool is a React application built using NextJS. It uses the publicly available FPL APIs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
      
    )
}



