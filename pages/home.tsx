import '../styles/globals.css';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from 'react';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import {UserData} from '../components/Data.js';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetClose,
  SheetTrigger } from "@/components/ui/sheet";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import {Team, columns} from "../components/standingsColumns";
import {playerColumns} from '../components/playerColumns';
import {DataTable} from "../components/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

  

export default function Home() {
    const [leagueName, setLeagueName] = useState('');
    const [standings, setStandings] = useState([]);
    const [highestRiser, setHighestRiser] = useState({});
    const [lowestFaller, setLowestFaller] = useState({});
    const [biggestPoints, setBiggestPoints] = useState({});
    const [lowestPoints, setLowestPoints] = useState({});
    const [leagueId, setLeagueId] = useState('');
    const [selectedTeam, setSelectedTeam] = useState({});
    const [selectedSquad, setSelectedSquad] = useState([]);
    const[userData, setUserData] = useState({
      labels: UserData.map((data) => data.gameweek),
      datasets: [{
        label: "Team history",
        data: UserData.map((data) => data.points)
      }]
    })
  
    return (
      <div className="hidden flex-col md:flex">
        <Sheet>
            <SheetTrigger asChild>
              <Button>Change League</Button></SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Which league do you want to see?</SheetTitle>
                <SheetDescription>
                  Type a mini-league id and click 'Submit' to view it's summary.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    League ID
                  </Label>
                  <Input id="leagueId" value={leagueId} className="col-span-3" onChange={handleInputChange} />
              </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                <Button onClick={handleClick}>Submit</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        {leagueId === '' ? '' : 
        <div>
            <Sheet>
            <SheetTrigger asChild>
              <Button>Change League</Button></SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Which league do you want to see?</SheetTitle>
                <SheetDescription>
                  Type a mini-league id and click 'Submit' to view it's summary.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    League ID
                  </Label>
                  <Input id="leagueId" value={leagueId} className="col-span-3" onChange={handleInputChange} />
              </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                <Button onClick={handleClick}>Submit</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{leagueName}</CardTitle>
              </CardHeader>
              <CardContent>
              <ScrollArea className="h-[600px] rounded-md border">

          <DataTable columns={columns} data={standings}/>
          </ScrollArea>
          </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                <Select onValueChange={(value) => handleSelect(value)}> 
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  
                  <SelectContent>
                  <ScrollArea className="h-[600px] rounded-md">
                    {standings.map((team) => <SelectItem value={team}>{team.entry_name}</SelectItem> )}
                    </ScrollArea>
                  </SelectContent>
                  
                </Select>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
              <ScrollArea className="h-[600px] rounded-md border">
              <DataTable columns={playerColumns} data={selectedSquad}/>
          </ScrollArea>
          </CardContent>
          </Card>
          
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Riser</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{highestRiser.player_name}</div>
                <p className="text-xs text-muted-foreground">
                The manager that climbed the most spots this Gameweek
                      </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sinker</CardTitle>
              </CardHeader>
              <CardContent>
              <div className="text-2xl font-bold">{lowestFaller.player_name}</div>
                <p className="text-xs text-muted-foreground">
                The manager that dropped the most spots this Gameweek
                      </p>
                
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Biggest haul</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{biggestPoints.player_name}</div>
                <p className="text-xs text-muted-foreground">
                The manager that scored the most points this Gameweek
                      </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lowest return</CardTitle>
              </CardHeader>
              <CardContent>
              <div className="text-2xl font-bold">{lowestPoints.player_name}</div>
                <p className="text-xs text-muted-foreground">
                The manager that scored the least points this Gameweek
                      </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tracker</CardTitle>
              </CardHeader>
              <CardContent>
              <LineChart chartData={userData} />

              </CardContent>
            </Card>
          </div>
          </div>
          
        
        }
              
      </div>
    )

  function handleInputChange(e) {
    setLeagueId(e.target.value);
  };

  async function handleClick() {
    let apiUrl = "api/leagues/" + leagueId;
    const res = await fetch(apiUrl);
    const repo = await res.json();
    setLeagueName(repo.league.name);
    setStandings(repo.standings.results);
    setHighestRiser(repo.summary.highestRiser);
    setLowestFaller(repo.summary.lowestFaller);
    setBiggestPoints(repo.summary.biggestPoints);
    setLowestPoints(repo.summary.lowestPoints);
    setSelectedTeam(repo.summary.highestRiser);
  
    setUserData({
      labels: repo.standings.results[0].pointsHistory.map((el) => el.gameweek),
      datasets: repo.standings.results.map((el) => {
          return {
            label: el.entry_name,
            data: el.pointsHistory.map(p => p.points)
          };
      })

    });
    
    console.log('repo.standings.results[0].pointsHistory: ' + repo.standings.results[0].pointsHistory);

  }

  async function handleSelect(value) {


    // https://fantasy.premierleague.com/api/entry/3702573/
    setSelectedTeam(value);
    console.log(value);
    console.log(selectedTeam);
    console.log(selectedTeam.entry);
    let apiUrl = "api/teams/" + value.entry;
  
    const res = await fetch(apiUrl);
    const repo = await res.json();
    console.log('squad' + repo);
    console.log('squad' + repo[0]);
    console.log('fn' + repo[0].first_name)
    console.log('fn' + repo[0].last_name)
    console.log('fn' + repo[0].total_points)

    setSelectedSquad(repo);


  }
}



