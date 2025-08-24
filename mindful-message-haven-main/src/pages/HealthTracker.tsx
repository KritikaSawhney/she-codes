import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowRightIcon, 
  CalendarIcon, 
  ClockIcon, 
  DropletIcon, 
  ThermometerIcon 
} from "lucide-react";
import { toast } from "sonner";

export default function HealthTracker() {
  // State management
  const [date, setDate] = useState(new Date());
  const [cycleData, setCycleData] = useState({
    currentPhase: "Follicular",
    currentDay: 8,
    cycleLength: 28,
    lastPeriod: new Date("2024-03-18"),
    nextPeriod: new Date("2024-04-15"),
    ovulation: new Date("2024-04-01")
  });
  const [symptoms, setSymptoms] = useState([]);
  const [newSymptom, setNewSymptom] = useState({
    category: "physical",
    type: "cramps",
    intensity: "moderate",
    date: new Date()
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToLocalStorage();
  }, [cycleData, symptoms]);

  // Load data from localStorage
  const loadFromLocalStorage = () => {
    try {
      const savedCycleData = localStorage.getItem('cycleData');
      if (savedCycleData) {
        const parsedData = JSON.parse(savedCycleData);
        parsedData.lastPeriod = new Date(parsedData.lastPeriod);
        parsedData.nextPeriod = new Date(parsedData.nextPeriod);
        parsedData.ovulation = new Date(parsedData.ovulation);
        setCycleData(parsedData);
      }

      const savedSymptoms = localStorage.getItem('symptoms');
      if (savedSymptoms) {
        const parsedSymptoms = JSON.parse(savedSymptoms);
        parsedSymptoms.forEach(symptom => {
          symptom.date = new Date(symptom.date);
        });
        setSymptoms(parsedSymptoms);
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      toast.error("Failed to load your saved data");
    }
  };

  // Save data to localStorage
  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('cycleData', JSON.stringify(cycleData));
      localStorage.setItem('symptoms', JSON.stringify(symptoms));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
      toast.error("Failed to save your data");
    }
  };

  // Handle logging a new symptom
  const handleLogSymptom = () => {
    const symptomToLog = {
      ...newSymptom,
      id: Date.now(),
      date: date
    };
    setSymptoms(prevSymptoms => [symptomToLog, ...prevSymptoms]);
    toast.success("Symptom logged successfully!");
  };

  // Handle symptom input changes
  const handleSymptomChange = (field, value) => {
    setNewSymptom(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Health Tracker</h1>
        
        <Tabs defaultValue="cycle" className="w-full">
          <TabsList>
            <TabsTrigger value="cycle">Cycle Info</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          </TabsList>

          <TabsContent value="cycle">
            <Card>
              <CardHeader>
                <CardTitle>Cycle Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Current Phase: {cycleData.currentPhase}</p>
                <p>Current Day: {cycleData.currentDay}</p>
                <p>Cycle Length: {cycleData.cycleLength} days</p>
                <p>Last Period: {cycleData.lastPeriod.toDateString()}</p>
                <p>Next Period: {cycleData.nextPeriod.toDateString()}</p>
                <p>Ovulation: {cycleData.ovulation.toDateString()}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="symptoms">
            <Card>
              <CardHeader>
                <CardTitle>Log a Symptom</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={(val) => handleSymptomChange("category", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Physical</SelectItem>
                    <SelectItem value="emotional">Emotional</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(val) => handleSymptomChange("type", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cramps">Cramps</SelectItem>
                    <SelectItem value="headache">Headache</SelectItem>
                    <SelectItem value="mood_swings">Mood Swings</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(val) => handleSymptomChange("intensity", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Intensity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mild">Mild</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="severe">Severe</SelectItem>
                  </SelectContent>
                </Select>

                <Calendar mode="single" selected={date} onSelect={setDate} className="my-4" />

                <Button onClick={handleLogSymptom}>
                  Log Symptom <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Logged Symptoms</h2>
              <ul>
                {symptoms.map(symptom => (
                  <li key={symptom.id} className="border-b py-2">
                    {symptom.type} - {symptom.intensity} ({symptom.date.toDateString()})
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
